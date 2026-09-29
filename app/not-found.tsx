import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-tech text-xs tracking-[0.5em] text-[#e11d2e]">ERROR 404</p>
      <h1 className="glitch mt-3 font-display text-8xl text-white" data-text="SNAPPED">SNAPPED</h1>
      <p className="mt-3 text-white/60">This page turned to dust. It was inevitable.</p>
      <Link href="/" className="mt-8 rounded-full bg-[#e11d2e] px-8 py-3 font-tech text-xs tracking-[0.3em] text-white">BRING IT BACK</Link>
    </section>
  );
}
