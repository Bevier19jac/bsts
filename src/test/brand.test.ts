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

  it("lands both bore axes on the same horizontal line", () => {
    const boxH = (1 / LOCKUP.aspect);
    const tankH = (TANK.h / TANK.w) * (LOCKUP.tankWidthPct / 100);
    const blastH = (BLAST.h / BLAST.w) * (LOCKUP.blastWidthPct / 100);
    const tankBore = LOCKUP.tankTopPct / 100 + TANK.muzzleYFrac * (tankH / boxH);
    const blastBore = LOCKUP.blastTopPct / 100 + BLAST.axisYFrac * (blastH / boxH);
    expect(tankBore).toBeCloseTo(blastBore, 6);
    expect(tankBore * 100).toBeCloseTo(LOCKUP.axisYPct, 6);
  });

  it("keeps every element inside the box", () => {
    const boxH = 1 / LOCKUP.aspect;
    const tankH = (TANK.h / TANK.w) * (LOCKUP.tankWidthPct / 100);
    const blastH = (BLAST.h / BLAST.w) * (LOCKUP.blastWidthPct / 100);
    for (const [top, h] of [[LOCKUP.tankTopPct, tankH], [LOCKUP.blastTopPct, blastH]]) {
      expect(top).toBeGreaterThanOrEqual(-1e-9);
      expect(top / 100 + h / boxH).toBeLessThanOrEqual(1 + 1e-9);
    }
    expect(LOCKUP.blastLeftPct + LOCKUP.blastWidthPct).toBeCloseTo(100, 6);
  });

  it("holds the brochure's size relationship between tank and blast", () => {
    // Print: tank 1.98in, blast 2.70in, corrected for both crops. If someone
    // resizes one asset without the other, the shot stops looking like one
    // photograph even though it is still collinear.
    expect(BLAST_TO_TANK).toBeCloseTo(0.8635, 3);
    expect(LOCKUP.blastWidthPct / LOCKUP.tankWidthPct).toBeCloseTo(BLAST_TO_TANK, 6);
  });

  it("takes the bore axis from the gun tube, not the alpha halo", () => {
    // abrams.webp's alpha is a soft full-frame glow centred on the image,
    // so any alpha-derived axis lands at ~0.4993 and the fireball ends up
    // under the barrel. The tube itself measures 0.4350. Guard the gap.
    expect(TANK.muzzleYFrac).toBeCloseTo(0.6199, 3);
    expect(TANK.muzzleYFrac).not.toBeCloseTo(0.4993, 2);
    expect(TANK.muzzleXFrac).toBeCloseTo(0.9133, 3);
  });

  it("uses the procedurally generated blast, never a photograph", () => {
    // brochures/src/make-blast.py renders this from noise with a fixed seed.
    // A reference photograph informed the physics only; no pixel of it is in
    // any asset, and nothing here may point at one.
    expect(BLAST.src).toBe("/blast-envelope.webp");
    expect(TANK.src).toBe("/abrams-tank.webp");
  });

  it("produces a wide, short box rather than a tall one", () => {
    // A tall lockup pushes the promise and the calls to action below the
    // fold on a 768px laptop, which is what the compression pass fixed.
    expect(LOCKUP.aspect).toBeGreaterThan(3);
    expect(LOCKUP.aspect).toBeLessThan(4.6);
  });
});
