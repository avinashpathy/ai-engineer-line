# Multi-Agent Research Reports — starter scaffold

The full guide is on the website: `/projects/research-agent/`. This folder gives you a sensible layout to start from.

## Setup
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # then fill in your keys
python -m pytest -q
```

## Milestones
Tick each one off and commit after it works.

- [ ] 1. State
- [ ] 2. Planner and human review
- [ ] 3. Fan out researchers with `Send`
- [ ] 4. Critic: verify claims against sources
- [ ] 5. Writer
- [ ] 6. Assemble the graph with budgets and checkpointing
- [ ] 7. API and live UI
