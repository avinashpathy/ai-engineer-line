import { ALL_LESSONS, STATIONS, lineOf } from "@/lib/curriculum";
import { availableLessonKeys, plainText, projectLabel, projects, readLesson, readProject } from "@/lib/content";
import { GLOSSARY } from "@/lib/glossary";

export const dynamic = "force-static";

export function GET() {
  const ready = new Set(availableLessonKeys());
  const entries = [
    ...STATIONS.map(s => ({ href: `/learn/${s.id}/`, title: s.title, tag: `Station · ${lineOf(s.line).name}`, line: s.line, text: (s.title + " " + s.blurb).toLowerCase() })),
    ...ALL_LESSONS.filter(l => ready.has(l.key)).map(l => {
      const { source } = readLesson(l.station, l.slug);
      return { href: `/learn/${l.key}/`, title: l.title, tag: `Lesson · ${STATIONS.find(s => s.id === l.station)!.short}`, line: l.line, text: (l.title + " " + plainText(source)).toLowerCase().slice(0, 6000) };
    }),
    ...projects().map(p => ({ href: `/projects/${p.slug}/`, title: p.title, tag: `${p.starter ? "Starter" : "Project"} ${projectLabel(p)}`, line: "", text: (p.title + " " + p.tagline + " " + plainText(readProject(p.slug).source)).toLowerCase().slice(0, 4000) })),
    ...GLOSSARY.map(([t, d]) => ({ href: `/glossary/#g-${t[0].toUpperCase()}`, title: `${t}: ${d}`, tag: "Glossary", line: "", text: (t + " " + d).toLowerCase() })),
  ];
  return Response.json(entries);
}
