import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ALL_LESSONS, STATIONS } from "./curriculum";

const ROOT = path.join(process.cwd(), "content");

export interface Heading { id: string; text: string; depth: number }

function slugify(s: string) {
  // Must match rehype-slug (github-slugger) closely enough for the table of contents.
  return s.toLowerCase().trim().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s/g, "-");
}

export function headingsOf(md: string): Heading[] {
  const out: Heading[] = []; const seen = new Map<string, number>();
  let inCode = false;
  for (const line of md.split("\n")) {
    if (line.trim().startsWith("```")) { inCode = !inCode; continue; }
    if (inCode) continue;
    const m = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[`*_]/g, "");
    let id = slugify(text); const n = seen.get(id) ?? 0; seen.set(id, n + 1); if (n) id = `${id}-${n}`;
    out.push({ id, text, depth: m[1].length });
  }
  return out;
}

export function lessonFile(station: string, lesson: string) {
  return path.join(ROOT, "learn", station, `${lesson}.mdx`);
}
export function lessonExists(station: string, lesson: string) {
  return fs.existsSync(lessonFile(station, lesson));
}
export function readLesson(station: string, lesson: string) {
  const raw = fs.readFileSync(lessonFile(station, lesson), "utf8");
  const { content, data } = matter(raw);
  return { source: content, data: data as { summary?: string; sources?: string }, headings: headingsOf(content) };
}
export function availableLessonKeys(): string[] {
  return ALL_LESSONS.filter(l => lessonExists(l.station, l.slug)).map(l => l.key);
}
export function stationReady(id: string) {
  const s = STATIONS.find(x => x.id === id)!;
  return s.lessons.filter(l => lessonExists(id, l.slug)).length;
}

/* ---------- projects ---------- */
export interface ProjectMeta {
  slug: string; order: number; title: string; tagline: string; level: string; weeks: string;
  lines: string[]; stack: string[]; skills: string[];
}
export function projects(): ProjectMeta[] {
  const dir = path.join(ROOT, "projects");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith(".mdx")).map(f => {
    const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
    return { slug: f.replace(/\.mdx$/, ""), ...(data as Omit<ProjectMeta, "slug">) };
  }).sort((a, b) => a.order - b.order);
}
export function readProject(slug: string) {
  const { content, data } = matter(fs.readFileSync(path.join(ROOT, "projects", `${slug}.mdx`), "utf8"));
  return { source: content, meta: { slug, ...(data as Omit<ProjectMeta, "slug">) }, headings: headingsOf(content) };
}

/* ---------- plain text for search ---------- */
export function plainText(md: string) {
  return md.replace(/```[\s\S]*?```/g, " ").replace(/<[^>]+>/g, " ").replace(/[#>*_`|[\]()-]/g, " ").replace(/\s+/g, " ").trim();
}
