"use client";
import { AnimatePresence, motion, useAnimationControls, useInView } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FxType, Hero } from "@/lib/heroes";
import Emblem from "./Emblem";
import { useLite } from "@/lib/perf";

/* ---------------------------------------------------------------------------
 * Timing: when (seconds) each effect lands on the target, and total length.
 * ------------------------------------------------------------------------- */
export const FX_TIMING: Record<FxType, { impact: number; total: number; shake?: boolean }> = {
  beam: { impact: 0.55, total: 1.4 },
  lightning: { impact: 0.4, total: 1.3, shake: true },
  shield: { impact: 0.5, total: 1.2 },
  smash: { impact: 0.85, total: 1.6, shake: true },
  arrows: { impact: 0.85, total: 1.3 },
  electric: { impact: 0.45, total: 1.3 },
  web: { impact: 0.85, total: 1.5 },
  portal: { impact: 0.8, total: 1.6 },
  claws: { impact: 0.5, total: 1.2 },
  shrink: { impact: 0.9, total: 1.7, shake: true },
  hex: { impact: 0.8, total: 1.7 },
  missiles: { impact: 0.8, total: 1.5, shake: true },
  dive: { impact: 0.83, total: 1.5 },
  snap: { impact: 0.4, total: 2.4, shake: true },
};

type P = { c: string; a: string; sx: number; tx: number; cy: number; W: number; H: number };

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function bolt(x1: number, y1: number, x2: number, y2: number, seg = 10, jitter = 18) {
  const pts: string[] = [];
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    const j = i === 0 || i === seg ? 0 : rand(-jitter, jitter);
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    pts.push(`${x1 + dx * t + (-dy / len) * j},${y1 + dy * t + (dx / len) * j}`);
  }
  return pts.join(" ");
}

/* ------------------------------ Effects ---------------------------------- */

function Beam({ c, a, sx, tx, cy }: P) {
  const len = tx - sx;
  return (
    <>
      <motion.div
        className="absolute rounded-full"
        style={{ left: sx - 40, top: cy - 40, width: 80, height: 80, background: `radial-gradient(circle, #fff 0 15%, ${c} 35%, transparent 70%)` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.7, 1.3, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.3, times: [0, 0.3, 0.8, 1] }}
      />
      <motion.div
        className="absolute origin-left rounded-full"
        style={{ left: sx, top: cy - 16, width: len, height: 32, background: `linear-gradient(90deg, ${c}, ${a} 50%, ${c})`, boxShadow: `0 0 30px ${c}, 0 0 80px ${c}` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1, 1], opacity: [1, 1, 1, 0], scaleY: [0.4, 1, 1.4, 0] }}
        transition={{ delay: 0.35, duration: 0.95, times: [0, 0.2, 0.7, 1] }}
      />
      <motion.div
        className="absolute origin-left rounded-full bg-white"
        style={{ left: sx, top: cy - 4, width: len, height: 8 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ delay: 0.35, duration: 0.9, times: [0, 0.2, 1] }}
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[3px] w-10 rounded-full"
          style={{ left: sx, top: cy + rand(-30, 30), background: a }}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: len, opacity: [0, 1, 0] }}
          transition={{ delay: 0.4 + i * 0.07, duration: 0.35 }}
        />
      ))}
    </>
  );
}

