# Enterprise Policy RAG — starter scaffold

The full guide is on the website: `/projects/policy-rag/`. This folder gives you a sensible layout to start from.

## Setup
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # then fill in your keys
python -m pytest -q
```

## Milestones
Tick each one off and commit after it works.

- [ ] 1. Services
- [ ] 2. Ingest with metadata and contextual headers
- [ ] 3. Build the golden set *before* optimising
- [ ] 4. Baseline and measure
- [ ] 5. Improve retrieval: hybrid + re-ranking
- [ ] 6. Generate with citations and an honest "don't know"
- [ ] 7. Conversational follow-ups
- [ ] 8. Evaluate end-to-end
- [ ] 9. Serve with FastAPI
- [ ] 10. Ship it: Docker, health checks, versioned prompts and one-step rollback
