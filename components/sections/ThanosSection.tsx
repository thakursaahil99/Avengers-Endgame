"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getHero, thanos } from "@/lib/heroes";
import Emblem from "../Emblem";
import SignatureFX from "../SignatureFX";
import { SectionTitle, SplitReveal, StatBars } from "../ui";

export default function ThanosSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigX = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);
  const ironMan = getHero("iron-man")!;

  return (
    <section ref={ref} id="thanos" className="relative overflow-hidden py-28">
      <motion.p className="pointer-events-none absolute top-10 whitespace-nowrap font-display text-[18vw] leading-none text-transparent" style={{ x: bigX, WebkitTextStroke: "1px rgba(124,58,237,.35)" }}>
        I AM INEVITABLE · I AM INEVITABLE
      </motion.p>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <SectionTitle kicker="THE MAD TITAN" title="The Villain: Thanos" color="#a855f7" />
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <motion.div className="relative mx-auto" initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <Emblem id="thanos" color={thanos.color} accent={thanos.accent} size={320} />
            </motion.div>
          </motion.div>
          <div>
            <p className="font-tech text-xs tracking-[0.4em] text-[#facc15]">{thanos.actor.toUpperCase()}</p>
            <p className="mt-4 leading-relaxed text-white/75">{thanos.bio}</p>
            <ul className="mt-6 space-y-2">
              {thanos.moments.map((m, i) => (
                <motion.li key={m} className="flex items-center gap-3 text-white/80" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <span className="h-2 w-2 rotate-45 bg-[#a855f7]" /> {m}
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 max-w-md">
              <StatBars stats={thanos.stats} color={thanos.color} />
            </div>
          </div>
        </div>

        {/* The final snap */}
        <div className="mt-32 text-center">
          <p className="font-tech text-xs tracking-[0.5em] text-[#ff3b30]">THE FINAL SNAP</p>
          <h3 className="mt-3 font-display text-6xl tracking-wide text-white sm:text-8xl">
            <SplitReveal text="“I am Iron Man.”" />
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">Thanos snaps — nothing happens. Tony has the stones. One snap turns the Mad Titan and his entire army to dust.</p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <SignatureFX hero={{ ...ironMan, signature: { ...ironMan.signature, name: "I Am Iron Man" } }} fx="snap" auto height={380} />
        </div>
      </div>
    </section>
  );
}
