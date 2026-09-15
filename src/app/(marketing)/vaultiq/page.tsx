import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, CircleDashed, Lock, ShieldCheck } from "lucide-react";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Surface } from "@/components/ui/Surface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CurveDivider } from "@/components/ui/CurveDivider";
import { Reveal } from "@/components/motion/Reveal";
import { staggerDelay } from "@/components/motion/stagger";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/lib/site";
import {
  googleDisclosure,
  planned,
  shipped,
  vaultiqAvailability,
  vaultiqContactNote,
  vaultiqDoctrine,
  vaultiqIntro,
  vaultiqSecurity,
  type VaultiqCapability,
} from "@/lib/content/vaultiq";

/**
 * VaultIQ — the product page, and the OAuth application homepage.
 *
 * Google reads this page during sensitive-scope verification and checks that
 * it is publicly reachable without a login, that it describes the software
 * honestly, and that it carries a visible link to a privacy policy on the same
 * domain. The privacy link below the fold is therefore a functional
 * requirement, not decoration, and the same is true of the Google Calendar
 * section: the wording there has to match both the privacy policy and the
 * scopes the software actually requests.
 *
 * The title is `absolute` so it reads exactly as specified rather than picking
 * up the site-wide "— BSTS" template and ending up with the name twice.
 */
export const metadata: Metadata = {
  title: { absolute: "VaultIQ | Secure Client Intelligence | BSTS" },
  description:
    "VaultIQ is a private client vault for advisory firms: one vault per client, isolation enforced in the database, and a documented boundary around every integration. Built and operated by Bevier Strategic Technology Solutions.",
  keywords: [
    "VaultIQ",
    "secure client intelligence",
    "client vault software",
    "advisory firm client records",
    "tenant isolation",
    "secure AI knowledge system",
  ],
  alternates: { canonical: "/vaultiq/" },
  openGraph: {
    type: "website",
    title: "VaultIQ | Secure Client Intelligence | BSTS",
    description:
      "A private client vault for advisory firms. One vault per client, isolation enforced in the database, and an honest account of what is built and what is not.",
    url: `${site.url}/vaultiq/`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "VaultIQ | Secure Client Intelligence | BSTS",
    description:
      "A private client vault for advisory firms, built and operated by BSTS.",
  },
  robots: { index: true, follow: true },
};

/**
 * Structured data for the application itself. Deliberately absent: offers and
 * aggregateRating. VaultIQ is not sold on this site and has no customer
 * reviews; inventing either is the kind of thing Google issues manual actions
 * for, and it would be false besides.
 */
const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${site.url}/vaultiq/#software`,
  name: "VaultIQ",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web browser",
  url: `${site.url}/vaultiq/`,
  description:
    "A private client vault for advisory firms: one vault per client, access isolation enforced in the database, document retrieval, meeting records, and client-controlled retention.",
  publisher: { "@id": `${site.url}/#organization` },
  privacyPolicy: `${site.url}/privacy/`,
  termsOfService: `${site.url}/terms/`,
};

