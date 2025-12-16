/**
 * MeowUI Chip Component
 * Selectable chips with animation and gradient variant
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export type ChipVariant = 'filled' | 'outlined' | 'gradient';
export interface ChipProps {
    children: React.ReactNode;
    variant?: ChipVariant;
    selected?: boolean;
    onPress?: () => void;
    onClose?: () => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    gradientColors?: string[];
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
export declare const Chip: React.FC<ChipProps>;
export default Chip;
