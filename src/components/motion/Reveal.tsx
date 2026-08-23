"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-reveal primitive — and, above all, one that FAILS OPEN.
 *
 * The previous implementation drove this with framer-motion's
 * `initial="hidden" whileInView="visible"`. That renders `opacity: 0` into the
 * server HTML, which means the content is invisible to anyone whose JavaScript
 * has not run yet — no JS at all, a slow or failed hydration, a crawler, or a
 * full-page screenshot where the intersection observer never fires for
 * off-screen sections. Whole pages of real content silently disappeared.
 *
 * The rule now: markup is visible by default, and the hidden state is applied
 * only once JavaScript is actually running. Everything below is a progressive
 * enhancement over content that is already on the page.
 *
 *   - Server HTML carries no hidden styling at all.
 *   - `data-reveal-state="hidden"` is set from an effect, so it can only ever
 *     exist in a browser that ran the effect.
 *   - `prefers-reduced-motion: reduce` skips the hidden state entirely, and
 *     globals.css also force-shows every `[data-reveal]` under that query.
 *   - If the IntersectionObserver never fires, the element stays visible
 *     rather than staying hidden.
 *
 * Verified by src/test/reveal.test.tsx.
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
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: never hide, never animate.
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // No IntersectionObserver (old browser, some test environments)? Then the
    // content simply stays visible. Never hide what we cannot reveal.
    if (typeof IntersectionObserver !== "function") return;

    // Arm the hidden state. This is the only place it is ever applied, and it
    // runs in the browser only.
    el.dataset.revealState = "hidden";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.revealState = "shown";
          io.disconnect();
        }
      },
      // threshold 0 + a small bottom inset: fires as soon as any part of the
      // element enters, which is what keeps long pages and full-page captures
      // from leaving trailing sections stuck hidden.
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);

    // Belt and braces: if anything goes wrong and the observer has not fired
    // by the time the page has settled, show the content anyway.
    const failOpen = window.setTimeout(() => {
      if (el.dataset.revealState !== "shown") {
        el.dataset.revealState = "shown";
        io.disconnect();
      }
    }, 3000);

    return () => {
      window.clearTimeout(failOpen);
      io.disconnect();
    };
  }, []);

  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-duration": quick ? "0.35s" : "0.7s",
    "--reveal-rise": quick ? "12px" : "28px",
  } as CSSProperties;

  const common = {
    ref: ref as React.Ref<never>,
    className,
    "data-reveal": "",
    style,
  };

  if (as === "section") return <section {...common}>{children}</section>;
  if (as === "li") return <li {...common}>{children}</li>;
  if (as === "span") return <span {...common}>{children}</span>;
  return <div {...common}>{children}</div>;
}
