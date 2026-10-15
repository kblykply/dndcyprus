const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const configuredEnv = {
  NEXT_PUBLIC_META_PIXEL_ID: "1234567890",
  META_CAPI_TOKEN: "test-token-never-a-real-secret",
  META_GRAPH_API_VERSION: "v26.0",
};
const lead = {
  eventId: "11111111-1111-4111-8111-111111111111",
  email: " CUSTOMER@EXAMPLE.TEST ",
  phone: "0555 000 00 00",
  locale: "tr",
  eventSourceUrl: "https://www.dndcyprus.com/tr/la-joya",
};
const hash = value => createHash("sha256").update(value).digest("hex");

function capiHarness({ env = configuredEnv, fetch } = {}) {
  const requests = [];
  const logs = [];
  const capi = loadTypeScript("lib/meta-capi.ts", {
    env,
    globals: {
      console: { warn: (...args) => logs.push(args) },
      fetch: async (url, init) => {
        requests.push({ url, ...init, body: JSON.parse(init.body) });
        return fetch ? fetch(url, init) : Response.json({ events_received: 1 });
      },
    },
  });
  return { ...capi, requests, logs };
}

test("CAPI stays disabled when the pixel, token or valid API version is missing", async t => {
  for (const env of [
    {},
    { ...configuredEnv, META_CAPI_TOKEN: " " },
    { ...configuredEnv, NEXT_PUBLIC_META_PIXEL_ID: "" },
    { ...configuredEnv, NEXT_PUBLIC_META_PIXEL_ID: "not-a-pixel" },
    { ...configuredEnv, META_GRAPH_API_VERSION: "" },
    { ...configuredEnv, META_GRAPH_API_VERSION: "../../other-endpoint" },
  ]) {
    await t.test(JSON.stringify(env), async () => {
      const capi = capiHarness({ env });
      await capi.sendMetaLeadEvent(lead);
      assert.equal(capi.requests.length, 0);
    });
  }
});

test("CAPI hashes normalized customer identifiers and shares the Pixel event ID", async () => {
  const capi = capiHarness();
  assert.equal(capi.metaCapiConfigured(), true);
  await capi.sendMetaLeadEvent({
    ...lead, fbclid: "fake-click-id", fbclidTs: 1700000000000,
    fbp: "fb.1.1700000000000.fake-browser", contentName: "La Joya",
    clientIp: "192.0.2.1", userAgent: "Test Browser",
  });
  assert.equal(capi.requests.length, 1);
  const request = capi.requests[0];
  assert.equal(request.url, "https://graph.facebook.com/v26.0/1234567890/events");
  assert.equal(request.method, "POST");
  assert.equal(request.cache, "no-store");
  assert.equal(request.body.access_token, configuredEnv.META_CAPI_TOKEN);
  assert.equal(Object.hasOwn(request.body, "test_event_code"), false);
  const event = request.body.data[0];
  assert.equal(event.event_name, "Lead");
  assert.equal(event.event_id, lead.eventId);
  assert.equal(event.action_source, "website");
  assert.equal(event.event_source_url, lead.eventSourceUrl);
  assert.ok(Math.abs(event.event_time - Math.floor(Date.now() / 1000)) < 5);
  assert.deepEqual(event.user_data, {
    em: [hash("customer@example.test")],
    ph: [hash("905550000000")],
    client_ip_address: "192.0.2.1", client_user_agent: "Test Browser",
    fbp: "fb.1.1700000000000.fake-browser", fbc: "fb.1.1700000000000.fake-click-id",
  });
  assert.deepEqual(event.custom_data, { content_name: "La Joya" });
  assert.equal(JSON.stringify(event).includes("CUSTOMER@EXAMPLE.TEST"), false);
  assert.equal(JSON.stringify(event).includes(lead.phone), false);
});

test("CAPI uses an existing click cookie and includes test code only when explicitly configured", async () => {
  const capi = capiHarness({ env: { ...configuredEnv, META_TEST_EVENT_CODE: " TEST123 " } });
  await capi.sendMetaLeadEvent({ ...lead, fbc: "fb.1.1700000000000.existing", fbclid: "other" });
  assert.equal(capi.requests[0].body.test_event_code, "TEST123");
  assert.equal(capi.requests[0].body.data[0].user_data.fbc, "fb.1.1700000000000.existing");
});

test("CAPI failures are contained and do not log tokens or customer identifiers", async t => {
  for (const [label, fetch] of [
    ["HTTP error", async () => Response.json({
      error: { code: 190, error_subcode: 463, message: `${configuredEnv.META_CAPI_TOKEN} ${lead.email}` },
    }, { status: 400 })],
    ["network error", async () => { throw new Error(`${configuredEnv.META_CAPI_TOKEN} ${lead.email}`); }],
  ]) {
    await t.test(label, async () => {
      const capi = capiHarness({ fetch });
      await assert.doesNotReject(() => capi.sendMetaLeadEvent(lead));
      assert.equal(capi.logs.length, 1);
      const output = JSON.stringify(capi.logs);
      assert.equal(output.includes(configuredEnv.META_CAPI_TOKEN), false);
      assert.equal(output.includes(lead.email), false);
    });
  }
});
