/**
 * MeowUI Avatar Component
 * User avatar with gradient border ring
 */

import React from 'react';
import { View, Image, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '../../theme';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  source?: { uri: string };
  name?: string;
  size?: AvatarSize;
  gradientBorder?: boolean;
  gradientColors?: string[];
  borderWidth?: number;
  style?: StyleProp<ViewStyle>;
}

// Get initials from name
const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

// Generate color from name
const getColorFromName = (name: string): string => {
  const colors = [
    '#8B5CF6', '#EC4899', '#F97316', '#FBBF24',
    '#10B981', '#3B82F6', '#06B6D4', '#EF4444',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'md',
  gradientBorder = false,
  gradientColors,
  borderWidth = 3,
  style,
}) => {
  const { theme } = useTheme();
  
  const avatarSize = theme.componentSizes.avatar[size];
  const fontSize = avatarSize * 0.4;
  
  const avatarContent = source ? (
    <Image
      source={source}
      style={[
        styles.image,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
        },
      ]}
    />
  ) : (
    <View
      style={[
        styles.textContainer,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor: name ? getColorFromName(name) : theme.colors.primary,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize, color: '#FFFFFF' }]}>
        {name ? getInitials(name) : '?'}
      </Text>
    </View>
  );
  
  if (gradientBorder) {
    const colors = gradientColors || theme.gradients.primary;
    const outerSize = avatarSize + borderWidth * 2;
    
    return (
      <View
        style={[
          {
            width: outerSize,
            height: outerSize,
            borderRadius: outerSize / 2,
            padding: borderWidth,
            backgroundColor: theme.colors.surface,
            borderWidth: 2,
            borderColor: theme.colors.primary,
          },
          style,
        ]}
      >
        {avatarContent}
      </View>
    );
  }
  
  return <View style={style}>{avatarContent}</View>;
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});

export default Avatar;
