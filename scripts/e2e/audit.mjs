// Sayfa denetimi: her rota için aç, sonuna kadar kaydır, ölç, ekran görüntüsü al.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { launch, open } from "./cdp.mjs";

const [,, base, name, w, h, outDir, only] = process.argv;
const width = +w, height = +h;
let routes = JSON.parse(readFileSync(new URL("./routes.json", import.meta.url)));
if (only) routes = routes.filter((r) => only.split(",").includes(r));
mkdirSync(`${outDir}/shots/${name}`, { recursive: true });
const b = await launch({ profileDir: `${outDir}/.prof-${name}` });

const CHECK = `(async () => {
  const vw = innerWidth, vh = innerHeight, wait = (ms) => new Promise((r) => setTimeout(r, ms));
  document.documentElement.style.scrollBehavior = "auto";
  const clsEntries = await new Promise((res) => { try { const list = []; const po = new PerformanceObserver((l) => list.push(...l.getEntries())); po.observe({ type: "layout-shift", buffered: true }); setTimeout(() => { po.disconnect(); res(list); }, 60); } catch { res([]); } });
  const clsLoad = +clsEntries.filter((e) => !e.hadRecentInput).reduce((a, e) => a + e.value, 0).toFixed(3);
  const H = () => document.documentElement.scrollHeight;
  for (let y = 0; y < H(); y += Math.round(vh * 0.8)) { scrollTo(0, y); await wait(130); }
  scrollTo(0, H()); await wait(700);
  document.querySelectorAll(".rv").forEach((e) => e.classList.add("in"));
  document.querySelectorAll("img[loading=lazy]").forEach((i) => { i.loading = "eager"; });
  await wait(1500);
  const sel = (el) => { let s = el.tagName.toLowerCase(); if (el.id) s += "#" + el.id; const c = (el.getAttribute("class") || "").trim().split(/\\s+/).filter(Boolean).slice(0, 3); if (c.length) s += "." + c.join("."); const p = el.closest("section[id], section[class]"); return (p && p !== el ? (p.id ? "section#" + p.id : "section." + (p.getAttribute("class")||"").split(" ")[0]) + " > " : "") + s; };
  const clipped = (el) => { for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) { const o = getComputedStyle(p); if (o.overflowX !== "visible" || o.clipPath !== "none") return true; } return false; };
  const out = [];
  for (const el of document.body.querySelectorAll("*")) {
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
    if (r.right > vw + 1 || r.left < -1) { const cs = getComputedStyle(el); if (cs.position === "fixed" || cs.visibility === "hidden" || cs.opacity === "0") continue; if (clipped(el)) continue; out.push(sel(el) + " [" + Math.round(r.left) + "," + Math.round(r.right) + "]"); if (out.length > 10) break; }
  }
  const imgs = [...document.images];
  const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0 && (i.currentSrc || i.src)).map((i) => i.currentSrc || i.src);
  const pending = imgs.filter((i) => !i.complete).map((i) => i.currentSrc || i.src).slice(0, 5);
  const noAlt = imgs.filter((i) => !i.hasAttribute("alt")).map((i) => i.currentSrc || i.src).slice(0, 5);
  const heads = [...document.querySelectorAll("h1, h2")].filter((e) => e.offsetParent !== null).map((e) => { const cs = getComputedStyle(e); const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.15; return { t: e.textContent.trim().slice(0, 70), lines: Math.round(e.getBoundingClientRect().height / lh) }; }).filter((x) => x.lines > 2);
  const ids = {}; document.querySelectorAll("[id]").forEach((e) => { ids[e.id] = (ids[e.id] || 0) + 1; });
  const dupIds = Object.entries(ids).filter(([, n]) => n > 1).map(([k, n]) => k + "x" + n);
  const links = [...new Set([...document.querySelectorAll("a[href]")].map((a) => a.href).filter((u) => u.startsWith(location.origin)).map((u) => u.split("#")[0]))];
  const emptyLinks = [...document.querySelectorAll("a")].filter((a) => !a.getAttribute("href") || a.getAttribute("href") === "#").map(sel).slice(0, 5);
  const h1 = document.querySelectorAll("h1").length;
  const textOverflow = [...document.querySelectorAll("a, button, h1, h2, h3, h4, p, span, li, dd, dt, small, b")].filter((e) => { if (e.offsetParent === null || e.closest(".sr-only")) return false; const cs = getComputedStyle(e); if (cs.overflowX === "visible" || cs.textOverflow === "ellipsis") return false; return e.scrollWidth > e.clientWidth + 2 && e.clientWidth > 0; }).map(sel).slice(0, 6);
  scrollTo(0, 0); await wait(300);
  return { lang: document.documentElement.lang, title: document.title, overflowX: document.documentElement.scrollWidth - vw, sticking: out, broken, pending, noAlt, heads, dupIds, emptyLinks, h1, clsLoad, textOverflow, links, height: H() };
})()`;

const HIDE = `(() => { for (const e of document.querySelectorAll("body *")) { const cs = getComputedStyle(e); if (cs.position === "fixed" && !e.closest("header") && !e.matches(".az-wa, .az-wa *")) e.style.setProperty("display", "none", "important"); } return 1; })()`;

const results = [];
for (const route of routes) {
  const events = { console: [], exceptions: [], http: [], failed: [] };
  const off = b.on((m) => {
    if (m.method === "Runtime.consoleAPICalled" && (m.params.type === "error" || m.params.type === "assert")) events.console.push(m.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 300));
    if (m.method === "Runtime.exceptionThrown") events.exceptions.push((m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text || "").slice(0, 300));
    if (m.method === "Log.entryAdded" && m.params.entry.level === "error") events.console.push(("[log] " + m.params.entry.text + " " + (m.params.entry.url || "")).slice(0, 300));
    if (m.method === "Network.responseReceived" && m.params.response.status >= 400) events.http.push(m.params.response.status + " " + m.params.response.url.slice(0, 200));
    if (m.method === "Network.loadingFailed" && !/ERR_ABORTED|ERR_BLOCKED_BY_ORB/.test(m.params.errorText)) events.failed.push(m.params.errorText + " " + (m.params.type || ""));
  });
  const t0 = Date.now();
  let nav;
  try { nav = await open(b, base + route, { width, height, waitMs: 2200 }); } catch (e) { nav = { errorText: String(e) }; }
  const r = await b.ev(CHECK, 180000);
  await b.ev(HIDE);
  try {
    const hgt = Math.min((r && r.height) || height, 18000);
    const shot = await b.send("Page.captureScreenshot", { format: "jpeg", quality: 50, captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: hgt, scale: width > 1000 ? 0.5 : 0.6 } });
    if (shot.result?.data) writeFileSync(`${outDir}/shots/${name}/${route.replace(/\//g, "_") || "_root"}.jpg`, Buffer.from(shot.result.data, "base64"));
  } catch {}
  off();
  results.push({ route, ms: Date.now() - t0, navError: nav?.errorText, ...events, ...(r || {}) });
  process.stdout.write(`${name} ${route} ${Date.now() - t0}ms\n`);
}
writeFileSync(`${outDir}/result-${name}.json`, JSON.stringify(results, null, 1));
b.close();
process.exit(0);
