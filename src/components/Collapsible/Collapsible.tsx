import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

export interface CollapsibleProps {
  /** Whether the content is visible. */
  expanded: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Reveals or hides its children by animating their measured height. The
 * content is kept mounted (absolutely positioned inside the clipping box) so
 * measurement survives collapse and height changes re-animate.
 */
export const Collapsible = memo(function Collapsible({ expanded, children, style, testID }: CollapsibleProps) {
  const { motion } = useTheme();
  const [contentHeight, setContentHeight] = useState(0);

  // Height is a layout property and React Native's native driver only supports
  // opacity and transforms, so this animation must run on the JS driver. The
  // animated tree here is small, which keeps JS-driven timing smooth.
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? contentHeight : 0,
      duration: motion.durationBase,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [expanded, contentHeight, animatedHeight, motion.durationBase]);

  return (
    <Animated.View
      pointerEvents={expanded ? 'auto' : 'none'}
      accessibilityElementsHidden={!expanded}
      importantForAccessibility={expanded ? 'auto' : 'no-hide-descendants'}
      testID={testID}
      style={[styles.clipped, { height: animatedHeight }, style]}
    >
      <View
        style={styles.measured}
        onLayout={(event) => {
          const height = event.nativeEvent.layout.height;
          setContentHeight((prev) => (prev === height ? prev : height));
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  clipped: {
    overflow: 'hidden',
  },
  measured: {
    // Absolutely positioned so the content lays out at its natural height
    // regardless of the animated parent height.
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
