"use client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { heroes, type Hero } from "@/lib/heroes";
import { pages } from "@/lib/extra";
import Emblem from "../Emblem";
import AvengersLogo from "../AvengersLogo";
import { MagneticLink, SplitReveal } from "../ui";

export function HeroMarquee() {
  const row = [...heroes, ...heroes];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/40 py-6">
      <div className="marquee flex w-max items-center gap-10">
        {row.map((h, i) => (
          <div key={i} className="flex items-center gap-3">
            <Emblem id={h.emblem} color={h.color} accent={h.accent} size={36} ring={false} />
            <span className="font-display text-3xl tracking-widest text-white/80">{h.name}</span>
            <span className="text-[#e11d2e]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageHeader({ kicker, title, sub, color = "#e11d2e" }: { kicker: string; title: string; sub: string; color?: string }) {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden px-4 pb-16 pt-36 sm:px-8">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: `${color}33` }} />
      <div className="relative mx-auto w-full max-w-7xl">
        <motion.p className="font-tech text-xs tracking-[0.5em]" style={{ color }} initial={{ opacity: 0, letterSpacing: "1em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 1 }}>
          {kicker}
        </motion.p>
        <h1 className="mt-3 font-display text-7xl leading-[0.9] text-white sm:text-9xl">
          <SplitReveal text={title} />
        </h1>
        <motion.p className="mt-4 max-w-2xl text-lg text-white/60" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          {sub}
        </motion.p>
      </div>
    </section>
  );
}

export function ExplorePages() {
  const list = pages.filter((p) => p.href !== "/");
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8">
      <p className="font-tech text-xs tracking-[0.4em] text-[#14b8a6]">{"// GO DEEPER"}</p>
      <h2 className="mt-2 font-display text-5xl leading-[0.95] text-white sm:text-7xl">
        <SplitReveal text="Explore Every Page" />
      </h2>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <motion.div key={p.href} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}>
            <Link href={p.href} className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 transition-colors hover:border-white/30">
              <span className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100" style={{ background: `linear-gradient(0deg, ${p.color}40, transparent)` }} />
              <span className="absolute -right-4 -top-8 font-display text-[9rem] leading-none text-transparent transition-transform duration-500 group-hover:-translate-y-2" style={{ WebkitTextStroke: `1px ${p.color}55` }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative block font-tech text-[10px] tracking-[0.3em]" style={{ color: p.color }}>
                {p.sub.toUpperCase()}
              </span>
              <span className="relative mt-10 flex items-center justify-between font-display text-5xl tracking-wide text-white">
                {p.label}
                <span className="text-3xl transition-transform duration-300 group-hover:-rotate-45" style={{ color: p.color }}>
                  →
                </span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AssembleDot({ hero: h, ang, radius }: { hero: Hero; ang: number; radius: MotionValue<number> }) {
  const x = useTransform(radius, (r) => `calc(-50% + ${Math.cos(ang) * r * 30}vmin)`);
  const y = useTransform(radius, (r) => `calc(-50% + ${Math.sin(ang) * r * 30}vmin)`);
  return (
    <motion.div className="absolute left-1/2 top-1/2" style={{ x, y, opacity: radius }}>
      <Emblem id={h.emblem} color={h.color} accent={h.accent} size={52} ring={false} />
    </motion.div>
  );
}

export function AssembleFinale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const radius = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-28 text-center">
      {/* heroes assemble into a ring */}
      <div className="relative h-[min(90vw,620px)] w-[min(90vw,620px)]">
        {heroes.map((h, i) => (
          <AssembleDot key={h.slug} hero={h} ang={(i / heroes.length) * Math.PI * 2 - Math.PI / 2} radius={radius} />
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AvengersLogo size={110} />
          <h2 className="metal-text mt-4 font-display text-6xl tracking-wider sm:text-8xl">
            <SplitReveal text="AVENGERS ASSEMBLE" />
          </h2>
        </div>
      </div>
      <p className="mt-10 font-tech text-[10px] tracking-[0.5em] text-white/50">A FAN EXPERIENCE BUILT &amp; CREATED BY</p>
      <p className="fire-text mt-2 font-display text-6xl tracking-wider sm:text-8xl">SAHIL THAKUR</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <MagneticLink href="/battle">Play the Battle</MagneticLink>
        <MagneticLink href="/heroes" variant="ghost">
          All Hero Profiles
        </MagneticLink>
      </div>
    </section>
  );
}
