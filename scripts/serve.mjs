// Local preview of the static build with the production security headers applied.
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const root = path.resolve("out"); const H = JSON.parse(fs.readFileSync("security-headers.json"));
delete H["Strict-Transport-Security"]; H["Content-Security-Policy"] = H["Content-Security-Policy"].replace("; upgrade-insecure-requests", "");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".woff2": "font/woff2", ".woff": "font/woff", ".svg": "image/svg+xml", ".txt": "text/plain", ".ico": "image/x-icon" };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let f = path.join(root, p); if (!f.startsWith(root)) { res.writeHead(400); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { f = path.join(root, "404.html"); res.statusCode = 404; }
  res.setHeader("Content-Type", types[path.extname(f)] || "application/octet-stream");
  for (const [k, v] of Object.entries(H)) res.setHeader(k, v);
  fs.createReadStream(f).pipe(res);
}).listen(process.env.PORT || 4321, () => console.log("preview on http://localhost:" + (process.env.PORT || 4321)));
