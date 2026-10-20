import { darkColors, lightColors } from './colors';
import { metrics, motion, radii, spacing, typography, zIndex } from './tokens';
import type {
  CreateThemeOptions,
  Theme,
  ThemeFonts,
  ThemeMode,
  TypographyVariants,
} from './types';

const defaultFonts: ThemeFonts = {};

/** Recursively freeze a theme so identity is stable and accidental writes fail. */
function deepFreeze<T extends object>(value: T): T {
  for (const nested of Object.values(value)) {
    if (nested !== null && typeof nested === 'object' && !Object.isFrozen(nested)) {
      deepFreeze(nested as object);
    }
  }
  return Object.freeze(value);
}

function assemble(mode: ThemeMode): Theme {
  return {
    mode,
    colors: mode === 'dark' ? darkColors : lightColors,
    typography,
    fonts: defaultFonts,
    spacing,
    radii,
    metrics,
    motion,
    zIndex,
  };
}

/** The reference light theme. Frozen — components rely on its identity for memoization. */
export const lightTheme: Theme = deepFreeze(assemble('light'));

/** The reference dark theme. Frozen — components rely on its identity for memoization. */
export const darkTheme: Theme = deepFreeze(assemble('dark'));

function mergeTypography(
  base: TypographyVariants,
  overrides: CreateThemeOptions['typography']
): TypographyVariants {
  if (!overrides) return base;
  const merged: TypographyVariants = { ...base };
  for (const key of Object.keys(overrides) as Array<keyof TypographyVariants>) {
    merged[key] = { ...base[key], ...overrides[key] };
  }
  return merged;
}

/**
 * Build a theme from partial overrides, merged onto the light or dark base.
 *
 * ```ts
 * const theme = createTheme({ mode: 'dark', colors: { primary: '#6B7BC4' } });
 * ```
 */
export function createTheme(options: CreateThemeOptions = {}): Theme {
  const mode = options.mode ?? 'light';
  const base = mode === 'dark' ? darkTheme : lightTheme;

  const theme: Theme = {
    mode,
    colors: { ...base.colors, ...options.colors },
    typography: mergeTypography(base.typography, options.typography),
    fonts: { ...base.fonts, ...options.fonts },
    spacing: { ...base.spacing, ...options.spacing },
    radii: { ...base.radii, ...options.radii },
    metrics: options.metrics
      ? {
          control: { ...base.metrics.control, ...options.metrics.control },
          icon: { ...base.metrics.icon, ...options.metrics.icon },
          input: { ...base.metrics.input, ...options.metrics.input },
        }
      : base.metrics,
    motion: { ...base.motion, ...options.motion },
    zIndex: { ...base.zIndex, ...options.zIndex },
  };

  return deepFreeze(theme);
}
