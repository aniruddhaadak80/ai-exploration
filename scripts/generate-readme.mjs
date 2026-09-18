import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const libPath = path.join(root, "content", "library.json");
const readmePath = path.join(root, "README.md");
const items = JSON.parse(fs.readFileSync(libPath, "utf8"));
const sorted = items.slice().sort((a, b) => (a.published_on < b.published_on ? 1 : -1));

const topics = new Map();
for (const e of sorted) {
  for (const t of e.topics) {
    if (!topics.has(t)) topics.set(t, []);
    topics.get(t).push(e);
  }
}

const topicRows = Array.from(topics.entries())
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([t, list]) => `| ${t} | ${list.length} | [Open notes](/?topic=${encodeURIComponent(t)}) |`)
  .join("\n");

const recent = sorted.slice(0, 10).map((e) => `- ${e.published_on} [${e.title}](/learn/${e.slug}) (${e.publisher})`).join("\n");

const topicNodes = Array.from(topics.keys()).sort().slice(0, 12).map((t, i) => `  T${i}["${t}"]`).join("\n");
const topicLinks = Array.from(topics.keys()).sort().slice(0, 12).map((_, i) => `  Home --> T${i}`).join("\n");
const mermaid = ["```mermaid", "flowchart TD", "  Home[AI Exploration home]", topicNodes, topicLinks, "```"].filter(Boolean).join("\n");

const auto = [
  "<!-- BEGIN AUTO -->",
  "",
  `Total notes: ${sorted.length}`,
  "",
  "### Topics",
  "",
  "| Topic | Notes | Link |",
  "| --- | --- | --- |",
  topicRows || "| none yet | 0 | - |",
  "",
  "### Recent notes",
  "",
  recent || "No notes yet.",
  "",
  "### Site map",
  "",
  mermaid,
  "",
  "<!-- END AUTO -->",
].join("\n");

let readme = fs.readFileSync(readmePath, "utf8");
const begin = "<!-- BEGIN AUTO -->";
const end = "<!-- END AUTO -->";
if (!readme.includes(begin) || !readme.includes(end)) {
  console.error("README missing AUTO markers");
  process.exit(1);
}
const before = readme.slice(0, readme.indexOf(begin));
const after = readme.slice(readme.indexOf(end) + end.length);
fs.writeFileSync(readmePath, `${before}${auto}${after}`);
console.log(`README updated with ${sorted.length} entries and ${topics.size} topics`);
