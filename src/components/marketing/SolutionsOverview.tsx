"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { commercialSolutions } from "@/lib/content/commercial";
import { Reveal } from "@/components/motion/Reveal";
import { Surface } from "@/components/ui/Surface";

export function SolutionsOverview() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-12" aria-labelledby="solutions-heading">
      <h2 id="solutions-heading" className="display text-2xl text-warm-white sm:text-3xl">What we could build together</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-warm-mist">
        Examples of work we can scope around your business—not a catalog of off-the-shelf products. Discovery confirms what is useful and feasible.
      </p>
      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {commercialSolutions.map((solution, i) => {
          const Icon = solution.icon;
          const isExpanded = expanded === solution.slug;
          const titleId = `${solution.slug}-title`;
          const detailsId = `${solution.slug}-details`;
          return (
            <Reveal key={solution.slug}>
              <section id={solution.slug} className="h-full scroll-mt-28">
                <Surface
                  quiet
                  blob={(["a", "b", "c", "a"] as const)[i]}
                  className="group relative h-full p-7 transition-colors hover:border-cyan-core/50 focus-within:border-cyan-core/70"
                >
                  <a
                    href={solution.href}
                    aria-labelledby={titleId}
                    className="absolute inset-0 z-0 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-core"
                  />
                  <Icon className="relative z-10 h-6 w-6 text-cyan-core" aria-hidden />
                  <h3 id={titleId} className="relative z-10 mt-4 text-lg font-semibold text-warm-white transition-colors group-hover:text-cyan-soft group-focus-within:text-cyan-soft">
                    {solution.title}
                  </h3>
                  <p className="relative z-10 mt-3 text-sm leading-relaxed text-warm-mist">{solution.cardLine}</p>
                  <p
                    id={detailsId}
                    hidden={!isExpanded}
                    className="relative z-10 mt-4 text-sm leading-relaxed text-warm-dim"
                  >
                    {solution.details}
                  </p>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    onClick={() => setExpanded(isExpanded ? null : solution.slug)}
                    className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full border border-edge/70 px-3.5 py-2 text-sm font-medium text-cyan-soft transition-colors hover:border-cyan-core/60 hover:bg-graphite-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-core"
                  >
                    {isExpanded ? "Hide details" : "Show details"}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform motion-reduce:transition-none ${isExpanded ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                </Surface>
              </section>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-7 max-w-3xl text-sm leading-relaxed text-warm-dim">
        Security architecture, AI governance, SOC 2 readiness, and government work remain available. The delivery stages below explain how the work is scoped, secured, and supported.
      </p>
    </section>
  );
}
