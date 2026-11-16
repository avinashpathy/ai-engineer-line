import Link from "next/link";
import { LINES, STATIONS, ALL_LESSONS, stationsOn } from "@/lib/curriculum";
import { availableLessonKeys, projectLabel, projects } from "@/lib/content";
import { DepartureBoard, LinesDiagram } from "@/components/progress-ui";

export default function Home() {
  const ready = availableLessonKeys();
  const all = projects();
  const projs = all.filter(p => !p.starter);
  const starters = all.filter(p => p.starter);
  return (
    <>
      <div className="wrap">
        <div className="hero">
          <div>
            <h1>Your route to<br /><span className="hl">AI Engineer</span></h1>
            <p className="lede">A free, structured curriculum laid out like a metro. Six lines and {STATIONS.length} stations take you from your first Python script to RAG, agents and LLM systems running in production, with {projs.length || 10} portfolio projects built to production standard.</p>
            <div className="cta">
              <Link className="btn dark" href="/learn/start-here/">Start at station one →</Link>
              <Link className="btn ghost" href="/roadmap/">See the roadmap</Link>
            </div>
            <div className="chips" aria-label="Lines">
              {LINES.map(l => (
                <Link key={l.id} className="chip" href={`/learn/${stationsOn(l.id)[0].id}/`} data-line={l.id}>
                  <span className="badge sm">{l.code}</span>{l.name}
                </Link>
              ))}
            </div>
          </div>
          <DepartureBoard readyKeys={ready} />
        </div>
      </div>

      <section className="sec"><div className="wrap">
        <div className="sec-head"><h2>Route map</h2><p>{ALL_LESSONS.length} lessons across six lines. Ride a line top to bottom, or change at any station. Filled stops show what you&apos;ve finished.</p></div>
        <LinesDiagram readyKeys={ready} />
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-head"><h2>Three levels, one page</h2><p>Every lesson is tagged so you know what you&apos;re walking into.</p></div>
        <div className="levels panel">
          <div><span className="lvl" data-level="beginner">Beginner</span><p>Plain-language explanations, analogies and small examples. No maths beyond school level. Start here if you&apos;re new to AI.</p></div>
          <div><span className="lvl" data-level="intermediate">Intermediate</span><p>How things work under the hood, with code you can run and the trade-offs you&apos;ll face at work.</p></div>
          <div><span className="lvl" data-level="advanced">Advanced</span><p>Deep dives: internals, production patterns, failure modes and the details interviewers probe.</p></div>
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-head"><h2>Pick your path</h2><p>Board wherever your experience puts you.</p></div>
        <div className="paths">
          {[
            { t: "New to coding", d: "Ride the F line end to end first, then L, R, A and P in order. About 9–12 months at 10–12 hours a week.", from: "start-here" },
            { t: "Software / backend developer", d: "Read Start Here, skim Python & Backend, then go straight to the Transformer refresher and the L line. About 5–6 months.", from: "transformers" },
            { t: "Data scientist / ML engineer", d: "You know the maths and PyTorch. Start on the L line and lean into RAG, agents and production. About 4–5 months.", from: "how-llms-work" },
          ].map(p => (
            <div key={p.t} className="path panel">
              <h3>{p.t}</h3><p>{p.d}</p>
              <div className="route"><Link className="btn ghost" href={`/learn/${p.from}/`}>Board at {STATIONS.find(s => s.id === p.from)!.short} →</Link></div>
            </div>
          ))}
        </div>
      </div></section>

      {projs.length > 0 && (
        <section className="sec"><div className="wrap">
          <div className="sec-head"><h2>Build real things</h2><p>Each project ships with an architecture, a step-by-step build, evaluation, security and deployment.{starters.length > 0 && <> New to AI? Begin with the {starters.length} <Link href="/projects/#starter">starter projects</Link>, which come with complete code.</>} <Link href="/projects/">All projects →</Link></p></div>
          <div className="proj-grid">
            {projs.slice(0, 3).map(p => (
              <Link key={p.slug} className="proj panel" href={`/projects/${p.slug}/`}>
                <div className="ph"><span className="no">{projectLabel(p)}</span><span className="mono">{p.level} · {p.weeks}</span></div>
                <div className="pb"><h3>{p.title}</h3><p>{p.tagline}</p></div>
              </Link>
            ))}
          </div>
        </div></section>
      )}
    </>
  );
}
