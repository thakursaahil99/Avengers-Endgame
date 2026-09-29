"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { getHero, heroes, type Hero } from "@/lib/heroes";
import Emblem from "../Emblem";
import SignatureFX, { FX_TIMING } from "../SignatureFX";
import { SectionTitle } from "../ui";

const MAX_HP = 20000;

export default function BattleArena() {
  const ironMan = getHero("iron-man")!;
  const [hero, setHero] = useState<Hero>(heroes[0]);
  const [hp, setHp] = useState(MAX_HP);
  const [trigger, setTrigger] = useState(0);
  const [busy, setBusy] = useState(false);
  const [pops, setPops] = useState<{ id: number; dmg: number; color: string; x: number }[]>([]);
  const [log, setLog] = useState<{ id: number; text: string; color: string }[]>([]);
  const [combo, setCombo] = useState(0);
  const [phase, setPhase] = useState<"fight" | "snap" | "won">("fight");
  const [snapping, setSnapping] = useState(false);
  const idRef = useRef(0);
  const usedRef = useRef(new Set<string>());

  const snapHero: Hero = { ...ironMan, signature: { ...ironMan.signature, name: "I Am Iron Man", damage: 0 } };
  const stageHero = phase === "fight" ? hero : snapHero;

  const strike = () => {
    if (busy || phase !== "fight") return;
    setBusy(true);
    setTrigger((t) => t + 1);
    setTimeout(() => setBusy(false), FX_TIMING[hero.signature.fx].total * 1000 + 150);
  };

  const onHit = (base: number) => {
    if (phase === "snap") {
      setTimeout(() => setPhase("won"), 1800);
      return;
    }
    const fresh = !usedRef.current.has(hero.slug);
    usedRef.current.add(hero.slug);
    const nextCombo = combo + 1;
    const dmg = Math.round(base * (fresh ? 1.25 : 1) * (1 + Math.min(nextCombo, 10) * 0.05) * (0.9 + Math.random() * 0.2));
    setCombo(nextCombo);
    const id = ++idRef.current;
    setPops((p) => [...p, { id, dmg, color: hero.color, x: Math.random() * 40 - 20 }]);
    setTimeout(() => setPops((p) => p.filter((x) => x.id !== id)), 1200);
    setLog((l) => [{ id, text: `${hero.name} — ${hero.signature.name} · ${dmg}${fresh ? " (TEAM BONUS)" : ""}`, color: hero.color }, ...l].slice(0, 5));
    setHp((h) => {
      const n = Math.max(0, h - dmg);
      if (n === 0) setTimeout(() => setPhase("snap"), 700);
      return n;
    });
  };

  const doSnap = () => {
    setSnapping(true);
    setTrigger((t) => t + 1);
  };

  const reset = () => {
    setHp(MAX_HP);
    setCombo(0);
    setLog([]);
    usedRef.current.clear();
    setSnapping(false);
    setPhase("fight");
  };

  const pct = (hp / MAX_HP) * 100;

  return (
    <section id="battle" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8">
      <SectionTitle kicker="INTERACTIVE" title="The Final Battle — You Fight" color="#ff3b30" />
      <p className="mt-6 max-w-2xl text-lg text-white/60">
        Choose a hero, unleash their signature hit and bring Thanos down. Every new hero you bring in gives a <span className="text-[#f5c542]">team bonus</span>. When he falls — you know what to do.
      </p>

      <div className="mt-12 glass rounded-3xl p-4 sm:p-6">
        {/* HUD */}
        <div className="flex flex-wrap items-center gap-4">
          <Emblem id="thanos" color="#7c3aed" accent="#facc15" size={52} ring={false} />
          <div className="min-w-[200px] flex-1">
            <div className="flex justify-between font-tech text-[10px] tracking-[0.3em] text-white/70">
              <span>THANOS · THE MAD TITAN</span>
              <span>
                {hp.toLocaleString()} / {MAX_HP.toLocaleString()}
              </span>
            </div>
            <div className="relative mt-2 h-4 overflow-hidden rounded-full bg-white/10">
              <motion.div className="absolute inset-y-0 left-0 rounded-full bg-white/40" animate={{ width: `${pct}%` }} transition={{ delay: 0.4, duration: 0.8 }} />
              <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{ background: "linear-gradient(90deg,#7c3aed,#e11d2e)", boxShadow: "0 0 16px #e11d2e" }} animate={{ width: `${pct}%` }} transition={{ duration: 0.25 }} />
            </div>
          </div>
          <motion.div key={combo} className="font-display text-3xl tracking-wider text-[#f5c542]" initial={{ scale: 1.8 }} animate={{ scale: 1 }}>
            COMBO ×{combo}
          </motion.div>
        </div>

        {/* stage */}
        <div className="relative mt-6">
          <SignatureFX hero={stageHero} fx={phase === "fight" ? undefined : "snap"} trigger={trigger} onHit={onHit} height={400} />
          <div className="pointer-events-none absolute inset-0 z-40">
            <AnimatePresence>
              {pops.map((p) => (
                <motion.span
                  key={p.id}
                  className="absolute right-[18%] top-[30%] font-display text-5xl"
                  style={{ color: p.color, textShadow: `0 0 20px ${p.color}, 0 2px 0 #000` }}
                  initial={{ opacity: 0, y: 0, x: p.x, scale: 0.4 }}
                  animate={{ opacity: 1, y: -90, scale: 1.2 }}
                  exit={{ opacity: 0, y: -140 }}
                  transition={{ duration: 0.7 }}
                >
                  -{p.dmg}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {phase === "snap" && !snapping && (
              <motion.div className="absolute inset-0 z-50 flex flex-col items-center justify-end gap-3 rounded-3xl bg-gradient-to-t from-black/90 to-transparent pb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="font-display text-4xl tracking-wider text-white">Thanos is down. Finish it.</p>
                <button onClick={doSnap} className="rounded-full bg-[#ff3b30] px-8 py-4 font-tech text-xs tracking-[0.3em] text-white shadow-[0_0_40px_#ff3b30] transition hover:scale-105">
                  🫰 SNAP — “I AM IRON MAN”
                </button>
              </motion.div>
            )}
            {phase === "won" && (
              <motion.div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-3xl bg-black/85 text-center" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}>
                <motion.p className="fire-text font-display text-6xl tracking-wider sm:text-8xl" initial={{ letterSpacing: "0.6em", opacity: 0 }} animate={{ letterSpacing: "0.08em", opacity: 1 }} transition={{ duration: 1.2 }}>
                  WHATEVER IT TAKES
                </motion.p>
                <p className="mt-3 text-white/70">Thanos and his army are dust. The universe is saved.</p>
                <button onClick={reset} className="mt-6 rounded-full border border-white/30 px-6 py-3 font-tech text-xs tracking-[0.3em] text-white transition hover:border-white">
                  FIGHT AGAIN ↻
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="mb-3 font-tech text-[10px] tracking-[0.3em] text-white/50">CHOOSE YOUR HERO</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-9">
              {heroes.map((h) => (
                <button
                  key={h.slug}
                  onClick={() => !busy && setHero(h)}
                  title={h.name}
                  className="relative flex flex-col items-center gap-1 rounded-xl border p-2 transition hover:scale-105"
                  style={{ borderColor: hero.slug === h.slug ? h.color : "rgba(255,255,255,.08)", background: hero.slug === h.slug ? `${h.color}22` : "rgba(0,0,0,.3)" }}
                >
                  {usedRef.current.has(h.slug) && <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#f5c542]" />}
                  <Emblem id={h.emblem} color={h.color} accent={h.accent} size={40} ring={false} />
                  <span className="w-full truncate text-center font-tech text-[8px] tracking-wider text-white/70">{h.name.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <motion.button
              onClick={strike}
              disabled={busy || phase !== "fight"}
              whileTap={{ scale: 0.94 }}
              className="relative overflow-hidden rounded-2xl py-5 font-display text-3xl tracking-widest text-white transition disabled:opacity-50"
              style={{ background: `linear-gradient(135deg, ${hero.color}, #111)`, boxShadow: `0 0 30px ${hero.color}88` }}
            >
              {busy ? "ATTACKING…" : "STRIKE ⚡"}
              <span className="block font-tech text-[9px] tracking-[0.25em] text-white/80">{hero.signature.name.toUpperCase()}</span>
            </motion.button>
            <div className="min-h-[130px] rounded-2xl bg-black/40 p-3 font-tech text-[10px] tracking-wider">
              <p className="mb-2 text-white/40">BATTLE LOG</p>
              <AnimatePresence initial={false}>
                {log.map((l) => (
                  <motion.p key={l.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="truncate py-0.5" style={{ color: l.color }}>
                    ▸ {l.text}
                  </motion.p>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
