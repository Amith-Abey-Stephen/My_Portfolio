"use client";

import { MotionConfig } from "framer-motion";

/**
 * Globally respects the user's reduced-motion preference (docs 03).
 * With `reducedMotion="user"`, transform/layout animations are disabled
 * when requested, while gentle opacity fades still play.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6 }}>
      {children}
    </MotionConfig>
  );
}
