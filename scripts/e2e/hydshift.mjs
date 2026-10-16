// Hidrasyon kayması: sayfa ilk çizimde (DOMContentLoaded) ve 3 sn sonra (kaydırmadan) bölüm yükseklikleri
import { readFileSync, writeFileSync } from "node:fs";
import { launch } from "./cdp.mjs";
const [,, base, w, h, out] = process.argv;
const routes = JSON.parse(readFileSync(new URL("./routes.json", import.meta.url)));
const b = await launch({ profileDir: `${out}/.prof-hyd-${w}` });
await b.send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 768 });
await b.send("Page.addScriptToEvaluateOnNewDocument", { source: `
  window.__snap=(tag)=>{ const secs=[...document.querySelectorAll("main > *, main section, footer")].map((e,i)=>({k:(e.id?"#"+e.id:"")+"."+(e.getAttribute("class")||"").split(" ").slice(0,2).join("."), h:Math.round(e.getBoundingClientRect().height)})); return {tag, docH:document.documentElement.scrollHeight, secs}; };
  document.addEventListener("DOMContentLoaded",()=>{ window.__a=window.__snap("dcl"); });
`});
const res = [];
for (const r of routes) {
  const loaded = new Promise((ok) => { const off = b.on((m) => { if (m.method === "Page.loadEventFired") { off(); ok(); } }); setTimeout(ok, 20000); });
  await b.send("Page.navigate", { url: base + r });
  await loaded; await b.sleep(3000);
  const v = await b.ev(`(()=>{const a=window.__a; const z=window.__snap("late"); const diffs=[]; if(a){ const n=Math.min(a.secs.length,z.secs.length); for(let i=0;i<n;i++){ const d=z.secs[i].h-a.secs[i].h; if(Math.abs(d)>8 && a.secs[i].k===z.secs[i].k) diffs.push(z.secs[i].k+": "+a.secs[i].h+"→"+z.secs[i].h); } } return {d: a? z.docH-a.docH : null, diffs: diffs.slice(0,6)}})()`);
  res.push({ r, ...v });
  if (v && (Math.abs(v.d) > 8)) console.log(w, r, v.d, JSON.stringify(v.diffs));
}
writeFileSync(`${out}/hyd-${w}.json`, JSON.stringify(res, null, 1));
console.log("bitti", w, res.filter((x) => Math.abs(x.d || 0) > 8).length, "sayfada kayma");
b.close(); process.exit(0);
