import { memo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface DividerProps {
  /** Vertical dividers span their container's height. */
  vertical?: boolean;
  /** Indent the line from the leading edge (e.g. to align with list content). */
  inset?: number;
  /** Line color. Defaults to `colors.outline`. */
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/** A 1px hairline separator. The quiet workhorse of the kit's list layouts. */
export const Divider = memo(function Divider({
  vertical = false,
  inset = 0,
  color,
  style,
}: DividerProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        { marginStart: inset, backgroundColor: color ?? colors.outline },
        style,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  horizontal: {
    height: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
  vertical: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
});
