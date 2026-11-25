const assert = require("node:assert/strict");
const test = require("node:test");
const React = require("react");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const m = loadTypeScript("lib/content/core.ts");
const h = React.createElement;
const title = h(React.Fragment, null, "Akdeniz’de yeni bir ", h("b", null, "yaşam ritmi."));
const base = {
  slug: "lagoon-verde",
  kicker: "Neden DND",
  title,
  lead: "x".repeat(100),
  items: [{ icon: "key", h: "Zamanında teslim", p: "La Joya teslim edildi." }],
  more: ["Bir", "İki"],
  n: 120,
  img: "/azure/lv-6m.jpg",
  ribbon: "https://abc.public.blob.vercel-storage.com/rozet.png",
};

test("fields: kinds, skipped technical keys, markup for JSX titles", () => {
  const f = Object.fromEntries(m.walkFields(base).map((x) => [x.path, x]));
  assert.equal(f.slug, undefined);
  assert.equal(f["items.0.icon"], undefined);
  assert.equal(f.kicker.kind, "text");
  assert.equal(f.lead.kind, "long");
  assert.equal(f.title.kind, "rich");
  assert.equal(f.title.value, "Akdeniz’de yeni bir **yaşam ritmi.**");
  assert.equal(f["items.0.h"].value, "Zamanında teslim");
  assert.equal(f["more.1"].value, "İki");
  assert.equal(f.n.kind, "number");
  assert.equal(f.img.kind, "image");
  assert.equal(f.ribbon.kind, "image");
});

test("markup round-trip with bold and line breaks", () => {
  const el = m.fromMarkup("Birinci **kalın**\nikinci satır");
  assert.equal(m.toMarkup(el), "Birinci **kalın**\nikinci satır");
  assert.equal(m.toMarkup(m.fromMarkup("düz")), "düz");
});

test("apply overrides: typed values, JSX rebuilt, missing paths ignored, base untouched", () => {
  const out = m.applyOverrides(base, { "title": "Yeni **başlık**", "n": "150", "items.0.h": "Teslim", "yok.burada": "x", "items": "dizi değiştirilemez", "more.5": "yok" });
  assert.equal(m.toMarkup(out.title), "Yeni **başlık**");
  assert.equal(React.isValidElement(out.title), true);
  assert.equal(out.n, 150);
  assert.equal(out.items[0].h, "Teslim");
  assert.equal(out.items[0].icon, "key");
  assert.equal(Array.isArray(out.items), true);
  assert.equal(out.more.length, 2);
  assert.equal(base.items[0].h, "Zamanında teslim");
  assert.equal(m.toMarkup(base.title), "Akdeniz’de yeni bir **yaşam ritmi.**");
});

test("Turkish field labels from paths", () => {
  assert.equal(m.fieldLabel("items.1.h"), "Madde 2 · Kart başlığı");
  assert.equal(m.fieldLabel("title"), "Başlık");
  assert.equal(m.fieldLabel("tl.k"), "TL kartı · Etiket");
  assert.equal(m.fieldLabel("more.0"), "Ek paragraf 1");
});
