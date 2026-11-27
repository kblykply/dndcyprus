const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const J = (v) => JSON.parse(JSON.stringify(v));
const noMail = { leadEmailConfigured: () => false, sendLeadEmail: async () => null };
const noAkis = { dndAkisLeadConfigured: () => false, sendDndAkisLead: async () => ({ ok: true, status: 200 }) };
const load = (opts = {}) =>
  loadTypeScript("lib/meta-messages.ts", {
    ...opts,
    mocks: { "@/lib/prisma": opts.prisma ? { prisma: opts.prisma } : {}, "@/lib/lead-email": opts.mail ?? noMail, "@/lib/dnd-akis-lead": noAkis },
  });

function fakePrisma(existing = []) {
  const rows = existing.map((r, i) => ({ id: i + 1, email: "", phone: null, eventId: null, subject: "", message: "", project: null, form: null, status: "yeni", statusAt: null, ...r }));
  const notes = [];
  let state = null;
  const match = (r, where) => {
    if (where.eventId) return r.eventId === where.eventId;
    if (where.OR) return where.OR.some((c) => (c.email ? r.email.toLowerCase() === c.email.equals.toLowerCase() : c.phone ? String(r.phone || "").endsWith(c.phone.endsWith) : false));
    if (where.id && where.id.in) return where.id.in.includes(r.id);
    if (where.name) return r.form === where.form && r.name.toLowerCase() === where.name.equals.toLowerCase() && !String(r.eventId || "").startsWith(where.NOT.eventId.startsWith);
    return true;
  };
  return {
    rows, notes, get state() { return state; },
    prisma: {
      syncState: {
        findUnique: async () => (state ? { key: "meta-mesaj", data: state } : null),
        upsert: async ({ create }) => { state = J(create.data); return {}; },
      },
      contactMessage: {
        findFirst: async ({ where }) => rows.find((r) => match(r, where)) ?? null,
        findUnique: async ({ where }) => rows.find((r) => r.id === where.id) ?? null,
        findMany: async ({ where }) => (where.OR && !where.OR.length ? [] : rows.filter((r) => match(r, where))),
        create: async ({ data }) => { const r = { id: rows.length + 1, ...data }; rows.push(r); return { id: r.id }; },
        update: async ({ where, data }) => { Object.assign(rows.find((r) => r.id === where.id), data); return {}; },
      },
      leadNote: { create: async ({ data }) => { notes.push(data); return {}; } },
    },
  };
}

const PAGE = "111";
const IG = "999";
const iso = (msAgo) => new Date(Date.now() - msAgo).toISOString();
const msg = (id, from, text, msAgo) => ({ id, message: text, created_time: iso(msAgo), from });
const conv = (id, msAgo, people, messages) => ({ id, updated_time: iso(msAgo), participants: { data: people }, messages: { data: messages } });

/** Meta'nın sahte cevapları: sohbetler platforma göre */
function graphFetch(byPlatform, calls = []) {
  return async (url, init) => {
    const u = new URL(String(url));
    calls.push({ path: u.pathname, platform: u.searchParams.get("platform"), auth: init?.headers?.Authorization });
    if (u.pathname.endsWith("/me/accounts")) return Response.json({ data: [{ id: PAGE, name: "DND Cyprus", access_token: "sayfa-anahtari" }] });
    if (u.pathname.endsWith(`/${PAGE}`)) return Response.json({ id: PAGE, instagram_business_account: { id: IG, username: "dndcyprus" } });
    if (u.pathname.endsWith(`/${PAGE}/conversations`)) {
      const r = byPlatform[u.searchParams.get("platform")];
      return r && r.error ? Response.json({ error: r.error }, { status: 400 }) : Response.json({ data: typeof r === "function" ? r() : r ?? [] });
    }
    return Response.json({ error: { message: "bilinmeyen", code: 100 } }, { status: 400 });
  };
}

