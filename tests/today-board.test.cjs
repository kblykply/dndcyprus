const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const J = (v) => JSON.parse(JSON.stringify(v));
const H = 3600_000;
const DAY = 24 * H;
// 28.11.2026 Cumartesi 10:00 Kıbrıs (UTC+2)
const NOW = new Date("2026-11-28T08:00:00Z");
const ago = (ms) => new Date(NOW.getTime() - ms);

let seq = 0;
const lead = (o = {}) => ({
  id: ++seq,
  createdAt: ago(2 * DAY),
  name: `Kişi ${seq}`,
  phone: "05330000000",
  email: "",
  project: "NeoCity",
  source: "google / organic",
  form: "lead",
  status: "yeni",
  statusAt: null,
  assignee: null,
  followUpAt: null,
  ...o,
});

test("meta-msg-view: waiting needs no status change after the message; labels and Business Suite link", () => {
  const v = loadTypeScript("lib/meta-msg-view.ts");
  const th = { conv: "c1", l: 1, t: 0, c: "i", p: "igsid-9", w: NOW.getTime() - 2 * H };
  const T = NOW.getTime();
  assert.equal(v.waitingSince(th, { id: 1, status: "yeni", statusAt: null }, T), NOW.getTime() - 2 * H);
  // ekip mesajdan sonra durumu "Arandı" yaptıysa bekleyen sayılmaz
  assert.equal(v.waitingSince(th, { id: 1, status: "arandi", statusAt: ago(1 * H) }, T), null);
  // durum değişikliği mesajdan önceyse hâlâ bekliyor
  assert.equal(v.waitingSince(th, { id: 1, status: "arandi", statusAt: ago(5 * H) }, T), NOW.getTime() - 2 * H);
  assert.equal(v.waitingSince(th, { id: 1, status: "satis_disi", statusAt: null }, T), null);
  assert.equal(v.durationLabel(4 * 60_000), "4 dk");
  assert.equal(v.durationLabel(2 * H + 10 * 60_000), "2 sa");
  assert.equal(v.durationLabel(3 * DAY + H), "3 gün");
  // Business Suite: doğru sekme (yorum sekmesi değil), PSID ile sohbet açılmaz
  const url = new URL(v.inboxUrl("104484445978084", th));
  assert.equal(url.pathname, "/latest/inbox/instagram_direct");
  assert.equal(url.searchParams.get("asset_id"), "104484445978084");
  assert.equal(url.searchParams.get("selected_item_id"), null);
  assert.equal(new URL(v.inboxUrl(null, { c: "m" })).pathname, "/latest/inbox/messenger");
  // Meta'nın sohbet bağlantısı varsa doğrudan o; yabancı alan adı kabul edilmez
  assert.equal(v.inboxUrl("1", { c: "m", u: "https://business.facebook.com/latest/inbox/messenger?selected_item_id=6157" }), "https://business.facebook.com/latest/inbox/messenger?selected_item_id=6157");
  assert.equal(v.inboxUrl("1", { c: "m", u: "/104484445978084/inbox/123/" }), "https://business.facebook.com/104484445978084/inbox/123/");
  assert.equal(new URL(v.inboxUrl("1", { c: "m", u: "https://kotu.example/x" })).pathname, "/latest/inbox/messenger");
  // 14 günden eski cevapsız sohbet bekleyen sayılmaz
  assert.equal(v.waitingSince({ conv: "x", t: 0, w: NOW.getTime() - 15 * DAY }, { id: 1, status: "yeni" }, NOW.getTime()), null);
  assert.equal(v.waitingSince({ conv: "x", t: 0, w: NOW.getTime() - 13 * DAY }, { id: 1, status: "yeni" }, NOW.getTime()), NOW.getTime() - 13 * DAY);
  assert.equal(v.noContact({ id: 1, status: "yeni", form: "meta-mesaj", phone: null, email: "" }), true);
  assert.equal(v.noContact({ id: 1, status: "yeni", form: "contact", phone: null, email: "" }), false);

  const state = {
    convs: {
      a: { l: 1, t: 1, f: NOW.getTime() - 3 * DAY, r: 10 * 60_000 },
      b: { l: 2, t: 2, f: NOW.getTime() - 2 * DAY, r: 3 * H },
      c: { l: 3, t: 3, f: NOW.getTime() - 1 * DAY, r: 30 * 60_000 },
      d: { l: 4, t: 4, f: NOW.getTime() - DAY, r: null, a: null },
      eski: { l: 5, t: 5, f: NOW.getTime() - 40 * DAY, r: 1000 },
    },
  };
  const rs = J(v.replyStats(state, NOW.getTime() - 30 * DAY, NOW.getTime()));
  assert.equal(rs.conversations, 4);
  assert.equal(rs.answered, 3);
  assert.equal(rs.median, 30 * 60_000);
  assert.equal(rs.withinHourPct, 67);
  assert.equal(rs.unanswered, 1);
  // aynı talebin iki sohbeti: en son yazılan
  const map = v.threadsByLead({ convs: { x: { l: 7, t: 10 }, y: { l: 7, t: 20 } } });
  assert.equal(map.get(7).conv, "y");
});

