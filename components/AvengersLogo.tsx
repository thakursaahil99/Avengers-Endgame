"use client";
import { motion } from "framer-motion";

export default function AvengersLogo({
  size = 200,
  color = "#e8e8f0",
  glow = "#e11d2e",
  delay = 0,
  duration = 1.8,
}: {
  size?: number;
  color?: string;
  glow?: string;
  delay?: number;
  duration?: number;
}) {
  const draw = (d = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { delay: delay + d, duration, ease: [0.65, 0, 0.35, 1] as const }, opacity: { delay: delay + d, duration: 0.2 } },
  });
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 18px ${glow})`, overflow: "visible" }}>
      <motion.path
        d="M 150 38 A 80 80 0 1 0 172 128"
        fill="none"
        stroke={color}
        strokeWidth={14}
        strokeLinecap="round"
        {...draw(0)}
      />
      <motion.path
        d="M 42 178 L 116 14 L 140 14 L 140 186"
        fill="none"
        stroke={color}
        strokeWidth={16}
        strokeLinejoin="miter"
        {...draw(0.35)}
      />
      <motion.path d="M 132 14 L 166 -4 L 150 30" fill={color} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: delay + duration, type: "spring" }} />
      <motion.path d="M 82 118 L 140 118" fill="none" stroke={color} strokeWidth={14} {...draw(0.8)} />
    </svg>
  );
}
