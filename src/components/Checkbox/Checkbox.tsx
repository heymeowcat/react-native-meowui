import { memo, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme, type ThemeColors, type Tone } from '../../theme';
import { Cast } from '../../utils/cast';
import { Pressable } from '../Pressable/Pressable';
import { Text } from '../Text/Text';

export type CheckboxTone = Exclude<Tone, 'neutral'>;

type ToneTokens = Record<'fill' | 'on', keyof ThemeColors>;

const TONE: Record<CheckboxTone, ToneTokens> = {
  primary: { fill: 'primary', on: 'onPrimary' },
  success: { fill: 'success', on: 'onSuccess' },
  warning: { fill: 'warning', on: 'onWarning' },
  error: { fill: 'error', on: 'onError' },
  info: { fill: 'info', on: 'onInfo' },
};

export interface CheckboxProps {
  checked: boolean;
  /** Called with the next state when the row is pressed. */
  onValueChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Label rendered beside the box; the whole row is tappable. */
  label?: ReactNode;
  /** Semantic color family for the checked fill. Defaults to `'primary'`. */
  tone?: CheckboxTone;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A 20px checkbox: milk sheet, 1px outlineStrong border, 6px corners. Checked
 * sinks into the tone fill (the cast collapses) and stamps a paper check.
 */
export const Checkbox = memo(function Checkbox({
  checked,
  onValueChange,
  disabled = false,
  label,
  tone = 'primary',
  style,
  testID,
}: CheckboxProps) {
  const { colors, radii } = useTheme();
  const tokens = TONE[tone];

  const boxBackground = disabled
    ? colors.surfaceMuted
    : checked
      ? colors[tokens.fill]
      : colors.surface;

  const boxBorder = disabled
    ? colors.outline
    : checked
      ? colors[tokens.fill]
      : colors.outlineStrong;

  const labelColor = disabled ? colors.onSurfaceSubtle : colors.onSurface;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={typeof label === 'string' ? label : undefined}
      disabled={disabled}
      onPress={() => onValueChange?.(!checked)}
      radius="md"
      tint={colors.surfaceMuted}
      disabledOpacity={1}
      style={[styles.row, style]}
      testID={testID}
    >
      <Cast level={checked || disabled ? 0 : 1} color={colors.shadow} radius={radii.sm}>
        <View
          style={[
            styles.box,
            {
              backgroundColor: boxBackground,
              borderColor: boxBorder,
              borderRadius: radii.sm,
            },
          ]}
        >
          {checked && <CheckMark color={colors[tokens.on]} />}
        </View>
      </Cast>
      {label !== undefined && label !== null && (
        <Text style={{ color: labelColor, flexShrink: 1 }}>{label}</Text>
      )}
    </Pressable>
  );
});

function CheckMark({ color }: { color: string }) {
  return (
    <View style={styles.markBox}>
      <View style={[styles.check, { borderColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    gap: 12,
    paddingVertical: 10,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markBox: {
    width: 11,
    height: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    width: 9,
    height: 5,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    transform: [{ rotate: '-45deg' }],
    marginTop: -1,
  },
});
