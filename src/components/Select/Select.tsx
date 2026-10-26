import { memo, useCallback, useRef, useState, type ComponentRef } from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { Menu, MenuItem } from '../Menu/Menu';
import { Pressable } from '../Pressable/Pressable';
import { Text } from '../Text/Text';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  /** Currently selected value, or `null` for the placeholder state. */
  value: string | null;
  onValueChange: (value: string) => void;
  /** Shown when no value is selected. Defaults to `'Select…'`. */
  placeholder?: string;
  disabled?: boolean;
  /** Renders the trigger border in `colors.error`. */
  error?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

interface Anchor {
  x: number;
  y: number;
  width: number;
}

/**
 * A dropdown select built on `Menu`. The trigger matches the input spec —
 * 46px, cream well, hairline outlineStrong border, 12px radius, DM Sans value
 * — and on press it measures itself in window coordinates and opens the menu
 * anchored just below it, at least 200pt wide. While the menu is open the
 * trigger reads as focused (milk ground, blueberry border); the chevron glyph
 * flips, and errors stamp the border oxblood.
 */
export const Select = memo(function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select…',
  disabled = false,
  error = false,
  accessibilityLabel,
  style,
  testID,
}: SelectProps) {
  const { colors, metrics } = useTheme();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const triggerRef = useRef<ComponentRef<typeof Pressable> | null>(null);

  const openMenu = useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y: y + height + 4, width });
      setOpen(true);
    });
  }, []);

  const selected = options.find((option) => option.value === value);
  const menuWidth = Math.max(200, anchor?.width ?? 200);
  const borderColor = error ? colors.error : open ? colors.primary : colors.outlineStrong;
  const backgroundColor = disabled
    ? colors.surfaceMuted
    : open
      ? colors.surface
      : colors.background;

  return (
    <>
      <Pressable
        ref={triggerRef}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? selected?.label ?? placeholder}
        accessibilityState={{ disabled, expanded: open }}
        disabled={disabled}
        onPress={openMenu}
        radius="lg"
        tint={colors.surfaceMuted}
        disabledOpacity={1}
        style={[
          styles.trigger,
          {
            height: metrics.input.md,
            borderColor,
            backgroundColor,
          },
          style,
        ]}
        testID={testID}
      >
        <Text
          variant="body"
          style={{
            flex: 1,
            color: disabled
              ? colors.onSurfaceSubtle
              : selected == null
                ? colors.onSurfaceMuted
                : colors.onSurface,
          }}
          numberOfLines={1}
        >
          {selected?.label ?? placeholder}
        </Text>
        <ChevronGlyph
          color={disabled ? colors.onSurfaceSubtle : open ? colors.primary : colors.onSurfaceMuted}
          open={open}
        />
      </Pressable>

      {options.length > 0 && (
        <Menu
          visible={open}
          onDismiss={() => setOpen(false)}
          anchor={anchor != null ? { x: anchor.x, y: anchor.y } : undefined}
          width={menuWidth}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              label={option.label}
              disabled={option.disabled}
              selected={option.value === value}
              onPress={() => {
                onValueChange(option.value);
                setOpen(false);
              }}
            />
          ))}
        </Menu>
      )}
    </>
  );
});

/**
 * Pure-View chevron-down glyph: a single corner-border View rotated 45° (the
 * kit's glyph idiom, as in `Chip`), flipping to −135° while open.
 */
function ChevronGlyph({ color, open }: { color: string; open: boolean }) {
  return (
    <View style={styles.chevronBox}>
      <View
        style={[
          styles.chevron,
          { borderColor: color, transform: [{ rotate: open ? '-135deg' : '45deg' }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 14,
    gap: 10,
  },
  chevronBox: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    width: 9,
    height: 9,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
});
