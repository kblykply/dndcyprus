// İçerik yönetimi 2. aşama: sayfa/proje kapsamları, gizli alanlar, blog metni biçimi, etkinlik ve blog varsayılanları
const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const core = loadTypeScript("lib/content/core.ts");
const sc = loadTypeScript("lib/content/scopes.ts");
const ev = loadTypeScript("lib/content/defaults/events.ts");
const bl = loadTypeScript("lib/content/defaults/blog.ts");
const LOCALES = ["tr", "en", "de", "ru", "pl"];

test("every scope builds in 5 languages and each section has editable fields", () => {
  for (const [key, def] of Object.entries(sc.SCOPES)) {
    assert.ok(def.sections.length > 0, key);
    for (const l of LOCALES) {
      const built = def.build(l);
      for (const [sec] of def.sections) {
        assert.equal(typeof built[sec], "object", `${key}.${sec} (${l})`);
        const fields = core.walkFields(built[sec], sec).filter((f) => !sc.isHiddenPath(f.path, def.hide));
        assert.ok(fields.length > 0, `${key}.${sec} (${l}) alan yok`);
      }
    }
  }
});

test("project scopes: 5 projects + Mariachi, technical fields hidden, sections only where data exists", () => {
  const projects = Object.entries(sc.SCOPES).filter(([, d]) => d.group === "proje");
  assert.deepEqual(projects.map(([k]) => k).sort(), ["mariachi", "proje-la-joya", "proje-lagoon-verde", "proje-neocity", "proje-perla", "proje-perla-ii"]);
  const lv = sc.SCOPES["proje-lagoon-verde"];
  const facts = core.walkFields(lv.build("tr").facts, "facts").filter((f) => !sc.isHiddenPath(f.path, lv.hide));
  assert.ok(facts.every((f) => !f.path.startsWith("facts.jsonLd")));
  assert.ok(facts.some((f) => f.path === "facts.title"));
  const neo = sc.SCOPES["proje-neocity"].sections.map(([k]) => k);
  assert.ok(neo.includes("payment") && neo.includes("sitePlan") && !neo.includes("tech"));
  assert.equal(sc.SCOPES["proje-lagoon-verde"].build("de").ust.image, sc.SCOPES["proje-lagoon-verde"].build("tr").ust.image);
});

test("hidden path patterns support * for one segment", () => {
  const hide = ["facts.jsonLd", "floorPlans.plans.*.variants.*.pdf"];
  assert.equal(sc.isHiddenPath("facts.jsonLd.name", hide), true);
  assert.equal(sc.isHiddenPath("facts.title", hide), false);
  assert.equal(sc.isHiddenPath("floorPlans.plans.2.variants.0.pdf", hide), true);
  assert.equal(sc.isHiddenPath("floorPlans.plans.2.variants.0.image", hide), false);
  assert.equal(sc.isHiddenPath("x", undefined), false);
});

test("overrides on a project scope change only the edited field and keep the default intact", () => {
  const def = sc.SCOPES["proje-lagoon-verde"];
  const base = def.build("tr");
  const out = core.applyOverrides(base, { "overview.title": "Yeni başlık", "ust.tagline": "Yeni tanıtım" });
  assert.equal(out.overview.title, "Yeni başlık");
  assert.equal(out.ust.tagline, "Yeni tanıtım");
  assert.notEqual(def.build("tr").overview.title, "Yeni başlık");
  assert.equal(JSON.stringify(out.facts.jsonLd), JSON.stringify(base.facts.jsonLd));
});

test("blog text: paragraphs, bold, line breaks; scripts and event handlers removed", () => {
  assert.equal(core.postHtml("Bir **iki**\nüç\n\nDört"), "<p>Bir <strong>iki</strong><br/>üç</p>\n\n<p>Dört</p>");
  const dirty = '<p onclick="x()">Merhaba <a href="javascript:alert(1)">tık</a></p><script>alert(1)</script><iframe src="//x"></iframe>';
  const clean = core.postHtml(dirty);
  assert.ok(!/script|iframe|onclick|javascript:/i.test(clean), clean);
  assert.ok(clean.startsWith("<p>Merhaba"));
  assert.equal(core.postHtml(""), "");
});

test("slugify handles Turkish characters", () => {
  assert.equal(core.slugify("Panel deneme yazısı"), "panel-deneme-yazisi");
  assert.equal(core.slugify("Çağrı Ölçüm Şubesi İğne"), "cagri-olcum-subesi-igne");
});

