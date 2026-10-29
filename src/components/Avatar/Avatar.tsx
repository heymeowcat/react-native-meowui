import { memo } from 'react';
import { Image, StyleSheet, View, type ImageProps, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Text } from '../Text/Text';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Box sizes — avatars and status pips are the kit's only circular shapes. */
const SIZE: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

export interface AvatarProps {
  /** Image source; when omitted the initials fallback renders. */
  src?: ImageProps['source'];
  /** Name for the initials fallback (first letters of the first two words). */
  label?: string;
  size?: AvatarSize | number;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * A circular identity seal: blueberry-toned ground, tinted border and Fraunces
 * initials. Pass `backgroundColor` / `textColor` for a different pairing.
 */
export const Avatar = memo(function Avatar({
  src,
  label,
  size = 'md',
  backgroundColor,
  textColor,
  style,
  testID,
}: AvatarProps) {
  const { colors } = useTheme();
  const box = typeof size === 'number' ? size : SIZE[size];

  const initials = (label ?? '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <View
      accessibilityRole={src ? 'image' : undefined}
      accessibilityLabel={src ? label : undefined}
      style={[
        styles.frame,
        {
          width: box,
          height: box,
          backgroundColor: backgroundColor ?? colors.primaryMuted,
          borderColor: colors.primaryOutline,
        },
        style,
      ]}
      testID={testID}
    >
      {src !== undefined ? (
        <Image source={src} style={styles.image} resizeMode="cover" />
      ) : (
        <Text
          variant="title"
          weight="600"
          style={[
            {
              color: textColor ?? colors.onPrimaryMuted,
              fontSize: Math.round(box * 0.38),
              lineHeight: Math.round(box * 0.44),
            },
          ]}
        >
          {initials}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  frame: {
    borderWidth: 1,
    borderRadius: 9999,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
