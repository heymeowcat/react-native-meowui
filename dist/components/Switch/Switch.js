/**
 * MeowUI Switch Component
 * MeowUI toggle switch with hard shadow thumb
 */
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor } from 'react-native-reanimated';
import { useTheme } from '../../theme';
export const Switch = ({ value, onValueChange, disabled = false, color, style, }) => {
    const { theme } = useTheme();
    const progress = useSharedValue(value ? 1 : 0);
    useEffect(() => {
        progress.value = withSpring(value ? 1 : 0, theme.animations.springs.bouncy);
    }, [value, theme]);
    const handlePress = () => {
        if (!disabled && onValueChange) {
            onValueChange(!value);
        }
    };
    const TRACK_WIDTH = 50;
    const TRACK_HEIGHT = 28;
    const THUMB_SIZE = 22;
    const PADDING = 3;
    const animatedTrackStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(progress.value, [0, 1], [theme.colors.surfaceVariant, color || theme.colors.primary]);
        const borderColor = interpolateColor(progress.value, [0, 1], [theme.colors.outline, color || theme.colors.primary]);
        return {
            backgroundColor,
            borderColor,
        };
    });
    const animatedThumbStyle = useAnimatedStyle(() => {
        const translateX = progress.value * (TRACK_WIDTH - THUMB_SIZE - (PADDING * 2));
        return {
            transform: [{ translateX }],
        };
    });
    return (<Pressable onPress={handlePress} disabled={disabled} style={[
            styles.container,
            { opacity: disabled ? 0.5 : 1 },
            style
        ]}>
      <Animated.View style={[
            styles.track,
            {
                width: TRACK_WIDTH,
                height: TRACK_HEIGHT,
                borderRadius: TRACK_HEIGHT / 2,
                borderWidth: 2,
                padding: PADDING,
            },
            animatedTrackStyle,
        ]}>
        <Animated.View style={[
            styles.thumb,
            {
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                borderRadius: THUMB_SIZE / 2,
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.outline,
            },
            animatedThumbStyle,
        ]}/>
      </Animated.View>
    </Pressable>);
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    track: {
        justifyContent: 'center',
    },
    thumb: {
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
    },
});
export default Switch;
