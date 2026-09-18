import type { Metadata } from "next";
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
          <a href="/">AI Exploration</a>
          <div className="row">
            <a href="/">Home</a>
            <a href="/topics">Topics</a>
            <a href="https://github.com/aniruddhaadak80/ai-exploration">GitHub</a>
          </div>
        </div>
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}
