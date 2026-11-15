// The whole curriculum as a metro system: lines → stations → lessons.
// A station's lessons are MDX files in content/learn/<station>/<lesson>.mdx.
// A lesson listed here without an MDX file shows as "coming soon".

export type Level = "beginner" | "intermediate" | "advanced";
export type LineId = "f" | "l" | "r" | "a" | "p" | "c";

export interface Line { id: LineId; code: string; name: string; color: string; ink: string; note: string }
export interface LessonRef { slug: string; title: string; level: Level; minutes: number }
export interface Station { id: string; line: LineId; title: string; short: string; blurb: string; lessons: LessonRef[] }

export const LINES: Line[] = [
  { id: "f", code: "F", name: "Foundations", color: "#E0402A", ink: "#FFFFFF", note: "Python, backend basics, ML, deep learning and the Transformer. Everything else runs on this line." },
  { id: "l", code: "L", name: "LLM Engineering", color: "#F2B200", ink: "#0E1A2B", note: "How LLMs work and how to call, prompt, feed, adapt and secure them in real products." },
  { id: "r", code: "R", name: "RAG", color: "#2A6FDB", ink: "#FFFFFF", note: "Search your own data and answer with citations: vector search, advanced retrieval and evaluation." },
  { id: "a", code: "A", name: "Agents", color: "#7A4CC2", ink: "#FFFFFF", note: "Tool use, agent loops, patterns, MCP and LangGraph: models that take actions." },
  { id: "p", code: "P", name: "Production", color: "#00857A", ink: "#FFFFFF", note: "Ship and operate: containers, CI/CD, observability, cloud LLMOps and governance." },
  { id: "c", code: "C", name: "Career", color: "#3B4659", ink: "#FFFFFF", note: "System design, 120 interview questions, portfolio and the plan to get hired." },
];

const L = (slug: string, title: string, level: Level, minutes: number): LessonRef => ({ slug, title, level, minutes });

