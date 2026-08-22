import Image from "next/image";
import { BLAST, LOCKUP, PROJECTILE, TANK } from "./lockup";

/**
 * The BSTS identity lockup: chrome monogram, full company name, gold star
 * rule, then the shot. This is the printed brochure cover, on screen — same
 * order, same proportions, same artwork — so a prospect holding the brochure
 * and opening the site sees one identity rather than two.
 *
 * `size` trades vertical space for presence. The hero uses "hero"; anywhere
 * the lockup is a supporting mark rather than the subject, use "compact".
 */
export function IdentityLockup({
  size = "hero",
  priority = false,
}: {
  size?: "hero" | "compact";
  priority?: boolean;
}) {
  const type =
    size === "hero"
      ? {
          mark: "text-[2.6rem] sm:text-[3.3rem] lg:text-[3.9rem]",
          name: "text-[0.78rem] sm:text-[1rem] lg:text-[1.18rem]",
          rule: "max-w-[16rem] sm:max-w-[22rem]",
          box: "max-w-[44rem]",
        }
      : {
          mark: "text-[1.9rem] sm:text-[2.3rem]",
          name: "text-[0.62rem] sm:text-[0.74rem]",
          rule: "max-w-[11rem] sm:max-w-[14rem]",
          box: "max-w-[26rem]",
        };

  return (
    <>
      <div className="text-center">
        <p className={`mark-hero leading-none ${type.mark}`}>BSTS</p>
        <p className={`company-name mt-1.5 ${type.name}`}>
          Bevier Strategic
          <br />
          Technology Solutions
        </p>
        <div className={`star-rule mx-auto mt-2.5 ${type.rule}`}>
          <span className="sr-line l" />
          <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 0.6 L14.5 9.5 L23.4 12 L14.5 14.5 L12 23.4 L9.5 14.5 L0.6 12 L9.5 9.5 Z"
              fill="#c9a869"
            />
          </svg>
          <span className="sr-line r" />
        </div>
      </div>

      {/* Registration is computed in ./lockup.ts from measured bitmap
          properties and verified in src/test/brand.test.ts, so the barrel,
          the centre of the gas mass and the forward jet stay collinear at
          every viewport width — no media queries, no JavaScript. */}
      <div
        className={`relative mx-auto mt-1 w-full sm:mt-2 ${type.box}`}
        style={{ aspectRatio: String(LOCKUP.aspect) }}
        aria-hidden="true"
      >
        {/* Ground. The old .hero-ground was a light ellipse floating behind
            the tank, fighting the dark blob baked into the previous bitmap;
            together they read as hovering. This is a hairline horizon at the
            exact contact height plus a short contact shadow whose darkest
            point touches the tracks. Same treatment as the printed piece. */}
        <div
          className="hero-horizon absolute"
          style={{
            top: `${LOCKUP.groundYPct}%`,
            left: `${LOCKUP.footCXPct - LOCKUP.footWPct * 0.93}%`,
            width: `${LOCKUP.footWPct * 1.86}%`,
          }}
        />
        <div
          className="hero-contact absolute"
          style={{
            top: `${LOCKUP.groundYPct - 4.6}%`,
            left: `${LOCKUP.footCXPct - LOCKUP.footWPct * 0.55}%`,
            width: `${LOCKUP.footWPct * 1.1}%`,
            height: "9.2%",
          }}
        />
        <Image
          src={TANK.src}
          alt=""
          width={TANK.w}
          height={TANK.h}
          priority={priority}
          className="absolute left-0 h-auto max-w-none"
          style={{
            top: `${LOCKUP.tankTopPct}%`,
            width: `${LOCKUP.tankWidthPct}%`,
            // The print asset is deliberately lifted so armour plates and the
            // gun tube survive toner on matte. Screen gets the same read from
            // the untouched web bitmap plus a matching lift, rather than a
            // second exported file to keep in sync.
            filter: "brightness(1.14) contrast(1.04)",
            maskImage:
              "radial-gradient(ellipse 92% 88% at 50% 50%, black 58%, transparent 98%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 92% 88% at 50% 50%, black 58%, transparent 98%)",
          }}
        />
        <Image
          src={BLAST.src}
          alt=""
          width={BLAST.w}
          height={BLAST.h}
          priority={priority}
          className="hero-blast absolute h-auto max-w-none"
          style={{
            top: `${LOCKUP.blastTopPct}%`,
            left: `${LOCKUP.blastLeftPct}%`,
            width: `${LOCKUP.blastWidthPct}%`,
          }}
        />
        {/* One intact, fin-stabilized dart riding the tracer on the same bore
            axis as the tank and the blast — never a separate composition. */}
        <Image
          src={PROJECTILE.src}
          alt=""
          width={PROJECTILE.w}
          height={PROJECTILE.h}
          priority={priority}
          className="hero-projectile absolute h-auto max-w-none"
          style={{
            top: `${LOCKUP.projTopPct}%`,
            left: `${LOCKUP.projLeftPct}%`,
            width: `${LOCKUP.projWidthPct}%`,
          }}
        />
      </div>
      <p className="sr-only">Bevier Strategic Technology Solutions — BSTS</p>
    </>
  );
}
