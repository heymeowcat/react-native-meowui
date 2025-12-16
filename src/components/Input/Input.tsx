/**
 * MeowUI Input Component
 * Beautiful text input with animated label and gradient focus
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import { Text } from 'react-native';
import { useTheme } from '../../theme';

export type InputVariant = 'outlined' | 'filled';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  variant?: InputVariant;
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  gradientFocus?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const Input: React.FC<InputProps> = ({
  label,
  variant = 'outlined',
  size = 'medium',
  error = false,
  errorMessage,
  helperText,
  leftIcon,
  rightIcon,
  gradientFocus = true,
  style,
  inputStyle,
  value,
  onFocus,
  onBlur,
  placeholder,
  ...textInputProps
}) => {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  
  // Animation values
  const focusProgress = useSharedValue(value ? 1 : 0);
  const borderProgress = useSharedValue(0);
  
  // Handle focus
  const handleFocus = useCallback((e: any) => {
    setIsFocused(true);
    focusProgress.value = withTiming(1, { duration: 150 });
    borderProgress.value = withTiming(1, { duration: 200 });
    onFocus?.(e);
  }, [focusProgress, borderProgress, onFocus]);
  
  // Handle blur
  const handleBlur = useCallback((e: any) => {
    setIsFocused(false);
    if (!value) {
      focusProgress.value = withTiming(0, { duration: 150 });
    }
    borderProgress.value = withTiming(0, { duration: 200 });
    onBlur?.(e);
  }, [focusProgress, borderProgress, onBlur, value]);
  
  // Get size styles
  const sizeStyles = theme.componentSizes.input[size];
  
  // Animated label style
  const animatedLabelStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      focusProgress.value,
      [0, 1],
      [14, 12]
    );
    
    const translateY = interpolate(
      focusProgress.value,
      [0, 1],
      [0, -sizeStyles.height / 2 - 4]
    );
    
    return {
      fontSize,
      transform: [{ translateY }],
    };
  });
  
  // Animated border color (for non-gradient)
  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderProgress.value,
      [0, 1],
      [
        error ? theme.colors.error : theme.colors.outline,
        error ? theme.colors.error : theme.colors.primary,
      ]
    );

    return {
      borderColor,
      // Scale up slightly on focus for a 'pop' effect
      transform: [
        { scale: interpolate(focusProgress.value, [0, 1], [1, 1.02]) }
      ]
    };
  });
  
  // Get variant styles
  const getVariantStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: sizeStyles.height,
      borderRadius: theme.borderRadius.full,
      paddingHorizontal: theme.spacing[5],
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[2],
      borderWidth: 2,
    };
    
    if (variant === 'outlined') {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.surface,
        borderColor: error ? theme.colors.error : (isFocused ? theme.colors.primary : theme.colors.outline),
        ...theme.elevation[isFocused ? 4 : 2], // Harder shadow on focus
        shadowColor: '#000',
      };
    }
    
    // Filled
    return {
      ...baseStyle,
      backgroundColor: theme.colors.surfaceVariant,
      borderColor: error ? theme.colors.error : (isFocused ? theme.colors.primary : theme.colors.outline),
    };
  };
  
  // Get label color
  const getLabelColor = (): string => {
    if (error) return theme.colors.error;
    if (isFocused) return theme.colors.primary;
    return theme.colors.onSurface; // Default to onSurface for high contrast
  };
  
  // Helper/error text
  const bottomText = error ? errorMessage : helperText;
  
  // Focus container
  const handleContainerPress = () => {
    inputRef.current?.focus();
  };
  
  return (
    <View style={[styles.container, style]}>
      {/* Static Label Component */}
      {label && (
        <Text
          style={[
            styles.label,
            { color: getLabelColor() },
          ]}
        >
          {label}
        </Text>
      )}

      {/* Input Pill */}
      <Animated.View style={[getVariantStyles(), animatedContainerStyle]}>
        <Pressable onPress={handleContainerPress} style={styles.inputContainer}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          
          <TextInput
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[
              styles.input,
              {
                color: theme.colors.onSurface,
                ...theme.typography.bodyLarge,
                fontWeight: '500', 
              },
              inputStyle,
            ]}
            {...textInputProps}
          />
          
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </Pressable>
      </Animated.View>
      
      {/* Bottom Text */}
      {bottomText && (
        <Text
          style={[
            styles.helperText,
            { color: error ? theme.colors.error : theme.colors.onSurfaceVariant },
          ]}
        >
          {bottomText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // Default spacing between inputs
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    height: '100%',
  },
  label: {
    marginBottom: 8,
    marginLeft: 12, // Align with pill curve
    fontSize: 14,
    fontWeight: '800', // MeowUI Bold
    textTransform: 'uppercase', // Stylistic choice
    letterSpacing: 0.5,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
    fontWeight: '600',
  },
});

export default Input;
