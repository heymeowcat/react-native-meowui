/**
 * MeowUI FABGroup
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
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Portal } from '../Portal/Portal';

export interface FABGroupAction {
  icon: React.ReactNode;
  label?: string;
  onPress: () => void;
  color?: string;
  small?: boolean;
}

export interface FABGroupProps {
  icon: React.ReactNode;
  openIcon?: React.ReactNode;
  actions: FABGroupAction[];
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FABGroup: React.FC<FABGroupProps> = ({
  icon,
  openIcon,
  actions,
  visible = true,
  style,
}) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  
  const progress = useSharedValue(0);
  const mainScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  
  const toggleOpen = () => {
    if (open) {
      progress.value = withSpring(0, theme.animations.springs.smooth);
      rotation.value = withSpring(0, theme.animations.springs.smooth);
    } else {
      progress.value = withSpring(1, theme.animations.springs.smooth);
      rotation.value = withSpring(45, theme.animations.springs.smooth);
    }
    setOpen(!open);
  };
  
  const handleMainPressIn = () => {
    mainScale.value = withSpring(0.92, { damping: 15 });
  };
  
  const handleMainPressOut = () => {
    mainScale.value = withSpring(1, { damping: 15 });
  };
  
  const mainAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: mainScale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));
  
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 0.4]),
    pointerEvents: progress.value > 0.5 ? 'auto' : 'none',
  }));
  
  if (!visible) return null;
  
  return (
    <Portal>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={toggleOpen} />
      </Animated.View>
      
      <View style={[styles.container, style]} pointerEvents="box-none">
        {/* Action buttons */}
        {actions.map((action, index) => {
          const actionStyle = useAnimatedStyle(() => {
            const baseTranslateY = -70 * (index + 1);
            const translateY = interpolate(progress.value, [0, 1], [0, baseTranslateY]);
            const scale = interpolate(progress.value, [0, 0.5, 1], [0, 0.5, 1]);
            const opacity = interpolate(progress.value, [0, 0.5, 1], [0, 0, 1]);
            
            return {
              transform: [{ translateY }, { scale }],
              opacity,
            };
          });
          
          return (
            <Animated.View key={index} style={[styles.actionContainer, actionStyle]}>
              {action.label && (
                <View
                  style={[
                    styles.label,
                    {
                      backgroundColor: theme.colors.surface,
                      borderWidth: 2,
                      borderColor: theme.colors.outline,
                      borderRadius: theme.borderRadius.md,
                      ...theme.elevation[2],
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: theme.colors.onSurface,
                        ...theme.typography.labelMedium,
                      },
                    ]}
                  >
                    {action.label}
                  </Text>
                </View>
              )}
              <Pressable
                onPress={() => {
                  action.onPress();
                  toggleOpen();
                }}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: action.color || theme.colors.secondary,
                    borderWidth: 2,
                    borderColor: theme.colors.outline,
                    ...theme.elevation[3],
                  },
                  action.small && styles.actionButtonSmall,
                ]}
              >
                {action.icon}
              </Pressable>
            </Animated.View>
          );
        })}
        
        {/* Main FAB */}
        <AnimatedPressable
          onPress={toggleOpen}
          onPressIn={handleMainPressIn}
          onPressOut={handleMainPressOut}
          style={[
            styles.mainFab,
            {
              backgroundColor: theme.colors.primary,
              borderWidth: 2,
              borderColor: theme.colors.outline,
              ...theme.elevation[4],
            },
            mainAnimatedStyle,
          ]}
        >
          {open && openIcon ? openIcon : icon}
        </AnimatedPressable>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 999,
  },
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  labelText: {
    fontWeight: '600',
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  mainFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FABGroup;
