# Voice AI Receptionist — starter scaffold

The full guide is on the website: `/projects/voice-receptionist/`. This folder gives you a sensible layout to start from.

## Setup
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # then fill in your keys
python -m pytest -q
```

## Milestones
Tick each one off and commit after it works.

- [ ] 1. Clinic data and tools
- [ ] 2. Speech-to-text and text-to-speech
- [ ] 3. Turn-taking and barge-in
- [ ] 4. The dialogue agent
- [ ] 5. Telephony
