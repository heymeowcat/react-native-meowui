/**
 * MeowUI Badge Component
 * Notification badges with gradient support
 */

import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '../../theme';

export type BadgeVariant = 'filled' | 'gradient';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  children?: React.ReactNode;
  count?: number;
  maxCount?: number;
  variant?: BadgeVariant;
  gradientColors?: string[];
  size?: BadgeSize;
  visible?: boolean;
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
}

const getSizeStyles = (size: BadgeSize, dot: boolean) => {
  if (dot) {
    switch (size) {
      case 'small': return { width: 6, height: 6, minWidth: 6 };
      case 'large': return { width: 12, height: 12, minWidth: 12 };
      default: return { width: 8, height: 8, minWidth: 8 };
    }
  }
  
  switch (size) {
    case 'small': return { height: 16, minWidth: 16, paddingHorizontal: 4 };
    case 'large': return { height: 24, minWidth: 24, paddingHorizontal: 6 };
    default: return { height: 20, minWidth: 20, paddingHorizontal: 5 };
  }
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  count,
  maxCount = 99,
  variant = 'gradient',
  gradientColors,
  size = 'medium',
  visible = true,
  dot = false,
  style,
}) => {
  const { theme } = useTheme();
  
  if (!visible) return null;
  
  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      borderWidth: 1.5,
      borderColor: theme.colors.outline,
    };
    
    // Size dimensions
    let dimensions = { width: 0, height: 0, borderRadius: 0 };
    
    if (dot) {
      dimensions = {
        width: 12,
        height: 12,
        borderRadius: 6,
      };
    } else {
      //  default sizes
      const s = size === 'small' ? 20 : 24;
      dimensions = {
        width: s,
        height: s,
        borderRadius: s / 2,
      };
    }

    return {
      ...baseStyle,
      ...dimensions,
      backgroundColor: theme.colors.error, // Badges usually red/error color
    };
  };

  const animatedStyle: ViewStyle = {
    position: 'absolute',
    top: -5,
    right: -5,
  };

  return (
    <View style={styles.container}>
      {children}
      <Animated.View entering={FadeIn} exiting={FadeOut} style={[getBadgeStyle(), animatedStyle, style]}>
         {!dot && count !== undefined && (
           <Text style={{ 
             color: theme.colors.onError, 
             fontSize: 10, 
             fontWeight: 'bold' 
           }}>
             {count > maxCount ? `${maxCount}+` : count}
           </Text>
         )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    position: 'relative',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Badge;
