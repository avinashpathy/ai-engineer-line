import type { Metadata } from "next";
import { AuthCallback } from "@/components/AuthCallback";
export const metadata: Metadata = { title: "Signing in", robots: { index: false } };
export default function Page() { return <div className="wrap"><AuthCallback /></div>; }
