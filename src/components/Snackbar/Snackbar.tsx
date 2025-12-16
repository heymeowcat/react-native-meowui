/**
 * MeowUI Snackbar Component
 * Toast notification with slide animation
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  withDelay,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

const { width: screenWidth } = Dimensions.get('window');

export type SnackbarPosition = 'top' | 'bottom';

export interface SnackbarProps {
  visible: boolean;
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  onDismiss?: () => void;
  duration?: number;
  position?: SnackbarPosition;
  gradient?: boolean;
  gradientColors?: string[];
  style?: StyleProp<ViewStyle>;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  message,
  action,
  onDismiss,
  duration = 4000,
  position = 'bottom',
  gradient = false,
  gradientColors,
  style,
}) => {
  const { theme } = useTheme();
  
  const translateY = useSharedValue(position === 'bottom' ? 100 : -100);
  const opacity = useSharedValue(0);
  
  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, theme.animations.springs.smooth);
      opacity.value = withTiming(1, theme.animations.timings.entrance);
      
      // Auto dismiss
      if (duration > 0 && onDismiss) {
        const timeout = setTimeout(() => {
          onDismiss();
        }, duration);
        
        return () => clearTimeout(timeout);
      }
    } else {
      translateY.value = withTiming(
        position === 'bottom' ? 100 : -100,
        theme.animations.timings.exit
      );
      opacity.value = withTiming(0, theme.animations.timings.exit);
    }
  }, [visible, duration]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));
  
  if (!visible) return null;
  
  const content = (
    <>
      <Text
        style={[
          styles.message,
          {
            color: gradient ? '#FFFFFF' : theme.colors.onSurface,
            ...theme.typography.bodyMedium,
          },
        ]}
        numberOfLines={2}
      >
        {message}
      </Text>
      
      {action && (
        <Pressable onPress={action.onPress} style={styles.action}>
          <Text
            style={[
              styles.actionLabel,
              {
                color: gradient ? '#FFFFFF' : theme.colors.primary,
                ...theme.typography.labelLarge,
              },
            ]}
          >
            {action.label}
          </Text>
        </Pressable>
      )}
    </>
  );
  
  const containerStyle: ViewStyle = {
    ...styles.container,
    [position]: 24,
  };
  
  const snackbarStyle: ViewStyle = {
    ...styles.snackbar,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md, // Less rounded for snackbar
    borderWidth: 2,
    borderColor: theme.colors.outline,
    ...theme.elevation[3], // Hard shadow
    shadowColor: '#000',
  };
  
  //  version simplifies to single style
  return (
    <Animated.View style={[containerStyle, animatedStyle, style]}>
      <View style={snackbarStyle}>
        {content}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  snackbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  message: {
    flex: 1,
  },
  action: {
    marginLeft: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionLabel: {
    fontWeight: '600',
  },
});

export default Snackbar;
