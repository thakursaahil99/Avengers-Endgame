import { notFound } from "next/navigation";
import HeroDetail from "@/components/HeroDetail";
import { getHero, heroes } from "@/lib/heroes";

export function generateStaticParams() {
  return heroes.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = getHero(slug);
  return { title: h ? `${h.name} — Endgame by Sahil Thakur` : "Hero not found" };
}

export default async function HeroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hero = getHero(slug);
  if (!hero) notFound();
  return <HeroDetail hero={hero} />;
}
