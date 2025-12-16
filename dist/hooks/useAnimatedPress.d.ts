/**
 * MeowUI useAnimatedPress Hook
 * Provides animated press feedback for interactive components
 */
import { useAnimatedStyle } from 'react-native-reanimated';
interface UseAnimatedPressOptions {
    scaleDown?: number;
    opacityDown?: number;
}
interface UseAnimatedPressReturn {
    animatedStyle: ReturnType<typeof useAnimatedStyle>;
    onPressIn: () => void;
    onPressOut: () => void;
}
export declare const useAnimatedPress: (options?: UseAnimatedPressOptions) => UseAnimatedPressReturn;
export default useAnimatedPress;
