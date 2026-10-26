import {
  cloneElement,
  isValidElement,
  memo,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
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
import { Cast, usePressState } from '../../utils/cast';
import { Portal } from '../Portal/Portal';
import { Pressable } from '../Pressable/Pressable';
import { Text } from '../Text/Text';
import { FAB, type FABProps, type FABSize } from './FAB';

export interface FABGroupAction {
  /** Icon content for the action button. */
  icon: ReactNode;
  /** Label shown beside the action; also used for accessibility. */
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
}

export interface FABGroupProps {
  /** Icon shown on the anchor FAB (usually a plus). */
  icon: FABProps['icon'];
  /** Extended-FAB label for the anchor; omit for the icon-only shape. */
  label?: string;
  size?: FABSize;
  actions: FABGroupAction[];
  /** Distance from the bottom edge of the viewport. Defaults to `16`. */
  bottom?: number;
  /** Distance from the right edge of the viewport. Defaults to `16`. */
  right?: number;
  /** Control visibility externally; unmanaged when omitted. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A FAB that expands into a labeled action stack with a light scrim behind.
 * Actions are round milk-paper keys (40px, 1px outlineStrong border, 2px warm
 * cast) with DM Sans labels in espresso chips. Renders through a `Portal`, so
 * it can be mounted anywhere and always floats above app content.
 */
export const FABGroup = memo(function FABGroup({
  icon,
  label,
  size = 'md',
  actions,
  bottom = 16,
  right = 16,
  open: openProp,
  onOpenChange,
  style,
  testID,
}: FABGroupProps) {
  const { colors, motion, spacing, zIndex } = useTheme();
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: open ? 1 : 0,
      duration: motion.durationBase,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [open, progress, motion.durationBase]);

  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
  };

  const fade = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const stackTranslate = progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });
  const iconRotate = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });

  return (
    <Portal zIndex={zIndex.menu}>
      <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, style]} testID={testID}>
        <Animated.View
          pointerEvents={open ? 'auto' : 'none'}
          style={[StyleSheet.absoluteFill, { opacity: fade, backgroundColor: colors.scrim }]}
        >
          <RNPressable
            accessibilityLabel="Close actions"
            accessibilityRole="button"
            onPress={() => setOpen(false)}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View
          pointerEvents="box-none"
          style={[styles.stack, { bottom, right, gap: spacing[3] }]}
        >
          <Animated.View
            pointerEvents={open ? 'box-none' : 'none'}
            style={[
              styles.actionStack,
              { gap: spacing[3], opacity: fade, transform: [{ translateY: stackTranslate }] },
            ]}
          >
            {actions.map((action) => (
              <ActionEntry key={action.label} action={action} />
            ))}
          </Animated.View>

          <FAB
            icon={
              <Animated.View style={{ transform: [{ rotate: iconRotate }] }}>
                {icon}
              </Animated.View>
            }
            label={label}
            size={size}
            onPress={() => setOpen(!open)}
            accessibilityLabel={open ? 'Collapse actions' : 'Expand actions'}
            accessibilityState={{ expanded: open }}
          />
        </View>
      </View>
    </Portal>
  );
});

/** One stacked action: a DM Sans label chip beside a round milk-paper key. */
const ActionEntry = memo(function ActionEntry({ action }: { action: FABGroupAction }) {
  const { colors } = useTheme();
  const [pressed, pressHandlers] = usePressState();
  const disabled = action.disabled ?? false;

  const cast = disabled || pressed ? 0 : 2;
  const contentColor = disabled ? colors.onSurfaceSubtle : colors.onSurface;
  const icon = isValidElement(action.icon)
    ? cloneElement(action.icon as ReactElement<{ color?: string }>, { color: contentColor })
    : action.icon;

  return (
    <View style={styles.actionRow}>
      <View style={[styles.label, { backgroundColor: colors.inverseSurface }]}>
        <Text variant="label" style={{ color: colors.inverseOnSurface }} numberOfLines={1}>
          {action.label}
        </Text>
      </View>
      <Cast
        level={cast}
        color={colors.shadow}
        radius={9999}
        style={cast > 0 ? { marginRight: cast, marginBottom: cast } : undefined}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={action.label}
          disabled={disabled}
          onPress={action.onPress}
          radius="full"
          tint={colors.surfaceMuted}
          disabledOpacity={1}
          style={[
            styles.actionButton,
            {
              backgroundColor: disabled ? colors.surfaceMuted : colors.surface,
              borderColor: disabled ? colors.outline : colors.outlineStrong,
            },
            !disabled && pressed && styles.pressedShift,
          ]}
          {...pressHandlers}
          testID={action.testID}
        >
          {icon}
        </Pressable>
      </Cast>
    </View>
  );
});

const styles = StyleSheet.create({
  stack: {
    position: 'absolute',
    alignItems: 'flex-end',
  },
  actionStack: {
    alignItems: 'flex-end',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  actionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  pressedShift: {
    transform: [{ translateY: 1 }, { scale: 0.985 }],
  },
});

export type { FABSize };
