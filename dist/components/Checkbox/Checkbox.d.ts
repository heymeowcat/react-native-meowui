import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface CheckboxProps {
    status: 'checked' | 'unchecked' | 'indeterminate';
    onPress?: () => void;
    disabled?: boolean;
    color?: string;
    uncheckedColor?: string;
    size?: number;
    style?: StyleProp<ViewStyle>;
}
export declare const Checkbox: React.FC<CheckboxProps>;
export default Checkbox;
