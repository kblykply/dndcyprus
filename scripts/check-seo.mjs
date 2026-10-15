import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

// Public local GETs only: no analytics requests, credentials or form submission.
const origin = process.env.DND_SEO_ORIGIN || "http://127.0.0.1:3100";
const output = process.env.DND_SEO_REPORT || "docs/seo-results-2026-10-15.json";
const baselineFile = process.env.DND_SEO_BASELINE;
const baselineMode = process.argv.includes("--baseline");
const site = "https://www.dndcyprus.com";
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (tag, name) => decode(tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`, "i"))?.[1] || "");
const text = (html) => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<!--[^]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
const hash = (value) => createHash("sha256").update(value).digest("hex");
const get = (route, headers) => fetch(new URL(route, origin), { redirect: "manual", headers });
const xmlResponse = await get("/sitemap.xml");
if (!xmlResponse.ok) throw new Error("Sitemap request failed");
const xml = await xmlResponse.text();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => ({
  url: decode(match[1].match(/<loc>(.*?)<\/loc>/)?.[1] || ""),
  languages: Object.fromEntries([...match[1].matchAll(/<xhtml:link\b[^>]*>/g)].map((m) => [attr(m[0], "hreflang"), attr(m[0], "href")])),
  images: [...match[1].matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map((m) => decode(m[1])),
}));
const report = { measuredAt: new Date().toISOString(), origin, buildId: fs.readFileSync(".next/BUILD_ID", "utf8").trim(), baselineMode, pages: [], probes: [], redirects: [], errors: [], warnings: [] };
const error = (route, issue) => report.errors.push({ route, issue });
const rows = new Map();
for (const route of [...entries.map((entry) => new URL(entry.url).pathname), "/tr/qr"]) {
  const response = await get(route);
  const html = await response.text();
  const tags = [...html.matchAll(/<(?:link|meta)\b[^>]*>/g)].map((match) => match[0]);
  const metas = (name, value) => tags.filter((tag) => attr(tag, name) === value);
  const canonical = metas("rel", "canonical").map((tag) => attr(tag, "href"));
  const languages = Object.fromEntries(metas("rel", "alternate").filter((tag) => attr(tag, "hreflang")).map((tag) => [attr(tag, "hreflang"), attr(tag, "href")]));
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => {
    try { const data = JSON.parse(match[1]); return data["@graph"] || [data]; }
    catch { error(route, "Invalid JSON-LD"); return []; }
  });
  const row = {
    route, status: response.status, title: text(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""),
    description: attr(metas("name", "description")[0] || "", "content"), canonical, languages,
    lang: html.match(/<html\b[^>]*lang="([^"]+)"/)?.[1],
    h1: [...html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((match) => text(match[1])),
    bodyTextHash: hash(text(html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/)?.[1] || "")),
    schemas: schemas.map((schema) => schema["@type"]),
    robots: metas("name", "robots").map((tag) => attr(tag, "content")),
  };
  if (row.status !== 200) error(route, `HTTP ${row.status}`);
  if (row.canonical.length !== 1 || row.canonical[0] !== site + route) error(route, "Expected one absolute self canonical");
  if (row.lang !== route.split("/")[1]) error(route, "HTML language mismatch");
  if (!row.title || !row.description) error(route, "Missing title or description");
  if (row.robots.some((value) => /noindex/.test(value))) error(route, "Public page is noindex");
  if (route !== "/tr/qr" && row.h1.length !== 1) report.warnings.push({ route, issue: `H1 count: ${row.h1.length}` });
  const entry = entries.find((entry) => entry.url === site + route);
  if (entry && JSON.stringify(Object.entries(languages).sort()) !== JSON.stringify(Object.entries(entry.languages).sort())) error(route, "HTML and sitemap language alternates disagree");
  if (route.startsWith("/tr/blog") && Object.keys(languages).length) error(route, "TR-only blog must not link an unavailable translation");
  if (route !== "/tr/qr" && !schemas.some((schema) => schema["@type"] === "Organization" && schema.legalName === "CY-DND HOMES LTD.")) error(route, "Missing legal Organization schema");
  for (const tag of metas("property", "og:image")) {
    const image = new URL(attr(tag, "content"), site);
    if (image.origin === site && !fs.existsSync(path.join("public", decodeURIComponent(image.pathname)))) error(route, "Missing social image");
  }
  if (route.startsWith("/tr/blog/")) {
    const article = schemas.find((schema) => ["BlogPosting", "Article", "NewsArticle"].includes(schema["@type"]));
    if (!article) error(route, "Missing Article schema");
    else {
      if (article.headline !== row.h1[0] || article.mainEntityOfPage?.["@id"] !== site + route || article.publisher?.["@id"] !== site + "/#organization") error(route, "Article identity or visible headline mismatch");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(article.datePublished || "")) error(route, "Missing known publication date");
      if (!article.image?.length || article.image.some((image) => !/^https:\/\//.test(image))) error(route, "Article images must be absolute HTTPS URLs");
      if (article.dateModified) error(route, "No verified modification date exists in current source");
    }
    if (!entry?.images.length) error(route, "Blog cover absent from image sitemap");
  }
  rows.set(route, row); report.pages.push(row);
}
for (const row of report.pages) for (const [lang, url] of Object.entries(row.languages)) {
  const target = rows.get(new URL(url).pathname);
  if (!target || target.status !== 200 || (lang !== "x-default" && target.lang !== lang)) error(row.route, "Unavailable or incorrectly labelled language target");
  if (target && JSON.stringify(Object.entries(target.languages).sort()) !== JSON.stringify(Object.entries(row.languages).sort())) error(row.route, "Language alternates are not reciprocal");
}
for (const route of ["/tr/blog/seo-missing-post", "/tr/blog/seo-missing-post?utm_source=test", "/en/blog/seo-missing-post", "/tr/dndturkiye", "/en/dndturkiye"]) {
  const response = await get(route); report.probes.push({ route, status: response.status });
  if (response.status !== 404) error(route, "Missing page must return HTTP 404");
}
for (const [route, canonical] of [["/tr?utm_source=test", "/tr"], ["/en/projects?status=all", "/en/projects"], ["/tr/blog/dnd-usa-quality-in-cyprus-interview-2025?utm_source=test", "/tr/blog/dnd-usa-quality-in-cyprus-interview-2025"]]) {
  const response = await get(route); const html = await response.text();
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]).find((tag) => attr(tag, "rel") === "canonical");
  report.probes.push({ route, status: response.status, canonical: attr(canonicalTag || "", "href") });
  if (response.status !== 200 || attr(canonicalTag || "", "href") !== site + canonical) error(route, "Query URL canonical mismatch");
}
for (const route of ["/contact", "/about", "/projects", "/perla-ii", "/la-joya", "/projects/perla2"]) {
  const response = await get(route); const location = response.headers.get("location");
  report.redirects.push({ route, status: response.status, location });
  const destination = route === "/projects/perla2" ? "/tr/perla-ii" : "/tr" + route;
  if (response.status !== 308 || new URL(location, origin).pathname !== destination) error(route, "Permanent legacy redirect mismatch");
}
const admin = await get("/admin/login");
report.probes.push({ route: "/admin/login", status: admin.status, xRobotsTag: admin.headers.get("x-robots-tag") });
if (!admin.headers.get("x-robots-tag")?.includes("noindex")) error("/admin/login", "Admin response missing noindex header");
const robots = await (await get("/robots.txt")).text();
if (!robots.includes(`Sitemap: ${site}/sitemap.xml`) || !robots.includes("Disallow: /admin")) error("/robots.txt", "Robots sitemap/admin rules missing");
if (baselineFile) {
  const baseline = JSON.parse(fs.readFileSync(baselineFile, "utf8"));
  report.contentComparison = { comparedPages: 0, changed: [] };
  for (const row of report.pages) {
    const before = baseline.pages.find((page) => page.route === row.route);
    if (!before) { error(row.route, "Missing baseline content"); continue; }
    report.contentComparison.comparedPages++;
    for (const key of ["title", "description", "h1", "bodyTextHash"]) if (JSON.stringify(before[key]) !== JSON.stringify(row[key])) {
      report.contentComparison.changed.push({ route: row.route, field: key }); error(row.route, `Content changed: ${key}`);
    }
  }
}
report.status = report.errors.length ? (baselineMode ? "baseline issues recorded" : "failed") : "passed";
fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ status: report.status, pages: report.pages.length, errors: report.errors, warnings: report.warnings, contentComparison: report.contentComparison }, null, 2));
if (report.errors.length && !baselineMode) process.exitCode = 1;
