"""Starter project S3 - your first agent.

A small agent that answers questions about your spending. It has ONE tool,
query_expenses, which reads expenses.csv. The model decides when to call it and
with which filters; this program runs the tool and sends the result back.

Run:  python agent.py "How much did I spend on food in October 2026?"
"""
import csv
import json
import os
import sys

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
BASE_URL = os.getenv("LLM_BASE_URL", "http://localhost:11434/v1")
API_KEY = os.getenv("LLM_API_KEY", "ollama")
MODEL = os.getenv("LLM_MODEL", "llama3.2")   # pick a model that supports tool calling
MAX_STEPS = 5                                 # the agent must finish within this many model calls
CSV_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "expenses.csv")
CATEGORIES = ["food", "transport", "bills", "shopping"]


# ---------- the tool: ordinary Python ----------
def query_expenses(category: str | None = None, month: str | None = None) -> dict:
    """Filter expenses by category and/or month (YYYY-MM) and return the total, count and items."""
    if category is not None and category not in CATEGORIES:
        return {"error": f"Unknown category '{category}'. Use one of {CATEGORIES}, or leave it out."}
    if month is not None and (len(month) != 7 or month[4] != "-"):
        return {"error": "month must look like 2026-10 (YYYY-MM)."}
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        rows = [r for r in csv.DictReader(f)
                if (category is None or r["category"] == category)
                and (month is None or r["date"].startswith(month))]
    total = sum(float(r["amount"]) for r in rows)
    return {"total_rupees": total, "count": len(rows),
            "items": [f"{r['date']} {r['description']} ₹{r['amount']}" for r in rows][:10]}


# ---------- how the model learns about the tool ----------
TOOLS = [{
    "type": "function",
    "function": {
        "name": "query_expenses",
        "description": ("Look up the user's expenses. Use it for any question about how much was spent. "
                        "Filter by category and/or month; leave a filter out to include everything. "
                        "Returns the total in rupees, the number of expenses and up to 10 items."),
        "parameters": {
            "type": "object",
            "properties": {
                "category": {"type": "string", "enum": CATEGORIES, "description": "Spending category."},
                "month": {"type": "string", "description": "Month as YYYY-MM, for example 2026-10."},
            },
        },
    },
}]

SYSTEM = ("You help the user understand their spending. Always use the query_expenses tool for numbers - "
          "never guess. Amounts are in Indian rupees. Answer in one or two short sentences.")


# ---------- the agent loop ----------
def run_agent(client, question: str, verbose: bool = True) -> str:
    messages = [{"role": "system", "content": SYSTEM}, {"role": "user", "content": question}]
    for step in range(1, MAX_STEPS + 1):
        resp = client.chat.completions.create(model=MODEL, messages=messages, tools=TOOLS, temperature=0)
        msg = resp.choices[0].message
        if not msg.tool_calls:                          # no tool requested: this is the final answer
            return msg.content or ""
        messages.append({"role": "assistant", "content": msg.content or "",
                         "tool_calls": [tc.model_dump() if hasattr(tc, "model_dump") else tc for tc in msg.tool_calls]})
        for call in msg.tool_calls:
            args = {}
            try:
                args = json.loads(call.function.arguments or "{}")
                result = (query_expenses(**args) if call.function.name == "query_expenses"
                          else {"error": f"No tool named {call.function.name}"})
            except (json.JSONDecodeError, TypeError) as e:
                result = {"error": f"Bad arguments: {e}"}   # tell the model, so it can try again
            if verbose:
                print(f"  step {step}: {call.function.name}({args}) -> {json.dumps(result, ensure_ascii=False)[:120]}")
            messages.append({"role": "tool", "tool_call_id": call.id, "content": json.dumps(result)})
    return "I stopped because I reached my step limit. Try asking a simpler question."


def main(argv: list[str]) -> int:
    client = OpenAI(base_url=BASE_URL, api_key=API_KEY)
    questions = [" ".join(argv)] if argv else []
    if not questions:
        print("Ask about your spending (empty line to quit).")
    while True:
        q = questions.pop() if questions else input("\nQuestion: ").strip()
        if not q:
            return 0
        try:
            print("\n" + run_agent(client, q))
        except Exception as e:
            print(f"[error] {e}")
        if argv:
            return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
