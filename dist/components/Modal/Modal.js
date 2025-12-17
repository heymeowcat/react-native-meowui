/**
 * MeowUI Modal Component
 * Animated modal dialog with blur backdrop
 */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Dimensions, } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS, } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../theme';
import { Portal } from '../Portal/Portal';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const Modal = ({ visible, onDismiss, children, dismissable = true, gradientBorder = false, gradientColors, blurBackdrop = true, style, contentStyle, }) => {
    const { theme } = useTheme();
    const backdropOpacity = useSharedValue(0);
    const contentScale = useSharedValue(0.9);
    const contentOpacity = useSharedValue(0);
    const [isRendered, setIsRendered] = useState(visible);
    useEffect(() => {
        if (visible) {
            setIsRendered(true);
            backdropOpacity.value = withTiming(1, theme.animations.timings.entrance);
            contentScale.value = withSpring(1, theme.animations.springs.smooth);
            contentOpacity.value = withTiming(1, theme.animations.timings.entrance);
        }
        else {
            backdropOpacity.value = withTiming(0, theme.animations.timings.exit);
            contentScale.value = withTiming(0.9, theme.animations.timings.exit);
            contentOpacity.value = withTiming(0, theme.animations.timings.exit, () => {
                runOnJS(setIsRendered)(false);
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
    if (!visible && !isRendered)
        return null;
    return (<Portal>
      <View style={[styles.container, style]} pointerEvents="box-none">
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          {blurBackdrop ? (<BlurView intensity={30} style={styles.blur}>
              <Pressable style={styles.backdropPress} onPress={handleBackdropPress}/>
            </BlurView>) : (<Pressable style={[styles.backdropPress, { backgroundColor: 'rgba(0,0,0,0.4)' }]} onPress={handleBackdropPress}/>)}
        </Animated.View>
        
        <View style={styles.contentContainer} pointerEvents="box-none">
          <Animated.View style={[
            styles.content,
            {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.xl,
                borderWidth: 2,
                borderColor: theme.colors.outline,
                ...theme.elevation[4],
            },
            gradientBorder && { borderWidth: 0 },
            contentStyle,
            contentAnimatedStyle
        ]}>
            {gradientBorder && (<View style={[
                StyleSheet.absoluteFill,
                {
                    borderRadius: theme.borderRadius.xl,
                    borderWidth: 4,
                    borderColor: theme.colors.primary,
                    zIndex: -1
                }
            ]}/>)}
            
            {children}
          </Animated.View>
        </View>
      </View>
    </Portal>);
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
    content: {
        overflow: 'hidden',
        padding: 24,
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
