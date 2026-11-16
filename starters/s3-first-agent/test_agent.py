"""Tests that run without any model: python -m pytest -q"""
import json
from types import SimpleNamespace

import agent


def test_tool_filters_by_category_and_month():
    r = agent.query_expenses(category="food", month="2026-10")
    assert r["count"] == 3 and r["total_rupees"] == 2100 + 350 + 1640


def test_tool_rejects_bad_input_helpfully():
    assert "Unknown category" in agent.query_expenses(category="rent")["error"]
    assert "YYYY-MM" in agent.query_expenses(month="October")["error"]


def scripted_client(replies):
    it = iter(replies)
    return SimpleNamespace(chat=SimpleNamespace(completions=SimpleNamespace(
        create=lambda **kw: SimpleNamespace(choices=[SimpleNamespace(message=next(it))]))))


def tool_call(args):
    fn = SimpleNamespace(name="query_expenses", arguments=json.dumps(args))
    return SimpleNamespace(id="call_1", type="function", function=fn,
                           model_dump=lambda: {"id": "call_1", "type": "function",
                                               "function": {"name": "query_expenses", "arguments": json.dumps(args)}})


def test_agent_calls_tool_then_answers():
    client = scripted_client([
        SimpleNamespace(content=None, tool_calls=[tool_call({"category": "food", "month": "2026-10"})]),
        SimpleNamespace(content="You spent ₹4,090 on food in October 2026.", tool_calls=None),
    ])
    assert agent.run_agent(client, "food in October?", verbose=False).startswith("You spent ₹4,090")


def test_agent_stops_at_step_limit():
    looping = [SimpleNamespace(content=None, tool_calls=[tool_call({})]) for _ in range(agent.MAX_STEPS)]
    assert "step limit" in agent.run_agent(scripted_client(looping), "loop forever", verbose=False)
