const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const J = (v) => JSON.parse(JSON.stringify(v));
const noMail = { leadEmailConfigured: () => false, sendLeadEmail: async () => null };
const noAkis = { dndAkisLeadConfigured: () => false, sendDndAkisLead: async () => ({ ok: true, status: 200 }) };

function fakePrisma(existing = []) {
  const rows = existing.map((r, i) => ({ id: i + 1, email: "", phone: null, eventId: null, ...r }));
  const notes = [];
  let state = null;
  const match = (r, where) => {
    if (where.eventId) return r.eventId === where.eventId;
    if (where.OR) return where.OR.some((c) => (c.email ? r.email.toLowerCase() === c.email.equals.toLowerCase() : c.phone ? String(r.phone || "").endsWith(c.phone.endsWith) : false));
    return true;
  };
  return {
    rows, notes, get state() { return state; },
    prisma: {
      syncState: {
        findUnique: async () => (state ? { key: "meta-leads", data: state } : null),
        upsert: async ({ create }) => { state = J(create.data); return {}; },
      },
      contactMessage: {
        findFirst: async ({ where }) => rows.find((r) => match(r, where)) ?? null,
        findMany: async ({ where }) => (where.OR.length ? rows.filter((r) => match(r, where)) : []),
        create: async ({ data }) => { const r = { id: rows.length + 1, ...data }; rows.push(r); return { id: r.id }; },
      },
      leadNote: { create: async ({ data }) => { notes.push(data); return {}; } },
    },
  };
}

function graphFetch(leadsByForm, calls = []) {
  return async (url, init) => {
    const u = new URL(String(url));
    calls.push({ path: u.pathname, auth: init?.headers?.Authorization, filtering: u.searchParams.get("filtering") });
    if (u.pathname.endsWith("/me/accounts")) return Response.json({ data: [{ id: "111", name: "DND Cyprus", access_token: "sayfa-anahtari" }] });
    if (u.pathname.endsWith("/111/leadgen_forms")) return Response.json({ data: [{ id: "f1", name: "NeoCity Villa Formu" }, { id: "f2", name: "Lagoon Verde - Kasım" }] });
    const m = u.pathname.match(/\/(f\d)\/leads$/);
    if (m) return Response.json({ data: leadsByForm[m[1]] ?? [] });
    return Response.json({ error: { message: "bilinmeyen", code: 100 } }, { status: 400 });
  };
}

const lead = (id, iso, fields, extra = {}) => ({ id, created_time: iso, field_data: Object.entries(fields).map(([name, v]) => ({ name, values: [v] })), ...extra });

test("projectOf finds the project in form / campaign / ad names", () => {
  const m = loadTypeScript("lib/meta-leads.ts", { mocks: { "@/lib/prisma": {}, "@/lib/lead-email": noMail, "@/lib/dnd-akis-lead": noAkis } });
  assert.equal(m.projectOf("NEOCITY İkiz Villa"), "NeoCity");
  assert.equal(m.projectOf(undefined, "Lagoon_kasim_2026"), "Lagoon Verde");
  assert.equal(m.projectOf("La Joya Perla II form"), "La Joya Perla II");
  assert.equal(m.projectOf("Perla 2 lansman"), "La Joya Perla II");
  assert.equal(m.projectOf("La Joya Perla"), "La Joya Perla");
  assert.equal(m.projectOf("LaJoya Sahil"), "La Joya");
  assert.equal(m.projectOf("Genel form"), null);
});

test("mapMetaLead turns Meta fields into a panel lead with answers and ad attribution", () => {
  const m = loadTypeScript("lib/meta-leads.ts", { mocks: { "@/lib/prisma": {}, "@/lib/lead-email": noMail, "@/lib/dnd-akis-lead": noAkis } });
  const v = J(m.mapMetaLead(lead("L1", "2026-11-26T08:00:00+0000", { full_name: "Ayşe Yılmaz", email: " Ayse@Example.com ", phone_number: "+90 533 123 45 67", "hangi_daire_tipini_düşünüyorsunuz?": "İkiz Villa", butce: "£150.000+" }, { platform: "ig", campaign_name: "NeoCity Kasım", ad_name: "Video 1", adset_name: "UK 35+" }), "Genel Form"));
  assert.equal(v.name, "Ayşe Yılmaz");
  assert.equal(v.email, "ayse@example.com");
  assert.equal(v.phone, "+905331234567");
  assert.equal(v.project, "NeoCity");
  assert.equal(v.form, "meta-lead");
  assert.equal(v.source, "instagram / paid");
  assert.equal(v.campaign, "NeoCity Kasım");
  assert.equal(v.eventId, "meta-lead:L1");
  assert.equal(v.subject, "Meta reklam formu · Genel Form");
  assert.equal(v.message, "Hangi daire tipini düşünüyorsunuz?: İkiz Villa\nButce: £150.000+");
  assert.equal(v.attribution.first.utm_source, "instagram");
  assert.equal(v.attribution.first.utm_content, "Video 1");
  assert.equal(v.attribution.first.ts, Date.parse("2026-11-26T08:00:00Z"));
  const fb = J(m.mapMetaLead(lead("L2", "2026-11-26T08:00:00+0000", { first_name: "John", last_name: "Smith" }, { platform: "fb", is_organic: true }), "Form"));
  assert.equal(fb.name, "John Smith");
  assert.equal(fb.source, "facebook / organic");
  assert.equal(fb.phone, null);
});

