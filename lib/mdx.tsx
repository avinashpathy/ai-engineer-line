import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";
import { visitParents } from "unist-util-visit-parents";
import { GLOSSARY, TERM_ALIASES } from "@/lib/glossary";
import { mdxComponents } from "@/components/mdx";

// ```mermaid fences become <Mermaid chart="..."/> so authors can write plain Markdown.
function remarkMermaid() {
  return (tree: any) => {
    visit(tree, "code", (node: any, index: number | undefined, parent: any) => {
      if (node.lang !== "mermaid" || !parent || index === undefined) return;
      const caption = /caption="([^"]*)"/.exec(node.meta || "")?.[1];
      const attrs = [{ type: "mdxJsxAttribute", name: "chart", value: node.value }];
      if (caption) attrs.push({ type: "mdxJsxAttribute", name: "caption", value: caption });
      parent.children[index] = { type: "mdxJsxFlowElement", name: "Mermaid", attributes: attrs, children: [] };
    });
  };
}

// The first time a glossary term appears in a lesson's text, wrap it in <Term d="definition">,
// which shows the plain-language definition on hover or keyboard focus.
type Entry = { key: string; alias: string; def: string; exact: boolean };
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const ENTRIES: Entry[] = GLOSSARY.flatMap(([term, def]) =>
  (TERM_ALIASES[term] ?? [term]).map(alias => ({ key: term, alias, def, exact: /[A-Z]/.test(alias.slice(1)) || /^[A-Z]{2}/.test(alias) }))
).sort((a, b) => b.alias.length - a.alias.length);
const BY_ALIAS = new Map(ENTRIES.map(e => [e.alias.toLowerCase(), e]));
const TERM_RE = new RegExp(`(?<![\\w-])(${ENTRIES.map(e => esc(e.alias)).join("|")})(?:s|es)?(?![\\w-])`, "gi");
const SKIP_PARENTS = new Set(["heading", "link", "linkReference", "tableCell", "code", "inlineCode"]);
const SKIP_JSX = new Set(["Term", "Mermaid", "Level"]);

function remarkGlossary() {
  return (tree: any) => {
    const used = new Set<string>();
    visitParents(tree, "text", (node: any, ancestors: any[]) => {
      if (ancestors.some(a => SKIP_PARENTS.has(a.type) || (String(a.type).startsWith("mdxJsx") && SKIP_JSX.has(a.name)))) return;
      const parent = ancestors[ancestors.length - 1];
      const text: string = node.value;
      const out: any[] = [];
      let last = 0, m: RegExpExecArray | null;
      TERM_RE.lastIndex = 0;
      while ((m = TERM_RE.exec(text))) {
        const e = BY_ALIAS.get(m[1].toLowerCase());
        if (!e || used.has(e.key) || (e.exact && m[1] !== e.alias)) continue;
        used.add(e.key);
        if (m.index > last) out.push({ type: "text", value: text.slice(last, m.index) });
        out.push({ type: "mdxJsxTextElement", name: "Term", attributes: [{ type: "mdxJsxAttribute", name: "d", value: e.def }], children: [{ type: "text", value: m[0] }] });
        last = m.index + m[0].length;
      }
      if (!out.length) return;
      if (last < text.length) out.push({ type: "text", value: text.slice(last) });
      const i = parent.children.indexOf(node);
      parent.children.splice(i, 1, ...out);
      return i + out.length;
    });
  };
}

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      // Defaults kept on purpose: blockJS + blockDangerousJS reject JS expressions in content,
      // so lesson files can only use components with plain string props.
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMermaid, remarkGlossary],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-light", keepBackground: false, defaultLang: "plaintext" }]],
      },
    },
  });
  return content;
}
