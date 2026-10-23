import { forwardRef, memo } from 'react';
import {
  Pressable as RNPressable,
  type HostInstance,
  type PressableProps as RNPressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme, type RadiusKey } from '../../theme';

/**
 * Handle to the underlying host view. Declared structurally (instead of
 * re-exporting RN's `HostInstance`, which aliases a compiler-private class
 * that cannot appear in emitted declarations).
 */
export interface PressableRef {
  focus(options?: { preventScroll?: boolean }): void;
  blur(): void;
  measure(fn: (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => void): void;
  measureInWindow(fn: (x: number, y: number, width: number, height: number) => void): void;
}

export interface PressableProps extends Omit<RNPressableProps, 'ref'> {
  /**
   * Background color applied while pressed. When omitted, pressed feedback is
   * a subtle opacity dip — safe on any background.
   */
  tint?: string;
  /** Corner radius as a token key or explicit number. Defaults to `'sm'`. */
  radius?: RadiusKey | number;
  /** Opacity applied while pressed when no `tint` is given. Defaults to `0.85`. */
  pressedOpacity?: number;
  /** Opacity applied when disabled. Defaults to `0.45`. */
  disabledOpacity?: number;
}

/**
 * The kit's touchable primitive. Communicates pressed state with a background
 * tint or opacity dip only — no scale, no springs. All interactive MeowUI
 * components are built on this.
 */
export const Pressable = memo(
  forwardRef<PressableRef, PressableProps>(function Pressable(
    {
      tint,
      radius = 'sm',
      pressedOpacity = 0.85,
      disabledOpacity = 0.45,
      disabled,
      accessibilityState,
      accessibilityValue,
      style,
      ...rest
    },
    ref
  ) {
    const { radii } = useTheme();
    const borderRadius = typeof radius === 'number' ? radius : radii[radius];

    // React Native Web does not translate accessibilityState/Value into ARIA
    // attributes, so surface them explicitly for assistive tech on the web.
    const ariaState = accessibilityState && {
      'aria-busy': accessibilityState.busy,
      'aria-checked': accessibilityState.checked,
      'aria-disabled': disabled || accessibilityState.disabled,
      'aria-expanded': accessibilityState.expanded,
      'aria-selected': accessibilityState.selected,
    };
    const ariaValue = accessibilityValue && {
      'aria-valuemax': accessibilityValue.max,
      'aria-valuemin': accessibilityValue.min,
      'aria-valuenow': accessibilityValue.now,
      'aria-valuetext': accessibilityValue.text,
    };

    return (
      <RNPressable
        ref={ref as React.Ref<HostInstance>}
        disabled={disabled}
        style={({ pressed }: PressableStateCallbackType) => {
          return [
            { borderRadius },
            typeof style === 'function' ? style({ pressed }) : style,
            pressed && tint !== undefined && { backgroundColor: tint },
            pressed && tint === undefined && { opacity: pressedOpacity },
            disabled && { opacity: disabledOpacity },
          ] as StyleProp<ViewStyle>;
        }}
        accessibilityState={accessibilityState}
        accessibilityValue={accessibilityValue}
        {...ariaState}
        {...ariaValue}
        {...rest}
      />
    );
  })
);
