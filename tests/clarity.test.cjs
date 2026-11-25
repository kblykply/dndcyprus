const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const U = "https://www.dndcyprus.com/tr";
const L = "https://www.dndcyprus.com/tr/lagoon-verde";
// Clarity dışa aktarma yanıt biçimi (belgedeki örneğe göre; sayılar metin olarak da gelebilir)
const day1 = [
  { metricName: "Traffic", information: [{ totalSessionCount: "100", totalBotSessionCount: "20", distinctUserCount: "80", URL: U }, { totalSessionCount: "50", totalBotSessionCount: "0", URL: L }] },
  { metricName: "ScrollDepth", information: [{ averageScrollDepth: 40, URL: U }, { averageScrollDepth: 70, URL: L }] },
  { metricName: "RageClickCount", information: [{ sessionsCount: "100", sessionsWithMetricPercentage: 10, subTotal: "12", URL: U }] },
  { metricName: "DeadClickCount", information: [{ sessionsCount: "50", sessionsWithMetricPercentage: 20, subTotal: "15", URL: L }] },
  { metricName: "QuickbackClick", information: [{ sessionsCount: "100", sessionsWithMetricPercentage: 5, subTotal: "6", URL: U }] },
];
const day2 = [
  { metricName: "Traffic", information: [{ totalSessionCount: "100", URL: U }] },
  { metricName: "ScrollDepth", information: [{ averageScrollDepth: 60, URL: U }] },
];

test("aggregate across days with session-weighted percentages", () => {
  const m = loadTypeScript("lib/clarity.ts");
  const rows = JSON.parse(JSON.stringify(m.clarityAggregate([day1, day2], "URL")));
  assert.equal(rows.length, 2);
  const home = rows.find((r) => r.value === U);
  assert.equal(home.sessions, 200);
  assert.equal(home.bots, 20);
  assert.equal(m.weighted(home.scrollW, home.sessions), 50); // (40×100 + 60×100) / 200
  assert.equal(home.rage, 12);
  assert.equal(m.weighted(home.rageW, home.sessions), 5); // %10 × 100 oturum / 200
  const lv = rows.find((r) => r.value === L);
  assert.equal(m.weighted(lv.deadW, lv.sessions), 20);
  const t = m.clarityTotals(m.clarityAggregate([day1, day2], "URL"));
  assert.equal(t.sessions, 250);
  assert.equal(m.weighted(0, 0), null);
});

test("links and fetch errors in Turkish; no token means no request", async () => {
  let calls = 0;
  const m = loadTypeScript("lib/clarity.ts", { env: { NEXT_PUBLIC_CLARITY_ID: "yj9g0labqq" }, globals: { fetch: async () => { calls++; return new Response("", { status: 429 }); } } });
  assert.equal(m.clarityConfigured(), false);
  assert.equal((await m.clarityFetch("URL")).ok, false);
  assert.equal(calls, 0);
  assert.ok(m.clarityLink("heatmaps", { url: U, days: 30 }).startsWith("https://clarity.microsoft.com/projects/view/yj9g0labqq/heatmaps?"));
  assert.ok(m.clarityLink("heatmaps", { url: U, days: 30 }).includes("url=" + encodeURIComponent(U)));
  const withToken = loadTypeScript("lib/clarity.ts", { env: { CLARITY_API_TOKEN: "deneme" }, globals: { fetch: async (url, init) => { calls++; assert.ok(String(url).includes("numOfDays=1&dimension1=URL")); assert.equal(init.headers.Authorization, "Bearer deneme"); return new Response("", { status: 429 }); } } });
  const r = await withToken.clarityFetch("URL", 1);
  assert.equal(r.ok, false);
  assert.equal(r.status, 429);
  assert.match(r.error, /günlük sorgu sınırı/);
});
