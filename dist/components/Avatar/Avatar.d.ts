/**
 * MeowUI Avatar Component
 * User avatar with gradient border ring
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface AvatarProps {
    source?: {
        uri: string;
    };
    name?: string;
    size?: AvatarSize;
    gradientBorder?: boolean;
    gradientColors?: string[];
    borderWidth?: number;
    style?: StyleProp<ViewStyle>;
}
export declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
