/**
 * MeowUI BottomSheet Component
 * Gesture-driven bottom sheet with snap points
 */

import React, { useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  // useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../theme';

const { height: screenHeight } = Dimensions.get('window');

export interface BottomSheetProps {
  visible: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  snapPoints?: number[];
  initialSnapIndex?: number;
  dismissible?: boolean;
  handleVisible?: boolean;
  blurBackdrop?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onDismiss,
  children,
  snapPoints = [0.5, 0.9],
  initialSnapIndex = 0,
  dismissible = true,
  handleVisible = true,
  blurBackdrop = true,
  style,
  contentStyle,
}) => {
  const { theme } = useTheme();
  
  // Calculate snap point heights
  const snapHeights = snapPoints.map((point) => screenHeight * (1 - point));
  const maxHeight = screenHeight * Math.max(...snapPoints);
  
  const translateY = useSharedValue(screenHeight);
  const backdropOpacity = useSharedValue(0);
  const currentSnapIndex = useSharedValue(initialSnapIndex);
  
  // Show/hide sheet
  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, theme.animations.timings.entrance);
      translateY.value = withSpring(
        snapHeights[initialSnapIndex],
        theme.animations.springs.smooth
      );
    } else {
      backdropOpacity.value = withTiming(0, theme.animations.timings.exit);
      translateY.value = withSpring(screenHeight, theme.animations.springs.smooth);
    }
  }, [visible]);
  
  // Handle dismiss
  const handleDismiss = useCallback(() => {
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);
  
  // Pan gesture handler

  
  // Animated styles
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));
  
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  
  if (!visible) return null;
  
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        {blurBackdrop ? (
          <BlurView intensity={20} style={styles.blur}>
            <Pressable
              style={styles.backdropPress}
              onPress={dismissible ? handleDismiss : undefined}
            />
          </BlurView>
        ) : (
          <Pressable
            style={[styles.backdropPress, { backgroundColor: theme.colors.scrim }]}
            onPress={dismissible ? handleDismiss : undefined}
          />
        )}
      </Animated.View>
      
      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            height: maxHeight + 50,
            backgroundColor: theme.colors.surface,
            borderTopLeftRadius: theme.borderRadius['2xl'],
            borderTopRightRadius: theme.borderRadius['2xl'],
          },
          sheetStyle,
          style,
        ]}
      >
        {/* Handle */}
        {handleVisible && (
          <View style={styles.handleContainer}>
            <View
              style={[
                styles.handle,
                { backgroundColor: theme.colors.outlineVariant },
              ]}
            />
          </View>
        )}
        
        {/* Content */}
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  backdropPress: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 16,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default BottomSheet;