function Lightning({ c, a, sx, tx, cy, W, H }: P) {
  const bolts = useMemo(
    () => [
      ...[0, 1, 2].map(() => bolt(tx + rand(-60, 60), 0, tx + rand(-10, 10), cy, 12, 22)),
      bolt(sx, cy, tx, cy, 14, 26),
      bolt(sx, cy, tx, cy, 10, 16),
    ],
    [sx, tx, cy]
  );
  return (
    <>
      <motion.div className="absolute inset-0" style={{ background: `radial-gradient(circle at ${tx}px ${cy}px, ${a}88, transparent 60%)` }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0, 0.6, 0] }} transition={{ delay: 0.2, duration: 0.8 }} />
      <svg className="absolute inset-0" width={W} height={H} style={{ filter: `drop-shadow(0 0 6px ${c}) drop-shadow(0 0 16px ${c})` }}>
        {bolts.map((p, i) => (
          <motion.polyline
            key={i}
            points={p}
            fill="none"
            stroke={i % 2 ? a : "#ffffff"}
            strokeWidth={i > 2 ? 4 : 3}
            strokeLinejoin="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 1, 0.2, 1, 0.4, 1, 0], pathLength: 1 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.95, pathLength: { duration: 0.12, delay: 0.15 + i * 0.05 } }}
          />
        ))}
      </svg>
    </>
  );
}

function Shield({ sx, tx, cy }: P) {
  const dx = tx - sx;
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: sx - 26,
        top: cy - 26,
        width: 52,
        height: 52,
        background: "radial-gradient(circle, #f1f5f9 0 12%, #2563eb 12% 30%, #ef4444 30% 50%, #f1f5f9 50% 70%, #ef4444 70%)",
        boxShadow: "0 0 20px #60a5fa, -30px 0 30px -10px #60a5fa88",
      }}
      initial={{ x: 0, y: 0, rotate: 0, scale: 0.6 }}
      animate={{ x: [0, dx, dx * 0.5, 0], y: [0, 0, -70, 0], rotate: [0, 720, 1080, 1440], scale: [0.6, 1.1, 1, 0.6] }}
      transition={{ duration: 1.15, times: [0, 0.43, 0.72, 1], ease: "easeInOut" }}
    />
  );
}

function Smash({ c, a, sx, tx, cy, W, H }: P) {
  const dx = tx - sx;
  const ground = cy + 55;
  const cracks = useMemo(() => [0, 1, 2].map(() => bolt(sx, ground, tx + 30, ground + rand(-8, 8), 12, 7)), [sx, tx, ground]);
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-[50%] border-4"
          style={{ left: sx - 20, top: ground - 6, width: 40, height: 12, borderColor: i === 1 ? a : c, boxShadow: `0 0 20px ${c}` }}
          initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
          animate={{ scaleX: (dx * 2.4) / 40, scaleY: 4, opacity: [0, 1, 0] }}
          transition={{ delay: 0.55 + i * 0.1, duration: 0.7, ease: "easeOut" }}
        />
      ))}
      <svg className="absolute inset-0" width={W} height={H} style={{ filter: `drop-shadow(0 0 8px ${c})` }}>
        {cracks.map((p, i) => (
          <motion.polyline key={i} points={p} fill="none" stroke={c} strokeWidth={3} initial={{ pathLength: 0, opacity: 1 }} animate={{ pathLength: 1, opacity: [1, 1, 0] }} transition={{ delay: 0.58, duration: 1, pathLength: { duration: 0.3, delay: 0.58 } }} />
        ))}
      </svg>
      {Array.from({ length: 14 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm"
          style={{ left: sx + rand(-40, dx), top: ground, width: rand(6, 14), height: rand(6, 14), background: "#57534e" }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, -rand(40, 120), 10], opacity: [0, 1, 0], rotate: rand(-200, 200) }}
          transition={{ delay: 0.6 + rand(0, 0.25), duration: 0.8 }}
        />
      ))}
    </>
  );
}

