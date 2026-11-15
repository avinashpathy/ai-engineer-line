import Link from "next/link";
import { LINES, stationsOn } from "@/lib/curriculum";

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div>
          <h4>AI Engineer Line</h4>
          <p style={{ margin: 0, maxWidth: "36em" }}>A free, structured route from your first Python script to production LLM systems. Read everything without an account; sign in only if you want your progress saved across devices.</p>
          <p style={{ margin: "12px 0 0" }}><Link href="/privacy/">Privacy &amp; security</Link></p>
        </div>
        <div>
          <h4>Lines</h4>
          <ul>{LINES.map(l => <li key={l.id}><Link href={`/learn/${stationsOn(l.id)[0].id}/`}>{l.code} · {l.name}</Link></li>)}</ul>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link href="/roadmap/">Roadmap</Link></li>
            <li><Link href="/projects/">Projects</Link></li>
            <li><Link href="/glossary/">Glossary</Link></li>
            <li><Link href="/account/">Your account</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
