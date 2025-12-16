/**
 * MeowUI BottomSheet Component
 * Gesture-driven bottom sheet with snap points
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface BottomSheetProps {
    visible: boolean;
    onDismiss?: () => void;
    children: React.ReactNode;
    snapPoints?: number[];
    initialSnapIndex?: number;
    dismissible?: boolean;
    handleVisible?: boolean;
    blurBackdrop?: boolean;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
}
export declare const BottomSheet: React.FC<BottomSheetProps>;
export default BottomSheet;
