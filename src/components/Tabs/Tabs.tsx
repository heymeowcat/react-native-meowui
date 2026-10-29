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
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { Pressable } from '../Pressable/Pressable';
import { Text } from '../Text/Text';

export interface TabItem {
  /** Stable identifier reported through `onChange`. */
  value: string;
  /** Label under the icon. */
  label: string;
  /** Leading content — icon, anything; `color` is injected when supported. */
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  /** The selected tab's `value`. */
  value: string;
  onChange: (value: string) => void;
  /**
   * `fixed` stretches tabs evenly and animates the indicator;
   * `scrollable` lets tabs size to their content and renders a static
   * underline on the active tab (no animated indicator).
   */
  variant?: 'fixed' | 'scrollable';
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A quiet tab bar: 48px tall, hairline bottom border, a 2px `primary`
 * indicator on the active tab. Use `fixed` for a handful of tabs,
 * `scrollable` when labels overflow.
 */
export const Tabs = memo(function Tabs({
  tabs,
  value,
  onChange,
  variant = 'fixed',
  accessibilityLabel,
  style,
  testID,
}: TabsProps) {
  const { colors, spacing, motion } = useTheme();
  const fixed = variant === 'fixed';

  const [positions, setPositions] = useState<Record<string, { x: number; width: number }>>({});
  const translateX = useRef(new Animated.Value(0)).current;
  const measured = useRef(false);

  const activePosition = positions[value];

  useEffect(() => {
    if (!fixed || activePosition === undefined) return;
    // Snap on first measure so the indicator doesn't slide in from the edge;
    // animate on subsequent selection changes.
    if (!measured.current) {
      measured.current = true;
      translateX.setValue(activePosition.x);
      return;
    }
    Animated.timing(translateX, {
      toValue: activePosition.x,
      duration: motion.durationFast,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [fixed, activePosition, translateX, motion.durationFast]);

  const handleTabLayout = (tabValue: string) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setPositions((prev) => {
      const existing = prev[tabValue];
      if (existing !== undefined && existing.x === x && existing.width === width) return prev;
      return { ...prev, [tabValue]: { x, width } };
    });
  };

  const renderTab = (tab: TabItem) => {
    const active = tab.value === value;
    const disabled = tab.disabled === true;
    const color = disabled ? colors.onSurfaceSubtle : active ? colors.primary : colors.onSurfaceMuted;
    const renderedIcon =
      isValidElement(tab.icon)
        ? cloneElement(tab.icon as ReactElement<{ color?: string }>, { color })
        : tab.icon;

    return (
      <Pressable
        key={tab.value}
        accessibilityRole="tab"
        accessibilityState={{ selected: active, disabled: disabled || undefined }}
        accessibilityLabel={tab.label}
        disabled={disabled}
        onPress={() => onChange(tab.value)}
        tint={colors.surfaceMuted}
        onLayout={fixed ? handleTabLayout(tab.value) : undefined}
        testID={testID !== undefined ? `${testID}-${tab.value}` : undefined}
        style={[styles.tab, fixed ? styles.tabFixed : { paddingHorizontal: spacing[4] }]}
      >
        {renderedIcon}
        <Text variant="label" weight={active ? '600' : '400'} color={color} numberOfLines={1}>
          {tab.label}
        </Text>
        {!fixed && active && <View style={[styles.staticIndicator, { backgroundColor: colors.primary }]} />}
      </Pressable>
    );
  };

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={[styles.bar, { borderBottomColor: colors.outline }, style]}
    >
      {fixed ? (
        <View style={styles.row}>
          {tabs.map(renderTab)}
          {activePosition !== undefined && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.indicator,
                { backgroundColor: colors.primary, width: activePosition.width, transform: [{ translateX }] },
              ]}
            />
          )}
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map(renderTab)}
        </ScrollView>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  bar: {
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  tab: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabFixed: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
  },
  staticIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
});
