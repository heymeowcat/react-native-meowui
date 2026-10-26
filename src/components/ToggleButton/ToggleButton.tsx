import {
  createContext,
  cloneElement,
  isValidElement,
  memo,
  useContext,
  type ReactElement,
  type ReactNode,
} from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Cast } from '../../utils/cast';
import { Pressable } from '../Pressable/Pressable';

interface ToggleGroupValue {
  value: string | null;
  onValueChange: ((value: string) => void) | null;
}

const ToggleGroupContext = createContext<ToggleGroupValue>({
  value: null,
  onValueChange: null,
});

export interface ToggleButtonGroupProps {
  /** The selected item's value, or null when nothing is selected. */
  value: string | null;
  onValueChange: (value: string) => void;
  children: ReactNode;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Bounded group of `ToggleButton`s — exactly one item can be selected. */
export function ToggleButtonGroup({
  value,
  onValueChange,
  children,
  accessibilityLabel,
  style,
}: ToggleButtonGroupProps) {
  const { colors, radii } = useTheme();
  const ctx = { value, onValueChange };
  return (
    <ToggleGroupContext.Provider value={ctx}>
      <View
        accessibilityRole="radiogroup"
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
      >
        {children}
      </View>
    </ToggleGroupContext.Provider>
  );
}

export interface ToggleButtonProps {
  /** Icon content; resolved `color` is injected when supported. */
  icon: ReactNode;
  /** Group item identity. Standalone buttons ignore this. */
  value?: string;
  /** Standalone mode: boolean state instead of group membership. */
  selected?: boolean;
  onValueChange?: (selected: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * An icon toggle. Inside a `ToggleButtonGroup` it behaves like a radio key
 * lifted on milk paper; on its own it flips a boolean with a blueberry tonal
 * fill. Selection is quiet, never colorful.
 */
export const ToggleButton = memo(function ToggleButton({
  icon,
  value,
  selected: selectedProp,
  onValueChange,
  disabled = false,
  accessibilityLabel,
  style,
  testID,
}: ToggleButtonProps) {
  const { colors, radii } = useTheme();
  const group = useContext(ToggleGroupContext);

  const inGroup = value !== undefined && group.onValueChange !== null;
  const isSelected = inGroup ? group.value === value : (selectedProp ?? false);

  const handlePress = () => {
    if (inGroup) group.onValueChange?.(value as string);
    else onValueChange?.(!isSelected);
  };

  const backgroundColor = disabled
    ? 'transparent'
    : isSelected
      ? inGroup
        ? colors.surface
        : colors.primaryMuted
      : 'transparent';
  const contentColor = disabled
    ? colors.onSurfaceSubtle
    : isSelected
      ? inGroup
        ? colors.onSurface
        : colors.onPrimaryMuted
      : colors.onSurfaceMuted;

  const renderedIcon =
    isValidElement(icon)
      ? cloneElement(icon as ReactElement<{ color?: string }>, { color: contentColor })
      : icon;

  const cell = (
    <Pressable
      accessibilityRole={inGroup ? 'radio' : 'button'}
      accessibilityState={{ disabled, checked: inGroup ? isSelected : undefined, selected: !inGroup ? isSelected : undefined }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={handlePress}
      radius={inGroup ? 'md' : 'lg'}
      pressedOpacity={0.8}
      tint={colors.surfaceMuted}
      disabledOpacity={1}
      style={[
        styles.cell,
        {
          backgroundColor,
          borderRadius: inGroup ? radii.md : radii.lg,
          borderWidth: inGroup ? 1 : 0,
          borderColor: isSelected ? colors.outlineStrong : 'transparent',
        },
        style,
      ]}
      testID={testID}
    >
      {renderedIcon}
    </Pressable>
  );

  if (!inGroup) return cell;

  return (
    <Cast
      level={isSelected && !disabled ? 1 : 0}
      color={colors.shadow}
      radius={radii.md}
    >
      {cell}
    </Cast>
  );
});

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 16,
    padding: 3,
    gap: 2,
  },
  cell: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
