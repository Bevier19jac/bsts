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
 * Measured, not estimated:
 *   /abrams.webp          muzzle pixel at 99.92% / 49.93% of the bitmap
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
  muzzleXFrac: 0.9992,
  muzzleYFrac: 0.4993,
} as const;

/** Blast bitmap: intrinsic size, attach point, and axis. */
export const BLAST = {
  src: "/blast-envelope.webp",
  w: 1357,
  h: 654,
  attachXFrac: 0.1145,
  axisYFrac: 0.5,
} as const;

/**
 * Rendered width of the blast relative to the rendered width of the tank.
 * Taken from the brochure cover (tank 1.98in, blast 2.70in) and corrected
 * for the two crops: the web blast is 1357/1500 of the print asset, and
 * abrams.webp is a tighter crop than the print tank, whose content occupies
 * 1130 of its 1280 pixels.
 */
export const BLAST_TO_TANK = (2.7 * (BLAST.w / 1500)) / (1.98 * (1130 / 1280));

/**
 * Solve for a box whose left edge is the tank's left edge and whose right
 * edge is the blast's right edge, with the shared bore axis on the box's
 * vertical centre. Everything downstream is a percentage of that box, so the
 * lockup stays registered at any width with no media queries.
 */
function solve() {
  const tankW = 1 / (TANK.muzzleXFrac + (1 - BLAST.attachXFrac) * BLAST_TO_TANK);
  const blastW = BLAST_TO_TANK * tankW;
  const boxH = (BLAST.h / BLAST.w) * blastW; // as a fraction of box width
  const tankH = (TANK.h / TANK.w) * tankW;
  return {
    /** width:height of the lockup box */
    aspect: 1 / boxH,
    tankWidthPct: tankW * 100,
    tankTopPct: (0.5 - TANK.muzzleYFrac * (tankH / boxH)) * 100,
    blastWidthPct: blastW * 100,
    blastLeftPct: (1 - blastW) * 100,
    /** where the bore exit lands, as a percentage of box width */
    muzzleXPct: TANK.muzzleXFrac * tankW * 100,
    /** where the blast's attach point lands, same units — must match */
    attachXPct: (1 - blastW + BLAST.attachXFrac * blastW) * 100,
  };
}

export const LOCKUP = solve();
