/**
 * MeowUI Spacing System
 * Consistent spacing scale for layouts
 */

// Base spacing unit (4px)
const BASE = 4;

export const spacing = {
  0: 0,
  0.5: BASE * 0.5,   // 2px
  1: BASE,           // 4px
  1.5: BASE * 1.5,   // 6px
  2: BASE * 2,       // 8px
  2.5: BASE * 2.5,   // 10px
  3: BASE * 3,       // 12px
  3.5: BASE * 3.5,   // 14px
  4: BASE * 4,       // 16px
  5: BASE * 5,       // 20px
  6: BASE * 6,       // 24px
  7: BASE * 7,       // 28px
  8: BASE * 8,       // 32px
  9: BASE * 9,       // 36px
  10: BASE * 10,     // 40px
  11: BASE * 11,     // 44px
  12: BASE * 12,     // 48px
  14: BASE * 14,     // 56px
  16: BASE * 16,     // 64px
  20: BASE * 20,     // 80px
  24: BASE * 24,     // 96px
  28: BASE * 28,     // 112px
  32: BASE * 32,     // 128px
} as const;

export type SpacingKey = keyof typeof spacing;

// Border radius - Sharper for retro feel
// Border radius - Pill shapes are common in , but we keep options
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  full: 9999, // Pill shape
} as const;

export type BorderRadiusKey = keyof typeof borderRadius;

// Elevation/Shadow presets - Hard Offset Shadows ()
export const elevation = {
  0: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  1: {
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1, // Solid black
    shadowRadius: 0,  // No blur
    elevation: 2,
  },
  2: {
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  3: {
    shadowColor: '#000000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  4: {
    shadowColor: '#000000',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  5: {
    shadowColor: '#000000',
    shadowOffset: { width: 12, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 12,
  },
} as const;

export type ElevationLevel = keyof typeof elevation;

// Component sizes
export const componentSizes = {
  button: {
    small: { height: 32, paddingHorizontal: 12 },
    medium: { height: 44, paddingHorizontal: 16 },
    large: { height: 56, paddingHorizontal: 24 },
  },
  input: {
    small: { height: 36 },
    medium: { height: 48 },
    large: { height: 56 },
  },
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
  },
  iconButton: {
    small: 32,
    medium: 40,
    large: 48,
  },
  chip: {
    height: 32,
  },
  fab: {
    small: 40,
    medium: 56,
    large: 96,
  },
} as const;

export default {
  spacing,
  borderRadius,
  elevation,
  componentSizes,
};
