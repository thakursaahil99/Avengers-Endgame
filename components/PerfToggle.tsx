"use client";
import { useEffect, useState } from "react";
import { getPerfChoice, initPerf, setPerfChoice, usePerf } from "@/lib/perf";

const order = ["auto", "high", "lite"] as const;
const label = { auto: "AUTO", high: "HIGH", lite: "LITE" };

/** Cycles performance mode: Auto → High → Lite. */
export default function PerfToggle() {
  const mode = usePerf();
  const [choice, setChoice] = useState<(typeof order)[number]>("auto");

  useEffect(() => {
    initPerf();
    setChoice(getPerfChoice());
  }, []);

  const next = () => {
    const c = order[(order.indexOf(choice) + 1) % order.length];
    setPerfChoice(c);
    setChoice(c);
  };

  return (
    <button
      onClick={next}
      title="Graphics quality — use LITE on low-end PCs for zero lag"
      className="relative z-50 hidden items-center gap-2 rounded-full border border-white/15 px-3 py-2 font-tech text-[9px] tracking-[0.2em] text-white/70 transition hover:border-white/50 hover:text-white sm:flex"
    >
      <span className="h-2 w-2 rounded-full" style={{ background: mode === "lite" ? "#22c55e" : "#f5c542", boxShadow: `0 0 8px ${mode === "lite" ? "#22c55e" : "#f5c542"}` }} />
      FX: {label[choice]}
      {choice === "auto" && <span className="text-white/40">({mode === "lite" ? "LITE" : "HIGH"})</span>}
    </button>
  );
}
