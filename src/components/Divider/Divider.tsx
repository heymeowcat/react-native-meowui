/**
 * MeowUI Divider Component
 * Simple divider with gradient option
 */

import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '../../theme';

export interface DividerProps {
  gradient?: boolean;
  gradientColors?: string[];
  thickness?: number;
  vertical?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Divider: React.FC<DividerProps> = ({
  gradient = false,
  gradientColors,
  thickness = 1,
  vertical = false,
  style,
}) => {
  const { theme } = useTheme();
  
  const baseStyle: ViewStyle = vertical
    ? { width: thickness, height: '100%' }
    : { height: thickness, width: '100%' };
  
  if (gradient) {
    const colors = gradientColors || theme.gradients.primary;
    
    return (
      <View
        style={[
          styles.line,
          { backgroundColor: theme.colors.outline },
          style,
        ]}
      />
    );
  }
  
  return (
    <View
      style={[
        baseStyle,
        { backgroundColor: theme.colors.outline },
        style,
      ]}
    />
  );
};
const styles = StyleSheet.create({
  line: {
    // Basic line style if needed, otherwise it relies on baseStyle. 
    // Usually divider has background color.
  },
});

export default Divider;
