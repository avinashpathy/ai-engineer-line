import type { ReactNode } from "react";
import { Mermaid } from "./Mermaid";
import * as D from "./diagrams";

type P = { children?: ReactNode; title?: string };

const ICONS: Record<string, ReactNode> = {
  analogy: <path d="M12 3a6 6 0 0 0-3.5 10.9V17h7v-3.1A6 6 0 0 0 12 3Zm-2 16h4v2h-4z" fill="currentColor" />,
  example: <path d="M4 4h16v16H4zM7 8h10M7 12h10M7 16h6" fill="none" stroke="currentColor" strokeWidth="2" />,
  tip: <path d="m5 12 4 4 10-10" fill="none" stroke="currentColor" strokeWidth="3" />,
  pitfall: <path d="M12 3 2 21h20L12 3Zm0 6v6m0 2v2" fill="none" stroke="currentColor" strokeWidth="2.2" />,
  interview: <path d="M4 5h16v11H9l-5 4V5Z" fill="none" stroke="currentColor" strokeWidth="2.2" />,
  takeaways: <path d="M6 3h12v18l-6-4-6 4V3Z" fill="currentColor" />,
  note: <path d="M12 4v10m0 3v2" fill="none" stroke="currentColor" strokeWidth="3" />,
};
const LABEL: Record<string, string> = { analogy: "Analogy", example: "Worked example", tip: "Pro tip", pitfall: "Common pitfall", interview: "Interview check", takeaways: "Key takeaways", note: "Note" };

function Callout({ kind, title, children }: P & { kind: string }) {
  return (
    <aside className={`callout ${kind}`} aria-label={LABEL[kind]}>
      <div className="ch"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true">{ICONS[kind]}</svg>{title || LABEL[kind]}</div>
      <div className="cb">{children}</div>
    </aside>
  );
}

export const mdxComponents = {
  table: (p: { children?: ReactNode }) => <div className="table" role="region" aria-label="Table" tabIndex={0}><table>{p.children}</table></div>,
  Analogy: (p: P) => <Callout kind="analogy" {...p} />,
  Example: (p: P) => <Callout kind="example" {...p} />,
  Tip: (p: P) => <Callout kind="tip" {...p} />,
  Pitfall: (p: P) => <Callout kind="pitfall" {...p} />,
  Note: (p: P) => <Callout kind="note" {...p} />,
  Takeaways: (p: P) => <Callout kind="takeaways" {...p} />,
  Interview: (p: P) => <Callout kind="interview" {...p} />,
  QA: ({ q, children }: { q: string; children?: ReactNode }) => <details className="qa"><summary>{q}</summary><div>{children}</div></details>,
  Solution: ({ children }: { children?: ReactNode }) => <details className="qa solution"><summary>Show solution</summary><div>{children}</div></details>,
  Level: ({ l }: { l: "beginner" | "intermediate" | "advanced" }) => <span className="lvl" data-level={l}>{l}</span>,
  Mermaid,
  ...D,
};
