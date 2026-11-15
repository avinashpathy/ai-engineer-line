"use client";
import Link from "next/link";
import { useState } from "react";
import { ALL_LESSONS } from "@/lib/curriculum";
import { supabase } from "@/lib/supabase";
import { useProgress } from "./ProgressProvider";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function callbackUrl() { return `${window.location.origin}/auth/callback/`; }

export function AccountPanel() {
  const { user, ready, authEnabled, done, signOut, syncError } = useProgress();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  if (!authEnabled) return (
    <div className="auth-box panel"><h2>Sign-in is off</h2>
      <p>This copy of the site hasn&apos;t been connected to an account service yet, so progress is saved on this device only. The site owner can turn sign-in on by following <code>DEPLOY.md</code>.</p></div>
  );
  if (!ready) return <div className="auth-box panel"><p>Checking your session…</p></div>;

  if (user) {
    const finished = ALL_LESSONS.filter(l => done.has(l.key)).length;
    return (
      <div className="auth-box panel">
        <h2>Signed in</h2>
        <p>Signed in as <b>{user.email}</b>.</p>
        <p>You&apos;ve completed <b>{finished}</b> of {ALL_LESSONS.length} lessons. Your progress syncs across every device you sign in on.</p>
        {syncError && <p className="msg err" role="status">{syncError}</p>}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <Link className="btn" href="/learn/">Continue learning</Link>
          <button className="btn ghost" type="button" onClick={signOut}>Sign out</button>
        </div>
        <p style={{ marginTop: 18, fontSize: ".9rem", color: "var(--muted)" }}>Want your account and data deleted? See <Link href="/privacy/">Privacy &amp; security</Link>.</p>
      </div>
    );
  }

  const oauth = async (provider: "github" | "google") => {
    setBusy(true); setMsg(null);
    const { error } = await supabase()!.auth.signInWithOAuth({ provider, options: { redirectTo: callbackUrl() } });
    if (error) { setBusy(false); setMsg({ ok: false, text: `Couldn't start ${provider === "github" ? "GitHub" : "Google"} sign-in. Try again, or use email.` }); }
  };
  const magic = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v) || v.length > 254) { setMsg({ ok: false, text: "Enter a valid email address, like name@example.com." }); return; }
    setBusy(true); setMsg(null);
    const { error } = await supabase()!.auth.signInWithOtp({ email: v, options: { emailRedirectTo: callbackUrl(), shouldCreateUser: true } });
    setBusy(false);
    setMsg(error
      ? { ok: false, text: error.status === 429 ? "Too many attempts. Wait a minute and try again." : "Couldn't send the sign-in link. Check the address and try again." }
      : { ok: true, text: `Check ${v} for a sign-in link. It expires in one hour.` });
  };

  return (
    <div className="auth-box panel">
      <h2>Sign in</h2>
      <p style={{ color: "var(--muted)" }}>No passwords to remember or leak. Use GitHub, Google, or a one-time link sent to your email.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
        <button className="btn dark" type="button" disabled={busy} onClick={() => oauth("github")}>Continue with GitHub</button>
        <button className="btn ghost" type="button" disabled={busy} onClick={() => oauth("google")}>Continue with Google</button>
      </div>
      <div className="or mono">or</div>
      <form onSubmit={magic} noValidate>
        <label htmlFor="email">Email address</label>
        <input id="email" className="input" type="email" autoComplete="email" inputMode="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={254} required style={{ maxWidth: "none" }} />
        <button className="btn" type="submit" disabled={busy}>{busy ? "Sending…" : "Email me a sign-in link"}</button>
      </form>
      {msg && <p className={`msg ${msg.ok ? "ok" : "err"}`} role="status">{msg.text}</p>}
      <p style={{ marginTop: 18, fontSize: ".9rem", color: "var(--muted)" }}>We store only your email and which lessons you&apos;ve completed. <Link href="/privacy/">Privacy &amp; security</Link></p>
    </div>
  );
}
