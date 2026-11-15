import Link from "next/link";
import type { Metadata } from "next";
import { stationById, lineOf } from "@/lib/curriculum";
import { PHASES } from "@/lib/roadmap";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Roadmap", description: "A 26-week roadmap to becoming an AI Engineer, phase by phase, with what to build after each one." };

export default function Roadmap() {
  const projs = Object.fromEntries(projects().map(p => [p.slug, p]));
  return (
    <div className="wrap">
      <div className="phead"><span className="mono">About 26 weeks at 10–12 hours a week</span><h1>The roadmap</h1>
        <p>Seven phases, each ending with something you build and put on GitHub. If you&apos;re new to programming, start with the prelude. If you already ship code for a living, start at Phase 1.</p></div>

      <div className="panel" style={{ padding: "16px 20px", marginBottom: 28, display: "grid", gap: 6 }}>
        <b className="disp" style={{ fontSize: "1.4rem" }}>Three rules for the whole route</b>
        <span><b>Use it the same day.</b> A concept counts as learned when you&apos;ve used it in code, not when you&apos;ve read about it.</span>
        <span><b>Build after every phase.</b> A few shipped projects are worth more than dozens of tutorials.</span>
        <span><b>Measure from Phase 4 on.</b> Once you know evals, test every prompt or model change before it goes live.</span>
      </div>

      <div className="phases">
        {PHASES.map((ph, i) => (
          <div key={ph.id} className="phase" data-line={ph.line}>
            <div className="when"><b>{i === 0 ? "Prelude" : `Phase ${i}`}</b><span>{ph.weeks}</span></div>
            <div className="rail"><i /></div>
            <div className="pcard panel">
              <h3><span className="badge">{lineOf(ph.line).code}</span>{ph.title}{ph.optional && <span className="lvl" data-level="beginner">If you&apos;re new to coding</span>}</h3>
              <p className="mono" style={{ margin: "6px 0 0" }}>{ph.weeks}</p>
              <p>{ph.goal}</p>
              <div className="tags">{ph.stations.map(s => <Link key={s} className="tag" href={`/learn/${s}/`}>{stationById(s)!.title}</Link>)}</div>
              <div className="build"><b>Build</b>{ph.build}
                {ph.project && projs[ph.project] && <> Then take on <Link href={`/projects/${ph.project}/`} style={{ color: "var(--board-text)" }}>Project {String(projs[ph.project].order).padStart(2, "0")}: {projs[ph.project].title}</Link>.</>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="sec" style={{ paddingTop: 48 }}>
        <div className="sec-head"><h2>Before you start</h2></div>
        <div className="levels panel">
          <div><span className="lvl" data-level="beginner">Python</span><p>Functions, classes, virtual environments, pip, and reading other people&apos;s code.</p></div>
          <div><span className="lvl" data-level="beginner">Git &amp; GitHub</span><p>Commit, branch, pull request. Every project goes on GitHub from day one.</p></div>
          <div><span className="lvl" data-level="beginner">One API call</span><p>Get an API key from any model provider and print a reply from Python. That&apos;s enough to begin.</p></div>
        </div>
      </section>
    </div>
  );
}
