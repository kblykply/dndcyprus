// Bölüm içi listeler (madde ekle/sil/taşı), otomatik çeviri yardımcıları ve okunur sayfa adları
const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const core = loadTypeScript("lib/content/core.ts");
const tr = loadTypeScript("lib/content/translate.ts", { env: {} });
const pl = loadTypeScript("lib/page-label.ts");
const h = React.createElement;
const J = (x) => JSON.parse(JSON.stringify(x));

const base = {
  sss: {
    kicker: "S.S.S.",
    items: [
      { id: "a", q: "Birinci soru", a: "Cevap 1", icon: h("svg", { "data-i": "1" }) },
      { id: "b", q: "İkinci soru", a: "Cevap 2", icon: h("svg", { "data-i": "2" }) },
      { id: "c", q: h(React.Fragment, null, "Üçüncü ", h("b", null, "soru")), a: "Cevap 3", icon: h("svg", { "data-i": "3" }) },
    ],
    tags: ["x", "y"],
    dl: [["Kuruluş", "2017"], ["Merkez", "Boston"]],
  },
};

test("editable lists: object, string and pair lists; pairs themselves are not lists", () => {
  const paths = J(core.editableLists(base.sss, "sss").map((l) => l.path));
  assert.deepEqual(paths.sort(), ["sss.dl", "sss.items", "sss.tags"]);
});

test("list operations: copy keeps icon and makes id unique, delete/move, rich text survives storage", () => {
  const items = base.sss.items;
  const json = core.listOperation(items, core.listSources(undefined, 3), "add", 0);
  const out = core.applyOverrides(base, { "sss.items": json });
  assert.equal(out.sss.items.length, 4);
  assert.equal(out.sss.items[1].q, "Birinci soru");
  assert.equal(out.sss.items[1].id, "a-2");
  assert.equal(out.sss.items[1].icon.props["data-i"], "1"); // ikon kaynak maddeden
  assert.equal(core.toMarkup(out.sss.items[3].q), "Üçüncü **soru**"); // JSX başlık geri JSX
  // taşı: üçüncü madde yukarı → ikonu da onunla gider
  const moved = core.applyOverrides(base, { "sss.items": core.listOperation(items, [0, 1, 2], "up", 2) });
  assert.equal(moved.sss.items[1].icon.props["data-i"], "3");
  assert.equal(moved.sss.items[2].q, "İkinci soru");
  // sil + alan kaydı sonra uygulanır
  const del = core.applyOverrides(base, { "sss.items": core.listOperation(items, [0, 1, 2], "delete", 1), "sss.items.1.a": "Yeni cevap" });
  assert.equal(del.sss.items.length, 2);
  assert.equal(del.sss.items[1].a, "Yeni cevap");
  assert.equal(del.sss.items[1].icon.props["data-i"], "3");
  // son madde silinmez, sınırda taşınmaz
  assert.equal(core.listOperation([items[0]], [0], "delete", 0), null);
  assert.equal(core.listOperation(items, [0, 1, 2], "up", 0), null);
  // kod değişmedi: varsayılan aynı kaldı
  assert.equal(base.sss.items.length, 3);
});

test("string and pair lists keep their shape", () => {
  const t = core.applyOverrides(base, { "sss.tags": core.listOperation(base.sss.tags, core.listSources(undefined, 2), "add", 1) });
  assert.deepEqual(J(t.sss.tags), ["x", "y", "y"]);
  const d = core.applyOverrides(base, { "sss.dl": core.listOperation(base.sss.dl, core.listSources(undefined, 2), "delete", 0) });
  assert.deepEqual(J(d.sss.dl), [["Merkez", "Boston"]]);
  assert.equal(core.applyOverrides(base, { "sss.kicker": "[Yeni]" }).sss.kicker, "[Yeni]"); // "[" ile başlayan yazı liste sanılmaz
});

