/**
 * MeowUI HelperText
 */

import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme';

export type HelperTextType = 'info' | 'error';

export interface HelperTextProps {
  type?: HelperTextType;
  visible?: boolean;
  children: React.ReactNode;
  padding?: 'none' | 'normal';
  style?: StyleProp<TextStyle>;
}

export const HelperText: React.FC<HelperTextProps> = ({
  type = 'info',
  visible = true,
  children,
  padding = 'normal',
  style,
}) => {
  const { theme } = useTheme();
  
  const opacity = useSharedValue(visible ? 1 : 0);
  const translateY = useSharedValue(visible ? 0 : -5);
  
  React.useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withSpring(0, { damping: 15 });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      translateY.value = withTiming(-5, { duration: 150 });
    }
  }, [visible]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
  
  const textColor = type === 'error' ? theme.colors.error : theme.colors.onSurfaceVariant;
  
  return (
    <Animated.Text
      style={[
        styles.text,
        {
          color: textColor,
          ...theme.typography.bodySmall,
          paddingHorizontal: padding === 'normal' ? 12 : 0,
        },
        animatedStyle,
        style,
      ]}
    >
      {type === 'error' && '⚠ '}
      {children}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 4,
    minHeight: 20,
  },
});

export default HelperText;
