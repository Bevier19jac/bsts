import { useId, type CSSProperties } from "react";
import lockup from "./bsts-lockup.json";

/**
 * THE canonical BSTS trademark lockup — the single visual identity used
 * everywhere the BSTS mark appears: desktop header, mobile header, mobile
 * navigation, landing-page hero, internal-page headers, footer, and the
 * Open Graph / social card.
 *
 * The lockup is ONE mark, not a wordmark plus optional decoration:
 *
 *   - the approved crisp red BSTS glyph outlines, each carrying the approved
 *     white-core-to-red-perimeter bands (five flat nested contours per
 *     letter, outer #FF1F26 -> #FF3B3F -> #FF817C -> #FFD1CE -> #FFFDF8
 *     innermost, computed as true inward vector offsets of the real glyph
 *     outline);
 *   - a cyan (#63C7C2) lower-left corner that closely frames the B;
 *   - a cyan upper-right corner that closely frames the final S.
 *
 * The corners are FILLED vector paths inside this same SVG — never CSS
 * pseudo-elements, never separately positioned decorations, never hairline
 * strokes. That is deliberate: it makes corner-to-letter spacing a property
 * of the artwork itself, so it cannot drift between the header, the hero,
 * the social card and mobile layout, and it keeps the corners readable when
 * the mark is reduced.
 *
 * All geometry — corner paths, the tight viewBox, the aspect ratio — is
 * generated into ./bsts-lockup.json by scripts/build-lockup-geometry.mjs
 * from proportions measured against the BSTS capital height (corner-to-letter
 * gap 5.5%, arm length 19%, thickness 4%). Nothing here is hand-tuned, and
 * og-src.html is generated from that same JSON by scripts/build-og-src.mjs,
 * so there is exactly one copy of the path data in the repository.
 *
 * There is no bracketed/unbracketed variant and no alternate mark. Callers
 * pass sizing and accessibility only — never geometry, colour, spacing or
 * proportion. `preserveAspectRatio="xMidYMid meet"` guarantees the lockup is
 * never stretched or distorted.
 */
export function BstsLockup({
  className = "",
  style,
  title,
}: {
  /** Sizing/positioning classes only. */
  className?: string;
  /** Sizing only — width/height. Must not override geometry or colour. */
  style?: CSSProperties;
  /**
   * Accessible name. Omit where the mark is decorative or already labelled
   * by adjacent text, in which case it is hidden from assistive tech.
   */
  title?: string;
}) {
  const uid = useId();
  const ref = (name: string) => `bsts-${name}-${uid}`.replace(/:/g, "");

  // The approved corner stroke is 3.48% of cap height. That is correct
  // optically at large sizes and thins below one CSS pixel in the header.
  // Publishing the ratio lets a compact instance add a small, non-scaling
  // stroke to reach a minimum rendered weight WITHOUT touching the corner
  // paths, their placement, the colour or the viewBox — see the
  // `.bsts-lockup-compact` rule in globals.css. Large instances leave it at 0
  // and keep the true proportional weight.
  const [, , vbW] = lockup.viewBox.split(" ").map(Number).slice(0, 3);
  const cornerRatio = lockup.geometry.thickness / vbW;

  const labelled = Boolean(title);

  return (
    <svg
      className={className}
      style={
        {
          display: "block",
          height: "auto",
          "--bsts-corner-ratio": cornerRatio,
          ...style,
        } as CSSProperties
      }
      viewBox={lockup.viewBox}
      preserveAspectRatio="xMidYMid meet"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      <defs>
        {Object.entries(lockup.glyphs).map(([id, layers]) => (
          <symbol key={id} id={ref(id)} overflow="visible">
            {layers.map((layer, i) => (
              <path key={i} d={layer.d} fill={layer.fill} />
            ))}
          </symbol>
        ))}
      </defs>

      {lockup.letters.map((id, i) => (
        <use key={i} href={`#${ref(id)}`} x={lockup.letterX[i]} />
      ))}

      <path
        d={lockup.corners.lowerLeft}
        fill={lockup.colors.cyan}
        data-bsts-corner=""
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={lockup.corners.upperRight}
        fill={lockup.colors.cyan}
        data-bsts-corner=""
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** The lockup's width-to-height ratio, for callers reserving space. */
export const BSTS_LOCKUP_ASPECT = lockup.aspect;
