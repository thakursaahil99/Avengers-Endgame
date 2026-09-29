"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { acts, chapters } from "@/lib/story";
import { getHero } from "@/lib/heroes";
import Emblem from "../Emblem";
import { Photo } from "../Media";
import { chapterImage } from "@/lib/media";
import { SectionTitle, SplitReveal } from "../ui";

function ChapterCard({ ch, index }: { ch: (typeof chapters)[number]; index: number }) {
  const left = index % 2 === 0;
  return (
    <div className={`relative flex w-full md:w-1/2 ${left ? "md:pr-14" : "md:ml-auto md:pl-14"} pl-12 md:pl-0`}>
      {/* node on the spine */}
      <motion.span
        className={`absolute top-8 h-5 w-5 rounded-full border-4 border-[#05050a] left-[7px] ${left ? "md:left-auto md:-right-[10px]" : "md:-left-[10px]"}`}
        style={{ background: ch.color, boxShadow: `0 0 20px ${ch.color}` }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      <motion.article
        className="glass group relative w-full overflow-hidden rounded-3xl p-6 sm:p-8"
        initial={{ opacity: 0, x: left ? -80 : 80, rotateY: left ? 25 : -25, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        {chapterImage(ch.id) && (
          <Photo src={chapterImage(ch.id)!} alt={ch.title} color={ch.color} className="-mx-6 -mt-6 mb-6 h-48 sm:-mx-8 sm:-mt-8" sizes="(max-width: 768px) 100vw, 45vw" />
        )}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60" style={{ background: ch.color }} />
        <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[8rem] leading-none text-transparent" style={{ WebkitTextStroke: `1px ${ch.color}55` }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative flex flex-wrap items-center gap-3 font-tech text-[10px] tracking-[0.25em]">
          <span className="rounded-full px-3 py-1 text-black" style={{ background: ch.color }}>
            {ch.time}
          </span>
          <span className="text-white/50">{ch.place.toUpperCase()}</span>
        </div>
        <h3 className="relative mt-4 font-display text-4xl tracking-wide text-white sm:text-5xl">{ch.title}</h3>
        <p className="relative mt-3 leading-relaxed text-white/70">{ch.summary}</p>
        <ul className="relative mt-5 flex flex-wrap gap-2">
          {ch.beats.map((b, i) => (
            <motion.li
              key={b}
              className="rounded-full border px-3 py-1 text-sm text-white/80"
              style={{ borderColor: `${ch.color}66` }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {b}
            </motion.li>
          ))}
        </ul>
        {ch.quote && (
          <p className="relative mt-5 border-l-2 pl-4 font-display text-2xl tracking-wide" style={{ borderColor: ch.color, color: ch.color }}>
            “{ch.quote}”
          </p>
        )}
        <div className="relative mt-6 flex flex-wrap items-center gap-2">
          {ch.heroes.map((slug) => {
            const h = getHero(slug);
            if (!h) return null;
            return (
              <Link key={slug} href={`/heroes/${slug}`} title={h.name} className="rounded-full border border-white/10 bg-black/40 p-1 transition hover:scale-110 hover:border-white/40">
                <Emblem id={h.emblem} color={h.color} accent={h.accent} size={34} ring={false} />
              </Link>
            );
          })}
          <Link href={`/story/${ch.id}`} className="group/btn ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 font-tech text-[10px] tracking-[0.25em] text-white transition hover:bg-white hover:text-black" style={{ borderColor: ch.color }}>
            <span className="relative">ENTER CHAPTER</span>
            <span className="transition-transform group-hover/btn:translate-x-1">→</span>
          </Link>
        </div>
      </motion.article>
    </div>
  );
}

export default function StoryTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  let idx = -1;

  return (
    <section id="story" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8">
      <SectionTitle kicker="THE FULL MOVIE" title="Avengers: Endgame — The Complete Story" />
      <p className="mt-6 max-w-2xl text-lg text-white/60">
        <SplitReveal text="From a ship drifting in deep space to a funeral by the lake — every chapter of the Endgame journey, in order." />
      </p>

      <div ref={ref} className="relative mt-20">
        {/* spine */}
        <div className="absolute bottom-0 left-4 top-0 w-[2px] bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div className="absolute bottom-0 left-4 top-0 w-[2px] origin-top md:left-1/2 md:-translate-x-1/2" style={{ scaleY, background: "linear-gradient(#ef4444,#38bdf8,#f59e0b)", boxShadow: "0 0 16px #f59e0b" }} />

        {acts.map((act) => (
          <div key={act.id} className="relative">
            <motion.div
              className="relative z-10 mx-auto my-16 max-w-xl pl-12 text-left md:pl-0 md:text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block rounded-2xl bg-[#05050a] px-6 py-4">
                <p className="font-tech text-xs tracking-[0.5em]" style={{ color: act.color }}>
                  ACT {act.id}
                </p>
                <h3 className="font-display text-5xl tracking-wider text-white sm:text-6xl" style={{ textShadow: `0 0 30px ${act.color}` }}>
                  {act.name}
                </h3>
                <p className="mt-1 text-white/60">{act.line}</p>
              </div>
            </motion.div>
            <div className="flex flex-col gap-12">
              {chapters
                .filter((c) => c.act === act.id)
                .map((ch) => {
                  idx++;
                  return <ChapterCard key={ch.id} ch={ch} index={idx} />;
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
