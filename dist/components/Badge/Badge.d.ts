/**
 * MeowUI Badge Component
 * Notification badges with gradient support
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export type BadgeVariant = 'filled' | 'gradient';
export type BadgeSize = 'small' | 'medium' | 'large';
export interface BadgeProps {
    children?: React.ReactNode;
    count?: number;
    maxCount?: number;
    variant?: BadgeVariant;
    gradientColors?: string[];
    size?: BadgeSize;
    visible?: boolean;
    dot?: boolean;
    style?: StyleProp<ViewStyle>;
}
export declare const Badge: React.FC<BadgeProps>;
export default Badge;
