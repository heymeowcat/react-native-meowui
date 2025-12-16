/**
 * MeowUI Theme Provider
 * Context provider for theme management
 */
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, gradients } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, elevation, componentSizes } from './spacing';
import { springs, easings, timings, durations, pressAnimation, overlayAnimation } from './animations';
import { PortalHost } from '../components/Portal/PortalHost';
const ThemeContext = createContext(undefined);
export const createTheme = (overrides) => {
    return overrides || {};
};
const buildTheme = (mode, overrides) => {
    const baseColors = mode === 'dark' ? darkColors : lightColors;
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
        typography,
        spacing,
        borderRadius,
        elevation,
        componentSizes,
        animations: {
            springs,
            easings,
            timings,
            durations,
            pressAnimation,
            overlayAnimation,
        },
    };
};
export const MeowProvider = ({ children, theme: themeProp = 'system', overrides, }) => {
    const systemColorScheme = useColorScheme();
    const getInitialMode = () => {
        if (themeProp === 'system') {
            return systemColorScheme === 'dark' ? 'dark' : 'light';
        }
        return themeProp;
    };
    const [mode, setMode] = useState(getInitialMode);
    const toggleTheme = useCallback(() => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, []);
    const setThemeMode = useCallback((newMode) => {
        setMode(newMode);
    }, []);
    const theme = useMemo(() => buildTheme(mode, overrides), [mode, overrides]);
    const value = useMemo(() => ({
        theme,
        toggleTheme,
        setThemeMode,
        isDark: mode === 'dark',
    }), [theme, toggleTheme, setThemeMode, mode]);
    return (<ThemeContext.Provider value={value}>
      <PortalHost>
        {children}
      </PortalHost>
    </ThemeContext.Provider>);
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a MeowProvider');
    }
    return context;
};
export const useMeowTheme = () => {
    const { theme } = useTheme();
    return theme;
};
export default MeowProvider;
