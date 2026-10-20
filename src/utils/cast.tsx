import { useState, type ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

/** Cast depth: 1 = chips/fields, 2 = buttons/cards, 3 = raised layers. */
export type CastLevel = 0 | 1 | 2 | 3;

/**
 * Tracks the tactile press state: components translate their content 1px into
 * the cast and collapse it while pressed, like a soft key bottoming out.
 */
export function usePressState(): [boolean, { onPressIn: () => void; onPressOut: () => void }] {
  const [pressed, setPressed] = useState(false);
  return [
    pressed,
    {
      onPressIn: () => setPressed(true),
      onPressOut: () => setPressed(false),
    },
  ];
}

export interface CastProps {
  /** Offset of the warm projection in px (all directions). */
  level: CastLevel | number;
  /** Cast color — `theme.colors.shadow` (controls) or `shadowSoft` (surfaces). */
  color: string;
  /** Corner radius of the projection; match the control's radius. */
  radius?: number;
  children?: ReactNode;
  /** Applied to the outer wrapper (layout styles from the caller). */
  style?: StyleProp<ViewStyle>;
}

/**
 * A soft paper projection rendered behind a control: a translucent warm layer
 * offset down and to the right, rounded to the same radius as its child. No
 * blur, no elevation — depth comes from pressed paper stacked on paper.
 *
 * Children draw their own 1px border or solid fill; the cast sits behind it.
 */
export function Cast({ level, color, radius, children, style }: CastProps) {
  const offset = level as number;
  return (
    <View style={style}>
      {offset > 0 && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: offset,
            left: offset,
            right: -offset,
            bottom: -offset,
            backgroundColor: color,
            borderRadius: radius,
          }}
        />
      )}
      {children}
    </View>
  );
}

const ELEVATION_1: ViewStyle = {
  shadowOpacity: 1,
  shadowRadius: 3,
  shadowOffset: { width: 0, height: 1 },
  elevation: 1,
};

const ELEVATION_2: ViewStyle = {
  shadowOpacity: 1,
  shadowRadius: 7,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3,
};

const ELEVATION_3: ViewStyle = {
  shadowOpacity: 1,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 7 },
  elevation: 8,
};

const NO_ELEVATION: ViewStyle = {};

/**
 * Soft blurred shadows for floating layers only — menus, dialogs, sheets,
 * snackbars. The cast's alpha lives in `color` (`colors.shadow`), so light and
 * dark themes keep their own depth without a second opacity knob.
 */
export function softElevation(level: 0 | 1 | 2 | 3, color = 'rgba(62, 52, 42, 0.18)'): ViewStyle {
  if (level === 0) return NO_ELEVATION;
  const base = level === 1 ? ELEVATION_1 : level === 2 ? ELEVATION_2 : ELEVATION_3;
  return { ...base, shadowColor: color };
}
