// Writes the same security headers for every host: vercel.json (Vercel) and public/_headers (Netlify, Cloudflare Pages).
import fs from "node:fs";
const h = JSON.parse(fs.readFileSync(new URL("../security-headers.json", import.meta.url)));
const vercel = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  framework: "nextjs",
  cleanUrls: false,
  trailingSlash: true,
  headers: [
    { source: "/(.*)", headers: Object.entries(h).map(([key, value]) => ({ key, value })) },
    { source: "/_next/static/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
  ],
};
fs.writeFileSync(new URL("../vercel.json", import.meta.url), JSON.stringify(vercel, null, 2) + "\n");
fs.writeFileSync(new URL("../public/_headers", import.meta.url), "/*\n" + Object.entries(h).map(([k, v]) => `  ${k}: ${v}`).join("\n") + "\n");
console.log("security headers written");
