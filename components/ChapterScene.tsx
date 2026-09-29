"use client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { acts, chapters, type Chapter } from "@/lib/story";
import { getHero } from "@/lib/heroes";
import Emblem from "./Emblem";
import { Photo } from "./Media";
import { chapterImage } from "@/lib/media";
import SignatureFX from "./SignatureFX";
import { SplitReveal } from "./ui";

function Embers({ color }: { color: string }) {
  const [parts, setParts] = useState<{ x: number; s: number; d: number; t: number }[]>([]);
  useEffect(() => setParts(Array.from({ length: 40 }, () => ({ x: Math.random() * 100, s: 2 + Math.random() * 4, d: Math.random() * 6, t: 6 + Math.random() * 6 }))), []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {parts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{ left: `${p.x}%`, width: p.s, height: p.s, background: color, boxShadow: `0 0 10px ${color}` }}
          animate={{ y: [0, -900], opacity: [0, 1, 0], x: [0, 30, -20] }}
          transition={{ duration: p.t, delay: p.d, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function BeatPanel({ beat, i, total, color, progress }: { beat: string; i: number; total: number; color: string; progress: MotionValue<number> }) {
  const start = i / total;
  const end = (i + 1) / total;
  const scale = useTransform(progress, [start - 0.15, start + 0.1, end, end + 0.15], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(progress, [start - 0.15, start + 0.05, end - 0.05, end + 0.15], [0.2, 1, 1, 0.2]);
  return (
    <motion.div className="flex h-full w-screen shrink-0 items-center justify-center px-6" style={{ scale, opacity }}>
      <div className="max-w-4xl text-center">
        <p className="font-display text-[10rem] leading-none text-transparent sm:text-[16rem]" style={{ WebkitTextStroke: `2px ${color}` }}>
          {String(i + 1).padStart(2, "0")}
        </p>
        <p className="-mt-6 font-display text-5xl leading-tight tracking-wide text-white sm:text-7xl" style={{ textShadow: `0 0 40px ${color}88` }}>
          {beat}
        </p>
        <p className="mt-6 font-tech text-[10px] tracking-[0.4em] text-white/40">
          SCENE {i + 1} / {total}
        </p>
      </div>
    </motion.div>
  );
}

export default function ChapterScene({ chapter }: { chapter: Chapter }) {
  const idx = chapters.findIndex((c) => c.id === chapter.id);
  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];
  const act = acts.find((a) => a.id === chapter.act)!;
  const heroes = chapter.heroes.map(getHero).filter(Boolean) as NonNullable<ReturnType<typeof getHero>>[];
  const lead = heroes[0];
  const photo = chapterImage(chapter.id);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleScale = useTransform(heroP, [0, 1], [1, 1.4]);
  const titleOpacity = useTransform(heroP, [0, 0.8], [1, 0]);

  const hRef = useRef<HTMLElement>(null);
  const { scrollYProgress: hp } = useScroll({ target: hRef, offset: ["start start", "end end"] });
  const n = chapter.beats.length;
  const x = useTransform(hp, [0, 1], ["0vw", `-${(n - 1) * 100}vw`]);

  return (
    <>
      {/* Chapter progress rail */}
      <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {chapters.map((c, i) => (
          <Link key={c.id} href={`/story/${c.id}`} title={c.title} className="group flex items-center gap-2">
            <span className="block h-[3px] rounded-full transition-all" style={{ width: i === idx ? 28 : 12, background: i === idx ? chapter.color : "rgba(255,255,255,.25)" }} />
            <span className="font-tech text-[9px] tracking-widest text-white/0 transition group-hover:text-white/70">{c.title.toUpperCase()}</span>
          </Link>
        ))}
      </div>

      {/* Title scene */}
      <section ref={heroRef} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 text-center">
        {photo && <Photo src={photo} alt={chapter.title} color={chapter.color} priority kenburns className="absolute inset-0 opacity-50" sizes="100vw" />}
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 60%, ${chapter.color}33, transparent 60%)` }} />
        <Embers color={chapter.color} />
        <motion.div style={{ scale: titleScale, opacity: titleOpacity }} className="relative">
          <motion.p className="font-tech text-xs tracking-[0.5em]" style={{ color: act.color }} initial={{ opacity: 0, letterSpacing: "1.2em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 1.2 }}>
            ACT {act.id} · {act.name.toUpperCase()} · CHAPTER {idx + 1}
          </motion.p>
          <h1 className="mt-4 font-display text-7xl leading-[0.9] text-white sm:text-[9rem]" style={{ textShadow: `0 0 60px ${chapter.color}` }}>
            <SplitReveal text={chapter.title} />
          </h1>
          <motion.div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-tech text-xs tracking-[0.3em]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <span className="rounded-full px-4 py-1.5 text-black" style={{ background: chapter.color }}>
              {chapter.time}
            </span>
            <span className="text-white/60">{chapter.place.toUpperCase()}</span>
          </motion.div>
        </motion.div>
        <motion.p className="absolute bottom-10 font-tech text-[10px] tracking-[0.4em] text-white/40" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          SCROLL TO PLAY THE SCENE ↓
        </motion.p>
      </section>

      {/* Summary */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-8">
        <p className="text-2xl leading-relaxed text-white/80 sm:text-3xl">
          <SplitReveal text={chapter.summary} />
        </p>
      </section>

      {/* Horizontal pinned beats */}
      <section ref={hRef} className="relative" style={{ height: `${n * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="absolute inset-x-0 top-24 mx-auto h-[2px] max-w-md bg-white/10">
            <motion.div className="h-full origin-left" style={{ scaleX: hp, background: chapter.color }} />
          </div>
          <motion.div className="flex h-full" style={{ x }}>
            {chapter.beats.map((b, i) => (
              <BeatPanel key={b} beat={b} i={i} total={n} color={chapter.color} progress={hp} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Heroes in the scene */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <p className="font-tech text-xs tracking-[0.4em]" style={{ color: chapter.color }}>
          {"// HEROES IN THIS CHAPTER"}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          {heroes.map((h, i) => (
            <motion.div key={h.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link href={`/heroes/${h.slug}`} className="glass flex items-center gap-3 rounded-2xl p-3 pr-5 transition hover:-translate-y-1 hover:border-white/30">
                <Emblem id={h.emblem} color={h.color} accent={h.accent} size={48} ring={false} />
                <span>
                  <span className="block font-display text-2xl tracking-wide text-white">{h.name}</span>
                  <span className="font-tech text-[9px] tracking-[0.2em] text-white/50">{h.alias.toUpperCase()}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        {lead && (
          <div className="mt-10">
            <SignatureFX hero={lead} auto height={360} />
          </div>
        )}
        {chapter.quote && (
          <motion.p className="mt-20 text-center font-display text-6xl leading-tight tracking-wide sm:text-8xl" style={{ color: chapter.color, textShadow: `0 0 40px ${chapter.color}66` }} initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 1 }}>
            “{chapter.quote}”
          </motion.p>
        )}
      </section>

      {/* Prev / next */}
      <nav className="mx-auto grid max-w-7xl gap-4 px-4 pb-10 sm:grid-cols-2 sm:px-8">
        {prev ? (
          <Link href={`/story/${prev.id}`} className="glass group rounded-3xl p-6 transition hover:border-white/30">
            <span className="font-tech text-[10px] tracking-[0.3em] text-white/50">← PREVIOUS CHAPTER</span>
            <span className="mt-1 block font-display text-4xl tracking-wide text-white transition group-hover:-translate-x-2" style={{ color: prev.color }}>
              {prev.title}
            </span>
          </Link>
        ) : (
          <Link href="/story" className="glass rounded-3xl p-6">
            <span className="font-tech text-[10px] tracking-[0.3em] text-white/50">← BACK</span>
            <span className="mt-1 block font-display text-4xl tracking-wide text-white">Full Story</span>
          </Link>
        )}
        {next ? (
          <Link href={`/story/${next.id}`} className="glass group rounded-3xl p-6 text-right transition hover:border-white/30">
            <span className="font-tech text-[10px] tracking-[0.3em] text-white/50">NEXT CHAPTER →</span>
            <span className="mt-1 block font-display text-4xl tracking-wide transition group-hover:translate-x-2" style={{ color: next.color }}>
              {next.title}
            </span>
          </Link>
        ) : (
          <Link href="/battle" className="glass group rounded-3xl p-6 text-right">
            <span className="font-tech text-[10px] tracking-[0.3em] text-white/50">THE END — NOW YOU FIGHT →</span>
            <span className="mt-1 block font-display text-4xl tracking-wide text-[#ff3b30]">Final Battle</span>
          </Link>
        )}
      </nav>
    </>
  );
}
