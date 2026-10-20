import type { Metrics, Motion, Radii, Spacing, TypographyVariants, ZIndex } from './types';

/**
 * The kit's three voices: **Fraunces** for display and headings, **DM Sans**
 * for body and controls, **DM Mono** for metadata, counters and code. All
 * three are optional — apps load them (e.g. via `@expo-google-fonts`) and map
 * them through `theme.fonts`; unmapped variants fall back to the system font.
 */
export const sansFamily = 'DM Sans';
export const displayFamily = 'Fraunces';
export const monoFamily = 'DM Mono';

/**
 * Typography — a soft serif voice, humanist body copy and stamped metadata.
 */
export const typography: TypographyVariants = {
  display: { fontSize: 32, lineHeight: 38, fontWeight: '600', letterSpacing: -0.4, fontFamily: displayFamily },
  headline: { fontSize: 24, lineHeight: 30, fontWeight: '600', letterSpacing: -0.3, fontFamily: displayFamily },
  title: { fontSize: 15, lineHeight: 20, fontWeight: '600', letterSpacing: -0.1, fontFamily: displayFamily },
  subtitle: { fontSize: 13, lineHeight: 18, fontWeight: '600', fontFamily: displayFamily },
  bodyLarge: { fontSize: 16, lineHeight: 24, fontWeight: '400', fontFamily: sansFamily },
  body: { fontSize: 14, lineHeight: 21, fontWeight: '400', fontFamily: sansFamily },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '500', letterSpacing: 0.1, fontFamily: sansFamily },
  caption: { fontSize: 11, lineHeight: 16, fontWeight: '400', letterSpacing: 0.1, fontFamily: sansFamily },
  overline: { fontSize: 10, lineHeight: 14, fontWeight: '500', letterSpacing: 1, textTransform: 'uppercase', fontFamily: monoFamily },
  mono: { fontSize: 11, lineHeight: 15, fontWeight: '400', letterSpacing: 0.2, fontFamily: monoFamily },
};

/** 4pt spacing scale. */
export const spacing: Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};

/** Soft-cut edges: 12px controls, 16px cards, pills for tags and chips. */
export const radii: Radii = {
  none: 0,
  xs: 3,
  sm: 6,
  md: 10,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const metrics: Metrics = {
  control: { sm: 34, md: 44, lg: 52 },
  icon: { sm: 30, md: 40, lg: 48 },
  input: { md: 46, lg: 54 },
};

/** Motion is gentle and quick: short decelerations, no springs. */
export const motion: Motion = {
  durationFast: 110,
  durationBase: 170,
  durationSlow: 240,
  durationOverlay: 220,
};

export const zIndex: ZIndex = {
  base: 0,
  sticky: 100,
  menu: 900,
  sheet: 950,
  dialog: 1000,
  toast: 1050,
  tooltip: 1100,
};
