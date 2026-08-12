/**
 * Identity lockup geometry — the single source of truth shared by the
 * homepage hero, the Open Graph card, and (by derivation) the printed
 * brochure covers.
 *
 * The problem this solves: the tank and the muzzle blast are two separate
 * bitmaps that have to behave like one photograph. If they drift, the barrel
 * stops at the edge of the fire instead of entering it, or the forward jet
 * leaves the bore axis — the two defects the brochure correction pass was
 * about. Hard-coding percentages in JSX invites exactly that drift, so the
 * numbers are derived here from measured properties of the bitmaps and
 * verified in src/test/brand.test.ts.
 *
 * Measured off the GUN TUBE, never off the alpha channel. abrams.webp
 * carries a soft full-frame halo in its alpha, and the halo's vertical
 * midpoint is the image centre, not the bore. Reading it that way returned
 * a clean-looking 49.93% that was wrong by 6.4% of the tank's height — and
 * the fireball visibly sat under the barrel while the geometry test passed,
 * because the test checked the maths against the same bad constant.
 *
 * Measured, not estimated:
 *   /abrams.webp          bore axis at 43.50% of height, muzzle at 91.33%
 *                         of width (cross-checks to pixel y 318.0; the
 *                         print asset independently measures y 318.5)
 *   /blast-envelope.webp  bore axis on the exact vertical centre; attach
 *                         point at 11.450% of the width
 *
 * The blast asset is the print asset cropped symmetrically about its axis,
 * which is why the axis stays at 50% and only the attach fraction moves.
 */

/** Tank bitmap: intrinsic size and the measured bore exit. */
export const TANK = {
  src: "/abrams.webp",
  w: 1280,
  h: 731,
  muzzleXFrac: 0.9133,
  muzzleYFrac: 0.435,
} as const;

/** Blast bitmap: intrinsic size, attach point, and axis. */
export const BLAST = {
  src: "/blast-envelope.webp",
  w: 1357,
  h: 668,
  attachXFrac: 0.1145,
  axisYFrac: 0.5,
} as const;

/**
 * Rendered width of the blast relative to the rendered width of the tank.
 * Taken from the brochure cover (tank 1.98in, blast 2.70in). Only one
 * correction is needed: the web blast is a 1357/1500 crop of the print
 * asset. The two tank bitmaps need none — both are 1280 wide with the
 * muzzle at x 1169, so they share horizontal framing exactly.
 */
export const BLAST_TO_TANK = (2.7 * (BLAST.w / 1500)) / 1.98;

/**
 * Solve for the smallest box that contains both bitmaps with their bore axes
 * coincident. Left edge is the tank's left edge, right edge is the blast's
 * right edge; the shared axis sits wherever it has to. Everything downstream
 * is a percentage of that box, so the lockup stays registered at any width
 * with no media queries.
 *
 * The axis is deliberately NOT assumed to be the box's vertical centre. It is
 * for the blast, which is authored that way, but the tank is not symmetric
 * about its bore — there is more tank below the gun than above it — so
 * pinning the axis to the centre pushed the hull out of the bottom of the box.
 */
function solve() {
  const tankW = 1 / (TANK.muzzleXFrac + (1 - BLAST.attachXFrac) * BLAST_TO_TANK);
  const blastW = BLAST_TO_TANK * tankW;
  const tankH = (TANK.h / TANK.w) * tankW; // all heights in box-width units
  const blastH = (BLAST.h / BLAST.w) * blastW;

  const above = Math.max(BLAST.axisYFrac * blastH, TANK.muzzleYFrac * tankH);
  const below = Math.max((1 - BLAST.axisYFrac) * blastH, (1 - TANK.muzzleYFrac) * tankH);
  const boxH = above + below;

  return {
    /** width:height of the lockup box */
    aspect: 1 / boxH,
    tankWidthPct: tankW * 100,
    tankTopPct: ((above - TANK.muzzleYFrac * tankH) / boxH) * 100,
    blastWidthPct: blastW * 100,
    blastLeftPct: (1 - blastW) * 100,
    blastTopPct: ((above - BLAST.axisYFrac * blastH) / boxH) * 100,
    /** the shared bore axis, as a percentage of box height */
    axisYPct: (above / boxH) * 100,
    /** where the bore exit lands, as a percentage of box width */
    muzzleXPct: TANK.muzzleXFrac * tankW * 100,
    /** where the blast's attach point lands, same units — must match */
    attachXPct: (1 - blastW + BLAST.attachXFrac * blastW) * 100,
  };
}

export const LOCKUP = solve();