test("phoneKey ignores country code and leading zero", () => {
  const m = loadTypeScript("lib/meta-leads.ts", { mocks: { "@/lib/prisma": {}, "@/lib/lead-email": noMail, "@/lib/dnd-akis-lead": noAkis } });
  assert.equal(m.phoneKey("+90 533 123 45 67"), m.phoneKey("0533 123 45 67"));
  assert.equal(m.phoneKey("+447700900123"), "7700900123");
  assert.equal(m.phoneKey("123"), "");
  assert.equal(m.phoneKey(null), "");
});

test("sync inserts new leads once, merges a known phone into a note, and is idempotent", async () => {
  const db = fakePrisma([{ name: "Eski Müşteri", email: "eski@example.com", phone: "05331112233" }]);
  const calls = [];
  const leadsByForm = {
    f1: [lead("A1", new Date(Date.now() - 3600_000).toISOString(), { full_name: "Yeni Kişi", email: "yeni@example.com", phone_number: "+447700900123" }, { platform: "fb", campaign_name: "NeoCity" })],
    f2: [lead("B1", new Date(Date.now() - 7200_000).toISOString(), { full_name: "Eski Müşteri", phone_number: "+90 533 111 22 33", soru: "Kat planı" }, { platform: "ig" })],
  };
  const mails = [];
  const m = loadTypeScript("lib/meta-leads.ts", {
    env: { META_LEADS_TOKEN: "sistem-anahtari" },
    globals: { fetch: graphFetch(leadsByForm, calls) },
    mocks: { "@/lib/prisma": { prisma: db.prisma }, "@/lib/lead-email": { leadEmailConfigured: () => true, sendLeadEmail: async (v) => { mails.push(v.eventId); return true; } }, "@/lib/dnd-akis-lead": noAkis },
  });
  const r = await m.syncMetaLeads();
  assert.equal(r.ok, true);
  assert.equal(r.inserted, 1);
  assert.equal(r.merged, 1);
  assert.equal(r.forms, 2);
  assert.equal(db.rows.length, 2);
  assert.equal(db.rows[1].project, "NeoCity");
  assert.equal(db.rows[1].source, "facebook / paid");
  assert.equal(db.notes.length, 1);
  assert.equal(db.notes[0].leadId, 1);
  assert.match(db.notes[0].text, /Meta reklam formunu tekrar doldurdu: Lagoon Verde - Kasım\nSoru: Kat planı/);
  assert.deepEqual(mails, ["meta-lead:A1"]);
  // sistem anahtarı sayfa listesinde, sayfa anahtarı form/talep çağrılarında
  assert.equal(calls[0].auth, "Bearer sistem-anahtari");
  assert.ok(calls.slice(1).every((c) => c.auth === "Bearer sayfa-anahtari"));
  assert.match(calls.find((c) => c.filtering).filtering, /time_created/);
  // ikinci çalışma: aynı talepler tekrar gelmez
  const again = await m.syncMetaLeads();
  assert.equal(again.inserted, 0);
  assert.equal(again.merged, 0);
  assert.equal(db.rows.length, 2);
  assert.equal(db.notes.length, 1);
  assert.ok(db.state.lastRunAt && db.state.lastLeadTs > 0);
});

test("sync reports a revoked token without throwing and old backfill sends no emails", async () => {
  const db = fakePrisma();
  const m = loadTypeScript("lib/meta-leads.ts", {
    env: { META_LEADS_TOKEN: "x" },
    globals: { fetch: async () => Response.json({ error: { message: "Error validating access token", code: 190 } }, { status: 400 }) },
    mocks: { "@/lib/prisma": { prisma: db.prisma }, "@/lib/lead-email": noMail, "@/lib/dnd-akis-lead": noAkis },
  });
  const r = await m.syncMetaLeads();
  assert.equal(r.ok, false);
  assert.equal(r.error, "Meta anahtarı geçersiz ya da iptal edilmiş.");
  assert.equal(db.state.error, "Meta anahtarı geçersiz ya da iptal edilmiş.");

  const db2 = fakePrisma();
  const mails = [];
  const old = { f1: [lead("O1", "2026-10-01T10:00:00+0000", { full_name: "Eski Talep", email: "o@example.com" })] };
  const m2 = loadTypeScript("lib/meta-leads.ts", {
    env: { META_LEADS_TOKEN: "x" },
    globals: { fetch: graphFetch(old) },
    mocks: { "@/lib/prisma": { prisma: db2.prisma }, "@/lib/lead-email": { leadEmailConfigured: () => true, sendLeadEmail: async (v) => { mails.push(v); return true; } }, "@/lib/dnd-akis-lead": noAkis },
  });
  const r2 = await m2.syncMetaLeads();
  assert.equal(r2.inserted, 1);
  assert.equal(mails.length, 0);
  assert.equal(db2.rows[0].createdAt.toISOString(), "2026-10-01T10:00:00.000Z");
});

test("without a token the sync does nothing", async () => {
  const db = fakePrisma();
  const m = loadTypeScript("lib/meta-leads.ts", { mocks: { "@/lib/prisma": { prisma: db.prisma }, "@/lib/lead-email": noMail, "@/lib/dnd-akis-lead": noAkis } });
  assert.equal(m.metaLeadsConfigured(), false);
  const r = await m.syncMetaLeads();
  assert.equal(r.ok, false);
  assert.equal(db.rows.length, 0);
});
