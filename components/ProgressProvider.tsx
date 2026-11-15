"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { authEnabled, supabase } from "@/lib/supabase";

const LOCAL_KEY = "aie-progress-v1";
const KEY_RE = /^[a-z0-9-]{1,48}\/[a-z0-9-]{1,48}$/;

interface Ctx {
  done: Set<string>;
  toggle: (key: string) => Promise<void>;
  user: User | null;
  ready: boolean;
  authEnabled: boolean;
  syncError: string | null;
  signOut: () => Promise<void>;
}
const ProgressCtx = createContext<Ctx | null>(null);

function readLocal(): string[] {
  try { const v = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]"); return Array.isArray(v) ? v.filter(k => typeof k === "string" && KEY_RE.test(k)) : []; }
  catch { return []; }
}
function writeLocal(keys: Set<string>) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify([...keys])); } catch { /* storage unavailable */ } }

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const merged = useRef<string | null>(null);

  // Load local progress first so the page is useful without an account.
  useEffect(() => { setDone(new Set(readLocal())); if (!authEnabled) setReady(true); }, []);

  // Track the signed-in user.
  useEffect(() => {
    const sb = supabase(); if (!sb) return;
    sb.auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); setReady(true); });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  // On sign-in: upload local progress once, then load the account's progress.
  useEffect(() => {
    const sb = supabase(); if (!sb || !user || merged.current === user.id) return;
    merged.current = user.id;
    (async () => {
      const local = readLocal();
      if (local.length) {
        const { error } = await sb.from("lesson_progress").upsert(local.map(k => ({ user_id: user.id, lesson_key: k })), { onConflict: "user_id,lesson_key", ignoreDuplicates: true });
        if (error) setSyncError("Couldn't upload progress from this device. It's still saved here.");
      }
      const { data, error } = await sb.from("lesson_progress").select("lesson_key").limit(1000);
      if (error) { setSyncError("Couldn't load your saved progress. Check your connection and refresh."); return; }
      const all = new Set([...local, ...data.map(r => r.lesson_key as string)]);
      setDone(all); writeLocal(all); setSyncError(null);
    })();
  }, [user]);

  const toggle = useCallback(async (key: string) => {
    if (!KEY_RE.test(key)) return;
    const nowDone = !done.has(key);
    const next = new Set(done); if (nowDone) next.add(key); else next.delete(key);
    setDone(next); writeLocal(next);
    const sb = supabase();
    if (sb && user) {
      const { error } = nowDone
        ? await sb.from("lesson_progress").upsert({ user_id: user.id, lesson_key: key }, { onConflict: "user_id,lesson_key", ignoreDuplicates: true })
        : await sb.from("lesson_progress").delete().eq("lesson_key", key);
      setSyncError(error ? "Saved on this device, but couldn't sync to your account. It will sync next time you sign in." : null);
    }
  }, [user, done]);

  const signOut = useCallback(async () => {
    const sb = supabase(); if (!sb) return;
    await sb.auth.signOut();
    merged.current = null;
  }, []);

  const value = useMemo(() => ({ done, toggle, user, ready, authEnabled, syncError, signOut }), [done, toggle, user, ready, syncError, signOut]);
  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>;
}

export function useProgress() {
  const c = useContext(ProgressCtx);
  if (!c) throw new Error("useProgress must be inside ProgressProvider");
  return c;
}
