import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Reveal } from "@/components/motion/Reveal";

const ROOT = resolve(__dirname, "../..");

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

/**
 * The scroll reveal must FAIL OPEN.
 *
 * The previous framer-motion implementation rendered `opacity: 0` into the
 * server HTML, so an entire page of real content was invisible to anyone whose
 * JavaScript had not run — no JS, slow hydration, a crawler, or a full-page
 * capture. These tests exist so that cannot come back.
 */
describe("Reveal fails open", () => {
  it("renders no hidden styling of its own", () => {
    render(<Reveal>visible content</Reveal>);
    const el = screen.getByText("visible content");
    // Nothing in the markup may hide it — the hidden state is applied only
    // from an effect, and only ever in a real browser.
    expect(el.getAttribute("style") ?? "").not.toMatch(/opacity\s*:\s*0/);
    expect(el).toBeVisible();
  });

  it("stays visible when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Reveal>content without an observer</Reveal>);
    const el = screen.getByText("content without an observer");
    expect(el.dataset.revealState).toBeUndefined();
    expect(el).toBeVisible();
  });

  it("never hides content when reduced motion is requested", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({
      matches: q.includes("prefers-reduced-motion"),
      media: q,
      addEventListener() {},
      removeEventListener() {},
    }));
    render(<Reveal>reduced motion content</Reveal>);
    const el = screen.getByText("reduced motion content");
    expect(el.dataset.revealState).toBeUndefined();
    expect(el).toBeVisible();
  });

  it("renders the requested element type with its children intact", () => {
    render(
      <ul>
        <Reveal as="li">a list item</Reveal>
      </ul>,
    );
    expect(screen.getByText("a list item").tagName).toBe("LI");
  });

  it("keeps the CSS honest: hiding requires the armed state attribute", () => {
    const css = readFileSync(resolve(ROOT, "src/app/globals.css"), "utf8");

    // Walk actual rules rather than pattern-matching across the file: any rule
    // that targets [data-reveal] WITHOUT requiring data-reveal-state must not
    // hide anything, because that state is the only thing JavaScript gates.
    const offenders: string[] = [];
    for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const selector = match[1].trim();
      const body = match[2];
      if (!selector.includes("[data-reveal]")) continue;
      const gated = selector
        .split(",")
        .every((part) => !part.includes("[data-reveal]") || part.includes("data-reveal-state"));
      if (gated) continue;
      if (/opacity:\s*0\s*[;}]/.test(body)) offenders.push(selector);
    }
    expect(offenders).toEqual([]);

    expect(css).toContain('[data-reveal][data-reveal-state="hidden"]');
    expect(css).toContain("prefers-reduced-motion: reduce");
  });
});
