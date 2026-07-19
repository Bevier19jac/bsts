"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle pointer-following light. Pure transform updates on rAF;
 * inert on touch devices and under reduced motion.
 */
export function PointerHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
          raf = 0;
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 h-[520px] w-[520px] rounded-full opacity-[0.07] blur-3xl"
      style={{
        background:
          "radial-gradient(closest-side, var(--color-cyan-core), transparent)",
        transform: "translate3d(-600px, -600px, 0)",
      }}
    />
  );
}
