/**
 * MeowUI Toast Component
 */

import React, { useEffect, useState, useCallback, createContext, useContext } from 'react';
import {
  View,
  Text,
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
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Portal } from '../Portal/Portal';

const { width: screenWidth } = Dimensions.get('window');

export type ToastType = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top' | 'bottom';

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  icon?: React.ReactNode;
}

export interface ToastProps extends ToastConfig {
  visible: boolean;
  onHide?: () => void;
  style?: StyleProp<ViewStyle>;
}

interface ToastContextValue {
  show: (config: ToastConfig) => void;
  hide: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  position = 'top',
  icon,
  onHide,
  style,
}) => {
  const { theme } = useTheme();
  
  const translateY = useSharedValue(position === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  
  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, theme.animations.springs.smooth);
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1, theme.animations.springs.bouncy);
      
      if (duration > 0 && onHide) {
        const timeout = setTimeout(onHide, duration);
        return () => clearTimeout(timeout);
      }
    } else {
      translateY.value = withTiming(position === 'top' ? -100 : 100, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.9, { duration: 200 });
    }
  }, [visible, duration, position]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));
  
  const getTypeColor = () => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.primary;
    }
  };
  
  const getTypeIcon = () => {
    if (icon) return icon;
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✕';
      default: return 'ℹ';
    }
  };
  
  if (!visible) return null;
  
  return (
    <Portal>
      <Animated.View
        style={[
          styles.container,
          { [position]: 60 },
          animatedStyle,
          style,
        ]}
      >
        <View
          style={[
            styles.toast,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.lg,
              borderWidth: 2,
              borderColor: theme.colors.outline,
              borderLeftWidth: 4,
              borderLeftColor: getTypeColor(),
              ...theme.elevation[3],
            },
          ]}
        >
          <View style={[styles.iconContainer, { backgroundColor: getTypeColor() }]}>
            <Text style={styles.iconText}>{getTypeIcon()}</Text>
          </View>
          <Text
            style={[
              styles.message,
              {
                color: theme.colors.onSurface,
                ...theme.typography.bodyMedium,
              },
            ]}
            numberOfLines={2}
          >
            {message}
          </Text>
        </View>
      </Animated.View>
    </Portal>
  );
};

// Toast Provider for queue management
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastConfig | null>(null);
  const [visible, setVisible] = useState(false);
  
  const show = useCallback((config: ToastConfig) => {
    setToast(config);
    setVisible(true);
  }, []);
  
  const hide = useCallback(() => {
    setVisible(false);
    setTimeout(() => setToast(null), 200);
  }, []);
  
  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      {toast && (
        <Toast
          {...toast}
          visible={visible}
          onHide={hide}
        />
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 3000,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    maxWidth: 400,
    width: '100%',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  message: {
    flex: 1,
  },
});

export default Toast;
