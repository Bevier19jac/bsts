"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.21, 0.65, 0.36, 1] },
  }),
};

/** Reduced motion: content appears instantly — no fade, no movement. */
const riseInstant: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

/** Fast entrance variant — used where content must be readable immediately
    (e.g. the Government hero). Smaller rise, ~half the duration. */
const riseQuick: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay, ease: [0.21, 0.65, 0.36, 1] },
  }),
};

/**
 * Scroll-reveal primitive. Fades and rises content into view once.
 * Reduced motion is handled globally by MotionProvider (opacity-only there).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  quick = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  /** Fast entrance for above-the-fold critical content. */
  quick?: boolean;
}) {
  const Comp =
    as === "section"
      ? motion.section
      : as === "li"
        ? motion.li
        : as === "span"
          ? motion.span
          : motion.div;
  const prefersReduced = useReducedMotion();
  return (
    <Comp
      className={className}
      variants={prefersReduced ? riseInstant : quick ? riseQuick : rise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
    >
      {children}
    </Comp>
  );
}
