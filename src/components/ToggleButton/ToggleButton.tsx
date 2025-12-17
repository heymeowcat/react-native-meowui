/**
 * MeowUI ToggleButton
 */

import React, { createContext, useContext } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

export type ToggleButtonStatus = 'checked' | 'unchecked';

export interface ToggleButtonProps {
  icon?: React.ReactNode;
  value?: string;
  status?: ToggleButtonStatus;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface ToggleButtonGroupContextValue {
  value: string | string[];
  onValueChange: (value: string) => void;
}

const ToggleButtonGroupContext = createContext<ToggleButtonGroupContextValue | null>(null);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ToggleButton: React.FC<ToggleButtonProps> & {
  Group: typeof ToggleButtonGroup;
} = ({
  icon,
  value,
  status: statusProp,
  onPress,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const groupContext = useContext(ToggleButtonGroupContext);
  const scale = useSharedValue(1);
  
  // Determine status from group or prop
  const isChecked = groupContext
    ? Array.isArray(groupContext.value)
      ? groupContext.value.includes(value || '')
      : groupContext.value === value
    : statusProp === 'checked';
  
  const handlePress = () => {
    if (disabled) return;
    
    if (groupContext && value) {
      groupContext.onValueChange(value);
    } else if (onPress) {
      onPress();
    }
  };
  
  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 15 });
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: isChecked ? theme.colors.primary : theme.colors.surface,
          borderWidth: 2,
          borderColor: theme.colors.outline,
          borderRadius: theme.borderRadius.md,
          ...theme.elevation[isChecked ? 2 : 0],
        },
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
    >
      {icon && (
        <View style={{ opacity: isChecked ? 1 : 0.6 }}>
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<any>, {
                color: isChecked ? theme.colors.onPrimary : theme.colors.onSurface,
              })
            : icon}
        </View>
      )}
    </AnimatedPressable>
  );
};

export interface ToggleButtonGroupProps {
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  children: React.ReactNode;
  /** Allow multiple selections */
  multiSelect?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  value,
  onValueChange,
  children,
  multiSelect = false,
  style,
}) => {
  const { theme } = useTheme();
  
  const handleValueChange = (newValue: string) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [value];
      if (currentValues.includes(newValue)) {
        onValueChange(currentValues.filter(v => v !== newValue));
      } else {
        onValueChange([...currentValues, newValue]);
      }
    } else {
      onValueChange(newValue);
    }
  };
  
  return (
    <ToggleButtonGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View
        style={[
          styles.group,
          {
            borderWidth: 2,
            borderColor: theme.colors.outline,
            borderRadius: theme.borderRadius.md,
            backgroundColor: theme.colors.surfaceVariant,
          },
          style,
        ]}
      >
        {children}
      </View>
    </ToggleButtonGroupContext.Provider>
  );
};

ToggleButton.Group = ToggleButtonGroup;

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  group: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
});

export default ToggleButton;
