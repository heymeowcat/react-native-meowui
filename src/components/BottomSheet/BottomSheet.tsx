import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Pressable as RNPressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { softElevation } from '../../utils/cast';
import { Portal } from '../Portal/Portal';
import { Pressable } from '../Pressable/Pressable';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

export interface BottomSheetProps {
  /** Drives presentation; keep rendering the component so it can animate out. */
  visible: boolean;
  /** Called on scrim tap and handle tap (when `dismissable`). */
  onDismiss: () => void;
  children?: ReactNode;
  /** Optional centered title under the handle. */
  title?: string;
  /** Shows the 40×4 grab bar; tapping it dismisses. Defaults to `true`. */
  handle?: boolean;
  /** Whether the scrim and handle dismiss. Defaults to `true`. */
  dismissable?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Style overrides for the animated fullscreen layer around the surface. */
  contentContainerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A modal bottom sheet: fading scrim plus a Surface docked to the bottom — a
 * milk-paper sheet with a hairline border, soft layered shadow and 16px
 * corners on every edge, capped at 85% viewport height, sliding up from its
 * own measured height. Children stay mounted during the close animation and
 * are removed once it finishes.
 */
export const BottomSheet = memo(function BottomSheet({
  visible,
  onDismiss,
  children,
  title,
  handle = true,
  dismissable = true,
  style,
  contentContainerStyle,
  testID,
}: BottomSheetProps) {
  const { colors, spacing, motion, zIndex } = useTheme();
  const [rendered, setRendered] = useState(visible);
  const [sheetHeight, setSheetHeight] = useState<number | null>(null);
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

  // The sheet translates by its own measured height when closed. Until the
  // first layout pass lands, it is kept transparent so it never flashes in
  // place.
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [sheetHeight ?? 0, 0],
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    setSheetHeight(event.nativeEvent.layout.height);
  };

  return (
    <Portal zIndex={zIndex.sheet}>
      <View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, { zIndex: zIndex.sheet }]}
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
            accessibilityLabel="Dismiss sheet"
            accessibilityRole="button"
            disabled={!dismissable || !visible}
            onPress={dismissable ? onDismiss : undefined}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View pointerEvents="box-none" style={styles.dock}>
          <Animated.View
            pointerEvents={visible ? 'auto' : 'none'}
            onLayout={handleLayout}
            style={[
              { opacity: sheetHeight === null ? 0 : 1, transform: [{ translateY }] },
              contentContainerStyle,
            ]}
          >
            <Surface
              radius="xl"
              borderColor={colors.outlineStrong}
              accessibilityViewIsModal
              role="dialog"
              aria-modal
              aria-label={title ?? 'Sheet'}
              style={[
                styles.sheet,
                {
                  maxHeight: '85%',
                  paddingHorizontal: spacing[5],
                  paddingBottom: spacing[6],
                },
                softElevation(3, colors.shadow),
                style,
              ]}
            >
              {handle && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Dismiss sheet"
                  disabled={!dismissable}
                  onPress={onDismiss}
                  tint={colors.surfaceMuted}
                  style={[styles.handleHit, { paddingVertical: spacing[3] }]}
                >
                  <View style={[styles.handleBar, { backgroundColor: colors.outlineStrong }]} />
                </Pressable>
              )}
              {title !== undefined && (
                <Text variant="title" style={[styles.sheetTitle, { marginTop: spacing[2] }]}>
                  {title}
                </Text>
              )}
              {children}
            </Surface>
          </Animated.View>
        </View>
      </View>
    </Portal>
  );
});

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  sheet: {
    width: '100%',
    overflow: 'hidden',
  },
  handleHit: {
    alignItems: 'center',
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 9999,
  },
  sheetTitle: {
    textAlign: 'center',
  },
});
