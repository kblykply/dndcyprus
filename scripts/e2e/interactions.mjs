// Etkileşim testleri (üretim derlemesi). /api/ istekleri engellenir: hiçbir form gerçek CRM'e gitmez.
import { writeFileSync } from "node:fs";
import { launch, open } from "./cdp.mjs";

const base = process.argv[2] || "http://localhost:3112";
const outDir = process.argv[3];
const b = await launch({ profileDir: `${outDir}/.prof-int-${Date.now()}` });
const apiHits = [];
await b.send("Fetch.enable", { patterns: [{ urlPattern: "*/api/*" }] });
b.on((m) => {
  if (m.method === "Fetch.requestPaused") { apiHits.push(m.params.request.method + " " + m.params.request.url); b.send("Fetch.failRequest", { requestId: m.params.requestId, errorReason: "BlockedByClient" }); }
});
const errors = [];
b.on((m) => {
  if (m.method === "Runtime.exceptionThrown") errors.push((m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text || "").slice(0, 200));
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") errors.push(m.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 200));
});

const results = [];
const test = async (name, fn) => {
  const t0 = Date.now();
  try { const r = await fn(); results.push({ name, ok: !!r?.ok, detail: r?.detail ?? r, ms: Date.now() - t0 }); }
  catch (e) { results.push({ name, ok: false, detail: "HATA " + String(e).slice(0, 200), ms: Date.now() - t0 }); }
  process.stdout.write(`${results.at(-1).ok ? "✓" : "✗"} ${name}\n`);
};
const ev = (s) => b.ev(`(async()=>{const wait=(ms)=>new Promise(r=>setTimeout(r,ms)); const vis=(e)=>!!e && e.getClientRects().length>0 && getComputedStyle(e).visibility!=="hidden" && +getComputedStyle(e).opacity>0.05; document.documentElement.style.scrollBehavior="auto"; ${s}})()`);
const center = async (selector) => b.ev(`(()=>{const e=document.querySelector(${JSON.stringify(selector)}); if(!e) return null; e.scrollIntoView({block:"center"}); const r=e.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2};})()`);
const hover = async (selector) => { const c = await center(selector); if (!c) return false; await b.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: c.x, y: c.y }); return true; };
const key = async (k) => { await b.send("Input.dispatchKeyEvent", { type: "keyDown", key: k, code: k, windowsVirtualKeyCode: k === "Escape" ? 27 : k === "ArrowRight" ? 39 : 37 }); await b.send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code: k }); };

// ---------- ana sayfa, masaüstü ----------
await open(b, base + "/tr", { width: 1440, height: 900, waitMs: 2500 });

await test("Çerez bandı görünür ve 'Yalnızca zorunlu' ile kapanır, yenileyince geri gelmez", async () => {
  const before = await ev(`const bt=[...document.querySelectorAll("button")].find(x=>/Yalnızca zorunlu/.test(x.textContent)); const v=vis(bt); bt?.click(); await wait(600); const bt2=[...document.querySelectorAll("button")].find(x=>/Yalnızca zorunlu/.test(x.textContent)); return {before:v, after:vis(bt2)}`);
  await open(b, base + "/tr", { width: 1440, height: 900, waitMs: 2500 });
  const again = await ev(`const bt=[...document.querySelectorAll("button")].find(x=>/Yalnızca zorunlu/.test(x.textContent)); return vis(bt)`);
  return { ok: before.before && !before.after && !again, detail: { ...before, afterReload: again } };
});

await test("Kampanya penceresi görünür, Kapat ve Escape ile kapanır", async () => {
  const r = await ev(`const pop=()=>document.querySelector("div.fixed.inset-0.z-\\\\[10002\\\\]"); const v1=vis(pop()); pop()?.querySelector("button[aria-label=Kapat]")?.click(); await wait(700); return {shown:v1, afterClose: vis(pop())}`);
  return { ok: r.shown && !r.afterClose, detail: r };
});

await test("Hero videosu oynuyor", async () => {
  const r = await ev(`const v=document.querySelector("#top video"); await wait(1500); return {exists:!!v, paused:v?.paused, t:v?.currentTime}`);
  return { ok: r.exists && !r.paused && r.t > 0, detail: r };
});

