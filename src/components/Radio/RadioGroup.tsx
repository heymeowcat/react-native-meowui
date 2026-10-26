import { createContext, memo, useMemo, type ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

interface RadioGroupContextValue {
  value: string | null;
  onValueChange: (value: string) => void;
}

/** @internal Shared selection state between `RadioGroup` and its `Radio` children. */
export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  /** Currently selected option value; `null` when nothing is selected. */
  value: string | null;
  /** Called with the tapped radio's `value`. */
  onValueChange: (value: string) => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Lays out a set of `Radio` options in a column and drives their selection:
 * each child `Radio` with a `value` is checked when it matches the group
 * value, and pressing it reports that value back through `onValueChange`.
 */
export const RadioGroup = memo(function RadioGroup({
  value,
  onValueChange,
  children,
  style,
}: RadioGroupProps) {
  const { spacing } = useTheme();
  const contextValue = useMemo(() => ({ value, onValueChange }), [value, onValueChange]);

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View accessibilityRole="radiogroup" style={[{ gap: spacing[2] }, style]}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
});
