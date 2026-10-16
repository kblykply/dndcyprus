import { writeFileSync } from "node:fs";
import { launch, open } from "./cdp.mjs";
const out = process.argv[2]; const base = process.argv[3] || "http://localhost:3112";
const b = await launch({ profileDir: `${out}/.prof-extra-${Date.now()}` });
const res = {};
// 1) Çapa atlama: hedef bölüm sabit menünün altında mı kalıyor?
res.anchors = [];
for (const [path, hash] of [["/tr/lagoon-verde", "kat-planlari"], ["/tr/lagoon-verde", "sanal-tur"], ["/tr/lagoon-verde", "fiyat-al"], ["/tr/lagoon-verde", "konum"], ["/en/perla", "floor-plans"], ["/tr", "iletisim"], ["/tr", "projeler"], ["/tr/privacy", "cerezler"]]) {
  await open(b, `${base}${path}#${hash}`, { width: 1440, height: 900, waitMs: 2500 });
  const r = await b.ev(`(async()=>{await new Promise(r=>setTimeout(r,800)); const h=document.querySelector("header")?.getBoundingClientRect(); const t=document.getElementById(${JSON.stringify(hash)}); if(!t) return {missing:true}; const tr=t.getBoundingClientRect(); const head=t.querySelector("h2,h1,.az-kicker")?.getBoundingClientRect(); return {headerBottom:Math.round(h?.bottom||0), targetTop:Math.round(tr.top), headingTop: head? Math.round(head.top):null, scrollY:Math.round(scrollY)}})()`);
  res.anchors.push({ url: `${path}#${hash}`, ...r, covered: r && !r.missing && r.headingTop !== null && r.headingTop < r.headerBottom });
}
// 2) Hareketi azalt: .rv öğeleri görünür mü, sayfa hatasız mı?
await b.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
res.reduced = [];
for (const p of ["/tr", "/tr/lagoon-verde", "/en/about"]) {
  await open(b, base + p, { width: 1440, height: 900, waitMs: 2500 });
  const r = await b.ev(`(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=700){scrollTo(0,y); await new Promise(r=>setTimeout(r,120));} await new Promise(r=>setTimeout(r,800)); const rv=[...document.querySelectorAll(".rv")]; const hidden=rv.filter(e=>+getComputedStyle(e).opacity<0.5).length; const vids=[...document.querySelectorAll("video")].filter(v=>!v.paused).length; return {rv:rv.length, hidden, playingVideos:vids}})()`);
  res.reduced.push({ p, ...r });
}
await b.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }, { name: "prefers-color-scheme", value: "dark" }] });
// 3) Karanlık mod: zemin ve metin kontrastı bozuluyor mu?
res.dark = [];
for (const p of ["/tr", "/tr/contact", "/tr/privacy"]) {
  await open(b, base + p, { width: 1440, height: 900, waitMs: 2000 });
  const r = await b.ev(`(()=>{const bg=getComputedStyle(document.body).backgroundColor; const h=document.querySelector("h1,h2"); return {bodyBg:bg, headingColor: h?getComputedStyle(h).color:null, scheme:getComputedStyle(document.documentElement).colorScheme}})()`);
  const shot = await b.send("Page.captureScreenshot", { format: "jpeg", quality: 55 });
  writeFileSync(`${out}/dark${p.replace(/\//g, "_")}.jpg`, Buffer.from(shot.result.data, "base64"));
  res.dark.push({ p, ...r });
}
await b.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "light" }] });
// 4) 404 sayfası
for (const [p, w] of [["/tr/olmayan-sayfa", 1440], ["/en/missing-page", 390]]) {
  await open(b, base + p, { width: w, height: w > 500 ? 900 : 844, waitMs: 2000 });
  const shot = await b.send("Page.captureScreenshot", { format: "jpeg", quality: 60 });
  writeFileSync(`${out}/404-${w}.jpg`, Buffer.from(shot.result.data, "base64"));
  res["404_" + w] = await b.ev(`({title:document.title, h1:document.querySelector("h1")?.textContent, lang:document.documentElement.lang, links:[...document.querySelectorAll("main a, a")].slice(0,6).map(a=>a.getAttribute("href"))})`);
}
writeFileSync(`${out}/extra.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
b.close(); process.exit(0);