function Arrows({ c, a, sx, tx, cy }: P) {
  const dx = tx - sx;
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => {
        const off = (i - 2) * 10;
        return (
          <motion.svg
            key={i}
            width={56}
            height={12}
            className="absolute"
            style={{ left: sx, top: cy - 6 + off, filter: `drop-shadow(0 0 6px ${c})` }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: dx - 40, y: [0, -30, -off], rotate: [-12, 0, 10], opacity: [1, 1, 0] }}
            transition={{ delay: 0.25 + i * 0.12, duration: 0.38, ease: "easeIn", opacity: { times: [0, 0.9, 1], delay: 0.25 + i * 0.12, duration: 0.4 } }}
          >
            <line x1={0} y1={6} x2={46} y2={6} stroke="#e5e7eb" strokeWidth={2} />
            <polygon points="44,1 56,6 44,11" fill={a} />
            <path d="M0 6 L6 1 M0 6 L6 11" stroke={c} strokeWidth={2} />
          </motion.svg>
        );
      })}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`b${i}`}
          className="absolute rounded-full"
          style={{ left: tx - 20 + rand(-20, 20), top: cy - 20 + (i - 2) * 12, width: 40, height: 40, background: `radial-gradient(circle, #fff, ${a} 40%, transparent 70%)` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5], opacity: [1, 0] }}
          transition={{ delay: 0.62 + i * 0.12, duration: 0.35 }}
        />
      ))}
    </>
  );
}

function Electric({ c, a, tx, cy, W, H }: P) {
  const sparks = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const ang = (i / 9) * Math.PI * 2 + rand(-0.3, 0.3);
        const r = rand(50, 90);
        return bolt(tx, cy, tx + Math.cos(ang) * r, cy + Math.sin(ang) * r, 6, 8);
      }),
    [tx, cy]
  );
  return (
    <>
      <motion.div className="absolute rounded-full" style={{ left: tx - 70, top: cy - 70, width: 140, height: 140, background: `radial-gradient(circle, ${a}aa, ${c}44 40%, transparent 70%)` }} initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1, 1.3, 0], opacity: [0, 1, 0.6, 1, 0] }} transition={{ delay: 0.35, duration: 0.9 }} />
      <svg className="absolute inset-0" width={W} height={H} style={{ filter: `drop-shadow(0 0 6px ${a})` }}>
        {sparks.map((p, i) => (
          <motion.polyline key={i} points={p} fill="none" stroke={i % 3 ? "#e0f2fe" : a} strokeWidth={2.5} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0, 1, 0, 1, 0] }} transition={{ delay: 0.4 + (i % 3) * 0.05, duration: 0.8 }} />
        ))}
      </svg>
    </>
  );
}

function Web({ sx, tx, cy }: P) {
  const dx = tx - sx;
  return (
    <>
      <motion.div className="absolute origin-left bg-white" style={{ left: sx, top: cy - 1, width: dx, height: 2, boxShadow: "0 0 6px #fff" }} initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }} transition={{ duration: 0.9, times: [0, 0.25, 1] }} />
      <motion.svg
        width={170}
        height={170}
        viewBox="-85 -85 170 170"
        className="absolute"
        style={{ left: tx - 85, top: cy - 85, filter: "drop-shadow(0 0 4px #fff)" }}
        initial={{ scale: 0, opacity: 0, rotate: -40 }}
        animate={{ scale: [0, 1.15, 1], opacity: [1, 1, 1, 0], rotate: 0 }}
        transition={{ delay: 0.22, duration: 1.2, opacity: { times: [0, 0.2, 0.8, 1], duration: 1.2, delay: 0.22 } }}
      >
        {Array.from({ length: 10 }, (_, i) => {
          const ang = (i / 10) * Math.PI * 2;
          return <line key={i} x1={0} y1={0} x2={Math.cos(ang) * 80} y2={Math.sin(ang) * 80} stroke="#fff" strokeWidth={1.5} />;
        })}
        {[20, 40, 60, 78].map((r) => (
          <polygon key={r} points={Array.from({ length: 10 }, (_, i) => `${Math.cos((i / 10) * Math.PI * 2) * r},${Math.sin((i / 10) * Math.PI * 2) * r}`).join(" ")} fill="none" stroke="#fff" strokeWidth={1.2} />
        ))}
      </motion.svg>
    </>
  );
}

