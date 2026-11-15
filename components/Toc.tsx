"use client";
import { useEffect, useState } from "react";
import type { Heading } from "@/lib/content";

export function Toc({ headings, title = "On this page" }: { headings: Heading[]; title?: string }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = headings.map(h => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    if (!("IntersectionObserver" in window) || !els.length) return;
    const io = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id);
    }, { rootMargin: "-80px 0px -70% 0px" });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, [headings]);
  return (
    <nav className="ticket panel" aria-label={title}>
      <h4>{title}</h4>
      <ul>{headings.map(h => <li key={h.id} className={h.depth === 3 ? "d3" : ""}><a href={`#${h.id}`} className={active === h.id ? "active" : ""}>{h.text}</a></li>)}</ul>
    </nav>
  );
}
