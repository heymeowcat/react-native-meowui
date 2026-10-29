import { memo, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { IconButton } from '../IconButton/IconButton';
import { Pressable } from '../Pressable/Pressable';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

export interface AppbarProps {
  children?: ReactNode;
  /** Optional paper-cast depth; toolbars usually stay at `0`. */
  elevation?: 0 | 1 | 2;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * The kit's top bar: a 56px milk-paper sheet, square corners, ruled along its
 * bottom edge by a hairline. Compose with `AppbarBackAction`, `AppbarContent`
 * and `AppbarAction`.
 */
export const Appbar = memo(function Appbar({ children, elevation = 0, style, testID }: AppbarProps) {
  const { colors, spacing } = useTheme();

  return (
    <Surface
      cast={elevation}
      outlined={false}
      radius="none"
      backgroundColor={colors.surface}
      testID={testID}
      style={[
        styles.appbar,
        {
          borderBottomWidth: 1,
          borderBottomColor: colors.outline,
          paddingHorizontal: spacing[2],
          gap: spacing[1],
        },
        style,
      ]}
    >
      {children}
    </Surface>
  );
});

export interface AppbarContentProps {
  /** Title line, clamped to one row. */
  title: string;
  /** Optional secondary line under the title. */
  subtitle?: string;
  /** Leading content before the title column (rare — back actions usually sit outside). */
  leading?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** The flexible title block of an `Appbar`; takes all remaining horizontal space. */
export const AppbarContent = memo(function AppbarContent({
  title,
  subtitle,
  leading,
  style,
  testID,
}: AppbarContentProps) {
  const { colors, spacing } = useTheme();

  return (
    <View testID={testID} style={[styles.content, { marginHorizontal: spacing[2] }, style]}>
      {leading}
      <View style={styles.contentColumn}>
        <Text variant="title" numberOfLines={1}>
          {title}
        </Text>
        {subtitle !== undefined && (
          <Text variant="caption" color={colors.onSurfaceMuted} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
});

export interface AppbarActionProps {
  /** Icon content — resolved `color`/`size` are injected when supported. */
  icon: ReactNode;
  onPress?: () => void;
  /** Required when the icon alone is ambiguous. */
  accessibilityLabel?: string;
  disabled?: boolean;
  testID?: string;
}

/** A compact icon action for an `Appbar`; wraps a ghost `IconButton` (`sm`). */
export const AppbarAction = memo(function AppbarAction({
  icon,
  onPress,
  accessibilityLabel,
  disabled,
  testID,
}: AppbarActionProps) {
  return (
    <IconButton
      icon={icon}
      variant="ghost"
      size="sm"
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    />
  );
});

export interface AppbarBackActionProps {
  onPress?: () => void;
  /** Defaults to `'Back'`. */
  accessibilityLabel?: string;
  disabled?: boolean;
  testID?: string;
}

/**
 * The navigation-back action for an `Appbar`: a soft target carrying the
 * built-in ink chevron-left glyph.
 */
export const AppbarBackAction = memo(function AppbarBackAction({
  onPress,
  accessibilityLabel = 'Back',
  disabled,
  testID,
}: AppbarBackActionProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      radius="sm"
      tint={disabled ? undefined : colors.surfaceActive}
      disabledOpacity={1}
      style={styles.backAction}
      testID={testID}
    >
      <ChevronLeftGlyph color={disabled ? colors.onSurfaceSubtle : colors.onSurface} />
    </Pressable>
  );
});

/** Minimal vector glyph so the back action needs no icon library. */
function ChevronLeftGlyph({ color, size = 16 }: { color: string; size?: number }) {
  const arm = Math.round(size * 0.5);
  return (
    <View style={[styles.glyphBox, { width: size, height: size }]}>
      <View style={[styles.chevronLeft, { width: arm, height: arm, borderColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backAction: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentColumn: {
    flex: 1,
  },
  glyphBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronLeft: {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    transform: [{ rotate: '-45deg' }],
  },
});
