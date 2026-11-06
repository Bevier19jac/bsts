import Image from "next/image";
import Link from "next/link";
import { footerLinks, frameworkDisclaimer, site, trademarkNotice, vetCert } from "@/lib/site";
import { BstsLockup } from "@/components/brand/BstsLockup";
import { StrategicLine } from "@/components/brand/StrategicLine";
import { BusinessContact } from "@/components/marketing/BusinessContact";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-edge/50 bg-obsidian-deep">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <BstsLockup className="w-[116px]" />
              <span className="sr-only">BSTS</span>
            </div>
            <p className="display mt-4 text-lg leading-snug">
              <StrategicLine />
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-dim">
              {site.name}. {site.subline}
            </p>
            <BusinessContact />
            <p className="mt-4 max-w-xs text-xs tracking-[0.12em] text-gold-soft uppercase">
              {vetCert.short}
            </p>
            {/* Official SBA certification icons. Permitted on the website for
                firms certified through SBA VetCert (see public/badges/README.md).
                Rendered alongside — not instead of — the text line above. */}
            {/* Credential precedence (CLAIMS_REGISTER.md): SBA SDVOSB → Security+ →
                AWS AI Practitioner → Azure Fundamentals → Marquis Who's Who 2026. Each badge is the asset
                issued to the founder (Credly) or the official SBA/Microsoft mark. */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Image
                src="/badges/sba-sdvosb-certified.png"
                alt="SBA Certified Service-Disabled Veteran-Owned Small Business"
                width={256}
                height={320}
                className="h-16 w-auto"
              />
              <Image
                src="/badges/credly-comptia-security-plus.png"
                alt="CompTIA Security+ certified"
                width={320}
                height={320}
                className="h-16 w-auto"
              />
              <Image
                src="/badges/credly-aws-ai-practitioner.png"
                alt="AWS Certified AI Practitioner"
                width={320}
                height={320}
                className="h-16 w-auto"
              />
              <Image
                src="/badges/microsoft-certified-fundamentals.svg"
                alt="Microsoft Certified: Azure Fundamentals (AZ-900)"
                width={300}
                height={300}
                className="h-16 w-auto"
              />
              <Image
                src="/badges/marquis-honored-listee-2026.png"
                alt="Marquis Who's Who Honored Listee, 2026"
                width={640}
                height={640}
                className="h-16 w-auto rounded-full"
              />
              {/* Bevier family crest — the founder's personal heritage mark;
                  last in precedence, set apart from the credentials by a gap
                  and slightly larger. */}
              <Image
                src="/crest/bevier-crest-dark-640.png"
                alt="Bevier family crest — Deum Verere"
                width={520}
                height={640}
                className="ml-5 h-20 w-auto"
              />
            </div>
          </div>

          <FooterColumn title="Services" links={footerLinks.services} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="More" links={footerLinks.more} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-edge/40 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="max-w-3xl text-xs leading-relaxed text-warm-dim">
              {frameworkDisclaimer}
            </p>
            <p className="mt-4 text-xs text-warm-dim">{trademarkNotice}</p>
            <p className="mt-2 text-xs text-warm-dim">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <nav aria-label={`Footer — ${title}`}>
      <h2 className="text-xs font-semibold tracking-[0.2em] text-warm-dim uppercase">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            {link.href.startsWith("http") ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-warm-mist transition-colors hover:text-cyan-soft"
              >
                {link.label}
              </a>
            ) : link.href.includes("#") ? (
              <a
                href={link.href}
                className="text-sm text-warm-mist transition-colors hover:text-cyan-soft"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-warm-mist transition-colors hover:text-cyan-soft"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
