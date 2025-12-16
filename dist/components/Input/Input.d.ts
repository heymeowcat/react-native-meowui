/**
 * MeowUI Input Component
 * Beautiful text input with animated label and gradient focus
 */
import React from 'react';
import { StyleProp, ViewStyle, TextInputProps } from 'react-native';
export type InputVariant = 'outlined' | 'filled';
export type InputSize = 'small' | 'medium' | 'large';
export interface InputProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    variant?: InputVariant;
    size?: InputSize;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    gradientFocus?: boolean;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
}
export declare const Input: React.FC<InputProps>;
export default Input;
