/**
 * MeowUI Collapsible Component
 * Generic animated container for expanding/collapsing content
 */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme';
export const Collapsible = ({ expanded, children, duration = 300, style, }) => {
    const [measuredHeight, setMeasuredHeight] = useState(0);
    const height = useSharedValue(0);
    const { theme } = useTheme();
    const onLayout = (event) => {
        const layoutHeight = event.nativeEvent.layout.height;
        if (layoutHeight > 0 && layoutHeight !== measuredHeight) {
            setMeasuredHeight(layoutHeight);
        }
    };
    useEffect(() => {
        if (expanded) {
            height.value = withSpring(measuredHeight, theme.animations.springs.smooth);
        }
        else {
            height.value = withTiming(0, { duration });
        }
    }, [expanded, measuredHeight, theme, duration]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
            opacity: height.value === 0 ? 0 : 1,
        };
    });
    return (<View style={[styles.container, style]}>
      {/* Hidden measurement container */}
      <View style={styles.hiddenContainer} onLayout={onLayout}>
        {children}
      </View>

      {/* Visible animated container */}
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        {children}
      </Animated.View>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    hiddenContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        opacity: 0,
        zIndex: -1,
    },
    animatedContainer: {
        overflow: 'hidden',
    },
});
export default Collapsible;
