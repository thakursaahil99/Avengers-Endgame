import QuotesWall from "@/components/QuotesWall";
import { PageHeader } from "@/components/sections/Extras";

export const metadata = { title: "Iconic Quotes — Endgame by Sahil Thakur" };

export default function QuotesPage() {
  return (
    <>
      <PageHeader kicker="WORDS THAT MATTERED" title="Iconic Quotes" sub="The lines that gave us goosebumps." color="#22c55e" />
      <QuotesWall />
    </>
  );
}
