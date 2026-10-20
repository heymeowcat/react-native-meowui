import type { TextStyle } from 'react-native';

/** Color scheme mode of the theme. */
export type ThemeMode = 'light' | 'dark';

/**
 * A semantic color family shared by all components.
 * `neutral` maps onto the gray ramp; the rest map onto their own accent.
 */
export type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Semantic color tokens.
 *
 * Naming follows a strict grammar so intent is always readable:
 * - `surface*`  → background fills, from page canvas down to pressed states
 * - `on*`       → content (text/icons) rendered on top of the matching fill
 * - `*Muted`    → soft, low-chromacity fill used for tonal variants
 * - `outline*`  → hairline borders
 * - `inverse*`  → high-contrast pairing for overlays (tooltips, snackbars)
 */
export interface ThemeColors {
  /* Canvas & surfaces */
  background: string;
  surface: string;
  surfaceMuted: string;
  surfaceActive: string;
  inverseSurface: string;
  inverseOnSurface: string;

  /* Content */
  onSurface: string;
  onSurfaceMuted: string;
  onSurfaceSubtle: string;

  /* Lines */
  outline: string;
  outlineStrong: string;

  /* Accent */
  primary: string;
  onPrimary: string;
  primaryMuted: string;
  onPrimaryMuted: string;
  primaryActive: string;
  primaryOutline: string;

  /* Semantic tones: solid fill, content on solid, soft fill, content on soft */
  success: string;
  onSuccess: string;
  successMuted: string;
  onSuccessMuted: string;

  warning: string;
  onWarning: string;
  warningMuted: string;
  onWarningMuted: string;

  error: string;
  onError: string;
  errorMuted: string;
  onErrorMuted: string;

  info: string;
  onInfo: string;
  infoMuted: string;
  onInfoMuted: string;

  /* Tone outline pairs for soft badges (tone-tinted borders) */
  successOutline: string;
  warningOutline: string;
  errorOutline: string;
  infoOutline: string;

  /* Overlays & interaction */
  scrim: string;
  /** Warm cast behind tactile controls (buttons, chips, segments, keys). */
  shadow: string;
  /** Fainter cast behind in-flow surfaces (cards, tables). */
  shadowSoft: string;
  focusRing: string;
}

/** A typography variant: size, rhythm and weight only — color comes from context. */
export type TypeVariant = Pick<
  TextStyle,
  'fontSize' | 'lineHeight' | 'fontWeight' | 'letterSpacing' | 'textTransform' | 'fontFamily'
>;

export type TypographyVariants = {
  display: TypeVariant;
  headline: TypeVariant;
  title: TypeVariant;
  subtitle: TypeVariant;
  bodyLarge: TypeVariant;
  body: TypeVariant;
  label: TypeVariant;
  caption: TypeVariant;
  overline: TypeVariant;
  mono: TypeVariant;
};

export type TypographyVariantName = keyof TypographyVariants;

/** 4pt spacing scale, indexed in half-steps. */
export type Spacing = {
  0: 0;
  1: 4;
  2: 8;
  3: 12;
  4: 16;
  5: 20;
  6: 24;
  7: 28;
  8: 32;
  10: 40;
  12: 48;
  16: 64;
};

export type SpacingKey = keyof Spacing;

/** Corner radii. Soft by design — pills only where shape carries meaning. */
export type Radii = {
  none: 0;
  xs: 3;
  sm: 6;
  md: 10;
  lg: 12;
  xl: 16;
  full: 9999;
};

export type RadiusKey = keyof Radii;

/** Standard control metrics. Components size off these so the kit stays consistent. */
export type Metrics = {
  control: { sm: number; md: number; lg: number };
  icon: { sm: number; md: number; lg: number };
  input: { md: number; lg: number };
};

/** Motion durations in milliseconds. Curves live in `theme/motion` and are rarely themed. */
export type Motion = {
  durationFast: number;
  durationBase: number;
  durationSlow: number;
  durationOverlay: number;
};

/** Conventional stacking order for overlays. */
export type ZIndex = {
  base: number;
  sticky: number;
  menu: number;
  sheet: number;
  dialog: number;
  toast: number;
  tooltip: number;
};

/**
 * Optional font-family mapping. Display slots serve `display` / `headline` /
 * `title` / `subtitle`; sans slots serve body, labels and captions; mono slots
 * serve `overline` / `mono`. Leave keys undefined to use the variant's default
 * family (or to fall back to the sans slot for display variants).
 */
export type ThemeFonts = {
  regular?: string;
  medium?: string;
  semibold?: string;
  displayRegular?: string;
  displayMedium?: string;
  displaySemibold?: string;
  monoRegular?: string;
  monoBold?: string;
};

/** The complete theme consumed by every component. */
export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: TypographyVariants;
  fonts: ThemeFonts;
  spacing: Spacing;
  radii: Radii;
  metrics: Metrics;
  motion: Motion;
  zIndex: ZIndex;
}

/** Partial, deep-mergeable theme overrides accepted by `createTheme` / `MeowProvider`. */
export interface ThemeOverrides {
  colors?: Partial<ThemeColors>;
  typography?: { [K in keyof TypographyVariants]?: Partial<TypeVariant> };
  fonts?: ThemeFonts;
  spacing?: Partial<Spacing>;
  radii?: Partial<Radii>;
  metrics?: { [K in keyof Metrics]?: Partial<Metrics[K]> };
  motion?: Partial<Motion>;
  zIndex?: Partial<ZIndex>;
}

/** Options for `createTheme`. */
export interface CreateThemeOptions extends ThemeOverrides {
  mode?: ThemeMode;
}
