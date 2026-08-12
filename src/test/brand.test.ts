import { describe, expect, it } from "vitest";
import { BLAST, BLAST_TO_TANK, LOCKUP, TANK } from "@/components/brand/lockup";

/**
 * Identity-lockup regression guard.
 *
 * The hero, the share card, and the printed brochure covers all show the
 * same shot: a tank firing, with the gun tube inside the fireball and the
 * forward jet running out on the bore axis. That only holds while two
 * separate bitmaps stay registered to each other. These tests fail if a
 * future edit nudges a percentage, swaps an asset, or changes the size
 * relationship — the failure modes the brochure correction pass fixed.
 */
describe("identity lockup geometry", () => {
  it("puts the bore exit and the blast's attach point at the same x", () => {
    // Collinear horizontally: the fire starts exactly where the barrel ends.
    expect(LOCKUP.muzzleXPct).toBeCloseTo(LOCKUP.attachXPct, 3);
  });

  it("puts the bore axis on the vertical centre of the box", () => {
    // The blast is authored with its axis at 50% of its own height and is
    // pinned to the top of the box, whose height equals the blast's — so the
    // axis is the box centre. The tank must be offset to meet it there.
    const tankH = (TANK.h / TANK.w) * (LOCKUP.tankWidthPct / 100);
    const boxH = (BLAST.h / BLAST.w) * (LOCKUP.blastWidthPct / 100);
    const boreY = LOCKUP.tankTopPct / 100 + TANK.muzzleYFrac * (tankH / boxH);
    expect(boreY).toBeCloseTo(BLAST.axisYFrac, 4);
  });

  it("keeps every element inside the box", () => {
    const tankH = (TANK.h / TANK.w) * (LOCKUP.tankWidthPct / 100);
    const boxH = (BLAST.h / BLAST.w) * (LOCKUP.blastWidthPct / 100);
    expect(LOCKUP.tankTopPct).toBeGreaterThanOrEqual(0);
    expect(LOCKUP.tankTopPct / 100 + tankH / boxH).toBeLessThanOrEqual(1);
    expect(LOCKUP.blastLeftPct + LOCKUP.blastWidthPct).toBeCloseTo(100, 6);
  });

  it("holds the brochure's size relationship between tank and blast", () => {
    // Print: tank 1.98in, blast 2.70in, corrected for both crops. If someone
    // resizes one asset without the other, the shot stops looking like one
    // photograph even though it is still collinear.
    expect(BLAST_TO_TANK).toBeCloseTo(1.3974, 3);
    expect(LOCKUP.blastWidthPct / LOCKUP.tankWidthPct).toBeCloseTo(BLAST_TO_TANK, 6);
  });

  it("uses the procedurally generated blast, never a photograph", () => {
    // brochures/src/make-blast.py renders this from noise with a fixed seed.
    // A reference photograph informed the physics only; no pixel of it is in
    // any asset, and nothing here may point at one.
    expect(BLAST.src).toBe("/blast-envelope.webp");
    expect(TANK.src).toBe("/abrams.webp");
  });

  it("produces a wide, short box rather than a tall one", () => {
    // A tall lockup pushes the promise and the calls to action below the
    // fold on a 768px laptop, which is what the compression pass fixed.
    expect(LOCKUP.aspect).toBeGreaterThan(3);
    expect(LOCKUP.aspect).toBeLessThan(3.7);
  });
});
