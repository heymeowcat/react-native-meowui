import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../theme';
// --- List.Icon ---
export const ListIcon = ({ icon, color, size = 24 }) => {
    const { theme } = useTheme();
    // Fallback to text if icon is string to avoid vector-icon dependency
    return (<View style={styles.iconContainer}>
        {typeof icon === 'string' && icon.length < 3 ? (<Text style={{ fontSize: size, color: color || theme.colors.onSurface }}>{icon}</Text>) : (
        // If it's a component or something else, render as is, or generic dot
        <Text style={{ fontSize: size, color: color || theme.colors.onSurface }}>•</Text>)}
     </View>);
};
export const ListItem = ({ title, description, left, right, onPress, style, titleStyle, descriptionStyle, }) => {
    const { theme } = useTheme();
    return (<Pressable onPress={onPress} style={({ pressed }) => [
            styles.item,
            {
                backgroundColor: pressed ? theme.colors.surfaceVariant : 'transparent',
            },
            style
        ]}>
      {left && <View style={styles.left}>{left({ color: theme.colors.onSurface, style: {} })}</View>}
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.onSurface }, titleStyle]}>
          {title}
        </Text>
        {description && (<Text style={[styles.description, { color: theme.colors.onSurfaceVariant }, descriptionStyle]}>
            {description}
          </Text>)}
      </View>
      
      {right && <View style={styles.right}>{right({ color: theme.colors.onSurface, style: {} })}</View>}
    </Pressable>);
};
// --- List.Section ---
export const ListSection = ({ title, children, style }) => {
    const { theme } = useTheme();
    return (<View style={[styles.section, style]}>
      {title && (<Text style={[styles.sectionTitle, { color: theme.colors.onSurfaceVariant }]}>
          {title}
        </Text>)}
      {children}
    </View>);
};
// --- List.Accordion ---
export const ListAccordion = ({ title, description, left, expanded, onPress, children, id, style, }) => {
    const { theme } = useTheme();
    const [internalExpanded, setInternalExpanded] = useState(expanded || false);
    const isExpanded = expanded !== undefined ? expanded : internalExpanded;
    const handlePress = () => {
        if (onPress)
            onPress();
        else
            setInternalExpanded(!internalExpanded);
    };
    // Simple height animation could be added here, simplified for now
    return (<View>
      <ListItem title={title} description={description} left={left} onPress={handlePress} style={style} right={({ color }) => (<Text style={{ fontSize: 20, fontWeight: '900', color }}>
            {isExpanded ? "▲" : "▼"}
          </Text>)}/>
      
      {isExpanded && (<View style={styles.accordionContent}>
          {children}
        </View>)}
    </View>);
};
// Main Export
export const List = {
    Item: ListItem,
    Icon: ListIcon,
    Section: ListSection,
    Accordion: ListAccordion,
};
const styles = StyleSheet.create({
    item: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 56, // MeowUI likes chunky touch targets
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    left: {
        marginRight: 16,
    },
    right: {
        marginLeft: 16,
    },
    iconContainer: {
        margin: 0,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '700', // Bold for MeowUI
    },
    description: {
        fontSize: 14,
        marginTop: 2,
        fontWeight: '500',
    },
    section: {
        marginVertical: 8,
    },
    sectionTitle: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase', // Section headers often uppercase
        letterSpacing: 0.5,
    },
    accordionContent: {
        paddingLeft: 16, // Indent content
        borderLeftWidth: 2, // MeowUI guide line
        marginLeft: 16,
        borderColor: '#E5E7EB', // Outline color
    }
});
export default List;
