/**
 * MeowUI Typography System
 * Clean, modern typography with multiple variants
 */

import { TextStyle } from 'react-native';

// Font weights
export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Font sizes (in pixels)
export const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

// Line heights
export const lineHeights = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// Letter spacing
export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
} as const;

// Typography variants
export interface TypographyVariants {
  displayLarge: TextStyle;
  displayMedium: TextStyle;
  displaySmall: TextStyle;
  headlineLarge: TextStyle;
  headlineMedium: TextStyle;
  headlineSmall: TextStyle;
  titleLarge: TextStyle;
  titleMedium: TextStyle;
  titleSmall: TextStyle;
  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;
  labelLarge: TextStyle;
  labelMedium: TextStyle;
  labelSmall: TextStyle;
}

export const typography: TypographyVariants = {
  // Display - Bold, tight, impactful
  displayLarge: {
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
    lineHeight: fontSizes['5xl'] * lineHeights.tight,
  },
  displayMedium: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
    lineHeight: fontSizes['4xl'] * lineHeights.tight,
  },
  displaySmall: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
  },
  
  // Headline - Strong and clear
  headlineLarge: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
    lineHeight: fontSizes['2xl'] * lineHeights.snug,
  },
  headlineMedium: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
    lineHeight: fontSizes.xl * lineHeights.snug,
  },
  headlineSmall: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.normal,
    lineHeight: fontSizes.lg * lineHeights.snug,
  },
  
  // Title - Medium weight, good for UI buckets
  titleLarge: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
    lineHeight: fontSizes.xl * lineHeights.normal,
  },
  titleMedium: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
    lineHeight: fontSizes.base * lineHeights.normal,
  },
  titleSmall: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.normal,
    lineHeight: fontSizes.md * lineHeights.normal,
  },
  
  // Body - Readable, slightly relaxed
  bodyLarge: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium, // Heavier body for retro feel
    letterSpacing: letterSpacing.normal,
    lineHeight: fontSizes.base * lineHeights.relaxed,
  },
  bodyMedium: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.normal,
    lineHeight: fontSizes.md * lineHeights.relaxed,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.normal,
    lineHeight: fontSizes.sm * lineHeights.relaxed,
  },
  
  // Label - Uppercase/Caps style often used in retro UI
  labelLarge: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wide,
    lineHeight: fontSizes.md * lineHeights.normal,
  },
  labelMedium: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
  labelSmall: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    lineHeight: fontSizes.xs * lineHeights.normal,
  },
};

export type TypographyVariant = keyof TypographyVariants;

export default typography;
