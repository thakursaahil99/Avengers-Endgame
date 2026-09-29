import HeroCompare from "@/components/HeroCompare";
import { PageHeader } from "@/components/sections/Extras";

export const metadata = { title: "Hero vs Hero — Endgame by Sahil Thakur" };

export default function ComparePage() {
  return (
    <>
      <PageHeader kicker="HEAD TO HEAD" title="Hero vs Hero" sub="Pick any two Avengers and see how they stack up — stat by stat." color="#f97316" />
      <HeroCompare />
    </>
  );
}
