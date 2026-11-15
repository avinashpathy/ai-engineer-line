"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AuthCallback() {
  const router = useRouter();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const sb = supabase(); if (!sb) { setFailed(true); return; }
    const params = new URLSearchParams(window.location.search);
    if (params.get("error")) { setFailed(true); return; }
    // supabase-js exchanges the PKCE code from the URL automatically (detectSessionInUrl).
    const t = setTimeout(() => setFailed(true), 10000);
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      if (session) { clearTimeout(t); router.replace("/account/"); }
    });
    sb.auth.getSession().then(({ data }) => { if (data.session) { clearTimeout(t); router.replace("/account/"); } });
    return () => { clearTimeout(t); sub.subscription.unsubscribe(); };
  }, [router]);
  return (
    <div className="phead">
      <h1>{failed ? "Sign-in didn't finish" : "Signing you in…"}</h1>
      {failed && <p>The link may have expired or already been used. <Link href="/account/">Try signing in again</Link>.</p>}
    </div>
  );
}
