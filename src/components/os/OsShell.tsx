"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ClipboardList,
  FileText,
  Gauge,
  GitBranch,
  Handshake,
  ListChecks,
  Map as MapIcon,
  Menu,
  Scale,
  Settings,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { OsProvider, useOs } from "@/lib/os/store";
import { LogoMark } from "@/components/ui/Logo";

const modules = [
  { href: "/os", label: "Overview", icon: Gauge },
  { href: "/os/prospects", label: "Prospects", icon: Handshake },
  { href: "/os/clients", label: "Clients", icon: Users },
  { href: "/os/assessments", label: "Assessments", icon: ClipboardList },
  { href: "/os/roadmaps", label: "Roadmaps", icon: MapIcon },
  { href: "/os/projects", label: "Projects", icon: GitBranch },
  { href: "/os/risks", label: "Risks", icon: AlertTriangle },
  { href: "/os/automations", label: "Automations", icon: Workflow },
  { href: "/os/documents", label: "Documents", icon: FileText },
  { href: "/os/decisions", label: "Decisions", icon: Scale },
  { href: "/os/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className="space-y-1">
      {modules.map((m) => {
        const active =
          m.href === "/os"
            ? pathname === "/os" || pathname === "/os/"
            : pathname.startsWith(m.href);
        const Icon = m.icon;
        return (
          <li key={m.href}>
            <Link
              href={m.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-cyan-faint text-cyan-soft"
                  : "text-warm-mist hover:bg-graphite-2 hover:text-warm-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {m.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function ShellChrome({ children }: { children: React.ReactNode }) {
  const { state } = useOs();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      data-density={state.settings.density}
      className="min-h-dvh bg-obsidian-deep text-warm-white"
    >
      {/* Demo banner — always visible, required label */}
      <p
        role="note"
        className="border-b border-warn/30 bg-warn/10 px-4 py-2 text-center text-[0.72rem] font-medium tracking-wide text-warn"
      >
        Demonstration environment — do not enter real client or sensitive
        information.
      </p>

      <div className="mx-auto flex max-w-7xl">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-6 overflow-y-auto border-r border-edge/50 p-5 lg:flex">
          <div className="flex items-center gap-3 px-2">
            <LogoMark className="h-7 w-7" />
            <div className="leading-none">
              <p className="text-sm font-semibold tracking-[0.16em]">BSTS OS</p>
              <p className="mt-1 text-[0.6rem] tracking-[0.14em] text-warm-dim uppercase">
                Demo workspace
              </p>
            </div>
          </div>
          <nav aria-label="OS modules">
            <NavList />
          </nav>
          <div className="mt-auto px-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-warm-dim transition-colors hover:text-cyan-soft"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back to bsts site
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Mobile top bar */}
          <div className="sticky top-0 z-40 flex items-center justify-between border-b border-edge/50 bg-obsidian-deep/90 px-4 py-3 backdrop-blur-lg lg:hidden">
            <Link href="/os" className="flex items-center gap-2.5">
              <LogoMark className="h-6 w-6" />
              <span className="text-sm font-semibold tracking-[0.16em]">BSTS OS</span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="os-mobile-nav"
              aria-label={menuOpen ? "Close modules menu" : "Open modules menu"}
              className="rounded-full border border-edge p-2"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
          {menuOpen ? (
            <nav
              id="os-mobile-nav"
              aria-label="OS modules mobile"
              className="border-b border-edge/50 p-4 lg:hidden"
            >
              <NavList onNavigate={() => setMenuOpen(false)} />
              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-2 px-4 text-xs text-warm-dim"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back to bsts site
              </Link>
            </nav>
          ) : null}

          <main id="main" className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>

          <footer className="px-6 pb-8 text-center text-[0.68rem] leading-relaxed text-warm-dim">
            <ListChecks className="mr-1.5 inline h-3 w-3" aria-hidden />
            All names, people, and records in this workspace are fictional demo
            data. State lives in this browser tab&apos;s memory only — export
            JSON from Settings to keep a copy.
          </footer>
        </div>
      </div>
    </div>
  );
}

export function OsShell({ children }: { children: React.ReactNode }) {
  return (
    <OsProvider>
      <ShellChrome>{children}</ShellChrome>
    </OsProvider>
  );
}
