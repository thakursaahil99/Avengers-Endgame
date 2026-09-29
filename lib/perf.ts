"use client";
import { useSyncExternalStore } from "react";

/**
 * Performance mode.
 *  - "high": every effect on.
 *  - "lite": for low-end PCs (i3 / integrated graphics): no backdrop blur, no SVG glow filters,
 *            no idle emblem spinning, lighter starfield, native scroll, no background video.
 * The user's manual choice is stored; otherwise it is auto-detected.
 */
export type PerfMode = "high" | "lite";
type Choice = PerfMode | "auto";

const KEY = "endgame-perf";
let mode: PerfMode = "high";
let choice: Choice = "auto";
const subs = new Set<() => void>();

function apply(next: PerfMode) {
  mode = next;
  document.documentElement.classList.toggle("lite", next === "lite");
  subs.forEach((f) => f());
}

function readChoice(): Choice {
  try {
    const v = localStorage.getItem(KEY);
    return v === "high" || v === "lite" ? v : "auto";
  } catch {
    return "auto";
  }
}

function hardwareGuess(): PerfMode {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const mem = nav.deviceMemory ?? 8;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "lite";
  if (cores <= 2 || mem <= 2) return "lite";
  if (cores <= 4 && mem <= 4) return "lite";
  return "high";
}

/** Measures real frame rate for ~2.5s; drops to lite if the machine can't keep up. */
function probeFps() {
  let frames = 0;
  const start = performance.now();
  const tick = (t: number) => {
    frames++;
    if (t - start < 2500) return requestAnimationFrame(tick);
    const fps = (frames * 1000) / (t - start);
    if (choice === "auto" && fps < 42 && mode !== "lite") apply("lite");
  };
  requestAnimationFrame(tick);
}

let started = false;
export function initPerf() {
  if (started) return;
  started = true;
  choice = readChoice();
  apply(choice === "auto" ? hardwareGuess() : choice);
  if (choice === "auto") {
    const run = () => (document.hidden ? null : probeFps());
    if ((window as Window & { __introDone?: boolean }).__introDone) run();
    else window.addEventListener("intro:done", () => setTimeout(run, 800), { once: true });
  }
}

export function setPerfChoice(c: Choice) {
  choice = c;
  try {
    if (c === "auto") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, c);
  } catch {}
  apply(c === "auto" ? hardwareGuess() : c);
}

export function getPerfChoice() {
  return choice;
}

function subscribe(f: () => void) {
  subs.add(f);
  return () => subs.delete(f);
}

export function usePerf(): PerfMode {
  return useSyncExternalStore(subscribe, () => mode, () => "high");
}

export function useLite() {
  return usePerf() === "lite";
}