test("today-board: agenda puts waiting chats first, then today's calls, then uncalled new leads; funnel shows the biggest drop", () => {
  const b = loadTypeScript("lib/today-board.ts");
  seq = 0;
  const msgLead = lead({ name: "Ayşe Mesaj", form: "meta-mesaj", source: "instagram / mesaj", phone: null });
  const call = lead({ name: "Ali Arama", status: "arandi", statusAt: ago(3 * DAY), followUpAt: ago(H), assignee: "Talha" });
  const fresh = lead({ name: "Yeni Kişi", createdAt: ago(5 * H) });
  const old = lead({ name: "Eski Yeni", createdAt: ago(20 * DAY) });
  const supplier = lead({ name: "Tedarikçi", status: "satis_disi" });
  const sold = lead({ name: "Satış", status: "satis", statusAt: ago(DAY) });
  const threads = new Map([[msgLead.id, { conv: "c", l: msgLead.id, t: 0, c: "i", w: NOW.getTime() - 3 * H }]]);
  const { items, counts } = b.agenda([msgLead, call, fresh, old, supplier, sold], threads, NOW);
  assert.deepEqual(J(items.map((i) => i.lead.name)), ["Ayşe Mesaj", "Ali Arama", "Yeni Kişi"]);
  assert.deepEqual(J(counts), { cevap: 1, arama: 1, yeni: 1 });
  assert.equal(items[0].label, "Instagram · cevap bekliyor · 3 sa");
  assert.match(items[1].label, /gecikti · Talha$/);

  // huni: 10 talep, 4'ü numara bıraktı (en büyük kayıp numarada), 3'üne ulaşıldı, 2 görüşülüyor, 1 satış
  seq = 100;
  const f = [
    ...Array.from({ length: 6 }, () => lead({ phone: null, form: "meta-mesaj", createdAt: ago(3 * DAY) })),
    lead({ createdAt: ago(3 * DAY) }),
    lead({ status: "arandi", createdAt: ago(3 * DAY) }),
    lead({ status: "gorusuluyor", createdAt: ago(3 * DAY) }),
    lead({ status: "satis", createdAt: ago(3 * DAY) }),
    lead({ status: "satis_disi", createdAt: ago(3 * DAY) }),
    lead({ createdAt: ago(60 * DAY) }),
  ];
  const fn = b.funnel(f, ago(30 * DAY));
  assert.deepEqual(J(fn.steps.map((s) => s.count)), [10, 4, 3, 2, 1]);
  assert.equal(fn.drop.to.key, "numara");
  assert.equal(fn.drop.lostPer100, 60);
});

test("today-board: week strip starts on Monday in Cyprus time, greeting follows the clock, team load counts open leads", () => {
  const b = loadTypeScript("lib/today-board.ts");
  seq = 200;
  const leads = [
    lead({ followUpAt: new Date("2026-11-28T12:00:00Z"), assignee: "Talha" }), // bugün (cumartesi) 14:00
    lead({ followUpAt: new Date("2026-11-30T08:00:00Z"), assignee: "Talha" }), // gelecek pazartesi: bu haftada yok
    lead({ followUpAt: new Date("2026-11-26T08:00:00Z"), assignee: "Netice", status: "satis" }), // satış: sayılmaz
    lead({ followUpAt: new Date("2026-11-27T21:30:00Z"), assignee: "Netice" }), // UTC 27.11 21:30 = Kıbrıs 27.11 23:30 (cuma)
  ];
  const week = J(b.weekStrip(leads, NOW));
  assert.equal(week.length, 7);
  assert.equal(week[0].dow, "Pzt");
  assert.equal(week[0].day, 23);
  assert.equal(week[5].today, true);
  assert.equal(week[5].count, 1);
  assert.equal(week[4].count, 1);
  assert.equal(week[4].past, true);
  assert.equal(week[3].count, 0); // satışa dönen sayılmaz
  assert.equal(week[6].day, 29);
  assert.equal(b.greeting(NOW), "Günaydın");
  assert.equal(b.greeting(new Date("2026-11-28T17:00:00Z")), "İyi akşamlar");
  const team = J(b.teamLoad(leads, NOW));
  assert.deepEqual(team, [
    { name: "Talha", open: 2, due: 1 }, // bugün 14:00'teki arama da bugünün işi
    { name: "Netice", open: 1, due: 1 },
  ]);
  const next = b.upcoming(leads, NOW, 3);
  assert.deepEqual(J(next.map((l) => l.id)), [leads[0].id, leads[1].id]);
});