function Portal({ c, a, sx, tx, cy }: P) {
  const ring = (size: number, dur: number, rev = false, delay = 0, left = tx, color = c) => (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: left - size / 2,
        top: cy - size / 2,
        width: size,
        height: size,
        background: `repeating-conic-gradient(${color} 0 5deg, transparent 5deg 11deg)`,
        WebkitMask: "radial-gradient(circle, transparent 58%, black 60%, black 70%, transparent 72%)",
        mask: "radial-gradient(circle, transparent 58%, black 60%, black 70%, transparent 72%)",
        filter: `drop-shadow(0 0 10px ${color})`,
      }}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ scale: [0, 1.1, 1, 0], rotate: rev ? -540 : 540, opacity: [0, 1, 1, 0] }}
      transition={{ delay, duration: dur, times: [0, 0.2, 0.85, 1] }}
    />
  );
  return (
    <>
      {ring(110, 1.5, false, 0, sx)}
      {ring(190, 1.5, false, 0.2)}
      {ring(140, 1.5, true, 0.3, tx, a)}
      {[-26, 0, 26].map((o, i) => (
        <motion.div
          key={o}
          className="absolute rounded-[50%] border-[3px]"
          style={{ left: tx - 70, top: cy + o - 12, width: 140, height: 24, borderColor: c, boxShadow: `0 0 14px ${c}, inset 0 0 10px ${c}` }}
          initial={{ scaleX: 2.4, opacity: 0 }}
          animate={{ scaleX: [2.4, 0.75, 0.8], opacity: [0, 1, 1, 0] }}
          transition={{ delay: 0.55 + i * 0.08, duration: 1, opacity: { times: [0, 0.2, 0.8, 1], duration: 1, delay: 0.55 + i * 0.08 } }}
        />
      ))}
    </>
  );
}

function Claws({ c, a, tx, cy }: P) {
  return (
    <>
      <svg width={180} height={180} viewBox="0 0 180 180" className="absolute" style={{ left: tx - 90, top: cy - 90, filter: `drop-shadow(0 0 8px ${c}) drop-shadow(0 0 20px ${c})` }}>
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M ${30 + i * 36} 20 Q ${70 + i * 36} 90 ${40 + i * 36} 165`}
            fill="none"
            stroke={i === 1 ? "#fff" : a}
            strokeWidth={7}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: [1, 1, 0] }}
            transition={{ delay: 0.32 + i * 0.07, duration: 0.8, pathLength: { duration: 0.14, delay: 0.32 + i * 0.07 } }}
          />
        ))}
      </svg>
      <motion.div className="absolute rounded-full border-4" style={{ left: tx - 40, top: cy - 40, width: 80, height: 80, borderColor: c, boxShadow: `0 0 30px ${c}` }} initial={{ scale: 0, opacity: 1 }} animate={{ scale: 3.2, opacity: 0 }} transition={{ delay: 0.55, duration: 0.7 }} />
    </>
  );
}

function Shrink({ c, a, sx, tx, cy, H }: P) {
  return (
    <>
      <motion.div className="absolute h-3 w-3 rounded-full" style={{ left: sx - 6, top: cy - 6, background: c, boxShadow: `0 0 12px ${c}, 0 0 24px ${a}` }} initial={{ x: 0, opacity: 0 }} animate={{ x: [0, 0, tx - sx], y: [0, -40, 0], opacity: [0, 1, 1, 0] }} transition={{ delay: 0.25, duration: 0.5 }} />
      <motion.div
        className="absolute rounded-t-[45%] rounded-b-2xl border-4"
        style={{ left: tx - 90, top: cy - 170, width: 180, height: 150, background: `linear-gradient(180deg, ${c}, #1f2937)`, borderColor: a, boxShadow: `0 0 40px ${c}` }}
        initial={{ y: -H, opacity: 0 }}
        animate={{ y: [-H, -H * 0.6, 60, 60], opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.62, duration: 1, times: [0, 0.15, 0.3, 1], ease: "easeIn" }}
      />
      <motion.div className="absolute rounded-[50%] border-4" style={{ left: tx - 30, top: cy + 45, width: 60, height: 16, borderColor: c }} initial={{ scale: 0, opacity: 1 }} animate={{ scaleX: 7, scaleY: 3, opacity: 0 }} transition={{ delay: 0.9, duration: 0.6 }} />
    </>
  );
}

function Hex({ c, a, sx, tx, cy, W, H }: P) {
  const paths = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const mx = (sx + tx) / 2;
        return `M ${sx} ${cy} C ${mx - 60} ${cy + rand(-160, 160)}, ${mx + 60} ${cy + rand(-160, 160)}, ${tx + rand(-30, 30)} ${cy - 20 + i * 8}`;
      }),
    [sx, tx, cy]
  );
  return (
    <>
      <svg className="absolute inset-0" width={W} height={H} style={{ filter: `drop-shadow(0 0 8px ${c}) drop-shadow(0 0 18px ${c})` }}>
        {paths.map((d, i) => (
          <motion.path key={i} d={d} fill="none" stroke={i % 2 ? a : c} strokeWidth={i % 2 ? 2 : 4} strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0.7, 1, 0] }} transition={{ delay: 0.15 + i * 0.05, duration: 1.4 }} />
        ))}
      </svg>
      <motion.div className="absolute rounded-full" style={{ left: tx - 100, top: cy - 120, width: 200, height: 200, background: `radial-gradient(circle, ${c}99, ${c}22 50%, transparent 70%)` }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1, 1.2, 0.9, 0], opacity: [0, 1, 0.8, 1, 0] }} transition={{ delay: 0.6, duration: 1.1 }} />
    </>
  );
}

