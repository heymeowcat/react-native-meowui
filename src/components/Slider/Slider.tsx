import { memo, useRef } from 'react';
import {
  PanResponder,
  StyleSheet,
  View,
  type AccessibilityActionEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

const TRACK_HEIGHT = 6;
const THUMB_SIZE = 22;
/** Container height — doubles as the generous tap/drag area. */
const HIT_AREA_HEIGHT = 44;

export interface SliderProps {
  /** Current value. */
  value: number;
  /** Called with the next value while the user taps or drags the track. */
  onValueChange?: (value: number) => void;
  /** Lower bound. Defaults to `0`. */
  min?: number;
  /** Upper bound. Defaults to `1`. */
  max?: number;
  /** Snap increment; omit for a continuous slider. */
  step?: number;
  disabled?: boolean;
  /** Accessibility label — adjustable elements should describe what they set. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

function clampToRange(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Snaps `value` to `step` (when positive) and clamps into `[min, max]`. */
function snapToStep(value: number, min: number, max: number, step: number | undefined): number {
  if (step === undefined || step <= 0) return clampToRange(value, min, max);
  const snapped = min + Math.round((value - min) / step) * step;
  return Number(clampToRange(snapped, min, max).toFixed(10));
}

/**
 * Quiet, soft-cut slider: a 6px oat track, a blueberry fill and a paper thumb
 * sitting on a 1px warm cast. Tapping jumps to the touched position and
 * dragging follows the finger; values clamp to `[min, max]` and snap to
 * `step` when provided. Exposes `increment`/`decrement` accessibility actions.
 */
export const Slider = memo(function Slider({
  value,
  onValueChange,
  min = 0,
  max = 1,
  step,
  disabled = false,
  accessibilityLabel,
  style,
  testID,
}: SliderProps) {
  const { colors } = useTheme();

  // Latest props for the once-created PanResponder, plus the measured track
  // width; both are read inside gesture callbacks, never during render.
  const propsRef = useRef({ min, max, step, disabled, onValueChange });
  propsRef.current = { min, max, step, disabled, onValueChange };
  const trackWidthRef = useRef(0);
  const dragRef = useRef({ active: false, baseValue: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !propsRef.current.disabled,
      onMoveShouldSetPanResponder: () => !propsRef.current.disabled,
      onPanResponderGrant: (event) => {
        const { min: lo, max: hi, step: snap, disabled: locked, onValueChange: emit } =
          propsRef.current;
        const width = trackWidthRef.current;
        if (locked || width <= 0) return;
        const locationX = event.nativeEvent.locationX;
        const x = typeof locationX === 'number' && Number.isFinite(locationX) ? locationX : 0;
        const baseValue = lo + clampToRange(x / width, 0, 1) * (hi - lo);
        dragRef.current = { active: true, baseValue };
        emit?.(snapToStep(baseValue, lo, hi, snap));
      },
      onPanResponderMove: (_event, gestureState) => {
        const { min: lo, max: hi, step: snap, disabled: locked, onValueChange: emit } =
          propsRef.current;
        const { active, baseValue } = dragRef.current;
        const width = trackWidthRef.current;
        if (!active || locked || width <= 0) return;
        const next = baseValue + (gestureState.dx / width) * (hi - lo);
        emit?.(snapToStep(next, lo, hi, snap));
      },
      onPanResponderRelease: () => {
        dragRef.current.active = false;
      },
      onPanResponderTerminate: () => {
        dragRef.current.active = false;
      },
    })
  ).current;

  const range = max - min;
  const progress = range > 0 ? clampToRange((value - min) / range, 0, 1) : 0;

  const fillColor = disabled ? colors.onSurfaceSubtle : colors.primary;

  const handleAccessibilityAction = (event: AccessibilityActionEvent) => {
    if (disabled) return;
    const stepSize = step !== undefined && step > 0 ? step : (max - min) / 100;
    const delta = event.nativeEvent.actionName === 'increment' ? stepSize : -stepSize;
    onValueChange?.(snapToStep(value + delta, min, max, step));
  };

  return (
    <View
      style={[styles.container, style]}
      onLayout={(event) => {
        trackWidthRef.current = event.nativeEvent.layout.width;
      }}
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min, max, now: value }}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled || undefined}
      accessibilityState={{ disabled }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={handleAccessibilityAction}
      testID={testID}
      {...panResponder.panHandlers}
    >
      {/* pointerEvents none so grant locationX is always relative to this container */}
      <View
        style={[styles.track, { backgroundColor: colors.surfaceActive }]}
        pointerEvents="none"
      >
        <View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: fillColor }]} />
      </View>
      <View
        pointerEvents="none"
        style={[styles.thumbWrap, { left: `${progress * 100}%` }]}
      >
        <View style={[styles.thumbCast, { backgroundColor: colors.shadow }]} />
        <View
          style={[
            styles.thumb,
            {
              backgroundColor: disabled ? colors.surfaceMuted : colors.surface,
              borderColor: disabled ? colors.outline : colors.primary,
            },
          ]}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: HIT_AREA_HEIGHT,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 9999,
  },
  thumbWrap: {
    position: 'absolute',
    top: (HIT_AREA_HEIGHT - THUMB_SIZE) / 2,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    marginLeft: -THUMB_SIZE / 2,
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
    borderWidth: 2,
  },
});
