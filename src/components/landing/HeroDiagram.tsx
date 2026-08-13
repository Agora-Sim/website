export function HeroDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 440"
      className={className}
      role="img"
      aria-label="Abstract network diagram representing policy levers, agents, and outcomes"
    >
      <defs>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="var(--rule)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="560" height="440" fill="url(#grid)" />

      {/* Faint Portugal silhouette (stylised) */}
      <g
        fill="none"
        stroke="var(--sage)"
        strokeWidth="1"
        opacity="0.35"
        transform="translate(168,58)"
      >
        <path d="M30 8 L60 4 L78 18 L86 44 L80 78 L96 110 L92 150 L104 188 L96 230 L82 268 L70 296 L50 318 L34 312 L26 286 L18 250 L22 216 L14 186 L20 152 L10 118 L18 84 L12 52 L20 26 Z" />
        {/* Lisboa dot */}
        <circle cx="36" cy="222" r="2.5" fill="var(--ember)" stroke="none" />
      </g>

      {/* edges */}
      <g stroke="var(--bluegrey)" strokeWidth="0.9" opacity="0.55" fill="none">
        <line x1="120" y1="120" x2="260" y2="90" />
        <line x1="260" y1="90" x2="400" y2="140" />
        <line x1="120" y1="120" x2="200" y2="240" />
        <line x1="200" y1="240" x2="340" y2="220" />
        <line x1="340" y1="220" x2="400" y2="140" />
        <line x1="340" y1="220" x2="460" y2="300" />
        <line x1="200" y1="240" x2="160" y2="350" />
        <line x1="160" y1="350" x2="320" y2="360" />
        <line x1="320" y1="360" x2="460" y2="300" />
        <line x1="260" y1="90" x2="200" y2="240" />
        <line x1="400" y1="140" x2="460" y2="300" />
      </g>

      {/* lever rails */}
      <g stroke="var(--ink)" strokeWidth="0.8" opacity="0.4">
        <line x1="40" y1="60" x2="40" y2="200" />
        <line x1="40" y1="240" x2="40" y2="380" />
        <circle cx="40" cy="120" r="3" fill="var(--ember)" />
        <circle cx="40" cy="310" r="3" fill="var(--ember)" />
      </g>

      {/* nodes */}
      <g>
        <circle cx="120" cy="120" r="9" fill="var(--bone)" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="260" cy="90" r="11" fill="var(--sage)" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="400" cy="140" r="9" fill="var(--bone)" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="200" cy="240" r="13" fill="var(--sage)" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="340" cy="220" r="10" fill="var(--bone)" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="160" cy="350" r="8" fill="var(--bone)" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="320" cy="360" r="9" fill="var(--bone)" stroke="var(--ink)" strokeWidth="1.2" />
        <circle cx="460" cy="300" r="12" fill="var(--ember)" stroke="var(--ink)" strokeWidth="1.2" />
      </g>

      {/* labels */}
      <g
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        fill="var(--bluegrey)"
        letterSpacing="1"
      >
        <text x="56" y="64">POLICY LEVERS</text>
        <text x="270" y="78">agent</text>
        <text x="412" y="138">constraint</text>
        <text x="212" y="238">system</text>
        <text x="470" y="304">outcome</text>
        <text x="100" y="402">t = 0 … T</text>
      </g>

      {/* axis */}
      <g stroke="var(--ink)" strokeWidth="0.6" opacity="0.5">
        <line x1="80" y1="408" x2="520" y2="408" />
        <line x1="80" y1="404" x2="80" y2="412" />
        <line x1="520" y1="404" x2="520" y2="412" />
      </g>
    </svg>
  );
}