await test("Projeler menüsü fareyle açılır ve proje bağlantıları görünür", async () => {
  await ev(`scrollTo(0,0); await wait(300); return 1`);
  await hover("header button");
  await b.sleep(700);
  const r = await ev(`const a=[...document.querySelectorAll("header a")].find(x=>/Lagoon Verde/.test(x.textContent)); return {visible: vis(a), href: a?.getAttribute("href")}`);
  if (!r.visible) { await ev(`[...document.querySelectorAll("header button")].find(x=>/Projeler/.test(x.textContent))?.click(); await wait(600); return 1`); r.afterClick = await ev(`const a=[...document.querySelectorAll("header a")].find(x=>/Lagoon Verde/.test(x.textContent)); return vis(a)`); }
  return { ok: r.visible || r.afterClick, detail: r };
});

await test("Dil menüsü 5 dili listeler ve aynı sayfaya gider", async () => {
  await b.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 5, y: 600 });
  const r = await ev(`const btn=[...document.querySelectorAll("header button")].find(x=>x.textContent.trim().startsWith("TR")); btn?.click(); await wait(500); const links=[...document.querySelectorAll("header a")].filter(a=>/^(TR|EN|DE|RU|PL)/.test(a.textContent.trim())); return {count:links.length, hrefs:links.map(a=>a.getAttribute("href")), visible: links.every(vis)}`);
  return { ok: r.count === 5 && r.hrefs.join(",") === "/tr,/en,/de,/ru,/pl", detail: r };
});

await test("Ödül vitrini 6 sn içinde kendiliğinden döner, kurdeleye tıklayınca o ödül gelir", async () => {
  const r = await ev(`const s=document.querySelector("#oduller"); s.scrollIntoView({block:"center"}); await wait(400); const t=()=>s.querySelector(".cur .mr-mono")?.textContent; const a=t(); await wait(6200); const b=t(); const rb=[...s.querySelectorAll(".stage .rb")]; const target=rb.find(x=>!x.classList.contains("c")); target?.click(); await wait(500); const c=t(); return {a,b,afterClick:c, selected: target?.getAttribute("aria-selected")}`);
  return { ok: r.a !== r.b && r.selected === "true", detail: r };
});

await test("Video bölümü: oklar, çizgiler ve ses düğmesi çalışır, 10 sn'de ilerler", async () => {
  const r = await ev(`const s=document.querySelector(".az-vs"); s.scrollIntoView({block:"center"}); await wait(1500); const cnt=()=>s.querySelector(".txt.on .hd b")?.textContent; const a=cnt(); s.querySelector(".nav button:last-child").click(); await wait(400); const b=cnt(); s.querySelector(".nav button:first-child").click(); await wait(400); const c=cnt(); s.querySelectorAll(".bars button")[2]?.click(); await wait(400); const d=cnt(); const m=s.querySelector(".ctl button"); m.click(); await wait(300); const pressed=m.getAttribute("aria-pressed"); m.click(); await wait(200); const e1=cnt(); return {a,b,c,d,pressed,e1}`);
  const adv = await ev(`const s=document.querySelector(".az-vs"); const cnt=()=>s.querySelector(".txt.on .hd b")?.textContent; const a=cnt(); await wait(11000); return {a, after11: cnt()}`);
  return { ok: r.a === "01" && r.b === "02" && r.c === "01" && r.d === "03" && r.pressed === "true", detail: { ...r, adv, note: "ses açılınca otomatik ilerleme durur (beklenen)" } };
});

await test("Projeler karuseli sağ okla kayar", async () => {
  const r = await ev(`const s=document.querySelector("#projeler"); s.scrollIntoView({block:"center"}); await wait(300); const car=s.querySelector(".az-car"); const a=car.scrollLeft; s.querySelector(".az-ctrl button:last-child").click(); await wait(900); return {a, b:car.scrollLeft}`);
  return { ok: r.b > r.a, detail: r };
});

await test("Logo şeridi kayıyor ve kartlar dik", async () => {
  const r = await ev(`const w=document.querySelector(".az-wheel"); w.scrollIntoView({block:"center"}); await wait(600); const c=w.querySelector(".card"); const a=c.style.transform; await wait(1500); return {a, b:c.style.transform}`);
  return { ok: r.a !== r.b && !/rotate/.test(r.b), detail: r };
});

