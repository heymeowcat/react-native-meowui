import { memo, type ReactNode } from 'react';
import {
  Image,
  StyleSheet,
  View,
  type ImageProps,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme, type RadiusKey } from '../../theme';
import { Cast, usePressState, type CastLevel } from '../../utils/cast';
import { Pressable } from '../Pressable/Pressable';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

export interface CardProps {
  children?: ReactNode;
  /** Soft cast depth in px. Cards read best at `1` (collapses to `0` while pressed). */
  elevation?: 0 | 1 | 2 | 3;
  /** Draw the 1px warm hairline. Defaults to `true`. */
  outlined?: boolean;
  /** Corner radius token. Defaults to `'xl'` (16). */
  radius?: RadiusKey;
  /** When set, the whole card presses like a soft key: +1px shift, cast collapse. */
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A content container built on `Surface` — a milk-paper sheet bounded by a 1px
 * hairline, lifted by a soft cast. Compose with `CardCover`, `CardTitle`,
 * `CardContent` and `CardActions`. Set `onPress` to make the entire card
 * interactive: it translates +1px and collapses its cast, like a soft key.
 *
 * `overflow: 'hidden'` is always applied so `CardCover` clips to the card's
 * corners.
 */
export const Card = memo(function Card({
  children,
  elevation = 1,
  outlined = true,
  radius = 'xl',
  onPress,
  disabled = false,
  style,
  testID,
}: CardProps) {
  const { colors, radii } = useTheme();
  const [pressed, pressHandlers] = usePressState();

  if (onPress !== undefined) {
    // Soft-key press: translate +1px and collapse the cast.
    const cast: CastLevel = !outlined || pressed ? 0 : elevation;

    return (
      <Cast
        level={cast}
        color={colors.shadowSoft}
        style={cast > 0 ? { marginRight: cast, marginBottom: cast } : undefined}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: disabled || undefined }}
          disabled={disabled}
          onPress={onPress}
          radius={radius}
          tint={colors.surfaceMuted}
          disabledOpacity={1}
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderRadius: radii[radius] },
            outlined && { borderWidth: 1, borderColor: colors.outline },
            pressed && styles.pressedShift,
            style,
          ]}
          {...pressHandlers}
          testID={testID}
        >
          {children}
        </Pressable>
      </Cast>
    );
  }

  return (
    <Surface cast={elevation} outlined={outlined} radius={radius} style={[styles.card, style]} testID={testID}>
      {children}
    </Surface>
  );
});

export interface CardCoverProps {
  /** Image source, rendered edge-to-edge at the top of the card. */
  source: ImageProps['source'];
  /** Cover height in pixels. Defaults to `160`. */
  height?: number;
  style?: StyleProp<ImageStyle>;
  testID?: string;
}

/** A full-bleed image at the top of a `Card`, ruled off by a 1px hairline. */
export const CardCover = memo(function CardCover({ source, height = 160, style, testID }: CardCoverProps) {
  const { colors } = useTheme();

  return (
    <Image
      source={source}
      resizeMode="cover"
      style={[styles.cover, { height, borderBottomWidth: 1, borderBottomColor: colors.outline }, style]}
      testID={testID}
    />
  );
});

export interface CardTitleProps {
  /** Title line. */
  title: string;
  /** Optional secondary line under the title. */
  subtitle?: string;
  /** Leading content — avatar, icon, anything. */
  leading?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Title (and optional subtitle) block for a `Card`, with optional leading
 * content. The title is set in the display voice (Fraunces 600 15) and the
 * ribbon is separated from the body by a 1px hairline. For a mono metadata tag
 * above the title, compose a `Text variant="overline"` before this block.
 */
export const CardTitle = memo(function CardTitle({ title, subtitle, leading, style, testID }: CardTitleProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      testID={testID}
      style={[styles.titleRow, { padding: spacing[4], gap: spacing[3], borderBottomColor: colors.outline }, style]}
    >
      {leading}
      <View style={styles.titleColumn}>
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

export interface CardContentProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** The padded body of a `Card`; children render as-is. */
export const CardContent = memo(function CardContent({ children, style, testID }: CardContentProps) {
  const { spacing } = useTheme();

  return (
    <View testID={testID} style={[{ padding: spacing[4] }, style]}>
      {children}
    </View>
  );
});

export interface CardActionsProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/** Right-aligned action row for a `Card`; sits directly under `CardContent`. */
export const CardActions = memo(function CardActions({ children, style, testID }: CardActionsProps) {
  const { spacing } = useTheme();

  return (
    <View
      testID={testID}
      style={[
        styles.actions,
        { gap: spacing[2], paddingHorizontal: spacing[4], paddingBottom: spacing[4] },
        style,
      ]}
    >
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  cover: {
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  titleColumn: {
    flex: 1,
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pressedShift: {
    transform: [{ translateY: 1 }],
  },
});
