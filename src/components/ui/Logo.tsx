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
  // Sized so the red-and-white band treatment and BOTH cyan corners stay
  // recognizable in the header — an earlier ~90px proof rendered the corner
  // stroke near one device pixel and was rejected.
  return <BstsLockup className="w-[136px] sm:w-[clamp(150px,12vw,184px)]" />;
}
