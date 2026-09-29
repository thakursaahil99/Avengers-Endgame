import Link from "next/link";
import { pages } from "@/lib/extra";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 text-center">
        <p className="font-tech text-[10px] tracking-[0.5em] text-white/40">BUILT &amp; CREATED BY</p>
        <p className="fire-text font-display text-5xl tracking-wider sm:text-7xl">SAHIL THAKUR</p>
        <div className="flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3 font-tech text-xs tracking-[0.2em] text-white/60">
          {pages.map((p) => (
            <Link key={p.href} href={p.href} className="transition hover:text-white">
              {p.label.toUpperCase()}
            </Link>
          ))}
        </div>
        <p className="max-w-xl text-sm text-white/40">
          Fan-made tribute. Avengers and all Marvel characters are trademarks of Marvel / Disney. Every visual on this site is an original code-drawn animation.
        </p>
        <p className="font-tech text-[10px] tracking-[0.3em] text-white/30">© {new Date().getFullYear()} SAHIL THAKUR</p>
      </div>
    </footer>
  );
}
