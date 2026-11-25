const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const lead = {
  name: "Ayşe <script>alert(1)</script> Yılmaz",
  email: "ayse@example.test",
  phone: "+90 548 000 0000",
  project: "La Joya Perla II",
  unitType: "2+1",
  message: "Merhaba & iyi günler",
  form: "lead",
  pageUrl: "https://www.dndcyprus.com/tr/perla-ii",
  source: "facebook / paid_social",
  campaign: "lagoon_bf",
  eventId: "11111111-1111-4111-8111-111111111111",
  receivedAt: new Date("2026-11-25T15:30:00Z"),
};

function harness(env = { RESEND_API_KEY: "test-key-never-real" }, respond) {
  const requests = [];
  const logs = [];
  const mod = loadTypeScript("lib/lead-email.ts", {
    env,
    globals: {
      console: { error: (...a) => logs.push(a), warn: (...a) => logs.push(a) },
      fetch: async (url, init) => {
        requests.push({ url, headers: init.headers, body: JSON.parse(init.body) });
        return respond ? respond() : Response.json({ id: "email-1" });
      },
    },
  });
  return { ...mod, requests, logs };
}

test("lead email: escapes visitor text, uses corporate shell and action links", () => {
  const m = harness();
  const html = m.leadEmailHtml(lead);
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("Ayşe &lt;script&gt;"));
  assert.ok(html.includes("Merhaba &amp; iyi günler"));
  assert.ok(html.includes("/eposta/dnd-logo.png"));
  assert.ok(html.includes("WEB SİTESİ TALEBİ"));
  assert.ok(html.includes("tel:+905480000000"));
  assert.ok(html.includes("https://wa.me/905480000000"));
  assert.ok(html.includes("/admin/leads"));
  assert.ok(html.includes("Türkçe"));
  assert.equal(m.leadEmailSubject(lead), "Yeni web talebi: Ayşe <script>alert(1)</script> Yılmaz · La Joya Perla II · 2+1");
});

test("lead email: sends to info@ with reply-to visitor and idempotency key", async () => {
  const m = harness();
  assert.equal(m.leadEmailConfigured(), true);
  assert.equal(await m.sendLeadEmail(lead), true);
  assert.equal(m.requests.length, 1);
  const r = m.requests[0];
  assert.equal(r.url, "https://api.resend.com/emails");
  assert.deepEqual(r.body.to, ["info@dndcyprus.com"]);
  assert.equal(r.body.reply_to, "ayse@example.test");
  assert.match(r.body.from, /takip\.dndcyprus\.com/);
  assert.equal(r.headers["Idempotency-Key"], `web-lead-${lead.eventId}`);
  assert.ok(r.body.text.includes("Proje: La Joya Perla II"));
});

test("lead email: no key → nothing sent; provider error → false without leaking data", async () => {
  const off = harness({});
  assert.equal(off.leadEmailConfigured(), false);
  assert.equal(await off.sendLeadEmail(lead), null);
  assert.equal(off.requests.length, 0);
  const bad = harness(undefined, () => new Response("nope", { status: 422 }));
  assert.equal(await bad.sendLeadEmail(lead), false);
  assert.equal(JSON.stringify(bad.logs).includes("ayse@"), false);
});
