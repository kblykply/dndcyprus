const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const J = (v) => JSON.parse(JSON.stringify(v));

function fakeDb({ items = [], overrides = [] } = {}) {
  const state = new Map();
  const logs = [];
  const ov = overrides.map((o, i) => ({ id: i + 1, updatedAt: new Date(), updatedBy: "Yönetici", ...o }));
  const it = items.map((r, i) => ({ id: i + 1, ...r }));
  return {
    state, logs, ov, it,
    prisma: {
      syncState: {
        findUnique: async ({ where }) => (state.has(where.key) ? { data: J(state.get(where.key)) } : null),
        upsert: async ({ where, create }) => { state.set(where.key, J(create.data)); },
      },
      contentOverride: {
        deleteMany: async ({ where }) => { for (let i = ov.length - 1; i >= 0; i--) if (ov[i].scope === where.scope && (where.locale?.in ? where.locale.in.includes(ov[i].locale) : ov[i].locale === where.locale) && (where.path?.in ? where.path.in.includes(ov[i].path) : ov[i].path === where.path) && (!where.updatedBy || ov[i].updatedBy === where.updatedBy)) ov.splice(i, 1); },
        upsert: async ({ create }) => { const o = ov.find((x) => x.scope === create.scope && x.locale === create.locale && x.path === create.path); if (o) Object.assign(o, { value: create.value, updatedBy: create.updatedBy, updatedAt: new Date() }); else ov.push({ ...create, updatedAt: new Date() }); },
        findMany: async ({ where }) => ov.filter((o) => o.scope === where.scope && where.locale.in.includes(o.locale) && where.path.in.includes(o.path) && o.updatedAt > where.updatedAt.gt && o.updatedBy !== where.NOT.updatedBy),
      },
      contentItem: {
        findUnique: async ({ where }) => it.find((r) => r.collection === where.collection_key.collection && r.key === where.collection_key.key) ?? null,
        update: async ({ where, data }) => { Object.assign(it.find((r) => r.id === where.id), J(data)); },
      },
      contentLog: { create: async ({ data }) => { logs.push(data); } },
    },
  };
}

// bölüm alanları: Türkçe değer + diğer dillerin orijinali
const FIELDS = {
  tr: [{ path: "sss.items.0.q", kind: "text", value: "Yeni soru?", original: "Eski soru?", overridden: true }],
  en: [{ path: "sss.items.0.q", kind: "text", value: "Old question?", original: "Old question?", overridden: false }],
  de: [{ path: "sss.items.0.q", kind: "text", value: "Alte Frage?", original: "Alte Frage?", overridden: false }],
  ru: [{ path: "sss.items.0.q", kind: "text", value: "Старый вопрос?", original: "Старый вопрос?", overridden: false }],
  pl: [{ path: "sss.items.0.q", kind: "text", value: "Stare pytanie?", original: "Stare pytanie?", overridden: false }],
};

function load(db, translate) {
  return loadTypeScript("lib/content/translate-jobs.ts", {
    mocks: {
      "next/cache": { revalidatePath: () => {} },
      "@/lib/prisma": { prisma: db.prisma },
      "./translate": {
        AUTO_TRANSLATOR: "otomatik çeviri",
        TARGET_LOCALES: ["en", "de", "ru", "pl"],
        isTranslatable: (s) => /[a-zçğıöşü]/i.test(s),
        translationConfigured: () => true,
        translateFromTurkish: translate,
      },
      "./scopes": { SCOPES: { anasayfa: { label: "Ana sayfa", sections: [["sss", "SSS"]], routes: (l) => [`/${l}`] } }, isScopeKey: (k) => k === "anasayfa" },
      "./admin": {
        COLLECTIONS: { haber: { label: "Haberler", perLocale: [{ key: "h", kind: "text" }, { key: "p", kind: "long" }], title: (d) => d.h?.tr ?? "", routes: (l) => [`/${l}/blog`] } },
        isCollectionKey: (k) => k === "haber",
        allRoutes: (fn) => ["tr", "en"].flatMap(fn),
        sectionFields: async (_scope, l) => J(FIELDS[l]),
      },
    },
  });
}

const ok = (items) => ({ ok: true, out: Object.fromEntries(items.map((i) => [i.id, { en: `${i.text} [en]`, de: `${i.text} [de]`, ru: `${i.text} [ru]`, pl: `${i.text} [pl]` }])) });
const busy = async () => ({ ok: false, error: "Çeviri servisi şu an yoğun" });

