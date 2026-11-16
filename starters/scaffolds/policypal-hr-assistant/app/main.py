"""PolicyPal HR Assistant — API entry point. Each milestone on the project page adds to this."""
from fastapi import FastAPI

app = FastAPI(title="PolicyPal HR Assistant")


@app.get("/health")
def health() -> dict:
    """Liveness check: the process is up. Add a /ready check once you have dependencies."""
    return {"status": "ok"}
