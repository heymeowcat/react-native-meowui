/**
 * MeowUI useGradient Hook
 * Utilities for working with gradients
 */

import { useMemo } from 'react';
import { useTheme } from '../theme';
import type { GradientName } from '../theme';

interface UseGradientReturn {
  getGradient: (name: GradientName) => readonly string[];
  interpolateGradient: (gradient1: readonly string[], gradient2: readonly string[], t: number) => string[];
  createCustomGradient: (colors: string[]) => readonly string[];
}

export const useGradient = (): UseGradientReturn => {
  const { theme } = useTheme();
  
  const getGradient = useMemo(() => {
    return (name: GradientName): readonly string[] => {
      return theme.gradients[name];
    };
  }, [theme.gradients]);
  
  const interpolateGradient = useMemo(() => {
    return (gradient1: readonly string[], gradient2: readonly string[], t: number): string[] => {
      // Simple linear interpolation between two gradients
      // t should be between 0 and 1
      const clampedT = Math.max(0, Math.min(1, t));
      const maxLength = Math.max(gradient1.length, gradient2.length);
      
      const result: string[] = [];
      for (let i = 0; i < maxLength; i++) {
        const color1 = gradient1[Math.min(i, gradient1.length - 1)];
        const color2 = gradient2[Math.min(i, gradient2.length - 1)];
        
        // For simplicity, we'll just pick based on t
        // A more complex implementation would actually interpolate hex colors
        result.push(clampedT < 0.5 ? color1 : color2);
      }
      
      return result;
    };
  }, []);
  
  const createCustomGradient = useMemo(() => {
    return (colors: string[]): readonly string[] => {
      return colors as readonly string[];
    };
  }, []);
  
  return {
    getGradient,
    interpolateGradient,
    createCustomGradient,
  };
};

export default useGradient;
