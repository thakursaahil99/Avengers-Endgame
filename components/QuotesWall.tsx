"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { quotes } from "@/lib/extra";
import { getHero, thanos } from "@/lib/heroes";
import Emblem from "./Emblem";

const speaker = (slug: string) => (slug === "thanos" ? thanos : getHero(slug)!);

export default function QuotesWall() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const q = quotes[i];
  const h = speaker(q.by);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((n) => (n + 1) % quotes.length), 5200);
    return () => clearTimeout(id);
  }, [i, paused]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <motion.div className="absolute inset-0" animate={{ background: `radial-gradient(circle at 50% 50%, ${h.color}33, transparent 65%)` }} transition={{ duration: 1 }} />
        <AnimatePresence mode="wait">
          <motion.div key={i} className="relative flex flex-col items-center" exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }} transition={{ duration: 0.4 }}>
            <motion.div initial={{ scale: 0, rotate: -120 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 140, damping: 14 }}>
              <Emblem id={h.emblem} color={h.color} accent={h.accent} size={90} />
            </motion.div>
            <p className="mt-8 max-w-5xl font-display text-6xl leading-[1] tracking-wide text-white sm:text-8xl lg:text-9xl">
              {q.text.split(" ").map((w, k) => (
                <motion.span
                  key={k}
                  className="mr-[0.25em] inline-block"
                  initial={{ opacity: 0, y: 60, rotateX: -90, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.2 + k * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ textShadow: `0 0 40px ${h.color}88`, transformPerspective: 600 }}
                >
                  {w}
                </motion.span>
              ))}
            </p>
            <motion.p className="mt-8 font-tech text-xs tracking-[0.4em]" style={{ color: h.color }} initial={{ opacity: 0, letterSpacing: "1em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ delay: 0.6 }}>
              — {h.name.toUpperCase()}
            </motion.p>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-6 flex items-center gap-4">
          <button onClick={() => setI((n) => (n - 1 + quotes.length) % quotes.length)} className="rounded-full border border-white/20 px-4 py-2 font-tech text-xs text-white hover:border-white">
            ←
          </button>
          <div className="flex gap-1.5">
            {quotes.map((_, k) => (
              <button key={k} onClick={() => setI(k)} className="h-1.5 rounded-full transition-all" style={{ width: k === i ? 24 : 8, background: k === i ? h.color : "rgba(255,255,255,.25)" }} aria-label={`Quote ${k + 1}`} />
            ))}
          </div>
          <button onClick={() => setI((n) => (n + 1) % quotes.length)} className="rounded-full border border-white/20 px-4 py-2 font-tech text-xs text-white hover:border-white">
            →
          </button>
        </div>
      </div>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {quotes.map((qq, k) => {
          const s = speaker(qq.by);
          return (
            <motion.button
              key={k}
              onClick={() => setI(k)}
              className="glass mb-4 w-full break-inside-avoid rounded-2xl p-5 text-left transition hover:border-white/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (k % 3) * 0.08 }}
              style={{ borderColor: k === i ? s.color : undefined }}
            >
              <p className="font-display text-3xl leading-tight tracking-wide text-white">“{qq.text}”</p>
              <div className="mt-3 flex items-center gap-2">
                <Emblem id={s.emblem} color={s.color} accent={s.accent} size={26} ring={false} />
                <span className="font-tech text-[10px] tracking-[0.25em]" style={{ color: s.color }}>
                  {s.name.toUpperCase()}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
