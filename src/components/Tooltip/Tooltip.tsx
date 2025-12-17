/**
 * MeowUI Tooltip
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Portal } from '../Portal/Portal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  children: React.ReactNode;
  title: string;
  position?: TooltipPosition;
  enterDelay?: number;
  leaveDelay?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  position = 'top',
  enterDelay = 200,
  leaveDelay = 0,
  style,
  contentStyle,
}) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [tooltipLayout, setTooltipLayout] = useState({ width: 0, height: 0 });
  const [triggerLayout, setTriggerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(position === 'bottom' ? -10 : 10);
  
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const measureRef = useRef<View>(null);
  
  const show = useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    
    enterTimeoutRef.current = setTimeout(() => {
      measureRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
        setVisible(true);
        opacity.value = withTiming(1, { duration: 200 });
        scale.value = withSpring(1, theme.animations.springs.bouncy);
        translateY.value = withSpring(0, theme.animations.springs.smooth);
      });
    }, enterDelay);
  }, [enterDelay, theme]);
  
  const hide = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    
    leaveTimeoutRef.current = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.8, { duration: 150 });
      translateY.value = withTiming(position === 'bottom' ? -10 : 10, { duration: 150 }, () => {
        runOnJS(setVisible)(false);
      });
    }, leaveDelay);
  }, [leaveDelay, position]);
  
  const handleTooltipLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setTooltipLayout({ width, height });
  };
  
  const getTooltipPosition = (): ViewStyle => {
    const { x, y, width, height } = triggerLayout;
    const { width: tipWidth, height: tipHeight } = tooltipLayout;
    
    const padding = 8;
    
    switch (position) {
      case 'top':
        return {
          left: Math.max(padding, Math.min(x + width / 2 - tipWidth / 2, screenWidth - tipWidth - padding)),
          top: y - tipHeight - padding,
        };
      case 'bottom':
        return {
          left: Math.max(padding, Math.min(x + width / 2 - tipWidth / 2, screenWidth - tipWidth - padding)),
          top: y + height + padding,
        };
      case 'left':
        return {
          left: x - tipWidth - padding,
          top: y + height / 2 - tipHeight / 2,
        };
      case 'right':
        return {
          left: x + width + padding,
          top: y + height / 2 - tipHeight / 2,
        };
      default:
        return {};
    }
  };
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));
  
  return (
    <>
      <Pressable
        ref={measureRef}
        onPressIn={show}
        onPressOut={hide}
        onLongPress={show}
        style={style}
      >
        {children}
      </Pressable>
      
      {visible && (
        <Portal>
          <Animated.View
            onLayout={handleTooltipLayout}
            style={[
              styles.tooltip,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.md,
                borderWidth: 2,
                borderColor: theme.colors.outline,
                ...theme.elevation[2],
              },
              getTooltipPosition(),
              animatedStyle,
              contentStyle,
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.onSurface,
                  ...theme.typography.bodySmall,
                },
              ]}
            >
              {title}
            </Text>
          </Animated.View>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    paddingVertical: 6,
    paddingHorizontal: 12,
    maxWidth: 200,
    zIndex: 4000,
  },
  title: {
    textAlign: 'center',
  },
});

export default Tooltip;
