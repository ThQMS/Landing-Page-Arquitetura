// Gera versão 100% embutida (sem CDN): React, fontes e fotos inline.
// Uso: node build-standalone.js
const fs = require("fs");
const path = require("path");

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

async function getText(url, headers = {}) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`GET ${url} -> ${r.status}`);
  return await r.text();
}
async function getDataURI(url, mime) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`GET ${url} -> ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const ct = mime || r.headers.get("content-type") || "application/octet-stream";
  return `data:${ct};base64,${buf.toString("base64")}`;
}

// Inlina as woff2 do Google Fonts dentro do CSS (@font-face) como data URI
async function inlineFonts(cssUrl) {
  let css = await getText(cssUrl, { "User-Agent": UA });
  const urls = [...css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)].map((m) => m[1]);
  const uniq = [...new Set(urls)];
  console.log(`  ${uniq.length} arquivos de fonte...`);
  for (const u of uniq) {
    const dataUri = await getDataURI(u, "font/woff2");
    css = css.split(u).join(dataUri);
  }
  return css;
}

(async () => {
  const dir = __dirname;
  let html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
  let app = fs.readFileSync(path.join(dir, "app.js"), "utf8");

  console.log("Baixando React...");
  const react = await getText("https://unpkg.com/react@18.3.1/umd/react.production.min.js");
  const reactDom = await getText("https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js");

  console.log("Baixando fotos e embutindo...");
  const imgUrls = [...new Set([...app.matchAll(/https:\/\/substackcdn\.com\/[^"']+/g)].map((m) => m[0]))];
  for (const u of imgUrls) {
    console.log("  " + u.slice(0, 70) + "...");
    const dataUri = await getDataURI(u, "image/jpeg");
    app = app.split(u).join(dataUri);
  }

  console.log("Baixando e embutindo fontes...");
  const fontLinkMatch = html.match(/<link href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)" rel="stylesheet" \/>/);
  const fontCss = await inlineFonts(fontLinkMatch[1]);

  // Remove preconnects + o <link> das fontes; injeta o CSS das fontes inline
  html = html.replace(/<link rel="preconnect"[^>]*\/>\s*/g, "");
  html = html.replace(fontLinkMatch[0], `<style>\n${fontCss}\n</style>`);

  // Substitui os <script src> (React, ReactDOM, app.js) por scripts inline
  html = html.replace(
    /<script src="https:\/\/unpkg\.com\/react@[^"]+"[^>]*><\/script>/,
    `<script>${react}</script>`
  );
  html = html.replace(
    /<script src="https:\/\/unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/,
    `<script>${reactDom}</script>`
  );
  html = html.replace(/<!-- App React[^>]*-->\s*/g, "");
  html = html.replace(/<script src="app\.js[^"]*"><\/script>/, `<script>${app}</script>`);

  fs.writeFileSync(path.join(dir, "standalone.html"), html, "utf8");
  const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
  console.log(`\nOK -> standalone.html (${kb} KB) — arquivo único, abre offline.`);
})().catch((e) => { console.error(e); process.exit(1); });
