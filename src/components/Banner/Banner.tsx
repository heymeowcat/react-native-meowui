import { cloneElement, isValidElement, memo, type ReactElement, type ReactNode } from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme, type ThemeColors } from '../../theme';
import { Pressable } from '../Pressable/Pressable';
import { Surface } from '../Surface/Surface';
import { Text } from '../Text/Text';

export type BannerTone = 'neutral' | 'info' | 'warning' | 'error' | 'success';

export interface BannerAction {
  label: string;
  onPress: () => void;
}

/**
 * Soft tone pair per banner tone (as in `Badge`): tinted well, tinted border,
 * deep label. `neutral` stays paper — oat ground, warm border, muted ink.
 */
const TONE_TOKENS: Record<
  BannerTone,
  { ground: keyof ThemeColors; border: keyof ThemeColors; text: keyof ThemeColors; action: keyof ThemeColors }
> = {
  neutral: { ground: 'surfaceMuted', border: 'outline', text: 'onSurfaceMuted', action: 'onSurface' },
  info: { ground: 'infoMuted', border: 'infoOutline', text: 'onInfoMuted', action: 'info' },
  warning: { ground: 'warningMuted', border: 'warningOutline', text: 'onWarningMuted', action: 'warning' },
  error: { ground: 'errorMuted', border: 'errorOutline', text: 'onErrorMuted', action: 'error' },
  success: { ground: 'successMuted', border: 'successOutline', text: 'onSuccessMuted', action: 'success' },
};

export interface BannerProps {
  /** Renders nothing while false — visibility is fully consumer-controlled. */
  visible: boolean;
  /** Leading icon content; cloned with the tone color when it accepts one. */
  icon?: ReactNode;
  /** Message body. */
  text: string;
  tone?: BannerTone;
  /** Ghost text buttons rendered after the message. */
  actions?: BannerAction[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * An inline announcement strip for persistent, non-blocking messages — a
 * soft tone slip: tinted paper ground, 1px tone-tinted border, 12px radius,
 * DM Sans copy in the tone's deep ink. Renders nothing while `visible` is
 * false; dismissal is the consumer's job — wire it through an entry in
 * `actions` that flips `visible`.
 */
export const Banner = memo(function Banner({
  visible,
  icon,
  text,
  tone = 'neutral',
  actions,
  style,
  testID,
}: BannerProps) {
  const { colors, spacing } = useTheme();
  if (!visible) return null;

  const tokens = TONE_TOKENS[tone];
  const contentColor = colors[tokens.text];
  const actionColor = colors[tokens.action];
  const iconNode = isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ color?: string }>, { color: actionColor })
    : icon;

  return (
    <Surface
      radius="lg"
      backgroundColor={colors[tokens.ground]}
      borderColor={colors[tokens.border]}
      testID={testID}
      style={[{ padding: spacing[4] }, style]}
    >
      <View style={[styles.row, { gap: spacing[3] }]}>
        {iconNode}
        <Text variant="body" style={{ flex: 1, color: contentColor }}>
          {text}
        </Text>
        {actions != null && actions.length > 0 && (
          <View style={[styles.actions, { gap: spacing[1] }]}>
            {actions.map((action) => (
              <Pressable
                key={action.label}
                accessibilityRole="button"
                accessibilityLabel={action.label}
                onPress={action.onPress}
                tint={colors.surfaceActive}
                style={{ padding: spacing[2] }}
              >
                <Text weight="600" style={{ color: contentColor, fontSize: 12, lineHeight: 16 }}>
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </Surface>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
