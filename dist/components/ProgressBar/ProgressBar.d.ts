/**
 * MeowUI ProgressBar Component
 * MeowUI progress bar with thick border and solid fill
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface ProgressBarProps {
    progress: number;
    color?: string;
    trackColor?: string;
    style?: StyleProp<ViewStyle>;
    height?: number;
    indeterminate?: boolean;
}
export declare const ProgressBar: React.FC<ProgressBarProps>;
export default ProgressBar;
