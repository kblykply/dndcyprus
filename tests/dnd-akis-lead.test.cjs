const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const plain = value => JSON.parse(JSON.stringify(value));

const KEY = "test-key-never-a-real-secret";
const configuredEnv = {
  DND_AKIS_LEAD_URL: "https://takip.example.test/api/disari/lead",
  DND_AKIS_LEAD_ANAHTAR: KEY,
};
const lead = {
  name: "Test Customer",
  email: "customer@example.test",
  phone: "+90 555 000 00 00",
  project: "perla-ii",
  unitType: "2+1",
  form: "lead",
  pageUrl: "https://www.dndcyprus.com/ru/projects/perla-ii?utm_source=google",
  source: "google / cpc",
  campaign: "launch",
};

function harness({ env = configuredEnv, fetch, setTimeout: customSetTimeout } = {}) {
  const requests = [];
  const logs = [];
  const mod = loadTypeScript("lib/dnd-akis-lead.ts", {
    env,
    globals: {
      console: { warn: (...args) => logs.push(args) },
      ...(customSetTimeout ? { setTimeout: customSetTimeout } : {}),
      fetch: async (url, init) => {
        requests.push({ url, ...init, body: JSON.parse(init.body) });
        return fetch ? fetch(url, init) : Response.json({ ok: true, id: "kart-1", tekrar: false });
      },
    },
  });
  return { ...mod, requests, logs };
}

test("DND Akış forwarding stays off when the URL or key is missing", async t => {
  for (const env of [
    {},
    { DND_AKIS_LEAD_URL: configuredEnv.DND_AKIS_LEAD_URL },
    { DND_AKIS_LEAD_ANAHTAR: KEY },
    { ...configuredEnv, DND_AKIS_LEAD_ANAHTAR: "  " },
    { ...configuredEnv, DND_AKIS_LEAD_URL: " " },
  ]) {
    await t.test(Object.keys(env).join("+") || "empty", async () => {
      const h = harness({ env });
      assert.equal(h.dndAkisLeadConfigured(), false);
      assert.deepEqual(plain(await h.sendDndAkisLead(lead)), { skipped: true });
      assert.equal(h.requests.length, 0);
    });
  }
});

test("DND Akış key never travels over plain HTTP outside localhost", async () => {
  const h = harness({ env: { ...configuredEnv, DND_AKIS_LEAD_URL: "http://takip.example.test/api/disari/lead" } });
  assert.deepEqual(plain(await h.sendDndAkisLead(lead)), { skipped: true });
  await h.sendDndAkisLead(lead);
  assert.equal(h.requests.length, 0);
  assert.equal(h.logs.length, 1);
  assert.equal(JSON.stringify(h.logs).includes(KEY), false);

  const local = harness({ env: { ...configuredEnv, DND_AKIS_LEAD_URL: "http://localhost:3210/api/disari/lead" } });
  await local.sendDndAkisLead(lead);
  assert.equal(local.requests.length, 1);
});

test("DND Akış receives a server-side POST with the key header and the mapped project", async () => {
  const h = harness();
  const res = await h.sendDndAkisLead(lead);
  assert.deepEqual(plain(res), { ok: true, status: 200, id: "kart-1", repeat: false });
  assert.equal(h.requests.length, 1);
  const [r] = h.requests;
  assert.equal(r.url, configuredEnv.DND_AKIS_LEAD_URL);
  assert.equal(r.method, "POST");
  assert.deepEqual(plain(r.headers), { "Content-Type": "application/json", "x-dnd-anahtar": KEY });
  assert.deepEqual(r.body, {
    ad: "Test Customer",
    telefon: "+90 555 000 00 00",
    eposta: "customer@example.test",
    proje: "La Joya Perla II",
    kaynak: "web",
    dil: "ru",
    "Form türü": "Fiyat / kat planı talebi (proje sayfası)",
    "Daire tipi": "2+1",
    Sayfa: "/ru/projects/perla-ii",
    "Trafik kaynağı": "google / cpc",
    Kampanya: "launch",
  });
});

test("DND Akış project names match the site's projects by slug or name", () => {
  const h = harness();
  const cases = [
    ["neocity", "NeoCity"], ["lagoon-verde", "Lagoon Verde"], ["la-joya", "La Joya"],
    ["perla", "La Joya Perla"], ["perla-ii", "La Joya Perla II"],
    ["NeoCity", "NeoCity"], [" la joya perla ii ", "La Joya Perla II"], ["Mariachi Beach Club", "Mariachi Beach Club"],
    ["Bilinmeyen Proje", "Bilinmeyen Proje"], ["", ""], [undefined, ""],
  ];
  for (const [input, expected] of cases) assert.equal(h.dndAkisProjectName(input), expected, String(input));
});

test("DND Akış body omits empty fields and only sends the subject for the contact form", () => {
  const h = harness();
  const contact = plain(h.dndAkisLeadBody({
    name: " Ad ", email: "a@example.test", phone: "", project: "", subject: "Yatırım", message: " Merhaba ",
    form: "contact", pageUrl: "https://www.dndcyprus.com/contact", source: null, campaign: null,
  }));
  assert.deepEqual(contact, {
    ad: "Ad", eposta: "a@example.test", mesaj: "Merhaba", kaynak: "web", dil: "tr",
    "Form türü": "İletişim formu", Konu: "Yatırım", Sayfa: "/contact",
  });
  const home = plain(h.dndAkisLeadBody({ name: "Ad", email: "a@example.test", subject: "NeoCity", form: "home" }));
  assert.deepEqual(home, { ad: "Ad", eposta: "a@example.test", kaynak: "web", "Form türü": "Bilgi talebi" });
});

test("DND Akış errors and timeouts are logged without personal data and never throw", async t => {
  await t.test("401", async () => {
    const h = harness({ fetch: async () => Response.json({ hata: "yetkisiz" }, { status: 401 }) });
    assert.deepEqual(plain(await h.sendDndAkisLead(lead)), { ok: false, status: 401 });
    assert.deepEqual(plain(h.logs), [["DND_AKIS_LEAD_FAILED", { status: 401 }]]);
  });
  await t.test("network", async () => {
    const h = harness({ fetch: async () => { throw new TypeError("fetch failed customer@example.test"); } });
    assert.deepEqual(plain(await h.sendDndAkisLead(lead)), { ok: false, reason: "network" });
    assert.deepEqual(plain(h.logs), [["DND_AKIS_LEAD_FAILED", { reason: "network" }]]);
  });
  await t.test("timeout", async () => {
    const delays = [];
    const h = harness({
      setTimeout: (fn, ms) => { delays.push(ms); return setTimeout(fn, 0); },
      fetch: (_url, init) => new Promise((_resolve, reject) => {
        init.signal.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" })));
      }),
    });
    assert.deepEqual(plain(await h.sendDndAkisLead(lead)), { ok: false, reason: "timeout" });
    assert.deepEqual(delays, [10000]);
    assert.deepEqual(plain(h.logs), [["DND_AKIS_LEAD_FAILED", { reason: "timeout" }]]);
  });
});
