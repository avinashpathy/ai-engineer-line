"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { useProgress } from "./ProgressProvider";

interface Entry { href: string; title: string; tag: string; line: string; text: string }

const NAV = [
  { href: "/learn/", label: "Learn" },
  { href: "/roadmap/", label: "Roadmap" },
  { href: "/projects/", label: "Projects" },
  { href: "/glossary/", label: "Glossary" },
];

export function Header() {
  const path = usePathname() || "/";
  const [menu, setMenu] = useState(false);
  const [pal, setPal] = useState(false);
  const { user, authEnabled } = useProgress();
  useEffect(() => setMenu(false), [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea|select/i.test((e.target as HTMLElement)?.tagName || "");
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPal(p => !p); }
      else if (e.key === "/" && !typing) { e.preventDefault(); setPal(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const initial = (user?.email || "?").slice(0, 1).toUpperCase();
  return (
    <header className="top">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="AI Engineer Line, home"><Logo /><b>AI Engineer <span>Line</span></b></Link>
        <button className="menu-btn mono" type="button" aria-expanded={menu} aria-controls="main-nav" onClick={() => setMenu(m => !m)}>Menu</button>
        <nav className={`main${menu ? " open" : ""}`} id="main-nav" aria-label="Main">
          {NAV.map(n => <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}>{n.label}</Link>)}
          <button className="kbtn" type="button" aria-haspopup="dialog" onClick={() => setPal(true)}>Search <kbd>Ctrl K</kbd></button>
          {authEnabled && (user
            ? <Link className="acct" href="/account/" title={`Signed in as ${user.email}`} aria-label="Your account">{initial}</Link>
            : <Link className="acct out" href="/account/">Sign in</Link>)}
        </nav>
      </div>
      {pal && <Palette onClose={() => setPal(false)} />}
    </header>
  );
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    opener.current = document.activeElement; input.current?.focus();
    document.body.style.overflow = "hidden";
    fetch("/search-index.json").then(r => r.json()).then(setIndex).catch(() => setFailed(true));
    return () => { document.body.style.overflow = ""; (opener.current as HTMLElement | null)?.focus?.(); };
  }, []);

  const v = q.trim().toLowerCase();
  const hits = !index ? [] : v.length < 2
    ? index.filter(e => e.tag.startsWith("Station")).slice(0, 8)
    : index.map(e => ({ e, s: (e.title.toLowerCase().includes(v) ? 10 : 0) + (e.text.includes(v) ? 1 : 0) }))
        .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 12).map(x => x.e);

  const go = useCallback((href: string) => { onClose(); router.push(href); }, [onClose, router]);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(s + 1, hits.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && hits[sel]) { e.preventDefault(); go(hits[sel].href); }
  };

  return (
    <div className="pal" role="dialog" aria-modal="true" aria-label="Search" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="pal-box" onKeyDown={onKey}>
        <label htmlFor="palq"><span className="mono">Find</span>
          <input id="palq" ref={input} value={q} onChange={e => { setQ(e.target.value); setSel(0); }} placeholder="Search lessons, projects and terms…" autoComplete="off" maxLength={80} />
        </label>
        <div className="pal-list" role="listbox" aria-label="Results">
          {failed && <div className="pal-empty">Search couldn&apos;t load. Check your connection and try again.</div>}
          {!failed && !index && <div className="pal-empty">Loading…</div>}
          {index && v.length < 2 && <div className="pal-empty mono">Type to search · popular stations</div>}
          {index && v.length >= 2 && !hits.length && <div className="pal-empty">Nothing matches &ldquo;{q}&rdquo;. Try a shorter word, like &ldquo;rag&rdquo; or &ldquo;lora&rdquo;.</div>}
          {hits.map((h, i) => (
            <a key={h.href + i} href={h.href} role="option" aria-selected={i === sel} onMouseEnter={() => setSel(i)} onClick={e => { e.preventDefault(); go(h.href); }}>
              <span className="badge sm" data-line={h.line || undefined} style={h.line ? undefined : { background: "var(--ink)" }}>{h.line ? h.line.toUpperCase() : "★"}</span>
              <span><span className="mono">{h.tag}</span>{h.title}</span>
            </a>
          ))}
        </div>
        <div className="pal-hint mono"><span>↑↓ move</span><span>Enter open</span><span>Esc close</span></div>
      </div>
    </div>
  );
}
