/**
 * MeowUI FAB (Floating Action Button) Component
 * Beautiful FAB with gradient and extended variant
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

export type FABSize = 'small' | 'medium' | 'large';
export type FABVariant = 'filled' | 'gradient';

export interface FABProps {
  icon: React.ReactNode;
  label?: string;
  onPress?: () => void;
  variant?: FABVariant;
  size?: FABSize;
  gradientColors?: string[];
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FAB: React.FC<FABProps> = ({
  icon,
  label,
  onPress,
  variant = 'gradient',
  size = 'medium',
  gradientColors,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  
  const handlePressIn = () => {
    scale.value = withSpring(0.92, theme.animations.springs.bouncy);
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1, theme.animations.springs.bouncy);
  };
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  const fabSize = theme.componentSizes.fab[size];
  const isExtended = !!label;
  
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      // Thick border for FAB
      borderWidth: 2,
      borderColor: theme.colors.outline,
      ...theme.elevation[4], // Hard shadow
      shadowColor: '#000',
    };

    if (isExtended) {
      return {
        ...baseStyle,
        height: fabSize,
        paddingHorizontal: theme.spacing[5],
        borderRadius: theme.borderRadius.full,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing[2],
        backgroundColor: theme.colors.secondary, // Accent color for FAB usually
      };
    }
    
    return {
      ...baseStyle,
      width: fabSize,
      height: fabSize,
      borderRadius: fabSize / 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.secondary,
    };
  };
  
  const content = (
    <>
      {icon}
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.onSecondary,
              fontSize: theme.typography.labelLarge.fontSize,
              fontWeight: '700', // Bold label
            },
          ]}
        >
          {label}
        </Text>
      )}
    </>
  );
  
  //  version simplifies to one solid Pression rendering
  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        animatedStyle,
        getContainerStyle(),
        disabled && styles.disabled,
        style,
      ]}
    >
      {content}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default FAB;
