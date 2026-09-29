import { notFound } from "next/navigation";
import ChapterScene from "@/components/ChapterScene";
import { chapters } from "@/lib/story";

export function generateStaticParams() {
  return chapters.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = chapters.find((x) => x.id === id);
  return { title: c ? `${c.title} — Endgame by Sahil Thakur` : "Chapter not found" };
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapter = chapters.find((c) => c.id === id);
  if (!chapter) notFound();
  return <ChapterScene chapter={chapter} />;
}
