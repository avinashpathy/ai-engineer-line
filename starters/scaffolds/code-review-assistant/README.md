# Codebase Q&A + PR Reviewer — starter scaffold

The full guide is on the website: `/projects/code-review-assistant/`. This folder gives you a sensible layout to start from.

## Setup
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # then fill in your keys
python -m pytest -q
```

## Milestones
Tick each one off and commit after it works.

- [ ] 1. Define your golden questions
- [ ] 2. Chunk code by syntax, not characters
- [ ] 3. Build a repository map
- [ ] 4. A hybrid index tuned for code
- [ ] 5. Codebase Q&A with citations
- [ ] 6. Gather context for a pull request
- [ ] 7. Structured findings
- [ ] 8. Filter, then post inline comments
- [ ] 9. Run it as a GitHub Action
