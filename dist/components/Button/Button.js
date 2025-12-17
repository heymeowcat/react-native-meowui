/**
 * MeowUI Button Component
 * A beautiful button with gradient support and smooth animations
 */
import React, { useCallback, memo } from 'react';
import { StyleSheet, Text, Pressable, ActivityIndicator, } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, } from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { usePencilBurst } from '../../hooks/usePencilBurst';
import { PencilBurst } from '../PencilBurst/PencilBurst';
const styles = StyleSheet.create({
    container: {
        overflow: 'visible',
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
export const Button = ({ children, onPress, variant = 'filled', size = 'medium', gradient = false, gradientColors, disabled = false, loading = false, leftIcon, rightIcon, fullWidth = false, style, textStyle, enablePencilBurst = true, }) => {
    const { theme } = useTheme();
    const scale = useSharedValue(1);
    const { trigger, strokes, progress } = usePencilBurst({
        strokeCount: 8,
        duration: 350,
        maxLength: 20,
        minLength: 10,
    });
    // Animation handlers - cleaner scale animation
    const handlePressIn = useCallback(() => {
        scale.value = withSpring(0.96, theme.animations.springs.snappy);
        if (enablePencilBurst && !disabled && !loading) {
            trigger();
        }
    }, [scale, theme, enablePencilBurst, disabled, loading, trigger]);
    const handlePressOut = useCallback(() => {
        scale.value = withSpring(1, theme.animations.springs.snappy);
    }, [scale, theme]);
    // Animated style
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    const sizeStyles = theme.components?.button?.sizes?.[size] || theme.componentSizes.button[size];
    // Get variant styles
    const getVariantStyles = () => {
        const baseStyle = {
            height: sizeStyles.height,
            paddingHorizontal: sizeStyles.paddingHorizontal,
            borderRadius: theme.borderRadius.full,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing[2],
            borderWidth: 2,
            borderColor: theme.colors.outline,
        };
        const override = theme.components?.button?.variants?.[variant];
        switch (variant) {
            case 'filled':
            case 'gradient':
                return {
                    ...baseStyle,
                    backgroundColor: override?.backgroundColor || theme.colors.primary,
                    borderColor: override?.borderColor || theme.colors.outline,
                    ...theme.elevation[2],
                    shadowColor: theme.colors.shadow,
                };
            case 'outlined':
                return {
                    ...baseStyle,
                    backgroundColor: theme.colors.surface,
                    borderColor: override?.borderColor || theme.colors.outline,
                    ...theme.elevation[0],
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
    const getTextColor = () => {
        if (disabled)
            return theme.colors.onSurfaceVariant;
        switch (variant) {
            case 'filled':
            case 'gradient':
                return theme.components?.button?.variants?.[variant]?.textColor || theme.colors.onPrimary;
            case 'outlined':
            case 'ghost':
                return theme.components?.button?.variants?.[variant]?.textColor || theme.colors.onBackground;
            default:
                return theme.colors.onPrimary;
        }
    };
    // Render content
    const renderContent = () => (<>
      {loading ? (<ActivityIndicator color={getTextColor()} size="small"/>) : (<>
          {leftIcon}
          {typeof children === 'string' ? (<Text style={[
                    styles.text,
                    {
                        color: getTextColor(),
                        fontSize: size === 'medium' ? 14 : size === 'small' ? 12 : 16,
                        fontWeight: '700',
                    },
                    textStyle,
                ]}>
              {children}
            </Text>) : (children)}
          {rightIcon}
        </>)}
    </>);
    return (<AnimatedPressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={disabled || loading} style={[
            styles.container,
            animatedStyle,
            getVariantStyles(),
            disabled && styles.disabled,
            fullWidth && styles.fullWidth,
            style,
        ]}>
      {renderContent()}
      {enablePencilBurst && strokes.length > 0 && (<PencilBurst strokes={strokes} progress={progress} size={180}/>)}
    </AnimatedPressable>);
};
export default memo(Button);
