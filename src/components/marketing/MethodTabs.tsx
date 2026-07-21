"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { methodStages } from "@/lib/content/method";

/**
 * Progressive-disclosure view of the five method stages: tabs across the top,
 * one stage shown at a time — instead of five long stacked cards.
 */
export function MethodTabs() {
  const [active, setActive] = useState(0);
  const s = methodStages[active];

  return (
    <div>
      <div role="tablist" aria-label="Method stages" className="flex flex-wrap gap-2 sm:gap-3">
        {methodStages.map((stage, i) => {
          const on = i === active;
          return (
            <button
              key={stage.number}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                on
                  ? "border-gold-core/60 bg-gold-core/10 text-warm-white"
                  : "border-edge bg-graphite/50 text-warm-mist hover:border-gold-core/50 hover:text-warm-white"
              }`}
            >
              <span className={`text-xs font-semibold ${on ? "text-gold-soft" : "text-warm-dim"}`}>
                {stage.number}
              </span>
              {stage.name}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="surface rounded-[2rem] p-8 sm:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="display text-2xl text-warm-white sm:text-3xl">
                  <span className="text-gold-soft">{s.number} · </span>
                  {s.name}
                </h2>
                <p className="text-xs tracking-[0.14em] text-cyan-soft uppercase">{s.duration}</p>
              </div>
              <p className="mt-4 leading-relaxed text-warm-mist">{s.summary}</p>
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {s.activities.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-edge/50 pt-4 text-sm text-warm-dim">
                <span className="font-semibold text-gold-soft">You receive: </span>
                {s.deliverable}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
