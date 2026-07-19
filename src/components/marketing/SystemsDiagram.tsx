/**
 * Original SVG diagram: disconnected systems on the left flow through the
 * BSTS core into a connected constellation on the right. Decorative motion
 * uses CSS dash animation, disabled under reduced motion.
 */
export function SystemsDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 360"
      className={className}
      role="img"
      aria-labelledby="sysd-title sysd-desc"
    >
      <title id="sysd-title">From disconnected tools to a connected stack</title>
      <desc id="sysd-desc">
        Diagram showing separate systems — bookings, operations, payments, and
        messages — flowing through the BSTS core and emerging as one connected
        constellation around a unified record.
      </desc>
      <defs>
        <linearGradient id="sysd-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-warm-dim)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--color-cyan-core)" />
        </linearGradient>
        <style>{`
          .sysd-dash { stroke-dasharray: 6 10; animation: sysd-flow 3.2s linear infinite; }
          @keyframes sysd-flow { to { stroke-dashoffset: -64; } }
          @media (prefers-reduced-motion: reduce) { .sysd-dash { animation: none; } }
        `}</style>
      </defs>

      {/* Disconnected side */}
      {[
        { x: 60, y: 60, label: "Bookings" },
        { x: 40, y: 150, label: "Operations" },
        { x: 70, y: 240, label: "Payments" },
        { x: 50, y: 320, label: "Messages" },
      ].map((n) => (
        <g key={n.label}>
          <rect
            x={n.x - 34}
            y={n.y - 22}
            width="112"
            height="44"
            rx="22"
            fill="var(--color-graphite-2)"
            stroke="var(--color-edge)"
          />
          <text
            x={n.x + 22}
            y={n.y + 5}
            textAnchor="middle"
            fill="var(--color-warm-mist)"
            fontSize="13"
            fontFamily="var(--font-sans)"
          >
            {n.label}
          </text>
          <path
            className="sysd-dash"
            d={`M ${n.x + 82} ${n.y} C ${n.x + 160} ${n.y}, 240 180, 302 180`}
            fill="none"
            stroke="url(#sysd-flow)"
            strokeWidth="1.6"
            opacity="0.8"
          />
        </g>
      ))}

      {/* BSTS core */}
      <circle cx="322" cy="180" r="34" fill="var(--color-obsidian-deep)" stroke="var(--color-cyan-core)" strokeWidth="1.6" />
      <circle cx="322" cy="180" r="6" fill="var(--color-gold-core)" />
      <text x="322" y="238" textAnchor="middle" fill="var(--color-cyan-soft)" fontSize="12" letterSpacing="2" fontFamily="var(--font-sans)">
        BSTS
      </text>

      {/* Connected constellation */}
      <g>
        {[
          { x: 520, y: 70, label: "One record" },
          { x: 575, y: 160, label: "Automation" },
          { x: 545, y: 255, label: "Insight" },
          { x: 470, y: 320, label: "Security" },
        ].map((n) => (
          <g key={n.label}>
            <path
              className="sysd-dash"
              d={`M 356 180 C 410 180, ${n.x - 70} ${n.y}, ${n.x - 36} ${n.y}`}
              fill="none"
              stroke="var(--color-cyan-core)"
              strokeWidth="1.6"
              opacity="0.7"
            />
            <circle cx={n.x} cy={n.y} r="8" fill="var(--color-cyan-core)" opacity="0.9" />
            <text
              x={n.x}
              y={n.y - 16}
              textAnchor="middle"
              fill="var(--color-warm-mist)"
              fontSize="12"
              fontFamily="var(--font-sans)"
            >
              {n.label}
            </text>
          </g>
        ))}
        {/* constellation links */}
        <path
          d="M 520 70 L 575 160 L 545 255 L 470 320"
          fill="none"
          stroke="var(--color-gold-core)"
          strokeWidth="1"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}
