import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntryHtml, getEntryMeta, getEntrySlugs } from "@/lib/library";
import PdfViewer from "@/components/PdfViewer";
import Mermaid from "@/components/Mermaid";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export function generateStaticParams() {
  return getEntrySlugs().map((slug) => ({ slug }));
}

function extractMermaidCharts(slug: string): string[] {
  const file = path.join(process.cwd(), "content", "entries", `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const text = parsed.content;
  const out: string[] = [];
  const re = /```mermaid([\s\S]*?)```/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    out.push(m[1].trim());
  }
  return out;
}

function stripMermaidFromHtml(html: string): string {
  return html.replace(/<pre><code class="language-mermaid">[\s\S]*?<\/code><\/pre>/g, "");
}

// Next 15 hands dynamic route params to pages as a promise. Reading them
// synchronously compiled, but the build's generated PageProps type rejects the
// old shape, so unwrap it before looking up the entry.
export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getEntryMeta(slug);
  if (!meta) notFound();
  const { html } = await getEntryHtml(slug);
  const charts = extractMermaidCharts(slug);
  const cleanHtml = stripMermaidFromHtml(html);

  return (
    <main>
      <Link className="back-link" href="/">Back to home</Link>
      <p className="muted">{meta.published_on} · {meta.publisher} · {meta.kind}</p>
      <h1>{meta.title}</h1>
      <p>{meta.summary_1_line}</p>
      <div>
        {meta.topics.map((t) => (
          <Link key={t} className="tag" href={`/?topic=${encodeURIComponent(t)}`}>{t}</Link>
        ))}
      </div>
      <Mermaid charts={charts} />
      <article className="content card" dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      <PdfViewer pdfUrl={meta.pdf_url} title={meta.title} />
      <section className="card">
        <h2>Exact source</h2>
        <p>Read the full source when you want every word from the publisher.</p>
        <p>
          <a href={meta.source_url} target="_blank" rel="noreferrer">{meta.source_url}</a>
        </p>
        {meta.source_canonical && meta.source_canonical !== meta.source_url ? (
          <p className="muted">Resolved page: <a href={meta.source_canonical} target="_blank" rel="noreferrer">{meta.source_canonical}</a></p>
        ) : null}
      </section>
      <p>
        <Link href="/">Back to home</Link>
        <span className="muted"> · </span>
        <Link href="/topics">Browse topics</Link>
      </p>
    </main>
  );
}
