# AI Engineer Line

A free, structured website for people who want to become AI Engineers, laid out like a metro map: six lines (Foundations, LLM Engineering, RAG, Agents, Production, Career), 32 stations, beginner-to-advanced lessons with diagrams, eleven production-ready projects, a 26-week roadmap and a glossary.

Anyone can read everything. Signing in (GitHub, Google or email link) saves lesson progress across devices.

## Tech

| Part | Choice |
|---|---|
| Framework | Next.js (App Router) with **static export** — no server to attack |
| Content | MDX in `content/`, rendered at build time; code highlighted with Shiki; diagrams in Mermaid or hand-built SVG |
| Auth & progress | Supabase Auth (PKCE) + Postgres with Row Level Security |
| Hosting | Vercel (or any static host) with strict security headers |
| Quality | TypeScript, CI build, `npm audit`, CodeQL, Dependabot |

## Run locally

```bash
npm ci
npm run dev          # http://localhost:3000 (sign-in is off until you add Supabase keys)
npm run build        # static site in out/
npm start            # preview out/ at http://localhost:4321 with production security headers
```

To test sign-in locally, copy `.env.example` to `.env.local` and fill in your Supabase values.

## Deploy

See **[DEPLOY.md](./DEPLOY.md)** for the step-by-step GitHub → Supabase → Vercel guide and the post-launch security checklist.

## Project layout

```
app/                 pages (home, learn, station, lesson, roadmap, projects, glossary, account)
components/          header + search, diagrams, MDX callouts, progress and sign-in UI
content/learn/       lessons: <station>/<lesson>.mdx
content/projects/    project guides
lib/curriculum.ts    lines, stations and lessons (the map)
lib/roadmap.ts       roadmap phases
lib/glossary.ts      glossary terms
supabase/migrations  database table + Row Level Security policies
security-headers.json  one source for all security headers (generates vercel.json and public/_headers)
```

## Roadmap coverage

[`docs/ROADMAP-COVERAGE.md`](./docs/ROADMAP-COVERAGE.md) maps every topic in the 160-topic AI Engineer roadmap to the lesson that teaches it, and lists what's still planned or missing. Update it with every content pull request.

## Writing content

Lessons are Markdown with a few components:

```mdx
<Level l="beginner" />
<Analogy>…</Analogy>   <Example>…</Example>   <Tip>…</Tip>   <Pitfall>…</Pitfall>   <Note>…</Note>
<Interview><QA q="Question?">Answer.</QA></Interview>
<Takeaways>- point</Takeaways>
```

Diagrams: a ` ```mermaid caption="…" ` code block, or one of the SVG components in `components/diagrams.tsx`.
JavaScript expressions inside content are blocked on purpose; components take plain string props only.

## Security

See [SECURITY.md](./SECURITY.md) to report a vulnerability.
