import { memo, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

export type ActivityIndicatorSize = 'sm' | 'md' | 'lg';

/** Ring diameter per size. */
const SIZE: Record<ActivityIndicatorSize, number> = { sm: 16, md: 20, lg: 24 };

export interface ActivityIndicatorProps {
  /** Ring diameter. Defaults to `'md'`. */
  size?: ActivityIndicatorSize;
  /** Arc color. Defaults to `colors.primary`. */
  color?: string;
  /**
   * Style for the wrapper View. Size it (e.g. `width`/`height`) to reserve
   * layout space — the ring is centered inside it.
   */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A quiet indeterminate spinner: a full-radius ring whose top arc carries the
 * accent color, spinning on a native-driven 0→360° rotation.
 */
export const ActivityIndicator = memo(function ActivityIndicator({
  size = 'md',
  color,
  style,
  testID,
}: ActivityIndicatorProps) {
  const { colors } = useTheme();
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [rotation]);

  const box = SIZE[size];

  return (
    <View style={[styles.center, style]} testID={testID}>
      <Animated.View
        style={[
          styles.ring,
          {
            width: box,
            height: box,
            borderWidth: size === 'sm' ? 2 : 2.5,
            borderTopColor: color ?? colors.primary,
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    borderRadius: 9999,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});
