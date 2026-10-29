import { memo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme, type Tone } from '../../theme';
import { Text } from '../Text/Text';

type SoftTokens = { bg: string; text: string; border: string; dot: string };

/** Soft semantic badge pairs — tinted well, tinted border, deep label. */
const SOFT: Record<Tone, SoftTokens> = {
  neutral: { bg: 'surfaceMuted', text: 'onSurfaceMuted', border: 'outline', dot: 'onSurfaceMuted' },
  primary: { bg: 'primaryMuted', text: 'onPrimaryMuted', border: 'primaryOutline', dot: 'primary' },
  success: { bg: 'successMuted', text: 'onSuccessMuted', border: 'successOutline', dot: 'success' },
  warning: { bg: 'warningMuted', text: 'onWarningMuted', border: 'warningOutline', dot: 'warning' },
  error: { bg: 'errorMuted', text: 'onErrorMuted', border: 'errorOutline', dot: 'error' },
  info: { bg: 'infoMuted', text: 'onInfoMuted', border: 'infoOutline', dot: 'info' },
};

export interface BadgeProps {
  /** Label; omit for the bare status pip. */
  content?: string | number;
  tone?: Tone;
  /** Prefix the label with the status pip (6px, tone-colored). */
  dot?: boolean;
  /** Show numeric zero. Defaults to `false`. */
  showZero?: boolean;
  /** Clamp numeric counts with a trailing `+`. Defaults to `99`. */
  max?: number;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A semantic status badge: a soft tinted pill, 1px tone-tinted border and an
 * optional 6px status pip. Badges are the only wholly circular shapes.
 */
export const Badge = memo(function Badge({
  content,
  tone = 'neutral',
  dot = true,
  showZero = false,
  max = 99,
  size = 'md',
  style,
  testID,
}: BadgeProps) {
  const { colors } = useTheme();
  const tokens = SOFT[tone];

  const isCount = typeof content === 'number';
  const showCount = content !== undefined && (!isCount || content !== 0 || showZero);
  const label = isCount ? (content > max ? `${max}+` : `${content}`) : content;

  const fill = colors[tokens.bg as keyof typeof colors];
  const text = colors[tokens.text as keyof typeof colors];
  const border = colors[tokens.border as keyof typeof colors];
  const pip = colors[tokens.dot as keyof typeof colors];

  if (isCount && content === 0 && !showZero) return null;

  if (content === undefined) {
    return (
      <View
        style={[
          styles.pipOnly,
          { backgroundColor: pip, width: size === 'sm' ? 6 : 8, height: size === 'sm' ? 6 : 8 },
          style,
        ]}
        testID={testID}
      />
    );
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: fill,
          borderColor: border,
          minHeight: size === 'sm' ? 22 : 26,
          paddingHorizontal: size === 'sm' ? 9 : 11,
          gap: 6,
        },
        style,
      ]}
      testID={testID}
    >
      {dot && <View style={[styles.dot, { backgroundColor: pip, width: 6, height: 6 }]} />}
      {showCount && (
        <Text weight="500" style={{ color: text, fontSize: 11, lineHeight: 14 }}>
          {label}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  pipOnly: {
    borderRadius: 9999,
  },
  dot: {
    borderRadius: 9999,
  },
});
