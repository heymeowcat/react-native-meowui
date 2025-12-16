/**
 * MeowUI Searchbar Component
 * High-contrast search input with thick borders and hard shadows
 */
import React from 'react';
import { StyleProp, ViewStyle, TextInputProps } from 'react-native';
export interface SearchbarProps extends Omit<TextInputProps, 'style'> {
    value: string;
    onChangeText: (text: string) => void;
    onIconPress?: () => void;
    onClearIconPress?: () => void;
    placeholder?: string;
    icon?: any;
    clearIcon?: any;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
}
export declare const Searchbar: React.FC<SearchbarProps>;
export default Searchbar;
