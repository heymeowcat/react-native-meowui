/**
 * MeowUI Snackbar Component
 * Toast notification with slide animation
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export type SnackbarPosition = 'top' | 'bottom';
export interface SnackbarProps {
    visible: boolean;
    message: string;
    action?: {
        label: string;
        onPress: () => void;
    };
    onDismiss?: () => void;
    duration?: number;
    position?: SnackbarPosition;
    gradient?: boolean;
    gradientColors?: string[];
    style?: StyleProp<ViewStyle>;
}
export declare const Snackbar: React.FC<SnackbarProps>;
export default Snackbar;
