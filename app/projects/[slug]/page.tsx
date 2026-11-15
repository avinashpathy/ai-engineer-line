import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, readProject } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import { lineOf, type LineId } from "@/lib/curriculum";
import { Toc } from "@/components/Toc";

export const dynamicParams = false;
export function generateStaticParams() { return projects().map(p => ({ slug: p.slug })); }
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects().find(x => x.slug === slug);
  return p ? { title: `Project: ${p.title}`, description: p.tagline } : {};
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const all = projects(); const i = all.findIndex(p => p.slug === slug);
  if (i < 0) notFound();
  const { source, meta, headings } = readProject(slug);
  const content = await renderMDX(source);
  const prev = all[i - 1], next = all[i + 1];
  const main = (meta.lines[0] || "c") as LineId;
  return (
    <div data-line={main}>
      <section className="sign" style={{ background: "var(--ink)", color: "#fff" }}>
        <div className="wrap">
          <div className="crumbs mono"><Link href="/projects/">All projects</Link><span>/</span><span>Project {String(meta.order).padStart(2, "0")}</span></div>
          <h1>{meta.title}</h1>
          <p className="blurb">{meta.tagline}</p>
          <div className="stats">
            <div><span>Level</span><b>{meta.level}</b></div>
            <div><span>Time</span><b>{meta.weeks}</b></div>
            <div><span>Lines</span><b style={{ display: "flex", gap: 4 }}>{meta.lines.map(l => <span key={l} className="badge sm" data-line={l}>{lineOf(l as LineId).code}</span>)}</b></div>
          </div>
          <div className="tags" style={{ marginTop: 16 }}>{meta.stack.map(s => <span key={s} className="tag" style={{ background: "transparent", color: "#fff", borderColor: "#3A4A60" }}>{s}</span>)}</div>
        </div>
      </section>
      <div className="wrap">
        <div className="lesson-body">
          <article className="prose">{content}</article>
          <aside className="side">
            {headings.length > 0 && <Toc headings={headings.filter(h => h.depth === 2)} title="Project plan" />}
            <div className="ticket panel"><h4>You&apos;ll practise</h4><div className="tbody"><div className="tags">{meta.skills.map(s => <span key={s} className="tag">{s}</span>)}</div></div></div>
          </aside>
        </div>
        <nav className="pager" aria-label="Previous and next project">
          {prev ? <Link className="panel" href={`/projects/${prev.slug}/`}><span className="mono">← Project {String(prev.order).padStart(2, "0")}</span><b>{prev.title}</b></Link> : <span />}
          {next && <Link className="panel next" href={`/projects/${next.slug}/`}><span className="mono">Project {String(next.order).padStart(2, "0")} →</span><b>{next.title}</b></Link>}
        </nav>
      </div>
    </div>
  );
}
