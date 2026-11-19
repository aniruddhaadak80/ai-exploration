import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  description: "Simple human notes on daily AI news, model releases, agent releases, and alignment papers.",
  title: "AI Exploration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="nav">
          <Link href="/">AI Exploration</Link>
          <div className="row">
            <Link href="/">Home</Link>
            <Link href="/topics">Topics</Link>
            <a href="https://github.com/aniruddhaadak80/ai-exploration">GitHub</a>
          </div>
        </div>
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}
