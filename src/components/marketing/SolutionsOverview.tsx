import { commercialSolutions } from "@/lib/content/commercial";
import { Reveal } from "@/components/motion/Reveal";
import { Surface } from "@/components/ui/Surface";

export function SolutionsOverview() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-12" aria-labelledby="solutions-heading">
      <h2 id="solutions-heading" className="display text-2xl text-warm-white sm:text-3xl">What we could build together</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-warm-mist">
        Examples of work we can scope around your business—not a catalog of off-the-shelf products. Discovery confirms what is useful and feasible.
      </p>
      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {commercialSolutions.map((solution, i) => {
          const Icon = solution.icon;
          return (
            <Reveal key={solution.slug}>
              <section id={solution.slug} className="h-full scroll-mt-28">
                <Surface quiet blob={(["a", "b", "c", "a"] as const)[i]} className="h-full p-7">
                  <Icon className="h-6 w-6 text-cyan-core" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-warm-white">{solution.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-warm-mist">{solution.cardLine}</p>
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
