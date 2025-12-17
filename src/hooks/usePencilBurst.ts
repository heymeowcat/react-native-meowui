/**
 * MeowUI PencilBurst Hook
 */

import { useCallback, useState } from 'react';
import {
  useSharedValue,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

export interface PencilStroke {
  id: number;
  angle: number;
  length: number;
  wobble: number;
  color: string;
  delay: number;
}

export interface UsePencilBurstOptions {
  strokeCount?: number;
  colors?: string[];
  duration?: number;
  maxLength?: number;
  minLength?: number;
}

const DEFAULT_COLORS = [
  '#D946EF', // Magenta
  '#FACC15', // Yellow
  '#06B6D4', // Cyan
  '#22C55E', // Green
  '#F97316', // Orange
  '#EC4899', // Pink
];

export const usePencilBurst = (options: UsePencilBurstOptions = {}) => {
  const {
    strokeCount = 8,
    colors = DEFAULT_COLORS,
    duration = 400,
    maxLength = 25,
    minLength = 12,
  } = options;
  
  const [strokes, setStrokes] = useState<PencilStroke[]>([]);
  const [isActive, setIsActive] = useState(false);
  
  const progress = useSharedValue(0);
  
  const generateStrokes = useCallback(() => {
    const newStrokes: PencilStroke[] = [];
    const angleStep = 360 / strokeCount;
    
    for (let i = 0; i < strokeCount; i++) {
      const baseAngle = i * angleStep;
      const angleVariance = (Math.random() - 0.5) * 30;
      
      newStrokes.push({
        id: i,
        angle: baseAngle + angleVariance,
        length: minLength + Math.random() * (maxLength - minLength),
        wobble: (Math.random() - 0.5) * 8, // Random wobble for hand-drawn feel
        color: colors[i % colors.length],
        delay: Math.random() * 50, // Staggered start
      });
    }
    
    return newStrokes;
  }, [strokeCount, colors, maxLength, minLength]);
  
  const trigger = useCallback(() => {
    const newStrokes = generateStrokes();
    setStrokes(newStrokes);
    setIsActive(true);
    
    progress.value = 0;
    progress.value = withSequence(
      withTiming(1, { duration: duration * 0.6, easing: Easing.out(Easing.cubic) }),
      withDelay(
        duration * 0.1,
        withTiming(0, { duration: duration * 0.3, easing: Easing.in(Easing.ease) }, () => {
          runOnJS(setIsActive)(false);
          runOnJS(setStrokes)([]);
        })
      )
    );
  }, [generateStrokes, duration, progress]);
  
  return {
    trigger,
    strokes,
    isActive,
    progress,
  };
};

export default usePencilBurst;
