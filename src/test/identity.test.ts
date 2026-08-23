import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import lockup from "@/components/brand/bsts-lockup.json";

const ROOT = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

/**
 * The canonical BSTS trademark lockup is one mark used everywhere. These
 * tests exist because the two things most likely to rot are (a) the corners
 * drifting away from the specified proportions, and (b) the Open Graph card
 * falling out of sync with the site — which is exactly what happened when the
 * card carried a hand-copied duplicate of the path data.
 */
describe("canonical BSTS trademark lockup", () => {
  it("matches the approved corner proportions, measured against cap height", () => {
    const g = lockup.geometry;
    expect(g.capHeight).toBeGreaterThan(0);
    // Values measured off the approved visual reference (23 Aug 2026). Tight
    // tolerances on purpose: the appearance is locked, so drift is a bug.
    expect(g.armH / g.capHeight).toBeCloseTo(0.8696, 3);
    expect(g.armV / g.capHeight).toBeCloseTo(0.6435, 3);
    expect(g.thickness / g.capHeight).toBeCloseTo(0.0348, 3);
    expect(g.offsetX / g.capHeight).toBeCloseTo(0.122, 3);
    expect(g.offsetY / g.capHeight).toBeCloseTo(0.139, 3);
    // The arms are deliberately unequal — wider than tall.
    expect(g.armH).toBeGreaterThan(g.armV);
  });

  it("uses the brand cyan for both corners and keeps the approved band colours", () => {
    expect(lockup.colors.cyan.toUpperCase()).toBe("#63C7C2");
    expect(lockup.colors.bands).toEqual([
      "#FF1F26",
      "#FF3B3F",
      "#FF817C",
      "#FFD1CE",
      "#FFFDF8",
    ]);
    for (const layers of Object.values(lockup.glyphs)) {
      expect(layers.map((l) => l.fill)).toEqual(lockup.colors.bands);
    }
  });

  it("has exactly two corners: lower-left framing the B, upper-right framing the final S", () => {
    expect(Object.keys(lockup.corners).sort()).toEqual(["lowerLeft", "upperRight"]);
    const { b, finalS } = lockup.geometry.letterBounds;
    // Each corner sits outside its letter by the gap, and never touches it.
    const nums = (d: string) => d.match(/-?\d+(\.\d+)?/g)!.map(Number);
    const ll = nums(lockup.corners.lowerLeft);
    const ur = nums(lockup.corners.upperRight);
    const llXs = ll.filter((_, i) => i % 2 === 0);
    const llYs = ll.filter((_, i) => i % 2 === 1);
    const urXs = ur.filter((_, i) => i % 2 === 0);
    const urYs = ur.filter((_, i) => i % 2 === 1);
    expect(Math.max(...llXs)).toBeLessThan(b.right); // stays left of the B's far edge
    expect(Math.min(...llYs)).toBeGreaterThan(b.top); // stays below the B's top
    expect(Math.min(...urXs)).toBeGreaterThan(finalS.left);
    expect(Math.max(...urYs)).toBeLessThan(finalS.bottom);
    // Neither corner may touch its letter.
    expect(Math.max(...llXs.filter((x) => x < b.left))).toBeLessThan(b.left);
    expect(Math.min(...urYs.filter((y) => y < finalS.top))).toBeLessThan(finalS.top);
  });

  it("fits every letter and both corners inside a tight viewBox", () => {
    const [vx, vy, vw, vh] = lockup.viewBox.split(" ").map(Number);
    const all = lockup.geometry.letterBounds.all;
    expect(vx).toBeLessThanOrEqual(all.left);
    expect(vy).toBeLessThanOrEqual(all.top);
    expect(vx + vw).toBeGreaterThanOrEqual(all.right);
    expect(vy + vh).toBeGreaterThanOrEqual(all.bottom);
    // Tight: no more padding around the letters than the corners actually
    // occupy, and never so tight that a cyan corner gets cropped.
    expect(all.left - vx).toBeCloseTo(lockup.geometry.offsetX, 1);
    expect(vy + vh - all.bottom).toBeCloseTo(
      lockup.geometry.offsetY - (all.bottom - lockup.geometry.letterBounds.b.bottom),
      1,
    );
    expect(lockup.aspect).toBeCloseTo(vw / vh, 5);
  });

  it("is the only wordmark implementation — the retired marks are gone", () => {
    expect(existsSync(resolve(ROOT, "src/components/brand/BstsWordmark.tsx"))).toBe(false);
    const logo = read("src/components/ui/Logo.tsx");
    expect(logo).not.toMatch(/LogoMark/);
    expect(logo).not.toMatch(/<circle/);
    // No component may re-declare glyph or corner geometry.
    const component = read("src/components/brand/BstsLockup.tsx");
    expect(component).not.toMatch(/\bd="M/);
  });

  it("corrects corner weight optically without touching the artwork", () => {
    const css = read("src/app/globals.css");
    // The correction must be a stroke on the EXISTING corner paths, derived
    // from the instance width — never a second asset, never edited geometry.
    expect(css).toContain(".bsts-lockup-compact [data-bsts-corner]");
    expect(css).toMatch(/stroke-width:\s*max\(/);
    expect(css).toContain("--bsts-corner-ratio");
    // It must be opt-in: the base rule leaves every other instance at the
    // approved proportional weight.
    expect(css).toMatch(/\[data-bsts-corner\]\s*\{[^}]*stroke-width:\s*0/);

    // Only the header opts in.
    expect(read("src/components/ui/Logo.tsx")).toContain("bsts-lockup-compact");
    for (const f of [
      "src/components/brand/IdentityLockup.tsx",
      "src/components/marketing/Footer.tsx",
    ]) {
      expect(read(f)).not.toContain("bsts-lockup-compact");
    }
    // The corner paths themselves are unchanged.
    expect(lockup.geometry.thickness / lockup.geometry.capHeight).toBeCloseTo(0.0348, 3);
  });

  it("keeps the Open Graph card generated from the same source, not a copy", () => {
    const og = read("og-src.html");
    expect(og).toContain(`viewBox="${lockup.viewBox}"`);
    expect(og).toContain(lockup.corners.lowerLeft);
    expect(og).toContain(lockup.corners.upperRight);
    expect(og).toContain('preserveAspectRatio="xMidYMid meet"');
    // Every glyph layer present exactly once.
    for (const layers of Object.values(lockup.glyphs)) {
      for (const layer of layers) {
        expect(og.split(layer.d).length - 1).toBe(1);
      }
    }
  });
});
