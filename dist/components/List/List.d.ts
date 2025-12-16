import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export declare const ListIcon: ({ icon, color, size }: {
    icon: any;
    color?: string;
    size?: number;
}) => React.JSX.Element;
export interface ListItemProps {
    title: string;
    description?: string;
    left?: (props: {
        color: string;
        style: object;
    }) => React.ReactNode;
    right?: (props: {
        color: string;
        style: object;
    }) => React.ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    descriptionStyle?: StyleProp<TextStyle>;
}
export declare const ListItem: ({ title, description, left, right, onPress, style, titleStyle, descriptionStyle, }: ListItemProps) => React.JSX.Element;
export declare const ListSection: ({ title, children, style }: {
    title?: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}) => React.JSX.Element;
export declare const ListAccordion: ({ title, description, left, expanded, onPress, children, id, style, }: ListItemProps & {
    expanded?: boolean;
    children: React.ReactNode;
    id?: string | number;
}) => React.JSX.Element;
export declare const List: {
    Item: ({ title, description, left, right, onPress, style, titleStyle, descriptionStyle, }: ListItemProps) => React.JSX.Element;
    Icon: ({ icon, color, size }: {
        icon: any;
        color?: string;
        size?: number;
    }) => React.JSX.Element;
    Section: ({ title, children, style }: {
        title?: string;
        children: React.ReactNode;
        style?: StyleProp<ViewStyle>;
    }) => React.JSX.Element;
    Accordion: ({ title, description, left, expanded, onPress, children, id, style, }: ListItemProps & {
        expanded?: boolean;
        children: React.ReactNode;
        id?: string | number;
    }) => React.JSX.Element;
};
export default List;
