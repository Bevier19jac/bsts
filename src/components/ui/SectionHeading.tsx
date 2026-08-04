import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  gold = false,
  center = false,
  id,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  gold?: boolean;
  center?: boolean;
  id?: string;
  /** Pass "h1" for the page-opening heading so every page has one logical H1. */
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${gold ? "eyebrow-gold" : ""}`}>{eyebrow}</p>
      <Heading
        id={id}
        className="display mt-4 text-3xl leading-tight text-warm-white sm:text-4xl md:text-[2.6rem]"
      >
        {title}
      </Heading>
      {lede ? (
        <p className="mt-5 text-lg leading-relaxed text-warm-mist">{lede}</p>
      ) : null}
    </Reveal>
  );
}
