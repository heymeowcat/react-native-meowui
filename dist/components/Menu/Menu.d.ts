/**
 * MeowUI Menu Component
 * Simple popover menu with hard shadows
 * Note: Requires a parent relative view or manual coordinates usually.
 * For this implementation, we use a Modal-based overlay approach for simplicity.
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface MenuItemProps {
    title: string;
    leadingIcon?: any;
    onPress?: () => void;
    disabled?: boolean;
}
export interface MenuProps {
    visible: boolean;
    onDismiss: () => void;
    anchor: {
        x: number;
        y: number;
    } | null;
    children: React.ReactNode;
    contentStyle?: StyleProp<ViewStyle>;
}
export declare const Menu: {
    ({ visible, onDismiss, anchor, children, contentStyle, }: MenuProps): React.JSX.Element | null;
    Item: ({ title, leadingIcon, onPress, disabled }: MenuItemProps) => React.JSX.Element;
};
export default Menu;
