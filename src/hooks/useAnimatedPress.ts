/**
 * MeowUI useAnimatedPress Hook
 * Provides animated press feedback for interactive components
 */

import { useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../theme';

interface UseAnimatedPressOptions {
  scaleDown?: number;
  opacityDown?: number;
}

interface UseAnimatedPressReturn {
  animatedStyle: ReturnType<typeof useAnimatedStyle>;
  onPressIn: () => void;
  onPressOut: () => void;
}

export const useAnimatedPress = (
  options: UseAnimatedPressOptions = {}
): UseAnimatedPressReturn => {
  const { theme } = useTheme();
  const {
    scaleDown = theme.animations.pressAnimation.scale,
    opacityDown = theme.animations.pressAnimation.opacity,
  } = options;
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  const onPressIn = useCallback(() => {
    scale.value = withSpring(scaleDown, theme.animations.springs.snappy);
    opacity.value = withSpring(opacityDown, theme.animations.springs.snappy);
  }, [scale, opacity, scaleDown, opacityDown, theme]);
  
  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, theme.animations.springs.snappy);
    opacity.value = withSpring(1, theme.animations.springs.snappy);
  }, [scale, opacity, theme]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));
  
  return {
    animatedStyle,
    onPressIn,
    onPressOut,
  };
};

export default useAnimatedPress;
