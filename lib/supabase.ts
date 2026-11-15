"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// The anon key is designed to be public: every table is protected by Row Level Security
// (see supabase/migrations). Never put the service_role key in this app.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;
export const authEnabled = Boolean(url && anon);

export function supabase(): SupabaseClient | null {
  if (!authEnabled) return null;
  if (!client) {
    client = createClient(url!, anon!, {
      auth: { flowType: "pkce", persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return client;
}
