import Link from "next/link";
import { footerLinks, frameworkDisclaimer, site, vetCert } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-edge/50 bg-obsidian-deep">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-9 w-9" />
              <p className="text-sm font-semibold tracking-[0.18em] text-warm-white">
                BSTS
              </p>
            </div>
            <p className="display mt-4 text-lg leading-snug text-warm-white">
              Secure the data.
              <br />
              Enable the AI.
              <br />
              <span className="text-gold-soft">Prove the controls.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-dim">
              {site.name}. {site.subline}
            </p>
            <p className="mt-4 max-w-xs text-xs tracking-[0.12em] text-gold-soft uppercase">
              {vetCert.short}
            </p>
          </div>

          <FooterColumn title="Explore" links={footerLinks.explore} />
          <FooterColumn title="More" links={footerLinks.more} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mt-14 border-t border-edge/40 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-warm-dim">
            {frameworkDisclaimer}
          </p>
          <p className="mt-4 text-xs text-warm-dim">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
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
            {link.href.includes("#") ? (
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
