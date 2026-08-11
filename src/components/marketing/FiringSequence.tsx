"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { brandSequence } from "@/lib/content/positioning";

/**
 * The BSTS mark, explained.
 *
 * A horizontal tracer rail carries four nodes: the physical firing sequence
 * above, what each stage means for an engagement below. The tank anchors the
 * left end of the rail — the round travels away from it toward the effect,
 * which is the point of the whole metaphor.
 *
 * The rail is decorative; every label is real text, so the section reads
 * identically to a screen reader and in print. Motion is CSS-only and
 * collapses under prefers-reduced-motion.
 */
export function FiringSequence() {
  const reduced = useReducedMotion();

  return (
    <section className="mt-16" aria-labelledby="firing-sequence-heading">
      <div className="text-center">
        <p className="eyebrow">{brandSequence.eyebrow}</p>
        <h2
          id="firing-sequence-heading"
          className="display mt-3 text-3xl text-warm-white sm:text-4xl"
        >
          {brandSequence.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-warm-mist">
          {brandSequence.lede}
        </p>
      </div>

      {/* The rail. Desktop only — on smaller widths the stages stack and the
          rail would be a horizontal line through nothing. */}
      <div className="relative mt-12 hidden lg:block" aria-hidden="true">
        {/* Geometry mirrors the hero lockup: the tank occupies the left end
            and the rail begins at the muzzle, which sits at ~87% of the
            image's width. h-32 → 224px wide → muzzle at ~12.25rem. */}
        <div className="relative h-32">
          <Image
            src="/abrams.webp"
            alt=""
            width={1280}
            height={731}
            className="absolute top-0 left-0 h-32 w-auto max-w-none"
            style={{
              maskImage:
                "radial-gradient(ellipse 90% 86% at 50% 50%, black 58%, transparent 98%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 86% at 50% 50%, black 58%, transparent 98%)",
            }}
          />
          {/* Tracer rail leaving the muzzle, carrying the four stage nodes */}
          <span
            className={`sequence-rail absolute top-[3.4rem] right-0 left-[12.25rem] ${
              reduced ? "sequence-rail-static" : ""
            }`}
          >
            {/* Tuned so each node falls inside the stage card beneath it —
                the rail starts at the muzzle, not at the container edge. */}
            <i className="sequence-node" style={{ left: "0%" }} />
            <i className="sequence-node" style={{ left: "34%" }} />
            <i className="sequence-node" style={{ left: "67%" }} />
            <i className="sequence-node sequence-node-impact" style={{ left: "97%" }} />
          </span>
        </div>
      </div>

      {/* Stages */}
      <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {brandSequence.stages.map((s, i) => (
          <Reveal as="li" key={s.physical} delay={staggerDelay(i)}>
            <div className="surface-quiet h-full rounded-[1.75rem] p-6">
              <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-gold-soft uppercase">
                {s.physical}
              </p>
              <p className="mt-2 text-base font-semibold tracking-[0.04em] text-warm-white">
                {s.meaning}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-warm-mist">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.1}>
        <p className="mt-8 text-center text-sm text-gold-soft">
          {brandSequence.closing}
        </p>
      </Reveal>
    </section>
  );
}
