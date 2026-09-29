"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useLite } from "@/lib/perf";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const lite = useLite();

  useEffect(() => {
    if (lite || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
    document.body.classList.add("custom-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest?.("a,button,[data-hover]"));
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
    };
  }, [x, y, lite]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[200] -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#f5c542]" style={{ x, y }} />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full border-2 border-[#e11d2e]"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hover ? 64 : 34,
          height: hover ? 64 : 34,
          scale: down ? 0.7 : 1,
          borderColor: hover ? "#f5c542" : "#e11d2e",
          boxShadow: hover ? "0 0 24px #f5c542" : "0 0 10px #e11d2e",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </>
  );
}
