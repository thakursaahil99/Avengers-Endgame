"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg,#3b82f6,#facc15,#ef4444,#a855f7,#22c55e,#f97316)" }}
    />
  );
}
