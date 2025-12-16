/**
 * MeowUI RadioButton Component
 * MeowUI style radio button with thick borders and solid fill
 */

import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

export interface RadioButtonProps {
  value: string;
  status: 'checked' | 'unchecked';
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  uncheckedColor?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  status,
  onPress,
  disabled = false,
  color,
  uncheckedColor,
  size = 24,
  style,
}) => {
  const { theme } = useTheme();
  
  const progress = useSharedValue(status === 'checked' ? 1 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withSpring(
      status === 'checked' ? 1 : 0,
      theme.animations.springs.bouncy
    );
  }, [status, theme]);

  const handlePressIn = () => {
    scale.value = withSpring(0.9, theme.animations.springs.snappy);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, theme.animations.springs.snappy);
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = status === 'checked'
      ? (color || theme.colors.primary)
      : (uncheckedColor || theme.colors.outline);

    return {
      borderColor: disabled ? theme.colors.outlineVariant : borderColor,
      transform: [{ scale: scale.value }],
    };
  });

  const animatedInnerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: progress.value }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      hitSlop={8}
      style={[styles.container, style]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            backgroundColor: theme.colors.surface,
          },
          animatedContainerStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.innerCircle,
            {
              width: size * 0.5,
              height: size * 0.5,
              borderRadius: size * 0.25,
              backgroundColor: color || theme.colors.primary,
            },
            animatedInnerStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    // Solid distinct fill for radio
  },
});

export default RadioButton;
