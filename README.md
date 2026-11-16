# AI Engineer Line

A free, structured website for people who want to become AI Engineers, laid out like a metro map: six lines (Foundations, LLM Engineering, RAG, Agents, Production, Career), 32 stations, beginner-to-advanced lessons with diagrams, three starter projects with complete code, eleven production-ready projects, a 26-week roadmap and a glossary.

Anyone can read everything. Signing in (a one-time email link, plus GitHub or Google if you switch them on) saves lesson progress across devices.

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

## Beginner support

- Every lesson after Foundations opens with an **In plain English** box (`<PlainEnglish>`).
- The first time a glossary term appears in a lesson, `remarkGlossary` (`lib/mdx.tsx`) wraps it so hovering or tapping shows the definition. Add terms in `lib/glossary.ts`; control matching with `TERM_ALIASES`.
- Deep dives are marked **optional on first read**, and the roadmap has a first-time path.
- `starters/` holds the three starter projects (complete code, tested in CI with fake models) and a scaffold for each portfolio project.

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