test("editor plan puts item headers and list ends around fields", () => {
  const plan = core.editorPlan(["sss.kicker", "sss.items.0.q", "sss.items.1.q", "sss.tags.0", "sss.tags.1"], [{ path: "sss.items", length: 2 }, { path: "sss.tags", length: 2 }]);
  assert.deepEqual(J(plan.map((p) => (p.t === "field" ? p.path : `${p.t}:${p.list}${p.t === "item" ? "#" + p.index : ""}`))), [
    "sss.kicker", "item:sss.items#0", "sss.items.0.q", "item:sss.items#1", "sss.items.1.q", "end:sss.items", "item:sss.tags#0", "sss.tags.0", "item:sss.tags#1", "sss.tags.1", "end:sss.tags",
  ]);
});

test("translation helpers: what to translate, prompt and strict response check", () => {
  assert.equal(tr.isTranslatable("Lagoon Verde'de yeni yaşam"), true);
  assert.equal(tr.isTranslatable("≈ 8.500 km"), true); // RU "км", binlik ayırıcı dile göre
  for (const x of ["", "  ", "2028", "₺11.407.500", "/azure/lv-1.jpg", "https://x.com", "info@dndcyprus.com"]) assert.equal(tr.isTranslatable(x), false, x);
  const items = [{ id: "a.title", text: "Yeni **yaşam** ritmi", kind: "rich" }, { id: "a.lead", text: "Denize 500 m.", kind: "long" }];
  const prompt = tr.buildPrompt(items, "Ana sayfa");
  assert.ok(prompt.includes('"id":"a.title"') && prompt.includes("Ana sayfa"));
  const ok = tr.parseTranslation(JSON.stringify([
    { id: "a.title", en: "A new **rhythm** of life", de: "Ein neuer **Lebensrhythmus**", ru: "Новый **ритм** жизни", pl: "Nowy **rytm** życia" },
    { id: "a.lead", en: "500 m from the sea.", de: "500 m vom Meer.", ru: "500 м до моря.", pl: "500 m od morza." },
  ]), items);
  assert.equal(ok.ok, true);
  assert.equal(ok.out["a.title"].de, "Ein neuer **Lebensrhythmus**");
  assert.equal(tr.parseTranslation("```json\n[]\n```", items).ok, false); // eksik alan
  assert.equal(tr.parseTranslation('[{"id":"a.title","en":"x","de":"","ru":"x","pl":"x"},{"id":"a.lead","en":"x","de":"x","ru":"x","pl":"x"}]', items).ok, false); // boş dil
  const strip = tr.parseTranslation('[{"id":"a.lead","en":"**500 m** from the sea","de":"x","ru":"x","pl":"x"}]', [items[1]]);
  assert.equal(strip.out["a.lead"].en, "500 m from the sea"); // kaynakta kalın yoksa eklenen ** atılır
});

test("translation is off without a key and the mock works only when asked", async () => {
  assert.equal(tr.translationConfigured(), false);
  const r = await tr.translateFromTurkish([{ id: "x", text: "Merhaba dünya", kind: "text" }]);
  assert.equal(r.ok, false);
  const mock = loadTypeScript("lib/content/translate.ts", { env: { CONTENT_TRANSLATE_MOCK: "1" } });
  const m = await mock.translateFromTurkish([{ id: "x", text: "Merhaba dünya", kind: "text" }, { id: "n", text: "2028", kind: "text" }]);
  assert.equal(m.ok, true);
  assert.equal(m.out.x.pl, "Merhaba dünya [pl]");
  assert.equal(m.out.n, undefined); // sayı çevrilmez
});

test("readable page labels", () => {
  assert.equal(pl.pageLabelText("/en/lagoon-verde"), "Lagoon Verde · İngilizce");
  assert.equal(pl.pageLabelText("https://www.dndcyprus.com/tr"), "Ana sayfa · Türkçe");
  assert.equal(pl.pageLabelText("/de/payment-plans?utm_source=ig"), "Ödeme ve yatırım fırsatları · Almanca · reklamdan");
  assert.ok(pl.pageLabelText("/tr/blog/lagoon-verde-ilk-temel-2026").startsWith("Blog: Lagoon Verde"));
  assert.equal(pl.pageLabelText("/xx/bilinmeyen"), "/xx/bilinmeyen");
});

