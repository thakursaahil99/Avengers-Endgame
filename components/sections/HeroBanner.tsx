"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AvengersLogo from "../AvengersLogo";
import { MagneticLink } from "../ui";
import { stones } from "@/lib/story";
import { useIntroDone } from "@/lib/useIntroDone";
import { BackgroundVideo } from "../Media";

export default function HeroBanner() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24">
      <BackgroundVideo />
      <div className="grid-bg absolute inset-0" />
      <motion.div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(225,29,46,.28), transparent 60%)", scale }} />

      {/* orbiting stones */}
      <motion.div className="absolute left-1/2 top-1/2 h-[min(78vmin,620px)] w-[min(78vmin,620px)] -translate-x-1/2 -translate-y-1/2" style={{ y, opacity }}>
        <motion.div className="relative h-full w-full rounded-full border border-white/10" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          {stones.map((s, i) => {
            const ang = (i / stones.length) * Math.PI * 2;
            return (
              <motion.span
                key={s.id}
                className="absolute h-5 w-5 rounded-full sm:h-7 sm:w-7"
                style={{ left: `${50 + Math.cos(ang) * 50}%`, top: `${50 + Math.sin(ang) * 50}%`, x: "-50%", y: "-50%", background: `radial-gradient(circle at 30% 30%, #fff, ${s.color} 45%, #000 120%)`, boxShadow: `0 0 20px ${s.color}, 0 0 50px ${s.color}` }}
                initial={{ scale: 0 }}
                animate={ready ? { scale: [0, 1.4, 1] } : {}}
                transition={{ delay: 1.2 + i * 0.12, duration: 0.6 }}
              />
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div className="relative z-10 flex flex-col items-center text-center" style={{ y: titleY, opacity }}>
        {ready && <AvengersLogo size={130} duration={1.2} />}
        <motion.p className="mt-6 font-tech text-[10px] tracking-[0.6em] text-[#f5c542] sm:text-xs" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          PART OF THE JOURNEY IS THE END
        </motion.p>
        <h1 className="mt-2 font-display leading-[0.85]">
          <span className="block overflow-hidden">
            <motion.span className="metal-text block text-[22vw] tracking-wider sm:text-[15vw] lg:text-[11rem]" initial={{ y: "100%" }} animate={ready ? { y: 0 } : {}} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              AVENGERS
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="fire-text block text-[13vw] tracking-[0.35em] sm:text-[9vw] lg:text-[6.5rem]" initial={{ y: "100%" }} animate={ready ? { y: 0 } : {}} transition={{ delay: 0.75, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              ENDGAME
            </motion.span>
          </span>
        </h1>
        <motion.p className="mt-6 max-w-xl text-lg text-white/70" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1 }}>
          The complete story, every hero, all six stones and the final battle — fully animated. Scroll to relive it from A to Z.
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap justify-center gap-4" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.3 }}>
          <MagneticLink href="#story">Start the Story</MagneticLink>
          <MagneticLink href="#battle" variant="ghost">
            Jump to Battle
          </MagneticLink>
        </motion.div>
      </motion.div>

      <motion.a href="#story" className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-tech text-[10px] tracking-[0.4em] text-white/50" style={{ opacity }}>
        SCROLL
        <span className="relative h-10 w-6 rounded-full border border-white/30">
          <motion.span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-[#e11d2e]" animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
        </span>
      </motion.a>
    </section>
  );
}
