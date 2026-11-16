"""Tests that run without any model: python -m pytest -q"""
from types import SimpleNamespace

import chat


def test_trim_history_keeps_system_prompt_and_recent_turns():
    msgs = [{"role": "system", "content": "sys"}]
    for i in range(30):
        msgs += [{"role": "user", "content": f"q{i}"}, {"role": "assistant", "content": f"a{i}"}]
    trimmed = chat.trim_history(msgs, max_turns=3)
    assert trimmed[0]["content"] == "sys"
    assert [m["content"] for m in trimmed[1:]] == ["q27", "a27", "q28", "a28", "q29", "a29"]


def test_ask_streams_and_reports_usage(capsys):
    chunks = [
        SimpleNamespace(choices=[SimpleNamespace(delta=SimpleNamespace(content="Hel"))], usage=None),
        SimpleNamespace(choices=[SimpleNamespace(delta=SimpleNamespace(content="lo!"))], usage=None),
        SimpleNamespace(choices=[], usage=SimpleNamespace(prompt_tokens=12, completion_tokens=3)),
    ]
    fake = SimpleNamespace(chat=SimpleNamespace(completions=SimpleNamespace(create=lambda **kw: iter(chunks))))
    reply, tin, tout = chat.ask(fake, [{"role": "user", "content": "hi"}])
    assert reply == "Hello!" and (tin, tout) == (12, 3)
    assert "Hello!" in capsys.readouterr().out


def test_ask_estimates_when_usage_missing():
    chunks = [SimpleNamespace(choices=[SimpleNamespace(delta=SimpleNamespace(content="x" * 40))], usage=None)]
    fake = SimpleNamespace(chat=SimpleNamespace(completions=SimpleNamespace(create=lambda **kw: iter(chunks))))
    _, tin, tout = chat.ask(fake, [{"role": "user", "content": "y" * 80}])
    assert (tin, tout) == (20, 10)
