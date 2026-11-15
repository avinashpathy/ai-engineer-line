# Roadmap coverage checklist

This file checks the site against every topic in the *AI Engineer Roadmap* (Learnvora, November 2026 edition): 8 areas × 20 topics. Topic names are used only as a checklist; all explanations on the site are original or adapted from the author's own notes.

**Status:** 135 published · 20 planned (in the notes; arrives when that station is written) · 5 gaps (not in the notes; must be written new)

| Area | ✅ Published | 🕒 Planned | ⚠️ Gap |
|---|---|---|---|
| LLM | 20 | 0 | 0 |
| RAG | 20 | 0 | 0 |
| AI Agents | 8 | 9 | 3 |
| Evals | 20 | 0 | 0 |
| AI System Design | 20 | 0 | 0 |
| AI Security | 20 | 0 | 0 |
| Deployment | 7 | 11 | 2 |
| Backend | 20 | 0 | 0 |

Legend: ✅ taught in a published lesson · 🕒 covered by a station still to be written (often already used in a project guide) · ⚠️ needs new content beyond the notes.

## LLM

| # | Topic | Status | Where |
|---|---|---|---|
| 01 | Tokenization | ✅ | [transformers/tokenisation-and-families](/learn/transformers/tokenisation-and-families/) |
| 02 | Transformer architecture | ✅ | [transformers/attention-and-transformer](/learn/transformers/attention-and-transformer/), [how-llms-work/core](/learn/how-llms-work/core/) |
| 03 | Self-attention | ✅ | [transformers/attention-and-transformer](/learn/transformers/attention-and-transformer/) |
| 04 | Context windows | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/), [context-engineering/core](/learn/context-engineering/core/) |
| 05 | KV cache | ✅ | [transformers/mini-gpt](/learn/transformers/mini-gpt/), [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 06 | Temperature and top-p | ✅ | [how-llms-work/core](/learn/how-llms-work/core/) |
| 07 | System prompts | ✅ | [prompt-engineering/core](/learn/prompt-engineering/core/) |
| 08 | Few-shot prompting | ✅ | [prompt-engineering/core](/learn/prompt-engineering/core/) |
| 09 | Chain of thought | ✅ | [prompt-engineering/core](/learn/prompt-engineering/core/) |
| 10 | Reasoning models | ✅ | [how-llms-work/core](/learn/how-llms-work/core/) |
| 11 | Structured outputs | ✅ | [llm-apis/core](/learn/llm-apis/core/) |
| 12 | Prompt caching | ✅ | [llm-apis/core](/learn/llm-apis/core/), [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 13 | Token pricing | ✅ | [llm-apis/core](/learn/llm-apis/core/), [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 14 | Hallucinations | ✅ | [how-llms-work/core](/learn/how-llms-work/core/), [alignment-safety/core](/learn/alignment-safety/core/) |
| 15 | Multimodal inputs | ✅ | [llm-apis/core](/learn/llm-apis/core/), [multimodal-voice/multimodal](/learn/multimodal-voice/multimodal/) |
| 16 | Fine-tuning with LoRA | ✅ | [fine-tuning/core](/learn/fine-tuning/core/) |
| 17 | QLoRA | ✅ | [fine-tuning/core](/learn/fine-tuning/core/) |
| 18 | Quantization | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 19 | Distillation | ✅ | [fine-tuning/deep-dive](/learn/fine-tuning/deep-dive/) |
| 20 | Open vs closed models | ✅ | [how-llms-work/core](/learn/how-llms-work/core/) |

## RAG

| # | Topic | Status | Where |
|---|---|---|---|
| 01 | Embeddings | ✅ | [transformers/text-and-embeddings](/learn/transformers/text-and-embeddings/) |
| 02 | Cosine similarity | ✅ | [transformers/text-and-embeddings](/learn/transformers/text-and-embeddings/) |
| 03 | Chunking strategies | ✅ | [rag-foundations/core](/learn/rag-foundations/core/), [rag-foundations/deep-dive](/learn/rag-foundations/deep-dive/) |
| 04 | Vector databases | ✅ | [rag-foundations/core](/learn/rag-foundations/core/) |
| 05 | pgvector | ✅ | [rag-foundations/deep-dive](/learn/rag-foundations/deep-dive/) |
| 06 | HNSW indexes | ✅ | [rag-foundations/core](/learn/rag-foundations/core/), [rag-foundations/deep-dive](/learn/rag-foundations/deep-dive/) |
| 07 | Metadata filtering | ✅ | [rag-orchestration/core](/learn/rag-orchestration/core/), [rag-foundations/deep-dive](/learn/rag-foundations/deep-dive/) |
| 08 | BM25 keyword search | ✅ | [advanced-rag/core](/learn/advanced-rag/core/) |
| 09 | Hybrid search | ✅ | [advanced-rag/core](/learn/advanced-rag/core/), [rag-foundations/deep-dive](/learn/rag-foundations/deep-dive/) |
| 10 | Reranking | ✅ | [advanced-rag/core](/learn/advanced-rag/core/) |
| 11 | Query rewriting | ✅ | [rag-orchestration/core](/learn/rag-orchestration/core/), [advanced-rag/core](/learn/advanced-rag/core/) |
| 12 | HyDE | ✅ | [advanced-rag/core](/learn/advanced-rag/core/) |
| 13 | Contextual retrieval | ✅ | [advanced-rag/core](/learn/advanced-rag/core/) |
| 14 | Parent-child chunking | ✅ | [advanced-rag/core](/learn/advanced-rag/core/) |
| 15 | Document parsing | ✅ | [rag-orchestration/deep-dive](/learn/rag-orchestration/deep-dive/), [multimodal-voice/multimodal](/learn/multimodal-voice/multimodal/) |
| 16 | Citations | ✅ | [rag-foundations/core](/learn/rag-foundations/core/), [rag-orchestration/core](/learn/rag-orchestration/core/) |
| 17 | GraphRAG | ✅ | [advanced-rag/deep-dive](/learn/advanced-rag/deep-dive/), [production-rag/core](/learn/production-rag/core/) |
| 18 | Agentic RAG | ✅ | [production-rag/core](/learn/production-rag/core/), [advanced-rag/core](/learn/advanced-rag/core/) |
| 19 | Recall@k | ✅ | [evaluation/core](/learn/evaluation/core/) |
| 20 | MRR and nDCG | ✅ | [evaluation/core](/learn/evaluation/core/) |

## AI Agents

| # | Topic | Status | Where |
|---|---|---|---|
| 01 | Tool calling | ✅ | [llm-apis/core](/learn/llm-apis/core/) |
| 02 | The agent loop | ✅ | [llm-apis/core](/learn/llm-apis/core/); more in Agent Foundations |
| 03 | ReAct pattern | 🕒 | Agent Foundations station |
| 04 | Planning | 🕒 | Agent Patterns station · used in Project 09 |
| 05 | Reflection | ✅ | [prompt-engineering/core](/learn/prompt-engineering/core/) (self-critique); more in Agent Patterns |
| 06 | Short-term memory | ✅ | [context-engineering/core](/learn/context-engineering/core/) |
| 07 | Long-term memory | ✅ | [context-engineering/core](/learn/context-engineering/core/) |
| 08 | MCP servers | 🕒 | MCP station · built in Project 08 |
| 09 | MCP clients | 🕒 | MCP station · used in Project 08 |
| 10 | Agent Skills | ⚠️ | Not in the notes yet — to be written for the MCP station |
| 11 | Multi-agent handoffs | 🕒 | Agent Foundations deep dive |
| 12 | Orchestrator-worker pattern | 🕒 | Agent Patterns station · used in Project 09 |
| 13 | LangGraph | 🕒 | LangGraph station · used in Projects 07, 09 |
| 14 | OpenAI Agents SDK | ⚠️ | Only name-checked in the notes — to be written for Agent Foundations |
| 15 | State and checkpoints | 🕒 | LangGraph station · used in Project 09 |
| 16 | Human in the loop | 🕒 | Agent Patterns station · used in Projects 05, 07, 09 |
| 17 | Context engineering | ✅ | [context-engineering/core](/learn/context-engineering/core/) |
| 18 | Context compaction | ✅ | [context-engineering/core](/learn/context-engineering/core/) |
| 19 | Stop conditions | ✅ | [llm-apis/core](/learn/llm-apis/core/) (round limits); more in Agent Patterns |
| 20 | A2A protocol | ⚠️ | Not in the notes yet — to be written for the Agent Foundations deep dive |

## Evals

| # | Topic | Status | Where |
|---|---|---|---|
| 01 | Golden datasets | ✅ | [ml-essentials/evaluation-basics](/learn/ml-essentials/evaluation-basics/), [prompt-engineering/core](/learn/prompt-engineering/core/) |
| 02 | Error analysis | ✅ | [evaluation/core](/learn/evaluation/core/), [prompt-engineering/core](/learn/prompt-engineering/core/) |
| 03 | LLM as a judge | ✅ | [prompt-engineering/core](/learn/prompt-engineering/core/) (recipe 8) |
| 04 | Pairwise comparison | ✅ | [evaluation/deep-dive](/learn/evaluation/deep-dive/) |
| 05 | Rubric scoring | ✅ | [prompt-engineering/core](/learn/prompt-engineering/core/) |
| 06 | Faithfulness | ✅ | [evaluation/core](/learn/evaluation/core/) |
| 07 | Answer relevance | ✅ | [evaluation/core](/learn/evaluation/core/) |
| 08 | Context precision | ✅ | [evaluation/core](/learn/evaluation/core/) |
| 09 | Tool call accuracy | ✅ | [evaluation/deep-dive](/learn/evaluation/deep-dive/) |
| 10 | Trajectory evals | ✅ | [evaluation/deep-dive](/learn/evaluation/deep-dive/) |
| 11 | Regression evals in CI | ✅ | [evaluation/deep-dive](/learn/evaluation/deep-dive/), [prompt-engineering/core](/learn/prompt-engineering/core/) |
| 12 | A/B testing prompts | ✅ | [prompt-engineering/core](/learn/prompt-engineering/core/) |
| 13 | Human labeling | ✅ | [evaluation/deep-dive](/learn/evaluation/deep-dive/) |
| 14 | Synthetic test data | ✅ | [evaluation/deep-dive](/learn/evaluation/deep-dive/) |
| 15 | Tracing | ✅ | [evaluation/core](/learn/evaluation/core/), [rag-orchestration/core](/learn/rag-orchestration/core/) |
| 16 | Langfuse | ✅ | [evaluation/core](/learn/evaluation/core/) |
| 17 | OpenTelemetry for LLMs | ✅ | [evaluation/core](/learn/evaluation/core/) |
| 18 | P95 latency | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/), [choosing-models/core](/learn/choosing-models/core/) |
| 19 | Cost per request | ✅ | [llm-apis/core](/learn/llm-apis/core/), [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 20 | User feedback loops | ✅ | [full-stack-apps/core](/learn/full-stack-apps/core/) |

## AI System Design

| # | Topic | Status | Where |
|---|---|---|---|
| 01 | Model routing | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/), [choosing-models/core](/learn/choosing-models/core/) |
| 02 | Model fallbacks | ✅ | [llm-apis/core](/learn/llm-apis/core/) |
| 03 | Semantic caching | ✅ | [advanced-rag/deep-dive](/learn/advanced-rag/deep-dive/), [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 04 | Prefix caching | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/), [llm-apis/core](/learn/llm-apis/core/) |
| 05 | Token budgets | ✅ | [context-engineering/core](/learn/context-engineering/core/) |
| 06 | Streaming responses | ✅ | [python-backend/apis-async-streaming](/learn/python-backend/apis-async-streaming/), [llm-apis/core](/learn/llm-apis/core/) |
| 07 | Time to first token | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 08 | Throughput vs latency | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 09 | Inference serving with vLLM | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 10 | Continuous batching | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 11 | PagedAttention | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 12 | Speculative decoding | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 13 | GPU vs API cost | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 14 | Batch inference | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/), [llm-apis/core](/learn/llm-apis/core/) |
| 15 | Async job pipelines | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/), [full-stack-apps/core](/learn/full-stack-apps/core/) |
| 16 | Provider rate limits | ✅ | [llm-apis/core](/learn/llm-apis/core/) |
| 17 | Multi-tenant design | ✅ | [production-rag/core](/learn/production-rag/core/), [full-stack-apps/core](/learn/full-stack-apps/core/) |
| 18 | RAG vs fine-tuning | ✅ | [fine-tuning/core](/learn/fine-tuning/core/) |
| 19 | Context window management | ✅ | [context-engineering/core](/learn/context-engineering/core/) |
| 20 | Cost optimization | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |

