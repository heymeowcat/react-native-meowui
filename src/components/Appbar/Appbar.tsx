/**
 * MeowUI Appbar Component
 * Top navigation bar with MeowUI styling
 */

import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, SafeAreaView, Platform } from 'react-native';
import { useTheme } from '../../theme';
import { IconButton } from '../IconButton/IconButton';
import Text from '../Text/Text';

// --- Appbar.Action ---

export interface AppbarActionProps {
  icon: React.ReactNode;
  onPress?: () => void;
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  size?: number;
}

const AppbarAction = ({
  icon,
  onPress,
  color,
  disabled,
  style,
  size = 24,
}: AppbarActionProps) => {
  return (
    <IconButton
      icon={icon}
      onPress={onPress}
      disabled={disabled}
      variant="ghost" 
      size="medium"
      style={[styles.action, style]}
    />
  );
};

// --- Appbar.BackAction ---

export interface AppbarBackActionProps extends Omit<AppbarActionProps, 'icon'> {
  icon?: React.ReactNode;
}

const AppbarBackAction = ({
  icon,
  ...props
}: AppbarBackActionProps) => {
  const { theme } = useTheme();
  // Default to a simple arrow text if no icon provided, matching MeowUI "brutal" style
  const defaultIcon = (
    <Text style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 24, color: theme.colors.onSurface }}>
      {'<-'}
    </Text>
  );

  return (
    <AppbarAction
      icon={icon || defaultIcon}
      {...props}
    />
  );
};

// --- Appbar.Content ---

export interface AppbarContentProps {
  title: string | React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: string | React.ReactNode;
  subtitleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const AppbarContent = ({
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  onPress,
  style,
}: AppbarContentProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.content, style]}>
      {typeof title === 'string' ? (
        <Text 
          variant="titleLarge" 
          style={[
            styles.title, 
            { color: theme.colors.onSurface },
            titleStyle
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      ) : (
        title
      )}
      {subtitle ? (
        typeof subtitle === 'string' ? (
          <Text 
            variant="labelMedium" 
            style={[
              styles.subtitle, 
              { color: theme.colors.onSurfaceVariant },
              subtitleStyle
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : (
          subtitle
        )
      ) : null}
    </View>
  );
};

// --- Appbar.Header ---

export interface AppbarHeaderProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
}

const AppbarHeader = ({
  children,
  style,
  elevated = false,
}: AppbarHeaderProps) => {
  const { theme } = useTheme();
  
  return (
    <SafeAreaView 
      style={[
        styles.header, 
        { 
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 2,
          borderBottomColor: theme.colors.outline,
        },
        elevated && theme.elevation[2], // Hard shadow if elevated
        style
      ]}
    >
      <View style={styles.headerContent}>
        {children}
      </View>
    </SafeAreaView>
  );
};

// --- Appbar (Container) ---

export interface AppbarProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
}

const AppbarRoot = ({
  children,
  style,
  elevated = false,
}: AppbarProps) => {
  const { theme } = useTheme();

  return (
    <View 
      style={[
        styles.appbar, 
        { 
          backgroundColor: theme.colors.surface,
          // Bottom bars typically have border top in this style or just rely on placement
           borderTopWidth: 2,
           borderTopColor: theme.colors.outline,
        },
        elevated && theme.elevation[2],
        style
      ]}
    >
      {children}
    </View>
  );
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
