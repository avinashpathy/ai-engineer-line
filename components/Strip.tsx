import Link from "next/link";
import { STATIONS } from "@/lib/curriculum";

/** Horizontal strip of every station on the current line. */
export function Strip({ current }: { current: string }) {
  const s = STATIONS.find(x => x.id === current)!;
  const on = STATIONS.filter(x => x.line === s.line);
  return (
    <nav className="strip" aria-label="Stations on this line">
      <ol>{on.map(o => (
        <li key={o.id}><Link href={`/learn/${o.id}/`} className={o.id === current ? "cur" : ""} aria-current={o.id === current ? "page" : undefined}><i /><span>{o.short}</span></Link></li>
      ))}</ol>
    </nav>
  );
}