function Missiles({ c, a, sx, tx, cy }: P) {
  const flights = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const x0 = sx, y0 = cy - 30;
        const x2 = tx + rand(-30, 30), y2 = cy + rand(-30, 30);
        const x1 = (x0 + x2) / 2 + rand(-60, 60), y1 = cy - rand(120, 240);
        const xs: number[] = [], ys: number[] = [], rs: number[] = [];
        for (let k = 0; k <= 10; k++) {
          const t = k / 10;
          const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
          const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t * t * y2;
          const ddx = 2 * (1 - t) * (x1 - x0) + 2 * t * (x2 - x1);
          const ddy = 2 * (1 - t) * (y1 - y0) + 2 * t * (y2 - y1);
          xs.push(x - 10); ys.push(y - 3); rs.push((Math.atan2(ddy, ddx) * 180) / Math.PI);
        }
        return { xs, ys, rs, delay: 0.1 + i * 0.07, x2, y2 };
      }),
    [sx, tx, cy]
  );
  return (
    <>
      {flights.map((f, i) => (
        <motion.div key={i} className="absolute left-0 top-0 h-[6px] w-5 rounded-full" style={{ background: `linear-gradient(90deg, ${a}, #fff)`, boxShadow: `-14px 0 12px ${a}, 0 0 6px ${c}` }} initial={{ x: f.xs[0], y: f.ys[0], opacity: 0 }} animate={{ x: f.xs, y: f.ys, rotate: f.rs, opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] }} transition={{ delay: f.delay, duration: 0.6, ease: "linear" }} />
      ))}
      {flights.map((f, i) => (
        <motion.div key={`e${i}`} className="absolute rounded-full" style={{ left: f.x2 - 30, top: f.y2 - 30, width: 60, height: 60, background: `radial-gradient(circle, #fff, ${a} 30%, ${c}66 55%, transparent 70%)` }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.6], opacity: [1, 0] }} transition={{ delay: f.delay + 0.6, duration: 0.45 }} />
      ))}
    </>
  );
}

function Dive({ c, a, tx, cy }: P) {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div key={i} className="absolute h-[2px] rounded-full" style={{ left: tx - 160, top: cy - 80 + i * 20, width: rand(60, 140), background: i % 2 ? a : c }} initial={{ x: -80, opacity: 0 }} animate={{ x: 120, opacity: [0, 1, 0] }} transition={{ delay: 0.55 + i * 0.03, duration: 0.35 }} />
      ))}
    </>
  );
}

function Snap({ tx, cy }: P) {
  const dust = useMemo(() => Array.from({ length: 90 }, () => ({ x: rand(-55, 55), y: rand(-70, 70), dx: rand(60, 260), dy: rand(-200, -20), s: rand(2, 6), d: rand(0, 0.9) })), []);
  return (
    <>
      <motion.div className="absolute inset-0 bg-white" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 0.25, duration: 0.5 }} />
      {dust.map((p, i) => (
        <motion.span key={i} className="absolute rounded-[1px]" style={{ left: tx + p.x, top: cy + p.y, width: p.s, height: p.s, background: i % 3 ? "#78716c" : "#a8a29e" }} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0], x: p.dx, y: p.dy }} transition={{ delay: 0.5 + p.d, duration: 1.3, ease: "easeOut" }} />
      ))}
    </>
  );
}

const EFFECTS: Record<FxType, (p: P) => React.ReactElement> = {
  beam: Beam,
  lightning: Lightning,
  shield: Shield,
  smash: Smash,
  arrows: Arrows,
  electric: Electric,
  web: Web,
  portal: Portal,
  claws: Claws,
  shrink: Shrink,
  hex: Hex,
  missiles: Missiles,
  dive: Dive,
  snap: Snap,
};

function Explosion({ c, a, x, y, big = false }: { c: string; a: string; x: number; y: number; big?: boolean }) {
  const parts = useMemo(() => Array.from({ length: big ? 26 : 16 }, (_, i) => ({ ang: (i / (big ? 26 : 16)) * Math.PI * 2 + rand(-0.2, 0.2), r: rand(50, big ? 170 : 110), s: rand(3, 8) })), [big]);
  const size = big ? 180 : 120;
  return (
    <>
      <motion.div className="absolute rounded-full" style={{ left: x - size / 2, top: y - size / 2, width: size, height: size, background: `radial-gradient(circle, #fff 0 10%, ${a} 30%, ${c}88 50%, transparent 70%)` }} initial={{ scale: 0, opacity: 1 }} animate={{ scale: [0, 1.4], opacity: [1, 0] }} transition={{ duration: 0.55, ease: "easeOut" }} />
      <motion.div className="absolute rounded-full border-2" style={{ left: x - 30, top: y - 30, width: 60, height: 60, borderColor: a }} initial={{ scale: 0, opacity: 1 }} animate={{ scale: big ? 5 : 3.5, opacity: 0 }} transition={{ duration: 0.6 }} />
      {parts.map((p, i) => (
        <motion.span key={i} className="absolute rounded-full" style={{ left: x, top: y, width: p.s, height: p.s, background: i % 2 ? a : c, boxShadow: `0 0 8px ${c}` }} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(p.ang) * p.r, y: Math.sin(p.ang) * p.r, opacity: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} />
      ))}
    </>
  );
}

/* --------------------------- Enemy target -------------------------------- */

