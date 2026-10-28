import { memo, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { softElevation } from '../../utils/cast';
import { Portal } from '../Portal/Portal';
import { Pressable } from '../Pressable/Pressable';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

export interface SnackbarAction {
  label: string;
  onPress: () => void;
}

export interface SnackbarProps {
  /** Drives presentation; keep rendering the component so it can animate out. */
  visible: boolean;
  message: string;
  /** Single trailing action. Pressing it also dismisses the snackbar. */
  action?: SnackbarAction;
  /** Milliseconds before auto-dismiss. Defaults to `4000`. */
  duration?: number;
  /**
   * Called on auto-dismiss and after the action is pressed — flip `visible`
   * here.
   */
  onDismiss: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A transient confirmation bar anchored to the bottom of the viewport — an
 * espresso slip of paper: `inverseSurface` ground, cream hairline, `xl` radius,
 * soft layered shadow. Renders through a `Portal`, slides up and fades in, and
 * keeps animating out after `visible` flips false.
 */
export const Snackbar = memo(function Snackbar({
  visible,
  message,
  action,
  duration = 4000,
  onDismiss,
  style,
  testID,
}: SnackbarProps) {
  const { colors, spacing, motion, zIndex } = useTheme();
  const [rendered, setRendered] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;

  // Latest-ref so a fresh inline callback never restarts the auto-dismiss timer.
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

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

  // Auto-dismiss; restarts when the message changes so a replaced notice gets
  // a full window.
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => onDismissRef.current(), duration);
    return () => clearTimeout(timer);
  }, [visible, message, duration]);

  if (!rendered) return null;

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [16, 0] });

  const handleActionPress = () => {
    action?.onPress();
    onDismissRef.current();
  };

  return (
    <Portal zIndex={zIndex.toast}>
      <View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, { zIndex: zIndex.toast }]}
        testID={testID}
      >
        <View
          pointerEvents="box-none"
          style={[styles.aligner, { paddingHorizontal: spacing[4], paddingBottom: spacing[4] }]}
        >
          <Animated.View
            pointerEvents={visible ? 'auto' : 'none'}
            style={{ opacity: progress, transform: [{ translateY }] }}
          >
            <Surface
              radius="xl"
              outlined={false}
              backgroundColor={colors.inverseSurface}
              accessibilityLiveRegion="polite"
              style={[
                { borderWidth: 1, borderColor: colors.inverseOnSurface, padding: spacing[3] + spacing[1] },
                softElevation(3, colors.shadow),
                style,
              ]}
            >
              <View style={[styles.row, { gap: spacing[3] }]}>
                <Text
                  variant="body"
                  style={{ flex: 1, color: colors.inverseOnSurface }}
                  numberOfLines={2}
                >
                  {message}
                </Text>
                {action != null && (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={action.label}
                    onPress={handleActionPress}
                    style={{ padding: spacing[2] }}
                  >
                    <Text
                      variant="label"
                      weight="600"
                      style={{ color: colors.inverseOnSurface }}
                      numberOfLines={1}
                    >
                      {action.label}
                    </Text>
                  </Pressable>
                )}
              </View>
            </Surface>
          </Animated.View>
        </View>
      </View>
    </Portal>
  );
});

const styles = StyleSheet.create({
  aligner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
