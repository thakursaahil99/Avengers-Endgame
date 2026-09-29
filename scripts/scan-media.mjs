// Scans public/media and writes lib/media-manifest.json so the site only uses photos/videos that actually exist.
// Runs automatically before `npm run dev` and `npm run build`. Run manually: `npm run media`.
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";

const root = join(process.cwd(), "public", "media");
const IMG = [".webp", ".avif", ".jpg", ".jpeg", ".png"];
const VID = [".mp4", ".webm"];

function scanDir(dir) {
  const out = {};
  const full = join(root, dir);
  if (!existsSync(full)) return out;
  for (const f of readdirSync(full)) {
    const { name, ext } = parse(f);
    if (IMG.includes(ext.toLowerCase()) && !out[name]) out[name] = `/media/${dir}/${f}`;
  }
  return out;
}

function findFile(base, exts) {
  if (!existsSync(root)) return null;
  const f = readdirSync(root).find((x) => parse(x).name === base && exts.includes(parse(x).ext.toLowerCase()));
  return f ? `/media/${f}` : null;
}

const manifest = {
  heroes: scanDir("heroes"),
  chapters: scanDir("chapters"),
  villains: scanDir("villains"),
  bgVideo: findFile("bg", VID),
  bgPoster: findFile("bg", IMG),
  trailer: findFile("trailer", VID),
};

writeFileSync(join(process.cwd(), "lib", "media-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
const count = Object.keys(manifest.heroes).length + Object.keys(manifest.chapters).length + Object.keys(manifest.villains).length;
console.log(`[media] ${count} images, bg video: ${manifest.bgVideo ? "yes" : "no"}, local trailer: ${manifest.trailer ? "yes" : "no"}`);
