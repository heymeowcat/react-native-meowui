import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

export interface CheckboxProps {
  status: 'checked' | 'unchecked' | 'indeterminate';
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  uncheckedColor?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  status,
  onPress,
  disabled = false,
  color,
  uncheckedColor,
  size = 24,
  style,
}) => {
  const { theme } = useTheme();
  
  const progress = useSharedValue(status === 'checked' || status === 'indeterminate' ? 1 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withSpring(
      status === 'checked' || status === 'indeterminate' ? 1 : 0,
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
    const backgroundColor = progress.value > 0.5 
      ? (color || theme.colors.primary) 
      : 'transparent';
      
    const borderColor = progress.value > 0.5
      ? (color || theme.colors.primary)
      : (uncheckedColor || theme.colors.outline);

    return {
      backgroundColor,
      borderColor: disabled ? theme.colors.outlineVariant : borderColor,
      transform: [{ scale: scale.value }],
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: progress.value }],
    };
  });

  const checkedColor = color || theme.colors.primary;
  const iconColor = theme.colors.onPrimary;

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
          styles.box,
          {
            width: size,
            height: size,
            borderRadius: 6,
            borderWidth: 2,
          },
          animatedContainerStyle,
        ]}
      >
        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
          <Text 
            style={{ 
              color: iconColor, 
              fontWeight: '900', 
              fontSize: size * 0.7,
              lineHeight: size * 0.8, // Center vertically
              textAlign: 'center'
            }}
          >
            {status === 'indeterminate' ? "—" : "✓"} 
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checkbox;
