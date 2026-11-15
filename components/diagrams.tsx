// Hand-built explanatory diagrams. Each is plain SVG drawn to one scale in a viewBox,
// coloured from the line palette, with a caption that says what to notice.
import type { ReactNode } from "react";

const INK = "#0E1A2B", MUTED = "#556274", RULE = "#C9D1DA", PAPER = "#FBFCFD";
const C = { f: "#E0402A", l: "#F2B200", r: "#2A6FDB", a: "#7A4CC2", p: "#00857A", c: "#3B4659", g: "#1E8E5A" };

function Fig({ caption, label, children, w }: { caption?: string; label: string; children: ReactNode; w: number }) {
  return (
    <figure className="diagram">
      <div className="dbody"><svg className="dg" viewBox={`0 0 ${w} ${heightOf(children)}`} width={w} role="img" aria-label={label}>{children}</svg></div>
      {caption && <figcaption><b>Diagram</b>{caption}</figcaption>}
    </figure>
  );
}
// height is passed through a data attribute on the first child group to keep call sites tidy
function heightOf(children: ReactNode): number {
  const first = Array.isArray(children) ? children[0] : children;
  return (first as any)?.props?.["data-h"] ?? 400;
}

/* 1 — The GenAI application stack */
export function GenAIStack({ caption }: { caption?: string }) {
  const layers: [string, string, string][] = [
    ["Trust", "guardrails · injection defence · PII · access control · governance", C.f],
    ["Operations", "Docker · cloud · gateways · caching · tracing · cost dashboards", C.p],
    ["Quality", "golden datasets · LLM-as-judge · regression gates · feedback", C.g],
    ["Application", "FastAPI · streaming · auth · sessions · front ends · jobs", C.c],
    ["Orchestration", "chains · routers · agents · tool calling · MCP · memory", C.a],
    ["Knowledge", "chunk · embed · index · hybrid search · re-rank · text-to-SQL", C.r],
    ["Prompting & context", "system prompts · few-shot · schemas · token budgets", C.l],
    ["Models", "API vs open-weight · context windows · sampling · fine-tuning", INK],
  ];
  const h = 52, gap = 6, top = 20;
  return (
    <Fig w={760} label="The GenAI application stack, eight layers from models at the bottom to trust at the top" caption={caption}>
      <g data-h={top + layers.length * (h + gap) + 30}>
        {layers.map(([name, what, col], i) => {
          const y = top + i * (h + gap);
          const light = col === C.l;
          return (
            <g key={name}>
              <rect x={20} y={y} width={720} height={h} fill={PAPER} stroke={INK} strokeWidth={2} />
              <rect x={20} y={y} width={200} height={h} fill={col} />
              <text x={36} y={y + 33} className="dt" fontSize={22} fill={light ? INK : "#fff"}>{name}</text>
              <text x={238} y={y + 32} fontSize={15} fill={INK}>{what}</text>
            </g>
          );
        })}
        <text x={20} y={top + layers.length * (h + gap) + 18} className="dm" fill={MUTED}>AN AI ENGINEER WORKS ACROSS EVERY LAYER ↑</text>
      </g>
    </Fig>
  );
}

/* 2 — The GenAI application lifecycle as a loop */
export function Lifecycle({ caption }: { caption?: string }) {
  const steps = ["Define task & metric", "Prototype with the strongest model", "Build an eval set", "Iterate: prompt, context, tools", "Harden: schemas, guardrails", "Optimise cost & latency", "Deploy with tracing", "Operate & grow the eval set"];
  const cx = 450, cy = 250, R = 175;
  return (
    <Fig w={900} label="The eight-step GenAI application lifecycle drawn as a loop" caption={caption}>
      <g data-h={500}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.r} strokeWidth={10} />
        <text x={cx} y={cy - 8} textAnchor="middle" className="dt" fontSize={30} fill={INK}>Measure</text>
        <text x={cx} y={cy + 24} textAnchor="middle" className="dt" fontSize={30} fill={INK}>every change</text>
        {steps.map((s, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / steps.length;
          const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
          const right = Math.cos(a) > 0.2, left = Math.cos(a) < -0.2;
          const tx = right ? x + 30 : left ? x - 30 : x;
          const ty = Math.sin(a) < -0.9 ? y - 30 : Math.sin(a) > 0.9 ? y + 44 : y + 5;
          return (
            <g key={s}>
              <circle cx={x} cy={y} r={20} fill="#fff" stroke={INK} strokeWidth={5} />
              <text x={x} y={y + 6} textAnchor="middle" className="dt" fontSize={18} fill={INK}>{i + 1}</text>
              <text x={tx} y={ty} textAnchor={right ? "start" : left ? "end" : "middle"} fontSize={15} fontWeight={700} fill={INK}>{s}</text>
            </g>
          );
        })}
      </g>
    </Fig>
  );
}

