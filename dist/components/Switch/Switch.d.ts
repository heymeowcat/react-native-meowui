/**
 * MeowUI Switch Component
 * MeowUI toggle switch with hard shadow thumb
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface SwitchProps {
    value: boolean;
    onValueChange?: (value: boolean) => void;
    disabled?: boolean;
    color?: string;
    style?: StyleProp<ViewStyle>;
}
export declare const Switch: React.FC<SwitchProps>;
export default Switch;
