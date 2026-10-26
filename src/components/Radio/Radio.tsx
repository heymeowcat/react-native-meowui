import { useContext, memo, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme, type ThemeColors, type Tone } from '../../theme';
import { Cast } from '../../utils/cast';
import { Pressable } from '../Pressable/Pressable';
import { Text } from '../Text/Text';
import { RadioGroupContext } from './RadioGroup';

export type RadioTone = Exclude<Tone, 'neutral'>;

type ToneTokens = Record<'fill' | 'on', keyof ThemeColors>;

const TONE: Record<RadioTone, ToneTokens> = {
  primary: { fill: 'primary', on: 'onPrimary' },
  success: { fill: 'success', on: 'onSuccess' },
  warning: { fill: 'warning', on: 'onWarning' },
  error: { fill: 'error', on: 'onError' },
  info: { fill: 'info', on: 'onInfo' },
};

export interface RadioProps {
  /** Standalone mode: explicit selection state. */
  selected?: boolean;
  /** Group mode: this option's value inside a RadioGroup. */
  value?: string;
  onValueChange?: () => void;
  disabled?: boolean;
  label?: ReactNode;
  tone?: RadioTone;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A 20px circle on milk paper with an outlineStrong border. Selected sinks into
 * the tone fill (the cast collapses) and stamps a paper center dot.
 */
export const Radio = memo(function Radio({
  selected: selectedProp,
  value,
  onValueChange,
  disabled = false,
  label,
  tone = 'primary',
  style,
  testID,
}: RadioProps) {
  const { colors } = useTheme();
  const group = useContext(RadioGroupContext);

  const inGroup = value !== undefined && group !== null;
  const isSelected = inGroup ? group.value === value : (selectedProp ?? false);

  const handlePress = () => {
    if (inGroup) group.onValueChange(value as string);
    else onValueChange?.();
  };

  const tokens = TONE[tone];
  const labelColor = disabled ? colors.onSurfaceSubtle : colors.onSurface;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled }}
      accessibilityLabel={typeof label === 'string' ? label : undefined}
      disabled={disabled}
      onPress={handlePress}
      radius="md"
      tint={colors.surfaceMuted}
      disabledOpacity={1}
      style={[styles.row, style]}
      testID={testID}
    >
      <Cast level={isSelected || disabled ? 0 : 1} color={colors.shadow} radius={9999}>
        <View
          style={[
            styles.circle,
            {
              borderColor: disabled
                ? colors.outline
                : isSelected
                  ? colors[tokens.fill]
                  : colors.outlineStrong,
              backgroundColor: disabled
                ? colors.surfaceMuted
                : isSelected
                  ? colors[tokens.fill]
                  : colors.surface,
            },
          ]}
        >
          {isSelected && <View style={[styles.bullet, { backgroundColor: colors[tokens.on] }]} />}
        </View>
      </Cast>
      {label !== undefined && label !== null && (
        <Text style={{ color: labelColor, flexShrink: 1 }}>{label}</Text>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    gap: 12,
    paddingVertical: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 9999,
  },
});
