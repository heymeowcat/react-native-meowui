import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Pressable as RNPressable,
  StyleSheet,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { softElevation } from '../../utils/cast';
import { CheckGlyph } from '../Chip/Chip';
import { Portal } from '../Portal/Portal';
import { Pressable } from '../Pressable/Pressable';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

/** Minimum distance the menu keeps from the screen edges when clamping. */
const SCREEN_MARGIN = 8;

export interface MenuProps {
  /** Drives presentation; keep rendering the component so it can animate out. */
  visible: boolean;
  onDismiss: () => void;
  /**
   * Screen coordinates (e.g. from `measureInWindow`) where the menu's
   * top-left corner should appear, clamped to stay on screen. Omit to center
   * the menu on the viewport.
   */
  anchor?: { x: number; y: number };
  /** Menu width in dp. Defaults to `200`. */
  width?: number;
  children?: ReactNode;
  /** Whether the transparent scrim closes the menu. Defaults to `true`. */
  dismissable?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A lightweight floating menu: transparent scrim, a milk-paper `Surface`
 * bounded by a hairline with a soft layered shadow (`xl` radius) that fades in
 * with a small downward settle. Position it with `anchor` — screen coordinates
 * of the desired top-left corner — or omit `anchor` to center it. Compose
 * `MenuItem` children inside.
 */
export const Menu = memo(function Menu({
  visible,
  onDismiss,
  anchor,
  width = 200,
  children,
  dismissable = true,
  style,
  testID,
}: MenuProps) {
  const { colors, motion, zIndex } = useTheme();
  const [rendered, setRendered] = useState(visible);
  const [menuHeight, setMenuHeight] = useState<number | null>(null);
  const progress = useRef(new Animated.Value(0)).current;
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    if (visible) {
      setRendered(true);
      const entrance = Animated.timing(progress, {
        toValue: 1,
        duration: motion.durationFast,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });
      entrance.start();
      return () => entrance.stop();
    }
    if (rendered) {
      const exit = Animated.timing(progress, {
        toValue: 0,
        duration: motion.durationFast,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      });
      exit.start(({ finished }) => {
        if (finished) setRendered(false);
      });
      return () => exit.stop();
    }
  }, [visible, rendered, progress, motion.durationFast]);

  if (!rendered) return null;

  const anchored = anchor !== undefined;
  const left = anchored
    ? Math.min(
        Math.max(anchor.x, SCREEN_MARGIN),
        Math.max(SCREEN_MARGIN, screenWidth - width - SCREEN_MARGIN)
      )
    : undefined;
  // Clamped against the measured height; before the first layout pass the
  // menu may sit one frame low when anchored near the bottom edge.
  const top = anchored
    ? Math.min(anchor.y, Math.max(SCREEN_MARGIN, screenHeight - (menuHeight ?? 0) - SCREEN_MARGIN))
    : undefined;

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [-4, 0] });

  const handleSurfaceLayout = (event: LayoutChangeEvent) => {
    setMenuHeight(event.nativeEvent.layout.height);
  };

  return (
    <Portal zIndex={zIndex.menu}>
      <View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, { zIndex: zIndex.menu }]}
        aria-hidden={!visible}
        accessibilityElementsHidden={!visible}
        importantForAccessibility={visible ? 'auto' : 'no-hide-descendants'}
        testID={testID}
      >
        <View pointerEvents={visible && dismissable ? 'auto' : 'none'} style={StyleSheet.absoluteFill}>
          <RNPressable
            accessibilityLabel="Close menu"
            accessibilityRole="button"
            onPress={onDismiss}
            style={StyleSheet.absoluteFill}
          />
        </View>

        <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, !anchored && styles.center]}>
          <Animated.View
            pointerEvents={visible ? 'auto' : 'none'}
            style={[
              anchored ? { position: 'absolute', left, top } : undefined,
              { opacity: progress, transform: [{ translateY }] },
            ]}
          >
            <Surface
              radius="xl"
              borderColor={colors.outlineStrong}
              role="menu"
              aria-label="Menu"
              onLayout={handleSurfaceLayout}
              style={[styles.menu, { width }, softElevation(2, colors.shadow), style]}
            >
              {children}
            </Surface>
          </Animated.View>
        </View>
      </View>
    </Portal>
  );
});

export interface MenuItemProps {
  /** Leading content; when omitted and `selected`, a check glyph is shown. */
  leading?: ReactNode;
  label: string;
  trailing?: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  /** Marks the row selected; shows a check glyph when no `leading` is given. */
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A single row inside a `Menu`: 46pt-minimum height, DM Sans sentence-case
 * labels. Selected rows fill with the blueberry well and carry a 14px check
 * glyph; pressed rows tint oat.
 */
export const MenuItem = memo(function MenuItem({
  leading,
  label,
  trailing,
  disabled = false,
  onPress,
  selected = false,
  style,
  testID,
}: MenuItemProps) {
  const { colors, metrics, spacing } = useTheme();

  return (
    <Pressable
      accessibilityRole="menuitem"
      accessibilityLabel={label}
      accessibilityState={{ disabled, checked: selected || undefined }}
      disabled={disabled}
      onPress={onPress}
      tint={colors.surfaceMuted}
      disabledOpacity={1}
      style={[
        styles.item,
        { minHeight: metrics.input.md, paddingHorizontal: spacing[3], gap: spacing[3] },
        selected && { backgroundColor: colors.primaryMuted },
        style,
      ]}
      testID={testID}
    >
      {leading ?? (selected ? <CheckGlyph color={colors.primary} size={14} /> : null)}
      <Text
        variant="body"
        weight={selected ? '600' : '400'}
        style={{ flex: 1, color: disabled ? colors.onSurfaceSubtle : colors.onSurface }}
        numberOfLines={1}
      >
        {label}
      </Text>
      {trailing}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
