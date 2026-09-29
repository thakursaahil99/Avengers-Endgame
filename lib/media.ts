import manifest from "./media-manifest.json";

/** Official trailer from Marvel Entertainment's YouTube channel. */
export const TRAILER_YT_ID = "TcMBFSGVi1c";

type Map = Record<string, string>;
const m = manifest as { heroes: Map; chapters: Map; villains: Map; bgVideo: string | null; bgPoster: string | null; trailer: string | null };

export const heroImage = (slug: string): string | undefined => m.heroes[slug];
export const chapterImage = (id: string): string | undefined => m.chapters[id];
export const villainImage = (id: string): string | undefined => m.villains[id];
export const bgVideo = m.bgVideo;
export const bgPoster = m.bgPoster;
export const localTrailer = m.trailer;
