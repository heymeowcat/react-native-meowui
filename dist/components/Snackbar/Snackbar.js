/**
 * MeowUI Snackbar Component
 * Toast notification with slide animation
 */
import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, } from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Portal } from '../Portal/Portal';
const { width: screenWidth } = Dimensions.get('window');
export const Snackbar = ({ visible, message, action, onDismiss, duration = 4000, position = 'bottom', gradient = false, gradientColors, style, fabOffset = 0, }) => {
    const { theme } = useTheme();
    const translateY = useSharedValue(position === 'bottom' ? 100 : -100);
    const opacity = useSharedValue(0);
    useEffect(() => {
        if (visible) {
            translateY.value = withSpring(0, theme.animations.springs.smooth);
            opacity.value = withTiming(1, theme.animations.timings.entrance);
            // Auto dismiss
            if (duration > 0 && onDismiss) {
                const timeout = setTimeout(() => {
                    onDismiss();
                }, duration);
                return () => clearTimeout(timeout);
            }
        }
        else {
            translateY.value = withTiming(position === 'bottom' ? 100 : -100, theme.animations.timings.exit);
            opacity.value = withTiming(0, theme.animations.timings.exit);
        }
    }, [visible, duration]);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));
    if (!visible)
        return null;
    const content = (<>
      <Text style={[
            styles.message,
            {
                color: gradient ? '#FFFFFF' : theme.colors.onSurface,
                ...theme.typography.bodyMedium,
            },
        ]} numberOfLines={2}>
        {message}
      </Text>
      
      {action && (<Pressable onPress={action.onPress} style={styles.action}>
          <Text style={[
                styles.actionLabel,
                {
                    color: gradient ? '#FFFFFF' : theme.colors.primary,
                    ...theme.typography.labelLarge,
                },
            ]}>
            {action.label}
          </Text>
        </Pressable>)}
    </>);
    const containerStyle = {
        ...styles.container,
        [position]: 24 + fabOffset,
    };
    const snackbarStyle = {
        ...styles.snackbar,
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: theme.borderRadius.md,
        borderWidth: 2,
        borderColor: theme.colors.outline,
        ...theme.elevation[3],
        shadowColor: '#000',
    };
    return (<Portal>
      <Animated.View style={[containerStyle, animatedStyle, style]}>
        <View style={snackbarStyle}>
          {content}
        </View>
      </Animated.View>
    </Portal>);
};
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 16,
        right: 16,
        zIndex: 2000,
    },
    snackbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    message: {
        flex: 1,
    },
    action: {
        marginLeft: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    actionLabel: {
        fontWeight: '600',
    },
});
export default Snackbar;
