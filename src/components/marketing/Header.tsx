"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { assessmentCta, audienceLinks, navLinks } from "@/lib/site";
import { lifecycle, digitalFoundations } from "@/lib/content/services";
import { Wordmark } from "@/components/ui/Logo";

/**
 * Four primary items plus one CTA.
 *
 * Services and Who We Help open menus rather than navigating on their own —
 * on desktop as a hover/focus dropdown, on mobile as a stacked accordion.
 * The mobile menu is a deliberately separate layout, not the desktop dropdown
 * squeezed narrow: full-width rows, 44px minimum touch targets, one tap per
 * destination.
 *
 * Accessibility behaviour that has to keep working: Escape closes and returns
 * focus to the toggle, focus is contained while open, background scroll locks
 * only while open (iOS-safe, restoring exact position), and any route or hash
 * change closes the menu — including back/forward, which never fires a link's
 * onClick.
 */

const serviceMenu = [...lifecycle, digitalFoundations];

export function Header() {
  const [open, setOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [desktopPanel, setDesktopPanel] = useState<string | null>(null);
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const scrollYRef = useRef(0);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  // Close on any route/hash change. Adjusted during render — React's
  // recommended way to reset state from a changed input — so it cannot
  // cascade an extra render.
  const navKey = `${pathname}#${hash}`;
  const [lastNavKey, setLastNavKey] = useState(navKey);
  if (navKey !== lastNavKey) {
    setLastNavKey(navKey);
    if (open) setOpen(false);
    if (openPanel) setOpenPanel(null);
    if (desktopPanel) setDesktopPanel(null);
  }

  useEffect(() => {
    if (!open && !desktopPanel) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (desktopPanel) {
        setDesktopPanel(null);
        return;
      }
      setOpen(false);
      setOpenPanel(null);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setOpenPanel(null);
        setDesktopPanel(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, desktopPanel]);

  // Lock background scroll while the mobile menu is open, iOS-safe: fixing
  // the body (overflow alone is ignored by iOS Safari mid-touch) and snapping
  // the exact position back on close.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    scrollYRef.current = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      window.scrollTo({ top: scrollYRef.current, left: 0, behavior: "instant" });
    };
  }, [open]);

  useEffect(() => {
    if (open) firstItemRef.current?.focus();
  }, [open]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && hash === href.slice(1);
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeAll = () => {
    setOpen(false);
    setOpenPanel(null);
    setDesktopPanel(null);
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-edge/60 bg-obsidian/75 px-4 py-2 backdrop-blur-xl sm:mx-4 sm:px-6 lg:mx-auto">
        <Link href="/" aria-label="BSTS home" className="rounded-full">
          <Wordmark />
        </Link>

        {/* ---------------------------- desktop ---------------------------- */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setDesktopPanel(null)}
        >
          {navLinks.map((link) => {
            const panel = "panel" in link ? link.panel : undefined;
            if (!panel) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onMouseEnter={() => setDesktopPanel(null)}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive(link.href)
                      ? "bg-graphite-2 font-medium text-cyan-soft"
                      : "text-warm-mist hover:text-warm-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            }
            const isOpen = desktopPanel === panel;
            return (
              <div key={link.href} className="relative" onMouseEnter={() => setDesktopPanel(panel)}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${panel}-menu-${uid}`}
                  onClick={() => setDesktopPanel(isOpen ? null : panel)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive(link.href) || isOpen
                      ? "bg-graphite-2 font-medium text-cyan-soft"
                      : "text-warm-mist hover:text-warm-white"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>

                <AnimatePresence>
                  {isOpen ? (
                    <motion.div
                      id={`${panel}-menu-${uid}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute top-full left-1/2 z-50 mt-3 -translate-x-1/2 rounded-3xl border border-edge/70 bg-obsidian/97 p-3 shadow-2xl backdrop-blur-xl ${
                        panel === "services" ? "w-[38rem]" : "w-[21rem]"
                      }`}
                    >
                      {panel === "services" ? (
                        <>
                          <ul className="grid grid-cols-2 gap-1">
                            {serviceMenu.map((stage) => {
                              const Icon = stage.icon;
                              return (
                                <li key={stage.slug}>
                                  <Link
                                    href={`/services#${stage.slug}`}
                                    onClick={closeAll}
                                    className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-graphite-2"
                                  >
                                    <Icon
                                      className="mt-0.5 h-4 w-4 shrink-0 text-cyan-core"
                                      aria-hidden
                                    />
                                    <span className="block">
                                      <span className="block text-sm font-medium text-warm-white">
                                        {stage.name}
                                      </span>
                                      <span className="mt-0.5 block text-xs leading-snug text-warm-dim">
                                        {stage.navLine}
                                      </span>
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                          <Link
                            href="/services"
                            onClick={closeAll}
                            className="mt-1 block rounded-2xl bg-graphite-2/70 px-4 py-3 text-center text-sm font-medium text-cyan-soft transition-colors hover:bg-graphite-2"
                          >
                            View All Services &amp; Pricing
                          </Link>
                        </>
                      ) : (
                        <ul className="flex flex-col gap-1">
                          {audienceLinks.map((a) => (
                            <li key={a.href}>
                              <Link
                                href={a.href}
                                onClick={closeAll}
                                className="block rounded-2xl p-3 transition-colors hover:bg-graphite-2"
                              >
                                <span className="block text-sm font-medium text-warm-white">
                                  {a.label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-snug text-warm-dim">
                                  {a.line}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}

          <a
            href={assessmentCta.href}
            className="ml-2 rounded-full bg-cyan-core px-4.5 py-2 text-sm font-medium text-obsidian-deep transition-colors hover:bg-cyan-soft"
          >
            {assessmentCta.label}
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setOpenPanel(null);
          }}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full border border-edge p-2 text-warm-white active:bg-graphite-2 lg:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {/* ----------------------------- mobile ----------------------------- */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-3 mt-2 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain rounded-[1.75rem] border border-edge/70 bg-obsidian/97 p-2 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, index) => {
                const panel = "panel" in link ? link.panel : undefined;
                const items =
                  panel === "services"
                    ? serviceMenu.map((s) => ({
                        href: `/services#${s.slug}`,
                        label: s.name,
                      }))
                    : panel === "audiences"
                      ? audienceLinks.map((a) => ({ href: a.href, label: a.label }))
                      : null;

                if (!items) {
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeAll}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={`flex min-h-12 touch-manipulation items-center rounded-2xl px-4 py-3 text-[0.95rem] ${
                          isActive(link.href)
                            ? "bg-graphite-2 font-medium text-cyan-soft"
                            : "text-warm-mist active:bg-graphite-2 hover:bg-graphite-2 hover:text-warm-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                }

                const expanded = openPanel === panel;
                return (
                  <li key={link.href}>
                    <button
                      ref={index === 0 ? firstItemRef : undefined}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`acc-${panel}-${uid}`}
                      onClick={() => setOpenPanel(expanded ? null : (panel as string))}
                      className={`flex min-h-12 w-full touch-manipulation items-center justify-between rounded-2xl px-4 py-3 text-left text-[0.95rem] ${
                        expanded
                          ? "bg-graphite-2 font-medium text-cyan-soft"
                          : "text-warm-mist active:bg-graphite-2"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {expanded ? (
                        <motion.ul
                          id={`acc-${panel}-${uid}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={closeAll}
                                className="flex min-h-11 touch-manipulation items-center rounded-2xl py-2.5 pr-4 pl-8 text-[0.9rem] text-warm-mist active:bg-graphite-2 hover:bg-graphite-2 hover:text-warm-white"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                          {panel === "services" ? (
                            <li>
                              <Link
                                href="/services"
                                onClick={closeAll}
                                className="flex min-h-11 touch-manipulation items-center rounded-2xl py-2.5 pr-4 pl-8 text-[0.9rem] font-medium text-cyan-soft active:bg-graphite-2 hover:bg-graphite-2"
                              >
                                View All Services &amp; Pricing
                              </Link>
                            </li>
                          ) : null}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}

              <li className="mt-2">
                <a
                  href={assessmentCta.href}
                  onClick={closeAll}
                  className="flex min-h-12 touch-manipulation items-center justify-center rounded-2xl bg-cyan-core px-4 py-3 text-center font-medium text-obsidian-deep active:bg-cyan-soft"
                >
                  {assessmentCta.label}
                </a>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
