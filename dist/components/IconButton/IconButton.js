/**
 * MeowUI IconButton Component
 * Circular icon button with gradient option
 */
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, } from 'react-native-reanimated';
import { useTheme } from '../../theme';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const IconButton = ({ icon, onPress, variant = 'ghost', size = 'medium', gradientColors, disabled = false, style, }) => {
    const { theme } = useTheme();
    const scale = useSharedValue(1);
    const handlePressIn = () => {
        scale.value = withSpring(0.9, theme.animations.springs.snappy);
    };
    const handlePressOut = () => {
        scale.value = withSpring(1, theme.animations.springs.snappy);
    };
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    const buttonSize = theme.componentSizes.iconButton[size];
    const getVariantStyles = () => {
        const baseStyle = {
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
            justifyContent: 'center',
            alignItems: 'center',
        };
        switch (variant) {
            case 'filled':
                return {
                    ...baseStyle,
                    backgroundColor: theme.colors.primary,
                };
            case 'outlined':
                return {
                    ...baseStyle,
                    borderWidth: 2,
                    borderColor: theme.colors.outline,
                    backgroundColor: 'transparent',
                };
            case 'gradient':
                return baseStyle;
            case 'ghost':
            default:
                return {
                    ...baseStyle,
                    backgroundColor: 'transparent',
                };
        }
    };
    if (variant === 'gradient') {
        const colors = gradientColors || theme.gradients.primary;
        return (<AnimatedPressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={disabled} style={[animatedStyle, disabled && styles.disabled, style]}>
        <View style={[
                getVariantStyles(),
                { backgroundColor: theme.colors.primary },
                style
            ]}>
          {icon}
        </View>
      </AnimatedPressable>);
    }
    return (<AnimatedPressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={disabled} style={[animatedStyle, getVariantStyles(), disabled && styles.disabled, style]}>
      {icon}
    </AnimatedPressable>);
};
const styles = StyleSheet.create({
    disabled: {
        opacity: 0.5,
    },
});
export default IconButton;
