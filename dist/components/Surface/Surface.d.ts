/**
 * MeowUI Surface Component
 * Base container with elevation and gradient support
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type { ElevationLevel } from '../../theme';
export type SurfaceVariant = 'default' | 'gradient' | 'glass';
export interface SurfaceProps {
    children: React.ReactNode;
    variant?: SurfaceVariant;
    elevation?: ElevationLevel;
    gradientColors?: string[];
    blur?: number;
    radius?: number;
    style?: StyleProp<ViewStyle>;
}
export declare const Surface: React.FC<SurfaceProps>;
export default Surface;
