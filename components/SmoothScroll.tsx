"use client";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLite } from "@/lib/perf";

/** Lenis smooth scrolling on capable machines; native scrolling in lite mode (cheaper and feels better at low FPS). */
export default function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const lite = useLite();

  useEffect(() => {
    if (lite || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.15, anchors: { offset: -80 }, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.current = l;
    let id = 0;
    const raf = (time: number) => {
      l.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      l.destroy();
      lenis.current = null;
    };
  }, [lite]);

  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
