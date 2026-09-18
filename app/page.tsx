import Link from "next/link";
import { getAllEntries, getAllTopics } from "@/lib/library";

export default function Home({ searchParams }: { searchParams?: { q?: string; topic?: string } }) {
  const q = (searchParams?.q ?? "").toLowerCase().trim();
  const topic = (searchParams?.topic ?? "").toLowerCase().trim();
  const all = getAllEntries();
  const topics = getAllTopics();
  const filtered = all.filter((e) => {
    const matchQ = q.length === 0 || `${e.title} ${e.summary_1_line} ${e.topics.join(" ")}`.toLowerCase().includes(q);
    const matchT = topic.length === 0 || e.topics.map((t) => t.toLowerCase()).includes(topic);
    return matchQ && matchT;
  });

  return (
    <main>
      <h1>AI Exploration, in plain words</h1>
      <p className="muted">
        I read daily AI news, lab reports, model notes, agent notes, and alignment papers, then rewrite each link
        in short and calm sentences. Start here when the full source feels long.
      </p>
      <form method="get" action="/">
        <input type="search" name="q" placeholder="Search by title, topic, or keyword" defaultValue={searchParams?.q ?? ""} />
      </form>
      <div style={{ marginTop: 12 }}>
        <Link className="tag" href="/">all</Link>
        {topics.map((t) => (
          <Link key={t} className="tag" href={`/?topic=${encodeURIComponent(t)}`}>
            {t}
          </Link>
        ))}
      </div>
      <p className="muted">{filtered.length} notes out of {all.length} total</p>
      {filtered.map((e) => (
        <article key={e.slug} className="card">
          <p className="muted" style={{ margin: 0 }}>{e.published_on} · {e.publisher}</p>
          <h2 style={{ margin: "8px 0" }}>
            <Link href={`/learn/${e.slug}`}>{e.title}</Link>
          </h2>
          <p style={{ margin: "8px 0" }}>{e.summary_1_line}</p>
          <div>
            {e.topics.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <p style={{ marginBottom: 0 }}>
            <Link href={`/learn/${e.slug}`}>Read the simple note</Link>
            <span className="muted"> · </span>
            <a href={e.source_url} target="_blank" rel="noreferrer">Open exact source</a>
          </p>
        </article>
      ))}
    </main>
  );
}
