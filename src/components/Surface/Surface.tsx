import { memo } from 'react';
import { View, type ViewProps } from 'react-native';
import { useTheme, type RadiusKey } from '../../theme';
import { Cast, type CastLevel } from '../../utils/cast';

export interface SurfaceProps extends Omit<ViewProps, 'ref'> {
  /** Soft paper-cast depth in px. Cards use 1–2; overlays prefer blurred shadows. */
  cast?: CastLevel | number;
  /** Draw the 1px paper border. Defaults to `true`. */
  outlined?: boolean;
  /** Corner radius token. Defaults to `'xl'` (16). */
  radius?: RadiusKey;
  /** Fill color. Defaults to `colors.surface`. */
  backgroundColor?: string;
  /** Border color override. Defaults to `colors.outline`. */
  borderColor?: string;
}

/**
 * The kit's container primitive: a milk-paper sheet bounded by a 1px warm
 * hairline, with an optional soft paper cast for depth. Cards, sheets, app
 * bars and lists are all Surfaces.
 */
export const Surface = memo(function Surface({
  cast = 0,
  outlined = true,
  radius = 'xl',
  backgroundColor,
  borderColor,
  style,
  ...rest
}: SurfaceProps) {
  const { colors, radii } = useTheme();

  return (
    <Cast
      level={cast}
      color={colors.shadowSoft}
      radius={radii[radius]}
      style={cast > 0 ? { marginRight: cast, marginBottom: cast } : undefined}
    >
      <View
        style={[
          {
            backgroundColor: backgroundColor ?? colors.surface,
            borderRadius: radii[radius],
          },
          outlined && { borderWidth: 1, borderColor: borderColor ?? colors.outline },
          style,
        ]}
        {...rest}
      />
    </Cast>
  );
});
