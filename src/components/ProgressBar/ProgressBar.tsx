import { memo, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface ProgressBarProps {
  /** 0..1; omit for the indeterminate sliding block. */
  progress?: number;
  /** Track height. Defaults to `12` — a chunky, pocket-instrument gauge. */
  height?: number;
  /** Fill color. Defaults to `colors.primary` (blueberry). */
  color?: string;
  trackColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A pocket gauge: oat track in a hairline frame with a blueberry fill. The
 * determinate fill animates its width on the JS driver — width is not a
 * native-driveable property and the track is a single small view.
 * Indeterminate mode slides a block with a native-driven transform loop.
 */
export const ProgressBar = memo(function ProgressBar({
  progress,
  height = 12,
  color,
  trackColor,
  style,
  testID,
}: ProgressBarProps) {
  const { colors } = useTheme();
  const fill = color ?? colors.primary;
  const track = trackColor ?? colors.surfaceMuted;

  const anim = useRef(new Animated.Value(0)).current;
  const [trackWidth, setTrackWidth] = useState(0);
  const clamped = progress === undefined ? undefined : Math.max(0, Math.min(1, progress));

  useEffect(() => {
    if (progress === undefined) {
      // indeterminate: slide a 30% block across the track forever
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 1100,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1100,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
    Animated.timing(anim, {
      toValue: Math.max(0, Math.min(1, progress)),
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress, anim]);

  if (progress === undefined) {
    const translateX = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-Math.max(trackWidth * 0.3, 10), Math.max(trackWidth, 10)],
    });
    return (
      <View
        accessibilityRole="progressbar"
        style={[styles.track, { height, backgroundColor: track, borderColor: colors.outline }, style]}
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
        testID={testID}
      >
        <Animated.View style={[styles.fill, { width: Math.max(trackWidth * 0.3, 10), backgroundColor: fill, transform: [{ translateX }] }]} />
      </View>
    );
  }

  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 1, now: clamped ?? 0 }}
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={clamped ?? 0}
      style={[styles.track, { height, backgroundColor: track, borderColor: colors.outline }, style]}
      testID={testID}
    >
      <Animated.View style={[styles.fill, { width, backgroundColor: fill }]} />
    </View>
  );
});

const styles = StyleSheet.create({
  track: {
    borderWidth: 1,
    borderRadius: 9999,
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  fill: {
    height: '100%',
    borderRadius: 9999,
  },
});
