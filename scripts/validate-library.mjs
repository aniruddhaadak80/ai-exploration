import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const libPath = path.join(root, "content", "library.json");
const entriesDir = path.join(root, "content", "entries");

function isUrl(v) {
  return typeof v === "string" && /^https:\/\/.+/.test(v);
}

function fail(msg) {
  console.error(`validate error: ${msg}`);
  process.exitCode = 1;
}

const raw = fs.readFileSync(libPath, "utf8");
let items;
try {
  items = JSON.parse(raw);
} catch {
  console.error("validate error: library.json is not valid JSON");
  process.exit(1);
}

const slugs = new Set();
for (const [i, e] of items.entries()) {
  if (!e.slug || typeof e.slug !== "string") fail(`item ${i} missing slug`);
  if (slugs.has(e.slug)) fail(`duplicate slug ${e.slug}`);
  slugs.add(e.slug);
  if (!e.title) fail(`${e.slug} missing title`);
  if (!isUrl(e.source_url)) fail(`${e.slug} source_url must be an https URL`);
  if (e.source_canonical && e.source_canonical.length > 0 && !isUrl(e.source_canonical)) fail(`${e.slug} source_canonical must be https or empty`);
  if (e.pdf_url && e.pdf_url.length > 0 && !isUrl(e.pdf_url)) fail(`${e.slug} pdf_url must be https or empty`);
  if (!Array.isArray(e.topics) || e.topics.length === 0) fail(`${e.slug} needs at least one topic`);
  if (!e.route || e.route !== `/learn/${e.slug}`) fail(`${e.slug} route must be /learn/${e.slug}`);
  const mdPath = path.join(entriesDir, `${e.slug}.md`);
  if (!fs.existsSync(mdPath)) {
    fail(`${e.slug} missing file content/entries/${e.slug}.md`);
    continue;
  }
  const md = fs.readFileSync(mdPath, "utf8");
  const parsed = matter(md);
  for (const k of ["slug", "title", "source_url", "publisher", "published_on", "topics", "kind", "summary_1_line"]) {
    if (!parsed.data[k] || (Array.isArray(parsed.data[k]) && parsed.data[k].length === 0)) fail(`${e.slug}.md missing frontmatter ${k}`);
  }
  if (parsed.data.slug !== e.slug) fail(`${e.slug}.md frontmatter slug mismatch`);
  if (md.includes("—")) fail(`${e.slug}.md must not contain em dash`);
  if (md.includes("!")) fail(`${e.slug}.md must not contain exclamation mark`);
  if (e.cover_image && e.cover_image.length > 0) {
    const local = e.cover_image.startsWith("/") ? e.cover_image.slice(1) : e.cover_image;
    if (e.cover_image.startsWith("/") && !fs.existsSync(path.join(root, "public", e.cover_image.slice(1)))) {
      fail(`${e.slug} cover image missing at public/${local}`);
    }
  }
}

if (process.exitCode) {
  console.error("validation failed");
} else {
  console.log(`validation passed for ${items.length} entries`);
}