/* 3 — Text to numbers pipeline */
export function TextToNumbers({ caption }: { caption?: string }) {
  const tokens = ["The", " cat", " sat"]; const ids = ["464", "3797", "3332"];
  const vec = [[0.21, -0.53, 0.88], [0.67, 0.12, -0.31], [-0.44, 0.75, 0.05]];
  return (
    <Fig w={760} label="Text is split into tokens, tokens become IDs, IDs become embedding vectors" caption={caption}>
      <g data-h={300}>
        {["Text", "Tokens", "Token IDs", "Embeddings"].map((t, i) => (
          <text key={t} x={20 + i * 190} y={30} className="dm" fill={MUTED}>{`0${i + 1} · ${t.toUpperCase()}`}</text>
        ))}
        <rect x={20} y={50} width={150} height={200} fill="#fff" stroke={INK} strokeWidth={2} />
        <text x={95} y={160} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>&quot;The cat sat&quot;</text>
        {tokens.map((t, i) => (
          <g key={t}>
            <rect x={210} y={60 + i * 62} width={140} height={46} fill={C.l} stroke={INK} strokeWidth={2} />
            <text x={280} y={90 + i * 62} textAnchor="middle" fontSize={18} fontFamily="DM Mono, monospace" fill={INK}>{JSON.stringify(t)}</text>
            <rect x={400} y={60 + i * 62} width={140} height={46} fill="#fff" stroke={INK} strokeWidth={2} />
            <text x={470} y={90 + i * 62} textAnchor="middle" fontSize={18} fontFamily="DM Mono, monospace" fill={INK}>{ids[i]}</text>
            {vec[i].map((v, j) => (
              <g key={j}>
                <rect x={590 + j * 50} y={60 + i * 62} width={50} height={46} fill={v > 0 ? C.r : C.f} fillOpacity={Math.abs(v) * 0.85 + 0.1} stroke={INK} strokeWidth={1.5} />
                <text x={615 + j * 50} y={88 + i * 62} textAnchor="middle" fontSize={12} fontFamily="DM Mono, monospace" fill={Math.abs(v) > 0.5 ? "#fff" : INK}>{v.toFixed(2)}</text>
              </g>
            ))}
            <path d={`M352 ${83 + i * 62} H396`} stroke={INK} strokeWidth={2} markerEnd="url(#arr)" />
            <path d={`M542 ${83 + i * 62} H586`} stroke={INK} strokeWidth={2} markerEnd="url(#arr)" />
          </g>
        ))}
        <path d="M172 150 H206" stroke={INK} strokeWidth={2} markerEnd="url(#arr)" />
        <text x={590} y={272} className="dm" fill={MUTED}>REAL MODELS USE 768–12,288 NUMBERS</text>
        <defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill={INK} /></marker></defs>
      </g>
    </Fig>
  );
}