test("queue: section translation that failed is retried and written to the other languages", async () => {
  const db = fakeDb();
  let mode = "busy";
  const m = load(db, async (items) => (mode === "busy" ? busy() : ok(items)));
  const r = await m.translateSectionFields("anasayfa", "sss", [{ path: "sss.items.0.q", kind: "text", value: "Yeni soru?", reverted: false }]);
  assert.equal(r.count, 0);
  assert.deepEqual(J(r.paths), ["sss.items.0.q"]);
  await m.enqueueTranslation({ kind: "section", scope: "anasayfa", section: "sss", paths: r.paths, at: Date.now() - 1000, tries: 0, error: r.error });
  // aynı bölüm ikinci kez sıraya girerse tek iş kalır
  await m.enqueueTranslation({ kind: "section", scope: "anasayfa", section: "sss", paths: ["sss.items.0.q"], at: Date.now(), tries: 0 });
  assert.equal((await m.translationQueueSummary()).count, 1);
  // servis hâlâ yoğun → iş sırada kalır, deneme sayısı artar
  let q = await m.processTranslationQueue();
  assert.deepEqual(J(q), { done: 0, left: 1, failed: 1 });
  assert.equal(db.state.get("translate-queue").jobs[0].tries, 1);
  // servis açıldı → çeviri yazılır, kuyruk boşalır
  mode = "ok";
  q = await m.processTranslationQueue();
  assert.deepEqual(J(q), { done: 1, left: 0, failed: 0 });
  assert.deepEqual(db.ov.map((o) => `${o.locale}:${o.value}:${o.updatedBy}`).sort(), ["de:Yeni soru? [de]:otomatik çeviri", "en:Yeni soru? [en]:otomatik çeviri", "pl:Yeni soru? [pl]:otomatik çeviri", "ru:Yeni soru? [ru]:otomatik çeviri"]);
  assert.match(db.logs[0].detail, /sıradan/);
});

test("queue: a language written by hand while waiting is kept", async () => {
  const db = fakeDb({ overrides: [{ scope: "anasayfa", locale: "de", path: "sss.items.0.q", value: "Handgeschrieben?", updatedBy: "Yönetici" }] });
  const m = load(db, async (items) => ok(items));
  await m.enqueueTranslation({ kind: "section", scope: "anasayfa", section: "sss", paths: ["sss.items.0.q"], at: Date.now() - 60_000, tries: 0 });
  db.ov[0].updatedAt = new Date(); // sırada beklerken elle yazıldı
  await m.processTranslationQueue();
  assert.equal(db.ov.find((o) => o.locale === "de").value, "Handgeschrieben?");
  assert.equal(db.ov.find((o) => o.locale === "en").value, "Yeni soru? [en]");
});

test("queue: a news item fills only the languages nobody touched", async () => {
  const db = fakeDb({ items: [{ collection: "haber", key: "yeni-haber", data: { h: { tr: "Yeni haber", en: "", de: "", ru: "Свой заголовок", pl: "" }, p: { tr: "Metin" } } }] });
  let mode = "busy";
  const m = load(db, async (items) => (mode === "busy" ? busy() : ok(items)));
  const data = J(db.it[0].data);
  const tr = await m.translateItemData("haber", data, null);
  assert.equal(tr.count, 0);
  assert.deepEqual(J(tr.pending), ["h", "p"]);
  assert.deepEqual(J(tr.snapshot.h), { en: "", de: "", pl: "" }); // RU elle yazılmış → sıraya girmez
  await m.enqueueTranslation({ kind: "item", collection: "haber", key: "yeni-haber", fields: tr.pending, snapshot: tr.snapshot, at: Date.now(), tries: 0 });
  db.it[0].data.h.pl = "Ręcznie"; // sırada beklerken Lehçe elle yazıldı
  mode = "ok";
  await m.processTranslationQueue();
  const h = db.it[0].data.h;
  assert.deepEqual(J(h), { tr: "Yeni haber", en: "Yeni haber [en]", de: "Yeni haber [de]", ru: "Свой заголовок", pl: "Ręcznie" });
  assert.equal(db.it[0].data.p.en, "Metin [en]");
  assert.equal((await m.translationQueueSummary()).count, 0);
});

test("queue: deleted item or reverted text leaves the queue without translating", async () => {
  const db = fakeDb();
  let calls = 0;
  const m = load(db, async (items) => { calls++; return ok(items); });
  await m.enqueueTranslation({ kind: "item", collection: "haber", key: "silinmis", fields: ["h"], snapshot: {}, at: Date.now(), tries: 0 });
  FIELDS.tr[0].overridden = false;
  await m.enqueueTranslation({ kind: "section", scope: "anasayfa", section: "sss", paths: ["sss.items.0.q"], at: Date.now(), tries: 0 });
  const q = await m.processTranslationQueue();
  FIELDS.tr[0].overridden = true;
  assert.deepEqual(J(q), { done: 2, left: 0, failed: 0 });
  assert.equal(calls, 0);
});
