import HeroesShowcase from "@/components/sections/HeroesShowcase";
import ThanosSection from "@/components/sections/ThanosSection";
import { PageHeader } from "@/components/sections/Extras";

export const metadata = { title: "Heroes — Endgame by Sahil Thakur" };

export default function HeroesPage() {
  return (
    <>
      <PageHeader kicker="EARTH'S MIGHTIEST" title="The Heroes" sub="Seventeen heroes, seventeen signature hits — each one animated live as they fight." color="#f5c542" />
      <HeroesShowcase />
      <ThanosSection />
    </>
  );
}
