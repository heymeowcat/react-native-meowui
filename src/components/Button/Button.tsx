/**
 * MeowUI Button Component
 * A beautiful button with gradient support and smooth animations
 */

import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

// Button variants
export type ButtonVariant = 'filled' | 'outlined' | 'ghost' | 'gradient';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: (event: import('react-native').GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  gradient?: boolean;
  gradientColors?: string[];
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
  },
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({
  children,

  onPress,
  variant = 'filled',
  size = 'medium',
  gradient = false,
  gradientColors,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  
  // Animation handlers - cleaner scale animation
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, theme.animations.springs.snappy);
  }, [scale, theme]);
  
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, theme.animations.springs.snappy);
  }, [scale, theme]);
  
  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  // Get size styles
  const sizeStyles = theme.componentSizes.button[size];
  
  // Get variant styles
  const getVariantStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: sizeStyles.height,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      borderRadius: theme.borderRadius.full, // Pill shape often used
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing[2],
      borderWidth: 2, // Thick border
      borderColor: theme.colors.outline, // Default black/white outline
    };
    
    switch (variant) {
      case 'filled':
      case 'gradient':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.primary,
          // Remove default border for filled if we want cleaner look? 
          // Actually  usually keeps borders even on filled
          borderColor: theme.colors.outline,
          // Add hard shadow logic? Handled by container style maybe or here?
          // Since elevation is hard shadow now, apply it.
          ...theme.elevation[2], 
          shadowColor: theme.colors.shadow, // Ensure shadow color matches theme
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
          ...theme.elevation[0], // No shadow or subtle
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 0,
          ...theme.elevation[0],
        };
      default:
        return baseStyle;
    }
  };
  
  // Get text color
  const getTextColor = (): string => {
    if (disabled) return theme.colors.onSurfaceVariant;
    
    switch (variant) {
      case 'filled':
      case 'gradient':
        return theme.colors.onPrimary; // Usually white or black depending on contrast
      case 'outlined':
      case 'ghost':
        return theme.colors.onBackground;
      default:
        return theme.colors.onPrimary;
    }
  };
  
  // Render content
  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {leftIcon}
          {typeof children === 'string' ? (
            <Text
              style={[
                styles.text,
                {
                  color: getTextColor(),
                  fontSize: size === 'medium' ? 14 : size === 'small' ? 12 : 16,
                  fontWeight: '700', // Bold labels
                },
                textStyle,
              ]}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          {rightIcon}
        </>
      )}
    </>
  );

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        animatedStyle,
        getVariantStyles(),
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {renderContent()}
    </AnimatedPressable>
  );
};

export default Button;
