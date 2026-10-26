import { memo, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Cast } from '../../utils/cast';
import { Pressable } from '../Pressable/Pressable';
import { Text } from '../Text/Text';

export interface SegmentedOption {
  value: string;
  label: string;
  /** Leading content per segment. */
  icon?: ReactNode;
  disabled?: boolean;
}

/** Single-select props: `value` and `onChange` work on one string. */
export interface SegmentedButtonsSingleProps {
  options: SegmentedOption[];
  value: string;
  multi?: false;
  onChange: (value: string) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** Multi-select props: `multi: true` switches `value`/`onChange` to arrays. */
export interface SegmentedButtonsMultiProps {
  options: SegmentedOption[];
  value: string[];
  multi: true;
  onChange: (value: string[]) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export type SegmentedButtonsProps = SegmentedButtonsSingleProps | SegmentedButtonsMultiProps;

/**
 * A recessed oat tray with the active segment lifted onto milk paper — 1px
 * outlineStrong border and a 1px warm cast. No sliding thumb; the selected key
 * simply sits proud of the tray.
 */
export const SegmentedButtons = memo(function SegmentedButtons({
  options,
  value,
  multi = false,
  onChange,
  disabled = false,
  accessibilityLabel,
  style,
  testID,
}: SegmentedButtonsProps) {
  const { colors, radii } = useTheme();

  const selected = Array.isArray(value) ? value : [value];
  const isMulti = multi === true;

  // The public props are a discriminated union; inside the component the
  // emit shape is decided by `isMulti`, not by narrowing.
  const emit = onChange as (value: string | string[]) => void;

  const select = (option: string) => {
    if (!isMulti) {
      emit(option);
      return;
    }
    const next = selected.includes(option)
      ? selected.filter((v) => v !== option)
      : [...selected, option];
    emit(next);
  };

  return (
    <View
      accessibilityRole={isMulti ? 'none' : 'radiogroup'}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.track,
        {
          backgroundColor: colors.surfaceMuted,
          borderColor: colors.outline,
          borderRadius: radii.xl,
        },
        style,
      ]}
      testID={testID}
    >
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        const isDisabled = disabled || option.disabled;
        const labelColor = isDisabled
          ? colors.onSurfaceSubtle
          : isSelected
            ? colors.onSurface
            : colors.onSurfaceMuted;

        return (
          <Cast
            key={option.value}
            level={isSelected && !isDisabled ? 1 : 0}
            color={colors.shadow}
            radius={radii.md}
            style={styles.segmentWrap}
          >
            <Pressable
              accessibilityRole={isMulti ? 'button' : 'radio'}
              accessibilityState={{ disabled: isDisabled, checked: isMulti ? undefined : isSelected }}
              accessibilityLabel={option.label}
              disabled={isDisabled}
              onPress={() => select(option.value)}
              radius="md"
              tint={colors.surfaceActive}
              disabledOpacity={1}
              style={[
                styles.segment,
                isSelected && {
                  backgroundColor: colors.surface,
                  borderColor: colors.outlineStrong,
                },
              ]}
            >
              {option.icon}
              <Text weight={isSelected ? '600' : '500'} style={{ color: labelColor, fontSize: 12, lineHeight: 16 }} numberOfLines={1}>
                {option.label}
              </Text>
            </Pressable>
          </Cast>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 4,
    gap: 4,
  },
  segmentWrap: {
    flex: 1,
    alignSelf: 'stretch',
  },
  segment: {
    minHeight: 32,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
