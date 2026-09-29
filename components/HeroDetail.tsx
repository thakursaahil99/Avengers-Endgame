"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { heroes, type Hero } from "@/lib/heroes";
import { chapters } from "@/lib/story";
import Emblem from "./Emblem";
import { Photo } from "./Media";
import { heroImage } from "@/lib/media";
import SignatureFX from "./SignatureFX";
import { SplitReveal, StatBars, StatRadar } from "./ui";

export default function HeroDetail({ hero }: { hero: Hero }) {
  const ref = useRef<HTMLElement>(null);
  const [trigger, setTrigger] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const emblemY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const emblemR = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const nameX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const i = heroes.findIndex((h) => h.slug === hero.slug);
  const prev = heroes[(i - 1 + heroes.length) % heroes.length];
  const next = heroes[(i + 1) % heroes.length];
  const appears = chapters.filter((c) => c.heroes.includes(hero.slug));
  const photo = heroImage(hero.slug);

  return (
    <>
      <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 sm:px-8">
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 70% 50%, ${hero.color}40, transparent 55%)` }} />
        <motion.p className="pointer-events-none absolute bottom-10 whitespace-nowrap font-display text-[24vw] leading-none text-transparent" style={{ x: nameX, WebkitTextStroke: `1px ${hero.color}44` }}>
          {hero.name.toUpperCase()} {hero.name.toUpperCase()}
        </motion.p>
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <Link href="/heroes" className="font-tech text-[10px] tracking-[0.3em] text-white/50 hover:text-white">
              ← ALL HEROES
            </Link>
            <p className="mt-6 font-tech text-xs tracking-[0.4em]" style={{ color: hero.color }}>
              {hero.alias.toUpperCase()}
            </p>
            <h1 className="font-display text-7xl leading-[0.9] text-white sm:text-9xl" style={{ textShadow: `0 0 60px ${hero.color}88` }}>
              <SplitReveal text={hero.name} />
            </h1>
            <p className="mt-3 font-display text-3xl tracking-wider text-white/70">{hero.tagline}</p>
            <p className="mt-6 max-w-xl leading-relaxed text-white/75">{hero.bio}</p>
            <p className="mt-6 font-tech text-[10px] tracking-[0.3em] text-white/40">PLAYED BY {hero.actor.toUpperCase()}</p>
          </div>
          <motion.div className="mx-auto" style={{ y: emblemY, rotate: emblemR }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.3 }}>
            {photo ? (
              <div className="relative">
                <Photo src={photo} alt={hero.name} color={hero.color} priority kenburns className="h-[460px] w-[340px] rounded-[2rem] border border-white/15 shadow-2xl" sizes="340px" />
                <div className="absolute -bottom-6 -left-6">
                  <Emblem id={hero.emblem} color={hero.color} accent={hero.accent} size={110} />
                </div>
              </div>
            ) : (
              <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <Emblem id={hero.emblem} color={hero.color} accent={hero.accent} size={340} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-tech text-xs tracking-[0.4em]" style={{ color: hero.color }}>
              {"// SIGNATURE HIT"}
            </p>
            <h2 className="mt-2 font-display text-5xl tracking-wide text-white sm:text-6xl">{hero.signature.name}</h2>
            <p className="mt-2 text-white/60">{hero.signature.description}</p>
            <div className="mt-6">
              <SignatureFX hero={hero} trigger={trigger} auto height={380} />
            </div>
            <button
              onClick={() => setTrigger((t) => t + 1)}
              className="mt-5 rounded-full px-8 py-3 font-tech text-xs tracking-[0.3em] text-white transition hover:scale-105"
              style={{ background: hero.color, boxShadow: `0 0 30px ${hero.color}` }}
            >
              REPLAY ATTACK ⚡
            </button>
          </div>
          <div className="glass flex flex-col items-center rounded-3xl p-6">
            <p className="self-start font-tech text-[10px] tracking-[0.3em] text-white/50">POWER GRID</p>
            <StatRadar stats={hero.stats} color={hero.color} />
            <div className="mt-4 w-full">
              <StatBars stats={hero.stats} color={hero.color} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="font-tech text-xs tracking-[0.4em]" style={{ color: hero.color }}>
              {"// KEY MOMENTS"}
            </p>
            <ol className="mt-6 space-y-4">
              {hero.moments.map((m, k) => (
                <motion.li key={m} className="glass flex items-center gap-4 rounded-2xl p-4" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.1 }}>
                  <span className="font-display text-4xl" style={{ color: hero.color }}>
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/85">{m}</span>
                </motion.li>
              ))}
            </ol>
            <div className="mt-6 rounded-2xl border-l-4 bg-white/[0.03] p-4" style={{ borderColor: hero.color }}>
              <p className="font-tech text-[10px] tracking-[0.3em] text-white/50">ROLE IN ENDGAME</p>
              <p className="mt-1 text-white/85">{hero.endgameRole}</p>
            </div>
          </div>
          <div>
            <p className="font-tech text-xs tracking-[0.4em]" style={{ color: hero.color }}>
              {"// APPEARS IN"}
            </p>
            <div className="mt-6 space-y-3">
              {appears.length === 0 && <p className="text-white/50">Joins the fight in the final battle.</p>}
              {appears.map((c) => (
                <Link key={c.id} href="/story" className="glass flex items-center justify-between rounded-2xl p-4 transition hover:border-white/30">
                  <span>
                    <span className="block font-display text-2xl tracking-wide text-white">{c.title}</span>
                    <span className="font-tech text-[10px] tracking-[0.2em] text-white/50">
                      ACT {c.act} · {c.place.toUpperCase()}
                    </span>
                  </span>
                  <span className="rounded-full px-3 py-1 font-tech text-[10px] text-black" style={{ background: c.color }}>
                    {c.time}
                  </span>
                </Link>
              ))}
            </div>
            <motion.p className="mt-10 font-display text-5xl leading-tight tracking-wide" style={{ color: hero.color }} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              “{hero.quote}”
            </motion.p>
          </div>
        </div>
      </section>

      <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-8">
        {[prev, next].map((h, k) => (
          <Link key={h.slug} href={`/heroes/${h.slug}`} className={`glass group flex items-center gap-4 rounded-3xl p-5 transition hover:border-white/30 ${k ? "flex-row-reverse text-right" : ""}`}>
            <span className="transition-transform group-hover:scale-110">
              <Emblem id={h.emblem} color={h.color} accent={h.accent} size={60} ring={false} />
            </span>
            <span>
              <span className="block font-tech text-[10px] tracking-[0.3em] text-white/50">{k ? "NEXT HERO →" : "← PREVIOUS HERO"}</span>
              <span className="font-display text-3xl tracking-wide text-white">{h.name}</span>
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}
