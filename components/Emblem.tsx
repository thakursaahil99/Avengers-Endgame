import type { EmblemId } from "@/lib/heroes";

const C = 100;

function star(n: number, outer: number, inner: number, cx = C, cy = C, rot = -90) {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? inner : outer;
    const a = ((rot + (i * 180) / n) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

function wedge(r1: number, r2: number, a0: number, a1: number) {
  const p = (r: number, a: number) => `${(C + r * Math.cos((a * Math.PI) / 180)).toFixed(2)} ${(C + r * Math.sin((a * Math.PI) / 180)).toFixed(2)}`;
  return `M ${p(r1, a0)} L ${p(r2, a0)} A ${r2} ${r2} 0 0 1 ${p(r2, a1)} L ${p(r1, a1)} A ${r1} ${r1} 0 0 0 ${p(r1, a0)} Z`;
}

function spiral(turns = 3, r = 70) {
  const pts: string[] = [];
  const steps = turns * 60;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * Math.PI * 2;
    pts.push(`${(C + Math.cos(a) * r * t).toFixed(2)},${(C + Math.sin(a) * r * t).toFixed(2)}`);
  }
  return pts.join(" ");
}

function Art({ id, c, a }: { id: EmblemId; c: string; a: string }) {
  switch (id) {
    case "ironman":
      return (
        <g>
          <circle cx={C} cy={C} r={72} fill="none" stroke={c} strokeWidth={6} />
          <g className="spin-slow">
            {Array.from({ length: 12 }, (_, i) => (
              <rect key={i} x={96} y={32} width={8} height={18} rx={2} fill="#9ca3af" transform={`rotate(${i * 30} ${C} ${C})`} />
            ))}
          </g>
          <circle cx={C} cy={C} r={46} fill="#0ea5e9" opacity={0.25} className="pulse-glow" />
          <polygon points="100,62 136,124 64,124" fill="none" stroke="#e0f2fe" strokeWidth={6} strokeLinejoin="round" className="pulse-glow" />
          <circle cx={C} cy={105} r={16} fill="#e0f2fe" className="pulse-glow" />
        </g>
      );
    case "cap":
      return (
        <g className="spin-slow">
          <circle cx={C} cy={C} r={82} fill={a} />
          <circle cx={C} cy={C} r={66} fill="#f1f5f9" />
          <circle cx={C} cy={C} r={50} fill={a} />
          <circle cx={C} cy={C} r={34} fill={c} />
          <polygon points={star(5, 30, 12)} fill="#f1f5f9" />
        </g>
      );
    case "thor":
      return (
        <g>
          <polyline points="130,10 104,70 128,74 92,140 110,142 70,196" fill="none" stroke={a} strokeWidth={4} className="pulse-glow" />
          <rect x={48} y={46} width={104} height={56} rx={8} fill="#94a3b8" stroke="#e2e8f0" strokeWidth={3} />
          <rect x={58} y={56} width={84} height={36} rx={4} fill="none" stroke="#475569" strokeWidth={3} />
          <rect x={92} y={102} width={16} height={72} rx={4} fill="#78350f" />
          <path d="M92 118 L108 126 M92 134 L108 142 M92 150 L108 158" stroke="#a16207" strokeWidth={3} />
          <circle cx={C} cy={182} r={7} fill="#64748b" />
        </g>
      );
    case "hulk":
      return (
        <g>
          <circle cx={C} cy={C} r={80} fill="none" stroke={c} strokeWidth={4} strokeDasharray="6 8" className="spin-rev" />
          <g className="spin-slow">
            {[-90, 30, 150].map((ang) => (
              <path key={ang} d={wedge(24, 72, ang - 30, ang + 30)} fill={c} />
            ))}
          </g>
          <circle cx={C} cy={C} r={16} fill={c} className="pulse-glow" />
        </g>
      );
    case "widow":
      return (
        <g>
          <circle cx={C} cy={C} r={76} fill="#111" stroke={c} strokeWidth={4} />
          <polygon points="64,48 136,48 100,98" fill={c} className="pulse-glow" />
          <polygon points="64,152 136,152 100,102" fill={c} className="pulse-glow" />
        </g>
      );
    case "hawkeye":
      return (
        <g>
          {[78, 58, 38, 18].map((r, i) => (
            <circle key={r} cx={C} cy={C} r={r} fill="none" stroke={i % 2 ? a : c} strokeWidth={8} />
          ))}
          <g className="pulse-glow">
            <line x1={30} y1={170} x2={100} y2={100} stroke="#e5e7eb" strokeWidth={5} />
            <polygon points="100,100 84,104 96,116" fill="#e5e7eb" />
            <path d="M30 170 L22 160 M30 170 L40 178 M38 162 L30 152 M38 162 L48 170" stroke={a} strokeWidth={4} />
          </g>
        </g>
      );
    case "marvel":
      return (
        <g>
          <circle cx={C} cy={C} r={80} fill={a} opacity={0.3} />
          <g className="spin-slow">
            <polygon points={star(8, 74, 28)} fill={c} />
          </g>
          <polygon points={star(5, 34, 14)} fill="#fff7ed" className="pulse-glow" />
        </g>
      );
    case "spidey":
      return (
        <g>
          <circle cx={C} cy={C} r={80} fill={c} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={i} x1={C} y1={C} x2={C + 80 * Math.cos((i * Math.PI) / 4)} y2={C + 80 * Math.sin((i * Math.PI) / 4)} stroke="#111" strokeWidth={1.5} opacity={0.6} />
          ))}
          {[26, 48, 70].map((r) => (
            <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="#111" strokeWidth={1.5} opacity={0.6} />
          ))}
          <g className="pulse-glow" fill="#111" stroke="#111" strokeWidth={4} strokeLinecap="round">
            <ellipse cx={C} cy={82} rx={10} ry={12} />
            <ellipse cx={C} cy={112} rx={12} ry={20} />
            <polyline fill="none" points="92,90 60,66 50,40" />
            <polyline fill="none" points="108,90 140,66 150,40" />
            <polyline fill="none" points="90,100 56,98 40,80" />
            <polyline fill="none" points="110,100 144,98 160,80" />
            <polyline fill="none" points="90,112 58,124 44,148" />
            <polyline fill="none" points="110,112 142,124 156,148" />
            <polyline fill="none" points="92,122 70,148 66,176" />
            <polyline fill="none" points="108,122 130,148 134,176" />
          </g>
        </g>
      );
    case "strange":
      return (
        <g>
          <g className="spin-slow">
            <circle cx={C} cy={C} r={84} fill="none" stroke={c} strokeWidth={3} />
            <circle cx={C} cy={C} r={74} fill="none" stroke={c} strokeWidth={2} strokeDasharray="3 5" />
            <rect x={48} y={48} width={104} height={104} fill="none" stroke={c} strokeWidth={3} />
            <rect x={48} y={48} width={104} height={104} fill="none" stroke={c} strokeWidth={3} transform={`rotate(45 ${C} ${C})`} />
          </g>
          <g className="spin-rev">
            <circle cx={C} cy={C} r={44} fill="none" stroke={c} strokeWidth={2} strokeDasharray="10 4" />
          </g>
          <ellipse cx={C} cy={C} rx={30} ry={16} fill="#0f172a" stroke={c} strokeWidth={3} />
          <circle cx={C} cy={C} r={10} fill={a} className="pulse-glow" />
        </g>
      );
    case "panther":
      return (
        <g>
          <circle cx={C} cy={C} r={78} fill="#0b0b12" stroke={c} strokeWidth={4} />
          <g className="pulse-glow" fill="none" stroke={a} strokeWidth={9} strokeLinecap="round">
            <path d="M58 44 Q 80 100 62 158" />
            <path d="M92 36 Q 114 100 96 166" />
            <path d="M126 44 Q 148 100 130 158" />
          </g>
        </g>
      );
    case "antman":
      return (
        <g>
          <circle cx={C} cy={C} r={80} fill="#1f2937" stroke={a} strokeWidth={6} />
          <circle cx={C} cy={C} r={62} fill={c} />
          <path d="M60 150 L100 48 L140 150 L120 150 L100 96 L80 150 Z" fill="#111827" className="pulse-glow" />
          <rect x={82} y={118} width={36} height={12} fill="#111827" />
          <g className="spin-rev">
            <circle cx={C} cy={C} r={90} fill="none" stroke={a} strokeWidth={2} strokeDasharray="2 10" />
          </g>
        </g>
      );
    case "wanda":
      return (
        <g>
          <g className="spin-slow">
            <polyline points={spiral(3, 76)} fill="none" stroke={c} strokeWidth={5} strokeLinecap="round" />
          </g>
          <g className="spin-rev" opacity={0.6}>
            <polyline points={spiral(2, 60)} fill="none" stroke={a} strokeWidth={3} transform={`rotate(180 ${C} ${C})`} />
          </g>
          <circle cx={C} cy={C} r={14} fill={c} className="pulse-glow" />
        </g>
      );
    case "rocket":
      return (
        <g>
          <circle cx={C} cy={C} r={80} fill="none" stroke={c} strokeWidth={3} strokeDasharray="14 6" className="spin-slow" />
          <g transform={`rotate(45 ${C} ${C})`}>
            <path d="M100 28 C 124 52 124 110 116 140 L84 140 C 76 110 76 52 100 28 Z" fill="#e5e7eb" stroke={a} strokeWidth={3} />
            <circle cx={C} cy={78} r={12} fill={c} />
            <path d="M84 118 L64 150 L84 142 Z M116 118 L136 150 L116 142 Z" fill={c} />
            <path d="M88 142 L100 180 L112 142 Z" fill="#f59e0b" className="pulse-glow" />
          </g>
        </g>
      );
    case "nebula":
      return (
        <g>
          <polygon points={star(6, 80, 80, C, C, 0).split(" ").filter((_, i) => i % 2 === 0).join(" ")} fill="#0f172a" stroke={c} strokeWidth={4} />
          <g stroke={a} strokeWidth={3} fill="none">
            <path d="M40 100 H70 L84 80 H116 L130 100 H160" />
            <path d="M70 130 H96 L106 144 H130" />
            <path d="M68 70 H92 L100 56" />
          </g>
          <circle cx={84} cy={80} r={5} fill={c} className="pulse-glow" />
          <circle cx={116} cy={80} r={5} fill={c} className="pulse-glow" />
          <circle cx={130} cy={144} r={5} fill={c} className="pulse-glow" />
        </g>
      );
    case "warmachine":
      return (
        <g>
          <circle cx={C} cy={C} r={82} fill="none" stroke={c} strokeWidth={3} strokeDasharray="20 8" className="spin-slow" />
          <circle cx={C} cy={C} r={56} fill="none" stroke={c} strokeWidth={5} />
          <g stroke={a} strokeWidth={5}>
            <line x1={C} y1={20} x2={C} y2={66} />
            <line x1={C} y1={134} x2={C} y2={180} />
            <line x1={20} y1={C} x2={66} y2={C} />
            <line x1={134} y1={C} x2={180} y2={C} />
          </g>
          <circle cx={C} cy={C} r={8} fill={a} className="pulse-glow" />
          <g className="spin-rev">
            <rect x={70} y={70} width={60} height={60} fill="none" stroke={c} strokeWidth={2} transform={`rotate(45 ${C} ${C})`} />
          </g>
        </g>
      );
    case "falcon":
      return (
        <g>
          <circle cx={C} cy={C} r={20} fill={c} className="pulse-glow" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <path d={`M92 ${96 + i * 4} Q ${60 - i * 8} ${70 - i * 12} ${14 + i * 4} ${60 + i * 16} Q 60 ${110 + i * 4} 92 ${108 + i * 4}`} fill={i % 2 ? a : c} opacity={0.9 - i * 0.12} />
              <path d={`M108 ${96 + i * 4} Q ${140 + i * 8} ${70 - i * 12} ${186 - i * 4} ${60 + i * 16} Q 140 ${110 + i * 4} 108 ${108 + i * 4}`} fill={i % 2 ? a : c} opacity={0.9 - i * 0.12} />
            </g>
          ))}
        </g>
      );
    case "wasp":
      return (
        <g>
          <g className="pulse-glow" opacity={0.75}>
            <ellipse cx={62} cy={70} rx={40} ry={18} fill={c} transform="rotate(-30 62 70)" />
            <ellipse cx={138} cy={70} rx={40} ry={18} fill={c} transform="rotate(30 138 70)" />
            <ellipse cx={66} cy={120} rx={30} ry={12} fill={c} transform="rotate(25 66 120)" />
            <ellipse cx={134} cy={120} rx={30} ry={12} fill={c} transform="rotate(-25 134 120)" />
          </g>
          <ellipse cx={C} cy={C} rx={14} ry={50} fill={a} stroke={c} strokeWidth={3} />
          <path d="M88 90 H112 M86 108 H114 M90 126 H110" stroke={c} strokeWidth={5} />
          <circle cx={C} cy={50} r={12} fill={a} stroke={c} strokeWidth={3} />
        </g>
      );
    case "thanos":
      return (
        <g>
          <path d="M58 190 L62 110 L140 110 L144 190 Z" fill="#b45309" stroke={a} strokeWidth={3} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={62 + i * 20} y={36 + (i === 0 || i === 3 ? 18 : 0)} width={17} height={82 - (i === 0 || i === 3 ? 18 : 0)} rx={8} fill="#d97706" stroke={a} strokeWidth={2} />
          ))}
          <rect x={138} y={92} width={17} height={50} rx={8} fill="#d97706" stroke={a} strokeWidth={2} transform="rotate(-35 146 116)" />
          {["#3b82f6", "#facc15", "#ef4444", "#a855f7"].map((col, i) => (
            <circle key={col} cx={70 + i * 20} cy={70 + (i === 0 || i === 3 ? 10 : 0)} r={6} fill={col} className="pulse-glow" />
          ))}
          <circle cx={148} cy={108} r={6} fill="#f97316" className="pulse-glow" />
          <circle cx={101} cy={148} r={13} fill="#22c55e" className="pulse-glow" />
        </g>
      );
  }
}

export default function Emblem({ id, color, accent, size = 200, ring = true }: { id: EmblemId; color: string; accent: string; size?: number; ring?: boolean }) {
  // Small emblems are rendered static (no spin/pulse, no glow filter) — cheap enough to show dozens at once.
  const small = size < 80;
  return (
    <svg
      width={size}
      height={size}
      viewBox="-10 -10 220 220"
      className={small ? "emblem-static" : undefined}
      style={{ overflow: "visible", filter: small ? undefined : `drop-shadow(0 0 14px ${color}aa)` }}
      aria-hidden
    >
      <defs>
        <radialGradient id={`halo-${id}`}>
          <stop offset="0%" stopColor={color} stopOpacity={0.45} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      {!small && <circle cx={C} cy={C} r={108} fill={`url(#halo-${id})`} className="pulse-glow" />}
      {ring && !small && (
        <g className="spin-rev" opacity={0.6}>
          <circle cx={C} cy={C} r={100} fill="none" stroke={color} strokeWidth={1} strokeDasharray="1 7" />
        </g>
      )}
      <Art id={id} c={color} a={accent} />
    </svg>
  );
}
