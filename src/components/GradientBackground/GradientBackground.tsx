/**
 * MeowUI GradientBackground Component
 * Full-screen animated gradient backgrounds
 */

import React, { useEffect } from 'react';
import { StyleSheet, StyleProp, ViewStyle, Dimensions, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useTheme } from '../../theme';
import type { GradientName } from '../../theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');



export interface GradientBackgroundProps {
  children?: React.ReactNode;
  colors?: string[];
  preset?: GradientName;
  animated?: boolean;
  animationDuration?: number;
  angle?: number;
  style?: StyleProp<ViewStyle>;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  colors,
  preset,
  animated = false,
  animationDuration = 3000,
  angle = 135,
  style,
}) => {
  const { theme } = useTheme();
  
  // Get gradient colors
  const gradientColors = colors || (preset ? theme.gradients[preset] : theme.gradients.primary);
  
  // Animation values
  const rotation = useSharedValue(0);
  
  useEffect(() => {
    if (animated) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: animationDuration,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    }
  }, [animated, animationDuration]);
  
  // Convert angle to start/end points
  const getGradientPoints = (angleDeg: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = Math.cos(angleRad);
    const y = Math.sin(angleRad);
    
    // Normalize to 0-1 range
    const normalize = (val: number) => (val + 1) / 2;
    
    return {
      start: { x: normalize(-x), y: normalize(-y) },
      end: { x: normalize(x), y: normalize(y) },
    };
  };
  
  const { start, end } = getGradientPoints(angle);
  
  // Simple static background for 
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background }, 
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
