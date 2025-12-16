/**
 * MeowUI Theme Exports
 */

// Theme provider
export { MeowProvider, useTheme, useMeowTheme, createTheme } from './ThemeProvider';
export type { MeowTheme, ThemeOverrides } from './ThemeProvider';

// Colors
export { gradients, lightColors, darkColors, getGradient } from './colors';
export type { ColorScheme, GradientName, Gradient } from './colors';

// Typography
export { typography, fontWeights, fontSizes, lineHeights, letterSpacing } from './typography';
export type { TypographyVariants, TypographyVariant } from './typography';

// Spacing
export { spacing, borderRadius, elevation, componentSizes } from './spacing';
export type { SpacingKey, BorderRadiusKey, ElevationLevel } from './spacing';

// Animations
export { durations, springs, easings, timings, pressAnimation, overlayAnimation, keyframes } from './animations';
export type { SpringName, EasingName, TimingName } from './animations';
