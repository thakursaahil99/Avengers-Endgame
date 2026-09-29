"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

/** True once the opening intro has finished (or immediately on later client navigations). */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.__introDone) {
      setDone(true);
      return;
    }
    const on = () => setDone(true);
    window.addEventListener("intro:done", on);
    return () => window.removeEventListener("intro:done", on);
  }, []);
  return done;
}
