/**
 * MeowUI Surface Component
 * Base container with elevation and gradient support
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
export const Surface = ({ children, variant = 'default', elevation = 0, style, }) => {
    const { theme } = useTheme();
    const getStyle = () => {
        const base = {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.md,
            borderWidth: 2,
            borderColor: theme.colors.outline,
            overflow: 'hidden',
        };
        if (elevation > 0) {
            return {
                ...base,
                ...theme.elevation[elevation],
            };
        }
        return base;
    };
    return (<View style={[getStyle(), style]}>
      {children}
    </View>);
};
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});
export default Surface;
