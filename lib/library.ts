import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export type EntryMeta = {
  slug: string;
  title: string;
  source_url: string;
  source_canonical: string;
  publisher: string;
  published_on: string;
  topics: string[];
  kind: string;
  summary_1_line: string;
  pdf_url: string;
  cover_image: string;
  added_on: string;
  route: string;
  status: string;
};

const root = process.cwd();
const libraryPath = path.join(root, "content", "library.json");
const entriesDir = path.join(root, "content", "entries");

export function getAllEntries(): EntryMeta[] {
  const raw = fs.readFileSync(libraryPath, "utf8");
  const items = JSON.parse(raw) as EntryMeta[];
  return items.slice().sort((a, b) => (a.published_on < b.published_on ? 1 : -1));
}

export function getAllTopics(): string[] {
  const set = new Set<string>();
  for (const e of getAllEntries()) {
    for (const t of e.topics) set.add(t);
  }
  return Array.from(set).sort();
}

export function getEntriesByTopic(topic: string): EntryMeta[] {
  const low = topic.toLowerCase();
  return getAllEntries().filter((e) => e.topics.map((t) => t.toLowerCase()).includes(low));
}

export function getEntrySlugs(): string[] {
  return getAllEntries().map((e) => e.slug);
}

export function getEntryMeta(slug: string): EntryMeta | undefined {
  return getAllEntries().find((e) => e.slug === slug);
}

export async function getEntryHtml(slug: string): Promise<{ meta: EntryMeta; html: string }> {
  const meta = getEntryMeta(slug);
  if (!meta) throw new Error(`Missing entry ${slug}`);
  const file = path.join(entriesDir, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const out = await remark().use(remarkHtml, { sanitize: false }).process(parsed.content);
  return { meta, html: String(out) };
}
