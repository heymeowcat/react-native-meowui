/**
 * MeowUI Appbar Component
 * Top navigation bar with MeowUI styling
 */
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../theme';
import { IconButton } from '../IconButton/IconButton';
import Text from '../Text/Text';
const AppbarAction = ({ icon, onPress, color, disabled, style, size = 24, }) => {
    return (<IconButton icon={icon} onPress={onPress} disabled={disabled} variant="ghost" size="medium" style={[styles.action, style]}/>);
};
const AppbarBackAction = ({ icon, ...props }) => {
    const { theme } = useTheme();
    // Default to a simple arrow text if no icon provided, matching MeowUI "brutal" style
    const defaultIcon = (<Text style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 24, color: theme.colors.onSurface }}>
      {'<-'}
    </Text>);
    return (<AppbarAction icon={icon || defaultIcon} {...props}/>);
};
const AppbarContent = ({ title, titleStyle, subtitle, subtitleStyle, onPress, style, }) => {
    const { theme } = useTheme();
    return (<View style={[styles.content, style]}>
      {typeof title === 'string' ? (<Text variant="titleLarge" style={[
                styles.title,
                { color: theme.colors.onSurface },
                titleStyle
            ]} numberOfLines={1}>
          {title}
        </Text>) : (title)}
      {subtitle ? (typeof subtitle === 'string' ? (<Text variant="labelMedium" style={[
                styles.subtitle,
                { color: theme.colors.onSurfaceVariant },
                subtitleStyle
            ]} numberOfLines={1}>
            {subtitle}
          </Text>) : (subtitle)) : null}
    </View>);
};
const AppbarHeader = ({ children, style, elevated = false, }) => {
    const { theme } = useTheme();
    return (<SafeAreaView style={[
            styles.header,
            {
                backgroundColor: theme.colors.surface,
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.outline,
            },
            elevated && theme.elevation[2], // Hard shadow if elevated
            style
        ]}>
      <View style={styles.headerContent}>
        {children}
      </View>
    </SafeAreaView>);
};
const AppbarRoot = ({ children, style, elevated = false, }) => {
    const { theme } = useTheme();
    return (<View style={[
            styles.appbar,
            {
                backgroundColor: theme.colors.surface,
                // Bottom bars typically have border top in this style or just rely on placement
                borderTopWidth: 2,
                borderTopColor: theme.colors.outline,
            },
            elevated && theme.elevation[2],
            style
        ]}>
      {children}
    </View>);
};
const styles = StyleSheet.create({
    header: {
        width: '100%',
        zIndex: 1,
    },
    headerContent: {
        height: 64, // Taller header for MeowUI
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4, // Spacing handled by children usually
    },
    appbar: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        width: '100%',
    },
    content: {
        flex: 1,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800', // MeowUI bold
    },
    subtitle: {
        marginTop: -2,
    },
    action: {
        marginHorizontal: 4,
    },
});
// Attach subcomponents
export const Appbar = Object.assign(AppbarRoot, {
    Header: AppbarHeader,
    Content: AppbarContent,
    Action: AppbarAction,
    BackAction: AppbarBackAction,
});
export default Appbar;
