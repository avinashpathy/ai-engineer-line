"use client";
import { useEffect, useId, useState } from "react";

let ready: Promise<typeof import("mermaid").default> | null = null;
function loadMermaid() {
  if (!ready) {
    ready = import("mermaid").then(m => {
      m.default.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: '"Atkinson Hyperlegible", system-ui, sans-serif',
        themeVariables: {
          primaryColor: "#FFFFFF", primaryBorderColor: "#0E1A2B", primaryTextColor: "#0E1A2B",
          secondaryColor: "#FFF4CC", secondaryBorderColor: "#0E1A2B",
          tertiaryColor: "#E9EDF1", tertiaryBorderColor: "#0E1A2B",
          lineColor: "#0E1A2B", textColor: "#0E1A2B", fontSize: "15px",
          clusterBkg: "#F3F6F9", clusterBorder: "#556274",
          noteBkgColor: "#FFF4CC", noteBorderColor: "#0E1A2B",
          actorBkg: "#0E1A2B", actorTextColor: "#FFFFFF", actorBorder: "#0E1A2B", signalColor: "#0E1A2B",
          edgeLabelBackground: "#FFFFFF",
        },
        flowchart: { curve: "basis", padding: 14, nodeSpacing: 40, rankSpacing: 46, htmlLabels: false, useMaxWidth: false },
        sequence: { mirrorActors: false, useMaxWidth: false },
      });
      return m.default;
    });
  }
  return ready;
}

export function Mermaid({ chart, caption }: { chart: string; caption?: string }) {
  const id = "m" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    let live = true;
    loadMermaid().then(m => m.render(id, chart)).then(r => { if (live) setSvg(r.svg); }).catch(() => live && setErr(true));
    return () => { live = false; };
  }, [chart, id]);
  return (
    <figure className="diagram">
      <div className="dbody">
        {svg
          // Mermaid runs with securityLevel "strict" (DOMPurify-sanitised); charts come only from our own lesson files.
          ? <div className="mermaid-out" dangerouslySetInnerHTML={{ __html: svg }} />
          : <pre className="mermaid-src" aria-label="Diagram source">{err ? "This diagram couldn't be drawn.\n\n" + chart : chart}</pre>}
      </div>
      {caption && <figcaption><b>Diagram</b>{caption}</figcaption>}
    </figure>
  );
}
