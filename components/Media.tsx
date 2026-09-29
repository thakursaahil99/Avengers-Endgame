"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { bgPoster, bgVideo, localTrailer, TRAILER_YT_ID } from "@/lib/media";
import { useLite } from "@/lib/perf";

/** Optimized photo (auto WebP/AVIF, lazy, responsive) with cinematic overlay. */
export function Photo({ src, alt, color, className = "", priority = false, kenburns = false, sizes = "(max-width: 768px) 100vw, 50vw" }: { src: string; alt: string; color: string; className?: string; priority?: boolean; kenburns?: boolean; sizes?: string }) {
  return (
    <div className={`${className.split(" ").includes("absolute") ? "" : "relative "}overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} quality={70} priority={priority} className={`object-cover ${kenburns ? "kenburns" : ""}`} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, #05050a 100%), linear-gradient(90deg, ${color}33, transparent 60%)` }} />
    </div>
  );
}

/**
 * Muted looping background video. Only loads on "high" mode and only while on screen —
 * low-end PCs see the poster image (or nothing) instead.
 */
export function BackgroundVideo({ opacity = 0.35 }: { opacity?: number }) {
  const lite = useLite();
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.1 });
    io.observe(v);
    return () => io.disconnect();
  }, [lite]);

  if (!bgVideo && !bgPoster) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity }}>
      {bgVideo && !lite ? (
        <video ref={ref} className="h-full w-full object-cover" src={bgVideo} poster={bgPoster ?? undefined} muted loop playsInline preload="none" />
      ) : (
        bgPoster && <Image src={bgPoster} alt="" fill sizes="100vw" quality={60} className="object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05050a]/40 via-transparent to-[#05050a]" />
    </div>
  );
}

/**
 * Trailer with a click-to-play facade: only a thumbnail loads up front,
 * the heavy YouTube player loads only when the user presses play.
 */
export function Trailer() {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${TRAILER_YT_ID}/hqdefault.jpg`;

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <p className="font-tech text-xs tracking-[0.4em] text-[#e11d2e]">{"// OFFICIAL TRAILER"}</p>
      <h2 className="mt-2 font-display text-5xl text-white sm:text-7xl">Watch the Trailer</h2>
      <motion.div
        className="relative mt-10 aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_0_80px_rgba(225,29,46,.25)]"
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {playing ? (
          localTrailer ? (
            <video className="h-full w-full" src={localTrailer} controls autoPlay playsInline />
          ) : (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${TRAILER_YT_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Avengers: Endgame — Official Trailer"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )
        ) : (
          <button onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label="Play trailer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb} alt="Avengers: Endgame official trailer" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90" />
            <span className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#e11d2e] shadow-[0_0_60px_#e11d2e] transition group-hover:scale-110">
              <span className="ml-1.5 h-0 w-0 border-y-[14px] border-l-[24px] border-y-transparent border-l-white" />
            </span>
            <span className="absolute bottom-6 left-6 text-left">
              <span className="block font-display text-4xl tracking-wide text-white">Avengers: Endgame</span>
              <span className="font-tech text-[10px] tracking-[0.3em] text-white/60">OFFICIAL TRAILER · MARVEL ENTERTAINMENT</span>
            </span>
          </button>
        )}
      </motion.div>
    </section>
  );
}
