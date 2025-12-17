/**
 * MeowUI ActivityIndicator
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

export type ActivityIndicatorSize = 'small' | 'medium' | 'large';

export interface ActivityIndicatorProps {
  animating?: boolean;
  color?: string;
  size?: ActivityIndicatorSize | number;
  style?: StyleProp<ViewStyle>;
  /** Show playful bounce animation */
  playful?: boolean;
}

const SIZE_MAP = {
  small: 20,
  medium: 32,
  large: 48,
};

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  animating = true,
  color,
  size = 'medium',
  style,
  playful = true,
}) => {
  const { theme } = useTheme();
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const dotScale1 = useSharedValue(1);
  const dotScale2 = useSharedValue(0.6);
  const dotScale3 = useSharedValue(0.3);
  
  const indicatorSize = typeof size === 'number' ? size : SIZE_MAP[size];
  const indicatorColor = color || theme.colors.primary;
  const dotSize = indicatorSize / 4;
  
  useEffect(() => {
    if (animating) {
      // Main rotation
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
      
      if (playful) {
        // Playful bounce
        scale.value = withRepeat(
          withSequence(
            withTiming(1.1, { duration: 300, easing: Easing.out(Easing.ease) }),
            withTiming(0.9, { duration: 300, easing: Easing.in(Easing.ease) }),
            withTiming(1, { duration: 200 })
          ),
          -1,
          true
        );
        
        // Staggered dot animations
        dotScale1.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 200 }),
            withTiming(0.5, { duration: 200 })
          ),
          -1,
          true
        );
        
        dotScale2.value = withRepeat(
          withSequence(
            withTiming(0.5, { duration: 200 }),
            withTiming(1, { duration: 200 })
          ),
          -1,
          true
        );
      }
    } else {
      cancelAnimation(rotation);
      cancelAnimation(scale);
    }
    
    return () => {
      cancelAnimation(rotation);
      cancelAnimation(scale);
    };
  }, [animating, playful]);
  
  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));
  
  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: dotScale1.value }],
  }));
  
  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: dotScale2.value }],
  }));
  
  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: dotScale3.value }],
  }));
  
  if (!animating) return null;
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: indicatorSize,
          height: indicatorSize,
        },
        containerStyle,
        style,
      ]}
    >
      {/* Three dots in a triangle pattern */}
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: indicatorColor,
            position: 'absolute',
            top: 0,
            left: '50%',
            marginLeft: -dotSize / 2,
          },
          dot1Style,
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: indicatorColor,
            position: 'absolute',
            bottom: dotSize / 2,
            left: dotSize / 2,
            opacity: 0.7,
          },
          dot2Style,
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: indicatorColor,
            position: 'absolute',
            bottom: dotSize / 2,
            right: dotSize / 2,
            opacity: 0.4,
          },
          dot3Style,
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {},
});

export default ActivityIndicator;
