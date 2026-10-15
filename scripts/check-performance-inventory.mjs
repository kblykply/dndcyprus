import fs from 'node:fs';
import path from 'node:path';

// Public GET requests and public-file existence checks only; never reads leads
// or submits forms. Keep a complete route/asset inventory alongside lab scores.
const origin = process.env.DND_PERF_ORIGIN || 'http://127.0.0.1:3100';
const output = process.env.DND_PERF_REPORT || 'docs/performance-final-inventory.json';
const xmlResponse = await fetch(origin + '/sitemap.xml');
if (!xmlResponse.ok) throw new Error('Sitemap HTTP ' + xmlResponse.status);
const xml = await xmlResponse.text();
const routes = [...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname).concat('/tr/qr'))];
const report = { measuredAt: new Date().toISOString(), buildId: fs.readFileSync('.next/BUILD_ID', 'utf8').trim(), origin, routes: [], assets: [], links: [], removedRoutes: [], redirects: [], errors: [], warnings: [] };
const assets = new Map(), links = new Set();
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
const attr = (tag, name) => tag.match(new RegExp('(?:^|\\s)' + name + '="([^"]*)"'))?.[1];
const publicRoot = path.resolve('public');
for (const route of routes) {
  const response = await fetch(origin + route);
  const html = await response.text();
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map(m => m[0]);
  const canonical = tags.find(t => attr(t, 'rel') === 'canonical');
  const row = { route, status: response.status, language: html.match(/<html[^>]*lang="([^"]+)"/)?.[1], title: html.match(/<title>(.*?)<\/title>/)?.[1], description: tags.find(t => attr(t, 'name') === 'description') ? true : false, canonical: canonical && attr(canonical, 'href'), cacheControl: response.headers.get('cache-control'), htmlBytes: Buffer.byteLength(html), organization: false };
  if (response.status !== 200) report.errors.push({ route, issue: 'HTTP ' + response.status });
  if (row.language !== (route.startsWith('/en') ? 'en' : 'tr')) report.errors.push({ route, issue: 'HTML language' });
  if (!row.title || !row.description || !row.canonical) report.errors.push({ route, issue: 'Missing title, description or canonical' });
  if (row.canonical && new URL(row.canonical, origin).pathname !== route) report.errors.push({ route, issue: 'Incorrect canonical', canonical: row.canonical });
  if (/href="[^\"]*dndturkiye/.test(html)) report.errors.push({ route, issue: 'Removed office link still present' });
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    try {
      const data = JSON.parse(match[1]);
      if (data['@type'] === 'Organization') {
        row.organization = true;
        if (data.name !== 'DND Cyprus' || data.legalName !== 'CY-DND HOMES LTD.' || data.address?.streetAddress !== 'Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya') report.errors.push({ route, issue: 'Organization name/address mismatch' });
      }
    } catch (error) { report.errors.push({ route, issue: 'Invalid JSON-LD', message: String(error) }); }
  }
  for (const match of html.matchAll(/<(?:img|video|source)\b[^>]*>/g)) {
    const src = attr(match[0], 'src') || attr(match[0], 'poster');
    if (!src || /^(data:|blob:|https?:\/\/)/.test(src)) continue;
    const url = new URL(decode(src), origin);
    const original = url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname;
    if (!original || !original.startsWith('/') || original.startsWith('/_next/')) continue;
    const file = path.resolve(publicRoot, '.' + decodeURIComponent(original.split('?')[0]));
    if (!file.startsWith(publicRoot + path.sep)) continue;
    assets.set(original, { src: original, exists: fs.existsSync(file), route });
  }
  for (const match of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attr(match[0], 'href');
    if (!href || /^(#|tel:|mailto:|https?:|\/\/|data:|javascript:)/i.test(href)) continue;
    const target = new URL(decode(href), origin + route).pathname;
    if (/^\/(tr|en)(\/|$)/.test(target) && !/\.[a-z0-9]+$/i.test(target)) links.add(target);
  }
  report.routes.push(row);
}
report.assets = [...assets.values()];
for (const asset of report.assets.filter(a => !a.exists)) report.errors.push({ route: asset.route, issue: 'Missing local asset', src: asset.src });
for (const target of links) {
  const existing = report.routes.find(r => r.route === target);
  const status = existing?.status ?? (await fetch(origin + target)).status;
  report.links.push({ target, status });
  if (status !== 200) report.errors.push({ issue: 'Broken internal link', target, status });
}
for (const route of ['/dndturkiye', '/tr/dndturkiye', '/en/dndturkiye']) {
  const response = await fetch(origin + route, { redirect: 'manual' });
  report.removedRoutes.push({ route, status: response.status });
  if (response.status !== 404) report.errors.push({ route, issue: 'Removed office route must return 404', status: response.status });
}
for (const route of ['/contact', '/about', '/projects', '/perla-ii', '/la-joya']) {
  const response = await fetch(origin + route, { redirect: 'manual' });
  const destination = response.headers.get('location');
  report.redirects.push({ route, status: response.status, destination });
  if (response.status !== 308 || new URL(destination, origin).pathname !== '/tr' + route) report.errors.push({ route, issue: 'Legacy redirect mismatch' });
}
report.status = report.errors.length ? 'failed' : 'passed';
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ status: report.status, routes: report.routes.length, localAssets: report.assets.length, internalLinks: report.links.length, errors: report.errors }, null, 2));
if (report.status === 'failed') process.exitCode = 1;