export function EnemySprite({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" style={{ overflow: "visible", filter: "drop-shadow(0 0 16px #7c3aed)" }}>
      <path d="M6 120 Q 10 84 50 80 Q 90 84 94 120 Z" fill="#2e1065" stroke="#a78bfa" strokeWidth={1.5} />
      <path d="M18 96 L30 88 M82 96 L70 88" stroke="#facc15" strokeWidth={3} />
      <path d="M30 70 Q 26 30 50 20 Q 74 30 70 70 Q 62 84 50 84 Q 38 84 30 70Z" fill="#6d28d9" stroke="#c4b5fd" strokeWidth={1.5} />
      <path d="M36 70 L42 64 M64 70 L58 64 M44 76 H56" stroke="#3b0764" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M32 40 Q 50 -2 68 40" fill="none" stroke="#facc15" strokeWidth={4} />
      <path d="M30 44 L36 26 M70 44 L64 26" stroke="#facc15" strokeWidth={3} />
      <ellipse cx={41} cy={52} rx={6} ry={3} fill="#fde047" className="pulse-glow" />
      <ellipse cx={59} cy={52} rx={6} ry={3} fill="#fde047" className="pulse-glow" />
    </svg>
  );
}

/* ------------------------------ Stage ------------------------------------ */

export default function SignatureFX({
  hero,
  trigger = 0,
  auto = false,
  onHit,
  height = 340,
  showName = true,
  fx: fxOverride,
}: {
  hero: Hero;
  trigger?: number;
  auto?: boolean;
  onHit?: (damage: number) => void;
  height?: number;
  showName?: boolean;
  fx?: FxType;
}) {
  const fx = fxOverride ?? hero.signature.fx;
  const lite = useLite();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [size, setSize] = useState({ W: 0, H: height });
  const [run, setRun] = useState(0);
  const [impact, setImpact] = useState(0);
  const src = useAnimationControls();
  const tgt = useAnimationControls();
  const stage = useAnimationControls();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const onHitRef = useRef(onHit);
  onHitRef.current = onHit;

  useEffect(() => {
    const el = ref.current!;
    const ro = new ResizeObserver(() => setSize({ W: el.clientWidth, H: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { W, H } = size;
  const sx = W * 0.17;
  const tx = W * 0.8;
  const cy = H * 0.52;
  const dx = tx - sx;
  const sprite = Math.max(70, Math.min(130, W * 0.19));

  const play = useCallback(() => {
    if (!W) return;
    timers.current.forEach(clearTimeout);
    const t = FX_TIMING[fx];
    setRun((r) => r + 1);

    const srcAnims: Partial<Record<FxType, object>> = {
      beam: { x: [0, 0, -18, 0], scale: [1, 1.12, 1, 1], transition: { duration: 1, times: [0, 0.35, 0.45, 1] } },
      lightning: { y: [0, -40, -40, 0], transition: { duration: 1.2, times: [0, 0.2, 0.8, 1] } },
      shield: { x: [0, 14, 0], rotate: [0, -10, 0], transition: { duration: 0.5 } },
      smash: { y: [0, -130, 30, 0], scale: [1, 1.1, 1.25, 1], transition: { duration: 1, times: [0, 0.35, 0.58, 1], ease: "easeIn" } },
      arrows: { x: [0, -8, 0, -8, 0, -8, 0], transition: { duration: 0.9, delay: 0.2 } },
      electric: { x: [0, dx * 0.62, dx * 0.62, 0], y: [0, -50, 0, 0], rotate: [0, 360, 360, 360], transition: { duration: 1.2, times: [0, 0.3, 0.75, 1] } },
      web: { x: [0, dx * 0.2, dx * 0.62, 0], y: [0, -80, 0, 0], transition: { duration: 1.4, times: [0, 0.35, 0.6, 1] } },
      portal: { rotate: [0, 0, 0], scale: [1, 1.08, 1], transition: { duration: 0.8 } },
      claws: { x: [0, dx * 0.7, dx * 0.7, 0], transition: { duration: 1.1, times: [0, 0.3, 0.65, 1] } },
      shrink: { scale: [1, 0.05, 0.05, 1], opacity: [1, 0.2, 0.2, 1], transition: { duration: 1.6, times: [0, 0.18, 0.85, 1] } },
      hex: { y: [0, -20, -20, 0], transition: { duration: 1.5, times: [0, 0.15, 0.85, 1] } },
      missiles: { x: [0, -16, 0], transition: { duration: 0.6 } },
      dive: { x: [0, dx * 0.35, dx * 0.7, dx * 0.7, 0], y: [0, -140, 0, 0, 0], rotate: [0, -25, 30, 0, 0], transition: { duration: 1.5, times: [0, 0.35, 0.55, 0.7, 1] } },
      snap: { scale: [1, 1.15, 1], transition: { duration: 0.6 } },
    };
    src.start(srcAnims[fx] as never);

    timers.current.push(
      setTimeout(() => {
        setImpact((n) => n + 1);
        onHitRef.current?.(hero.signature.damage);
        if (fx === "snap") {
          tgt.start({ opacity: [1, 1, 0], filter: ["grayscale(0)", "grayscale(1) brightness(1.4)", "grayscale(1)"], transition: { duration: 1.2 } });
          timers.current.push(setTimeout(() => tgt.start({ opacity: 1, filter: "grayscale(0)", transition: { duration: 0.6 } }), 2400));
        } else if (fx === "hex") {
          tgt.start({ y: [0, -60, -60, 0], rotate: [0, -8, 8, 0], filter: ["brightness(1)", "brightness(2.5) hue-rotate(-60deg)", "brightness(1)"], transition: { duration: 0.9 } });
        } else {
          tgt.start({ x: [0, 18, -14, 10, -6, 0], filter: ["brightness(1)", "brightness(3)", "brightness(1)"], transition: { duration: 0.5 } });
        }
        if (t.shake) stage.start({ x: [0, -10, 9, -7, 5, -2, 0], y: [0, 6, -6, 4, -2, 0], transition: { duration: 0.45 } });
      }, t.impact * 1000)
    );
  }, [W, fx, dx, hero.signature.damage, src, tgt, stage]);

  // external trigger
  useEffect(() => {
    if (trigger > 0) play();
  }, [trigger]); // eslint-disable-line react-hooks/exhaustive-deps

  // auto loop while visible (lite mode: play once per entry, no loop)
  useEffect(() => {
    if (!auto || !inView || !W) return;
    play();
    if (lite) return;
    const id = setInterval(play, (FX_TIMING[fx].total + 2.2) * 1000);
    return () => clearInterval(id);
  }, [auto, inView, W, fx, lite]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const Effect = EFFECTS[fx];
  const p: P = { c: hero.color, a: hero.accent, sx, tx, cy, W, H };

  return (
    <motion.div ref={ref} animate={stage} className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-black/30 to-black/70" style={{ height }}>
      {/* arena floor */}
      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(transparent, rgba(255,255,255,.04)), repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 1px, transparent 1px 48px)", transform: "perspective(300px) rotateX(55deg)", transformOrigin: "bottom" }} />
      <div className="absolute inset-x-0" style={{ top: cy + 62, height: 1, background: `linear-gradient(90deg, transparent, ${hero.color}88, transparent)` }} />

      {W > 0 && (
        <>
          <motion.div className="absolute z-10" style={{ left: sx - sprite / 2, top: cy - sprite / 2 }} animate={src}>
            <Emblem id={hero.emblem} color={hero.color} accent={hero.accent} size={sprite} ring={false} />
          </motion.div>

          <motion.div className="absolute z-10" style={{ left: tx - sprite * 0.45, top: cy - sprite * 0.6 }} animate={tgt}>
            <EnemySprite size={sprite * 0.9} />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-20">
            {run > 0 && <Effect key={run} {...p} />}
            {impact > 0 && <Explosion key={`x${impact}`} c={hero.color} a={hero.accent} x={tx} y={cy} big={FX_TIMING[fx].shake} />}
          </div>

          <AnimatePresence>
            {showName && run > 0 && (
              <motion.div
                key={`n${run}`}
                className="pointer-events-none absolute inset-x-0 top-4 z-30 text-center font-display text-2xl tracking-widest sm:text-4xl"
                style={{ color: hero.color, textShadow: `0 0 20px ${hero.color}` }}
                initial={{ opacity: 0, scale: 1.8, filter: "blur(10px)" }}
                animate={{ opacity: [0, 1, 1, 0], scale: [1.8, 1, 1, 0.95], filter: "blur(0px)" }}
                transition={{ duration: FX_TIMING[fx].total + 0.4, times: [0, 0.15, 0.8, 1] }}
              >
                {hero.signature.name}!
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}
