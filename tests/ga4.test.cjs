const assert = require("node:assert/strict");
const test = require("node:test");
const crypto = require("node:crypto");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

// Testte üretilen geçici RSA anahtarı (gerçek hesap değil)
const { privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const key = JSON.stringify({ client_email: "okuyucu@test-proje.iam.gserviceaccount.com", private_key: privateKey.export({ type: "pkcs8", format: "pem" }) });

function harness(env, respond) {
  const calls = [];
  const m = loadTypeScript("lib/ga4.ts", {
    env,
    globals: {
      Buffer,
      fetch: async (url, init) => {
        calls.push({ url: String(url), init });
        if (String(url).includes("oauth2")) return Response.json({ access_token: "erisim-test", expires_in: 3600 });
        return respond(String(url), JSON.parse(init.body));
      },
    },
  });
  return { m, calls };
}

test("not configured without key or property id", async () => {
  const { m, calls } = harness({}, () => Response.json({}));
  assert.equal(m.ga4Configured(), false);
  const r = await m.ga4Report({ metrics: [{ name: "sessions" }] });
  assert.equal(r.ok, false);
  assert.equal(r.notConfigured, true);
  assert.equal(calls.length, 0);
  assert.equal(harness({ GA4_SERVICE_ACCOUNT_JSON: "bozuk", GA4_PROPERTY_ID: "1" }, () => Response.json({})).m.ga4Configured(), false);
});

test("signed JWT exchange, report parsing, caching and Turkish permission error", async () => {
  const env = { GA4_SERVICE_ACCOUNT_JSON: key, GA4_PROPERTY_ID: "properties/419770616" };
  const { m, calls } = harness(env, (url, body) => {
    assert.ok(url.endsWith("/properties/419770616:runReport"));
    return Response.json({ rows: [{ dimensionValues: [{ value: "20261125" }], metricValues: [{ value: "12" }] }], totals: [{ metricValues: [{ value: "12" }] }] });
  });
  assert.equal(m.ga4Configured(), true);
  assert.equal(m.ga4ServiceEmail(), "okuyucu@test-proje.iam.gserviceaccount.com");
  const body = { dateRanges: [{ startDate: "29daysAgo", endDate: "today" }], dimensions: [{ name: "date" }], metrics: [{ name: "sessions" }] };
  const r = await m.ga4Report(body);
  assert.equal(r.ok, true);
  assert.equal(JSON.stringify(r.data), JSON.stringify({ rows: [{ dims: ["20261125"], vals: [12] }], totals: [12] }));
  const tokenCall = calls.find((c) => c.url.includes("oauth2"));
  const assertion = new URLSearchParams(tokenCall.init.body).get("assertion");
  const payload = JSON.parse(Buffer.from(assertion.split(".")[1], "base64url").toString());
  assert.equal(payload.scope, "https://www.googleapis.com/auth/analytics.readonly");
  assert.equal(calls.find((c) => c.url.includes("analyticsdata")).init.headers.Authorization, "Bearer erisim-test");
  await m.ga4Report(body); // önbellekten
  assert.equal(calls.filter((c) => c.url.includes("analyticsdata")).length, 1);

  const denied = harness(env, () => Response.json({ error: { status: "PERMISSION_DENIED", message: "User does not have sufficient permissions" } }));
  const d = await denied.m.ga4Report({ metrics: [{ name: "sessions" }] });
  assert.equal(d.ok, false);
  assert.equal(d.error, "Servis hesabının bu GA4 mülkünde okuma izni yok.");
});

test("time keys and ranges", () => {
  const { m } = harness({}, () => Response.json({}));
  assert.equal(m.ga4TimeKey("20261125"), "2026-11-25");
  assert.equal(m.ga4TimeKey("202611"), "2026-11");
  assert.equal(m.ga4Range("30g").timeDim, "date");
  assert.equal(m.ga4Range("12a").timeDim, "yearMonth");
});
