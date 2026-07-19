"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global motion configuration. `reducedMotion="user"` makes every
 * framer-motion animation respect the OS-level reduced-motion preference.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
