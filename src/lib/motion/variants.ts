import type { Variants } from "motion/react";
import { MOTION_DURATIONS, MOTION_EASINGS, MOTION_TRANSFORMS } from "./tokens";

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TRANSFORMS.liftY,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.base,
      ease: MOTION_EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -MOTION_TRANSFORMS.liftY,
    transition: {
      duration: MOTION_DURATIONS.fast,
      ease: MOTION_EASINGS.easeOut,
    },
  },
};

export const crossfadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.base,
      ease: MOTION_EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: MOTION_DURATIONS.fast,
      ease: MOTION_EASINGS.easeOut,
    },
  },
};
