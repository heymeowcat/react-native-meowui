/**
 * MeowUI Appbar Component
 * Top navigation bar with MeowUI styling
 */
import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export interface AppbarActionProps {
    icon: React.ReactNode;
    onPress?: () => void;
    color?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    size?: number;
}
export interface AppbarBackActionProps extends Omit<AppbarActionProps, 'icon'> {
    icon?: React.ReactNode;
}
export interface AppbarContentProps {
    title: string | React.ReactNode;
    titleStyle?: StyleProp<TextStyle>;
    subtitle?: string | React.ReactNode;
    subtitleStyle?: StyleProp<TextStyle>;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
export interface AppbarHeaderProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    elevated?: boolean;
}
export interface AppbarProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    elevated?: boolean;
}
export declare const Appbar: (({ children, style, elevated, }: AppbarProps) => React.JSX.Element) & {
    Header: ({ children, style, elevated, }: AppbarHeaderProps) => React.JSX.Element;
    Content: ({ title, titleStyle, subtitle, subtitleStyle, onPress, style, }: AppbarContentProps) => React.JSX.Element;
    Action: ({ icon, onPress, color, disabled, style, size, }: AppbarActionProps) => React.JSX.Element;
    BackAction: ({ icon, ...props }: AppbarBackActionProps) => React.JSX.Element;
};
export default Appbar;
