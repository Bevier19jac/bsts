import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { articles } from "@/lib/content/articles";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Original writing from BSTS on technology transformation, responsible AI in hospitality, and honest security language — no vendor hype, no invented case studies.",
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function InsightsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
          <SectionHeading
            eyebrow="Insights"
            title="Thinking you can act on before you ever hire us."
            lede="We publish the same advice we give in engagements. If an article saves you from a bad platform migration or an overreaching AI purchase, it has done its job — whether or not we ever meet."
          />
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-20">
        <ul className="space-y-6">
          {articles.map((article, i) => (
            <Reveal as="li" key={article.slug} delay={staggerDelay(i)}>
              <Link
                href={`/insights/${article.slug}`}
                className="surface group block rounded-[2rem] p-8 transition-colors hover:border-cyan-core/50 sm:p-9"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-warm-dim">
                  <time dateTime={article.published}>
                    {dateFormat.format(new Date(article.published))}
                  </time>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {article.readingTime}
                  </span>
                </div>
                <h2 className="display mt-3 text-2xl leading-snug text-warm-white group-hover:text-cyan-soft">
                  {article.title}
                </h2>
                <p className="mt-3 leading-relaxed text-warm-mist">{article.description}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-soft">
                  Read the article <ArrowRight className="h-4 w-4" aria-hidden />
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