/* 4 — Embedding space with analogy arrows */
export function EmbeddingSpace({ caption }: { caption?: string }) {
  const pts: [string, number, number, string][] = [
    ["king", 470, 110, C.a], ["queen", 610, 150, C.a], ["man", 410, 260, C.r], ["woman", 550, 300, C.r],
    ["apple", 120, 330, C.g], ["banana", 175, 380, C.g], ["mango", 90, 400, C.g],
    ["Python", 150, 110, C.l], ["Java", 220, 70, C.l], ["Rust", 100, 60, C.l],
  ];
  return (
    <Fig w={720} label="Words placed in a two-dimensional embedding space; similar words cluster and king minus man plus woman lands near queen" caption={caption}>
      <g data-h={460}>
        {Array.from({ length: 13 }, (_, i) => <line key={"v" + i} x1={40 + i * 52} y1={20} x2={40 + i * 52} y2={430} stroke={RULE} strokeWidth={1} />)}
        {Array.from({ length: 9 }, (_, i) => <line key={"h" + i} x1={40} y1={20 + i * 51} x2={664} y2={20 + i * 51} stroke={RULE} strokeWidth={1} />)}
        <path d="M410 260 L470 110" stroke={MUTED} strokeWidth={2.5} strokeDasharray="6 5" />
        <path d="M550 300 L610 150" stroke={MUTED} strokeWidth={2.5} strokeDasharray="6 5" />
        <text x={565} y={235} className="dm" fill={MUTED} transform="rotate(-68 565 235)">SAME DIRECTION</text>
        {pts.map(([w, x, y, col]) => (
          <g key={w}>
            <circle cx={x} cy={y} r={9} fill={col} stroke={INK} strokeWidth={2} />
            <text x={x + 14} y={y + 5} fontSize={16} fontWeight={700} fill={INK}>{w}</text>
          </g>
        ))}
        <text x={60} y={450} className="dm" fill={MUTED}>CLOSE IN SPACE = CLOSE IN MEANING · DIRECTIONS ENCODE RELATIONSHIPS</text>
      </g>
    </Fig>
  );
}

/* 5 — Attention weights heatmap (causal) */
export function AttentionMatrix({ caption }: { caption?: string }) {
  const toks = ["The", "animal", "didn't", "cross", "because", "it", "was", "tired"];
  // row i attends to columns ≤ i; "it" (row 5) attends strongly to "animal"
  const W: number[][] = toks.map((_, i) => toks.map((_, j) => (j > i ? -1 : 0)));
  const set = (i: number, arr: number[]) => arr.forEach((v, j) => (W[i][j] = v));
  set(0, [1]); set(1, [.35, .65]); set(2, [.1, .5, .4]); set(3, [.05, .35, .2, .4]); set(4, [.05, .15, .25, .25, .3]);
  set(5, [.03, .72, .05, .05, .05, .1]); set(6, [.02, .2, .03, .05, .05, .45, .2]); set(7, [.02, .38, .02, .03, .05, .2, .1, .2]);
  const s = 52, ox = 170, oy = 120;
  return (
    <Fig w={640} label="Causal self-attention weights for an eight-token sentence; the token 'it' puts most of its attention on 'animal'" caption={caption}>
      <g data-h={620}>
        {toks.map((t, j) => <text key={"c" + t} x={ox + j * s + s / 2} y={oy - 10} textAnchor="start" fontSize={14} fontWeight={700} fill={INK} transform={`rotate(-50 ${ox + j * s + s / 2} ${oy - 10})`}>{t}</text>)}
        {toks.map((t, i) => <text key={"r" + t} x={ox - 12} y={oy + i * s + s / 2 + 5} textAnchor="end" fontSize={14} fontWeight={i === 5 ? 900 : 700} fill={i === 5 ? C.f : INK}>{t}</text>)}
        {W.map((row, i) => row.map((v, j) => (
          <g key={i + "-" + j}>
            <rect x={ox + j * s} y={oy + i * s} width={s} height={s} fill={v < 0 ? "#EEF1F4" : C.r} fillOpacity={v < 0 ? 1 : 0.08 + v * 0.92} stroke="#fff" strokeWidth={2} />
            {v >= 0.3 && <text x={ox + j * s + s / 2} y={oy + i * s + s / 2 + 5} textAnchor="middle" fontSize={13} fontFamily="DM Mono, monospace" fill="#fff">{v.toFixed(2)}</text>}
          </g>
        )))}
        <rect x={ox} y={oy + 5 * s} width={6 * s} height={s} fill="none" stroke={C.f} strokeWidth={4} />
        <text x={ox} y={oy + 8 * s + 30} className="dm" fill={MUTED}>ROWS = TOKEN DOING THE LOOKING · COLUMNS = TOKEN LOOKED AT</text>
        <text x={ox} y={oy + 8 * s + 50} className="dm" fill={MUTED}>GREY = MASKED (A TOKEN CAN&apos;T SEE THE FUTURE) · EACH ROW SUMS TO 1</text>
      </g>
    </Fig>
  );
}

