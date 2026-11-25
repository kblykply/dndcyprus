const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const m = loadTypeScript("lib/lead-stats.ts");
const J = (v) => JSON.parse(JSON.stringify(v));
const now = new Date("2026-11-25T18:00:00Z");
const L = (id, iso, status, source, extra = {}) => ({ id, createdAt: new Date(iso), name: "x", status, source, campaign: null, project: null, ...extra });
const leads = [
  L(1, "2026-11-25T15:00:00Z", "yeni", "facebook / paid", { campaign: "lagoon-kasim", project: "Lagoon Verde", attribution: { last: { utm_source: "facebook", utm_campaign: "lagoon-kasim", utm_content: "video-1", ts: 1 } } }),
  L(2, "2026-11-24T21:59:00Z", "gorusuluyor", "google / cpc", { project: "NeoCity", attribution: { current: { gclid: "abc", utm_term: "kıbrıs villa", landing: "/tr/neocity", ts: 1 } } }),
  L(3, "2026-11-10T10:00:00Z", "satis", "facebook / paid", { campaign: "lagoon-kasim", project: "Lagoon Verde" }),
  L(4, "2026-10-20T10:00:00Z", "olumsuz", "(direct) / (none)", { pageUrl: "https://www.dndcyprus.com/tr/contact" }),
  L(5, "2025-12-11T11:34:00Z", "yeni", null),
];

test("period buckets: 30 days daily (Cyprus days), 12 months monthly, all-time from first month", () => {
  const d = m.periodBuckets("30g", now, leads);
  assert.equal(d.granularity, "day");
  assert.equal(d.keys.length, 30);
  assert.equal(d.keys[29].key, "2026-11-25");
  const counts = m.bucketCounts(m.inRange(leads, d.from), d);
  // Kasımda Kıbrıs UTC+2: 24 Kasım 21:59 UTC = 23:59 Kıbrıs → 24 Kasım kovası
  assert.equal(counts[29].count, 1);
  assert.equal(counts[28].count, 1);
  assert.equal(counts.reduce((s, c) => s + c.count, 0), 3);
  const y = m.periodBuckets("12a", now, leads);
  assert.equal(y.keys.length, 12);
  assert.equal(y.keys[11].key, "2026-11");
  assert.equal(y.keys[0].key, "2025-12");
  assert.equal(m.bucketCounts(m.inRange(leads, y.from), y)[0].count, 1);
  const a = m.periodBuckets("tumu", now, leads);
  assert.equal(a.from, null);
  assert.equal(a.keys.length, 12);
  assert.equal(m.overviewPeriod("uydurma"), "12a");
});

test("grouping with qualified/sold/lost and ad dimensions from attribution", () => {
  const ch = J(m.groupLeads(leads, (l) => ({ key: l.source ? "s" + l.source.length : "none", label: l.source || "-" })));
  assert.equal(ch.length, 4);
  const camp = J(m.groupLeads(leads, (l) => m.adKey("kampanya", l)));
  assert.deepEqual(camp, [{ key: "lagoon-kasim", label: "lagoon-kasim", count: 2, qualified: 1, sold: 1, lost: 0 }]);
  assert.equal(m.adKey("reklam", leads[0]).label, "video-1");
  assert.equal(m.adKey("kelime", leads[1]).label, "kıbrıs villa");
  assert.equal(m.adKey("sayfa", leads[1]).label, "/tr/neocity");
  assert.equal(m.adKey("sayfa", leads[3]).label, "/tr/contact");
  assert.equal(m.adKey("proje", leads[4]).label, "Proje seçilmemiş");
  assert.equal(m.adKey("kanal", leads[0]).label, "Meta reklam");
});

test("change percentage and nice axis ticks", () => {
  assert.equal(m.changePct(15, 10), 50);
  assert.equal(m.changePct(5, 0), null);
  assert.deepEqual(J(m.niceTicks(7)), { top: 8, ticks: [0, 2, 4, 6, 8] });
  assert.deepEqual(J(m.niceTicks(0)), { top: 4, ticks: [0, 1, 2, 3, 4] });
  assert.equal(m.niceTicks(23).top >= 23, true);
});
