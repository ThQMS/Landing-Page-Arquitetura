// Gera versão 100% embutida (arquivo único, abre offline): React, fontes e fotos inline.
// Usa os arquivos JÁ auto-hospedados no repo (vendor/ e fonts/), sem baixar do CDN.
// Uso: node build-standalone.js
const fs = require("fs");
const path = require("path");

function readText(p) { return fs.readFileSync(p, "utf8"); }
function fileToDataURI(p, mime) {
  const buf = fs.readFileSync(p);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

async function getDataURI(url, mime) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!r.ok) throw new Error(`GET ${url} -> ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const ct = mime || r.headers.get("content-type") || "application/octet-stream";
  return `data:${ct};base64,${buf.toString("base64")}`;
}

(async () => {
  const dir = __dirname;
  let html = readText(path.join(dir, "index.html"));
  let app = readText(path.join(dir, "app.js"));

  console.log("Embutindo fontes locais...");
  // Lê fonts.css e troca cada url(fonts/x.woff2) por um data URI do arquivo local.
  let fontCss = readText(path.join(dir, "fonts.css"));
  fontCss = fontCss.replace(/url\((fonts\/[^)]+\.woff2)\)/g, (_, rel) => {
    const uri = fileToDataURI(path.join(dir, rel), "font/woff2");
    return `url(${uri})`;
  });
  // Remove os <link rel="preload"> de fonte e injeta o CSS das fontes inline no lugar do <link fonts.css>
  html = html.replace(/<link rel="preload"[^>]*as="font"[^>]*\/>\s*/g, "");
  html = html.replace(/<link href="fonts\.css" rel="stylesheet" \/>/, `<style>\n${fontCss}\n</style>`);

  console.log("Embutindo fotos...");
  const imgUrls = [...new Set([...app.matchAll(/https:\/\/substackcdn\.com\/[^"']+/g)].map((m) => m[0]))];
  for (const u of imgUrls) {
    console.log("  " + u.slice(0, 70) + "...");
    const dataUri = await getDataURI(u, "image/jpeg");
    app = app.split(u).join(dataUri);
  }

  console.log("Embutindo React local + app...");
  const react = readText(path.join(dir, "vendor", "react.production.min.js"));
  const reactDom = readText(path.join(dir, "vendor", "react-dom.production.min.js"));
  html = html.replace(/<script src="vendor\/react\.production\.min\.js"><\/script>/, `<script>${react}</script>`);
  html = html.replace(/<script src="vendor\/react-dom\.production\.min\.js"><\/script>/, `<script>${reactDom}</script>`);
  html = html.replace(/<!-- App React[^>]*-->\s*/g, "");
  html = html.replace(/<script src="app\.js[^"]*"><\/script>/, `<script>${app}</script>`);

  fs.writeFileSync(path.join(dir, "standalone.html"), html, "utf8");
  const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
  console.log(`\nOK -> standalone.html (${kb} KB) — arquivo único, abre offline.`);
})().catch((e) => { console.error(e); process.exit(1); });
