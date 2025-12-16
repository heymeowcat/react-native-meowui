/**
 * MeowUI useGradient Hook
 * Utilities for working with gradients
 */
import type { GradientName } from '../theme';
interface UseGradientReturn {
    getGradient: (name: GradientName) => readonly string[];
    interpolateGradient: (gradient1: readonly string[], gradient2: readonly string[], t: number) => string[];
    createCustomGradient: (colors: string[]) => readonly string[];
}
export declare const useGradient: () => UseGradientReturn;
export default useGradient;
