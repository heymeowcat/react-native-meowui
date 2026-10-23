import { memo, type ReactNode } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { useTheme } from '../../theme';

/**
 * Minimal contract any icon font or icon component must satisfy. Compatible
 * with `react-native-vector-icons` and `@expo/vector-icons` out of the box.
 */
export interface IconRendererProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

/**
 * Widened on purpose: icon fonts type `name` as a closed union of glyphs,
 * which is not contravariance-compatible with a `name: string` contract —
 * `ComponentType<IconRendererProps>` rejects every real icon font.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IconComponent = React.ComponentType<any>;

let defaultRenderer: IconComponent | null = null;

/**
 * Register the app-wide icon renderer once at startup:
 *
 * ```tsx
 * import Ionicons from '@expo/vector-icons/Ionicons';
 * import { setIconRenderer } from 'react-native-meowui';
 *
 * setIconRenderer(Ionicons);
 * ```
 */
export function setIconRenderer(renderer: IconComponent | null): void {
  defaultRenderer = renderer;
}

export interface IconProps extends IconRendererProps {
  /** Per-call renderer override. */
  renderer?: IconComponent;
}

/**
 * Renders an icon through the registered renderer. Renders nothing when no
 * renderer has been registered — components that accept `ReactNode` icons
 * are unaffected either way.
 */
export const Icon = memo(function Icon({
  name,
  size = 20,
  color,
  renderer,
  style,
}: IconProps) {
  const { colors } = useTheme();
  const Renderer = renderer ?? defaultRenderer;

  if (!Renderer) {
    if (__DEV__) {
      console.warn(
        'MeowUI: <Icon> rendered before setIconRenderer() was called — pass a `renderer` prop or register one at app startup.'
      );
    }
    return null as unknown as ReactNode;
  }

  return <Renderer name={name} size={size} color={color ?? colors.onSurface} style={style} />;
});