export const STATIONS: Station[] = [
  // F — Foundations
  { id: "start-here", line: "f", title: "Start Here", short: "Start Here",
    blurb: "What an AI Engineer actually does, the skills hiring managers screen for, the GenAI stack, and how to set up your machine.",
    lessons: [L("the-ai-engineer", "The AI Engineer: role, skills and the GenAI stack", "beginner", 25), L("setup", "Set up your AI engineering workstation", "beginner", 20)] },
  { id: "python-backend", line: "f", title: "Python & Backend for AI", short: "Python & Backend",
    blurb: "The Python, HTTP, async, SQL, Git and production backend skills every AI product is built on.",
    lessons: [L("python-for-ai", "Python for AI engineers", "beginner", 40), L("apis-async-streaming", "APIs, async and streaming", "beginner", 35), L("sql-git", "SQL and Git essentials", "beginner", 30), L("production-backend", "Production backend for AI apps", "intermediate", 55)] },
  { id: "ml-essentials", line: "f", title: "Machine Learning Essentials", short: "ML Essentials",
    blurb: "How models learn from data, how to measure them, and the classic algorithms that still win on tables.",
    lessons: [L("how-models-learn", "How models learn", "beginner", 35), L("evaluation-basics", "Measuring a model honestly", "beginner", 30)] },
  { id: "deep-learning", line: "f", title: "Deep Learning Essentials", short: "Deep Learning",
    blurb: "Neural networks, backpropagation and PyTorch, explained from the ground up.",
    lessons: [L("neural-networks", "Neural networks from scratch", "beginner", 40), L("pytorch", "PyTorch in practice", "intermediate", 40)] },
  { id: "transformers", line: "f", title: "Text, Attention & Transformers", short: "Transformers",
    blurb: "How text becomes numbers, how attention works, a mini-GPT you build yourself, and the three Transformer families.",
    lessons: [L("text-and-embeddings", "Text representation and embeddings", "beginner", 30), L("attention-and-transformer", "Attention and the Transformer", "intermediate", 40), L("mini-gpt", "Build a mini-GPT from scratch", "advanced", 60), L("tokenisation-and-families", "Tokenisation and the Transformer families", "intermediate", 35)] },

  // L — LLM Engineering
  { id: "generative-ai", line: "l", title: "Foundations of Generative AI", short: "Generative AI",
    blurb: "Discriminative vs generative models, VAEs, GANs and diffusion, and how generation is evaluated.",
    lessons: [L("core", "Generative models explained", "intermediate", 35), L("deep-dive", "Deep dive: VAE, GAN and diffusion in code", "advanced", 50)] },
  { id: "how-llms-work", line: "l", title: "How LLMs Work", short: "How LLMs Work",
    blurb: "Architecture, pre-training, instruction tuning and how text is generated token by token.",
    lessons: [L("core", "LLM concepts, architecture and pre-training", "intermediate", 40), L("deep-dive", "Deep dive: inference, quantisation and cost", "advanced", 50)] },
  { id: "llm-apis", line: "l", title: "Working with LLM APIs", short: "LLM APIs",
    blurb: "Streaming, structured outputs, tool calling, caching, batching, retries and a production-ready client.",
    lessons: [L("core", "LLM APIs like a professional", "intermediate", 55)] },
  { id: "prompt-engineering", line: "l", title: "Prompt Engineering Workshop", short: "Prompting",
    blurb: "Eight reusable recipes, few-shot done right, anti-patterns, prompt testing and injection defence.",
    lessons: [L("core", "Recipes, iteration and testing", "intermediate", 50)] },
  { id: "context-engineering", line: "l", title: "Context Engineering", short: "Context",
    blurb: "Decide exactly what the model sees: token budgets, memory, state and long-term recall.",
    lessons: [L("core", "Managing what the model sees", "intermediate", 40)] },
  { id: "full-stack-apps", line: "l", title: "Full-Stack LLM Applications", short: "Full-Stack Apps",
    blurb: "FastAPI backends, SSE streaming, auth, quotas, background jobs and React or Streamlit front ends.",
    lessons: [L("core", "Building full-stack LLM apps", "intermediate", 55)] },
  { id: "fine-tuning", line: "l", title: "Fine-Tuning: PEFT, LoRA, QLoRA", short: "Fine-Tuning",
    blurb: "When to adapt weights, how LoRA works, and QLoRA on a single GPU.",
    lessons: [L("core", "LLM adaptation and fine-tuning", "advanced", 45), L("deep-dive", "Deep dive: data, distillation and troubleshooting", "advanced", 50)] },
  { id: "multimodal-voice", line: "l", title: "Multimodal & Voice AI", short: "Multimodal",
    blurb: "Vision Transformers, CLIP, document AI, speech recognition, TTS and voice agents.",
    lessons: [L("multimodal", "Multimodal AI and document AI", "advanced", 45), L("voice", "Speech and voice AI", "advanced", 45)] },
  { id: "choosing-models", line: "l", title: "Choosing & Benchmarking LLMs", short: "Choosing Models",
    blurb: "Compare models on your own task: quality, latency, cost and a reusable harness.",
    lessons: [L("core", "Benchmarking LLMs for your use case", "intermediate", 30)] },
  { id: "alignment-safety", line: "l", title: "Alignment & LLM Security", short: "Alignment",
    blurb: "RLHF, DPO, harms, privacy risks and the security threats unique to LLM apps.",
    lessons: [L("core", "Alignment and responsible GenAI", "intermediate", 35), L("deep-dive", "Deep dive: alignment algorithms and LLM security", "advanced", 45)] },

  // R — RAG
  { id: "rag-foundations", line: "r", title: "RAG & Vector Search", short: "RAG Basics",
    blurb: "Why retrieval beats memorisation, embeddings, chunking and vector databases.",
    lessons: [L("core", "Foundations of RAG and vector search", "intermediate", 45), L("deep-dive", "Deep dive: vector search internals", "advanced", 45)] },
  { id: "rag-orchestration", line: "r", title: "RAG Orchestration", short: "Orchestration",
    blurb: "LangChain, LlamaIndex, document parsing, and RAG without any framework.",
    lessons: [L("core", "LangChain and RAG orchestration", "intermediate", 45), L("deep-dive", "Deep dive: RAG without frameworks", "advanced", 45)] },
  { id: "advanced-rag", line: "r", title: "Advanced RAG", short: "Advanced RAG",
    blurb: "Hybrid search, re-ranking, query rewriting, GraphRAG, text-to-SQL and RAG security.",
    lessons: [L("core", "Advanced techniques and system design", "advanced", 50), L("deep-dive", "Deep dive: GraphRAG, text-to-SQL and caching", "advanced", 50)] },
  { id: "evaluation", line: "r", title: "Evaluation & Debugging", short: "Evals",
    blurb: "Golden sets, retrieval and generation metrics, LLM-as-judge and an evaluation harness.",
    lessons: [L("core", "Evaluation, debugging and optimisation", "intermediate", 45), L("deep-dive", "Deep dive: build an evaluation harness", "advanced", 45)] },
  { id: "production-rag", line: "r", title: "Production RAG", short: "Production RAG",
    blurb: "Ingestion pipelines, agentic RAG, Neo4j GraphRAG and managed cloud services.",
    lessons: [L("core", "Production RAG pipelines", "advanced", 55)] },

  // A — Agents
  { id: "agent-foundations", line: "a", title: "Agentic AI Foundations", short: "Agent Basics",
    blurb: "The agent loop, architecture patterns, frameworks, multi-agent systems and memory.",
    lessons: [L("core", "Agents: foundations and orchestration", "intermediate", 50), L("deep-dive", "Deep dive: multi-agent, memory and evaluating agents", "advanced", 50)] },
  { id: "agent-patterns", line: "a", title: "Agent Engineering Patterns", short: "Patterns",
    blurb: "A cookbook of patterns: routing, planning, reflection, human approval and failure handling.",
    lessons: [L("core", "Agent engineering patterns cookbook", "advanced", 50)] },
  { id: "mcp", line: "a", title: "Model Context Protocol", short: "MCP",
    blurb: "Servers, clients, tools, resources and prompts: the standard way to give agents tools.",
    lessons: [L("core", "MCP deep dive", "advanced", 45)] },
  { id: "langgraph", line: "a", title: "LangGraph in Depth", short: "LangGraph",
    blurb: "State graphs, checkpoints, interrupts and durable agent workflows.",
    lessons: [L("core", "A practical guide to LangGraph", "advanced", 60)] },
  { id: "computer-use-agents", line: "a", title: "Browser & Coding Agents", short: "Computer Use",
    blurb: "Agents that drive browsers, desktops and codebases, and how to keep them safe.",
    lessons: [L("core", "Browser, computer-use and coding agents", "advanced", 35)] },

  // P — Production
  { id: "deployment-cicd", line: "p", title: "Containers, Deployment & CI/CD", short: "Deploy & CI/CD",
    blurb: "Docker, Kubernetes, infrastructure as code and pipelines with evaluation gates.",
    lessons: [L("core", "MLOps for agentic systems", "advanced", 45), L("deep-dive", "Deep dive: Kubernetes, IaC and pipelines", "advanced", 50)] },
  { id: "observability", line: "p", title: "Observability & Reliability", short: "Observability",
    blurb: "Metrics, traces, logs, cost dashboards and incident response for AI systems.",
    lessons: [L("core", "Agent observability and reliability", "advanced", 40), L("deep-dive", "Deep dive: the observability stack in code", "advanced", 45)] },
  { id: "cloud-llmops", line: "p", title: "Cloud GenAI & LLMOps", short: "Cloud LLMOps",
    blurb: "AWS Bedrock, Azure AI Foundry, Vertex AI, gateways and running LLMOps day to day.",
    lessons: [L("core", "Deploying GenAI on the cloud", "advanced", 45)] },
  { id: "governance", line: "p", title: "Responsible AI & Governance", short: "Governance",
    blurb: "Risk frameworks, guardrails, human-in-the-loop and the regulations that apply.",
    lessons: [L("core", "Responsible agentic AI", "intermediate", 40), L("deep-dive", "Deep dive: governance toolkit", "advanced", 35)] },

  // C — Career
  { id: "system-design", line: "c", title: "GenAI System Design", short: "System Design",
    blurb: "Worked case studies of the system-design questions AI Engineer interviews ask.",
    lessons: [L("core", "GenAI system design case studies", "advanced", 50)] },
  { id: "interview-bank", line: "c", title: "Interview Question Bank", short: "Interviews",
    blurb: "120 GenAI interview questions with crisp answers, grouped by topic.",
    lessons: [L("core", "120 GenAI interview questions", "intermediate", 90)] },
  { id: "career-plan", line: "c", title: "Portfolio & Career Plan", short: "Career Plan",
    blurb: "A transition plan, portfolio strategy, résumé advice, exercises and 15 mini-projects.",
    lessons: [L("core", "Transition plan, portfolio and résumé", "beginner", 35), L("practice", "Practice exercises and mini-projects", "intermediate", 60)] },
];

export const lineOf = (id: LineId) => LINES.find(l => l.id === id)!;
export const stationById = (id: string) => STATIONS.find(s => s.id === id);
export const stationsOn = (line: LineId) => STATIONS.filter(s => s.line === line);
export const lessonKey = (station: string, lesson: string) => `${station}/${lesson}`;

/** Flat, ordered list of every lesson in the curriculum. */
export const ALL_LESSONS = STATIONS.flatMap(s => s.lessons.map(l => ({ ...l, station: s.id, line: s.line, key: lessonKey(s.id, l.slug) })));

export const LEVEL_LABEL: Record<Level, string> = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };
