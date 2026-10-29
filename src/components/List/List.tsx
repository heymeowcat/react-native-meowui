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
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { Pressable } from '../Pressable/Pressable';
import { Text } from '../Text/Text';

export interface ListSectionProps {
  /** Uppercase section header rendered above the items. */
  header?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Groups `ListItem`s under an optional uppercase mono header. Rows stack
 * flush and are separated by 1px hairline rules — stack multiple sections in
 * a drawer or settings screen.
 */
export const ListSection = memo(function ListSection({ header, children, style, testID }: ListSectionProps) {
  const { colors, spacing } = useTheme();

  return (
    <View testID={testID} style={[styles.section, style]}>
      {header !== undefined && (
        <Text
          variant="overline"
          color={colors.onSurfaceMuted}
          style={{ paddingHorizontal: spacing[4], paddingBottom: spacing[1] }}
        >
          {header}
        </Text>
      )}
      {children}
    </View>
  );
});

export interface ListItemProps {
  /** Leading content — icon, avatar, anything; `color` is injected when supported. */
  leading?: ReactNode;
  /** Title line. */
  title: string;
  /** Optional secondary line, clamped to two rows. */
  description?: string;
  /** Trailing content — meta text, switch, chevron, anything. */
  trailing?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  /** Emphasizes the row: semibold title and a primary-tinted leading icon. */
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * The kit's standard list row: a 52px-minimum strip on milk paper — a 36px
 * oat icon well, a title (plus optional description) and trailing content,
 * divided by hairlines. Press feedback is an oat tint; disabled rows mute
 * their content instead of dimming.
 */
export const ListItem = memo(function ListItem({
  leading,
  title,
  description,
  trailing,
  onPress,
  disabled = false,
  selected = false,
  style,
  testID,
}: ListItemProps) {
  const { colors, spacing } = useTheme();

  const contentColor = disabled ? colors.onSurfaceSubtle : colors.onSurface;
  const leadingColor = disabled
    ? colors.onSurfaceSubtle
    : selected
      ? colors.primary
      : colors.onSurfaceMuted;
  const renderedLeading =
    isValidElement(leading)
      ? cloneElement(leading as ReactElement<{ color?: string }>, { color: leadingColor })
      : leading;

  return (
    <Pressable
      accessibilityRole={onPress !== undefined ? 'button' : undefined}
      accessibilityState={{ disabled: disabled || undefined, selected: selected || undefined }}
      disabled={disabled}
      onPress={onPress}
      tint={disabled ? undefined : colors.surfaceMuted}
      disabledOpacity={1}
      testID={testID}
      style={[
        styles.item,
        {
          minHeight: description !== undefined ? 68 : 52,
          paddingHorizontal: spacing[4],
          gap: spacing[3],
          backgroundColor: colors.surface,
          borderTopColor: colors.outline,
        },
        style,
      ]}
    >
      {leading !== undefined && (
        <View style={[styles.leadingWell, { backgroundColor: colors.surfaceMuted }]}>
          {renderedLeading}
        </View>
      )}
      <View style={styles.itemColumn}>
        <Text variant="body" weight={selected ? '600' : '400'} color={contentColor} numberOfLines={1}>
          {title}
        </Text>
        {description !== undefined && (
          <Text
            variant="caption"
            color={disabled ? colors.onSurfaceSubtle : colors.onSurfaceMuted}
            numberOfLines={2}
          >
            {description}
          </Text>
        )}
      </View>
      {trailing}
    </Pressable>
  );
});

export interface ListAccordionProps {
  /** Leading content — icon, avatar, anything; `color` is injected when supported. */
  leading?: ReactNode;
  /** Header title. */
  title: string;
  /** Content revealed when expanded. */
  children: ReactNode;
  /** Controlled expanded state. When omitted the component manages its own. */
  expanded?: boolean;
  /** Initial expanded state for uncontrolled usage. Defaults to `false`. */
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A list row that expands into content below it. The chevron — subtle until
 * the row opens, blueberry while expanded — rotates 90 degrees with a
 * native-driver transform; the body animates its measured height. Works
 * controlled (`expanded` + `onExpandedChange`) or uncontrolled
 * (`defaultExpanded`).
 */
export const ListAccordion = memo(function ListAccordion({
  leading,
  title,
  children,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  disabled = false,
  style,
  testID,
}: ListAccordionProps) {
  const { colors, spacing, motion } = useTheme();

  const [expandedState, setExpandedState] = useState(defaultExpanded);
  const expanded = expandedProp ?? expandedState;

  const [contentHeight, setContentHeight] = useState(0);
  const bodyHeight = useRef(new Animated.Value(0)).current;
  const chevronProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // The body animates `height`, a layout property the native driver cannot
    // handle (it only drives opacity and transforms) — JS driver required.
    // Accordion bodies are small trees, so JS-driven timing stays smooth.
    // The chevron rotation is a transform and runs on the native driver.
    Animated.parallel([
      Animated.timing(bodyHeight, {
        toValue: expanded ? contentHeight : 0,
        duration: motion.durationBase,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(chevronProgress, {
        toValue: expanded ? 1 : 0,
        duration: motion.durationBase,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [expanded, contentHeight, bodyHeight, chevronProgress, motion.durationBase]);

  const chevronRotate = chevronProgress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '90deg'] });

  const handleToggle = () => {
    if (disabled) return;
    const next = !expanded;
    if (expandedProp === undefined) {
      setExpandedState(next);
    }
    onExpandedChange?.(next);
  };

  const leadingColor = disabled ? colors.onSurfaceSubtle : colors.onSurfaceMuted;
  const renderedLeading =
    isValidElement(leading)
      ? cloneElement(leading as ReactElement<{ color?: string }>, { color: leadingColor })
      : leading;

  return (
    <View style={style} testID={testID}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || undefined, expanded }}
        accessibilityLabel={title}
        disabled={disabled}
        onPress={handleToggle}
        tint={disabled ? undefined : colors.surfaceMuted}
        disabledOpacity={1}
        style={[
          styles.item,
          {
            minHeight: 52,
            paddingHorizontal: spacing[4],
            gap: spacing[3],
            backgroundColor: colors.surface,
            borderTopColor: colors.outline,
          },
        ]}
      >
        {leading !== undefined && (
          <View style={[styles.leadingWell, { backgroundColor: colors.surfaceMuted }]}>
            {renderedLeading}
          </View>
        )}
        <Text
          variant="body"
          color={disabled ? colors.onSurfaceSubtle : colors.onSurface}
          style={styles.itemColumn}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
          <ChevronRightGlyph
            color={disabled || !expanded ? colors.onSurfaceSubtle : colors.primary}
            size={18}
          />
        </Animated.View>
      </Pressable>
      <Animated.View
        pointerEvents={expanded ? 'auto' : 'none'}
        accessibilityElementsHidden={!expanded}
        importantForAccessibility={expanded ? 'auto' : 'no-hide-descendants'}
        style={[styles.bodyClipped, { height: bodyHeight }]}
      >
        <View
          style={[styles.bodyInner, { paddingLeft: spacing[4] }]}
          onLayout={(event) => {
            const height = event.nativeEvent.layout.height;
            setContentHeight((prev) => (prev === height ? prev : height));
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
});

/** Minimal vector glyph so the accordion needs no icon library. */
function ChevronRightGlyph({ color, size }: { color: string; size: number }) {
  const arm = Math.round(size * 0.5);
  return (
    <View style={[styles.glyphBox, { width: size, height: size }]}>
      <View
        style={[
          styles.chevronRight,
          { width: arm, height: arm, borderColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  leadingWell: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemColumn: {
    flex: 1,
  },
  bodyClipped: {
    overflow: 'hidden',
  },
  bodyInner: {
    // Absolutely positioned so the content lays out at its natural height
    // regardless of the animated parent height.
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  glyphBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronRight: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    transform: [{ rotate: '45deg' }],
  },
});
