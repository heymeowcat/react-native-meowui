/**
 * MeowUI SegmentedButtons Component
 * Group of connected toggle buttons
 */
import React from 'react';
import { ViewStyle } from 'react-native';
export interface SegmentedButtonsProps {
    value: string;
    onValueChange: (value: string) => void;
    buttons: {
        value: string;
        label: string;
        icon?: any;
        disabled?: boolean;
    }[];
    style?: ViewStyle;
}
export declare const SegmentedButtons: React.FC<SegmentedButtonsProps>;
export default SegmentedButtons;
