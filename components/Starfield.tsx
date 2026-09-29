"use client";
import { useEffect, useRef } from "react";
import { useLite } from "@/lib/perf";

/**
 * Full-screen warp-speed starfield with mouse parallax and scroll-boosted velocity.
 * Lite mode: fewer stars, 1x pixel ratio, capped at ~30fps. Always pauses when the tab is hidden.
 */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  const lite = useLite();

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    let w = 0,
      h = 0,
      raf = 0,
      last = 0;
    const colors = ["#ffffff", "#f5c542", "#60a5fa", "#e11d2e", "#a855f7"];
    const small = window.innerWidth < 700;
    const N = lite ? (small ? 90 : 160) : small ? 200 : 420;
    const frameMs = lite ? 1000 / 30 : 0;
    const stars = Array.from({ length: N }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 1000,
      c: colors[Math.random() < 0.8 ? 0 : 1 + Math.floor(Math.random() * 4)],
    }));
    let mx = 0,
      my = 0,
      boost = 0,
      lastY = window.scrollY;

    const resize = () => {
      const dpr = lite ? 1 : Math.min(window.devicePixelRatio, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#05050a";
      ctx.fillRect(0, 0, w, h);
    };
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / w - 0.5) * 60;
      my = (e.clientY / h - 0.5) * 60;
    };
    const onScroll = () => {
      boost = Math.min(30, boost + Math.abs(window.scrollY - lastY) * 0.08);
      lastY = window.scrollY;
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (frameMs && t - last < frameMs) return;
      last = t;
      ctx.fillStyle = "rgba(5,5,10,0.35)";
      ctx.fillRect(0, 0, w, h);
      const speed = (1.2 + boost) * (lite ? 2 : 1);
      boost *= 0.92;
      for (const s of stars) {
        const pz = s.z;
        s.z -= speed;
        if (s.z < 1) {
          s.z = 1000;
          s.x = (Math.random() - 0.5) * 2000;
          s.y = (Math.random() - 0.5) * 2000;
          continue;
        }
        const k = 300 / s.z,
          pk = 300 / pz;
        const x = s.x * k + w / 2 - mx,
          y = s.y * k + h / 2 - my;
        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;
        const px = s.x * pk + w / 2 - mx,
          py = s.y * pk + h / 2 - my;
        const a = 1 - s.z / 1000;
        ctx.strokeStyle = s.c;
        ctx.globalAlpha = a;
        ctx.lineWidth = a * 2.2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const onVisibility = () => {
      document.documentElement.classList.toggle("paused", document.hidden);
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [lite]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden />;
}
