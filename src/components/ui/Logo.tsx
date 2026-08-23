import { BstsLockup } from "@/components/brand/BstsLockup";

/**
 * Header identity: the canonical BSTS trademark lockup — cyan corners plus
 * the approved red BSTS lettering, as one mark.
 *
 * There is no separate icon, monogram, badge, shield, circle or alternate
 * symbol beside it, and no unbracketed variant of the wordmark exists. The
 * old circular two-arc-and-gold-dot monogram that used to sit here (and in
 * the retired OS demonstration) is gone entirely — do not reintroduce it.
 *
 * Only sizing lives here; every geometric property of the mark itself comes
 * from <BstsLockup /> and src/components/brand/bsts-lockup.json. The mark is
 * left decorative because the surrounding link already carries the
 * accessible name.
 */
export function Wordmark() {
  // ~104px on a 1440px viewport, 92px on mobile. Both widths and the matching
  // corner-weight correction live in the .bsts-lockup-compact rule in
  // globals.css, so the width is declared once and the optical correction is
  // derived from it rather than hand-tuned per breakpoint.
  return <BstsLockup className="bsts-lockup-compact" />;
}
