import type { Metadata } from "next";
import { AccountPanel } from "@/components/AccountPanel";

export const metadata: Metadata = { title: "Your account", description: "Sign in to save your progress across devices.", robots: { index: false } };

export default function Account() {
  return (
    <div className="wrap">
      <div className="phead"><h1>Your account</h1><p>Every lesson is free to read without an account. Sign in only if you want your progress saved across devices.</p></div>
      <AccountPanel />
    </div>
  );
}
