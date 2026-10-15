import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

// Run against a production server: node scripts/measure-performance.mjs
// This reads public HTML/assets only; it never submits forms or reads admin data.
const argument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index < 0 ? fallback : process.argv[index + 1];
};
const origin = argument("--origin", "http://127.0.0.1:3100");
const output = argument("--output", "docs/performance-transfer.json");
const routes = ["/tr", "/en", "/tr/perla-ii", "/en/perla-ii", "/tr/contact", "/en/contact", "/tr/qr"];
const scriptSizes = new Map();
const stylesheetSizes = new Map();
const results = {};
for (const path of routes) {
  const response = await fetch(new URL(path, origin));
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  const html = await response.text();
  const expectedLanguage = path.startsWith("/en") ? "en" : "tr";
  if (!html.includes(`<html lang="${expectedLanguage}"`)) throw new Error(`${path}: wrong HTML language`);
  const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => match[1]))];
  const stylesheets = [...new Set([...html.matchAll(/<link\b[^>]*>/g)]
    .map(match => match[0])
    .filter(tag => /rel="stylesheet"/.test(tag))
    .map(tag => tag.match(/href="([^"]+)"/)?.[1])
    .filter(Boolean))];
  let scriptBytes = 0;
  for (const src of scripts) {
    const url = new URL(src, origin);
    if (url.origin !== new URL(origin).origin) continue;
    if (!scriptSizes.has(url.href)) {
      const asset = await fetch(url);
      if (!asset.ok) throw new Error(`${url.pathname}: HTTP ${asset.status}`);
      scriptSizes.set(url.href, (await asset.arrayBuffer()).byteLength);
    }
    scriptBytes += scriptSizes.get(url.href);
  }
  let stylesheetBytes = 0;
  for (const href of stylesheets) {
    const url = new URL(href, origin);
    if (url.origin !== new URL(origin).origin) continue;
    if (!stylesheetSizes.has(url.href)) {
      const asset = await fetch(url);
      if (!asset.ok) throw new Error(`${url.pathname}: HTTP ${asset.status}`);
      stylesheetSizes.set(url.href, (await asset.arrayBuffer()).byteLength);
    }
    stylesheetBytes += stylesheetSizes.get(url.href);
  }
  results[path] = {
    status: response.status,
    cache: response.headers.get("cache-control"),
    htmlBytes: Buffer.byteLength(html),
    scriptCount: scripts.length,
    scriptBytes,
    stylesheetCount: stylesheets.length,
    stylesheetBytes,
  };
}
await mkdir(dirname(output), { recursive: true });
await writeFile(output, JSON.stringify({ measuredAt: new Date().toISOString(), origin, units: "uncompressed bytes; initial HTML script and stylesheet dependencies only", routes: results }, null, 2) + "\n");
console.log(JSON.stringify(results, null, 2));
