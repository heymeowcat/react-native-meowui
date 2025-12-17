/**
 * MeowUI AlertDialog
 */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS, } from 'react-native-reanimated';
import { useTheme } from '../../theme';
import { Button } from '../Button/Button';
import { Portal } from '../Portal/Portal';
export const AlertDialog = ({ visible, onDismiss, title, content, children, actions = [], icon, }) => {
    const { theme } = useTheme();
    const [isRendered, setIsRendered] = useState(visible);
    const backdropOpacity = useSharedValue(0);
    const dialogScale = useSharedValue(0.85);
    const dialogOpacity = useSharedValue(0);
    const dialogTranslateY = useSharedValue(20);
    useEffect(() => {
        if (visible) {
            setIsRendered(true);
            backdropOpacity.value = withTiming(1, { duration: 200 });
            dialogScale.value = withSpring(1, { damping: 18, stiffness: 300 });
            dialogOpacity.value = withTiming(1, { duration: 200 });
            dialogTranslateY.value = withSpring(0, { damping: 18, stiffness: 300 });
        }
        else {
            backdropOpacity.value = withTiming(0, { duration: 150 });
            dialogScale.value = withTiming(0.9, { duration: 150 });
            dialogOpacity.value = withTiming(0, { duration: 150 }, () => {
                runOnJS(setIsRendered)(false);
            });
            dialogTranslateY.value = withTiming(10, { duration: 150 });
        }
    }, [visible]);
    const backdropStyle = useAnimatedStyle(() => ({
        opacity: backdropOpacity.value,
    }));
    const dialogStyle = useAnimatedStyle(() => ({
        opacity: dialogOpacity.value,
        transform: [
            { scale: dialogScale.value },
            { translateY: dialogTranslateY.value },
        ],
    }));
    if (!isRendered)
        return null;
    return (<Portal>
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss}/>
        </Animated.View>
        
        <Animated.View style={[
            styles.dialog,
            {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.xl,
                borderWidth: 2,
                borderColor: theme.colors.outline,
                ...theme.elevation[4],
            },
            dialogStyle,
        ]}>
          <View style={styles.header}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={[
            styles.title,
            {
                color: theme.colors.onSurface,
                ...theme.typography.headlineSmall,
            }
        ]}>
              {title}
            </Text>
          </View>
          
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {content && (<Text style={[
                styles.message,
                {
                    color: theme.colors.onSurfaceVariant,
                    ...theme.typography.bodyMedium,
                }
            ]}>
                {content}
              </Text>)}
            {children}
          </ScrollView>
          
          {actions.length > 0 && (<View style={[
                styles.actions,
                { borderTopColor: theme.colors.outlineVariant }
            ]}>
              {actions.map((action, index) => (<Button key={index} variant={action.variant === 'primary' ? 'filled' : action.variant === 'outline' ? 'outlined' : 'ghost'} onPress={action.onPress} style={styles.actionButton} enablePencilBurst={action.variant === 'primary'}>
                  {action.label}
                </Button>))}
            </View>)}
        </Animated.View>
      </View>
    </Portal>);
};
const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        zIndex: 1000,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    dialog: {
        width: '100%',
        maxWidth: 360,
        maxHeight: '80%',
        overflow: 'hidden',
    },
    header: {
        padding: 24,
        paddingBottom: 16,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 12,
    },
    title: {
        fontWeight: '700',
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: 24,
        marginBottom: 8,
    },
    message: {
        textAlign: 'center',
        lineHeight: 22,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        gap: 12,
        flexWrap: 'wrap',
    },
    actionButton: {
        minWidth: 100,
    }
});
export default AlertDialog;
