import Link from "next/link";
import { getAllTopics, getEntriesByTopic } from "@/lib/library";

export default function TopicsPage() {
  const topics = getAllTopics();
  return (
    <main>
      <Link className="back-link" href="/">Back to home</Link>
      <h1>Topics</h1>
      <p className="muted">Browse notes by theme. Each theme grows as new links arrive.</p>
      {topics.map((t) => {
        const items = getEntriesByTopic(t);
        return (
          <section key={t} className="card">
            <h2 style={{ marginTop: 0 }}>
              <Link href={`/?topic=${encodeURIComponent(t)}`}>{t}</Link>
            </h2>
            <p className="muted">{items.length} notes</p>
            <ul>
              {items.slice(0, 8).map((e) => (
                <li key={e.slug}>
                  <Link href={`/learn/${e.slug}`}>{e.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
