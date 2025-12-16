/**
 * MeowUI Menu Component
 * Simple popover menu with hard shadows
 * Note: Requires a parent relative view or manual coordinates usually.
 * For this implementation, we use a Modal-based overlay approach for simplicity.
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal as RNModal, TouchableOpacity, } from 'react-native';
import { useTheme } from '../../theme';
const MenuItem = ({ title, leadingIcon, onPress, disabled }) => {
    const { theme } = useTheme();
    return (<TouchableOpacity onPress={onPress} disabled={disabled} style={styles.menuItem}>
      <Text style={[styles.menuItemText, { color: disabled ? theme.colors.onSurfaceVariant : theme.colors.onSurface }]}>
        {title}
      </Text>
    </TouchableOpacity>);
};
export const Menu = ({ visible, onDismiss, anchor, children, contentStyle, }) => {
    const { theme } = useTheme();
    if (!visible)
        return null;
    return (<RNModal transparent visible={visible} animationType="fade" onRequestClose={onDismiss}>
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <View style={[
            styles.menuContent,
            {
                top: anchor?.y || 100,
                left: anchor?.x || 20,
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.outline,
                borderRadius: theme.borderRadius.md,
                ...theme.elevation[4], // Hard shadow
            },
            contentStyle,
        ]}>
          {children}
        </View>
      </Pressable>
    </RNModal>);
};
// Subcomponent export
Menu.Item = MenuItem;
const styles = StyleSheet.create({
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent', // Don't dim background for menu, usually
    },
    menuContent: {
        position: 'absolute',
        minWidth: 150,
        borderWidth: 2,
        paddingVertical: 4,
        overflow: 'hidden',
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    menuItemText: {
        fontSize: 14,
        fontWeight: '600',
    }
});
export default Menu;
