import { strategicLine } from "@/lib/content/positioning";

/**
 * The strategic line — the company in three sentences — with its colours.
 *
 * This exists because the footer had drifted. The hero rendered white / cyan /
 * gold; the footer retyped the same three strings as literals and coloured only
 * the third, so "Enable the AI." came out white there and cyan in the hero. Two
 * copies of the same sentence in two files is the kind of thing that stays
 * wrong until someone happens to look at both at once.
 *
 * Text and tone now live together in one place, so the two can no longer
 * disagree. Only size changes between usages.
 */
export const strategicLineTone = [
  "text-warm-white",
  "text-cyan-soft",
  "text-gold-soft",
] as const;

export function StrategicLine({ className = "" }: { className?: string }) {
  return (
    <>
      {strategicLine.map((line, i) => (
        <span key={line} className={`block ${strategicLineTone[i]} ${className}`}>
          {line}
        </span>
      ))}
    </>
  );
}
