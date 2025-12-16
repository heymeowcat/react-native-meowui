/**
 * MeowUI RadioButton Component
 * MeowUI style radio button with thick borders and solid fill
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface RadioButtonProps {
    value: string;
    status: 'checked' | 'unchecked';
    onPress?: () => void;
    disabled?: boolean;
    color?: string;
    uncheckedColor?: string;
    size?: number;
    style?: StyleProp<ViewStyle>;
}
export declare const RadioButton: React.FC<RadioButtonProps>;
export default RadioButton;
