const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const plain = value => JSON.parse(JSON.stringify(value));
const validLead = {
  name: "Test Customer",
  email: "customer@example.test",
  phone: "+90 555 000 0000",
  form: "lead",
  eventId: "11111111-1111-4111-8111-111111111111",
};

function apiHarness({ create } = {}) {
  const writes = [];
  const events = [];
  const deferred = [];
  const logs = [];
  const { POST } = loadTypeScript("app/api/contact/route.ts", {
    globals: {
      console: {
        warn: (...args) => logs.push(args),
        error: (...args) => logs.push(args),
      },
    },
    mocks: {
      "next/server": {
        NextResponse: { json: (body, init) => Response.json(body, init) },
        after: callback => deferred.push(callback),
      },
      "@/lib/prisma": {
        prisma: {
          contactMessage: {
            create: async args => {
              writes.push(plain(args));
              return create ? create(args, writes.length) : { id: 123 };
            },
          },
        },
      },
      "@/lib/meta-capi": {
        sendMetaLeadEvent: async event => events.push(plain(event)),
      },
    },
  });
  return {
    writes, events, deferred, logs,
    post: (body, { headers = {}, cookies = {}, malformed = false } = {}) => POST({
      json: async () => {
        if (malformed) throw new SyntaxError("Invalid JSON");
        return body;
      },
      headers: new Headers(headers),
      cookies: { get: name => cookies[name] ? { value: cookies[name] } : undefined },
    }),
  };
}

test("contact API rejects malformed bodies and invalid fields before storage or conversion", async t => {
  const cases = [
    ["malformed JSON", null, { malformed: true }],
    ["null body", null],
    ["array body", []],
    ["missing name", { ...validLead, name: " " }],
    ["invalid email", { ...validLead, email: "invalid" }],
    ["oversized email", { ...validLead, email: `${"a".repeat(250)}@example.test` }],
    ["no phone or message", { ...validLead, phone: "" }],
    ["unusable phone without message", { ...validLead, phone: "123" }],
  ];
  for (const [label, body, options] of cases) {
    await t.test(label, async () => {
      const api = apiHarness();
      const res = await api.post(body, options);
      assert.equal(res.status, 400);
      assert.equal(api.writes.length, 0);
      assert.equal(api.deferred.length, 0);
    });
  }
});

test("contact API honeypot succeeds silently without storing or measuring", async () => {
  const api = apiHarness();
  const res = await api.post({ ...validLead, company: "bot", consent: { ads: true } });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(api.writes.length, 0);
  assert.equal(api.deferred.length, 0);
});

test("contact API accepts a message-only contact and stores enriched sanitized lead fields", async () => {
  const api = apiHarness();
  const res = await api.post({
    ...validLead,
    name: "  Test Customer  ",
    email: " customer@example.test ",
    phone: "",
    project: " La Joya ",
    unitType: " 2+1 ",
    message: "Please send details",
    pageUrl: "https://www.dndcyprus.com/tr/la-joya?utm_source=google",
    attribution: {
      first: { utm_source: "newsletter", ts: 1700000000000 },
      current: {
        utm_source: " google ", utm_medium: "cpc", utm_campaign: "launch",
        utm_term: "personal@example.test", ignored: "not stored", ts: 1700000000001,
      },
    },
  });
  assert.equal(res.status, 200);
  assert.deepEqual(api.writes, [{
    data: {
      name: "Test Customer", email: "customer@example.test", phone: null,
      subject: "La Joya – Fiyat/Bilgi talebi", message: "Please send details",
      project: "La Joya", unitType: "2+1", form: "lead",
      source: "google / cpc", campaign: "launch",
      pageUrl: "https://www.dndcyprus.com/tr/la-joya?utm_source=google",
      eventId: validLead.eventId,
      attribution: {
        first: { ts: 1700000000000, utm_source: "newsletter" },
        last: null,
        current: { ts: 1700000000001, utm_source: "google", utm_medium: "cpc", utm_campaign: "launch" },
      },
    },
    select: { id: true },
  }]);
});

