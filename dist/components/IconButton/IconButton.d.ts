/**
 * MeowUI IconButton Component
 * Circular icon button with gradient option
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export type IconButtonVariant = 'filled' | 'outlined' | 'ghost' | 'gradient';
export type IconButtonSize = 'small' | 'medium' | 'large';
export interface IconButtonProps {
    icon: React.ReactNode;
    onPress?: () => void;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    gradientColors?: string[];
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
export declare const IconButton: React.FC<IconButtonProps>;
export default IconButton;
