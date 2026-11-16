# Support Chatbot with Hand-off — starter scaffold

The full guide is on the website: `/projects/support-chatbot/`. This folder gives you a sensible layout to start from.

## Setup
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # then fill in your keys
python -m pytest -q
```

## Milestones
Tick each one off and commit after it works.

- [ ] 1. Knowledge base and mock backend
- [ ] 2. Index the knowledge base in pgvector
- [ ] 3. Tools, with ownership and confirmation enforced by code
- [ ] 4. System prompt
- [ ] 5. The conversation loop with state
- [ ] 6. Hand-off that humans actually like
- [ ] 7. Evaluate with simulated users
- [ ] 8. Feedback loop and dashboard
