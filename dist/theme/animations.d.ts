/**
 * MeowUI Animation System
 * Smooth, fluid animations using react-native-reanimated
 */
export declare const durations: {
    readonly instant: 0;
    readonly fast: 150;
    readonly normal: 250;
    readonly slow: 400;
    readonly slower: 600;
};
export declare const springs: {
    readonly snappy: {
        readonly damping: 15;
        readonly stiffness: 400;
        readonly mass: 0.8;
    };
    readonly smooth: {
        readonly damping: 20;
        readonly stiffness: 200;
        readonly mass: 1;
    };
    readonly bouncy: {
        readonly damping: 10;
        readonly stiffness: 300;
        readonly mass: 0.8;
    };
    readonly playful: {
        readonly damping: 8;
        readonly stiffness: 400;
        readonly mass: 0.6;
    };
    readonly stiff: {
        readonly damping: 25;
        readonly stiffness: 500;
        readonly mass: 1;
    };
    readonly soft: {
        readonly damping: 30;
        readonly stiffness: 100;
        readonly mass: 1.2;
    };
};
export declare const easings: {
    readonly linear: (t: number) => number;
    readonly easeIn: (t: number) => number;
    readonly easeOut: import("react-native-reanimated").EasingFunction;
    readonly easeInOut: import("react-native-reanimated").EasingFunction;
    readonly accelerate: import("react-native-reanimated").EasingFunctionFactory;
    readonly decelerate: import("react-native-reanimated").EasingFunctionFactory;
    readonly standard: import("react-native-reanimated").EasingFunctionFactory;
    readonly overshoot: import("react-native-reanimated").EasingFunctionFactory;
    readonly anticipate: import("react-native-reanimated").EasingFunctionFactory;
};
export declare const timings: {
    readonly fast: {
        readonly duration: 150;
        readonly easing: import("react-native-reanimated").EasingFunctionFactory;
    };
    readonly normal: {
        readonly duration: 250;
        readonly easing: import("react-native-reanimated").EasingFunctionFactory;
    };
    readonly slow: {
        readonly duration: 400;
        readonly easing: import("react-native-reanimated").EasingFunctionFactory;
    };
    readonly entrance: {
        readonly duration: 250;
        readonly easing: import("react-native-reanimated").EasingFunctionFactory;
    };
    readonly exit: {
        readonly duration: 150;
        readonly easing: import("react-native-reanimated").EasingFunctionFactory;
    };
};
export declare const pressAnimation: {
    scale: number;
    opacity: number;
    spring: {
        readonly damping: 15;
        readonly stiffness: 400;
        readonly mass: 0.8;
    };
};
export declare const overlayAnimation: {
    backdrop: {
        enter: {
            readonly duration: 250;
            readonly easing: import("react-native-reanimated").EasingFunctionFactory;
        };
        exit: {
            readonly duration: 150;
            readonly easing: import("react-native-reanimated").EasingFunctionFactory;
        };
    };
    content: {
        spring: {
            readonly damping: 20;
            readonly stiffness: 200;
            readonly mass: 1;
        };
    };
};
export declare const keyframes: {
    fadeIn: {
        from: {
            opacity: number;
        };
        to: {
            opacity: number;
        };
    };
    fadeOut: {
        from: {
            opacity: number;
        };
        to: {
            opacity: number;
        };
    };
    scaleIn: {
        from: {
            transform: {
                scale: number;
            }[];
            opacity: number;
        };
        to: {
            transform: {
                scale: number;
            }[];
            opacity: number;
        };
    };
    scaleOut: {
        from: {
            transform: {
                scale: number;
            }[];
            opacity: number;
        };
        to: {
            transform: {
                scale: number;
            }[];
            opacity: number;
        };
    };
    slideInUp: {
        from: {
            transform: {
                translateY: number;
            }[];
            opacity: number;
        };
        to: {
            transform: {
                translateY: number;
            }[];
            opacity: number;
        };
    };
    slideInDown: {
        from: {
            transform: {
                translateY: number;
            }[];
            opacity: number;
        };
        to: {
            transform: {
                translateY: number;
            }[];
            opacity: number;
        };
    };
    slideOutDown: {
        from: {
            transform: {
                translateY: number;
            }[];
            opacity: number;
        };
        to: {
            transform: {
                translateY: number;
            }[];
            opacity: number;
        };
    };
    pulse: {
        0: {
            transform: {
                scale: number;
            }[];
        };
        50: {
            transform: {
                scale: number;
            }[];
        };
        100: {
            transform: {
                scale: number;
            }[];
        };
    };
    shake: {
        0: {
            transform: {
                translateX: number;
            }[];
        };
        25: {
            transform: {
                translateX: number;
            }[];
        };
        50: {
            transform: {
                translateX: number;
            }[];
        };
        75: {
            transform: {
                translateX: number;
            }[];
        };
        100: {
            transform: {
                translateX: number;
            }[];
        };
    };
};
export type SpringName = keyof typeof springs;
export type EasingName = keyof typeof easings;
export type TimingName = keyof typeof timings;
declare const _default: {
    durations: {
        readonly instant: 0;
        readonly fast: 150;
        readonly normal: 250;
        readonly slow: 400;
        readonly slower: 600;
    };
    springs: {
        readonly snappy: {
            readonly damping: 15;
            readonly stiffness: 400;
            readonly mass: 0.8;
        };
        readonly smooth: {
            readonly damping: 20;
            readonly stiffness: 200;
            readonly mass: 1;
        };
        readonly bouncy: {
            readonly damping: 10;
            readonly stiffness: 300;
            readonly mass: 0.8;
        };
        readonly playful: {
            readonly damping: 8;
            readonly stiffness: 400;
            readonly mass: 0.6;
        };
        readonly stiff: {
            readonly damping: 25;
            readonly stiffness: 500;
            readonly mass: 1;
        };
        readonly soft: {
            readonly damping: 30;
            readonly stiffness: 100;
            readonly mass: 1.2;
        };
    };
    easings: {
        readonly linear: (t: number) => number;
        readonly easeIn: (t: number) => number;
        readonly easeOut: import("react-native-reanimated").EasingFunction;
        readonly easeInOut: import("react-native-reanimated").EasingFunction;
        readonly accelerate: import("react-native-reanimated").EasingFunctionFactory;
        readonly decelerate: import("react-native-reanimated").EasingFunctionFactory;
        readonly standard: import("react-native-reanimated").EasingFunctionFactory;
        readonly overshoot: import("react-native-reanimated").EasingFunctionFactory;
        readonly anticipate: import("react-native-reanimated").EasingFunctionFactory;
    };
    timings: {
        readonly fast: {
            readonly duration: 150;
            readonly easing: import("react-native-reanimated").EasingFunctionFactory;
        };
        readonly normal: {
            readonly duration: 250;
            readonly easing: import("react-native-reanimated").EasingFunctionFactory;
        };
        readonly slow: {
            readonly duration: 400;
            readonly easing: import("react-native-reanimated").EasingFunctionFactory;
        };
        readonly entrance: {
            readonly duration: 250;
            readonly easing: import("react-native-reanimated").EasingFunctionFactory;
        };
        readonly exit: {
            readonly duration: 150;
            readonly easing: import("react-native-reanimated").EasingFunctionFactory;
        };
    };
    pressAnimation: {
        scale: number;
        opacity: number;
        spring: {
            readonly damping: 15;
            readonly stiffness: 400;
            readonly mass: 0.8;
        };
    };
    overlayAnimation: {
        backdrop: {
            enter: {
                readonly duration: 250;
                readonly easing: import("react-native-reanimated").EasingFunctionFactory;
            };
            exit: {
                readonly duration: 150;
                readonly easing: import("react-native-reanimated").EasingFunctionFactory;
            };
        };
        content: {
            spring: {
                readonly damping: 20;
                readonly stiffness: 200;
                readonly mass: 1;
            };
        };
    };
    keyframes: {
        fadeIn: {
            from: {
                opacity: number;
            };
            to: {
                opacity: number;
            };
        };
        fadeOut: {
            from: {
                opacity: number;
            };
            to: {
                opacity: number;
            };
        };
        scaleIn: {
            from: {
                transform: {
                    scale: number;
                }[];
                opacity: number;
            };
            to: {
                transform: {
                    scale: number;
                }[];
                opacity: number;
            };
        };
        scaleOut: {
            from: {
                transform: {
                    scale: number;
                }[];
                opacity: number;
            };
            to: {
                transform: {
                    scale: number;
                }[];
                opacity: number;
            };
        };
        slideInUp: {
            from: {
                transform: {
                    translateY: number;
                }[];
                opacity: number;
            };
            to: {
                transform: {
                    translateY: number;
                }[];
                opacity: number;
            };
        };
        slideInDown: {
            from: {
                transform: {
                    translateY: number;
                }[];
                opacity: number;
            };
            to: {
                transform: {
                    translateY: number;
                }[];
                opacity: number;
            };
        };
        slideOutDown: {
            from: {
                transform: {
                    translateY: number;
                }[];
                opacity: number;
            };
            to: {
                transform: {
                    translateY: number;
                }[];
                opacity: number;
            };
        };
        pulse: {
            0: {
                transform: {
                    scale: number;
                }[];
            };
            50: {
                transform: {
                    scale: number;
                }[];
            };
            100: {
                transform: {
                    scale: number;
                }[];
            };
        };
        shake: {
            0: {
                transform: {
                    translateX: number;
                }[];
            };
            25: {
                transform: {
                    translateX: number;
                }[];
            };
            50: {
                transform: {
                    translateX: number;
                }[];
            };
            75: {
                transform: {
                    translateX: number;
                }[];
            };
            100: {
                transform: {
                    translateX: number;
                }[];
            };
        };
    };
};
export default _default;
