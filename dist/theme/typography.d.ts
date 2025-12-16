/**
 * MeowUI Typography System
 * Clean, modern typography with multiple variants
 */
import { TextStyle } from 'react-native';
export declare const fontWeights: {
    regular: "400";
    medium: "500";
    semibold: "600";
    bold: "700";
};
export declare const fontSizes: {
    readonly xs: 10;
    readonly sm: 12;
    readonly md: 14;
    readonly base: 16;
    readonly lg: 18;
    readonly xl: 20;
    readonly '2xl': 24;
    readonly '3xl': 30;
    readonly '4xl': 36;
    readonly '5xl': 48;
};
export declare const lineHeights: {
    readonly tight: 1.1;
    readonly snug: 1.25;
    readonly normal: 1.5;
    readonly relaxed: 1.625;
    readonly loose: 2;
};
export declare const letterSpacing: {
    readonly tighter: -0.8;
    readonly tight: -0.4;
    readonly normal: 0;
    readonly wide: 0.4;
    readonly wider: 0.8;
};
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
export declare const typography: TypographyVariants;
export type TypographyVariant = keyof TypographyVariants;
export default typography;
