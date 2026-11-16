import Link from "next/link";
import type { Metadata } from "next";
import { projectLabel, projects, type ProjectMeta } from "@/lib/content";
import { lineOf, type LineId } from "@/lib/curriculum";

export const metadata: Metadata = { title: "Projects", description: "Three beginner starter projects with complete code, and eleven production-ready AI engineering projects with architecture, build steps, evaluation, security and deployment." };

function Card({ p }: { p: ProjectMeta }) {
  return (
    <Link className="proj panel" href={`/projects/${p.slug}/`}>
      <div className="ph"><span className="no">{projectLabel(p)}</span><span className="mono">{p.level} · {p.weeks}</span></div>
      <div className="pb">
        <h3>{p.title}</h3><p>{p.tagline}</p>
        <div className="tags">{p.stack.slice(0, 6).map(s => <span key={s} className="tag">{s}</span>)}</div>
      </div>
      <div className="pf">
        <span style={{ display: "flex", gap: 4 }}>{p.lines.map(l => <span key={l} className="badge sm" data-line={l}>{lineOf(l as LineId).code}</span>)}</span>
        <span className="disp" style={{ fontSize: "1.3rem" }}>Open →</span>
      </div>
    </Link>
  );
}

export default function Projects() {
  const ps = projects();
  const starters = ps.filter(p => p.starter), portfolio = ps.filter(p => !p.starter);
  return (
    <div className="wrap">
      <div className="phead"><span className="mono">{starters.length} starter + {portfolio.length} portfolio projects</span><h1>Projects</h1>
        <p>New to AI? Start with the starter projects: each one gives you complete, runnable code and explains every line. The portfolio projects are specified to production standard — architecture, a milestone-by-milestone build, an evaluation plan, a security checklist and deployment. Pick three, build them properly, and you have a portfolio that AI-engineering teams hire from.</p></div>
      {starters.length > 0 && <>
        <div className="proj-group" id="starter"><h2 className="disp">Starter projects</h2><p className="mono">New to AI · complete code · an evening or two each</p></div>
        <div className="proj-grid" style={{ paddingBottom: 32 }}>{starters.map(p => <Card key={p.slug} p={p} />)}</div>
      </>}
      <div className="proj-group" id="portfolio"><h2 className="disp">Portfolio projects</h2><p className="mono">Intermediate to advanced · built to production standard</p></div>
      <div className="proj-grid" style={{ paddingBottom: 40 }}>{portfolio.map(p => <Card key={p.slug} p={p} />)}</div>
    </div>
  );
}
