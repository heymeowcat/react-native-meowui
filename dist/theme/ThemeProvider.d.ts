/**
 * MeowUI Theme Provider
 * Context provider for theme management
 */
import React, { ReactNode } from 'react';
import { gradients, type ColorScheme } from './colors';
import { type TypographyVariants } from './typography';
import { spacing, borderRadius, elevation, componentSizes } from './spacing';
import { springs, easings, timings, durations, pressAnimation, overlayAnimation } from './animations';
export interface MeowTheme {
    mode: 'light' | 'dark';
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
}
interface ThemeContextValue {
    theme: MeowTheme;
    toggleTheme: () => void;
    setThemeMode: (mode: 'light' | 'dark') => void;
    isDark: boolean;
}
export interface ThemeOverrides {
    colors?: Partial<ColorScheme>;
    gradients?: Partial<typeof gradients>;
}
interface MeowProviderProps {
    children: ReactNode;
    theme?: 'light' | 'dark' | 'system';
    overrides?: ThemeOverrides;
}
export declare const createTheme: (overrides?: ThemeOverrides) => ThemeOverrides;
export declare const MeowProvider: React.FC<MeowProviderProps>;
export declare const useTheme: () => ThemeContextValue;
export declare const useMeowTheme: () => MeowTheme;
export default MeowProvider;
