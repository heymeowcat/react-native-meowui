import { cloneElement, isValidElement, memo, type ReactElement, type ReactNode } from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  StyleSheet,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme, type ThemeColors, type Tone } from '../../theme';
import { Cast, usePressState } from '../../utils/cast';
import { Pressable } from '../Pressable/Pressable';
import { Text } from '../Text/Text';

export type ButtonVariant = 'solid' | 'tonal' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Tones that make sense for an action; `neutral` actions use the ghost shape. */
export type ButtonTone = Exclude<Tone, 'neutral'>;

type ToneTokens = Record<'fill' | 'onFill' | 'muted' | 'onMuted', keyof ThemeColors>;

const TONE_FILL: Record<ButtonTone, ToneTokens> = {
  primary: { fill: 'primary', onFill: 'onPrimary', muted: 'primaryMuted', onMuted: 'onPrimaryMuted' },
  success: { fill: 'success', onFill: 'onSuccess', muted: 'successMuted', onMuted: 'onSuccessMuted' },
  warning: { fill: 'warning', onFill: 'onWarning', muted: 'warningMuted', onMuted: 'onWarningMuted' },
  error: { fill: 'error', onFill: 'onError', muted: 'errorMuted', onMuted: 'onErrorMuted' },
  info: { fill: 'info', onFill: 'onInfo', muted: 'infoMuted', onMuted: 'onInfoMuted' },
};

/** Icon nodes receive the resolved content color unless they set their own. */
function renderSlot(node: ReactNode, color: string): ReactNode {
  if (isValidElement(node)) {
    const element = node as ReactElement<{ color?: string }>;
    return element.props.color !== undefined ? element : cloneElement(element, { color });
  }
  return node;
}

export interface ButtonProps {
  /** Label text, or custom content for full control. */
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Semantic color family. Defaults to `'primary'` (blueberry). */
  tone?: ButtonTone;
  disabled?: boolean;
  /** Shows a leading spinner and disables interaction. */
  loading?: boolean;
  /** Leading content — icon, avatar, anything. */
  icon?: ReactNode;
  /** Trailing content. */
  trailingIcon?: ReactNode;
  /** Stretch to the parent's width. */
  fullWidth?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  /** Accessibility label. Falls back to the string children. */
  accessibilityLabel?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  /** Style overrides for the label (ignored when `children` is custom content). */
  labelStyle?: StyleProp<TextStyle>;
}

/**
 * The kit's primary action — a solid blueberry key, a milk outline or a
 * periwinkle tonal fill, each resting on a 2px warm cast that collapses as
 * the label presses 1px into it. Variants: `solid`, `tonal`, `outline`,
 * `ghost`.
 */
export const Button = memo(function Button({
  children,
  variant = 'solid',
  size = 'md',
  tone = 'primary',
  disabled = false,
  loading = false,
  icon,
  trailingIcon,
  fullWidth = false,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
  style,
  labelStyle,
}: ButtonProps) {
  const { colors, spacing, metrics, radii } = useTheme();
  const [pressed, pressHandlers] = usePressState();
  const tokens = TONE_FILL[tone];

  const inactive = disabled || loading;
  const height = metrics.control[size];
  const paddingX = size === 'sm' ? spacing[3] : spacing[4];

  const solidFill = variant === 'solid';
  const tonalFill = variant === 'tonal';

  const backgroundColor = solidFill
    ? inactive
      ? colors.surfaceMuted
      : colors[tokens.fill]
    : tonalFill
      ? inactive
        ? colors.surfaceMuted
        : colors[tokens.muted]
      : variant === 'outline'
        ? colors.surface
        : 'transparent';

  const contentColor = inactive
    ? colors.onSurfaceSubtle
    : solidFill
      ? colors[tokens.onFill]
      : tonalFill
        ? colors[tokens.onMuted]
        : variant === 'outline'
          ? colors.onSurface
          : colors.onSurfaceMuted;

  // Framed variants rest on a soft cast; ghost keys stay flat.
  const cast = solidFill || tonalFill || variant === 'outline' ? (inactive || pressed ? 0 : 2) : 0;
  const borderColor = solidFill
    ? backgroundColor
    : tonalFill
      ? colors[tokens.muted]
      : variant === 'outline'
        ? colors.outlineStrong
        : 'transparent';

  return (
    <Cast
      level={cast}
      color={colors.shadow}
      radius={radii.lg}
      style={[
        cast > 0 && { marginRight: cast, marginBottom: cast },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? (typeof children === 'string' ? children : undefined)}
        accessibilityState={{ disabled, busy: loading }}
        disabled={inactive}
        onPress={onPress}
        onLongPress={onLongPress}
        radius="lg"
        tint={variant === 'ghost' && !inactive ? colors.surfaceMuted : undefined}
        disabledOpacity={1}
        style={[
          styles.base,
          { height, paddingHorizontal: paddingX, backgroundColor, borderColor, borderRadius: radii.lg },
          pressed && !flatVariant(variant) && styles.pressedShift,
        ]}
        {...pressHandlers}
        testID={testID}
      >
        <View style={styles.contentRow} pointerEvents="none">
          {loading ? <RNActivityIndicator size="small" color={contentColor} /> : renderSlot(icon, contentColor)}
          {children != null && (
            <Text weight="600" style={[{ color: contentColor, fontSize: size === 'sm' ? 12 : 13, lineHeight: 18 }, labelStyle]} numberOfLines={1}>
              {children}
            </Text>
          )}
          {renderSlot(trailingIcon, contentColor)}
        </View>
      </Pressable>
    </Cast>
  );
});

function flatVariant(variant: ButtonVariant): boolean {
  return variant === 'ghost';
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  pressedShift: {
    transform: [{ translateY: 1 }, { scale: 0.99 }],
  },
});