test("events defaults merge 5 languages; empty translation falls back to English then Turkish", () => {
  assert.equal(ev.EVENT_DEFAULTS.length, 9);
  const first = ev.EVENT_DEFAULTS[0];
  assert.ok(first.h.tr && first.h.en && first.h.pl);
  assert.equal(new Set(ev.EVENT_DEFAULTS.map((e) => e.id)).size, 9);
  const r = { id: "x", img: "/a.jpg", date: { tr: "1 Ocak", en: "", de: "", ru: "", pl: "" }, h: { tr: "Başlık", en: "Title", de: "", ru: "", pl: "" }, p: { tr: "", en: "", de: "", ru: "", pl: "" } };
  assert.equal(JSON.stringify(ev.eventFor(r, "de")), JSON.stringify({ date: "1 Ocak", h: "Title", p: "", img: "/a.jpg" }));
});

test("blog defaults keep translations and per-language signature", () => {
  assert.equal(bl.BLOG_DEFAULTS.length, 5);
  const press = bl.BLOG_DEFAULTS.find((p) => p.author && p.author.en === "Press release");
  assert.ok(press, "basın bülteni imzası");
  assert.equal(bl.postFor(press, "de").author, "Pressemitteilung");
  const admin = bl.BLOG_DEFAULTS.find((p) => p.author && p.author.tr === "Admin");
  assert.equal(bl.postFor(admin, "tr").author, "Admin");
  assert.equal(bl.postFor(admin, "en").author, undefined);
  const lv = bl.BLOG_DEFAULTS.find((p) => p.id === "lagoon-verde-ilk-temel-2026");
  assert.equal(bl.postFor(lv, "en").title, "Groundbreaking at Lagoon Verde");
  assert.ok(bl.postFor(lv, "tr").content.startsWith("<p>"));
});

test("site contact: digits-only WhatsApp, tel: link, defaults when empty", () => {
  const sc2 = loadTypeScript("lib/content/site-contact.ts");
  const c = sc2.siteContact({ phone: "+90 392 111 22 33", mobile: "+90 555 111 22 33", whatsapp: "+90 555-111 22 33", email: " a@b.com " }, "Adres", "Saat");
  assert.equal(c.phoneHref, "tel:+903921112233");
  assert.equal(c.whatsapp, "905551112233");
  assert.equal(c.email, "a@b.com");
  const d = sc2.defaultSiteContact("en");
  assert.equal(d.phone, "+90 392 444 03 63");
  assert.equal(d.whatsapp, "905488390363");
  assert.ok(d.hq.includes("Famagusta"));
});

test("contact scope: phone section is shared, head-office card follows the site phone", () => {
  const def = sc.SCOPES.iletisim;
  assert.deepEqual([...def.shared], ["telefon"]);
  const out = def.finalize(core.applyOverrides(def.build("de"), { "telefon.phone": "+90 392 111 22 33", "telefon.whatsapp": "905551112233", "telefon.email": "x@dndcyprus.com" }));
  const hq = out.bilgi.offices.find((o) => o.id === "hq");
  assert.equal(hq.phone, "+90 392 111 22 33");
  assert.equal(hq.phoneDisplay, "+90 392 111 22 33");
  assert.equal(hq.email, "mailto:x@dndcyprus.com");
  assert.equal(hq.whatsapp, "https://wa.me/905551112233");
  const hidden = core.walkFields(def.build("tr").bilgi, "bilgi").filter((f) => sc.isHiddenPath(f.path, def.hide)).map((f) => f.path);
  assert.ok(hidden.includes("bilgi.offices.0.phone") && hidden.includes("bilgi.offices.0.phoneDisplay"));
});

test("about scope has founder/director cards and timeline; Mariachi scope keeps card text but no icons", () => {
  const a = sc.SCOPES.hakkimizda.build("tr");
  assert.equal(a.ozan.name, "Ozan Dökmecioğlu");
  assert.equal(typeof a.ozan.career, "string");
  assert.ok(a.aynur.name.startsWith("Aynur"));
  assert.equal(a.zaman.items.length >= 6, true);
  assert.ok(a.zaman.harita.dist.includes("km"));
  const m = sc.SCOPES.mariachi.build("en");
  assert.ok(m.olanaklar.items.length >= 6 && m.olanaklar.items.every((x) => x.title && x.image && !("icon" in x)));
  assert.ok(m.galeri.items.every((x) => /^\/.+\.(jpg|webp|png)$/.test(x.src)));
  assert.equal(core.fieldLabel("q", "ozan"), "Alıntı");
  assert.equal(core.fieldLabel("dl.0.1", "ozan"), "Bilgi 1 · Değer");
  assert.equal(core.fieldLabel("whatsapp", "telefon"), "WhatsApp numarası (ülke koduyla, örn. 905488390363)");
});
