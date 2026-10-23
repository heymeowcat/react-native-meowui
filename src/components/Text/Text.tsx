import { memo } from 'react';
import {
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';
import { useTheme, type ThemeFonts, type Tone, type TypographyVariantName } from '../../theme';

/** Maps the typographic weights used in `theme.typography` to sans font slots. */
const WEIGHT_FONT_KEY: Record<string, keyof ThemeFonts> = {
  '400': 'regular',
  '500': 'medium',
  '600': 'semibold',
  '700': 'semibold',
};

/** Display variants resolve through dedicated slots before the sans fallback. */
const DISPLAY_WEIGHT_KEY: Record<string, keyof ThemeFonts> = {
  '400': 'displayRegular',
  '500': 'displayMedium',
  '600': 'displaySemibold',
  '700': 'displaySemibold',
};

/** Variants rendered in the metadata mono voice. */
const MONO_VARIANTS: ReadonlySet<string> = new Set(['overline', 'mono']);

/** Variants rendered in the display voice. */
const DISPLAY_VARIANTS: ReadonlySet<string> = new Set([
  'display',
  'headline',
  'title',
  'subtitle',
]);

const TONE_COLOR_KEY: Record<Exclude<Tone, 'neutral'>, string> = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

export interface TextProps extends Omit<RNTextProps, 'ref'> {
  /** Typographic variant from the theme's type scale. Defaults to `'body'`. */
  variant?: TypographyVariantName;
  /** Semantic tone for the text color. Neutral text uses `colors.onSurface`. */
  tone?: Tone;
  /** Explicit color — wins over `tone`. */
  color?: string;
  /** Text alignment. */
  align?: TextStyle['textAlign'];
  /** Override the variant's font weight. */
  weight?: TextStyle['fontWeight'];
}

/**
 * The kit's typographic primitive. Everything that renders text goes through
 * this so hierarchy, rhythm and font families stay consistent.
 */
export const Text = memo(function Text({
  variant = 'body',
  tone = 'neutral',
  color,
  align,
  weight,
  style,
  ...rest
}: TextProps) {
  const { colors, typography, fonts } = useTheme();

  const variantStyle = typography[variant];
  const resolvedColor =
    color ?? (tone !== 'neutral' ? colors[TONE_COLOR_KEY[tone] as keyof typeof colors] : colors.onSurface);
  // Only override the variant's family when the app actually mapped one —
  // an undefined fontFamily here would clobber the variant's own family.
  // Mono variants resolve through the mono slots, display variants through the
  // display slots (falling back to sans), and body through the weight slots.
  const weightKey = String(weight ?? variantStyle.fontWeight ?? '400');
  const sansKey = WEIGHT_FONT_KEY[weightKey] ?? 'regular';
  const familyFromTheme = MONO_VARIANTS.has(variant)
    ? fonts[weightKey === '400' ? 'monoRegular' : 'monoBold']
    : DISPLAY_VARIANTS.has(variant)
      ? (fonts[DISPLAY_WEIGHT_KEY[weightKey] ?? 'displaySemibold'] ?? fonts[sansKey])
      : fonts[sansKey];

  return (
    <RNText
      style={[
        variantStyle,
        { color: resolvedColor, textAlign: align, fontWeight: weight },
        familyFromTheme ? { fontFamily: familyFromTheme } : null,
        style,
      ]}
      {...rest}
    />
  );
});
