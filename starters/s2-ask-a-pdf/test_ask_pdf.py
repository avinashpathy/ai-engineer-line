"""Tests that run without any model or download: python -m pytest -q"""
import re
from types import SimpleNamespace

import numpy as np

import ask_pdf

WORDS = ["casual", "sick", "medical", "earned", "cash", "home", "internet", "part-time", "year", "carry"]


def fake_embed(texts):
    """A toy 'embedding': counts of a few keywords, normalised. Good enough to test the plumbing."""
    v = np.array([[len(re.findall(w, t.lower())) for w in WORDS] for t in texts], dtype=float) + 1e-6
    return v / np.linalg.norm(v, axis=1, keepdims=True)


def setup():
    chunks = ask_pdf.chunk_pages(ask_pdf.load_pages("sample_leave_policy.txt"))
    return chunks, fake_embed([c["text"] for c in chunks])


def test_load_and_chunk_keep_page_numbers():
    pages = ask_pdf.load_pages("sample_leave_policy.txt")
    assert [p for p, _ in pages] == [1, 2, 3, 4, 5]
    chunks, _ = setup()
    assert chunks and all(len(c["text"]) <= ask_pdf.CHUNK_CHARS for c in chunks)
    assert {c["page"] for c in chunks} == {1, 2, 3, 4, 5}


def test_long_text_is_split_with_overlap():
    chunks = ask_pdf.chunk_pages([(7, "This is a sentence. " * 200)])
    assert len(chunks) > 3 and all(c["page"] == 7 for c in chunks)


def test_search_finds_the_right_page():
    chunks, vecs = setup()
    top = ask_pdf.search("Is my internet bill paid when I work from home?", chunks, vecs, fake_embed)
    assert top[0][1]["page"] == 5


def test_answer_refuses_when_nothing_matches():
    chunks, vecs = setup()
    reply, _ = ask_pdf.answer(None, "zzz qqq", chunks, vecs, lambda t: np.zeros((1, len(WORDS))))
    assert reply == ask_pdf.NOT_FOUND


def test_answer_calls_model_with_numbered_sources():
    chunks, vecs = setup()
    seen = {}
    def create(**kw):
        seen.update(kw)
        return SimpleNamespace(choices=[SimpleNamespace(message=SimpleNamespace(content="12 days [1]"))])
    client = SimpleNamespace(chat=SimpleNamespace(completions=SimpleNamespace(create=create)))
    reply, hits = ask_pdf.answer(client, "How many casual leave days?", chunks, vecs, fake_embed)
    assert reply == "12 days [1]" and hits[0][1]["page"] == 2
    assert "[1] (page 2)" in seen["messages"][1]["content"] and seen["temperature"] == 0


def test_hit_rate_on_sample_questions():
    import json
    chunks, vecs = setup()
    qs = json.load(open("questions.json"))
    assert ask_pdf.hit_rate(qs, chunks, vecs, fake_embed) >= 0.8
