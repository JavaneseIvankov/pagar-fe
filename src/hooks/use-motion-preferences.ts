"use client";

import { useReducedMotion } from "motion/react";

export function useMotionPreferences() {
  const prefersReducedMotion = useReducedMotion();
  const isReducedMotion = Boolean(prefersReducedMotion);

  return {
    isReducedMotion,
    reducedMotionMode: isReducedMotion ? "always" : "never",
  } as const;
}