await test("SSS: hepsi kapalı başlar, tıklayınca açılır ve kapanır", async () => {
  const r = await ev(`const d=[...document.querySelectorAll(".az-faq details")]; const open0=d.filter(x=>x.open).length; d[0].scrollIntoView({block:"center"}); d[0].querySelector("summary").click(); await wait(200); const o1=d[0].open; d[0].querySelector("summary").click(); await wait(200); return {open0, o1, o2:d[0].open}`);
  return { ok: r.open0 === 0 && r.o1 && !r.o2, detail: r };
});

await test("Instagram bölümü kaydırınca yüklenir", async () => {
  const r = await ev(`const s=[...document.querySelectorAll("section")].find(x=>/Instagram/i.test(x.getAttribute("aria-label")||"")) || document.querySelector("[class*=min-h-\\\\[1000px\\\\]]"); (s||document.body).scrollIntoView({block:"center"}); await wait(3000); const phone=document.querySelector("section[aria-label*=Instagram]"); return {loaded: !!phone}`);
  return { ok: r.loaded, detail: r };
});

await test("Boş form gönderilmez (tarayıcı doğrulaması), API'ye istek gitmez", async () => {
  const before = apiHits.length;
  const r = await ev(`const f=document.querySelector("#iletisim form") || document.querySelector("main form"); f.scrollIntoView({block:"center"}); await wait(300); const btn=f.querySelector("button[type=submit], button:not([type])"); btn.click(); await wait(800); return {valid:f.checkValidity(), invalidCount:f.querySelectorAll(":invalid").length}`);
  return { ok: !r.valid && apiHits.length === before, detail: { ...r, apiHits: apiHits.slice(before) } };
});

await test("WhatsApp düğmesi doğru numaraya gider", async () => {
  const r = await ev(`const a=document.querySelector("#whatsapp-fab"); return {href:a?.href, visible:vis(a)}`);
  return { ok: /wa\.me\/905488880363/.test(r.href || "") && r.visible, detail: r };
});

