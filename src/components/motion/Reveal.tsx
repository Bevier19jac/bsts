"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.21, 0.65, 0.36, 1] },
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
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const Comp =
    as === "section"
      ? motion.section
      : as === "li"
        ? motion.li
        : as === "span"
          ? motion.span
          : motion.div;
  return (
    <Comp
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
    >
      {children}
    </Comp>
  );
}
