/**
 * MeowUI Text Component
 * Typography component with gradient text support
 */

import React, { memo } from 'react';
import {
  Text as RNText,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

import { useTheme } from '../../theme';
import type { TypographyVariant } from '../../theme';

export interface MeowTextProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: string;
  gradient?: boolean;
  gradientColors?: string[];
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

export const MeowText: React.FC<MeowTextProps> = ({
  children,
  variant = 'bodyMedium',
  color,
  gradient = false,
  gradientColors,
  align = 'left',
  numberOfLines,
  style,
}) => {
  const { theme } = useTheme();
  
  // Get typography style
  const typographyOverride = theme.components?.text?.variants?.[variant];
  const typographyStyle = { ...theme.typography[variant], ...(typographyOverride as TextStyle) };
  
  // Get text color
  const textColor = color || theme.components?.text?.defaultColor || theme.colors.onBackground;
  
  // Combined style
  const combinedStyle: TextStyle = {
    ...typographyStyle,
    color: textColor,
    textAlign: align,
  };
  
  // Gradient text
  if (gradient || gradientColors) {
    const colors = gradientColors || theme.gradients.primary;
    
    return (
      <MaskedView
        maskElement={
          <RNText
            style={[combinedStyle, styles.gradientMask, style]}
            numberOfLines={numberOfLines}
          >
            {children}
          </RNText>
        }
      >
        <RNText
          style={[
            combinedStyle, // Apply typography and alignment
            style, // Apply prop style
            { color: theme.colors.primary }, // Fallback to primary color
          ]}
          numberOfLines={numberOfLines}
        >
          {children}
        </RNText>
      </MaskedView>
    );
  }
  
  return (
    <RNText
      style={[combinedStyle, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

// Convenience components
export const DisplayLarge: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="displayLarge" {...props} />
);

export const DisplayMedium: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="displayMedium" {...props} />
);

export const DisplaySmall: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="displaySmall" {...props} />
);

export const HeadlineLarge: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="headlineLarge" {...props} />
);

export const HeadlineMedium: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="headlineMedium" {...props} />
);

export const HeadlineSmall: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="headlineSmall" {...props} />
);

export const TitleLarge: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="titleLarge" {...props} />
);

export const TitleMedium: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="titleMedium" {...props} />
);

export const TitleSmall: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="titleSmall" {...props} />
);

export const BodyLarge: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="bodyLarge" {...props} />
);

export const BodyMedium: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="bodyMedium" {...props} />
);

export const BodySmall: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="bodySmall" {...props} />
);

export const LabelLarge: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="labelLarge" {...props} />
);

export const LabelMedium: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="labelMedium" {...props} />
);

export const LabelSmall: React.FC<Omit<MeowTextProps, 'variant'>> = (props) => (
  <MeowText variant="labelSmall" {...props} />
);

const styles = StyleSheet.create({
  gradientMask: {
    backgroundColor: 'transparent',
  },
  invisible: {
    opacity: 0,
  },
});

export default memo(MeowText);