test("extractContacts finds phones and emails but skips prices, dates and Facebook placeholders", () => {
  const m = load();
  const r = J(m.extractContacts("Merhaba, numaram 0533 123 45 67, eşim +90 (548) 888 03 63. Mail: Ayse.Y@Example.com 123456@facebook.com"));
  assert.deepEqual(r.phones, ["05331234567", "+905488880363"]);
  assert.deepEqual(r.emails, ["ayse.y@example.com"]);
  assert.deepEqual(J(m.extractContacts("Fiyat £169.000, toplam 16.537.500 TL, 27.11.2026 saat 14:00, 120 m2")).phones, []);
  assert.deepEqual(J(m.extractContacts("UK: 0044 7700 900123")).phones, ["+447700900123"]);
  // aynı numara iki biçimde yazılırsa bir kez
  assert.deepEqual(J(m.extractContacts("05331234567 / +90 533 123 45 67")).phones, ["05331234567"]);
});

test("conversationLead maps a Messenger chat with a number and an Instagram chat without one", () => {
  const m = load();
  const page = { id: PAGE, name: "DND Cyprus" };
  const fb = J(m.conversationLead(conv("c1", 60_000, [{ id: "u1", name: "Mehmet Kaya" }, page], [
    msg("m2", { id: "u1", name: "Mehmet Kaya" }, "Numaram 0533 765 43 21", 60_000),
    msg("m1b", page, "Merhaba, size nasıl yardımcı olabiliriz?", 120_000),
    msg("m1", { id: "u1", name: "Mehmet Kaya" }, "NeoCity ikiz villa fiyatı nedir?", 180_000),
  ]), "messenger", [PAGE]));
  assert.equal(fb.name, "Mehmet Kaya");
  assert.equal(fb.phone, "05337654321");
  assert.equal(fb.email, "");
  assert.equal(fb.project, "NeoCity");
  assert.equal(fb.subject, "Messenger mesajı · NeoCity");
  assert.equal(fb.form, "meta-mesaj");
  assert.equal(fb.source, "facebook / mesaj");
  assert.equal(fb.eventId, "meta-mesaj:c1");
  assert.match(fb.message, /· NeoCity ikiz villa fiyatı nedir\?\n.*· Numaram 0533 765 43 21/);
  assert.doesNotMatch(fb.message, /nasıl yardımcı/); // sayfanın kendi cevabı talebe yazılmaz

  const ig = J(m.conversationLead(conv("c2", 60_000, [{ id: "u2", username: "ayse.k" }, { id: IG, username: "dndcyprus" }], [
    msg("i1", { id: "u2", username: "ayse.k" }, "Lagoon Verde hakkında bilgi alabilir miyim?", 60_000),
  ]), "instagram", [PAGE, IG]));
  assert.equal(ig.name, "@ayse.k");
  assert.equal(ig.phone, null);
  assert.equal(ig.subject, "Instagram mesajı · Lagoon Verde · numara vermedi");
  assert.equal(ig.source, "instagram / mesaj");

  // yalnız sayfanın yazdığı sohbet talep değildir
  assert.equal(m.conversationLead(conv("c3", 1000, [page], [msg("p1", page, "Kampanya duyurusu", 1000)]), "messenger", [PAGE]), null);
});

