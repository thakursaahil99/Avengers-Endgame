"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { heroes, type Hero } from "@/lib/heroes";
import Emblem from "./Emblem";

const keys = ["strength", "speed", "intelligence", "combat", "energy"] as const;
const total = (h: Hero) => keys.reduce((s, k) => s + h.stats[k], 0) + h.signature.damage / 50;

function Picker({ value, onPick, side }: { value: Hero; onPick: (h: Hero) => void; side: "left" | "right" }) {
  return (
    <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-9 lg:grid-cols-6">
      {heroes.map((h) => (
        <button
          key={h.slug}
          onClick={() => onPick(h)}
          title={h.name}
          className="grid place-items-center rounded-lg border p-1 transition hover:scale-110"
          style={{ borderColor: value.slug === h.slug ? h.color : "rgba(255,255,255,.08)", background: value.slug === h.slug ? `${h.color}33` : "rgba(0,0,0,.3)" }}
          aria-label={`${side} ${h.name}`}
        >
          <Emblem id={h.emblem} color={h.color} accent={h.accent} size={34} ring={false} />
        </button>
      ))}
    </div>
  );
}

function DualRadar({ a, b }: { a: Hero; b: Hero }) {
  const c = 100, R = 80;
  const pt = (i: number, v: number) => {
    const ang = (-90 + i * 72) * (Math.PI / 180);
    return `${c + Math.cos(ang) * R * v},${c + Math.sin(ang) * R * v}`;
  };
  const poly = (h: Hero) => keys.map((k, i) => pt(i, h.stats[k] / 100)).join(" ");
  return (
    <svg viewBox="-30 -15 260 230" className="w-full max-w-[340px]" style={{ overflow: "visible" }}>
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon key={s} points={keys.map((_, i) => pt(i, s)).join(" ")} fill="none" stroke="rgba(255,255,255,.1)" />
      ))}
      {keys.map((k, i) => {
        const [x, y] = pt(i, 1.3).split(",").map(Number);
        return (
          <text key={k} x={x} y={y} fill="rgba(255,255,255,.55)" fontSize={9} textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "var(--font-orbitron)" }}>
            {k.toUpperCase()}
          </text>
        );
      })}
      <motion.polygon animate={{ points: poly(a) }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} fill={`${a.color}44`} stroke={a.color} strokeWidth={2} style={{ filter: `drop-shadow(0 0 6px ${a.color})` }} />
      <motion.polygon animate={{ points: poly(b) }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} fill={`${b.color}44`} stroke={b.color} strokeWidth={2} style={{ filter: `drop-shadow(0 0 6px ${b.color})` }} />
    </svg>
  );
}

export default function HeroCompare() {
  const [a, setA] = useState(heroes[0]);
  const [b, setB] = useState(heroes[2]);
  const ta = total(a), tb = total(b);
  const winner = ta === tb ? null : ta > tb ? a : b;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
      {/* VS stage */}
      <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="absolute inset-y-0 left-0 w-1/2" style={{ background: `linear-gradient(90deg, ${a.color}33, transparent)` }} />
        <div className="absolute inset-y-0 right-0 w-1/2" style={{ background: `linear-gradient(270deg, ${b.color}33, transparent)` }} />
        <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          {[a, b].map((h, side) => (
            <div key={side} className={`flex flex-col items-center text-center ${side === 1 ? "md:order-3" : ""}`}>
              <AnimatePresence mode="wait">
                <motion.div key={h.slug} initial={{ x: side ? 200 : -200, opacity: 0, rotate: side ? 90 : -90 }} animate={{ x: 0, opacity: 1, rotate: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
                  <Emblem id={h.emblem} color={h.color} accent={h.accent} size={170} />
                </motion.div>
              </AnimatePresence>
              <p className="mt-2 font-display text-5xl tracking-wide text-white">{h.name}</p>
              <p className="font-tech text-[10px] tracking-[0.25em]" style={{ color: h.color }}>
                POWER SCORE {Math.round(total(h))}
              </p>
            </div>
          ))}
          <motion.div key={a.slug + b.slug} className="relative mx-auto grid h-24 w-24 place-items-center md:order-2" initial={{ scale: 3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: "spring" }}>
            <span className="absolute inset-0 rounded-full bg-[#e11d2e] blur-xl" />
            <span className="relative font-display text-6xl text-white">VS</span>
          </motion.div>
        </div>
      </div>

      {/* pickers */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-2 font-tech text-[10px] tracking-[0.3em]" style={{ color: a.color }}>
            FIGHTER 1
          </p>
          <Picker value={a} onPick={setA} side="left" />
        </div>
        <div>
          <p className="mb-2 font-tech text-[10px] tracking-[0.3em]" style={{ color: b.color }}>
            FIGHTER 2
          </p>
          <Picker value={b} onPick={setB} side="right" />
        </div>
      </div>

      {/* stats */}
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <div className="mx-auto">
          <DualRadar a={a} b={b} />
        </div>
        <div className="space-y-5">
          {keys.map((k) => {
            const va = a.stats[k], vb = b.stats[k];
            return (
              <div key={k}>
                <div className="mb-1 flex justify-between font-tech text-[10px] tracking-[0.25em]">
                  <span style={{ color: a.color }}>{va}</span>
                  <span className="text-white/60">{k.toUpperCase()}</span>
                  <span style={{ color: b.color }}>{vb}</span>
                </div>
                <div className="flex h-3 gap-1">
                  <div className="flex flex-1 justify-end overflow-hidden rounded-l-full bg-white/10">
                    <motion.div className="h-full rounded-l-full" animate={{ width: `${va}%` }} transition={{ duration: 0.8 }} style={{ background: a.color, boxShadow: va > vb ? `0 0 14px ${a.color}` : "none" }} />
                  </div>
                  <div className="flex-1 overflow-hidden rounded-r-full bg-white/10">
                    <motion.div className="h-full rounded-r-full" animate={{ width: `${vb}%` }} transition={{ duration: 0.8 }} style={{ background: b.color, boxShadow: vb > va ? `0 0 14px ${b.color}` : "none" }} />
                  </div>
                </div>
              </div>
            );
          })}
          <AnimatePresence mode="wait">
            <motion.div key={(winner?.slug ?? "tie") + a.slug + b.slug} className="rounded-2xl p-5 text-center" style={{ background: `${winner?.color ?? "#ffffff"}22`, border: `1px solid ${winner?.color ?? "#fff"}` }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <p className="font-tech text-[10px] tracking-[0.3em] text-white/60">ON PAPER, THE EDGE GOES TO</p>
              <p className="font-display text-5xl tracking-wider" style={{ color: winner?.color ?? "#fff" }}>
                {winner ? winner.name : "A PERFECT TIE"}
              </p>
              <p className="mt-1 text-sm text-white/50">But in Endgame, they win together.</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
