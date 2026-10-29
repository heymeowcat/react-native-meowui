import {
  Children,
  cloneElement,
  isValidElement,
  memo,
  type ReactElement,
  type ReactNode,
} from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { IconButton } from '../IconButton/IconButton';
import { Pressable } from '../Pressable/Pressable';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

export interface DataTableProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * The root of the data table family: a milk-paper ledger sheet bounded by a
 * 1px hairline, ruled inside by hairlines. Compose with `DataTableHeader`,
 * `DataTableRow`, `DataTableCell` and `DataTablePagination`.
 */
export const DataTable = memo(function DataTable({ children, style, testID }: DataTableProps) {
  return (
    <Surface outlined radius="xl" testID={testID} style={[styles.table, style]}>
      {children}
    </Surface>
  );
});

export interface DataTableHeaderProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * The oat column-label row, ruled off from the body by a hairline and
 * separated internally by hairline verticals; fill it with `DataTableCell`s.
 */
export const DataTableHeader = memo(function DataTableHeader({ children, style, testID }: DataTableHeaderProps) {
  const { colors } = useTheme();

  const cells = Children.map(children, (child, index) => {
    if (isValidElement(child) && index > 0) {
      const element = child as ReactElement<{ style?: StyleProp<ViewStyle> }>;
      return cloneElement(element, {
        style: [element.props.style, { borderLeftWidth: 1, borderLeftColor: colors.outline }],
      });
    }
    return child;
  });

  return (
    <View
      testID={testID}
      style={[styles.header, { backgroundColor: colors.surfaceMuted, borderBottomColor: colors.outline }, style]}
    >
      {cells}
    </View>
  );
});

export interface DataTableCellProps {
  children?: ReactNode;
  /** Right-aligns the content and switches to tabular numerals. */
  numeric?: boolean;
  /** Flex grow along the row. Defaults to `1`. */
  flex?: number;
  /** Fixed width in pixels; combine with `flex={0}` for fixed-only sizing. */
  width?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A single column cell. DM Sans `label` text at 11px, sentence case; `numeric`
 * cells align right in DM Mono with tabular numerals.
 */
export const DataTableCell = memo(function DataTableCell({
  children,
  numeric = false,
  flex = 1,
  width,
  style,
  testID,
}: DataTableCellProps) {
  const { colors, spacing } = useTheme();

  return (
    <View testID={testID} style={[styles.cell, { flex, width, paddingHorizontal: spacing[3] }, style]}>
      <Text
        variant={numeric ? 'mono' : 'label'}
        color={colors.onSurfaceMuted}
        style={[styles.cellText, numeric && styles.cellTextNumeric]}
        numberOfLines={1}
      >
        {children}
      </Text>
    </View>
  );
});

export interface DataTableRowProps {
  onPress?: () => void;
  /** Rests the row on the oat ground. */
  selected?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A table body row ruled off by a hairline; make it pressable with `onPress`.
 * Rows are tint-only — pressing never translates.
 */
export const DataTableRow = memo(function DataTableRow({
  onPress,
  selected = false,
  disabled = false,
  children,
  style,
  testID,
}: DataTableRowProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole={onPress !== undefined ? 'button' : undefined}
      accessibilityState={{ selected: selected || undefined, disabled: disabled || undefined }}
      disabled={disabled || onPress === undefined}
      onPress={onPress}
      tint={colors.surfaceActive}
      disabledOpacity={1}
      testID={testID}
      style={[
        styles.row,
        { borderTopColor: colors.outline },
        selected && { backgroundColor: colors.surfaceMuted },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
});

export interface DataTablePaginationProps {
  /** Current page, 1-based. */
  page: number;
  numberOfPages: number;
  onPageChange: (page: number) => void;
  /** Trailing count label, e.g. `1–10 of 132`. Defaults to `page of numberOfPages`. */
  label?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** The footer row of a `DataTable`: mono page label plus ghost prev/next keys. */
export const DataTablePagination = memo(function DataTablePagination({
  page,
  numberOfPages,
  onPageChange,
  label,
  style,
  testID,
}: DataTablePaginationProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      testID={testID}
      style={[
        styles.pagination,
        { borderTopColor: colors.outline, paddingHorizontal: spacing[3], gap: spacing[1] },
        style,
      ]}
    >
      <Text variant="mono" color={colors.onSurfaceMuted} style={styles.paginationLabel}>
        {label ?? `${page} of ${numberOfPages}`}
      </Text>
      <IconButton
        icon={<ChevronGlyph direction="left" />}
        variant="ghost"
        size="sm"
        disabled={page <= 1}
        onPress={() => onPageChange(page - 1)}
        accessibilityLabel="Previous page"
      />
      <IconButton
        icon={<ChevronGlyph direction="right" />}
        variant="ghost"
        size="sm"
        disabled={page >= numberOfPages}
        onPress={() => onPageChange(page + 1)}
        accessibilityLabel="Next page"
      />
    </View>
  );
});

/**
 * Minimal vector glyph so pagination needs no icon library. Color and size are
 * injected by `IconButton` when rendered inside one.
 */
function ChevronGlyph({
  color,
  size = 16,
  direction = 'right',
}: {
  color?: string;
  size?: number;
  direction?: 'left' | 'right';
}) {
  const arm = Math.round(size * 0.5);
  return (
    <View style={[styles.glyphBox, { width: size, height: size }]}>
      <View
        style={[direction === 'right' ? styles.chevronRight : styles.chevronLeft, { width: arm, height: arm, borderColor: color }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    minHeight: 40,
    borderBottomWidth: 1,
  },
  cell: {
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 11,
    lineHeight: 14,
  },
  cellTextNumeric: {
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  row: {
    flexDirection: 'row',
    minHeight: 52,
    borderTopWidth: 1,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderTopWidth: 1,
  },
  paginationLabel: {
    flex: 1,
  },
  glyphBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronRight: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    transform: [{ rotate: '45deg' }],
  },
  chevronLeft: {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    transform: [{ rotate: '-45deg' }],
  },
});
