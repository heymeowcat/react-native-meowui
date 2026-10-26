import { memo, type ReactNode } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { Pressable } from '../Pressable/Pressable';

export interface SearchbarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** When set (and the field has text), shows the clear affordance. */
  onClear?: () => void;
  /** Leading content; defaults to the built-in magnifier glyph. */
  leading?: ReactNode;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A milk-paper search field with an outlineStrong border and 12px corners —
 * the same instrument grammar as `TextInput`, with a stamped magnifier and
 * clear affordance.
 */
export const Searchbar = memo(function Searchbar({
  value,
  onChangeText,
  placeholder,
  disabled = false,
  onClear,
  leading,
  accessibilityLabel,
  style,
  testID,
}: SearchbarProps) {
  const { colors, fonts, metrics, radii } = useTheme();
  const showClear = onClear !== undefined && value.length > 0 && !disabled;

  return (
    <View
      style={[
        styles.field,
        {
          height: metrics.input.md,
          backgroundColor: disabled ? colors.surfaceMuted : colors.surface,
          borderColor: disabled ? colors.outline : colors.outlineStrong,
          borderRadius: radii.lg,
        },
        style,
      ]}
    >
      {leading !== undefined ? (
        leading
      ) : (
        <MagnifierGlyph color={disabled ? colors.onSurfaceSubtle : colors.onSurfaceMuted} />
      )}
      <TextInput
        style={[
          styles.input,
          {
            color: disabled ? colors.onSurfaceSubtle : colors.onSurface,
            fontFamily: fonts.regular,
          },
        ]}
        placeholderTextColor={disabled ? colors.onSurfaceSubtle : colors.onSurfaceMuted}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        accessibilityLabel={accessibilityLabel}
        underlineColorAndroid="transparent"
        testID={testID}
      />
      {showClear && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={onClear}
          radius="full"
          tint={colors.surfaceActive}
          hitSlop={8}
          style={styles.clear}
          testID={testID !== undefined ? `${testID}-clear` : undefined}
        >
          <ClearGlyph color={colors.onSurface} />
        </Pressable>
      )}
    </View>
  );
});

function MagnifierGlyph({ color }: { color: string }) {
  return (
    <View style={styles.magnifierBox}>
      <View style={[styles.magnifierRing, { borderColor: color }]} />
      <View style={[styles.magnifierHandle, { backgroundColor: color }]} />
    </View>
  );
}

function ClearGlyph({ color }: { color: string }) {
  return (
    <View style={styles.clearBox}>
      <View style={[styles.clearBar, { backgroundColor: color, width: 12, transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.clearBar, { backgroundColor: color, width: 12, transform: [{ rotate: '-45deg' }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 15,
    padding: 0,
  },
  magnifierBox: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  magnifierRing: {
    width: 11,
    height: 11,
    borderWidth: 2,
    borderRadius: 999,
  },
  magnifierHandle: {
    position: 'absolute',
    width: 2,
    height: 7,
    bottom: 1,
    right: 2,
    transform: [{ rotate: '-45deg' }],
  },
  clearBox: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBar: {
    position: 'absolute',
    height: 1.5,
  },
  clear: {
    padding: 4,
  },
});
