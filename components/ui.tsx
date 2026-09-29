"use client";
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

/** Word-by-word masked reveal when scrolled into view. */
export function SplitReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 6 }}
            animate={inView ? { y: 0, rotate: 0 } : {}}
            transition={{ delay: delay + i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionTitle({ kicker, title, color = "#e11d2e", center = false }: { kicker: string; title: string; color?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <motion.p
        className="mb-3 font-tech text-xs tracking-[0.4em]"
        style={{ color }}
        initial={{ opacity: 0, x: center ? 0 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {"// "}
        {kicker}
      </motion.p>
      <h2 className="font-display text-5xl leading-[0.95] tracking-wide text-white sm:text-7xl">
        <SplitReveal text={title} />
      </h2>
    </div>
  );
}

/** 3D tilt card with moving glare. */
export function TiltCard({ children, className = "", glow = "#e11d2e", style }: { children: React.ReactNode; className?: string; glow?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [12, -12]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 200, damping: 18 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, ${glow}55, transparent 55%)`;

  return (
    <motion.div
      ref={ref}
      data-hover
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      {children}
      <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} />
    </motion.div>
  );
}

const MotionLink = motion.create(Link);

/** Button that follows the cursor slightly. */
export function MagneticLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });

  return (
    <MotionLink
      ref={ref}
      href={href}
      style={{ x, y }}
      onPointerMove={(e: React.PointerEvent) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 font-tech text-xs uppercase tracking-[0.25em] transition-colors ${
        variant === "primary" ? "bg-[#e11d2e] text-white shadow-[0_0_40px_rgba(225,29,46,.5)]" : "border border-white/25 text-white hover:border-white"
      }`}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      <span className="relative transition-transform group-hover:translate-x-1">→</span>
    </MotionLink>
  );
}

const statKeys = ["strength", "speed", "intelligence", "combat", "energy"] as const;

export function StatRadar({ stats, color, size = 260 }: { stats: Record<(typeof statKeys)[number], number>; color: string; size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const c = 100, R = 78;
  const pt = (i: number, v: number) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return [c + Math.cos(a) * R * v, c + Math.sin(a) * R * v];
  };
  const poly = (f: (i: number) => number) => statKeys.map((_, i) => pt(i, f(i)).join(",")).join(" ");
  return (
    <svg ref={ref} width={size} height={size} viewBox="-20 -10 240 220" style={{ overflow: "visible" }}>
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon key={s} points={poly(() => s)} fill="none" stroke="rgba(255,255,255,.12)" />
      ))}
      {statKeys.map((k, i) => {
        const [x, y] = pt(i, 1);
        const [lx, ly] = pt(i, 1.28);
        return (
          <g key={k}>
            <line x1={c} y1={c} x2={x} y2={y} stroke="rgba(255,255,255,.12)" />
            <text x={lx} y={ly} fill="rgba(255,255,255,.6)" fontSize={9} textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "var(--font-orbitron)", letterSpacing: 1 }}>
              {k.toUpperCase()}
            </text>
          </g>
        );
      })}
      <motion.polygon
        points={poly((i) => stats[statKeys[i]] / 100)}
        fill={`${color}44`}
        stroke={color}
        strokeWidth={2}
        style={{ transformOrigin: "100px 100px", filter: `drop-shadow(0 0 8px ${color})` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export function StatBars({ stats, color }: { stats: Record<(typeof statKeys)[number], number>; color: string }) {
  return (
    <div className="space-y-4">
      {statKeys.map((k, i) => (
        <div key={k}>
          <div className="mb-1 flex justify-between font-tech text-[10px] tracking-[0.25em] text-white/60">
            <span>{k.toUpperCase()}</span>
            <span style={{ color }}>{stats[k]}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${color}66, ${color})`, boxShadow: `0 0 12px ${color}` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${stats[k]}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