test("sync creates one lead per chat, merges a known person, and later picks up a number given in a new message", async () => {
  const db = fakePrisma([{ name: "Eski Müşteri", email: "eski@example.com", phone: "05331112233" }]);
  const page = { id: PAGE, name: "DND Cyprus" };
  const u1 = { id: "u1", name: "Mehmet Kaya" };
  const u2 = { id: "u2", username: "ayse.k" };
  const u3 = { id: "u3", name: "Eski Müşteri" };
  let igChats = [conv("c2", 600_000, [u2, { id: IG }], [msg("i1", u2, "Lagoon fiyat listesi?", 600_000)])];
  const calls = [];
  const mails = [];
  const m = load({
    env: { META_LEADS_TOKEN: "sistem-anahtari" },
    globals: { fetch: graphFetch({
      messenger: [
        conv("c1", 60_000, [u1, page], [msg("m1", u1, "NeoCity fiyat? Numaram 0533 765 43 21", 60_000)]),
        conv("c3", 120_000, [u3, page], [msg("m3", u3, "Tekrar merhaba, numaram +90 533 111 22 33", 120_000)]),
        conv("c4", 180_000, [page], [msg("m4", page, "Duyuru", 180_000)]),
      ],
      instagram: () => igChats,
    }, calls) },
    prisma: db.prisma,
    mail: { leadEmailConfigured: () => true, sendLeadEmail: async (v) => { mails.push(v.eventId); return true; } },
  });

  const r = await m.syncMetaMessages();
  assert.equal(r.ok, true);
  assert.equal(r.inserted, 2); // c1 (Messenger) + c2 (Instagram)
  assert.equal(r.merged, 1); // c3 → mevcut müşteri
  assert.equal(db.rows.length, 3);
  const fb = db.rows.find((x) => x.eventId === "meta-mesaj:c1");
  const ig = db.rows.find((x) => x.eventId === "meta-mesaj:c2");
  assert.equal(fb.phone, "05337654321");
  assert.equal(ig.subject, "Instagram mesajı · Lagoon Verde · numara vermedi");
  assert.equal(db.notes.length, 1);
  assert.equal(db.notes[0].leadId, 1);
  assert.match(db.notes[0].text, /^Messenger mesajı ile yazdı:/);
  assert.deepEqual(mails, ["meta-mesaj:c1"]); // numarasız Instagram talebi için e-posta yok
  assert.equal(db.state.instagram, "@dndcyprus");
  assert.ok(calls.some((c) => c.platform === "instagram") && calls.some((c) => c.platform === "messenger"));
  assert.ok(calls.slice(1).every((c) => c.auth === "Bearer sayfa-anahtari"));

  // ikinci çalışma: değişiklik yok → yeni kayıt, not, e-posta yok
  const again = await m.syncMetaMessages();
  assert.equal(again.inserted + again.updated + again.merged, 0);
  assert.equal(db.notes.length, 1);

  // Instagram'da yeni mesajla numara geldi → talep güncellenir, "numara vermedi" kalkar, not düşer, e-posta gider
  igChats = [conv("c2", 1000, [u2, { id: IG }], [msg("i2", u2, "Numaram +44 7700 900123", 1000), msg("i1", u2, "Lagoon fiyat listesi?", 600_000)])];
  const third = await m.syncMetaMessages();
  assert.equal(third.updated, 1);
  assert.equal(ig.phone, "+447700900123");
  assert.equal(ig.subject, "Instagram mesajı · Lagoon Verde");
  assert.match(db.notes.at(-1).text, /^Instagram mesajında iletişim bilgisi verdi: \+447700900123/);
  assert.equal(mails.length, 2);
  assert.match(mails[1], /^meta-mesaj:c2:\d+$/);
});

test("conversation lists: Messenger asks for the chat link, Instagram uses small pages; a timeout is explained, not thrown", async () => {
  const db = fakePrisma();
  const seen = {};
  const base = graphFetch({ messenger: [], instagram: [] });
  const fetch = async (url, init) => {
    const u = new URL(String(url));
    if (u.pathname.endsWith(`/${PAGE}/conversations`)) {
      const p = u.searchParams.get("platform");
      seen[p] = { fields: u.searchParams.get("fields"), limit: u.searchParams.get("limit") };
      if (p === "instagram") throw Object.assign(new Error("The operation was aborted due to timeout"), { name: "TimeoutError" });
    }
    return base(url, init);
  };
  const m = load({ env: { META_LEADS_TOKEN: "x" }, globals: { fetch }, prisma: db.prisma });
  const r = await m.syncMetaMessages();
  assert.match(seen.messenger.fields, /^id,updated_time,link,participants,messages/);
  assert.equal(seen.messenger.limit, "25");
  assert.equal(seen.instagram.fields, "id,updated_time"); // Instagram listesi hafif (Meta zaman aşımı / veri sınırı)
  assert.equal(seen.instagram.limit, "10");
  assert.equal(r.error, "Instagram: Meta zamanında cevap vermedi; sonraki çalışmada tekrar denenecek.");
  assert.equal(db.state.lastTs.instagram, undefined); // Instagram'ın kaldığı yer ilerlemez
  assert.ok(db.state.lastTs.messenger > 0);
});

