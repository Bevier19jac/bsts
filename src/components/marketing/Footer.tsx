import Link from "next/link";
import { footerLinks, frameworkDisclaimer, site } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-edge/50 bg-obsidian-deep">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-9 w-9" />
              <p className="text-sm font-semibold tracking-[0.18em] text-warm-white">
                BSTS
              </p>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-dim">
              {site.name}. {site.subline}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-dim">
              {site.promise}
            </p>
          </div>

          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Work" links={footerLinks.work} />
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
            <Link
              href={link.href}
              className="text-sm text-warm-mist transition-colors hover:text-cyan-soft"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
