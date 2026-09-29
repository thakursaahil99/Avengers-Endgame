"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import AvengersLogo from "./AvengersLogo";

const storyLines = [
  { text: "In 2018, Thanos collected all six Infinity Stones.", color: "#a855f7" },
  { text: "With a single snap… half of all life vanished.", color: "#f97316" },
  { text: "Five years later, the survivors get one last chance.", color: "#38bdf8" },
  { text: "Whatever it takes.", color: "#e11d2e" },
];

type Phase = "credit" | "story" | "title" | "done";

function LetterReveal({ text, className, stagger = 0.035, delay = 0 }: { text: string; className?: string; stagger?: number; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(10px)", transition: { duration: 0.35, delay: i * 0.01 } }}
          transition={{ delay: delay + i * stagger, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

function Dust({ color }: { color: string }) {
  const [parts, setParts] = useState<{ x: number; y: number; s: number; d: number; dx: number }[]>([]);
  useEffect(() => {
    setParts(Array.from({ length: 60 }, () => ({ x: Math.random() * 100, y: 40 + Math.random() * 30, s: 1 + Math.random() * 4, d: Math.random() * 2, dx: 40 + Math.random() * 160 })));
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {parts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: color, boxShadow: `0 0 8px ${color}` }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], x: p.dx, y: -60 - p.dx / 2 }}
          transition={{ duration: 3 + p.d, delay: p.d, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function IntroSequence() {
  const [phase, setPhase] = useState<Phase>("credit");
  const [line, setLine] = useState(0);

  const timeline = useMemo(() => {
    const t: { at: number; run: () => void }[] = [];
    let at = 3600;
    t.push({ at, run: () => setPhase("story") });
    storyLines.forEach((_, i) => {
      if (i > 0) t.push({ at, run: () => setLine(i) });
      at += i === storyLines.length - 1 ? 2200 : 2900;
    });
    t.push({ at, run: () => setPhase("title") });
    t.push({ at: at + 4200, run: () => setPhase("done") });
    return t;
  }, []);

  useEffect(() => {
    const ids = timeline.map((s) => setTimeout(s.run, s.at));
    return () => ids.forEach(clearTimeout);
  }, [timeline]);

  useEffect(() => {
    document.documentElement.style.overflow = phase === "done" ? "" : "hidden";
    if (phase === "done") {
      window.__introDone = true;
      window.dispatchEvent(new Event("intro:done"));
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#020204]"
          exit={{ clipPath: "circle(0% at 50% 50%)", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
        >
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="scanlines pointer-events-none absolute inset-0" />

          <button
            onClick={() => setPhase("done")}
            className="absolute bottom-6 right-6 z-10 rounded-full border border-white/20 px-5 py-2 font-tech text-xs tracking-[0.3em] text-white/60 transition hover:border-white hover:text-white"
          >
            SKIP INTRO ▸
          </button>

          <AnimatePresence mode="wait">
            {phase === "credit" && (
              <motion.div key="credit" className="relative flex flex-col items-center px-6 text-center" exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }} transition={{ duration: 0.7 }}>
                {[0, 1, 2].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute left-1/2 top-1/2 rounded-full border"
                    style={{ borderColor: r === 1 ? "#f5c54255" : "#e11d2e44", width: 260 + r * 140, height: 260 + r * 140, x: "-50%", y: "-50%" }}
                    initial={{ scale: 0, opacity: 0, rotate: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: r % 2 ? -180 : 180 }}
                    transition={{ delay: r * 0.15, duration: 3, ease: "easeOut" }}
                  />
                ))}
                <motion.p
                  className="font-tech text-[10px] tracking-[0.6em] text-white/50 sm:text-xs"
                  initial={{ opacity: 0, letterSpacing: "1.5em" }}
                  animate={{ opacity: 1, letterSpacing: "0.6em" }}
                  transition={{ duration: 1.2 }}
                >
                  BUILT &amp; CREATED BY
                </motion.p>
                <h1 className="glitch mt-4 font-display text-6xl leading-none text-white sm:text-8xl md:text-9xl" data-text="SAHIL THAKUR">
                  <LetterReveal text="SAHIL THAKUR" stagger={0.07} delay={0.4} />
                </h1>
                <motion.div
                  className="mt-4 h-[2px] bg-gradient-to-r from-transparent via-[#e11d2e] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: 320 }}
                  transition={{ delay: 1.3, duration: 1 }}
                />
                <motion.p className="mt-4 font-tech text-[10px] tracking-[0.5em] text-[#f5c542] sm:text-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
                  PRESENTS
                </motion.p>
              </motion.div>
            )}

            {phase === "story" && (
              <motion.div key="story" className="relative flex h-full w-full items-center justify-center px-6" exit={{ opacity: 0 }}>
                <Dust color={storyLines[line].color} />
                <motion.div
                  className="absolute h-[60vmin] w-[60vmin] rounded-full blur-3xl"
                  animate={{ background: `radial-gradient(circle, ${storyLines[line].color}33, transparent 70%)` }}
                  transition={{ duration: 1 }}
                />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={line}
                    className={`relative max-w-4xl text-center ${line === storyLines.length - 1 ? "font-display text-6xl tracking-wider text-white sm:text-8xl" : "font-body text-2xl font-semibold text-white/90 sm:text-4xl"}`}
                  >
                    <LetterReveal text={storyLines[line].text} stagger={line === storyLines.length - 1 ? 0.06 : 0.025} />
                  </motion.p>
                </AnimatePresence>
                <div className="absolute bottom-16 flex gap-2">
                  {storyLines.map((_, i) => (
                    <motion.span key={i} className="h-[3px] w-10 rounded bg-white/15" animate={{ background: i <= line ? storyLines[line].color : "rgba(255,255,255,.15)" }} />
                  ))}
                </div>
              </motion.div>
            )}

            {phase === "title" && (
              <motion.div key="title" className="relative flex flex-col items-center text-center">
                <motion.div
                  className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(225,29,46,.25), transparent 55%)" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                />
                <AvengersLogo size={170} duration={1.2} />
                <motion.h2
                  className="metal-text mt-6 font-display text-7xl leading-none sm:text-9xl"
                  initial={{ opacity: 0, letterSpacing: "0.9em", scale: 1.4 }}
                  animate={{ opacity: 1, letterSpacing: "0.12em", scale: 1 }}
                  transition={{ delay: 0.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  AVENGERS
                </motion.h2>
                <motion.h3
                  className="fire-text font-display text-5xl tracking-[0.4em] sm:text-7xl"
                  initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 1.6, duration: 1 }}
                >
                  ENDGAME
                </motion.h3>
                <motion.div
                  className="pointer-events-none fixed inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0] }}
                  transition={{ delay: 1.55, duration: 0.6 }}
                />
                <motion.p className="mt-6 font-tech text-[10px] tracking-[0.5em] text-white/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
                  AN EXPERIENCE BY SAHIL THAKUR
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
