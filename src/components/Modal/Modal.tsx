import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Pressable as RNPressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { Portal } from '../Portal/Portal';

export interface ModalProps {
  /** Drives presentation; keep rendering the component so it can animate out. */
  visible: boolean;
  /** Called when the scrim is tapped and `dismissable` is true. */
  onDismiss?: () => void;
  /** Whether tapping the scrim dismisses. Defaults to `true`. */
  dismissable?: boolean;
  /**
   * Full control over the contents — usually an absolutely-positioned
   * `Surface`. The layer around them is fullscreen (`box-none`), so you choose
   * the placement.
   */
  children: ReactNode;
  /** Style overrides for the fullscreen animated layer wrapping `children`. */
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A generic portal overlay: a fading scrim plus a fullscreen layer the
 * consumer fills freely — unlike `Dialog`, no Surface is imposed. The layer
 * fades and scales in (0.96→1) exactly like a dialog.
 */
export const Modal = memo(function Modal({
  visible,
  onDismiss,
  dismissable = true,
  children,
  contentContainerStyle,
  style,
  testID,
}: ModalProps) {
  const { colors, motion, zIndex } = useTheme();
  const [rendered, setRendered] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setRendered(true);
      const entrance = Animated.timing(progress, {
        toValue: 1,
        duration: motion.durationOverlay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });
      entrance.start();
      return () => entrance.stop();
    }
    if (rendered) {
      const exit = Animated.timing(progress, {
        toValue: 0,
        duration: motion.durationOverlay,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      });
      exit.start(({ finished }) => {
        if (finished) setRendered(false);
      });
      return () => exit.stop();
    }
  }, [visible, rendered, progress, motion.durationOverlay]);

  if (!rendered) return null;

  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] });

  return (
    <Portal zIndex={zIndex.dialog}>
      <View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, { zIndex: zIndex.dialog }, style]}
        aria-hidden={!visible}
        accessibilityElementsHidden={!visible}
        importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}
        testID={testID}
      >
        <Animated.View
          pointerEvents={visible ? 'auto' : 'none'}
          style={[StyleSheet.absoluteFill, { backgroundColor: colors.scrim, opacity: progress }]}
        >
          <RNPressable
            accessibilityLabel="Dismiss"
            accessibilityRole="button"
            disabled={!dismissable || !visible || onDismiss == null}
            onPress={onDismiss}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          <Animated.View
            pointerEvents={visible ? 'box-none' : 'none'}
            style={[
              StyleSheet.absoluteFill,
              { opacity: progress, transform: [{ scale }] },
              contentContainerStyle,
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </View>
    </Portal>
  );
});
