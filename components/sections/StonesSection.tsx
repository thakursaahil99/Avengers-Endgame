"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { stones } from "@/lib/story";
import { SectionTitle } from "../ui";

function StoneGem({ color, size = 56, active = false }: { color: string; size?: number; active?: boolean }) {
  return (
    <motion.span
      className="block rotate-45 rounded-[30%]"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, #ffffff, ${color} 40%, #000 130%)`,
        boxShadow: `0 0 ${active ? 60 : 24}px ${color}, 0 0 ${active ? 120 : 50}px ${color}88, inset 0 0 12px #ffffff88`,
      }}
      animate={{ scale: active ? [1, 1.12, 1] : 1 }}
      transition={{ duration: 1.6, repeat: active ? Infinity : 0 }}
    />
  );
}

export default function StonesSection() {
  const [sel, setSel] = useState(0);
  const s = stones[sel];
  return (
    <section id="stones" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8">
      <SectionTitle kicker="THE TIME HEIST" title="Six Stones. Three Eras. One Shot." color="#a855f7" />

      <div className="mt-16 grid items-center gap-16 lg:grid-cols-2">
        {/* orbit */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <motion.div className="absolute inset-0 rounded-full blur-3xl" animate={{ background: `radial-gradient(circle, ${s.color}55, transparent 65%)` }} transition={{ duration: 0.8 }} />
          <div className="absolute inset-[12%] rounded-full border border-dashed border-white/15" />
          <div className="absolute inset-[30%] rounded-full border border-white/10" />
          <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: "linear" }}>
            {stones.map((st, i) => {
              const ang = (i / stones.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <motion.button
                  key={st.id}
                  onClick={() => setSel(i)}
                  aria-label={st.name}
                  className="absolute"
                  style={{ left: `${50 + Math.cos(ang) * 38}%`, top: `${50 + Math.sin(ang) * 38}%`, x: "-50%", y: "-50%" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                  whileHover={{ scale: 1.25 }}
                >
                  <StoneGem color={st.color} size={sel === i ? 50 : 38} active={sel === i} />
                </motion.button>
              );
            })}
          </motion.div>
          <div className="absolute inset-0 grid place-items-center">
            <AnimatePresence mode="wait">
              <motion.div key={s.id} initial={{ scale: 0, rotate: -90, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} exit={{ scale: 0, rotate: 90, opacity: 0 }} transition={{ type: "spring", stiffness: 160, damping: 14 }}>
                <StoneGem color={s.color} size={90} active />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* details */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={s.id} initial={{ opacity: 0, x: 40, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -40, filter: "blur(8px)" }} transition={{ duration: 0.45 }}>
              <p className="font-tech text-xs tracking-[0.4em]" style={{ color: s.color }}>
                STONE {sel + 1} / 6
              </p>
              <h3 className="mt-2 font-display text-7xl tracking-wide text-white" style={{ textShadow: `0 0 40px ${s.color}` }}>
                {s.name}
              </h3>
              <p className="mt-4 text-xl text-white/75">{s.power}</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-4">
                  <p className="font-tech text-[10px] tracking-[0.3em] text-white/50">RETRIEVED FROM</p>
                  <p className="mt-1 font-display text-2xl tracking-wide text-white">{s.era}</p>
                </div>
                <div className="glass rounded-2xl p-4">
                  <p className="font-tech text-[10px] tracking-[0.3em] text-white/50">RETRIEVED BY</p>
                  <p className="mt-1 font-display text-2xl tracking-wide text-white">{s.keeper}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex flex-wrap gap-2">
            {stones.map((st, i) => (
              <button
                key={st.id}
                onClick={() => setSel(i)}
                className="rounded-full border px-4 py-2 font-tech text-[10px] tracking-[0.2em] transition"
                style={{ borderColor: sel === i ? st.color : "rgba(255,255,255,.15)", background: sel === i ? `${st.color}33` : "transparent", color: sel === i ? "#fff" : "rgba(255,255,255,.6)" }}
              >
                {st.name.replace(" Stone", "").toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