test("translation model is picked from Google's list: newest stable Flash, never lite/preview/audio", () => {
  const names = ["models/gemini-2.5-flash", "models/gemini-3.8-flash", "models/gemini-3.8-flash-lite", "models/gemini-3.9-flash-preview-11-2026", "models/gemini-3.8-flash-image", "models/gemini-3.8-pro", "models/gemini-3.8-flash-tts", "models/text-embedding-005"];
  assert.equal(tr.pickFlashModel(names), "gemini-3.8-flash");
  assert.equal(tr.pickFlashModel(["models/gemini-4.0-flash-preview-01"]), "gemini-4.0-flash-preview-01"); // yalnız önizleme varsa o
  assert.equal(tr.pickFlashModel(["models/gemini-3.8-pro"]), null);
});

test("fallback order when a model is busy: newest stable flash, older flash versions, then flash-lite", () => {
  const names = ["models/gemini-2.5-flash", "models/gemini-3.8-flash", "models/gemini-3.8-flash-001", "models/gemini-3.5-flash", "models/gemini-3.8-flash-lite", "models/gemini-3.9-flash-preview", "models/gemini-3.8-flash-tts"];
  assert.deepEqual(JSON.parse(JSON.stringify(tr.rankFlashModels(names))), ["gemini-3.8-flash", "gemini-3.5-flash", "gemini-2.5-flash", "gemini-3.8-flash-lite"]);
});

test("translation: short thinking per model, a silent model is skipped once, polish rule in the guide", async () => {
  assert.deepEqual(JSON.parse(JSON.stringify(tr.thinkingFor("gemini-3.1-flash"))), { thinkingLevel: "low" });
  assert.deepEqual(JSON.parse(JSON.stringify(tr.thinkingFor("gemini-2.5-flash-lite"))), { thinkingBudget: 0 });
  assert.equal(tr.thinkingFor("gemini-flash-latest"), null);

  const calls = [];
  const answer = JSON.stringify([{ id: "x", en: "Hello", de: "Hallo", ru: "Привет", pl: "Cześć" }]);
  const fetch = async (url, init) => {
    const u = String(url);
    if (u.includes("/models?")) return Response.json({ models: [{ name: "models/gemini-3.1-flash", supportedGenerationMethods: ["generateContent"] }, { name: "models/gemini-2.5-flash", supportedGenerationMethods: ["generateContent"] }] });
    const model = u.match(/models\/([^:]+):/)[1];
    const body = JSON.parse(init.body);
    calls.push({ model, thinking: body.generationConfig.thinkingConfig ?? null });
    if (model === "gemini-3.1-flash") { const e = new Error("The operation was aborted due to timeout"); e.name = "TimeoutError"; throw e; }
    if (model === "gemini-2.5-flash" && body.generationConfig.thinkingConfig) return Response.json({ error: { message: "thinking_budget is not supported" } }, { status: 400 });
    return Response.json({ candidates: [{ content: { parts: [{ text: "düşünce", thought: true }, { text: answer }] } }] });
  };
  const live = loadTypeScript("lib/content/translate.ts", { env: { GEMINI_API_KEY: "deneme" }, globals: { fetch, console: { ...console, info: () => {} } } });
  const r = await live.translateFromTurkish([{ id: "x", text: "Merhaba", kind: "text" }]);
  assert.equal(r.ok, true);
  assert.equal(r.out.x.pl, "Cześć");
  // zaman aşımına uğrayan model bir kez denenir; düşünme ayarını tanımayan model ayarsız yeniden denenir
  assert.deepEqual(JSON.parse(JSON.stringify(calls)), [
    { model: "gemini-3.1-flash", thinking: { thinkingLevel: "low" } },
    { model: "gemini-2.5-flash", thinking: { thinkingBudget: 0 } },
    { model: "gemini-2.5-flash", thinking: null },
  ]);
  const guide = loadTypeScript("lib/content/translate-guide.ts", { mocks: { "@/lib/azure/home": { HOME: {} }, "@/lib/azure/home-flow": { HOME_FLOW: {} }, "@/lib/azure/pages": { PAGES: {} }, "@/lib/azure/projects": { PROJECT_PAGES: {} } } });
  assert.match(guide.TRANSLATION_SYSTEM, /NEVER the informal 2nd person singular/);
});