function CapabilityGrid({
  items,
  state,
}: {
  items: VaultiqCapability[];
  state: "shipped" | "planned";
}) {
  const Marker = state === "shipped" ? CircleCheck : CircleDashed;
  const markerClass = state === "shipped" ? "text-cyan-core" : "text-gold-core";
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.title} delay={staggerDelay(i % 2)}>
            <Surface
              quiet={state === "planned"}
              blob={(["a", "b", "c", "a"] as const)[i % 4]}
              className="h-full p-7 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 shrink-0 text-cyan-core" aria-hidden />
                <Marker className={`h-4 w-4 shrink-0 ${markerClass}`} aria-hidden />
                <span className="sr-only">
                  {state === "shipped" ? "Available now:" : "Planned, not built:"}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-warm-white">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-warm-mist">{item.body}</p>
            </Surface>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function VaultIqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      {/* ---------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden">
        <Atmosphere variant="quiet" />
        <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-14">
          <SectionHeading
            as="h1"
            eyebrow={vaultiqIntro.eyebrow}
            title={vaultiqIntro.title}
            lede={vaultiqIntro.lede}
          />
          <Reveal delay={0.1}>
            <p className="display mt-8 max-w-2xl text-xl leading-snug text-gold-soft sm:text-2xl">
              {vaultiqDoctrine}
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-warm-mist">
              Retrieval is machine work. Judgement, context, and the
              conversation with a client are not. VaultIQ exists to give the
              minutes back, not to stand between an advisor and the client they
              are advising.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <LinkButton href="/contact">Discuss VaultIQ</LinkButton>
              <LinkButton href="#google-calendar" variant="ghost">
                Google Calendar disclosure
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- Availability */}
      <section className="mx-auto max-w-4xl px-6 pb-14" aria-labelledby="availability">
        <Reveal>
          <Surface className="border-gold-core/35 p-7 sm:p-9">
            <h2
              id="availability"
              className="text-xs font-semibold tracking-[0.2em] text-gold-soft uppercase"
            >
              Availability
            </h2>
            <p className="mt-4 leading-relaxed text-warm-mist">
              {vaultiqAvailability}
            </p>
          </Surface>
        </Reveal>
      </section>

      {/* ------------------------------------------------------- Shipped */}
      <section className="mx-auto max-w-6xl px-6 pb-16" aria-labelledby="built">
        <SectionHeading
          id="built"
          eyebrow="What VaultIQ does today"
          title="Built, running, and exercised against the hosted system."
          lede="Everything in this section exists in the pilot build. Nothing in it is a roadmap item wearing the present tense."
        />
        <CapabilityGrid items={shipped} state="shipped" />
      </section>

      {/* ------------------------------------------------------- Planned */}
      <section className="relative" aria-labelledby="not-built">
        <CurveDivider />
        <div className="bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              id="not-built"
              gold
              eyebrow="Designed, not built"
              title="What VaultIQ does not do yet."
              lede="Published in the same place and the same type size as the capabilities above, because a product page that only lists strengths is not a description — it is an advertisement."
            />
            <CapabilityGrid items={planned} state="planned" />
          </div>
        </div>
        <CurveDivider flip />
      </section>

      {/* ---------------------------------------- Google Calendar section */}
      <section
        id="google-calendar"
        className="mx-auto max-w-4xl scroll-mt-28 px-6 pt-16 pb-12"
        aria-labelledby="google-heading"
      >
        <Reveal>
          <p className="eyebrow eyebrow-gold">Integration disclosure</p>
          <h2
            id="google-heading"
            className="display mt-4 text-3xl leading-tight text-warm-white sm:text-4xl"
          >
            {googleDisclosure.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <Surface className="mt-8 border-cyan-core/30 p-7 sm:p-8">
            <div className="flex items-start gap-3">
              <Lock className="mt-1 h-5 w-5 shrink-0 text-cyan-core" aria-hidden />
              <p className="leading-relaxed text-warm-white">
                {googleDisclosure.status}
              </p>
            </div>
          </Surface>
        </Reveal>

        <div className="prose-bsts mt-10">
          <h3>What will be requested, and why</h3>
          <p>{googleDisclosure.scopeIntro}</p>
        </div>

        <div className="mt-6 space-y-4">
          {googleDisclosure.scopes.map((s) => (
            <Surface key={s.scope} quiet className="p-6">
              <code className="block text-sm break-all text-cyan-soft">
                {s.scope}
              </code>
              <p className="mt-3 leading-relaxed text-warm-mist">{s.purpose}</p>
            </Surface>
          ))}
        </div>

        <div className="prose-bsts mt-10">
          <h3>What will never be requested</h3>
          <ul>
            {googleDisclosure.notRequested.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>

          <h3>How the connection will work</h3>
          <ul>
            {googleDisclosure.handling.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <h3>Limited Use</h3>
          <p>{googleDisclosure.limitedUse}</p>

          <p>
            The full account of how VaultIQ handles Google user data is in the{" "}
            <Link href="/privacy/#google-workspace">
              Google Workspace and Google API Data section of the BSTS Privacy
              Policy
            </Link>
            . If the wording on this page and the wording in that policy ever
            disagree, the Privacy Policy is the governing statement.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------ Security */}
      <section className="relative" aria-labelledby="posture">
        <CurveDivider />
        <div className="bg-graphite">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
              <SectionHeading
                id="posture"
                eyebrow="Security posture"
                title="The boundary is the product."
                lede="VaultIQ holds the records a firm would least like to see in the wrong hands. The engineering reflects that, and the wording here stays inside what can actually be demonstrated."
              />
              <Reveal delay={0.1}>
                <Surface quiet blob="b" className="p-8">
                  <ShieldCheck className="h-6 w-6 text-cyan-core" aria-hidden />
                  <ul className="mt-5 space-y-3.5">
                    {vaultiqSecurity.map((s) => (
                      <li
                        key={s}
                        className="flex gap-3 leading-relaxed text-warm-mist"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-core"
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm leading-relaxed text-warm-dim">
                    These are engineering practices, not certifications. BSTS is
                    not an accreditation body, a certification body, or an audit
                    firm, and nothing here implies that VaultIQ has been audited
                    or accredited by anyone.
                  </p>
                </Surface>
              </Reveal>
            </div>
          </div>
        </div>
        <CurveDivider flip />
      </section>

      {/* ------------------------------------------------ Close and links */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-20" aria-labelledby="more">
        <SectionHeading
          id="more"
          eyebrow="Operator and policies"
          title="Who runs it, and the terms it runs under."
          lede={vaultiqContactNote}
        />
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href="/privacy/" variant="ghost">
              Privacy Policy
            </LinkButton>
            <LinkButton href="/terms/" variant="ghost">
              Terms of Use
            </LinkButton>
            <LinkButton href="/security/" variant="ghost">
              Security practice
            </LinkButton>
            <LinkButton href="/contact/">Contact BSTS</LinkButton>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-warm-dim">
            {site.legalName} · {site.contactEmail} · {site.phone}
          </p>
        </Reveal>
      </section>
    </>
  );
}
