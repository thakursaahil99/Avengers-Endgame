import VillainsGallery from "@/components/VillainsGallery";
import { PageHeader } from "@/components/sections/Extras";

export const metadata = { title: "Villains — Endgame by Sahil Thakur" };

export default function VillainsPage() {
  return (
    <>
      <PageHeader kicker="THE INEVITABLE" title="Thanos & His Army" sub="The Mad Titan, the Black Order and the endless army they brought to 2023." color="#7c3aed" />
      <VillainsGallery />
    </>
  );
}
