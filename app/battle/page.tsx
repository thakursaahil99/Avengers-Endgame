import BattleArena from "@/components/sections/BattleArena";
import ThanosSection from "@/components/sections/ThanosSection";
import { PageHeader } from "@/components/sections/Extras";

export const metadata = { title: "Final Battle — Endgame by Sahil Thakur" };

export default function BattlePage() {
  return (
    <>
      <PageHeader kicker="INTERACTIVE" title="Final Battle" sub="Assemble your team and take down Thanos yourself." color="#ff3b30" />
      <BattleArena />
      <ThanosSection />
    </>
  );
}
