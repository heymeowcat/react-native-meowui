import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import { PortalHost } from '../components/Portal/Portal';
import { createTheme, darkTheme, lightTheme } from './theme';
import type { Theme, ThemeMode, ThemeOverrides } from './types';

/**
 * Controller surface for apps that switch color schemes at runtime.
 * Kept in a separate context so components subscribed only to `useTheme`
 * never re-render because of controller identity churn.
 */
export interface ThemeController {
  theme: Theme;
  /** The resolved mode actually in effect. */
  mode: ThemeMode;
  /** Switch to 'light' | 'dark', or back to 'system' to follow the OS. */
  setMode: (mode: ThemeMode | 'system') => void;
  /** Flip between light and dark. */
  toggleMode: () => void;
}

const ThemeContext = createContext<Theme | undefined>(undefined);
const ThemeModeContext = createContext<ThemeController | undefined>(undefined);

export interface MeowProviderProps {
  children?: ReactNode;
  /**
   * Uncontrolled mode preference: 'light', 'dark', or 'system' (default) to
   * follow the OS. Omit to leave the controller managing it internally.
   */
  mode?: ThemeMode | 'system';
  /** Partial token overrides merged onto the base theme for the resolved mode. */
  overrides?: ThemeOverrides;
  /** A complete, pre-built theme. Takes precedence over `overrides`. */
  theme?: Theme;
  /** Called after the resolved mode changes. */
  onModeChange?: (mode: ThemeMode) => void;
}

/**
 * Root provider for MeowUI. Supplies the theme to every component and manages
 * light/dark mode — uncontrolled with `mode`, or fully controlled by passing a
 * `theme` object.
 */
export function MeowProvider({
  children,
  mode: modeProp,
  overrides,
  theme: themeProp,
  onModeChange,
}: MeowProviderProps) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemeMode | 'system'>(
    modeProp ?? 'system'
  );

  const preference_ = modeProp ?? preference;

  const resolvedMode: ThemeMode =
    preference_ === 'system' ? (systemScheme ?? 'light') : preference_;

  const theme = useMemo<Theme>(() => {
    if (themeProp) return themeProp;
    if (!overrides) return resolvedMode === 'dark' ? darkTheme : lightTheme;
    return createTheme({ mode: resolvedMode, ...overrides });
  }, [themeProp, overrides, resolvedMode]);

  const setMode = useCallback(
    (next: ThemeMode | 'system') => {
      setPreference(next);
      if (next !== 'system') onModeChange?.(next);
    },
    [onModeChange]
  );

  const toggleMode = useCallback(() => {
    setPreference((prev) => {
      const resolved = prev === 'system' ? (systemScheme ?? 'light') : prev;
      const next: ThemeMode = resolved === 'dark' ? 'light' : 'dark';
      onModeChange?.(next);
      return next;
    });
  }, [systemScheme, onModeChange]);

  const controller = useMemo<ThemeController>(
    () => ({ theme, mode: resolvedMode, setMode, toggleMode }),
    [theme, resolvedMode, setMode, toggleMode]
  );

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeModeContext.Provider value={controller}>
        <PortalHost>{children}</PortalHost>
      </ThemeModeContext.Provider>
    </ThemeContext.Provider>
  );
}

/**
 * Access the current theme. Safe to call without a provider — falls back to the
 * reference light theme so components render correctly in isolation.
 */
export function useTheme(): Theme {
  return useContext(ThemeContext) ?? lightTheme;
}

/**
 * Access the theme controller (mode, setMode, toggleMode). Throws outside of a
 * `MeowProvider`.
 */
export function useThemeController(): ThemeController {
  const controller = useContext(ThemeModeContext);
  if (!controller) {
    throw new Error('useThemeController must be used within a <MeowProvider>');
  }
  return controller;
}

export { MeowProvider as ThemeProvider };