test("contact API supplies readable lead defaults and drops unsafe URL/event ID", async () => {
  const api = apiHarness();
  const res = await api.post({
    ...validLead, unitType: "2+1", name: "N".repeat(150),
    eventId: "<script>", pageUrl: "javascript:alert(1)", consent: { ads: true },
  });
  assert.equal(res.status, 200);
  const data = api.writes[0].data;
  assert.equal(data.name.length, 120);
  assert.equal(data.subject, "Web sitesi – Bilgi talebi");
  assert.equal(data.message, "Daire tipi: 2+1");
  assert.equal(data.pageUrl, null);
  assert.equal(data.eventId, null);
  assert.equal(api.deferred.length, 0);
});

test("contact API falls back to legacy columns when the migration has not run", async t => {
  for (const missingColumn of [
    { code: "P2022", message: "missing column" },
    { message: 'column "project" does not exist' },
    { message: "database error 42703" },
  ]) {
    await t.test(missingColumn.code || missingColumn.message, async () => {
      const api = apiHarness({ create: (_args, count) => {
        if (count === 1) throw missingColumn;
        return { id: 123 };
      } });
      const res = await api.post({ ...validLead, project: "La Joya", unitType: "2+1" });
      assert.equal(res.status, 200);
      assert.equal(api.writes.length, 2);
      assert.deepEqual(api.writes[1], {
        data: {
          name: validLead.name, email: validLead.email, phone: validLead.phone,
          subject: "La Joya – Fiyat/Bilgi talebi", message: "Daire tipi: 2+1",
        },
        select: { id: true },
      });
      assert.equal(api.logs.length, 1);
    });
  }
});

test("contact API reports database failures without logging customer data or scheduling conversion", async () => {
  const api = apiHarness({ create: () => {
    throw { code: "P1001", name: "DatabaseError", message: `Connection failed for ${validLead.email}` };
  } });
  const res = await api.post({ ...validLead, consent: { ads: true } });
  assert.equal(res.status, 500);
  assert.deepEqual(await res.json(), { error: "Server error" });
  assert.equal(api.writes.length, 1);
  assert.equal(api.deferred.length, 0);
  assert.equal(JSON.stringify(api.logs).includes(validLead.email), false);
});

test("contact API requires explicit advertising consent to schedule CAPI", async t => {
  for (const consent of [undefined, null, {}, { analytics: true }, { ads: false }, { ads: "true" }, { ads: 1 }]) {
    await t.test(JSON.stringify(consent) || "missing consent", async () => {
      const api = apiHarness();
      const res = await api.post({ ...validLead, consent });
      assert.equal(res.status, 200);
      assert.equal(api.writes.length, 1);
      assert.equal(api.deferred.length, 0);
    });
  }
});

test("contact API defers consented CAPI with the shared event ID until after the lead is saved", async () => {
  const api = apiHarness();
  const res = await api.post({
    ...validLead, project: "La Joya", pageUrl: "https://www.dndcyprus.com/en/la-joya",
    consent: { ads: true },
    attribution: { current: { fbclid: "fake-click-id", ts: 1700000000000 } },
  }, {
    headers: { "x-forwarded-for": "192.0.2.1, 192.0.2.2", "user-agent": "Test Browser" },
    cookies: { _fbp: "fb.1.1700000000000.fake-browser", _fbc: "invalid-cookie" },
  });
  assert.equal(res.status, 200);
  assert.equal(api.writes.length, 1);
  assert.equal(api.events.length, 0);
  assert.equal(api.deferred.length, 1);
  await api.deferred[0]();
  assert.deepEqual(api.events, [{
    eventId: validLead.eventId,
    eventSourceUrl: "https://www.dndcyprus.com/en/la-joya",
    email: validLead.email, phone: validLead.phone,
    clientIp: "192.0.2.1", userAgent: "Test Browser",
    fbp: "fb.1.1700000000000.fake-browser",
    fbclid: "fake-click-id", fbclidTs: 1700000000000,
    contentName: "La Joya", locale: "en",
  }]);
});
