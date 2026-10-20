/**
 * Shared easing curves. Theme-independent by design — apps theme durations,
 * not curves, so overlays stay consistent across the kit.
 */

/** Standard decelerating curve for entrances and moves. */
export const easingStandard = [0.2, 0, 0, 1] as const;

/** Slightly sharper exit curve. */
export const easingExit = [0.4, 0, 1, 1] as const;
