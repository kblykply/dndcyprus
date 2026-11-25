const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const rows = [
  { createdAt: new Date("2026-11-25T15:30:00Z"), name: "Ayşe \"Yıldız\"", email: "a@example.test", phone: "+90 548 000 0000", project: "La Joya", message: "Satır 1\nSatır 2" },
  { createdAt: new Date("2026-10-01T09:00:00Z"), name: "=HYPERLINK(\"http://kotu\")", email: "b@example.test", subject: "+cmd" },
];

function harness(env = { RESEND_API_KEY: "test-key-never-real" }) {
  const requests = [];
  const m = loadTypeScript("lib/lead-backup.ts", {
    env,
    globals: { console: { error() {}, warn() {} }, fetch: async (url, init) => { requests.push({ url, headers: init.headers, body: JSON.parse(init.body) }); return Response.json({ id: "x" }); } },
  });
  return { ...m, requests };
}

test("backup CSV: BOM, semicolons, quoted cells, Excel formula injection neutralised", () => {
  const csv = harness().leadsToCsv(rows);
  assert.ok(csv.startsWith("﻿\"Tarih (Kıbrıs)\";\"Ad soyad\""));
  assert.ok(csv.includes("\"Ayşe \"\"Yıldız\"\"\""));
  assert.ok(csv.includes("\"Satır 1\nSatır 2\""));
  assert.ok(csv.includes("\"'=HYPERLINK(\"\"http://kotu\"\")\""));
  assert.ok(csv.includes("\"'+cmd\""));
  assert.equal(csv.trimEnd().split("\r\n").length, 3);
});

test("backup email: CSV attached, sent to info@, counts last 7 days, daily idempotency", async () => {
  const m = harness();
  assert.equal(await m.sendLeadBackup(rows, new Date("2026-11-30T06:00:00Z")), true);
  const r = m.requests[0];
  assert.deepEqual(r.body.to, ["info@dndcyprus.com"]);
  assert.equal(r.body.attachments[0].filename, "dndcyprus-talepler-2026-11-30.csv");
  assert.ok(Buffer.from(r.body.attachments[0].content, "base64").toString("utf8").includes("Ayşe"));
  assert.match(r.body.subject, /2 talep/);
  assert.ok(r.body.html.includes("HAFTALIK YEDEK"));
  assert.ok(r.body.text.includes("son 7 günde 1"));
  assert.equal(r.headers["Idempotency-Key"], "web-lead-backup-2026-11-30");
  assert.equal(await harness({}).sendLeadBackup(rows), null);
});
