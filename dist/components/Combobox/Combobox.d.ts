/**
 * MeowUI Combobox Component
 * Dropdown input selector with MeowUI styling
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface ComboboxItem {
    label: string;
    value: string;
}
export interface ComboboxProps {
    label?: string;
    value: string;
    items: ComboboxItem[];
    onValueChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
export declare const Combobox: React.FC<ComboboxProps>;
export default Combobox;
