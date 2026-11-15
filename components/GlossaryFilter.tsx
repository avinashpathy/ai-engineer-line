"use client";
import { useMemo, useState } from "react";

export function GlossaryFilter({ terms }: { terms: [string, string][] }) {
  const [q, setQ] = useState("");
  const v = q.trim().toLowerCase();
  const groups = useMemo(() => {
    const g: Record<string, [string, string][]> = {};
    terms.filter(([t, d]) => !v || (t + " " + d).toLowerCase().includes(v))
      .forEach(t => { const k = /[a-z]/i.test(t[0][0]) ? t[0][0].toUpperCase() : "#"; (g[k] ||= []).push(t); });
    return g;
  }, [terms, v]);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <>
      <nav className="az" aria-label="Jump to letter">
        {letters.map(c => groups[c] ? <a key={c} href={`#g-${c}`}>{c}</a> : <span key={c} aria-hidden="true">{c}</span>)}
      </nav>
      <label htmlFor="gf" className="mono" style={{ display: "block", marginBottom: 6, color: "var(--muted)" }}>Filter terms</label>
      <input id="gf" className="input" type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="e.g. RAG, LoRA, token" maxLength={60} />
      <div className="gl-groups">
        {Object.keys(groups).sort().map(c => (
          <section key={c} id={`g-${c}`} className="gl-group panel">
            <h2>{c}</h2>
            <dl>{groups[c].map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
          </section>
        ))}
        {!Object.keys(groups).length && <p>No terms match &ldquo;{q}&rdquo;.</p>}
      </div>
    </>
  );
}
