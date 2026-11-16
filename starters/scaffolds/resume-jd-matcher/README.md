# Resume–Job Matcher — starter scaffold

The full guide is on the website: `/projects/resume-jd-matcher/`. This folder gives you a sensible layout to start from.

## Setup
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # then fill in your keys
python -m pytest -q
```

## Milestones
Tick each one off and commit after it works.

- [ ] 1. Define the schemas
- [ ] 2. Parse the résumé
- [ ] 3. Extract structured profiles
- [ ] 4. Deterministic skill matching with embeddings
- [ ] 5. LLM review + hybrid score
- [ ] 6. Verify the evidence
- [ ] 7. Grounded bullet suggestions
- [ ] 8. API and UI