test("translation: a model out of free quota is skipped at once and moved to the end next time", async () => {
  const calls = [];
  const answer = JSON.stringify([{ id: "x", en: "Hi", de: "Hallo", ru: "Привет", pl: "Cześć" }]);
  const fetch = async (url) => {
    const u = String(url);
    if (u.includes("/models?")) return Response.json({ models: ["gemini-3.8-flash", "gemini-3.7-flash", "gemini-3.5-flash-lite"].map((n) => ({ name: `models/${n}`, supportedGenerationMethods: ["generateContent"] })) });
    const model = u.match(/models\/([^:]+):/)[1];
    calls.push(model);
    if (model === "gemini-3.8-flash") return Response.json({ error: { message: "Quota exceeded, limit: 0" } }, { status: 429 });
    if (model === "gemini-3.7-flash") return Response.json({ error: { message: "The model is overloaded" } }, { status: 503 });
    return Response.json({ candidates: [{ content: { parts: [{ text: answer }] } }] });
  };
  const live = loadTypeScript("lib/content/translate.ts", { env: { GEMINI_API_KEY: "deneme" }, globals: { fetch, console: { ...console, info: () => {} } } });
  const t0 = Date.now();
  assert.equal((await live.translateFromTurkish([{ id: "x", text: "Merhaba", kind: "text" }])).ok, true);
  assert.ok(Date.now() - t0 < 1000, "kota hatasında beklenmez");
  assert.deepEqual(calls, ["gemini-3.8-flash", "gemini-3.7-flash", "gemini-3.5-flash-lite"]);
  calls.length = 0;
  assert.equal((await live.translateFromTurkish([{ id: "x", text: "Selam", kind: "text" }])).ok, true);
  assert.deepEqual(calls, ["gemini-3.5-flash-lite"]);
});

test("translation: the last model that worked is tried first, a silent model waits its turn", async () => {
  const calls = [];
  const answer = JSON.stringify([{ id: "x", en: "Hi", de: "Hallo", ru: "Привет", pl: "Cześć" }]);
  const fetch = async (url) => {
    const u = String(url);
    if (u.includes("/models?")) return Response.json({ models: ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash-lite"].map((n) => ({ name: `models/${n}`, supportedGenerationMethods: ["generateContent"] })) });
    const model = u.match(/models\/([^:]+):/)[1];
    calls.push(model);
    if (model === "gemini-3.8-flash") { const e = new Error("timeout"); e.name = "TimeoutError"; throw e; }
    if (model === "gemini-3.6-flash") return Response.json({ error: { message: "overloaded" } }, { status: 503 });
    return Response.json({ candidates: [{ content: { parts: [{ text: answer }] } }] });
  };
  const live = loadTypeScript("lib/content/translate.ts", { env: { GEMINI_API_KEY: "deneme" }, globals: { fetch, console: { ...console, info: () => {} } } });
  assert.equal((await live.translateFromTurkish([{ id: "x", text: "Merhaba", kind: "text" }])).ok, true);
  assert.deepEqual(calls, ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash-lite"]);
  calls.length = 0;
  assert.equal((await live.translateFromTurkish([{ id: "x", text: "Selam", kind: "text" }])).ok, true);
  assert.deepEqual(calls, ["gemini-3.5-flash-lite"]);
  assert.deepEqual([...live.orderByCooldown(["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash-lite"])], ["gemini-3.5-flash-lite", "gemini-3.6-flash", "gemini-3.8-flash"]);
});