/* 6 — Query, key, value */
export function QKV({ caption }: { caption?: string }) {
  const box = (x: number, y: number, w: number, h: number, fill: string, label: string, sub?: string, light = false) => (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={INK} strokeWidth={2} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 7)} textAnchor="middle" className="dt" fontSize={20} fill={light ? "#fff" : INK}>{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 18} textAnchor="middle" fontSize={13} fill={light ? "#fff" : INK}>{sub}</text>}
    </g>
  );
  const arrow = (d: string) => <path d={d} fill="none" stroke={INK} strokeWidth={2} markerEnd="url(#qa)" />;
  return (
    <Fig w={760} label="Each token embedding is projected into a query, a key and a value; queries are compared with keys, softmax gives weights, and the weights mix the values" caption={caption}>
      <g data-h={330}>
        <defs><marker id="qa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill={INK} /></marker></defs>
        {box(20, 130, 130, 60, "#fff", "token x", "embedding")}
        {box(220, 40, 120, 56, C.f, "Q = xW_Q", "what I want", true)}
        {box(220, 132, 120, 56, C.l, "K = xW_K", "what I offer")}
        {box(220, 224, 120, 56, C.r, "V = xW_V", "what I carry", true)}
        {arrow("M150 160 C185 160 185 68 216 68")} {arrow("M150 160 H216")} {arrow("M150 160 C185 160 185 252 216 252")}
        {box(400, 84, 150, 60, "#fff", "QKᵀ / √d", "scores")}
        {arrow("M340 68 C370 68 370 104 396 104")} {arrow("M340 160 C370 160 370 124 396 124")}
        {box(400, 170, 150, 50, INK, "softmax", undefined, true)}
        {arrow("M475 144 V166")}
        {box(600, 150, 140, 90, C.p, "Σ wᵢ · Vᵢ", "new meaning", true)}
        {arrow("M550 195 H596")} {arrow("M340 252 C470 252 500 225 596 225")}
        <text x={20} y={318} className="dm" fill={MUTED}>LIKE A SEARCH ENGINE: QUERY MATCHES KEYS, YOU GET BACK A BLEND OF THE VALUES</text>
      </g>
    </Fig>
  );
}

/* 7 — Decoder Transformer block */
export function TransformerBlock({ caption }: { caption?: string }) {
  const W = 300, x = 230;
  const layer = (y: number, h: number, fill: string, label: string, light = false) => (
    <g>
      <rect x={x} y={y} width={W} height={h} fill={fill} stroke={INK} strokeWidth={2} />
      <text x={x + W / 2} y={y + h / 2 + 7} textAnchor="middle" className="dt" fontSize={19} fill={light ? "#fff" : INK}>{label}</text>
    </g>
  );
  const up = (y1: number, y2: number) => <path d={`M${x + W / 2} ${y1} V${y2}`} stroke={INK} strokeWidth={2.5} markerEnd="url(#ta)" />;
  return (
    <Fig w={760} label="A decoder-only Transformer: token and position embeddings feed N stacked blocks of masked multi-head attention and a feed-forward network, each with layer norm and a residual connection, then a linear layer and softmax predict the next token" caption={caption}>
      <g data-h={640}>
        <defs><marker id="ta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill={INK} /></marker></defs>
        {layer(560, 46, "#fff", "Token embedding + position")}
        {up(560, 524)}
        <rect x={x - 30} y={170} width={W + 60} height={350} fill="none" stroke={C.f} strokeWidth={3} strokeDasharray="8 6" />
        <text x={x + W + 44} y={190} className="dt" fontSize={26} fill={C.f}>× N</text>
        <text x={x + W + 44} y={214} className="dm" fill={MUTED}>12–120 BLOCKS</text>
        {layer(470, 40, "#EEF1F4", "Layer norm")}
        {up(470, 446)}
        {layer(394, 50, C.r, "Masked multi-head attention", true)}
        {up(394, 362)}
        <circle cx={x + W / 2} cy={350} r={12} fill="#fff" stroke={INK} strokeWidth={2} /><text x={x + W / 2} y={356} textAnchor="middle" fontSize={18} fontWeight={700}>+</text>
        <path d={`M${x} 535 H${x - 50} V350 H${x + W / 2 - 14}`} fill="none" stroke={MUTED} strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#ta)" />
        <text x={x - 58} y={445} textAnchor="end" className="dm" fill={MUTED}>RESIDUAL</text>
        {up(338, 316)}
        {layer(276, 40, "#EEF1F4", "Layer norm")}
        {up(276, 252)}
        {layer(200, 50, C.l, "Feed-forward network")}
        <circle cx={x + W / 2} cy={180} r={12} fill="#fff" stroke={INK} strokeWidth={2} /><text x={x + W / 2} y={186} textAnchor="middle" fontSize={18} fontWeight={700}>+</text>
        <path d={`M${x + W} 330 H${x + W + 16} V180 H${x + W / 2 + 16}`} fill="none" stroke={MUTED} strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#ta)" />
        {up(200, 194)}
        {up(168, 130)}
        {layer(84, 44, INK, "Linear → softmax", true)}
        {up(84, 50)}
        <text x={x + W / 2} y={36} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>Probability of every possible next token</text>
      </g>
    </Fig>
  );
}

