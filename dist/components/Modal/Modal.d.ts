/**
 * MeowUI Modal Component
 * Animated modal dialog with blur backdrop
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface ModalProps {
    visible: boolean;
    onDismiss?: () => void;
    children: React.ReactNode;
    dismissable?: boolean;
    gradientBorder?: boolean;
    gradientColors?: string[];
    blurBackdrop?: boolean;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
}
export declare const Modal: React.FC<ModalProps>;
export default Modal;
