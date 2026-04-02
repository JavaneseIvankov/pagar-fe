export const MOTION_DURATIONS = {
  fast: 0.14,
  base: 0.18,
  slow: 0.24,
} as const;

export const MOTION_EASINGS = {
  easeOut: [0.23, 1, 0.32, 1] as const,
  easeInOut: [0.77, 0, 0.175, 1] as const,
} as const;

export const MOTION_TRANSFORMS = {
  liftY: 6,
  pressScale: 0.97,
} as const;

export const MOTION_TRANSITIONS = {
  fastOut: {
    duration: MOTION_DURATIONS.fast,
    ease: MOTION_EASINGS.easeOut,
  },
  baseOut: {
    duration: MOTION_DURATIONS.base,
    ease: MOTION_EASINGS.easeOut,
  },
  baseInOut: {
    duration: MOTION_DURATIONS.base,
    ease: MOTION_EASINGS.easeInOut,
  },
} as const;
