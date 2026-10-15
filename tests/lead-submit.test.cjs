const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const plain = value => JSON.parse(JSON.stringify(value));
const payload = {
  name: "Test Customer", email: "customer@example.test", phone: "+905550000000",
  project: "La Joya", form: "lead",
};

function submitHarness({ consent, fetch, trackingThrows = false } = {}) {
  const requests = [];
  const tracking = [];
  const conversionData = [];
  const { submitLead } = loadTypeScript("lib/lead-submit.ts", {
    globals: {
      location: { origin: "https://www.dndcyprus.com", pathname: "/tr/la-joya", search: "?utm_source=google" },
      fetch: async (url, init) => {
        requests.push({ url, ...init, body: JSON.parse(init.body) });
        return fetch ? fetch() : Response.json({ ok: true });
      },
    },
    mocks: {
      "./analytics": {
        readConsent: () => consent,
        localeFromPath: () => "tr",
        setEnhancedConversionData: data => conversionData.push(plain(data)),
        track: (...args) => {
          tracking.push(plain(args));
          if (trackingThrows) throw new Error("Unavailable analytics");
        },
      },
      "./attribution": { getAttribution: () => ({ current: { utm_source: "google", ts: 1700000000000 } }) },
    },
  });
  return { submitLead, requests, tracking, conversionData };
}

test("submitLead ignores honeypot submissions before network or conversion", async () => {
  const client = submitHarness({ consent: { ads: true } });
  assert.deepEqual(plain(await client.submitLead({ ...payload, company: "bot" })), { ok: true });
  assert.equal(client.requests.length, 0);
  assert.equal(client.tracking.length, 0);
  assert.equal(client.conversionData.length, 0);
});

test("submitLead sends attribution and consent, then reuses the API event ID for the browser conversion", async () => {
  const client = submitHarness({ consent: { analytics: true, ads: true } });
  assert.deepEqual(plain(await client.submitLead(payload)), { ok: true });
  const request = client.requests[0];
  assert.equal(request.url, "/api/contact");
  assert.equal(request.method, "POST");
  assert.equal(request.body.pageUrl, "https://www.dndcyprus.com/tr/la-joya?utm_source=google");
  assert.deepEqual(request.body.consent, { analytics: true, ads: true });
  assert.equal(request.body.attribution.current.utm_source, "google");
  assert.match(request.body.eventId, /^[A-Za-z0-9-]{8,64}$/);
  assert.deepEqual(client.tracking, [[
    "generate_lead", { project: "La Joya", form: "lead" }, { eventId: request.body.eventId },
  ]]);
  assert.deepEqual(client.conversionData, [{ email: payload.email, phone: payload.phone, locale: "tr" }]);
});

test("submitLead sends denied flags and excludes enhanced conversion data without consent", async () => {
  const client = submitHarness();
  assert.equal((await client.submitLead(payload)).ok, true);
  assert.deepEqual(client.requests[0].body.consent, { analytics: false, ads: false });
  assert.equal(client.conversionData.length, 0);
});

test("submitLead never counts a failed request as a conversion", async t => {
  for (const [label, fetch, error] of [
    ["network failure", async () => { throw new Error("offline"); }, "network"],
    ["validation failure", async () => Response.json({ error: "Invalid email" }, { status: 400 }), "Invalid email"],
    ["non-JSON server failure", async () => new Response("Server unavailable", { status: 503 }), "server"],
  ]) {
    await t.test(label, async () => {
      const client = submitHarness({ fetch, consent: { ads: true } });
      assert.deepEqual(plain(await client.submitLead(payload)), { ok: false, error });
      assert.equal(client.tracking.length, 0);
      assert.equal(client.conversionData.length, 0);
    });
  }
});

test("submitLead preserves a successful form result when analytics fails", async () => {
  const client = submitHarness({ trackingThrows: true });
  assert.deepEqual(plain(await client.submitLead(payload)), { ok: true });
});
