/**
 * MeowUI Text Component
 * Typography component with gradient text support
 */
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import type { TypographyVariant } from '../../theme';
export interface MeowTextProps {
    children: React.ReactNode;
    variant?: TypographyVariant;
    color?: string;
    gradient?: boolean;
    gradientColors?: string[];
    align?: 'left' | 'center' | 'right';
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
}
export declare const MeowText: React.FC<MeowTextProps>;
export declare const DisplayLarge: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const DisplayMedium: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const DisplaySmall: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const HeadlineLarge: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const HeadlineMedium: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const HeadlineSmall: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const TitleLarge: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const TitleMedium: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const TitleSmall: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const BodyLarge: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const BodyMedium: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const BodySmall: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const LabelLarge: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const LabelMedium: React.FC<Omit<MeowTextProps, 'variant'>>;
export declare const LabelSmall: React.FC<Omit<MeowTextProps, 'variant'>>;
export default MeowText;
