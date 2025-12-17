/**
 * MeowUI Banner
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

export type BannerVariant = 'info' | 'success' | 'warning' | 'error';

export interface BannerAction {
  label: string;
  onPress: () => void;
}

export interface BannerProps {
  visible: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  actions?: BannerAction[];
  variant?: BannerVariant;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Banner: React.FC<BannerProps> = ({
  visible,
  icon,
  children,
  actions = [],
  variant = 'info',
  onDismiss,
  style,
}) => {
  const { theme } = useTheme();
  const [isRendered, setIsRendered] = useState(visible);
  
  const height = useSharedValue(visible ? 1 : 0);
  const opacity = useSharedValue(visible ? 1 : 0);
  
  React.useEffect(() => {
    if (visible) {
      setIsRendered(true);
      height.value = withTiming(1, { duration: 250 });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      height.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(setIsRendered)(false);
      });
    }
  }, [visible]);
  
  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scaleY: height.value }],
  }));
  
  const getVariantColor = () => {
    switch (variant) {
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.primary;
    }
  };
  
  const getVariantBackground = () => {
    switch (variant) {
      case 'success': return theme.colors.primaryContainer;
      case 'warning': return '#FEF3C7';
      case 'error': return '#FEE2E2';
      default: return theme.colors.secondaryContainer;
    }
  };
  
  if (!isRendered) return null;
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getVariantBackground(),
          borderBottomWidth: 2,
          borderBottomColor: theme.colors.outline,
        },
        animatedContainerStyle,
        style,
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: getVariantColor() }]}>
            {icon}
          </View>
        )}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.message,
              {
                color: theme.colors.onSurface,
                ...theme.typography.bodyMedium,
              },
            ]}
          >
            {children}
          </Text>
        </View>
      </View>
      
      {actions.length > 0 && (
        <View style={styles.actions}>
          {actions.map((action, index) => (
            <Pressable
              key={index}
              onPress={action.onPress}
              style={[
                styles.actionButton,
                {
                  borderWidth: 2,
                  borderColor: theme.colors.outline,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: theme.colors.surface,
                },
              ]}
            >
              <Text
                style={[
                  styles.actionLabel,
                  {
                    color: getVariantColor(),
                    ...theme.typography.labelMedium,
                  },
                ]}
              >
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionLabel: {
    fontWeight: '600',
  },
});

export default Banner;