test("morning digest lists yesterday's leads, waiting chats and today's calls; subject sums it up", () => {
  const d = loadTypeScript("lib/morning-digest.ts", { env: {} });
  seq = 300;
  const leads = [
    lead({ name: "Dünkü Talep", createdAt: new Date("2026-11-27T10:00:00Z"), form: "meta-mesaj", source: "facebook / mesaj", phone: "+447700900123" }),
    lead({ name: "Önceki Gün", createdAt: new Date("2026-11-26T10:00:00Z") }),
    lead({ name: "Bugün Aranacak", status: "arandi", statusAt: ago(5 * DAY), followUpAt: new Date("2026-11-28T09:00:00Z") }),
    lead({ name: "<script>", createdAt: new Date("2026-11-27T12:00:00Z"), status: "satis_disi" }),
  ];
  const state = { convs: { c: { l: leads[0].id, t: 1, c: "m", w: NOW.getTime() - 14 * H, f: NOW.getTime() - 22 * H, r: null } } };
  const dg = d.buildDigest(leads, state, NOW);
  assert.deepEqual(dg.yesterday.map((l) => l.name), ["Dünkü Talep"]); // satış dışı sayılmaz
  assert.equal(dg.cevap.length, 1);
  assert.equal(dg.arama.length, 1);
  assert.equal(d.digestSubject(dg), `Sabah özeti · dün 1 talep · ${dg.total} iş bekliyor`);
  const html = d.digestHtml(dg);
  assert.match(html, /SABAH ÖZETİ/);
  assert.match(html, /CEVAP BEKLEYEN MESAJLAR \(1\)/);
  assert.match(html, /Dünkü Talep/);
  assert.match(html, /Messenger mesajı/);
  assert.match(html, /\/admin\/bugun/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(d.digestText(dg), /Bugün aranacaklar \(1\)/);
});

test("originGroup separates web forms, Messenger, Instagram, Meta forms and panel entries", () => {
  const s = loadTypeScript("lib/lead-status.ts");
  assert.equal(s.originGroup("meta-mesaj", "instagram / mesaj").label, "Instagram mesajı");
  assert.equal(s.originGroup("meta-mesaj", "facebook / paid_social").label, "Messenger mesajı");
  assert.equal(s.originGroup("meta-lead", null).key, "meta-form");
  assert.equal(s.originGroup("panel", "telefon / manuel").key, "panel");
  assert.equal(s.originGroup("contact", "google / organic").label, "Web sitesi formu");
  assert.equal(s.originGroup(null).key, "web");
});

test("CAPI pending events skip suppliers, Instagram chats and events older than seven days", () => {
  const c = loadTypeScript("lib/meta-msg-capi.ts", { mocks: { "@/lib/prisma": {} } });
  const now = NOW.getTime();
  const convs = {
    yeni: { l: 1, t: now - H, c: "m", p: "p1" },
    eski: { l: 2, t: now - 10 * DAY, c: "m", p: "p2" },
    ig: { l: 3, t: now - H, c: "i", p: "p3" },
    ted: { l: 4, t: now - H, c: "m", p: "p4" },
    bitti: { l: 5, t: now - H, c: "m", p: "p5", e: 3 },
  };
  const leads = new Map([
    [1, { id: 1, phone: "0533", email: "", status: "gorusuluyor", statusAt: new Date(now - 2 * H) }],
    [2, { id: 2, phone: "0533", email: "", status: "yeni", statusAt: null }],
    [3, { id: 3, phone: "0533", email: "", status: "yeni", statusAt: null }],
    [4, { id: 4, phone: "0533", email: "", status: "satis_disi", statusAt: null }],
    [5, { id: 5, phone: "0533", email: "", status: "satis", statusAt: new Date(now - H) }],
  ]);
  const ev = J(c.pendingConversions(convs, leads, now));
  assert.deepEqual(ev.map((e) => [e.conv, e.name, e.send]), [
    ["yeni", "LeadSubmitted", true],
    ["yeni", "QualifiedLead", true],
    ["eski", "LeadSubmitted", false],
  ]);
  assert.deepEqual(J(c.capiCandidateLeadIds(convs, now)).sort(), [1, 2, 4]);
});
