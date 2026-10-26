import { forwardRef, memo, useState, type ReactNode } from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  type StyleProp,
  type TextInputInstance,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../Text/Text';

export type TextInputSize = 'md' | 'lg';

/**
 * Handle to the underlying native input. Declared structurally (instead of
 * re-exporting RN's `TextInputInstance`, which aliases a compiler-private
 * class that cannot appear in emitted declarations).
 */
export interface TextInputRef {
  focus(): void;
  blur(): void;
  clear(): void;
  isFocused(): boolean;
  setNativeProps(props: Record<string, unknown>): void;
}

export interface TextInputProps extends Omit<RNTextInputProps, 'ref'> {
  /** Label rendered above the field. */
  label?: string;
  /** Helper text rendered below the field; uses the error color when `error` is set. */
  helperText?: string;
  /** Marks the field invalid: label, border and helper render in oxblood. */
  error?: boolean;
  disabled?: boolean;
  /** Field height, resolved through `theme.metrics.input`. Defaults to `'md'`. */
  size?: TextInputSize;
  /** Content rendered inside the field, before the input (icons, prefixes). */
  leading?: ReactNode;
  /** Content rendered inside the field, after the input (actions, units). */
  trailing?: ReactNode;
  /** Style for the outer label / field / helper column. */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * A form field per the Mochi Press input spec: cream well, 1px outlineStrong
 * border, 12px radius. Focus lifts the ground to milk and inks the border
 * blueberry; errors stamp oxblood on label, border and helper.
 */
export const TextInput = memo(
  forwardRef<TextInputRef, TextInputProps>(function TextInput(
    {
      label,
      helperText,
      error = false,
      disabled = false,
      size = 'md',
      leading,
      trailing,
      containerStyle,
      onFocus,
      onBlur,
      style,
      ...rest
    },
    ref
  ) {
    const { colors, fonts, metrics, radii } = useTheme();
    const [focused, setFocused] = useState(false);

    const height = metrics.input[size];
    const borderColor = disabled
      ? colors.outline
      : error
        ? colors.error
        : focused
          ? colors.primary
          : colors.outlineStrong;
    const backgroundColor = disabled
      ? colors.surfaceMuted
      : focused
        ? colors.surface
        : colors.background;

    const labelColor = disabled
      ? colors.onSurfaceMuted
      : error
        ? colors.error
        : focused
          ? colors.primary
          : colors.onSurfaceMuted;
    const radius = radii.lg;

    return (
      <View style={[styles.column, containerStyle]}>
        {label !== undefined && (
          <Text weight="500" style={{ color: labelColor, fontSize: 12, lineHeight: 16 }}>
            {label}
          </Text>
        )}
        <View
          style={[
            styles.fieldRow,
            {
              height,
              backgroundColor,
              borderColor,
              borderRadius: radius,
            },
          ]}
        >
          {leading != null && (
            <View style={disabled ? styles.mutedSlot : undefined}>{leading}</View>
          )}
          <RNTextInput
            ref={ref as React.Ref<TextInputInstance>}
            style={[
              styles.input,
              {
                color: disabled ? colors.onSurfaceSubtle : colors.onSurface,
                fontSize: size === 'lg' ? 16 : 14,
                fontFamily: fonts.regular,
              },
              style,
            ]}
            placeholderTextColor={disabled ? colors.onSurfaceSubtle : colors.onSurfaceMuted}
            editable={!disabled}
            underlineColorAndroid="transparent"
            onFocus={(event) => {
              setFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setFocused(false);
              onBlur?.(event);
            }}
            {...rest}
          />
          {trailing}
        </View>
        {helperText !== undefined && (
          <Text variant="caption" style={{ color: error ? colors.error : colors.onSurfaceMuted }}>
            {helperText}
          </Text>
        )}
      </View>
    );
  })
);

const styles = StyleSheet.create({
  column: {
    gap: 6,
    alignSelf: 'stretch',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 0,
  },
  mutedSlot: {
    opacity: 0.5,
  },
});
