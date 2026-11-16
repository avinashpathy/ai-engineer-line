# Starter projects

Complete, runnable code for the three beginner projects on the site. Each folder has its own README-style page on the website:

| Folder | Project | Page |
|---|---|---|
| `s1-first-chatbot/` | A command-line chatbot with memory, streaming and token counts | /projects/s1-first-chatbot/ |
| `s2-ask-a-pdf/` | Ask questions about a document, with page citations and a hit-rate check | /projects/s2-ask-a-pdf/ |
| `s3-first-agent/` | An agent with one tool, an agent loop and a step limit | /projects/s3-first-agent/ |

All three work with any OpenAI-compatible provider, including Ollama on your own computer (free).

```bash
cd s1-first-chatbot
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # then choose your provider
python chat.py
python -m pytest -q       # tests use a fake model, so they're free and need no setup
```

`scaffolds/` holds a starting folder layout for each portfolio project (01–11), with the files to fill in as you follow its milestones.
