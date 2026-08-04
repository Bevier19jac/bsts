/**
 * Tracer underline — a title rule styled as the tracer of a fired round:
 * a fading gold line with a bright round traveling along it. Decorative,
 * hidden from assistive tech; animation is disabled under reduced motion
 * by the global reduced-motion rules.
 */
export function TracerRule({ className = "mt-4 max-w-xs" }: { className?: string }) {
  return <div aria-hidden="true" className={`tracer-line ${className}`} />;
}
