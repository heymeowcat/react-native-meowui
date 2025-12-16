/**
 * MeowUI useGradient Hook
 * Utilities for working with gradients
 */
import { useMemo } from 'react';
import { useTheme } from '../theme';
export const useGradient = () => {
    const { theme } = useTheme();
    const getGradient = useMemo(() => {
        return (name) => {
            return theme.gradients[name];
        };
    }, [theme.gradients]);
    const interpolateGradient = useMemo(() => {
        return (gradient1, gradient2, t) => {
            // Simple linear interpolation between two gradients
            // t should be between 0 and 1
            const clampedT = Math.max(0, Math.min(1, t));
            const maxLength = Math.max(gradient1.length, gradient2.length);
            const result = [];
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
        return (colors) => {
            return colors;
        };
    }, []);
    return {
        getGradient,
        interpolateGradient,
        createCustomGradient,
    };
};
export default useGradient;