## AI Security

| # | Topic | Status | Where |
|---|---|---|---|
| 01 | Prompt injection | ✅ | [alignment-safety/core](/learn/alignment-safety/core/) |
| 02 | Indirect prompt injection | ✅ | [alignment-safety/core](/learn/alignment-safety/core/) |
| 03 | Jailbreaks | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |
| 04 | OWASP Top 10 for LLMs | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |
| 05 | Input guardrails | ✅ | [alignment-safety/core](/learn/alignment-safety/core/) |
| 06 | Output validation | ✅ | [llm-apis/core](/learn/llm-apis/core/), [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |
| 07 | PII redaction | ✅ | [alignment-safety/core](/learn/alignment-safety/core/), [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |
| 08 | Data leakage | ✅ | [alignment-safety/core](/learn/alignment-safety/core/) |
| 09 | Least-privilege tools | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/), [python-backend/sql-git](/learn/python-backend/sql-git/) |
| 10 | Tool sandboxing | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |
| 11 | Secrets management | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/), [start-here/setup](/learn/start-here/setup/) |
| 12 | API key rotation | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/), [llm-apis/core](/learn/llm-apis/core/) |
| 13 | Authorization for agents | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/), [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 14 | Human approval for actions | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |
| 15 | Content moderation | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |
| 16 | Data poisoning | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |
| 17 | Access control in RAG | ✅ | [production-rag/core](/learn/production-rag/core/), [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |
| 18 | MCP server trust | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/); more in the MCP station |
| 19 | Audit logging | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |
| 20 | Red teaming | ✅ | [alignment-safety/deep-dive](/learn/alignment-safety/deep-dive/) |

## Deployment

| # | Topic | Status | Where |
|---|---|---|---|
| 01 | Docker | 🕒 | Deployment & CI/CD station · used in every project |
| 02 | Docker Compose | ✅ | [full-stack-apps/core](/learn/full-stack-apps/core/) |
| 03 | Kubernetes basics | 🕒 | Deployment & CI/CD deep dive |
| 04 | CI/CD pipelines | 🕒 | Deployment & CI/CD station |
| 05 | GitHub Actions | 🕒 | Deployment & CI/CD station · used in Projects 06, 07 |
| 06 | Eval gates in CI | 🕒 | Deployment & CI/CD station · used in Project 07 |
| 07 | Environment configs | ✅ | [start-here/setup](/learn/start-here/setup/) |
| 08 | Infrastructure as code | 🕒 | Deployment & CI/CD deep dive |
| 09 | Serverless functions | 🕒 | Cloud GenAI & LLMOps station |
| 10 | GPU instances | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/); more in Cloud GenAI & LLMOps |
| 11 | Ollama for local models | ✅ | [how-llms-work/deep-dive](/learn/how-llms-work/deep-dive/) |
| 12 | Autoscaling | 🕒 | Deployment & CI/CD deep dive |
| 13 | Load balancing | ⚠️ | Thin in the notes — to be expanded in the Deployment & CI/CD deep dive |
| 14 | Canary releases | ✅ | [prompt-engineering/core](/learn/prompt-engineering/core/) (gradual rollout); more in Deployment & CI/CD |
| 15 | Feature flags | ⚠️ | Not in the notes yet — to be written for Deployment & CI/CD |
| 16 | Prompt versioning | ✅ | [prompt-engineering/core](/learn/prompt-engineering/core/) |
| 17 | Model versioning | ✅ | [choosing-models/core](/learn/choosing-models/core/) |
| 18 | Health checks | 🕒 | Deployment & CI/CD station · used in Project 07 |
| 19 | Alerts and dashboards | 🕒 | Observability station |
| 20 | Rollbacks | 🕒 | Deployment & CI/CD station |

