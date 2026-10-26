import { cloneElement, isValidElement, memo, type ReactElement, type ReactNode } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Cast, usePressState } from '../../utils/cast';
import { Pressable } from '../Pressable/Pressable';
import { Text } from '../Text/Text';

export type FABSize = 'sm' | 'md' | 'lg';

/** Box sizes for the FAB — larger than control metrics by design. */
const SIZE: Record<FABSize, number> = { sm: 40, md: 52, lg: 60 };

export interface FABProps {
  /** Icon content — resolved `color`/`size` are injected when supported. */
  icon: ReactNode;
  /** When set, renders an extended FAB with the label. */
  label?: string;
  size?: FABSize;
  disabled?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  accessibilityLabel?: string;
  accessibilityState?: { disabled?: boolean; expanded?: boolean };
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The floating action — a tactile blueberry key: solid primary ground, cream
 * icon and a 2px warm cast that collapses on press (the key translates +1px).
 * Pinned by the consumer via `style` (typically `position: 'absolute'`); pass
 * `label` for the extended shape.
 */
export const FAB = memo(function FAB({
  icon,
  label,
  size = 'md',
  disabled = false,
  onPress,
  onLongPress,
  accessibilityLabel,
  accessibilityState,
  testID,
  style,
}: FABProps) {
  const { colors } = useTheme();
  const [pressed, pressHandlers] = usePressState();
  const box = SIZE[size];

  const contentColor = disabled ? colors.onSurfaceSubtle : colors.onPrimary;
  const backgroundColor = disabled ? colors.surfaceMuted : colors.primary;
  const cast = disabled || pressed ? 0 : 2;

  const iconSize = Math.round(box * 0.45);
  const renderedIcon =
    isValidElement(icon)
      ? cloneElement(icon as ReactElement<{ color?: string; size?: number }>, {
          color: contentColor,
          size: iconSize,
        })
      : icon;

  return (
    <Cast
      level={cast}
      color={colors.shadow}
      radius={9999}
      style={cast > 0 ? { marginRight: cast, marginBottom: cast } : undefined}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={accessibilityState ?? { disabled }}
        disabled={disabled}
        onPress={onPress}
        onLongPress={onLongPress}
        radius="full"
        disabledOpacity={1}
        style={[
          styles.base,
          {
            height: box,
            minHeight: box,
            paddingHorizontal: label === undefined ? 0 : 18,
            backgroundColor,
            borderColor: backgroundColor,
          },
          label === undefined && { width: box },
          !disabled && pressed && styles.pressedShift,
          style,
        ]}
        {...pressHandlers}
        testID={testID}
      >
        {label !== undefined && (
          <Text variant="label" weight="600" style={{ color: contentColor }} numberOfLines={1}>
            {label}
          </Text>
        )}
        {renderedIcon}
      </Pressable>
    </Cast>
  );
});

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
  },
  pressedShift: {
    transform: [{ translateY: 1 }, { scale: 0.99 }],
  },
});
