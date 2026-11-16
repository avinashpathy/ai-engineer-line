# AI Gateway — starter scaffold

The full guide is on the website: `/projects/ai-gateway/`. This folder gives you a sensible layout to start from.

## Setup
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # then fill in your keys
python -m pytest -q
```

## Milestones
Tick each one off and commit after it works.

- [ ] 1. Services and configuration
- [ ] 2. Virtual keys
- [ ] 3. Rate limits and token budgets
- [ ] 4. Routing
- [ ] 5. Fallbacks, timeouts and a circuit breaker
- [ ] 6. The semantic cache
- [ ] 7. The OpenAI-compatible endpoint, with streaming
- [ ] 8. Metrics and the dashboard
- [ ] 9. Test it under load and under failure
