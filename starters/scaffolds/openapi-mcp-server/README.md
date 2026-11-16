# OpenAPI → MCP Server — starter scaffold

The full guide is on the website: `/projects/openapi-mcp-server/`. This folder gives you a sensible layout to start from.

## Setup
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                # then fill in your keys
python -m pytest -q
```

## Milestones
Tick each one off and commit after it works.

- [ ] 1. A target API
- [ ] 2. Parse the spec into tool definitions
- [ ] 3. Curate: generated tools are never enough
- [ ] 4. OAuth2 token cache and HTTP executor
- [ ] 5. Shape responses for the model
- [ ] 6. The MCP server
- [ ] 7. Test with the MCP Inspector and a real assistant
- [ ] 8. Use it from your own LangGraph agent