/* 8 — Three Transformer families */
export function TransformerFamilies({ caption }: { caption?: string }) {
  const cols: [string, string, string, string, string][] = [
    ["Encoder-only", "BERT · RoBERTa · embedding models", "Reads the whole text in both directions", "classification, NER, search embeddings", C.r],
    ["Decoder-only", "GPT · Claude · Llama · Qwen", "Reads left to right, predicts the next token", "chat, code, agents — today's LLMs", C.f],
    ["Encoder–decoder", "T5 · BART · Whisper", "Encodes the input, then decodes an output", "translation, summarisation, speech-to-text", C.p],
  ];
  return (
    <Fig w={780} label="The three Transformer families compared: encoder-only, decoder-only and encoder-decoder" caption={caption}>
      <g data-h={300}>
        {cols.map(([name, eg, how, use, col], i) => {
          const x = 20 + i * 252;
          return (
            <g key={name}>
              <rect x={x} y={20} width={236} height={260} fill="#fff" stroke={INK} strokeWidth={2} />
              <rect x={x} y={20} width={236} height={54} fill={col} />
              <text x={x + 14} y={56} className="dt" fontSize={24} fill="#fff">{name}</text>
              <text x={x + 14} y={98} className="dm" fill={MUTED}>{eg.toUpperCase()}</text>
              <foreignObject x={x + 14} y={112} width={208} height={160}>
                <div style={{ font: "15px/1.4 'Atkinson Hyperlegible', sans-serif", color: INK }}>
                  <p style={{ margin: "0 0 10px" }}>{how}.</p>
                  <p style={{ margin: 0 }}><b>Best for:</b> {use}</p>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </g>
    </Fig>
  );
}

/* 9 — BPE merges */
export function BPEMerges({ caption }: { caption?: string }) {
  const rows: [string, string[]][] = [
    ["start: characters", ["l", "o", "w", "e", "s", "t"]],
    ["merge e+s → es", ["l", "o", "w", "es", "t"]],
    ["merge es+t → est", ["l", "o", "w", "est"]],
    ["merge l+o → lo", ["lo", "w", "est"]],
    ["merge lo+w → low", ["low", "est"]],
  ];
  return (
    <Fig w={700} label="Byte-pair encoding repeatedly merges the most frequent adjacent pair, turning the characters of 'lowest' into the tokens 'low' and 'est'" caption={caption}>
      <g data-h={330}>
        {rows.map(([label, toks], i) => {
          let x = 250;
          return (
            <g key={label}>
              <text x={20} y={50 + i * 60} className="dm" fill={MUTED}>{`STEP ${i} · ${label.toUpperCase()}`}</text>
              {toks.map((t, j) => {
                const w = 26 + t.length * 16; const el = (
                  <g key={j}>
                    <rect x={x} y={26 + i * 60} width={w} height={38} fill={i === rows.length - 1 ? C.l : "#fff"} stroke={INK} strokeWidth={2} />
                    <text x={x + w / 2} y={51 + i * 60} textAnchor="middle" fontSize={18} fontFamily="DM Mono, monospace" fill={INK}>{t}</text>
                  </g>
                ); x += w + 8; return el;
              })}
            </g>
          );
        })}
      </g>
    </Fig>
  );
}
