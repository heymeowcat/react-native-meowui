/**
 * MeowUI Card Component
 * Beautiful cards with gradient borders and glass morphism
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import type { ElevationLevel } from '../../theme';

export type CardVariant = 'elevated' | 'filled' | 'outlined' | 'gradient';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  elevation?: ElevationLevel;
  gradient?: boolean;
  gradientColors?: string[];
  gradientBorder?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  elevation = 2,
  gradient = false, // Ignored in new style
  gradientColors, // Ignored
  gradientBorder = false, // Ignored
  onPress,
  disabled = false,
  style,
  contentStyle,
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  
  // Animation handlers
  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98, theme.animations.springs.snappy);
    }
  };
  
  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1, theme.animations.springs.snappy);
    }
  };
  
  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  // Get variant styles
  const getVariantStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.xl, 
      borderWidth: 2, // Thick border
      borderColor: theme.colors.outline,
      overflow: 'hidden',
    };
    
    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.surface,
          ...theme.elevation[elevation], // Uses the new hard shadows
          shadowColor: theme.colors.shadow,
        };
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.surfaceVariant,
          // Filled cards also get a border in 
          borderColor: theme.colors.outline, 
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.surface, // Solid background
          borderColor: theme.colors.outline,
        };
      case 'gradient':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.secondary, // Different border for "gradient" / special cards
        };
      default:
        return baseStyle;
    }
  };
  
  // Content padding
  const contentPadding: ViewStyle = {
    padding: theme.spacing[4],
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !onPress}
      style={[
        animatedStyle,
        getVariantStyles(),
        style
      ]}
    >
      <View style={[contentPadding, contentStyle]}>
        {children}
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  gradientBorder: { // No longer used but kept for types if needed
    padding: 2,
  },
  innerCard: {
    margin: 0,
  },
});

export default Card;
