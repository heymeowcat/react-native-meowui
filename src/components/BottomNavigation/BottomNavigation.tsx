import {
  cloneElement,
  isValidElement,
  memo,
  type ReactElement,
  type ReactNode,
} from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Pressable } from '../Pressable/Pressable';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

export interface BottomNavigationItem {
  /** Stable identifier reported through `onChange`. */
  value: string;
  /** Label under the icon. */
  label: string;
  /** Icon content — resolved `color` is injected when supported. */
  icon: ReactNode;
  /** Optional count or short text rendered as a pill on the icon's top-right. */
  badge?: number | string;
}

export interface BottomNavigationProps {
  items: BottomNavigationItem[];
  /** The selected destination's `value`. */
  value: string;
  onChange: (value: string) => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * The kit's bottom bar: a milk-paper sheet, square-cornered, ruled along its
 * top edge by a hairline. The active destination inks blueberry and rests its
 * icon on a soft blueberry well — the color and the well are the indicator.
 * Add safe-area padding via `style` (e.g. `paddingBottom: insets.bottom`).
 */
export const BottomNavigation = memo(function BottomNavigation({
  items,
  value,
  onChange,
  accessibilityLabel,
  style,
  testID,
}: BottomNavigationProps) {
  const { colors } = useTheme();

  return (
    <Surface
      outlined={false}
      radius="none"
      backgroundColor={colors.surface}
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={[styles.bar, { borderTopWidth: 1, borderTopColor: colors.outline }, style]}
    >
      {items.map((item) => {
        const active = item.value === value;
        const color = active ? colors.primary : colors.onSurfaceMuted;
        const renderedIcon =
          isValidElement(item.icon)
            ? cloneElement(item.icon as ReactElement<{ color?: string }>, { color })
            : item.icon;

        return (
          <Pressable
            key={item.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
            onPress={() => onChange(item.value)}
            tint={colors.surfaceMuted}
            testID={testID !== undefined ? `${testID}-${item.value}` : undefined}
            style={styles.item}
          >
            <View style={[styles.iconBox, active && { backgroundColor: colors.primaryMuted }]}>
              {renderedIcon}
              {item.badge !== undefined && (
                <View style={[styles.badge, { backgroundColor: colors.error }]}>
                  <Text weight="500" color={colors.onError} style={styles.badgeText}>
                    {item.badge}
                  </Text>
                </View>
              )}
            </View>
            <Text
              weight={active ? '600' : '400'}
              color={color}
              style={styles.itemLabel}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </Surface>
  );
});

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: 64,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  iconBox: {
    width: 38,
    height: 24,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 12,
  },
  itemLabel: {
    fontSize: 10,
    lineHeight: 14,
  },
});
