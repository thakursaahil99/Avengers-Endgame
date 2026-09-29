import type { Metadata } from "next";
import { Bebas_Neue, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Starfield from "@/components/Starfield";
import IntroSequence from "@/components/IntroSequence";
import ScrollProgress from "@/components/ScrollProgress";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const rajdhani = Rajdhani({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-rajdhani" });

export const metadata: Metadata = {
  title: "Avengers: Endgame — The Experience | by Sahil Thakur",
  description:
    "A fully animated Avengers: Endgame fan experience. The full story, every hero, signature moves and the final battle. Built & created by Sahil Thakur.",
  authors: [{ name: "Sahil Thakur" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${orbitron.variable} ${rajdhani.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply performance mode before first paint so low-end PCs never render the heavy effects. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var c=localStorage.getItem("endgame-perf"),n=navigator,k=n.hardwareConcurrency||8,m=n.deviceMemory||8;var lite=c?c==="lite":(matchMedia("(prefers-reduced-motion: reduce)").matches||k<=2||m<=2||(k<=4&&m<=4));if(lite)document.documentElement.classList.add("lite")}catch(e){}`,
          }}
        />
      </head>
      <body className="noise antialiased">
        <IntroSequence />
        <SmoothScroll />
        <Cursor />
        <Starfield />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
