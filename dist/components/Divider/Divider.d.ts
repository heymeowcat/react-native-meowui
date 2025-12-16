/**
 * MeowUI Divider Component
 * Simple divider with gradient option
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface DividerProps {
    gradient?: boolean;
    gradientColors?: string[];
    thickness?: number;
    vertical?: boolean;
    style?: StyleProp<ViewStyle>;
}
export declare const Divider: React.FC<DividerProps>;
export default Divider;