test("Instagram chats listed without messages are read one by one", async () => {
  const db = fakePrisma();
  const u2 = { id: "igsid-2", username: "ayse.k" };
  const reads = [];
  const base = graphFetch({ messenger: [], instagram: [{ id: "ig1", updated_time: iso(60_000) }] });
  const fetch = async (url, init) => {
    const u = new URL(String(url));
    if (u.pathname.endsWith("/ig1")) {
      reads.push(u.searchParams.get("fields"));
      return Response.json({ id: "ig1", participants: { data: [u2, { id: IG }] }, messages: { data: [msg("i1", u2, "Lagoon fiyatı? 0533 444 55 66", 60_000)] } });
    }
    return base(url, init);
  };
  const m = load({ env: { META_LEADS_TOKEN: "x" }, globals: { fetch }, prisma: db.prisma });
  const r = await m.syncMetaMessages();
  assert.equal(r.ok, true);
  assert.deepEqual(reads, ["participants,messages.limit(20){id,message,from,created_time}"]);
  assert.equal(db.rows[0].name, "@ayse.k");
  assert.equal(db.rows.length, 1);
  assert.equal(db.rows[0].phone, "05334445566");
  assert.equal(db.rows[0].source, "instagram / mesaj");
  assert.equal(db.state.convs.ig1.c, "i");
});

test("missing message permission is reported per platform without throwing", async () => {
  const db = fakePrisma();
  const m = load({
    env: { META_LEADS_TOKEN: "x" },
    globals: { fetch: graphFetch({ messenger: { error: { message: "(#200) Requires pages_messaging permission", code: 200 } }, instagram: { error: { message: "no", code: 10 } } }) },
    prisma: db.prisma,
  });
  const r = await m.syncMetaMessages();
  assert.equal(r.ok, false);
  assert.match(r.error, /^Messenger: mesaj okuma izni yok/);
  assert.match(r.error, /Instagram: mesaj okuma izni yok/);
  assert.equal(db.rows.length, 0);
  // izin yokken kaldığı yer ilerlemez: izin gelince son 60 gün yine aktarılır
  assert.equal(db.state.lastTs.messenger, undefined);
});

test("replyState ignores instant automatic replies and tracks who is waiting", () => {
  const m = load();
  const page = { id: PAGE, name: "DND Cyprus" };
  const u = { id: "u1", name: "Ali Veli" };
  const H = 3600_000;
  // müşteri 3 sa önce yazdı, sayfa 5 sn sonra otomatik cevap verdi, ekip 25 dk sonra yazdı, müşteri 1 sa önce yine yazdı
  const c = conv("c1", 0, [u, page], [
    msg("4", u, "Peki fiyat?", H),
    msg("3", page, "Merhaba, ben Talha", 3 * H - 25 * 60_000),
    msg("2", page, "Otomatik: size dönüş yapacağız", 3 * H - 5000),
    msg("1", u, "Merhaba", 3 * H),
  ]);
  const before = Date.now();
  const rs = J(m.replyState(c, [PAGE]));
  assert.equal(rs.firstReplyMs, 25 * 60_000);
  assert.ok(Math.abs(rs.waitingSince - (before - H)) < 1000);
  assert.ok(Math.abs(rs.lastTeam - (before - 3 * H + 25 * 60_000)) < 1000);
  assert.equal(rs.complete, true);
  // yalnız otomatik cevap varsa müşteri hâlâ bekliyor
  const c2 = conv("c2", 0, [u, page], [msg("2", page, "Otomatik", 60_000 - 3000), msg("1", u, "Selam", 60_000)]);
  const rs2 = J(m.replyState(c2, [PAGE]));
  assert.equal(rs2.firstReplyMs, null);
  assert.ok(rs2.waitingSince);
  assert.equal(rs2.lastTeam, null);
});

