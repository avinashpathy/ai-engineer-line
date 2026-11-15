import type { Metadata } from "next";
import { GLOSSARY } from "@/lib/glossary";
import { GlossaryFilter } from "@/components/GlossaryFilter";

export const metadata: Metadata = { title: "Glossary", description: "Plain-language definitions of the AI engineering terms used across the curriculum." };

export default function Glossary() {
  const sorted = [...GLOSSARY].sort((a, b) => a[0].localeCompare(b[0], "en", { sensitivity: "base" }));
  return (
    <div className="wrap">
      <div className="phead"><span className="mono">{GLOSSARY.length} terms</span><h1>Glossary</h1><p>Every term you&apos;ll meet on the line, defined in plain language.</p></div>
      <GlossaryFilter terms={sorted} />
    </div>
  );
}
