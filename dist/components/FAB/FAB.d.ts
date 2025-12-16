/**
 * MeowUI FAB (Floating Action Button) Component
 * Beautiful FAB with gradient and extended variant
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export type FABSize = 'small' | 'medium' | 'large';
export type FABVariant = 'filled' | 'gradient';
export interface FABProps {
    icon: React.ReactNode;
    label?: string;
    onPress?: () => void;
    variant?: FABVariant;
    size?: FABSize;
    gradientColors?: string[];
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
export declare const FAB: React.FC<FABProps>;
export default FAB;
