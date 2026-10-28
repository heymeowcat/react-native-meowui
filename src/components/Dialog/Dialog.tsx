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
import { softElevation } from '../../utils/cast';
import { Button } from '../Button/Button';
import { Portal } from '../Portal/Portal';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

export interface DialogProps {
  /** Drives presentation; keep rendering the component so it can animate out. */
  visible: boolean;
  /** Called when the scrim is tapped (and `dismissable` is true). */
  onDismiss: () => void;
  title?: string;
  /** Body content, rendered as-is in a `spacing[3]`-gapped column. */
  children?: ReactNode;
  /** Actions, rendered right-aligned in a `spacing[2]`-gapped row. */
  actions?: ReactNode;
  /** Whether tapping the scrim dismisses. Defaults to `true`. */
  dismissable?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Style overrides for the animated fullscreen layer around the surface. */
  contentContainerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A centered modal dialog: fading scrim, a gently scaling milk-paper `Surface`
 * (hairline border, `xl` radius, soft layered shadow, 86% width capped at 400)
 * with an optional title, body and right-aligned actions. Renders through a
 * `Portal`; dismiss is via the scrim only — wire hardware back yourself if you
 * need it.
 */
export const Dialog = memo(function Dialog({
  visible,
  onDismiss,
  title,
  children,
  actions,
  dismissable = true,
  style,
  contentContainerStyle,
  testID,
}: DialogProps) {
  const { colors, spacing, motion, zIndex } = useTheme();
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
        style={[StyleSheet.absoluteFill, { zIndex: zIndex.dialog }]}
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
            accessibilityLabel="Dismiss dialog"
            accessibilityRole="button"
            disabled={!dismissable || !visible}
            onPress={dismissable ? onDismiss : undefined}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View pointerEvents="box-none" style={styles.center}>
          <Animated.View
            pointerEvents={visible ? 'auto' : 'none'}
            style={[styles.sizing, { opacity: progress, transform: [{ scale }] }, contentContainerStyle]}
          >
            <Surface
              radius="xl"
              borderColor={colors.outlineStrong}
              accessibilityViewIsModal
              role="dialog"
              aria-modal
              aria-label={title ?? 'Dialog'}
              style={[{ padding: spacing[5] }, softElevation(3, colors.shadow), style]}
            >
              {title !== undefined && <Text variant="title">{title}</Text>}
              {children != null && (
                <View style={{ gap: spacing[3], marginTop: title !== undefined ? spacing[3] : 0 }}>
                  {children}
                </View>
              )}
              {actions != null && (
                <View style={[styles.actions, { gap: spacing[2], marginTop: spacing[4] }]}>
                  {actions}
                </View>
              )}
            </Surface>
          </Animated.View>
        </View>
      </View>
    </Portal>
  );
});

export interface AlertDialogProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  message: string;
  /** Confirm button label. Defaults to `'Confirm'`. */
  confirmLabel?: string;
  /** Cancel button label; pass an empty string to hide it. Defaults to `'Cancel'`. */
  cancelLabel?: string;
  /** Called when the confirm button is pressed; the dialog dismisses afterwards. */
  onConfirm?: () => void;
  /** `'error'` renders a destructive confirm button. Defaults to `'neutral'`. */
  tone?: 'neutral' | 'error';
  /**
   * Whether tapping the scrim dismisses. Defaults to `false` — confirmations
   * want an explicit choice.
   */
  dismissable?: boolean;
  testID?: string;
}

/**
 * A confirmation dialog built on `Dialog`: title, message and Cancel/Confirm
 * actions. Use `tone="error"` for destructive confirmations.
 */
export const AlertDialog = memo(function AlertDialog({
  visible,
  onDismiss,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  tone = 'neutral',
  dismissable = false,
  testID,
}: AlertDialogProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onDismiss();
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={onDismiss}
      title={title}
      dismissable={dismissable}
      testID={testID}
      actions={
        <>
          {cancelLabel !== '' && (
            <Button variant="ghost" tone="primary" onPress={onDismiss}>
              {cancelLabel}
            </Button>
          )}
          <Button
            variant="solid"
            tone={tone === 'error' ? 'error' : 'primary'}
            onPress={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <Text variant="body">{message}</Text>
    </Dialog>
  );
});

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizing: {
    width: '86%',
    maxWidth: 400,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
