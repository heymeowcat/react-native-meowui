import { memo, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme, type RadiusKey } from '../../theme';

export interface SkeletonProps {
  /** Defaults to `'100%'`. */
  width?: number | string;
  /** Defaults to `14`. */
  height?: number;
  /** Corner radius token. Defaults to `'sm'`. */
  radius?: RadiusKey;
  /** Force a circle: `width` collapses to `height` and the radius becomes full. */
  circle?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A quiet placeholder block that pulses while content loads. Compose several
 * to sketch the shape of the real content instead of showing spinners.
 */
export const Skeleton = memo(function Skeleton({
  width = '100%',
  height = 14,
  radius = 'sm',
  circle = false,
  style,
  testID,
}: SkeletonProps) {
  const { colors, radii } = useTheme();
  const pulse = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.6,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={[
        {
          width: circle ? height : width,
          height,
          borderRadius: circle ? radii.full : radii[radius],
          backgroundColor: colors.surfaceActive,
          opacity: pulse,
        },
        style,
      ]}
      testID={testID}
    />
  );
});
