"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pillars } from "@/lib/content/pillars";

const SHORT: Record<string, string> = {
  keep: "Keep",
  connect: "Connect",
  automate: "Automate",
  build: "Build",
  secure: "Secure",
};

/**
 * Progressive-disclosure view of the five solution lanes: tabs across the top,
 * one approach shown at a time — instead of five long stacked descriptions.
 */
export function SolutionTabs() {
  const [active, setActive] = useState(0);
  const p = pillars[active];
  const Icon = p.icon;

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Solution approaches"
        className="flex flex-wrap gap-2 sm:gap-3"
      >
        {pillars.map((pillar, i) => {
          const TabIcon = pillar.icon;
          const on = i === active;
          return (
            <button
              key={pillar.slug}
              role="tab"
              aria-selected={on}
              type="button"
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                on
                  ? "border-cyan-core/70 bg-cyan-faint text-warm-white"
                  : "border-edge bg-graphite/50 text-warm-mist hover:border-cyan-core/50 hover:text-warm-white"
              }`}
            >
              <TabIcon className={`h-4 w-4 ${on ? "text-cyan-core" : "text-warm-dim"}`} aria-hidden />
              {SHORT[pillar.slug] ?? pillar.title}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="surface grid grid-cols-1 gap-8 rounded-[2rem] p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cyan-faint p-2.5">
                    <Icon className="h-5 w-5 text-cyan-core" aria-hidden />
                  </span>
                  <p className="text-xs tracking-[0.16em] text-gold-soft uppercase">
                    {p.promiseLine}
                  </p>
                </div>
                <h2 className="display mt-5 text-2xl text-warm-white sm:text-3xl">{p.title}</h2>
                <p className="mt-4 leading-relaxed text-warm-mist">{p.detail}</p>
              </div>
              <div className="surface-quiet blob-c h-full rounded-2xl p-6">
                <h3 className="text-xs font-semibold tracking-[0.18em] text-warm-dim uppercase">
                  Typical work in this lane
                </h3>
                <ul className="mt-4 space-y-3">
                  {p.examples.map((ex) => (
                    <li key={ex} className="flex gap-3 text-sm leading-relaxed text-warm-mist">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core"
                      />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
