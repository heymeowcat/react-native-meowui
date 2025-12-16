/**
 * MeowUI Chip Component
 * Selectable chips with animation and gradient variant
 */
import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, } from 'react-native-reanimated';
import { useTheme } from '../../theme';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const Chip = ({ children, variant = 'filled', selected = false, onPress, onClose, leftIcon, rightIcon, gradientColors, disabled = false, style, }) => {
    const { theme } = useTheme();
    const scale = useSharedValue(1);
    const handlePressIn = () => {
        scale.value = withSpring(0.95, theme.animations.springs.snappy);
    };
    const handlePressOut = () => {
        scale.value = withSpring(1, theme.animations.springs.snappy);
    };
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    // Get variant styles
    const getVariantStyles = () => {
        const baseStyle = {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: theme.borderRadius.full,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            borderWidth: 2,
            borderColor: theme.colors.outline,
        };
        if (selected) {
            return {
                ...baseStyle,
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.outline,
            };
        }
        return {
            ...baseStyle,
            backgroundColor: theme.colors.surfaceVariant,
        };
    };
    const content = (<>
      {leftIcon}
      <Text style={[
            styles.text,
            {
                color: selected ? theme.colors.onPrimary : theme.colors.onSurface,
                fontSize: theme.typography.labelMedium.fontSize,
                fontWeight: theme.typography.labelMedium.fontWeight,
            },
        ]}>
        {children}
      </Text>
      {rightIcon}
      {onClose && (<Pressable onPress={onClose} hitSlop={8} style={styles.closeButton}>
          <Text style={[styles.closeIcon, { color: selected ? theme.colors.onPrimary : theme.colors.onSurface }]}>×</Text>
        </Pressable>)}
    </>);
    return (<AnimatedPressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={disabled} style={[animatedStyle, getVariantStyles(), disabled && styles.disabled, style]}>
      {content}
    </AnimatedPressable>);
};
const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
    },
    closeButton: {
        marginLeft: 2,
    },
    closeIcon: {
        fontSize: 16,
        fontWeight: '600',
    },
    disabled: {
        opacity: 0.5,
    },
});
export default Chip;
