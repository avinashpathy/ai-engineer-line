import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";
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

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      // Defaults kept on purpose: blockJS + blockDangerousJS reject JS expressions in content,
      // so lesson files can only use components with plain string props.
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMermaid],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-light", keepBackground: false, defaultLang: "plaintext" }]],
      },
    },
  });
  return content;
}
