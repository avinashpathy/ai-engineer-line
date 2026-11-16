# PolicyPal HR Assistant — starter scaffold

The full guide is on the website: `/projects/policypal-hr-assistant/`. This folder gives you a sensible layout to start from.

## Setup
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # then fill in your keys
python -m pytest -q
```

## Milestones
Tick each one off and commit after it works.

- [ ] 1. Write the behaviour spec
- [ ] 2. Baseline with prompting only
- [ ] 3. Build a training set: synthetic, then reviewed
- [ ] 4. Fine-tune with QLoRA
- [ ] 5. Evaluate three contenders
- [ ] 6. Add tools, safely
- [ ] 7. Add guardrails
- [ ] 8. Ship a UI
- [ ] 9. Red-team and document
