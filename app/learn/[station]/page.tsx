import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { STATIONS, lineOf, stationById } from "@/lib/curriculum";
import { lessonExists } from "@/lib/content";
import { StationDone, StationStops } from "@/components/progress-ui";
import { Strip } from "@/components/Strip";

export const dynamicParams = false;
export function generateStaticParams() { return STATIONS.map(s => ({ station: s.id })); }

export async function generateMetadata({ params }: { params: Promise<{ station: string }> }): Promise<Metadata> {
  const s = stationById((await params).station);
  return s ? { title: s.title, description: s.blurb } : {};
}

export default async function StationPage({ params }: { params: Promise<{ station: string }> }) {
  const { station } = await params;
  const s = stationById(station); if (!s) notFound();
  const line = lineOf(s.line);
  const onLine = STATIONS.filter(x => x.line === s.line);
  const idx = STATIONS.indexOf(s);
  const prev = STATIONS[idx - 1], next = STATIONS[idx + 1];
  const ready = Object.fromEntries(s.lessons.map(l => [l.slug, lessonExists(s.id, l.slug)]));
  const minutes = s.lessons.reduce((a, l) => a + l.minutes, 0);
  return (
    <div data-line={s.line}>
      <section className="sign">
        <div className="wrap">
          <div className="crumbs mono"><Link href="/learn/">All lines</Link><span>/</span><span className="badge sm inv">{line.code}</span><span>{line.name} line · station {onLine.indexOf(s) + 1} of {onLine.length}</span></div>
          <h1>{s.title}</h1>
          <p className="blurb">{s.blurb}</p>
          <div className="stats">
            <div><span>Lessons</span><b>{s.lessons.length}</b></div>
            <div><span>Reading time</span><b>{Math.round(minutes / 6) / 10} hrs</b></div>
            <div><span>Done</span><b><StationDone station={s.id} /></b></div>
          </div>
        </div>
      </section>
      <Strip current={s.id} />
      <div className="wrap">
        <div className="station-body">
          <StationStops station={s.id} ready={ready} />
          <aside className="side">
            <div className="ticket panel"><h4>On this line <span className="badge sm">{line.code}</span></h4>
              <ul>{onLine.map(o => <li key={o.id}><Link href={`/learn/${o.id}/`} className={o.id === s.id ? "active" : ""}>{o.title}</Link></li>)}</ul></div>
          </aside>
        </div>
        <nav className="pager" aria-label="Previous and next station">
          {prev ? <Link className="panel" href={`/learn/${prev.id}/`}><span className="mono">← Previous station</span><b>{prev.title}</b></Link> : <span />}
          {next && <Link className="panel next" href={`/learn/${next.id}/`}><span className="mono">Next station →</span><b>{next.title}</b></Link>}
        </nav>
      </div>
    </div>
  );
}
