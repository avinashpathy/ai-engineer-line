import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ALL_LESSONS, LEVEL_LABEL, lineOf, stationById } from "@/lib/curriculum";
import { availableLessonKeys, readLesson } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import { LessonComplete } from "@/components/progress-ui";
import { Toc } from "@/components/Toc";

export const dynamicParams = false;
export function generateStaticParams() {
  return availableLessonKeys().map(k => { const [station, lesson] = k.split("/"); return { station, lesson }; });
}

type Params = { params: Promise<{ station: string; lesson: string }> };
const find = (station: string, lesson: string) => ALL_LESSONS.find(l => l.station === station && l.slug === lesson);

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { station, lesson } = await params;
  const l = find(station, lesson); if (!l) return {};
  const { data } = readLesson(station, lesson);
  return { title: l.title, description: data.summary };
}

export default async function LessonPage({ params }: Params) {
  const { station, lesson } = await params;
  const l = find(station, lesson); const s = stationById(station);
  if (!l || !s) notFound();
  const { source, data, headings } = readLesson(station, lesson);
  const content = await renderMDX(source);
  const line = lineOf(s.line);
  // Deep dives go beyond what a first pass needs; beginners can skip them and come back later.
  const optional = l.slug === "deep-dive";
  const ready = new Set(availableLessonKeys());
  const seq = ALL_LESSONS.filter(x => ready.has(x.key));
  const i = seq.findIndex(x => x.key === l.key);
  const prev = seq[i - 1], next = seq[i + 1];
  return (
    <div data-line={s.line}>
      <section className="sign lesson">
        <div className="wrap">
          <div className="crumbs mono"><Link href="/learn/">All lines</Link><span>/</span><span className="badge sm inv">{line.code}</span><Link href={`/learn/${s.id}/`}>{s.title}</Link></div>
          <h1>{l.title}</h1>
          {data.summary && <p className="blurb">{data.summary}</p>}
          <div className="stats">
            <div><span>Level</span><b>{LEVEL_LABEL[l.level]}</b></div>
            <div><span>Reading</span><b>{l.minutes} min</b></div>
            <div><span>Lesson</span><b>{s.lessons.findIndex(x => x.slug === l.slug) + 1} of {s.lessons.length}</b></div>
            {optional && <div><span>First read</span><b>Optional</b></div>}
          </div>
        </div>
      </section>
      <div className="wrap">
        <div className="lesson-body">
          <div>
            <article className="prose">
              {optional && (
                <aside className="callout note" aria-label="Optional on first read">
                  <div className="ch">Optional on first read</div>
                  <div className="cb"><p>This deep dive goes further than you need the first time through. If you&apos;re new to AI, finish the core lesson{s.lessons[0]?.slug !== l.slug && <> (<Link href={`/learn/${s.id}/${s.lessons[0].slug}/`}>{s.lessons[0].title}</Link>)</>}, carry on along the line, and come back here once you&apos;ve built something.</p></div>
                </aside>
              )}
              {content}
            </article>
            <LessonComplete lessonKey={l.key} />
          </div>
          <aside className="side">
            {headings.length > 0 && <Toc headings={headings} />}
          </aside>
        </div>
        <nav className="pager" aria-label="Previous and next lesson">
          {prev ? <Link className="panel" href={`/learn/${prev.key}/`}><span className="mono">← Previous lesson</span><b>{prev.title}</b></Link> : <span />}
          {next && <Link className="panel next" href={`/learn/${next.key}/`}><span className="mono">Next lesson →</span><b>{next.title}</b></Link>}
        </nav>
      </div>
    </div>
  );
}
