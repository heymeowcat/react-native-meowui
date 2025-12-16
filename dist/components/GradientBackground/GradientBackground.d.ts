/**
 * MeowUI GradientBackground Component
 * Full-screen animated gradient backgrounds
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type { GradientName } from '../../theme';
export interface GradientBackgroundProps {
    children?: React.ReactNode;
    colors?: string[];
    preset?: GradientName;
    animated?: boolean;
    animationDuration?: number;
    angle?: number;
    style?: StyleProp<ViewStyle>;
}
export declare const GradientBackground: React.FC<GradientBackgroundProps>;
export default GradientBackground;
