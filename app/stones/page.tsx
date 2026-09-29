import StonesSection from "@/components/sections/StonesSection";
import { PageHeader } from "@/components/sections/Extras";

export const metadata = { title: "Infinity Stones — Endgame by Sahil Thakur" };

export default function StonesPage() {
  return (
    <>
      <PageHeader kicker="THE TIME HEIST" title="Infinity Stones" sub="Where every stone was found in the past, and who brought it home." color="#a855f7" />
      <StonesSection />
    </>
  );
}
