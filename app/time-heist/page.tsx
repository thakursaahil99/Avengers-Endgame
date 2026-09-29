import TimeHeist from "@/components/TimeHeist";
import { PageHeader } from "@/components/sections/Extras";

export const metadata = { title: "Time Heist — Endgame by Sahil Thakur" };

export default function TimeHeistPage() {
  return (
    <>
      <PageHeader kicker="QUANTUM REALM" title="The Time Heist" sub="Five destinations, four eras, six stones. Pick an era, jump through the quantum tunnel and collect them all." color="#14b8a6" />
      <TimeHeist />
    </>
  );
}
