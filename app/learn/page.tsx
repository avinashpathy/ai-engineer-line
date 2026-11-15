import Link from "next/link";
import type { Metadata } from "next";
import { LINES, STATIONS, LEVEL_LABEL } from "@/lib/curriculum";
import { availableLessonKeys } from "@/lib/content";
import { LinesDiagram } from "@/components/progress-ui";

export const metadata: Metadata = { title: "Learn", description: "Every line, station and lesson in the AI Engineer Line curriculum." };

export default function Learn() {
  const ready = new Set(availableLessonKeys());
  return (
    <div className="wrap">
      <div className="phead"><span className="mono">{STATIONS.length} stations · {[...ready].length} lessons published</span><h1>All lines</h1>
        <p>Foundations first, then LLM engineering, RAG, agents and production. Career prep runs alongside. Each station page lists its lessons and their level.</p></div>
      <LinesDiagram readyKeys={[...ready]} />
      {LINES.map(line => (
        <section key={line.id} className="sec" data-line={line.id} style={{ paddingTop: 44, paddingBottom: 0 }}>
          <div className="sec-head"><h2 style={{ display: "flex", gap: 12, alignItems: "center" }}><span className="badge">{line.code}</span>{line.name}</h2><p>{line.note}</p></div>
          <div className="proj-grid">
            {STATIONS.filter(s => s.line === line.id).map((s, i) => {
              const n = s.lessons.filter(l => ready.has(`${s.id}/${l.slug}`)).length;
              const levels = [...new Set(s.lessons.map(l => l.level))];
              return (
                <Link key={s.id} href={`/learn/${s.id}/`} className="proj panel">
                  <div className="ph" style={{ background: "var(--c)", color: "var(--on)" }}><span className="disp" style={{ fontSize: "1.6rem" }}>{line.code}{String(i + 1).padStart(2, "0")}</span><span className="mono">{n ? `${n}/${s.lessons.length} lessons` : "coming soon"}</span></div>
                  <div className="pb"><h3>{s.title}</h3><p>{s.blurb}</p>
                    <div className="tags">{levels.map(l => <span key={l} className="lvl" data-level={l}>{LEVEL_LABEL[l]}</span>)}</div></div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
