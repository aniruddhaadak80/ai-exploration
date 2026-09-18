"use client";
import { useEffect, useRef } from "react";

export default function Mermaid({ charts }: { charts: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let alive = true;
    async function run() {
      if (charts.length === 0) return;
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({ startOnLoad: false, theme: "neutral" });
      if (!alive || !ref.current) return;
      ref.current.innerHTML = "";
      charts.forEach((c, i) => {
        const pre = document.createElement("pre");
        pre.className = "mermaid-block";
        pre.textContent = c;
        pre.setAttribute("data-mermaid-index", String(i));
        if (ref.current) ref.current.appendChild(pre);
      });
      try {
        await mermaid.run({ nodes: Array.from(ref.current.querySelectorAll("pre")) });
      } catch {
        // Keep raw text when diagram syntax is still being fixed.
      }
    }
    run();
    return () => {
      alive = false;
    };
  }, [charts]);
  if (charts.length === 0) return null;
  return <div ref={ref} aria-label="Flow diagrams" />;
}
