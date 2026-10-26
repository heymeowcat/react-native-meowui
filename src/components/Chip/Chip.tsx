import { memo, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme, type ThemeColors, type Tone } from '../../theme';
import { Cast, usePressState } from '../../utils/cast';
import { Pressable } from '../Pressable/Pressable';
import { Text } from '../Text/Text';

export type ChipVariant = 'assist' | 'filter' | 'input';
export type ChipSize = 'sm' | 'md';
export type ChipTone = Exclude<Tone, 'neutral'>;

type ToneTokens = Record<'fill' | 'onFill', keyof ThemeColors>;

const TONE: Record<ChipTone, ToneTokens> = {
  primary: { fill: 'primary', onFill: 'onPrimary' },
  success: { fill: 'success', onFill: 'onSuccess' },
  warning: { fill: 'warning', onFill: 'onWarning' },
  error: { fill: 'error', onFill: 'onError' },
  info: { fill: 'info', onFill: 'onInfo' },
};

/** Checkmark drawn from two rotated bars — no icon font needed. */
export function CheckGlyph({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <View style={[styles.glyphBox, { width: size, height: size }]}>
      <View
        style={[
          styles.check,
          {
            borderColor: color,
            width: size - 3,
            height: (size - 3) / 2,
            borderLeftWidth: 2,
            borderBottomWidth: 2,
          },
        ]}
      />
    </View>
  );
}

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  size?: ChipSize;
  /** Semantic color family for the selected state. Defaults to `'primary'`. */
  tone?: ChipTone;
  /** Filter/input chips only: reflects and drives selection. */
  selected?: boolean;
  disabled?: boolean;
  /** Leading content. Selected filter chips show a checkmark when empty. */
  icon?: ReactNode;
  /** Input chips only: shows a trailing close affordance. */
  onClose?: () => void;
  onPress?: () => void;
  /** Accessibility label; falls back to the label. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A pill chip on milk paper. Selected chips fill with the tone; every enabled
 * chip sits on a 2px warm cast that collapses as the pill presses down.
 */
export const Chip = memo(function Chip({
  label,
  variant = 'assist',
  size = 'md',
  tone = 'primary',
  selected = false,
  disabled = false,
  icon,
  onClose,
  onPress,
  accessibilityLabel,
  style,
  testID,
}: ChipProps) {
  const { colors } = useTheme();
  const [pressed, pressHandlers] = usePressState();
  const tokens = TONE[tone];
  const height = size === 'sm' ? 28 : 32;

  const isActive = selected && variant !== 'assist';

  const backgroundColor = disabled
    ? colors.surfaceMuted
    : isActive
      ? colors[tokens.fill]
      : colors.surface;

  const contentColor = disabled
    ? colors.onSurfaceSubtle
    : isActive
      ? colors[tokens.onFill]
      : colors.onSurfaceMuted;

  const borderColor = disabled
    ? colors.outline
    : isActive
      ? colors[tokens.fill]
      : colors.outlineStrong;

  const cast = disabled || pressed ? 0 : 2;

  const leading =
    variant === 'filter' && selected && icon === undefined ? (
      <CheckGlyph color={contentColor} />
    ) : (
      icon
    );

  const trailing =
    variant === 'input' && onClose !== undefined ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remove ${label}`}
        onPress={onClose}
        radius="full"
        tint={colors.surfaceActive}
        hitSlop={6}
        style={styles.closeHit}
      >
        <CloseGlyph color={contentColor} />
      </Pressable>
    ) : undefined;

  return (
    <Cast
      level={cast}
      color={colors.shadow}
      radius={9999}
      style={{ alignSelf: 'flex-start' }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled, selected: variant !== 'assist' ? selected : undefined }}
        disabled={disabled || (variant === 'input' && onClose === undefined)}
        onPress={variant === 'input' ? undefined : onPress}
        radius="full"
        tint={colors.surfaceMuted}
        disabledOpacity={1}
        style={[
          styles.base,
          {
            height,
            backgroundColor,
            borderColor,
            paddingHorizontal: size === 'sm' ? 12 : 14,
            gap: 6,
          },
          pressed && !disabled && styles.pressedShift,
          style,
        ]}
        {...pressHandlers}
        testID={testID}
      >
        {leading}
        <Text
          weight={isActive ? '600' : '500'}
          style={{ color: contentColor, fontSize: 12, lineHeight: 16 }}
          numberOfLines={1}
        >
          {label}
        </Text>
        {trailing}
      </Pressable>
    </Cast>
  );
});

/** Close X drawn from two rotated bars. */
function CloseGlyph({ color }: { color: string }) {
  return (
    <View style={styles.glyphBox}>
      <View style={[styles.xBar, { backgroundColor: color, width: 10, transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.xBar, { backgroundColor: color, width: 10, transform: [{ rotate: '-45deg' }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
  },
  glyphBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
  },
  check: {
    marginTop: 1,
  },
  xBar: {
    position: 'absolute',
    height: 1.5,
  },
  closeHit: {
    padding: 2,
  },
  pressedShift: {
    transform: [{ translateY: 1 }],
  },
});
