"use client";
import Link from "next/link";
import { ALL_LESSONS, LINES, STATIONS, LEVEL_LABEL, lineOf, type Level } from "@/lib/curriculum";
import { useProgress } from "./ProgressProvider";

/* Mark-complete control at the end of a lesson */
export function LessonComplete({ lessonKey }: { lessonKey: string }) {
  const { done, toggle, user, authEnabled, syncError } = useProgress();
  const isDone = done.has(lessonKey);
  return (
    <div className="complete panel">
      <div>
        <p><b>{isDone ? "Lesson complete." : "Finished this lesson?"}</b></p>
        <p style={{ color: "var(--muted)", fontSize: ".92rem" }}>
          {user ? "Progress syncs to your account." : authEnabled ? <>Saved on this device. <Link href="/account/">Sign in</Link> to keep it everywhere.</> : "Progress is saved on this device."}
        </p>
        {syncError && <p className="note-sync" role="status">{syncError}</p>}
      </div>
      <button type="button" className={`btn${isDone ? " is-done" : ""}`} aria-pressed={isDone} onClick={() => toggle(lessonKey)}>
        {isDone ? "✓ Completed" : "Mark complete"}
      </button>
    </div>
  );
}

/* Lesson stops on a station page */
export function StationStops({ station, ready }: { station: string; ready: Record<string, boolean> }) {
  const { done } = useProgress();
  const s = STATIONS.find(x => x.id === station)!;
  return (
    <div className="tl">
      {s.lessons.map(l => {
        const key = `${station}/${l.slug}`;
        const body = (
          <>
            <span className="dot" aria-hidden="true" />
            <h3>{l.title}</h3>
            <div className="meta">
              <span className="lvl" data-level={l.level}>{LEVEL_LABEL[l.level as Level]}</span>
              <span className="mono" style={{ color: "inherit", opacity: .75 }}>{l.minutes} min</span>
              {done.has(key) && <span className="mono">✓ done</span>}
              {!ready[l.slug] && <span className="mono">coming soon</span>}
            </div>
            {ready[l.slug] && <span className="go" aria-hidden="true">→</span>}
          </>
        );
        return ready[l.slug]
          ? <Link key={l.slug} className={`stop panel${done.has(key) ? " done" : ""}`} href={`/learn/${station}/${l.slug}/`}>{body}</Link>
          : <div key={l.slug} className="stop panel soon">{body}</div>;
      })}
    </div>
  );
}

export function StationDone({ station }: { station: string }) {
  const { done } = useProgress();
  const s = STATIONS.find(x => x.id === station)!;
  return <>{s.lessons.filter(l => done.has(`${station}/${l.slug}`)).length}/{s.lessons.length}</>;
}

/* Line diagram on the home and learn pages */
export function LinesDiagram({ readyKeys }: { readyKeys: string[] }) {
  const { done } = useProgress();
  const ready = new Set(readyKeys);
  return (
    <div className="lines">
      {LINES.map(line => (
        <section key={line.id} className="line-col" data-line={line.id} aria-label={`${line.name} line`}>
          <header><span className="code">{line.code}</span><h3>{line.name}</h3></header>
          <ol>
            {STATIONS.filter(s => s.line === line.id).map(s => {
              const total = s.lessons.length;
              const d = s.lessons.filter(l => done.has(`${s.id}/${l.slug}`)).length;
              const anyReady = s.lessons.some(l => ready.has(`${s.id}/${l.slug}`));
              return (
                <li key={s.id} className={anyReady ? "" : "soon"}>
                  <Link href={`/learn/${s.id}/`}>
                    <i className={`stn${d === total ? " full" : d ? " part" : ""}`} aria-hidden="true" />
                    <span><b>{s.short}</b><small>{anyReady ? `${d}/${total} done` : "coming soon"}</small></span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}

/* Departure board: the learner's next lessons */
export function DepartureBoard({ readyKeys }: { readyKeys: string[] }) {
  const { done, user } = useProgress();
  const ready = new Set(readyKeys);
  const next = ALL_LESSONS.filter(l => ready.has(l.key) && !done.has(l.key)).slice(0, 6);
  const total = ready.size, finished = [...done].filter(k => ready.has(k)).length;
  const on = total ? Math.round((finished / total) * 20) : 0;
  return (
    <section className="board" aria-label="Your next lessons">
      <div className="board-head"><h2>Next departures</h2><span className="mono">{user ? "Synced to your account" : "Saved on this device"}</span></div>
      {next.length ? (
        <table>
          <thead><tr><th>Line</th><th>Lesson</th><th>Time</th></tr></thead>
          <tbody>
            {next.map((l, i) => (
              <tr key={l.key} style={{ ["--r" as string]: i }}>
                <td><span className="plat" data-line={l.line}>{lineOf(l.line).code}</span></td>
                <td><Link href={`/learn/${l.key}/`}>{l.title}</Link></td>
                <td>{l.minutes}m</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p style={{ color: "#fff", fontSize: "1.15rem" }}>You&apos;ve finished every published lesson. New stations open as they&apos;re added.</p>}
      <div className="board-foot">
        <div><div className="mono" style={{ marginBottom: 6 }}>{finished} of {total} published lessons done</div>
          <div className="meter" aria-hidden="true">{Array.from({ length: 20 }, (_, i) => <i key={i} className={i < on ? "on" : ""} />)}</div></div>
        {next[0] && <Link className="btn" href={`/learn/${next[0].key}/`}>Board now →</Link>}
      </div>
    </section>
  );
}
