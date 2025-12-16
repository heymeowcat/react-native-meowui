/**
 * MeowUI Surface Component
 * Base container with elevation and gradient support
 */

import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import type { ElevationLevel } from '../../theme';

export type SurfaceVariant = 'default' | 'gradient' | 'glass';

export interface SurfaceProps {
  children: React.ReactNode;
  variant?: SurfaceVariant;
  elevation?: ElevationLevel;
  gradientColors?: string[];
  blur?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

export const Surface: React.FC<SurfaceProps> = ({
  children,
  variant = 'default',
  elevation = 0,
  style,
}) => {
  const { theme } = useTheme();

  const getStyle = (): ViewStyle => {
    const base: ViewStyle = {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      borderWidth: 2,
      borderColor: theme.colors.outline,
      overflow: 'hidden',
    };
    
    if (elevation > 0) {
      return {
        ...base,
        ...theme.elevation[elevation as keyof typeof theme.elevation],
      };
    }
    
    return base;
  };
  
  return (
    <View style={[getStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default Surface;
