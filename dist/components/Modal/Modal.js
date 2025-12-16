/**
 * MeowUI Modal Component
 * Animated modal dialog with blur backdrop
 */
import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, Dimensions, } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../theme';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const Modal = ({ visible, onDismiss, children, dismissable = true, gradientBorder = false, gradientColors, blurBackdrop = true, style, contentStyle, }) => {
    const { theme } = useTheme();
    const backdropOpacity = useSharedValue(0);
    const contentScale = useSharedValue(0.9);
    const contentOpacity = useSharedValue(0);
    const isRendered = useSharedValue(false);
    useEffect(() => {
        if (visible) {
            isRendered.value = true;
            backdropOpacity.value = withTiming(1, theme.animations.timings.entrance);
            contentScale.value = withSpring(1, theme.animations.springs.smooth);
            contentOpacity.value = withTiming(1, theme.animations.timings.entrance);
        }
        else {
            backdropOpacity.value = withTiming(0, theme.animations.timings.exit);
            contentScale.value = withTiming(0.9, theme.animations.timings.exit);
            contentOpacity.value = withTiming(0, theme.animations.timings.exit, () => {
                isRendered.value = false;
            });
        }
    }, [visible]);
    const backdropStyle = useAnimatedStyle(() => ({
        opacity: backdropOpacity.value,
    }));
    const contentAnimatedStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
        transform: [{ scale: contentScale.value }],
    }));
    const handleBackdropPress = () => {
        if (dismissable && onDismiss) {
            onDismiss();
        }
    };
    if (!visible)
        return null;
    return (<View style={[styles.container, style]}>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        {blurBackdrop ? (<BlurView intensity={30} style={styles.blur}>
            <Pressable style={styles.backdropPress} onPress={handleBackdropPress}/>
          </BlurView>) : (<Pressable style={[styles.backdropPress, { backgroundColor: theme.colors.scrim }]} onPress={handleBackdropPress}/>)}
      </Animated.View>
      
      <Animated.View style={[styles.contentContainer, contentAnimatedStyle]}>
        <View style={[
            styles.modal, // Renamed from styles.content to styles.modal for clarity based on instruction
            {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                borderWidth: 2,
                borderColor: theme.colors.outline,
                ...theme.elevation[4],
                shadowColor: '#000',
                padding: 24, // Restore standard padding
            },
            contentStyle,
        ]}>
          {children}
        </View>
      </Animated.View>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    backdropPress: {
        ...StyleSheet.absoluteFillObject,
    },
    modal: {
        overflow: 'hidden',
    },
    contentContainer: {
        width: '90%', 
        maxWidth: 500, 
        maxHeight: '80%',
    },
    gradientBorder: {
        padding: 2,
    },
});
export default Modal;