test("sync remembers who the customer is, when they wait and clears it once the team answers", async () => {
  const db = fakePrisma([{ name: "Zeynep Arslan", form: "meta-mesaj", eventId: "meta-lv-012", source: "facebook / paid_social" }]);
  const page = { id: PAGE, name: "DND Cyprus" };
  const u1 = { id: "psid-1", name: "Mehmet Kaya" };
  const z = { id: "psid-2", name: "Zeynep Arslan" };
  let chats = [
    { ...conv("c1", 120_000, [u1, page], [msg("m1", u1, "NeoCity fiyatı?", 120_000)]), link: "https://business.facebook.com/latest/inbox/messenger?selected_item_id=61570000000001" },
    conv("c9", 300_000, [z, page], [msg("z1", z, "Lagoon için numaram 0533 222 33 44", 300_000)]),
  ];
  const m = load({ env: { META_LEADS_TOKEN: "x" }, globals: { fetch: graphFetch({ messenger: () => chats, instagram: [] }) }, prisma: db.prisma });
  await m.syncMetaMessages();
  const memo = db.state.convs.c1;
  assert.equal(memo.u, "https://business.facebook.com/latest/inbox/messenger?selected_item_id=61570000000001");
  assert.equal(memo.p, "psid-1");
  assert.equal(memo.c, "m");
  assert.ok(memo.w > 0);
  assert.equal(memo.r, null);
  assert.equal(db.state.pageId, PAGE);
  // çağrı merkezi listesinden aktarılan numarasız talep adla bulundu: yeni talep açılmadı, numara yazıldı
  assert.equal(db.rows.length, 2);
  assert.equal(db.state.convs.c9.l, 1);
  assert.equal(db.rows[0].phone, "05332223344");
  assert.match(db.notes[0].text, /^Messenger mesajı ile yazdı:/);

  // ekip 10 dk sonra cevap verdi (müşteriden yeni mesaj yok): bekleme kalkar, ilk cevap süresi yazılır
  chats = [conv("c1", 1000, [u1, page], [msg("p1", page, "Merhaba Mehmet Bey, fiyat listesi ekte", 120_000 - 10 * 60_000), msg("m1", u1, "NeoCity fiyatı?", 120_000)])];
  chats[0].messages.data[0].created_time = iso(120_000 - 10 * 60_000);
  await m.syncMetaMessages();
  const after = db.state.convs.c1;
  assert.equal(after.w, null);
  assert.equal(after.r, 10 * 60_000);
  assert.ok(after.a > 0);
  assert.equal(after.l, memo.l);
});

test("Messenger conversions: dataset once, LeadSubmitted when a number arrives, QualifiedLead after status change, never twice", async () => {
  const db = fakePrisma();
  const page = { id: PAGE, name: "DND Cyprus" };
  const u1 = { id: "psid-1", name: "Mehmet Kaya" };
  const posts = [];
  const base = graphFetch({ messenger: [conv("c1", 60_000, [u1, page], [msg("m1", u1, "Numaram 0533 765 43 21", 60_000)])], instagram: [] });
  const fetch = async (url, init) => {
    if (init && init.method === "POST") {
      const u = new URL(String(url));
      const body = JSON.parse(init.body);
      posts.push({ path: u.pathname, body, auth: init.headers.Authorization });
      if (u.pathname.endsWith(`/${PAGE}/dataset`)) return Response.json({ id: "777" });
      return Response.json({ events_received: body.data.length });
    }
    return base(url, init);
  };
  const m = load({ env: { META_LEADS_TOKEN: "x" }, globals: { fetch }, prisma: db.prisma });
  await m.syncMetaMessages();
  assert.equal(posts.length, 2);
  assert.match(posts[0].path, /\/111\/dataset$/);
  assert.match(posts[1].path, /\/777\/events$/);
  const ev = posts[1].body.data[0];
  assert.equal(ev.event_name, "LeadSubmitted");
  assert.equal(ev.action_source, "business_messaging");
  assert.equal(ev.messaging_channel, "messenger");
  assert.deepEqual(ev.user_data, { page_id: PAGE, page_scoped_user_id: "psid-1" });
  assert.equal(posts[1].auth, "Bearer sayfa-anahtari");
  assert.equal(db.state.capiSent, 1);
  assert.equal(db.state.datasetId, "777");

  // tekrar çalışınca aynı olay gitmez
  await m.syncMetaMessages();
  assert.equal(posts.length, 2);
  // ekip "Görüşülüyor" yaptı → QualifiedLead bir kez
  db.rows[0].status = "gorusuluyor";
  db.rows[0].statusAt = new Date();
  await m.syncMetaMessages();
  await m.syncMetaMessages();
  assert.equal(posts.length, 3);
  assert.equal(posts[2].body.data[0].event_name, "QualifiedLead");
});
