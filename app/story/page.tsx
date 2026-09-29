import StoryTimeline from "@/components/sections/StoryTimeline";
import { Trailer } from "@/components/Media";
import StonesSection from "@/components/sections/StonesSection";
import { PageHeader } from "@/components/sections/Extras";

export const metadata = { title: "The Full Story — Endgame by Sahil Thakur" };

export default function StoryPage() {
  return (
    <>
      <PageHeader kicker="THE FULL MOVIE" title="Whatever It Takes" sub="Three acts, fourteen chapters — the entire Avengers: Endgame journey from the aftermath to the farewell." />
      <Trailer />
      <StoryTimeline />
      <StonesSection />
    </>
  );
}
