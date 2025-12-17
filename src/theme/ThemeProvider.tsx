/**
 * MeowUI Theme Provider
 * Context provider for theme management
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors, gradients, type ColorScheme } from "./colors";
import { typography, type TypographyVariants } from "./typography";
import { spacing, borderRadius, elevation, componentSizes } from "./spacing";
import {
  springs,
  easings,
  timings,
  durations,
  pressAnimation,
  overlayAnimation,
} from "./animations";
import { PortalHost } from "../components/Portal/PortalHost";

// Theme type definition
export interface MeowTheme {
  mode: "light" | "dark";
  colors: ColorScheme;
  gradients: typeof gradients;
  typography: TypographyVariants;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  elevation: typeof elevation;
  componentSizes: typeof componentSizes;
  animations: {
    springs: typeof springs;
    easings: typeof easings;
    timings: typeof timings;
    durations: typeof durations;
    pressAnimation: typeof pressAnimation;
    overlayAnimation: typeof overlayAnimation;
  };
  components?: {
    button?: {
      variants?: {
        filled?: Partial<import("react-native").ViewStyle> & {
          textColor?: string;
        };
        outlined?: Partial<import("react-native").ViewStyle> & {
          textColor?: string;
        };
        ghost?: Partial<import("react-native").ViewStyle> & {
          textColor?: string;
        };
        gradient?: Partial<import("react-native").ViewStyle> & {
          textColor?: string;
        };
      };
      sizes?: Partial<typeof componentSizes.button>;
    };
    text?: {
      variants?: Partial<TypographyVariants>;
      defaultColor?: string;
    };
  };
}

// Theme context type
interface ThemeContextValue {
  theme: MeowTheme;
  toggleTheme: () => void;
  setThemeMode: (mode: "light" | "dark") => void;
  isDark: boolean;
}

// Create context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Custom theme override type
export interface ThemeOverrides {
  colors?: Partial<ColorScheme>;
  gradients?: Partial<typeof gradients>;
  typography?: Partial<TypographyVariants>;
  spacing?: Partial<typeof spacing>;
  borderRadius?: Partial<typeof borderRadius>;
  elevation?: Partial<typeof elevation>;
  componentSizes?: Partial<typeof componentSizes>;
  animations?: Partial<{
    springs: typeof springs;
    easings: typeof easings;
    timings: typeof timings;
    durations: typeof durations;
    pressAnimation: typeof pressAnimation;
    overlayAnimation: typeof overlayAnimation;
  }>;
  components?: MeowTheme["components"];
}

// Props for provider
interface MeowProviderProps {
  children: ReactNode;
  theme?: "light" | "dark" | "system";
  overrides?: ThemeOverrides;
}

// Create theme helper
export const createTheme = (overrides?: ThemeOverrides): ThemeOverrides => {
  return overrides || {};
};

// Build full theme object
const buildTheme = (
  mode: "light" | "dark",
  overrides?: ThemeOverrides
): MeowTheme => {
  const baseColors = mode === "dark" ? darkColors : lightColors;

  return {
    mode,
    colors: {
      ...baseColors,
      ...overrides?.colors,
    } as ColorScheme,
    gradients: {
      ...gradients,
      ...overrides?.gradients,
    },
    typography: {
      ...typography,
      ...overrides?.typography,
    },
    spacing: {
      ...spacing,
      ...overrides?.spacing,
    },
    borderRadius: {
      ...borderRadius,
      ...overrides?.borderRadius,
    },
    elevation: {
      ...elevation,
      ...overrides?.elevation,
    },
    componentSizes: {
      ...componentSizes,
      ...overrides?.componentSizes,
    },
    animations: {
      springs: overrides?.animations?.springs ?? springs,
      easings: overrides?.animations?.easings ?? easings,
      timings: overrides?.animations?.timings ?? timings,
      durations: overrides?.animations?.durations ?? durations,
      pressAnimation: overrides?.animations?.pressAnimation ?? pressAnimation,
      overlayAnimation:
        overrides?.animations?.overlayAnimation ?? overlayAnimation,
    },
    components: overrides?.components,
  };
};

// Provider component
export const MeowProvider: React.FC<MeowProviderProps> = ({
  children,
  theme: themeProp = "system",
  overrides,
}) => {
  const systemColorScheme = useColorScheme();

  // Determine initial mode
  const getInitialMode = (): "light" | "dark" => {
    if (themeProp === "system") {
      return systemColorScheme === "dark" ? "dark" : "light";
    }
    return themeProp;
  };

  const [mode, setMode] = useState<"light" | "dark">(getInitialMode);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // Set specific mode
  const setThemeMode = useCallback((newMode: "light" | "dark") => {
    setMode(newMode);
  }, []);

  // Build theme object
  const theme = useMemo(() => buildTheme(mode, overrides), [mode, overrides]);

  // Context value
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme,
      setThemeMode,
      isDark: mode === "dark",
    }),
    [theme, toggleTheme, setThemeMode, mode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <PortalHost>{children}</PortalHost>
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a MeowProvider");
  }

  return context;
};

// Hook to get just the theme object
export const useMeowTheme = (): MeowTheme => {
  const { theme } = useTheme();
  return theme;
};

export default MeowProvider;
