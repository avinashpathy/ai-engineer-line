import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/content";
import { STATIONS, lineOf, type LineId } from "@/lib/curriculum";

export const metadata: Metadata = { title: "Projects", description: "Ten production-ready AI engineering projects with architecture, build steps, evaluation, security and deployment." };

export default function Projects() {
  const ps = projects();
  return (
    <div className="wrap">
      <div className="phead"><span className="mono">{ps.length} projects</span><h1>Projects</h1>
        <p>Each project is specified to production standard: architecture, a milestone-by-milestone build, an evaluation plan, a security checklist and deployment. Pick three, build them properly, and you have a portfolio that AI-engineering teams hire from.</p></div>
      <div className="proj-grid" style={{ paddingBottom: 40 }}>
        {ps.map(p => (
          <Link key={p.slug} className="proj panel" href={`/projects/${p.slug}/`}>
            <div className="ph"><span className="no">{String(p.order).padStart(2, "0")}</span><span className="mono">{p.level} · {p.weeks}</span></div>
            <div className="pb">
              <h3>{p.title}</h3><p>{p.tagline}</p>
              <div className="tags">{p.stack.slice(0, 6).map(s => <span key={s} className="tag">{s}</span>)}</div>
            </div>
            <div className="pf">
              <span style={{ display: "flex", gap: 4 }}>{p.lines.map(l => <span key={l} className="badge sm" data-line={l}>{lineOf(l as LineId).code}</span>)}</span>
              <span className="disp" style={{ fontSize: "1.3rem" }}>Open →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
