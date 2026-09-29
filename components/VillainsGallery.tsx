"use client";
import { motion } from "framer-motion";
import { villains } from "@/lib/extra";
import Emblem from "./Emblem";
import { EnemySprite } from "./SignatureFX";
import { TiltCard } from "./ui";
import { Photo } from "./Media";
import { villainImage } from "@/lib/media";

function Sigil({ color }: { color: string }) {
  return (
    <svg width={120} height={120} viewBox="0 0 120 120" style={{ filter: `drop-shadow(0 0 12px ${color})`, overflow: "visible" }}>
      <g className="spin-slow">
        <polygon points="60,4 108,32 108,88 60,116 12,88 12,32" fill="none" stroke={color} strokeWidth={2} />
        <polygon points="60,18 96,39 96,81 60,102 24,81 24,39" fill="none" stroke={color} strokeWidth={1} strokeDasharray="4 4" />
      </g>
      <g className="pulse-glow">
        <path d="M60 30 L74 60 L60 90 L46 60 Z" fill={color} opacity={0.8} />
        <circle cx={60} cy={60} r={6} fill="#fff" />
      </g>
    </svg>
  );
}

export default function VillainsGallery() {
  const [boss, ...rest] = villains;
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-8">
      {/* Boss card */}
      <motion.div className="glass relative grid items-center gap-8 overflow-hidden rounded-3xl p-6 sm:p-10 md:grid-cols-[auto_1fr]" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 20% 50%, ${boss.color}44, transparent 60%)` }} />
        <motion.div className="relative mx-auto" animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <Emblem id="thanos" color={boss.color} accent="#facc15" size={240} />
        </motion.div>
        <div className="relative">
          <p className="font-tech text-xs tracking-[0.4em] text-[#facc15]">FINAL BOSS · THREAT LEVEL {boss.power}</p>
          <h2 className="font-display text-8xl leading-none text-white">{boss.name}</h2>
          <p className="font-display text-3xl tracking-wider" style={{ color: boss.color }}>
            {boss.title}
          </p>
          <p className="mt-4 max-w-xl text-white/70">{boss.desc}</p>
          <p className="mt-4 font-tech text-[10px] tracking-[0.3em] text-white/50">WEAPON · {boss.weapon.toUpperCase()}</p>
        </div>
      </motion.div>

      <h3 className="mt-20 font-display text-5xl tracking-wide text-white">The Black Order &amp; The Army</h3>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((v, i) => (
          <motion.div key={v.id} initial={{ opacity: 0, y: 50, rotateX: 30 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: (i % 4) * 0.08, duration: 0.7 }}>
            <TiltCard glow={v.color} className="h-full overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-5">
              {villainImage(v.id) && <Photo src={villainImage(v.id)!} alt={v.name} color={v.color} className="absolute inset-0 opacity-40" sizes="(max-width: 640px) 100vw, 25vw" />}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl" style={{ background: `${v.color}55` }} />
              <div className="relative flex justify-center [transform:translateZ(40px)]">{i < 4 ? <Sigil color={v.color} /> : <EnemySprite size={90} />}</div>
              <p className="relative mt-4 font-display text-4xl tracking-wide text-white">{v.name}</p>
              <p className="relative font-tech text-[10px] tracking-[0.3em]" style={{ color: v.color }}>
                {v.title.toUpperCase()}
              </p>
              <p className="relative mt-3 text-sm text-white/65">{v.desc}</p>
              <div className="relative mt-4">
                <div className="flex justify-between font-tech text-[9px] tracking-[0.2em] text-white/50">
                  <span>THREAT</span>
                  <span>{v.power}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full" style={{ background: v.color }} initial={{ width: 0 }} whileInView={{ width: `${v.power}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
                </div>
                <p className="mt-3 font-tech text-[9px] tracking-[0.2em] text-white/40">WEAPON · {v.weapon.toUpperCase()}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