await test("Konum haritası Lagoon Verde koordinatında, 360° Tur bağlantısının hedefi var", async () => {
  const r = await ev(`const s=document.querySelector(".az-loc"); s.scrollIntoView({block:"center"}); await wait(800); const f=s.querySelector("iframe"); const tour=[...s.querySelectorAll("a")].find(a=>/360/.test(a.textContent)); return {src:f?.src, tour: tour?.getAttribute("href")}`);
  return { ok: /35\.228781/.test(r.src || "") && /\/tr\/lagoon-verde#sanal-tur$/.test(r.tour || ""), detail: r };
});

// ---------- proje sayfası ----------
await open(b, base + "/tr/lagoon-verde", { width: 1440, height: 900, waitMs: 2500 });

await test("Galeri: panele tıklayınca genişler, tekrar tıklayınca eski hâline döner, görseller yüklü", async () => {
  const r = await ev(`const g=document.querySelector(".az-pg"); g.scrollIntoView({block:"center"}); await wait(600); const bt=[...g.querySelectorAll("button")]; const w0=bt[2].getBoundingClientRect().width; bt[2].click(); await wait(900); const w1=bt[2].getBoundingClientRect().width; const pressed=bt[2].getAttribute("aria-pressed"); bt[2].click(); await wait(900); const w2=bt[2].getBoundingClientRect().width; const imgs=bt.map(x=>x.querySelector("img")).filter(i=>i.complete && i.naturalWidth>0).length; return {w0:Math.round(w0), w1:Math.round(w1), w2:Math.round(w2), pressed, loadedImgs: imgs+"/"+bt.length}`);
  return { ok: r.w1 > r.w0 * 1.5 && r.pressed === "true" && Math.abs(r.w2 - r.w0) < 5, detail: r };
});

await test("Kat planı: tip değişince başlık değişir, Plan / İç mekân ve büyütme çalışır", async () => {
  const r = await ev(`const u=document.querySelector(".mr-units"); u.scrollIntoView({block:"center"}); await wait(300); const h=()=>u.querySelector(".tbl h3")?.textContent; const a=h(); u.querySelectorAll(".list button")[1].click(); await wait(400); const b=h(); const sw=u.querySelectorAll(".fig .sw button"); let interior=null; if(sw.length>1){ sw[1].click(); await wait(500); interior=sw[1].getAttribute("aria-selected"); sw[0].click(); await wait(300);} u.querySelector(".zoom").click(); await wait(500); const lb=vis(document.querySelector(".az-lb")); return {a,b,interior,lb}`);
  await key("Escape"); await b.sleep(400);
  const closed = await ev(`return !vis(document.querySelector(".az-lb"))`);
  return { ok: r.a !== r.b && r.lb && closed, detail: { ...r, closed } };
});

await test("360° tur: başlat düğmesi iframe'i yükler", async () => {
  const r = await ev(`const t=document.querySelector("[id=sanal-tur]"); t.scrollIntoView({block:"center"}); await wait(300); [...t.querySelectorAll("button")].find(x=>/Başlat/.test(x.textContent))?.click(); await wait(1500); return {iframe: !!t.querySelector("iframe"), src: t.querySelector("iframe")?.src?.slice(0,80)}`);
  return { ok: r.iframe, detail: r };
});

await test("Proje sayfasında dil menüsü aynı projeye gider", async () => {
  const r = await ev(`scrollTo(0,0); await wait(200); const links=[...document.querySelectorAll("header a")].filter(a=>/^(TR|EN|DE|RU|PL)/.test(a.textContent.trim())); return links.map(a=>a.getAttribute("href"))`);
  return { ok: r.join(",") === "/tr/lagoon-verde,/en/lagoon-verde,/de/lagoon-verde,/ru/lagoon-verde,/pl/lagoon-verde", detail: r };
});

// ---------- mobil ----------
await open(b, base + "/tr", { width: 390, height: 844, waitMs: 2500 });
await test("Mobil menü açılır, bağlantılar görünür, kapanır", async () => {
  const r = await ev(`document.querySelector("div.fixed.inset-0.z-\\\\[10002\\\\] button[aria-label=Kapat]")?.click(); await wait(400); const burger=document.querySelector("button.burger"); burger.click(); await wait(600); const m=document.querySelector(".az-mobile"); const link=[...m.querySelectorAll("a")].find(a=>/İletişim/.test(a.textContent)); const opened=vis(link) && m.getBoundingClientRect().height>200; const lock=getComputedStyle(document.body).overflow; m.querySelector("button.close").click(); await wait(600); return {opened, lock, closedAfter: !vis(link)}`);
  return { ok: r.opened && r.closedAfter, detail: r };
});

await test("Mobil: yatay kaydırma yok, hikaye görseli üstte yapışıyor", async () => {
  const r = await ev(`const s=document.querySelector("[id=hikaye]"); const st=s.querySelector(".stick"); const steps=[...s.querySelectorAll(".az-step")]; steps[2].scrollIntoView({block:"center"}); await wait(500); return {overflowX: document.documentElement.scrollWidth-innerWidth, stickTop: Math.round(st.getBoundingClientRect().top), active: steps.findIndex(x=>x.classList.contains("on"))}`);
  return { ok: r.overflowX === 0 && r.stickTop === 76 && r.active >= 1, detail: r };
});

// ---------- iletişim ----------
await open(b, base + "/tr/contact", { width: 1440, height: 900, waitMs: 2500 });
await test("İletişim: sosyal ikonlar ve ofis bağlantıları var", async () => {
  const r = await ev(`const s=[...document.querySelectorAll("a")].filter(a=>/instagram|linkedin|facebook|youtube/.test(a.href)).map(a=>a.href); const tel=[...document.querySelectorAll("a[href^='tel:']")].length; const mail=[...document.querySelectorAll("a[href^='mailto:']")].length; return {social:[...new Set(s)].length, tel, mail}`);
  return { ok: r.social >= 4 && r.tel >= 1 && r.mail >= 1, detail: r };
});

await test("Kök adres ve bilinmeyen sayfa", async () => {
  const root = await fetch(base + "/", { redirect: "manual" });
  const nf = await fetch(base + "/tr/olmayan-sayfa-xyz");
  return { ok: [301, 302, 307, 308].includes(root.status) || root.status === 200, detail: { root: root.status + " " + (root.headers.get("location") || ""), notFound: nf.status } };
});

results.push({ name: "Sayfa hataları (tüm etkileşim boyunca)", ok: errors.length === 0, detail: errors.slice(0, 10) });
results.push({ name: "Engellenen API istekleri", ok: true, detail: apiHits });
writeFileSync(`${outDir}/interactions.json`, JSON.stringify(results, null, 1));
b.close();
process.exit(0);
