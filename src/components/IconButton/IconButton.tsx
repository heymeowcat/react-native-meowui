import { cloneElement, isValidElement, memo, type ReactElement, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme, type ThemeColors, type Tone } from '../../theme';
import { Cast, usePressState } from '../../utils/cast';
import { Pressable } from '../Pressable/Pressable';

export type IconButtonVariant = 'ghost' | 'tonal' | 'solid' | 'outline';
export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonTone = Exclude<Tone, 'neutral'>;

type ToneTokens = Record<'fill' | 'onFill' | 'muted' | 'onMuted', keyof ThemeColors>;

const TONE: Record<IconButtonTone, ToneTokens> = {
  primary: { fill: 'primary', onFill: 'onPrimary', muted: 'primaryMuted', onMuted: 'onPrimaryMuted' },
  success: { fill: 'success', onFill: 'onSuccess', muted: 'successMuted', onMuted: 'onSuccessMuted' },
  warning: { fill: 'warning', onFill: 'onWarning', muted: 'warningMuted', onMuted: 'onWarningMuted' },
  error: { fill: 'error', onFill: 'onError', muted: 'errorMuted', onMuted: 'onErrorMuted' },
  info: { fill: 'info', onFill: 'onInfo', muted: 'infoMuted', onMuted: 'onInfoMuted' },
};

export interface IconButtonProps {
  /** Icon content — resolved `color`/`size` are injected when supported. */
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Semantic color family. Defaults to `'primary'`. */
  tone?: IconButtonTone;
  disabled?: boolean;
  /** Marks the button as active. */
  selected?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  /** Required when the icon alone is ambiguous. */
  accessibilityLabel?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A soft square key for a single icon: milk sheet and a strong 1px line, with
 * a 2px warm cast that collapses on press. Supports `outline`, `tonal`,
 * `solid` and `ghost` variants; selected keys fill blueberry.
 */
export const IconButton = memo(function IconButton({
  icon,
  variant = 'outline',
  size = 'md',
  tone = 'primary',
  disabled = false,
  selected = false,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
  style,
}: IconButtonProps) {
  const { colors, metrics, radii } = useTheme();
  const [pressed, pressHandlers] = usePressState();
  const tokens = TONE[tone];
  const box = metrics.icon[size];

  const isSelected = selected && (variant === 'ghost' || variant === 'tonal');
  const framed = variant !== 'ghost' || isSelected;

  const backgroundColor = disabled
    ? colors.surfaceMuted
    : variant === 'solid'
      ? colors[tokens.fill]
      : isSelected
        ? colors.primary
        : variant === 'tonal'
          ? colors[tokens.muted]
          : colors.surface;

  const contentColor = disabled
    ? colors.onSurfaceSubtle
    : variant === 'solid'
      ? colors[tokens.onFill]
      : isSelected
        ? colors.onPrimary
        : variant === 'tonal'
          ? colors[tokens.onMuted]
          : colors.onSurface;

  const cast = framed && !disabled && !pressed ? 2 : 0;
  const borderColor = disabled
    ? colors.outline
    : variant === 'outline'
      ? colors.outlineStrong
      : variant === 'solid'
        ? backgroundColor
        : variant === 'tonal'
          ? colors[tokens.muted]
          : 'transparent';

  const iconSize = Math.round(box * 0.5);
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
      radius={radii.lg}
      style={cast > 0 ? { marginRight: cast, marginBottom: cast } : undefined}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled, selected: selected || undefined }}
        disabled={disabled}
        onPress={onPress}
        onLongPress={onLongPress}
        radius="lg"
        tint={variant === 'ghost' && !disabled ? colors.surfaceMuted : undefined}
        disabledOpacity={1}
        style={[
          styles.base,
          {
            width: box,
            height: box,
            backgroundColor,
            borderColor,
            borderRadius: radii.lg,
          },
          framed && pressed && styles.pressedShift,
          style,
        ]}
        {...pressHandlers}
        testID={testID}
      >
        <View pointerEvents="none" style={styles.center}>
          {renderedIcon}
        </View>
      </Pressable>
    </Cast>
  );
});

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedShift: {
    transform: [{ translateY: 1 }, { scale: 0.985 }],
  },
});
