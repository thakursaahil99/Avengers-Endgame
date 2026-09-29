"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { pages } from "@/lib/extra";
import PerfToggle from "./PerfToggle";

const barLinks = ["/", "/story", "/time-heist", "/heroes", "/battle"];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setSolid(y > 40);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid && !open ? "border-b border-white/5 bg-black/60 backdrop-blur-xl" : ""}`}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <Link href="/" className="group relative z-50 flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-[#e11d2e] font-display text-2xl text-white transition-all duration-700 group-hover:rotate-[360deg] group-hover:border-[#f5c542]">
              A
            </span>
            <span className="leading-none">
              <span className="block font-display text-2xl tracking-widest text-white">ENDGAME</span>
              <span className="block font-tech text-[9px] tracking-[0.3em] text-[#f5c542]">BY SAHIL THAKUR</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {pages
              .filter((p) => barLinks.includes(p.href))
              .map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="relative block px-4 py-2 font-tech text-xs uppercase tracking-[0.2em] text-white/70 transition hover:text-white">
                    {active(l.href) && !open && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-[#e11d2e]/60 bg-[#e11d2e]/15 shadow-[0_0_20px_rgba(225,29,46,.4)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative ${active(l.href) ? "text-white" : ""}`}>{l.label}</span>
                  </Link>
                </li>
              ))}
          </ul>

          <div className="flex items-center gap-2">
          <PerfToggle />
          <button onClick={() => setOpen((o) => !o)} className="relative z-50 flex items-center gap-3 rounded-full border border-white/20 py-2 pl-4 pr-3 transition hover:border-white/60" aria-label="Menu">
            <span className="font-tech text-[10px] tracking-[0.3em] text-white">{open ? "CLOSE" : "MENU"}</span>
            <span className="flex h-5 w-6 flex-col items-center justify-center gap-1.5">
              <motion.span className="h-0.5 w-6 bg-white" animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} />
              <motion.span className="h-0.5 w-6 bg-white" animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }} />
            </span>
          </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-40 overflow-y-auto bg-[#05050a]/97 backdrop-blur-xl"
            initial={{ clipPath: "circle(0% at calc(100% - 60px) 36px)" }}
            animate={{ clipPath: "circle(160% at calc(100% - 60px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 60px) 36px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div className="pointer-events-none fixed right-[-10vw] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full blur-3xl" animate={{ background: `radial-gradient(circle, ${pages[hover].color}44, transparent 70%)` }} />
            <div className="relative mx-auto grid min-h-full max-w-7xl gap-10 px-4 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
              <ul className="flex flex-col">
                {pages.map((p, i) => (
                  <motion.li key={p.href} initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.5 }} onMouseEnter={() => setHover(i)}>
                    <Link href={p.href} onClick={() => setOpen(false)} className="group flex items-baseline gap-4 border-b border-white/5 py-2 sm:py-3">
                      <span className="w-8 font-tech text-[10px] text-white/40">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className="font-display text-4xl tracking-wider transition-all duration-300 group-hover:translate-x-4 sm:text-6xl"
                        style={{ color: active(p.href) ? p.color : undefined, textShadow: hover === i ? `0 0 30px ${p.color}` : "none" }}
                      >
                        {p.label}
                      </span>
                      <span className="ml-auto hidden font-tech text-[10px] tracking-[0.2em] text-white/40 sm:block">{p.sub.toUpperCase()}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div className="hidden flex-col justify-center lg:flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={hover} initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -20, filter: "blur(8px)" }} transition={{ duration: 0.3 }}>
                    <p className="font-tech text-xs tracking-[0.4em]" style={{ color: pages[hover].color }}>
                      PAGE {String(hover + 1).padStart(2, "0")} / {pages.length}
                    </p>
                    <p className="mt-2 font-display text-8xl leading-none text-white">{pages[hover].label}</p>
                    <p className="mt-3 text-xl text-white/60">{pages[hover].sub}</p>
                  </motion.div>
                </AnimatePresence>
                <p className="mt-16 font-tech text-[10px] tracking-[0.4em] text-white/30">BUILT &amp; CREATED BY SAHIL THAKUR</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
