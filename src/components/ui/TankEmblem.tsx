/**
 * Original BSTS tank emblem — slate-grey armored silhouette, barrel to the
 * right, firing a gold tracer round. Drawn from scratch as geometric SVG to
 * match the site's premium dark language (no stock art, no clip-art).
 */
export function TankEmblem({
  className = "h-16 w-auto",
  withTracer = false,
}: {
  className?: string;
  withTracer?: boolean;
}) {
  return (
    <svg
      viewBox={withTracer ? "0 0 460 120" : "0 0 320 120"}
      className={className}
      role="img"
      aria-labelledby="tank-title tank-desc"
    >
      <title id="tank-title">BSTS tank emblem</title>
      <desc id="tank-desc">
        A slate-grey tank silhouette firing a gold tracer round from its main
        gun — the mark of a veteran-owned firm.
      </desc>
      <defs>
        <linearGradient id="tank-hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#67748a" />
          <stop offset="1" stopColor="#4a5468" />
        </linearGradient>
        <linearGradient id="tank-tracer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffdf9e" />
          <stop offset="1" stopColor="#ffdf9e" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Main gun */}
      <rect x="128" y="47" width="168" height="7" rx="3.5" fill="#5a6579" />
      <rect x="196" y="45" width="16" height="11" rx="3" fill="#67748a" />

      {/* Turret */}
      <path d="M72 62 L138 62 L128 38 L88 38 Q78 38 74 48 Z" fill="url(#tank-hull)" />
      <rect x="96" y="30" width="18" height="8" rx="3" fill="#5a6579" />

      {/* Hull */}
      <path d="M30 84 L186 84 L172 62 L46 62 Z" fill="url(#tank-hull)" />

      {/* Track assembly */}
      <rect x="22" y="80" width="176" height="28" rx="14" fill="#333c4d" />
      {[44, 74, 104, 134, 164].map((cx) => (
        <circle key={cx} cx={cx} cy="94" r="8.5" fill="#4a5468" stroke="#5f6b81" strokeWidth="1.5" />
      ))}
      <circle cx="33" cy="94" r="5.5" fill="#4a5468" stroke="#5f6b81" strokeWidth="1.5" />
      <circle cx="186" cy="94" r="5.5" fill="#4a5468" stroke="#5f6b81" strokeWidth="1.5" />

      {/* Muzzle flash */}
      <path
        d="M296 50.5 L308 44 L303 50.5 L308 57 Z"
        fill="#ffd98a"
        opacity="0.95"
      />

      {withTracer ? (
        <g>
          <rect x="306" y="48.5" width="150" height="4" rx="2" fill="url(#tank-tracer)" opacity="0.9" />
          <circle cx="380" cy="50.5" r="5" fill="#ffd98a" className="tracer-round" />
        </g>
      ) : null}
    </svg>
  );
}
