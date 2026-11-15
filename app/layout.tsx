import type { Metadata, Viewport } from "next";
import "@fontsource/big-shoulders-display/800";
import "@fontsource/big-shoulders-display/900";
import "@fontsource/atkinson-hyperlegible/400";
import "@fontsource/atkinson-hyperlegible/700";
import "@fontsource/atkinson-hyperlegible/400-italic";
import "@fontsource/dm-mono/400";
import "@fontsource/dm-mono/500";
import "./globals.css";
import { ProgressProvider } from "@/components/ProgressProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "AI Engineer Line — learn AI engineering from zero to production", template: "%s · AI Engineer Line" },
  description: "A free, structured curriculum for becoming an AI Engineer: foundations, LLMs, RAG, agents, production LLMOps, ten production-ready projects and interview prep.",
  openGraph: { type: "website", siteName: "AI Engineer Line" },
  referrer: "strict-origin-when-cross-origin",
};
export const viewport: Viewport = { themeColor: "#0E1A2B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ProgressProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  );
}
