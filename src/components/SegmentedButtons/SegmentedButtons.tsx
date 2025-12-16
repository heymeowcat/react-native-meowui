/**
 * MeowUI SegmentedButtons Component
 * Group of connected toggle buttons
 */

import React from 'react';
import { View, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface SegmentedButtonsProps {
  value: string;
  onValueChange: (value: string) => void;
  buttons: {
    value: string;
    label: string;
    icon?: any;
    disabled?: boolean;
  }[];
  style?: ViewStyle;
}

export const SegmentedButtons: React.FC<SegmentedButtonsProps> = ({
  value,
  onValueChange,
  buttons,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
           borderRadius: theme.borderRadius.full,
           borderWidth: 2,
           borderColor: theme.colors.outline,
           backgroundColor: theme.colors.surface,
           overflow: 'hidden',
        },
        style,
      ]}
    >
      {buttons.map((btn, index) => {
        const isSelected = value === btn.value;
        const isLast = index === buttons.length - 1;
        const isFirst = index === 0;

        return (
          <Pressable
            key={btn.value}
            onPress={() => !btn.disabled && onValueChange(btn.value)}
            style={[
              styles.button,
              {
                backgroundColor: isSelected ? theme.colors.secondaryContainer : 'transparent',
                borderRightWidth: isLast ? 0 : 2, 
                borderColor: theme.colors.outline,
                opacity: btn.disabled ? 0.5 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isSelected ? theme.colors.onSecondaryContainer : theme.colors.onSurface,
                  fontWeight: isSelected ? '700' : '500', 
                },
              ]}
            >
              {btn.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 14,
  },
});

export default SegmentedButtons;
