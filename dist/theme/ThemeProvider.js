/**
 * MeowUI Theme Provider
 * Context provider for theme management
 */
import React, { createContext, useContext, useState, useMemo, useCallback, } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors, gradients } from "./colors";
import { typography } from "./typography";
import { spacing, borderRadius, elevation, componentSizes } from "./spacing";
import { springs, easings, timings, durations, pressAnimation, overlayAnimation, } from "./animations";
import { PortalHost } from "../components/Portal/PortalHost";
// Create context
const ThemeContext = createContext(undefined);
// Create theme helper
export const createTheme = (overrides) => {
    return overrides || {};
};
// Build full theme object
const buildTheme = (mode, overrides) => {
    const baseColors = mode === "dark" ? darkColors : lightColors;
    return {
        mode,
        colors: {
            ...baseColors,
            ...overrides?.colors,
        },
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
            overlayAnimation: overrides?.animations?.overlayAnimation ?? overlayAnimation,
        },
        components: overrides?.components,
    };
};
// Provider component
export const MeowProvider = ({ children, theme: themeProp = "system", overrides, }) => {
    const systemColorScheme = useColorScheme();
    // Determine initial mode
    const getInitialMode = () => {
        if (themeProp === "system") {
            return systemColorScheme === "dark" ? "dark" : "light";
        }
        return themeProp;
    };
    const [mode, setMode] = useState(getInitialMode);
    // Toggle theme
    const toggleTheme = useCallback(() => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    }, []);
    // Set specific mode
    const setThemeMode = useCallback((newMode) => {
        setMode(newMode);
    }, []);
    // Build theme object
    const theme = useMemo(() => buildTheme(mode, overrides), [mode, overrides]);
    // Context value
    const value = useMemo(() => ({
        theme,
        toggleTheme,
        setThemeMode,
        isDark: mode === "dark",
    }), [theme, toggleTheme, setThemeMode, mode]);
    return (<ThemeContext.Provider value={value}>
      <PortalHost>{children}</PortalHost>
    </ThemeContext.Provider>);
};
// Hook to use theme
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a MeowProvider");
    }
    return context;
};
// Hook to get just the theme object
export const useMeowTheme = () => {
    const { theme } = useTheme();
    return theme;
};
export default MeowProvider;
