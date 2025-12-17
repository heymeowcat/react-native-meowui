/**
 * MeowUI PencilBurst Component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import { PencilStroke } from '../../hooks/usePencilBurst';

export interface PencilBurstProps {
  strokes: PencilStroke[];
  progress: SharedValue<number>;
  size?: number;
}

interface StrokeProps {
  stroke: PencilStroke;
  progress: SharedValue<number>;
  startOffset: number;
}

const Stroke: React.FC<StrokeProps> = ({ stroke, progress, startOffset }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 0.2, 0.5, 1],
      [0.3, 1.2, 1, 0.6],
      Extrapolation.CLAMP
    );
    
    const opacity = interpolate(
      progress.value,
      [0, 0.15, 0.6, 1],
      [0, 1, 0.9, 0],
      Extrapolation.CLAMP
    );
    
    const translateDistance = interpolate(
      progress.value,
      [0, 1],
      [startOffset, startOffset + stroke.length * 2],
      Extrapolation.CLAMP
    );
    
    const angleRad = (stroke.angle * Math.PI) / 180;
    const translateX = Math.cos(angleRad) * translateDistance;
    const translateY = Math.sin(angleRad) * translateDistance;
    
    return {
      opacity,
      transform: [
        { translateX },
        { translateY },
        { rotate: `${stroke.angle + 90}deg` },
        { scaleY: scale },
        { scaleX: scale * 0.8 },
      ],
    };
  });
  
  const strokeWidth = 4;
  const wobbleOffset = stroke.wobble;
  
  return (
    <Animated.View
      style={[
        styles.strokeContainer,
        animatedStyle,
      ]}
    >

      <View
        style={[
          styles.strokeLine,
          {
            width: strokeWidth,
            height: stroke.length,
            backgroundColor: stroke.color,
            borderRadius: strokeWidth / 2,
            transform: [{ translateX: wobbleOffset }],
          },
        ]}
      />

      <View
        style={[
          styles.strokeLine,
          {
            width: strokeWidth * 0.5,
            height: stroke.length * 0.6,
            backgroundColor: stroke.color,
            borderRadius: strokeWidth / 2,
            opacity: 0.7,
            position: 'absolute',
            transform: [{ translateX: -wobbleOffset * 0.8 }, { translateY: stroke.length * 0.2 }],
          },
        ]}
      />

      <View
        style={[
          styles.strokeDot,
          {
            width: strokeWidth * 1.8,
            height: strokeWidth * 1.8,
            backgroundColor: stroke.color,
            borderRadius: strokeWidth,
            position: 'absolute',
            top: stroke.length - strokeWidth,
          },
        ]}
      />
    </Animated.View>
  );
};

export const PencilBurst: React.FC<PencilBurstProps> = ({
  strokes,
  progress,
  size = 160,
}) => {
  const startOffset = 25;
  
  if (strokes.length === 0) return null;
  
  return (
    <View
      style={styles.container}
      pointerEvents="none"
    >
      {strokes.map((stroke) => (
        <Stroke
          key={stroke.id}
          stroke={stroke}
          progress={progress}
          startOffset={startOffset}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    zIndex: 100,
  },
  strokeContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  strokeLine: {},
  strokeDot: {},
});

export default PencilBurst;

