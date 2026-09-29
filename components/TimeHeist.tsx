"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { missions } from "@/lib/extra";
import { stones } from "@/lib/story";
import { getHero } from "@/lib/heroes";
import Emblem from "./Emblem";

const statusStyle = {
  success: { label: "MISSION SUCCESS", color: "#22c55e" },
  partial: { label: "PARTIAL SUCCESS", color: "#facc15" },
  warning: { label: "SUCCESS — COMPROMISED", color: "#f97316" },
  sacrifice: { label: "SUCCESS — AT A COST", color: "#ef4444" },
};

function QuantumTunnel({ color }: { color: string }) {
  return (
    <motion.div className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-black" initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: 1.6, times: [0, 0.7, 1] }}>
      {Array.from({ length: 14 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{ width: 80, height: 80, borderColor: i % 2 ? color : "#ffffff", boxShadow: `0 0 20px ${color}` }}
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 30, opacity: [0, 1, 0] }}
          transition={{ delay: i * 0.07, duration: 1.1, ease: "easeIn" }}
        />
      ))}
      <motion.p className="relative font-display text-5xl tracking-[0.3em] text-white" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 1.4] }} transition={{ duration: 1.2 }}>
        QUANTUM JUMP
      </motion.p>
    </motion.div>
  );
}

export default function TimeHeist() {
  const [sel, setSel] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [jump, setJump] = useState(0);

  const go = (i: number) => {
    setJump((j) => j + 1);
    setTimeout(() => {
      setSel(i);
      setVisited((v) => new Set(v).add(missions[i].id));
    }, 700);
  };

  const collected = new Set(missions.filter((m) => visited.has(m.id)).flatMap((m) => m.stones.filter((s) => !(m.id === "ny2012" && s === "space"))));
  const m = sel !== null ? missions[sel] : null;

  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-8">
      <AnimatePresence>{jump > 0 && <QuantumTunnel key={jump} color={m?.color ?? "#14b8a6"} />}</AnimatePresence>

      {/* Stone tracker */}
      <div className="glass sticky top-20 z-30 flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-3">
        <span className="font-tech text-[10px] tracking-[0.3em] text-white/60">STONES COLLECTED · {collected.size} / 6</span>
        <div className="flex gap-3">
          {stones.map((s) => {
            const got = collected.has(s.id);
            return (
              <motion.span
                key={s.id}
                title={s.name}
                className="h-5 w-5 rotate-45 rounded-md border"
                style={{ borderColor: s.color }}
                animate={{ background: got ? s.color : "rgba(0,0,0,0)", boxShadow: got ? `0 0 16px ${s.color}` : "none", scale: got ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {collected.size === 6 && (
          <motion.p className="fire-text mt-6 text-center font-display text-5xl tracking-wider" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
            ALL SIX STONES — TIME TO BUILD THE GAUNTLET
          </motion.p>
        )}
      </AnimatePresence>

      {/* Era portals */}
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
        {missions.map((ms, i) => (
          <motion.button
            key={ms.id}
            onClick={() => go(i)}
            className="group relative aspect-[3/4] overflow-hidden rounded-3xl border text-left"
            style={{ borderColor: sel === i ? ms.color : "rgba(255,255,255,.1)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8 }}
          >
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 40%, ${ms.color}55, #05050a 70%)` }} />
            <motion.div
              className="absolute left-1/2 top-[38%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: `repeating-conic-gradient(${ms.color} 0 6deg, transparent 6deg 14deg)`, WebkitMask: "radial-gradient(circle, transparent 55%, black 58%, black 70%, transparent 72%)", mask: "radial-gradient(circle, transparent 55%, black 58%, black 70%, transparent 72%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display text-5xl leading-none text-white">{ms.year}</p>
              <p className="font-tech text-[10px] tracking-[0.25em]" style={{ color: ms.color }}>
                {ms.era.toUpperCase()}
              </p>
              {visited.has(ms.id) && <p className="mt-1 font-tech text-[9px] tracking-[0.2em] text-[#22c55e]">✓ VISITED</p>}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Mission briefing */}
      <AnimatePresence mode="wait">
        {m ? (
          <motion.div key={m.id} className="glass relative mt-10 overflow-hidden rounded-3xl p-6 sm:p-10" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl" style={{ background: `${m.color}44` }} />
            <div className="relative grid gap-10 lg:grid-cols-2">
              <div>
                <p className="font-tech text-xs tracking-[0.4em]" style={{ color: m.color }}>
                  MISSION BRIEFING
                </p>
                <h3 className="font-display text-7xl leading-none text-white sm:text-8xl">
                  {m.era} <span style={{ color: m.color }}>{m.year}</span>
                </h3>
                <p className="mt-4 inline-block rounded-full px-4 py-1 font-tech text-[10px] tracking-[0.3em] text-black" style={{ background: statusStyle[m.status].color }}>
                  {statusStyle[m.status].label}
                </p>
                <p className="mt-6 font-tech text-[10px] tracking-[0.3em] text-white/50">TEAM</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {m.team.map((slug, k) => {
                    const h = getHero(slug)!;
                    return (
                      <motion.div key={slug} className="flex items-center gap-2 rounded-full bg-black/40 py-1 pl-1 pr-4" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + k * 0.1 }}>
                        <Emblem id={h.emblem} color={h.color} accent={h.accent} size={36} ring={false} />
                        <span className="font-display text-xl tracking-wide text-white">{h.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
                <p className="mt-6 font-tech text-[10px] tracking-[0.3em] text-white/50">TARGET STONES</p>
                <div className="mt-3 flex gap-3">
                  {m.stones.map((sid) => {
                    const s = stones.find((x) => x.id === sid)!;
                    const lost = m.id === "ny2012" && sid === "space";
                    return (
                      <span key={sid} className="flex items-center gap-2 rounded-full border px-3 py-1 font-tech text-[10px] tracking-wider" style={{ borderColor: s.color, color: lost ? "#ef4444" : "#fff", textDecoration: lost ? "line-through" : "none" }}>
                        <span className="h-3 w-3 rotate-45 rounded-sm" style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }} />
                        {s.name.toUpperCase()}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="font-tech text-[10px] tracking-[0.3em] text-white/50">MISSION LOG</p>
                <ol className="relative mt-4 space-y-4 border-l border-white/10 pl-6">
                  {m.steps.map((s, k) => (
                    <motion.li key={s} className="relative text-lg text-white/85" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + k * 0.15 }}>
                      <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full" style={{ background: m.color, boxShadow: `0 0 10px ${m.color}` }} />
                      <span className="mr-2 font-tech text-xs" style={{ color: m.color }}>
                        T+{String(k + 1).padStart(2, "0")}
                      </span>
                      {s}
                    </motion.li>
                  ))}
                </ol>
                <motion.p className="mt-8 border-l-4 pl-4 font-display text-3xl tracking-wide text-white" style={{ borderColor: m.color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                  {m.outcome}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.p key="pick" className="mt-16 text-center font-display text-4xl tracking-wider text-white/40" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2.4 }}>
            ↑ PICK AN ERA TO JUMP THROUGH TIME
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
