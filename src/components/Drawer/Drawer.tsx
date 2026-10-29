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
import { Text } from '../Text/Text';

export interface DrawerSectionProps {
  /** Mono overline section header rendered above the items. */
  header?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** Groups `DrawerItem`s under an optional mono overline header. */
export const DrawerSection = memo(function DrawerSection({ header, children, style, testID }: DrawerSectionProps) {
  const { colors, spacing } = useTheme();

  return (
    <View testID={testID} style={[styles.section, style]}>
      {header !== undefined && (
        <Text
          variant="overline"
          color={colors.onSurfaceMuted}
          style={{ paddingHorizontal: spacing[3] + spacing[2], paddingBottom: spacing[1] }}
        >
          {header}
        </Text>
      )}
      {children}
    </View>
  );
});

export interface DrawerItemProps {
  /** Leading content — icon, anything; `color` is injected when supported. */
  icon?: ReactNode;
  /** Item label. */
  label: string;
  /** Rests the row on a blueberry-well with a tinted border and a semibold label. */
  active?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  /** Optional count or short text rendered as a trailing pill. */
  badge?: string | number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A navigation row for a drawer: a 44px soft tab with a 12px radius. The
 * active item rests on a blueberry well framed by a tinted border with a
 * semibold label; inactive rows stay transparent. Rows are tint-only —
 * pressing never translates.
 */
export const DrawerItem = memo(function DrawerItem({
  icon,
  label,
  active = false,
  onPress,
  disabled = false,
  badge,
  style,
  testID,
}: DrawerItemProps) {
  const { colors, spacing } = useTheme();

  const engaged = active && !disabled;
  const contentColor = disabled
    ? colors.onSurfaceSubtle
    : active
      ? colors.primary
      : colors.onSurfaceMuted;
  const renderedIcon =
    isValidElement(icon)
      ? cloneElement(icon as ReactElement<{ color?: string }>, { color: contentColor })
      : icon;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || undefined, selected: active || undefined }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      radius="lg"
      tint={colors.surfaceActive}
      pressedOpacity={1}
      disabledOpacity={1}
      testID={testID}
      style={[
        styles.item,
        {
          marginHorizontal: spacing[2],
          paddingHorizontal: engaged ? spacing[3] - 1 : spacing[3],
          gap: spacing[3],
        },
        engaged && {
          backgroundColor: colors.primaryMuted,
          borderWidth: 1,
          borderColor: colors.primaryOutline,
        },
        style,
      ]}
    >
      {icon !== undefined && renderedIcon}
      <Text weight={engaged ? '600' : '400'} color={contentColor} numberOfLines={1}>
        {label}
      </Text>
      {badge !== undefined && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: engaged ? colors.surface : colors.surfaceMuted,
              borderWidth: 1,
              borderColor: colors.outline,
            },
          ]}
        >
          <Text weight="500" color={colors.onSurfaceMuted} style={styles.badgeText}>
            {badge}
          </Text>
        </View>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  section: {
    gap: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9999,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 12,
  },
});
