const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const m = loadTypeScript("lib/lead-status.ts");

test("source groups: Meta/Google paid vs organic, direct, manual channels, unknown", () => {
  const g = (s) => m.sourceGroup(s).label;
  assert.equal(g("facebook / paid"), "Meta reklam");
  assert.equal(g("ig / paid_social"), "Meta reklam");
  assert.equal(g("facebook / fbclid"), "Meta reklam");
  assert.equal(g("instagram / social"), "Instagram");
  assert.equal(g("l.instagram.com / referral"), "Instagram");
  assert.equal(g("google / cpc"), "Google Ads");
  assert.equal(g("google / organic"), "Google arama");
  assert.equal(g("(direct) / (none)"), "Doğrudan");
  assert.equal(g("bing / organic"), "Arama motoru");
  assert.equal(g("telefon / manuel"), "Telefon");
  assert.equal(g("ofis / manuel"), "Ofis ziyareti");
  assert.equal(g("instagram / manuel"), "Instagram");
  assert.equal(g(null), "Bilinmiyor");
  assert.equal(m.manualChannel("ofis / manuel"), "ofis");
  assert.equal(m.manualChannel("google / cpc"), null);
});

const leads = [
  { id: 1, createdAt: new Date("2026-11-25T15:44:00Z"), name: "Ayşe Işık", email: "ayse@example.test", phone: "+90 533 812 45 67", project: "Lagoon Verde", source: "facebook / paid", status: "yeni" },
  { id: 2, createdAt: new Date("2026-11-01T09:00:00Z"), name: "Mehmet Kaya", email: "m@example.test", phone: "05488520287", project: "La Joya", source: "google / cpc", status: "arandi" },
  { id: 3, createdAt: new Date("2026-10-30T21:59:00Z"), name: "Anna", email: "a@example.test", phone: null, project: null, source: null, status: "satis" },
  { id: 4, createdAt: new Date("2025-12-11T11:34:00Z"), name: "Korhan", email: "k@example.test", phone: "05338443596", project: null, source: null, status: "yeni" },
];
const now = new Date("2026-11-25T18:00:00Z");

test("filters: status, Turkish-insensitive search, phone digits, project, source group, period", () => {
  const ids = (f) => [...m.filterLeads(leads, f, now).map((l) => l.id)];
  assert.deepEqual(ids({ durum: "yeni" }), [1, 4]);
  assert.deepEqual(ids({ q: "isik" }), [1]);
  assert.deepEqual(ids({ q: "AYŞE" }), [1]);
  assert.deepEqual(ids({ q: "8520" }), [2]);
  assert.deepEqual(ids({ proje: "La Joya" }), [2]);
  assert.deepEqual(ids({ proje: "-" }), [3, 4]);
  assert.deepEqual(ids({ kaynak: "meta-reklam" }), [1]);
  assert.deepEqual(ids({ donem: "30g" }), [1, 2, 3]);
  // Bu ay: Kıbrıs saatiyle 1 Kasım 00:00 = 31 Ekim 22:00 UTC; 30 Ekim 21:59 UTC dahil değil
  assert.deepEqual(ids({ donem: "bu-ay" }), [1, 2]);
  assert.equal(JSON.stringify(m.statusCounts(leads)), JSON.stringify({ tumu: 4, yeni: 2, arandi: 1, gorusuluyor: 0, satis: 1, olumsuz: 0 }));
});

test("summary cards", () => {
  const s = m.leadSummary(leads, now);
  assert.equal(s.total, 4);
  assert.equal(s.thisMonth, 2);
  assert.equal(s.lastMonth, 1);
  assert.equal(s.waiting, 2);
  assert.equal(s.oldestWaitingDays, 349);
  assert.equal(s.talked, 1);
  assert.equal(s.sold, 1);
  assert.equal(s.monthly.length, 7);
  assert.equal(s.monthly[6], 2);
  assert.equal(JSON.stringify(s.topProject), JSON.stringify(["Lagoon Verde", 1]));
});

test("WhatsApp/tel numbers", () => {
  assert.equal(m.waNumber("05488520287"), "905488520287");
  assert.equal(m.waNumber("5338722333"), "905338722333");
  assert.equal(m.waNumber("+44 7403 449953"), "447403449953");
  assert.equal(m.waNumber("0044 7403 449953"), "447403449953");
  assert.equal(m.waNumber("123"), "");
  assert.equal(m.telHref("+90 533 812 45 67"), "tel:+905338124567");
  assert.equal(m.telHref("05488520287"), "tel:+905488520287");
});

test("panel form validation and Cyprus local time", () => {
  const form = (o) => (k) => String(o[k] ?? "");
  assert.equal(m.parseLeadForm(form({})).ok, false);
  assert.equal(m.parseLeadForm(form({ name: "A" })).error, "Telefon ya da e-posta gerekli.");
  assert.equal(m.parseLeadForm(form({ name: "A", email: "kotu" })).error, "E-posta adresi geçersiz.");
  assert.equal(m.parseLeadForm(form({ name: "A", phone: "12", email: "" })).ok, false);
  const ok = m.parseLeadForm(form({ name: " Ali ", phone: "0533 111 22 33", status: "uydurma", channel: "ofis", createdAt: "2026-11-25T17:44" }));
  assert.equal(ok.ok, true);
  assert.equal(ok.value.name, "Ali");
  assert.equal(ok.value.status, "yeni");
  assert.equal(ok.value.channel, "ofis");
  assert.equal(ok.value.createdAt.toISOString(), "2026-11-25T15:44:00.000Z"); // Kasım: UTC+2
  assert.equal(m.cyprusLocalToUtc("2026-07-10T12:00").toISOString(), "2026-07-10T09:00:00.000Z"); // yaz: UTC+3
  assert.equal(m.utcToCyprusLocal(new Date("2026-11-25T15:44:00Z")), "2026-11-25T17:44");
  assert.equal(m.parseLeadForm(form({ name: "A", phone: "05331112233", createdAt: "dün" })).error, "Talep tarihi geçersiz.");
});
