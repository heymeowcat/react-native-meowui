/**
 * MeowUI Card Component
 * Beautiful cards with gradient borders and glass morphism
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type { ElevationLevel } from '../../theme';
export type CardVariant = 'elevated' | 'filled' | 'outlined' | 'gradient';
export interface CardProps {
    children: React.ReactNode;
    variant?: CardVariant;
    elevation?: ElevationLevel;
    gradient?: boolean;
    gradientColors?: string[];
    gradientBorder?: boolean;
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
}
export declare const Card: React.FC<CardProps>;
export default Card;
