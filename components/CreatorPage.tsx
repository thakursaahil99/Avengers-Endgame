"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { heroes } from "@/lib/heroes";
import { chapters } from "@/lib/story";
import { pages, quotes } from "@/lib/extra";
import Emblem from "./Emblem";
import { MagneticLink } from "./ui";

const roles = ["Developer.", "Designer.", "Animator.", "Marvel Fan."];

function Typer() {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  useEffect(() => {
    const word = roles[i];
    let k = 0;
    let deleting = false;
    const id = setInterval(() => {
      if (!deleting) {
        k++;
        setTxt(word.slice(0, k));
        if (k === word.length) {
          deleting = true;
          k = word.length + 12; // brief pause before deleting
        }
      } else {
        k--;
        if (k <= word.length) setTxt(word.slice(0, Math.max(0, k)));
        if (k <= 0) {
          clearInterval(id);
          setI((n) => (n + 1) % roles.length);
        }
      }
    }, 70);
    return () => clearInterval(id);
  }, [i]);
  return (
    <span className="fire-text">
      {txt}
      <span className="animate-pulse text-white">|</span>
    </span>
  );
}

function Counter({ to, label }: { to: number; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1400);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <div ref={ref} className="glass rounded-3xl p-6 text-center">
      <p className="font-display text-7xl text-white">{n}</p>
      <p className="font-tech text-[10px] tracking-[0.3em] text-white/50">{label}</p>
    </div>
  );
}

const stack = [
  { name: "Next.js 15", what: "App Router, static generation, multi-page routing" },
  { name: "React 19", what: "Component architecture" },
  { name: "Framer Motion", what: "Scroll-linked, spring & layout animations" },
  { name: "Tailwind CSS 4", what: "Styling system" },
  { name: "Lenis", what: "Buttery smooth scrolling" },
  { name: "Canvas + SVG", what: "Warp starfield and all hero emblems, hand-coded" },
];

export default function CreatorPage() {
  const credits = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: credits, offset: ["start end", "end start"] });
  const rollY = useTransform(scrollYProgress, [0, 1], ["30%", "-70%"]);

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="grid-bg absolute inset-0" />
        {heroes.map((h, i) => {
          const ang = (i / heroes.length) * Math.PI * 2;
          return (
            <motion.div key={h.slug} className="absolute left-1/2 top-1/2" initial={{ x: 0, y: 0, opacity: 0 }} animate={{ x: Math.cos(ang) * 340, y: Math.sin(ang) * 260, opacity: 0.35 }} transition={{ delay: 0.3 + i * 0.04, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
              <div className="-translate-x-1/2 -translate-y-1/2">
                <Emblem id={h.emblem} color={h.color} accent={h.accent} size={46} ring={false} />
              </div>
            </motion.div>
          );
        })}
        <p className="relative font-tech text-xs tracking-[0.5em] text-white/50">BUILT &amp; CREATED BY</p>
        <h1 className="glitch relative mt-4 font-display text-8xl leading-none text-white sm:text-[11rem]" data-text="SAHIL THAKUR">
          SAHIL THAKUR
        </h1>
        <p className="relative mt-4 font-display text-4xl tracking-wider sm:text-5xl">
          <Typer />
        </p>
        <p className="relative mt-6 max-w-xl text-white/60">A fully animated tribute to Avengers: Endgame, every visual hand-coded, every hero brought to life with motion.</p>
        <div className="relative mt-10">
          <MagneticLink href="/">Watch from the start</MagneticLink>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Counter to={pages.length + chapters.length + heroes.length} label="PAGES" />
          <Counter to={heroes.length} label="HEROES" />
          <Counter to={14} label="ATTACK ANIMATIONS" />
          <Counter to={quotes.length} label="ICONIC QUOTES" />
        </div>
        <h2 className="mt-20 font-display text-6xl tracking-wide text-white">Tech Stack</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((s, i) => (
            <motion.div key={s.name} className="glass rounded-2xl p-5" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <p className="font-display text-3xl tracking-wide text-[#f5c542]">{s.name}</p>
              <p className="text-white/60">{s.what}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* End credits roll */}
      <section ref={credits} className="relative h-[180vh]">
        <div className="sticky top-0 flex h-screen items-start justify-center overflow-hidden" style={{ maskImage: "linear-gradient(transparent, black 20%, black 80%, transparent)" }}>
          <motion.div className="flex flex-col items-center gap-8 pt-[20vh] text-center" style={{ y: rollY }}>
            <p className="font-tech text-xs tracking-[0.5em] text-white/50">THE ORIGINAL AVENGERS</p>
            {heroes.slice(0, 6).map((h) => (
              <div key={h.slug}>
                <p className="font-display text-5xl tracking-wide text-white">{h.actor}</p>
                <p className="font-tech text-[10px] tracking-[0.3em]" style={{ color: h.color }}>
                  {h.name.toUpperCase()}
                </p>
              </div>
            ))}
            <p className="mt-10 font-tech text-xs tracking-[0.5em] text-white/50">WEBSITE</p>
            <p className="fire-text font-display text-7xl tracking-wider">SAHIL THAKUR</p>
            <p className="font-tech text-[10px] tracking-[0.3em] text-white/50">DESIGN · DEVELOPMENT · ANIMATION</p>
            <p className="mt-10 max-w-md text-sm text-white/40">Fan-made tribute. Characters © Marvel / Disney. All visuals are original.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
