"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { heroes, type Hero } from "@/lib/heroes";
import Emblem from "../Emblem";
import { Photo } from "../Media";
import { heroImage } from "@/lib/media";
import SignatureFX from "../SignatureFX";
import { SectionTitle, SplitReveal, StatBars, TiltCard } from "../ui";

export function HeroRoster() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {heroes.map((h, i) => (
        <motion.a
          key={h.slug}
          href={`#${h.slug}`}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: (i % 6) * 0.06, duration: 0.6 }}
        >
          <TiltCard glow={h.color} className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-4 text-center transition-colors hover:border-white/30">
            {heroImage(h.slug) && <Photo src={heroImage(h.slug)!} alt={h.name} color={h.color} className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-90" sizes="(max-width: 640px) 50vw, 16vw" />}
            <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-40 transition-opacity group-hover:opacity-80" style={{ background: `linear-gradient(transparent, ${h.color}55)` }} />
            <div className="relative mx-auto w-fit transition-transform duration-500 [transform:translateZ(40px)] group-hover:scale-110">
              <Emblem id={h.emblem} color={h.color} accent={h.accent} size={heroImage(h.slug) ? 60 : 90} />
            </div>
            <p className="relative mt-3 font-display text-xl tracking-wider text-white [transform:translateZ(30px)]">{h.name}</p>
            <p className="relative font-tech text-[9px] tracking-[0.2em] text-white/50">{h.alias.toUpperCase()}</p>
          </TiltCard>
        </motion.a>
      ))}
    </div>
  );
}

export function HeroFeature({ hero, index }: { hero: Hero; index: number }) {
  const flip = index % 2 === 1;
  const photo = heroImage(hero.slug);
  return (
    <section id={hero.slug} className="cv-auto relative scroll-mt-24 py-20">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-40" style={{ background: `radial-gradient(ellipse at ${flip ? "80%" : "20%"} 50%, ${hero.color}33, transparent 60%)` }} />
      {photo && (
        <Photo
          src={photo}
          alt={hero.name}
          color={hero.color}
          className={`absolute inset-y-0 ${flip ? "left-0" : "right-0"} hidden w-1/2 opacity-25 lg:block`}
          sizes="50vw"
        />
      )}
      <div className={`relative grid items-center gap-10 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div>
          <div className="flex items-center gap-4">
            <motion.div initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
              {photo ? (
                <Photo src={photo} alt={hero.name} color={hero.color} className="h-24 w-24 rounded-2xl border-2" sizes="96px" />
              ) : (
                <Emblem id={hero.emblem} color={hero.color} accent={hero.accent} size={84} />
              )}
            </motion.div>
            <span className="font-display text-7xl leading-none text-transparent sm:text-8xl" style={{ WebkitTextStroke: `1.5px ${hero.color}` }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-6 font-tech text-xs tracking-[0.4em]" style={{ color: hero.color }}>
            {hero.alias.toUpperCase()} · {hero.actor.toUpperCase()}
          </p>
          <h3 className="font-display text-6xl leading-none tracking-wide text-white sm:text-8xl" style={{ textShadow: `0 0 40px ${hero.color}66` }}>
            <SplitReveal text={hero.name} />
          </h3>
          <p className="mt-2 font-display text-2xl tracking-wider text-white/60">{hero.tagline}</p>
          <motion.p className="mt-5 leading-relaxed text-white/75" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            {hero.bio}
          </motion.p>
          <motion.div
            className="mt-5 rounded-2xl border-l-4 bg-white/[0.03] p-4"
            style={{ borderColor: hero.color }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-tech text-[10px] tracking-[0.3em] text-white/50">ROLE IN ENDGAME</p>
            <p className="mt-1 text-white/85">{hero.endgameRole}</p>
          </motion.div>
          <div className="mt-6 max-w-md">
            <StatBars stats={hero.stats} color={hero.color} />
          </div>
          <Link href={`/heroes/${hero.slug}`} className="group mt-8 inline-flex items-center gap-2 font-tech text-xs tracking-[0.3em]" style={{ color: hero.color }}>
            FULL PROFILE <span className="transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <div className="mb-3 flex items-center justify-between font-tech text-[10px] tracking-[0.3em] text-white/50">
            <span>SIGNATURE HIT · LIVE</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: hero.color }} /> {hero.signature.damage} DMG
            </span>
          </div>
          <SignatureFX hero={hero} auto height={360} />
          <h4 className="mt-4 font-display text-3xl tracking-wider" style={{ color: hero.color }}>
            {hero.signature.name}
          </h4>
          <p className="text-white/60">{hero.signature.description}</p>
          <p className="mt-4 font-display text-3xl tracking-wide text-white/90">“{hero.quote}”</p>
        </motion.div>
      </div>
    </section>
  );
}

export default function HeroesShowcase() {
  return (
    <section id="heroes" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-8">
      <SectionTitle kicker="EARTH'S MIGHTIEST" title="Every Hero. Every Signature Hit." color="#f5c542" />
      <p className="mt-6 max-w-2xl text-lg text-white/60">Pick a hero below or keep scrolling — each one fights live with their signature move.</p>
      <div className="mt-14">
        <HeroRoster />
      </div>
      <div className="mt-10 divide-y divide-white/5">
        {heroes.map((h, i) => (
          <HeroFeature key={h.slug} hero={h} index={i} />
        ))}
      </div>
    </section>
  );
}
