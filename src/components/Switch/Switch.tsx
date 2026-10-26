import { memo, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme, type ThemeColors, type Tone } from '../../theme';
import { Pressable } from '../Pressable/Pressable';

export type SwitchTone = Exclude<Tone, 'neutral'>;

type ToneTokens = Record<'fill', keyof ThemeColors>;

const TONE: Record<SwitchTone, ToneTokens> = {
  primary: { fill: 'primary' },
  success: { fill: 'success' },
  warning: { fill: 'warning' },
  error: { fill: 'error' },
  info: { fill: 'info' },
};

const TRACK_W = 50;
const TRACK_H = 30;
const THUMB = 24;
const INSET = 3;

export interface SwitchProps {
  checked: boolean;
  onValueChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Semantic color family for the active track. Defaults to `'primary'`. */
  tone?: SwitchTone;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A 50×30 pill switch. Active fills the track with the tone (blueberry by
 * default) and slides a paper thumb across; the thumb carries two soft ridges
 * and a 1px cast that disappears as the track fills.
 */
export const Switch = memo(function Switch({
  checked,
  onValueChange,
  disabled = false,
  tone = 'primary',
  accessibilityLabel,
  style,
  testID,
}: SwitchProps) {
  const { colors, motion } = useTheme();
  const tokens = TONE[tone];
  const position = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(position, {
      toValue: checked ? 1 : 0,
      duration: motion.durationFast,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [checked, motion.durationFast, position]);

  const travel = TRACK_W - THUMB - INSET * 2;
  const translateX = position.interpolate({ inputRange: [0, 1], outputRange: [0, travel] });

  const trackColor = disabled
    ? colors.surfaceMuted
    : checked
      ? colors[tokens.fill]
      : colors.surfaceActive;

  const trackBorder = disabled
    ? colors.outline
    : checked
      ? colors[tokens.fill]
      : colors.outlineStrong;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onValueChange?.(!checked)}
      radius="full"
      tint={colors.surfaceMuted}
      disabledOpacity={1}
      style={[styles.hit, style]}
      testID={testID}
    >
      <View style={[styles.track, { backgroundColor: trackColor, borderColor: trackBorder }]}>
        <Animated.View style={[styles.thumbWrap, { transform: [{ translateX }] }]}>
          {!checked && !disabled && (
            <View style={[styles.thumbCast, { backgroundColor: colors.shadow }]} />
          )}
          <View
            style={[
              styles.thumb,
              {
                backgroundColor: disabled ? colors.surfaceMuted : colors.surface,
                borderColor: disabled ? colors.outline : colors.outlineStrong,
              },
            ]}
          >
            <View style={[styles.ridge, { backgroundColor: colors.outlineStrong }]} />
            <View style={[styles.ridge, { backgroundColor: colors.outlineStrong }]} />
          </View>
        </Animated.View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  hit: {
    minHeight: 44,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: 9999,
    borderWidth: 1,
    justifyContent: 'center',
  },
  thumbWrap: {
    position: 'absolute',
    top: INSET,
    left: INSET,
    width: THUMB,
    height: THUMB,
  },
  thumbCast: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: -1,
    bottom: -1,
    borderRadius: 9999,
  },
  thumb: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 9999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  ridge: {
    width: 1.5,
    height: 10,
    borderRadius: 1,
    opacity: 0.7,
  },
});
