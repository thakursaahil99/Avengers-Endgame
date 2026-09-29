import HeroBanner from "@/components/sections/HeroBanner";
import StoryTimeline from "@/components/sections/StoryTimeline";
import HeroesShowcase from "@/components/sections/HeroesShowcase";
import StonesSection from "@/components/sections/StonesSection";
import ThanosSection from "@/components/sections/ThanosSection";
import BattleArena from "@/components/sections/BattleArena";
import { Trailer } from "@/components/Media";
import { AssembleFinale, ExplorePages, HeroMarquee } from "@/components/sections/Extras";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <HeroMarquee />
      <Trailer />
      <StoryTimeline />
      <HeroesShowcase />
      <StonesSection />
      <ThanosSection />
      <BattleArena />
      <ExplorePages />
      <AssembleFinale />
    </>
  );
}
