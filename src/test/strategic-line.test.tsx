/**
 * The footer used to retype the strategic line as three string literals and
 * colour only the third, so "Enable the AI." rendered white there and cyan in
 * the hero. Text and tone now come from one component; these tests fail if
 * either copy comes back.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { StrategicLine, strategicLineTone } from "@/components/brand/StrategicLine";
import { strategicLine } from "@/lib/content/positioning";

// __dirname is src/test; the repo root is two levels up. `join` keeps this
// working on Windows, same approach as claims.test.ts.
const repoRoot = join(__dirname, "..", "..");
const source = (p: string) => readFileSync(join(repoRoot, p), "utf8");

describe("the strategic line", () => {
  it("renders every line in its canonical tone", () => {
    const { container } = render(<StrategicLine />);
    const spans = [...container.querySelectorAll("span")];
    expect(spans).toHaveLength(strategicLine.length);
    spans.forEach((span, i) => {
      expect(span.textContent).toBe(strategicLine[i]);
      expect(span.className).toContain(strategicLineTone[i]);
    });
  });

  it('keeps "Enable the AI." cyan — the line that drifted', () => {
    const { container } = render(<StrategicLine />);
    const enable = [...container.querySelectorAll("span")].find(
      (s) => s.textContent === "Enable the AI.",
    );
    expect(enable).toBeDefined();
    expect(enable!.className).toContain("text-cyan-soft");
  });

  it("is white, then cyan, then gold — never two of the same", () => {
    expect(strategicLineTone).toEqual([
      "text-warm-white",
      "text-cyan-soft",
      "text-gold-soft",
    ]);
    expect(new Set(strategicLineTone).size).toBe(strategicLineTone.length);
  });

  for (const file of [
    "src/components/landing/Landing.tsx",
    "src/components/marketing/Footer.tsx",
  ]) {
    it(`${file} renders the line through the component, not literals`, () => {
      const src = source(file);
      expect(src).toContain("<StrategicLine");
      for (const line of strategicLine) {
        expect(src).not.toContain(line);
      }
    });
  }
});
