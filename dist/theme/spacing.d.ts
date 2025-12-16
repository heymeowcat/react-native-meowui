/**
 * MeowUI Spacing System
 * Consistent spacing scale for layouts
 */
export declare const spacing: {
    readonly 0: 0;
    readonly 0.5: number;
    readonly 1: 4;
    readonly 1.5: number;
    readonly 2: number;
    readonly 2.5: number;
    readonly 3: number;
    readonly 3.5: number;
    readonly 4: number;
    readonly 5: number;
    readonly 6: number;
    readonly 7: number;
    readonly 8: number;
    readonly 9: number;
    readonly 10: number;
    readonly 11: number;
    readonly 12: number;
    readonly 14: number;
    readonly 16: number;
    readonly 20: number;
    readonly 24: number;
    readonly 28: number;
    readonly 32: number;
};
export type SpacingKey = keyof typeof spacing;
export declare const borderRadius: {
    readonly none: 0;
    readonly xs: 4;
    readonly sm: 8;
    readonly md: 12;
    readonly lg: 16;
    readonly xl: 24;
    readonly '2xl': 32;
    readonly '3xl': 40;
    readonly full: 9999;
};
export type BorderRadiusKey = keyof typeof borderRadius;
export declare const elevation: {
    readonly 0: {
        readonly shadowColor: "#000000";
        readonly shadowOffset: {
            readonly width: 0;
            readonly height: 0;
        };
        readonly shadowOpacity: 0;
        readonly shadowRadius: 0;
        readonly elevation: 0;
    };
    readonly 1: {
        readonly shadowColor: "#000000";
        readonly shadowOffset: {
            readonly width: 2;
            readonly height: 2;
        };
        readonly shadowOpacity: 1;
        readonly shadowRadius: 0;
        readonly elevation: 2;
    };
    readonly 2: {
        readonly shadowColor: "#000000";
        readonly shadowOffset: {
            readonly width: 4;
            readonly height: 4;
        };
        readonly shadowOpacity: 1;
        readonly shadowRadius: 0;
        readonly elevation: 4;
    };
    readonly 3: {
        readonly shadowColor: "#000000";
        readonly shadowOffset: {
            readonly width: 6;
            readonly height: 6;
        };
        readonly shadowOpacity: 1;
        readonly shadowRadius: 0;
        readonly elevation: 6;
    };
    readonly 4: {
        readonly shadowColor: "#000000";
        readonly shadowOffset: {
            readonly width: 8;
            readonly height: 8;
        };
        readonly shadowOpacity: 1;
        readonly shadowRadius: 0;
        readonly elevation: 8;
    };
    readonly 5: {
        readonly shadowColor: "#000000";
        readonly shadowOffset: {
            readonly width: 12;
            readonly height: 12;
        };
        readonly shadowOpacity: 1;
        readonly shadowRadius: 0;
        readonly elevation: 12;
    };
};
export type ElevationLevel = keyof typeof elevation;
export declare const componentSizes: {
    readonly button: {
        readonly small: {
            readonly height: 32;
            readonly paddingHorizontal: 12;
        };
        readonly medium: {
            readonly height: 44;
            readonly paddingHorizontal: 16;
        };
        readonly large: {
            readonly height: 56;
            readonly paddingHorizontal: 24;
        };
    };
    readonly input: {
        readonly small: {
            readonly height: 36;
        };
        readonly medium: {
            readonly height: 48;
        };
        readonly large: {
            readonly height: 56;
        };
    };
    readonly avatar: {
        readonly xs: 24;
        readonly sm: 32;
        readonly md: 40;
        readonly lg: 56;
        readonly xl: 72;
    };
    readonly iconButton: {
        readonly small: 32;
        readonly medium: 40;
        readonly large: 48;
    };
    readonly chip: {
        readonly height: 32;
    };
    readonly fab: {
        readonly small: 40;
        readonly medium: 56;
        readonly large: 96;
    };
};
declare const _default: {
    spacing: {
        readonly 0: 0;
        readonly 0.5: number;
        readonly 1: 4;
        readonly 1.5: number;
        readonly 2: number;
        readonly 2.5: number;
        readonly 3: number;
        readonly 3.5: number;
        readonly 4: number;
        readonly 5: number;
        readonly 6: number;
        readonly 7: number;
        readonly 8: number;
        readonly 9: number;
        readonly 10: number;
        readonly 11: number;
        readonly 12: number;
        readonly 14: number;
        readonly 16: number;
        readonly 20: number;
        readonly 24: number;
        readonly 28: number;
        readonly 32: number;
    };
    borderRadius: {
        readonly none: 0;
        readonly xs: 4;
        readonly sm: 8;
        readonly md: 12;
        readonly lg: 16;
        readonly xl: 24;
        readonly '2xl': 32;
        readonly '3xl': 40;
        readonly full: 9999;
    };
    elevation: {
        readonly 0: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 0;
            };
            readonly shadowOpacity: 0;
            readonly shadowRadius: 0;
            readonly elevation: 0;
        };
        readonly 1: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 2;
                readonly height: 2;
            };
            readonly shadowOpacity: 1;
            readonly shadowRadius: 0;
            readonly elevation: 2;
        };
        readonly 2: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 4;
                readonly height: 4;
            };
            readonly shadowOpacity: 1;
            readonly shadowRadius: 0;
            readonly elevation: 4;
        };
        readonly 3: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 6;
                readonly height: 6;
            };
            readonly shadowOpacity: 1;
            readonly shadowRadius: 0;
            readonly elevation: 6;
        };
        readonly 4: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 8;
                readonly height: 8;
            };
            readonly shadowOpacity: 1;
            readonly shadowRadius: 0;
            readonly elevation: 8;
        };
        readonly 5: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 12;
                readonly height: 12;
            };
            readonly shadowOpacity: 1;
            readonly shadowRadius: 0;
            readonly elevation: 12;
        };
    };
    componentSizes: {
        readonly button: {
            readonly small: {
                readonly height: 32;
                readonly paddingHorizontal: 12;
            };
            readonly medium: {
                readonly height: 44;
                readonly paddingHorizontal: 16;
            };
            readonly large: {
                readonly height: 56;
                readonly paddingHorizontal: 24;
            };
        };
        readonly input: {
            readonly small: {
                readonly height: 36;
            };
            readonly medium: {
                readonly height: 48;
            };
            readonly large: {
                readonly height: 56;
            };
        };
        readonly avatar: {
            readonly xs: 24;
            readonly sm: 32;
            readonly md: 40;
            readonly lg: 56;
            readonly xl: 72;
        };
        readonly iconButton: {
            readonly small: 32;
            readonly medium: 40;
            readonly large: 48;
        };
        readonly chip: {
            readonly height: 32;
        };
        readonly fab: {
            readonly small: 40;
            readonly medium: 56;
            readonly large: 96;
        };
    };
};
export default _default;
