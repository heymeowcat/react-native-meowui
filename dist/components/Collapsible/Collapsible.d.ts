/**
 * MeowUI Collapsible Component
 * Generic animated container for expanding/collapsing content
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface CollapsibleProps {
    expanded: boolean;
    children: React.ReactNode;
    duration?: number;
    style?: StyleProp<ViewStyle>;
}
export declare const Collapsible: React.FC<CollapsibleProps>;
export default Collapsible;
