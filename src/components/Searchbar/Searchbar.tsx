/**
 * MeowUI Searchbar Component
 * High-contrast search input with thick borders and hard shadows
 */

import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextInputProps,
  Text,
} from 'react-native';
import { useTheme } from '../../theme';

export interface SearchbarProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  onIconPress?: () => void;
  onClearIconPress?: () => void;
  placeholder?: string;
  icon?: any; // name of icon
  clearIcon?: any;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

export const Searchbar: React.FC<SearchbarProps> = ({
  value,
  onChangeText,
  onIconPress,
  onClearIconPress,
  placeholder = 'Search...',
  icon = 'search',
  clearIcon = 'close-circle',
  loading = false,
  style,
  inputStyle,
  ...rest
}) => {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const handleClear = () => {
    onChangeText('');
    onClearIconPress?.();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: isFocused ? theme.colors.primary : theme.colors.outline,
          borderRadius: theme.borderRadius.full,
          borderWidth: 2,
          // MeowUI Hard Shadow
          shadowColor: '#000',
          shadowOffset: { width: 4, height: 4 }, // Hard offset
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 4,
        },
        style,
      ]}
    >
      <Pressable 
        onPress={onIconPress || (() => inputRef.current?.focus())}
        style={styles.iconButton}
      >
         <Text style={{ fontSize: 20, fontWeight: '900' }}>🔍</Text>
      </Pressable>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.onSurfaceVariant}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          styles.input,
          {
            color: theme.colors.onSurface,
            ...theme.typography.bodyLarge,
          },
          inputStyle,
        ]}
        {...rest}
      />

      {value ? (
        <Pressable onPress={handleClear} style={styles.iconButton}>
           <Text style={{ fontSize: 20, fontWeight: '900' }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56, // Tall search bar
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    fontWeight: '600',
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Searchbar;
