"""Starter project S1 - your first chatbot.

A command-line chatbot that remembers the conversation, streams its replies
word by word, and shows how many tokens each message used.

Run:  python chat.py
"""
import os
import sys

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()  # reads settings from a .env file next to this script, if there is one

# Any OpenAI-compatible provider works. The defaults use Ollama on your own computer (free).
BASE_URL = os.getenv("LLM_BASE_URL", "http://localhost:11434/v1")
API_KEY = os.getenv("LLM_API_KEY", "ollama")   # Ollama ignores the key, but the library needs one
MODEL = os.getenv("LLM_MODEL", "llama3.2")

SYSTEM_PROMPT = (
    "You are a friendly study buddy for someone learning about AI. "
    "Explain things simply, use short paragraphs, and give an everyday example when it helps. "
    "If you are not sure about something, say so."
)

MAX_TURNS_KEPT = 10  # how many recent user/assistant pairs to send back to the model


def estimate_tokens(text: str) -> int:
    """Rough fallback when the provider doesn't report usage: about 4 characters per token."""
    return max(1, len(text) // 4)


def trim_history(messages: list[dict], max_turns: int = MAX_TURNS_KEPT) -> list[dict]:
    """Keep the system prompt plus the most recent turns, so long chats don't grow forever."""
    system, rest = messages[:1], messages[1:]
    return system + rest[-max_turns * 2:]


def ask(client, messages: list[dict]) -> tuple[str, int, int]:
    """Send the conversation, print the reply as it streams in, and return (reply, tokens_in, tokens_out)."""
    stream = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        stream=True,
        stream_options={"include_usage": True},   # ask for token counts at the end of the stream
        temperature=0.7,
        max_tokens=600,
    )
    parts, usage = [], None
    for chunk in stream:
        if chunk.choices and chunk.choices[0].delta.content:
            piece = chunk.choices[0].delta.content
            print(piece, end="", flush=True)
            parts.append(piece)
        if getattr(chunk, "usage", None):
            usage = chunk.usage
    print()
    reply = "".join(parts)
    if usage:
        return reply, usage.prompt_tokens, usage.completion_tokens
    return reply, sum(estimate_tokens(m["content"]) for m in messages), estimate_tokens(reply)


def main() -> None:
    client = OpenAI(base_url=BASE_URL, api_key=API_KEY)
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    total = 0
    print(f"Chatting with {MODEL}. Type /reset to start over, /quit to leave.\n")
    while True:
        try:
            user = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print()
            break
        if not user:
            continue
        if user == "/quit":
            break
        if user == "/reset":
            messages = messages[:1]
            print("(conversation cleared)\n")
            continue

        messages.append({"role": "user", "content": user})
        messages = trim_history(messages)
        print("Bot: ", end="", flush=True)
        try:
            reply, tokens_in, tokens_out = ask(client, messages)
        except Exception as e:  # network down, wrong model name, Ollama not running...
            print(f"\n[error] {e}\nCheck the 'Stuck?' section of the project page.\n")
            messages.pop()      # forget the question that failed
            continue
        messages.append({"role": "assistant", "content": reply})
        total += tokens_in + tokens_out
        print(f"[tokens: {tokens_in} in + {tokens_out} out = {tokens_in + tokens_out} · session total {total}]\n")


if __name__ == "__main__":
    sys.exit(main())
