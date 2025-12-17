/**
 * MeowUI ProgressBar Component
 * MeowUI progress bar with thick border and solid fill
 */
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme';
export const ProgressBar = ({ progress, color, trackColor, style, height = 12, indeterminate = false, }) => {
    const { theme } = useTheme();
    const width = useSharedValue(0);
    useEffect(() => {
        // Clamp progress between 0 and 1
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        width.value = withSpring(clampedProgress, theme.animations.springs.smooth);
    }, [progress, theme]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${width.value * 100}%`,
        };
    });
    return (<View style={[
            styles.track,
            {
                height,
                backgroundColor: trackColor || theme.colors.surfaceVariant,
                borderRadius: height / 2,
                borderWidth: 2,
                borderColor: theme.colors.outline,
            },
            style,
        ]}>
      <Animated.View style={[
            styles.fill,
            {
                backgroundColor: color || theme.colors.primary,
                borderRadius: (height - 4) / 2, // Adjust for border
            },
            animatedStyle,
        ]}/>
    </View>);
};
const styles = StyleSheet.create({
    track: {
        width: '100%',
        overflow: 'hidden',
        justifyContent: 'center',
        padding: 1, // Space for fill to be inside border
    },
    fill: {
        height: '100%',
    },
});
export default ProgressBar;
