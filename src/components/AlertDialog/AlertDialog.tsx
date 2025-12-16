/**
 * MeowUI AlertDialog Component
 * Modal alert with MeowUI styling
 */

import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../theme';
import { Button } from '../Button/Button';
import { Portal } from '../Portal/Portal';

export interface AlertDialogProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  content?: string;
  children?: React.ReactNode;
  actions?: {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // Based on Button variants
  }[];
  icon?: string; // Emoji or char
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  onDismiss,
  title,
  content,
  children,
  actions = [],
  icon = '⚠️',
}) => {
  const { theme } = useTheme();

  if (!visible) return null;

  return (
    <Portal>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onDismiss} />
        
        <View style={[
           styles.dialog,
           {
             backgroundColor: theme.colors.surface,
             borderRadius: theme.borderRadius.lg,
             borderWidth: 2,
             borderColor: theme.colors.outline,
             // Hard Shadow
             shadowColor: '#000',
             shadowOffset: { width: 4, height: 4 },
             shadowOpacity: 1,
             shadowRadius: 0,
             elevation: 5,
           }
        ]}>
          <View style={styles.header}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              {title}
            </Text>
          </View>
          
          <ScrollView style={styles.content}>
             {content && (
               <Text style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
                 {content}
               </Text>
             )}
             {children}
          </ScrollView>
          
          <View style={styles.actions}>
            {actions.map((action, index) => (
              <Button
                 key={index}
                 variant={action.variant === 'primary' ? 'filled' : 'outlined'} // Map variants roughly
                 onPress={action.onPress}
                 style={styles.actionButton}
              >
                {action.label}
              </Button>
            ))}
          </View>
        </View>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  dialog: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  header: {
    padding: 24,
    paddingBottom: 8,
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  content: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: '#00000010', // Slight separator
    gap: 12,
    flexWrap: 'wrap',
  },
  actionButton: {
    minWidth: 100,
  }
});

export default AlertDialog;
