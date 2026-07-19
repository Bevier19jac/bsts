import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { articles, getArticle, type ArticleBlock } from "@/lib/content/articles";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.published,
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="surface-quiet blob-b my-8 p-6 text-sm leading-relaxed text-warm-mist">
          {block.text}
        </div>
      );
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/insights/${article.slug}/`,
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pt-8 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal>
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm text-warm-dim transition-colors hover:text-cyan-soft"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> All insights
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-warm-dim">
          <time dateTime={article.published}>
            {dateFormat.format(new Date(article.published))}
          </time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {article.readingTime}
          </span>
        </div>
        <h1 className="display mt-4 text-3xl leading-tight text-warm-white sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-warm-mist">
          {article.description}
        </p>
        {article.disclaimer ? (
          <p className="mt-6 rounded-3xl border border-gold-core/30 bg-gold-faint px-5 py-4 text-sm leading-relaxed text-gold-soft">
            {article.disclaimer}
          </p>
        ) : null}
      </Reveal>

      <div className="prose-bsts mt-10">
        {article.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      <div className="mt-14 border-t border-edge/50 pt-10 text-center">
        <p className="text-warm-mist">
          Want this thinking applied to your operation?
        </p>
        <div className="mt-5">
          <LinkButton href="/contact">
            Start the assessment <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
