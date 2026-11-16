# Invoice Extraction Service — starter scaffold

The full guide is on the website: `/projects/document-extraction/`. This folder gives you a sensible layout to start from.

## Setup
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # then fill in your keys
python -m pytest -q
```

## Milestones
Tick each one off and commit after it works.

- [ ] 1. Schema with self-reported confidence
- [ ] 2. Render pages and call the vision model
- [ ] 3. Validation rules
- [ ] 4. Confidence routing
- [ ] 5. Async processing with a queue
- [ ] 6. Review UI and corrections
- [ ] 7. Improve with per-vendor few-shot examples
