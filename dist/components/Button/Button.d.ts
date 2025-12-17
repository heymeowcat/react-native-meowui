/**
 * MeowUI Button Component
 * A beautiful button with gradient support and smooth animations
 */
import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export type ButtonVariant = 'filled' | 'outlined' | 'ghost' | 'gradient';
export type ButtonSize = 'small' | 'medium' | 'large';
export interface ButtonProps {
    children: React.ReactNode;
    onPress?: (event: import('react-native').GestureResponderEvent) => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    gradient?: boolean;
    gradientColors?: string[];
    disabled?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    /** Enable playful pencil burst effect on press */
    enablePencilBurst?: boolean;
}
export declare const Button: React.FC<ButtonProps>;
declare const _default: React.NamedExoticComponent<ButtonProps>;
export default _default;
