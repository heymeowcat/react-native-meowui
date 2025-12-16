/**
 * MeowUI Combobox Component
 * Dropdown input selector with MeowUI styling
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
  Modal,
} from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Searchbar } from '../Searchbar/Searchbar';
import { Portal } from '../Portal/Portal';

export interface ComboboxItem {
  label: string;
  value: string;
}

export interface ComboboxProps {
  label?: string;
  value: string;
  items: ComboboxItem[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Combobox: React.FC<ComboboxProps> = ({
  label,
  value,
  items,
  onValueChange,
  placeholder = 'Select item...',
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = React.useRef<View>(null);

  const selectedItem = items.find(item => item.value === value);
  
  const filteredItems = items.filter(item => 
     item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (val: string) => {
    onValueChange(val);
    setModalVisible(false);
    setSearchQuery('');
  };

  const openDropdown = () => {
    if (disabled) return;
    
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setLayout({ x: pageX, y: pageY + height + 4, width, height });
      setModalVisible(true);
    });
  };

  return (
    <View style={style}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
          {label}
        </Text>
      )}
      
      <Pressable
        ref={triggerRef}
        onPress={openDropdown}
        style={({ pressed }) => [
          styles.trigger,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
            borderRadius: theme.borderRadius.full,
            borderWidth: 2,
            opacity: disabled ? 0.5 : 1,
            // Hard shadow
            shadowColor: '#000',
            shadowOffset: pressed ? { width: 0, height: 0 } : { width: 4, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 0,
            transform: [{ translateY: pressed ? 4 : 0 }, { translateX: pressed ? 4 : 0 }],
          }
        ]}
      >
        <Text style={[styles.valueText, { color: selectedItem ? theme.colors.onSurface : theme.colors.onSurfaceVariant }]}>
           {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: '900', color: theme.colors.onSurface }}>
          ▼
        </Text>
      </Pressable>

      {modalVisible && (
      <Portal>
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)} />
          
          <Animated.View 
             entering={FadeInUp.springify().damping(30).mass(0.8).stiffness(250)}
             exiting={FadeOutUp.duration(200)}
             style={[
             styles.dropdown,
             {
               top: layout.y,
               left: layout.x,
               width: layout.width,
               backgroundColor: theme.colors.surface,
               borderColor: theme.colors.outline,
               borderRadius: theme.borderRadius.md,
               borderWidth: 2,
               ...theme.elevation[4],
             }
          ]}>
             <View style={styles.header}>
               <Searchbar 
                  value={searchQuery} 
                  onChangeText={setSearchQuery} 
                  placeholder="Search..."
                  style={{ height: 40, borderWidth: 0, shadowOpacity: 0, elevation: 0 }} 
               />
             </View>
             
             <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
               {filteredItems.map((item) => (
                 <Pressable
                   key={item.value}
                   onPress={() => handleSelect(item.value)}
                   style={({ pressed }) => [
                     styles.item,
                     {
                       backgroundColor: 
                         item.value === value 
                           ? theme.colors.secondaryContainer 
                           : pressed ? theme.colors.surfaceVariant : 'transparent'
                     }
                   ]}
                 >
                   <Text style={[
                     styles.itemText,
                     {
                        color: theme.colors.onSurface,
                        fontWeight: item.value === value ? '700' : '400',
                     }
                   ]}>
                     {item.label}
                   </Text>
                   {item.value === value && (
                      <Text style={{ color: theme.colors.primary, fontWeight: '900' }}>✓</Text>
                   )}
                 </Pressable>
               ))}
               {filteredItems.length === 0 && (
                 <View style={styles.empty}>
                   <Text style={{ color: theme.colors.onSurfaceVariant }}>No items found</Text>
                 </View>
               )}
             </ScrollView>
          </Animated.View>
        </View>
      </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  dropdown: {
    position: 'absolute',
    maxHeight: 300,
    overflow: 'hidden',
    // Shadow is applied inline
  },
  header: {
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  empty: {
    padding: 20,
    alignItems: 'center',
  },
});

export default Combobox;