## Backend

| # | Topic | Status | Where |
|---|---|---|---|
| 01 | REST APIs | ✅ | [python-backend/apis-async-streaming](/learn/python-backend/apis-async-streaming/) |
| 02 | HTTP and status codes | ✅ | [python-backend/apis-async-streaming](/learn/python-backend/apis-async-streaming/) |
| 03 | Async and await | ✅ | [python-backend/apis-async-streaming](/learn/python-backend/apis-async-streaming/) |
| 04 | Streaming with SSE | ✅ | [python-backend/apis-async-streaming](/learn/python-backend/apis-async-streaming/) |
| 05 | WebSockets | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 06 | Authentication with JWT | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 07 | OAuth 2.0 | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 08 | SQL vs NoSQL | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 09 | Database indexing | ✅ | [python-backend/sql-git](/learn/python-backend/sql-git/) |
| 10 | Transactions and ACID | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 11 | Caching with Redis | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 12 | Message queues | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 13 | Background jobs | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 14 | Rate limiting | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 15 | Idempotency keys | ✅ | [python-backend/apis-async-streaming](/learn/python-backend/apis-async-streaming/), [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 16 | Retries with backoff | ✅ | [python-backend/apis-async-streaming](/learn/python-backend/apis-async-streaming/) |
| 17 | File uploads to S3 | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 18 | Pagination | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |
| 19 | Input validation with Pydantic | ✅ | [python-backend/python-for-ai](/learn/python-backend/python-for-ai/) |
| 20 | Logging and monitoring | ✅ | [python-backend/production-backend](/learn/python-backend/production-backend/) |

## Keeping this up to date

When a station is published, change its rows from 🕒 to ✅ and link the lesson. When a gap is written, do the same. Review this file before every content pull request.
