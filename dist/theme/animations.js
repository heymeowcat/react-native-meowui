/**
 * MeowUI Animation System
 * Smooth, fluid animations using react-native-reanimated
 */
import { Easing } from 'react-native-reanimated';
// Duration presets (in milliseconds)
export const durations = {
    instant: 0,
    fast: 150,
    normal: 250,
    slow: 400,
    slower: 600,
};
// Spring configurations
export const springs = {
    // Snappy, responsive spring
    snappy: {
        damping: 15,
        stiffness: 400,
        mass: 0.8,
    },
    // Smooth, gentle spring
    smooth: {
        damping: 20,
        stiffness: 200,
        mass: 1,
    },
    // Bouncy spring with overshoot
    bouncy: {
        damping: 10,
        stiffness: 300,
        mass: 0.8,
    },
    // Very bouncy for playful effects
    playful: {
        damping: 8,
        stiffness: 400,
        mass: 0.6,
    },
    // Stiff, minimal movement
    stiff: {
        damping: 25,
        stiffness: 500,
        mass: 1,
    },
    // Soft, slow spring
    soft: {
        damping: 30,
        stiffness: 100,
        mass: 1.2,
    },
};
// Easing curves
export const easings = {
    linear: Easing.linear,
    easeIn: Easing.ease,
    easeOut: Easing.out(Easing.ease),
    easeInOut: Easing.inOut(Easing.ease),
    // Custom curves
    accelerate: Easing.bezier(0.4, 0, 1, 1),
    decelerate: Easing.bezier(0, 0, 0.2, 1),
    standard: Easing.bezier(0.4, 0, 0.2, 1),
    // Playful curves
    overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
    anticipate: Easing.bezier(0.36, 0, 0.66, -0.56),
};
// Timing configurations
export const timings = {
    fast: {
        duration: durations.fast,
        easing: easings.standard,
    },
    normal: {
        duration: durations.normal,
        easing: easings.standard,
    },
    slow: {
        duration: durations.slow,
        easing: easings.decelerate,
    },
    entrance: {
        duration: durations.normal,
        easing: easings.decelerate,
    },
    exit: {
        duration: durations.fast,
        easing: easings.accelerate,
    },
};
// Button press animation config
export const pressAnimation = {
    scale: 0.96,
    opacity: 0.85,
    spring: springs.snappy,
};
// Modal/Sheet animation config
export const overlayAnimation = {
    backdrop: {
        enter: timings.normal,
        exit: timings.fast,
    },
    content: {
        spring: springs.smooth,
    },
};
// Keyframe helpers
export const keyframes = {
    fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
    },
    scaleIn: {
        from: { transform: [{ scale: 0.9 }], opacity: 0 },
        to: { transform: [{ scale: 1 }], opacity: 1 },
    },
    scaleOut: {
        from: { transform: [{ scale: 1 }], opacity: 1 },
        to: { transform: [{ scale: 0.9 }], opacity: 0 },
    },
    slideInUp: {
        from: { transform: [{ translateY: 50 }], opacity: 0 },
        to: { transform: [{ translateY: 0 }], opacity: 1 },
    },
    slideInDown: {
        from: { transform: [{ translateY: -50 }], opacity: 0 },
        to: { transform: [{ translateY: 0 }], opacity: 1 },
    },
    slideOutDown: {
        from: { transform: [{ translateY: 0 }], opacity: 1 },
        to: { transform: [{ translateY: 50 }], opacity: 0 },
    },
    pulse: {
        0: { transform: [{ scale: 1 }] },
        50: { transform: [{ scale: 1.05 }] },
        100: { transform: [{ scale: 1 }] },
    },
    shake: {
        0: { transform: [{ translateX: 0 }] },
        25: { transform: [{ translateX: -5 }] },
        50: { transform: [{ translateX: 5 }] },
        75: { transform: [{ translateX: -5 }] },
        100: { transform: [{ translateX: 0 }] },
    },
};
export default {
    durations,
    springs,
    easings,
    timings,
    pressAnimation,
    overlayAnimation,
    keyframes,
};
