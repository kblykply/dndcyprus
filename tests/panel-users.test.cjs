const test = require("node:test");
const assert = require("node:assert/strict");
const { NextRequest } = require("next/server");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const J = (v) => JSON.parse(JSON.stringify(v));
const NOW = 1_800_000_000_000;
const ENV = { NODE_ENV: "production", ADMIN_USER: "test-admin", ADMIN_PASSWORD: "test-password-not-a-real-credential", ADMIN_SESSION_SECRET: "local-test-session-secret" };
class TestDate extends Date {
  static now() { return NOW; }
}
const globals = { Date: TestDate, btoa, atob };

test("panel user sessions carry name and role inside the signature; the old owner token still works", async () => {
  const s = loadTypeScript("lib/admin-session.ts", { env: ENV, globals });
  const token = await s.createAdminSession({ user: "talha", name: "Talha Uygur", role: "satis" });
  assert.deepEqual(J(await s.readAdminSession(token)), { user: "talha", name: "Talha Uygur", role: "satis" });
  assert.equal(await s.verifyAdminSession(token), true);
  // rolü yöneticiye çevirmek imzayı bozar
  assert.equal(await s.readAdminSession(token.replace(".satis.", ".admin.")), null);
  // ad değiştirilemez
  const parts = token.split(".");
  parts[2] = Buffer.from("Başkası").toString("base64url");
  assert.equal(await s.readAdminSession(parts.join(".")), null);
  // ana yönetici eski biçimle yönetici
  const owner = await s.createAdminSession();
  assert.deepEqual(J(await s.readAdminSession(owner)), { user: "test-admin", name: "test-admin", role: "admin" });
  // süresi dolan oturum geçersiz
  const late = loadTypeScript("lib/admin-session.ts", { env: ENV, globals: { ...globals, Date: class extends Date { static now() { return NOW + 9 * 3600_000; } } } });
  assert.equal(await late.readAdminSession(token), null);
  // satış rolü yalnız satış sayfaları
  assert.equal(s.roleAllows("satis", "/admin/leads"), true);
  assert.equal(s.roleAllows("satis", "/admin/leads/12/duzenle"), true);
  assert.equal(s.roleAllows("satis", "/admin/bugun"), true);
  assert.equal(s.roleAllows("satis", "/admin/icerik"), false);
  assert.equal(s.roleAllows("satis", "/admin/kullanicilar"), false);
  assert.equal(s.roleAllows("satis", "/admin/performans"), false);
  assert.equal(s.roleAllows("satis", "/admin/leadsx"), false);
  assert.equal(s.roleAllows("admin", "/admin/kullanicilar"), true);
});

test("middleware sends a sales user away from admin-only pages (server actions there too)", async () => {
  const s = loadTypeScript("lib/admin-session.ts", { env: ENV, globals });
  const token = await s.createAdminSession({ user: "talha", name: "Talha", role: "satis" });
  const { middleware } = loadTypeScript("middleware.ts", { env: ENV, globals });
  const headers = { cookie: `admin_session=${token}` };
  const blocked = await middleware(new NextRequest("https://local.test/admin/icerik/sayfa/anasayfa", { headers }));
  assert.equal(blocked.headers.get("location"), "https://local.test/admin/bugun");
  const post = await middleware(new NextRequest("https://local.test/admin/kullanicilar", { method: "POST", headers }));
  assert.equal(post.headers.get("location"), "https://local.test/admin/bugun");
  const ok = await middleware(new NextRequest("https://local.test/admin/leads?id=5", { headers }));
  assert.equal(ok.headers.get("x-middleware-next"), "1");
});

function fakeUsersPrisma() {
  let data = null;
  return {
    get data() { return data; },
    prisma: {
      syncState: {
        findUnique: async () => (data ? { key: "panel-users", data } : null),
        upsert: async ({ create }) => { data = J(create.data); return {}; },
      },
    },
  };
}

test("panel users: names, password rules, scrypt hash and login", async () => {
  const db = fakeUsersPrisma();
  const u = loadTypeScript("lib/panel-users.ts", { globals: { Buffer }, mocks: { "@/lib/prisma": { prisma: db.prisma } } });
  assert.equal(u.cleanUsername(" Talha "), "talha");
  assert.equal(u.cleanUsername("Şükrü.Öz"), "sukru.oz");
  assert.equal(u.cleanUsername("ab"), null);
  assert.equal(u.cleanUsername("a b c"), null);
  assert.match(u.passwordProblem("kisa1"), /en az 8/);
  assert.match(u.passwordProblem("sadeceharf"), /harf ve bir rakam/);
  assert.equal(u.passwordProblem("Deneme123"), null);
  const hash = await u.hashPassword("Deneme123");
  assert.match(hash, /^scrypt\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/);
  assert.doesNotMatch(hash, /Deneme123/);
  assert.equal(await u.checkPassword("Deneme123", hash), true);
  assert.equal(await u.checkPassword("deneme123", hash), false);
  await u.savePanelUsers([
    { user: "talha", name: "Talha", role: "satis", email: "t@example.com", active: true, hash, createdAt: "2026-11-27T00:00:00Z" },
    { user: "eski", name: "Eski", role: "satis", active: false, hash, createdAt: "2026-11-27T00:00:00Z" },
  ]);
  assert.deepEqual(J(await u.authenticatePanelUser("Talha", "Deneme123")), { user: "talha", name: "Talha", role: "satis" });
  assert.equal(await u.authenticatePanelUser("talha", "yanlis123"), null);
  assert.equal(await u.authenticatePanelUser("eski", "Deneme123"), null); // girişi kapalı
  assert.ok(db.data.users[0].lastLoginAt);
  assert.deepEqual(J(await u.panelUserEmails()), ["t@example.com"]);
});

test("login accepts a panel user when the database is configured and signs a sales session", async () => {
  const db = fakeUsersPrisma();
  const pu = loadTypeScript("lib/panel-users.ts", { globals: { Buffer }, mocks: { "@/lib/prisma": { prisma: db.prisma } } });
  await pu.savePanelUsers([{ user: "talha", name: "Talha", role: "satis", active: true, hash: await pu.hashPassword("Deneme123"), createdAt: "x" }]);
  const env = { ...ENV, DATABASE_URL: "postgres://yerel" };
  const { POST } = loadTypeScript("app/api/admin-login/route.ts", { env, globals, mocks: { "../../../lib/panel-users": pu } });
  const form = new FormData();
  form.set("username", "talha");
  form.set("password", "Deneme123");
  form.set("next", "/admin/leads");
  const res = await POST(new NextRequest("https://local.test/api/admin-login", { method: "POST", body: form }));
  assert.equal(res.status, 303);
  const s = loadTypeScript("lib/admin-session.ts", { env, globals });
  assert.deepEqual(J(await s.readAdminSession(res.cookies.get("admin_session").value)), { user: "talha", name: "Talha", role: "satis" });
});

test("responder score: only what the responder controls; night messages judged by the 10:00 deadline, not by speed", () => {
  const r = loadTypeScript("lib/responder-score.ts");
  const H = 3600_000;
  const MIN = 60_000;
  // 27.11.2026 Kıbrıs (UTC+2)
  const at = (iso) => new Date(iso).getTime();
  const now = at("2026-11-27T12:00:00Z");
  assert.equal(r.speedPoints(4 * MIN), 40);
  assert.ok(Math.abs(r.speedPoints(15 * MIN) - 35.44) < 0.01);
  assert.equal(r.speedPoints(30 * H), 0);
  assert.equal(r.WEIGHTS.hiz + r.WEIGHTS.saat + r.WEIGHTS.gece + r.WEIGHTS.cevapsiz, 100);
  assert.equal(r.isNight(at("2026-11-26T22:30:00Z")), true); // 00:30 Kıbrıs
  assert.equal(r.isNight(at("2026-11-27T07:00:00Z")), false); // 09:00 Kıbrıs
  assert.equal(new Date(r.morningDeadline(at("2026-11-26T21:30:00Z"))).toISOString(), "2026-11-27T08:00:00.000Z"); // 23:30 → ertesi 10:00
  assert.equal(new Date(r.morningDeadline(at("2026-11-27T01:00:00Z"))).toISOString(), "2026-11-27T08:00:00.000Z"); // 03:00 → aynı gün 10:00
  const convs = {
    a: { t: 0, f: at("2026-11-26T08:00:00Z"), r: 4 * MIN, l: 1 },
    b: { t: 0, f: at("2026-11-26T09:00:00Z"), r: 10 * MIN, l: 2 },
    c: { t: 0, f: at("2026-11-26T10:00:00Z"), r: 2 * H, l: 3 },
    d: { t: 0, f: at("2026-11-26T23:00:00Z"), r: 8 * H, l: 4 }, // 01:00 Kıbrıs, 09:00'da yanıt: zamanında
    e: { t: 0, f: at("2026-11-27T00:00:00Z"), r: 10 * H, l: 5 }, // 02:00, 12:00'de yanıt: geç
    f: { t: 0, f: at("2026-11-26T12:00:00Z"), r: null, a: null, l: 6 }, // hiç yanıt yok
    yeni: { t: 0, f: now - 10 * MIN, r: null }, // son 1 saat: puana girmez
  };
  const res = J(r.responderScore(convs, now, 30));
  assert.equal(res.stats.conversations, 6);
  assert.equal(res.stats.night, 2);
  assert.equal(res.stats.dayMedian, 10 * MIN);
  const p = Object.fromEntries(res.parts.map((x) => [x.key, x.points]));
  assert.deepEqual(Object.keys(p), ["hiz", "saat", "gece", "cevapsiz"]); // numara alma yok
  assert.equal(p.hiz, 37.1); // 10 dk
  assert.equal(p.saat, 12.5); // 4 gündüz sohbetin 2'si 1 saat içinde
  assert.equal(p.gece, 10); // 2 gecenin 1'i zamanında
  assert.equal(p.cevapsiz, 12.5); // 6'da 1 hiç yanıtsız
  assert.equal(res.score, 72);
  assert.equal(res.grade.label, "İyi");
  assert.match(res.parts[0].value, /^medyan 10 dk$/);
  const tr = J(r.weeklyTrend(convs, now, 2));
  assert.equal(tr.length, 2);
  assert.equal(tr[1].count, 6); // son 1 saatteki sohbet sayılmaz
  assert.equal(tr[1].withinHour, 0.5);
});

test("morning waiting-messages mail lists night chats first with the customer's last message and a reply link", () => {
  const d = loadTypeScript("lib/morning-digest.ts", { env: { MSG_RESPONDER_EMAIL: "Talha@Example.com, bozuk", LEAD_EMAIL_TO: "info@dndcyprus.com" } });
  const now = new Date("2026-11-28T07:00:00Z"); // 09:00 Kıbrıs
  const lead = (id, name, o = {}) => ({ id, name, createdAt: now, phone: null, email: "", project: "NeoCity", source: "facebook / mesaj", form: "meta-mesaj", status: "yeni", statusAt: null, assignee: null, followUpAt: null, subject: "Messenger mesajı", ...o });
  const leads = [lead(1, "Gece Yazan"), lead(2, "Dün Yazan"), lead(3, "Cevaplanan")];
  const state = {
    pageId: "104484445978084",
    convs: {
      a: { l: 1, t: 1, c: "m", w: now.getTime() - 5 * 3600_000, x: "Fiyat <b>alabilir</b> miyim?", u: "/104484445978084/inbox/123/?section=messages" },
      b: { l: 2, t: 1, c: "i", w: now.getTime() - 20 * 3600_000 },
      c: { l: 3, t: 1, c: "m", w: null, a: now.getTime() - 3600_000 },
    },
  };
  const items = d.waitingMessages(leads, state, now);
  assert.deepEqual(J(items.map((i) => [i.lead.name, i.night])), [["Dün Yazan", false], ["Gece Yazan", true]]);
  assert.equal(d.waitingSubject(items), "Cevap bekleyen 2 mesaj · 1 tanesi gece geldi");
  const html = d.waitingHtml(items, now);
  assert.ok(html.indexOf("GECE GELENLER") < html.indexOf("DAHA ÖNCEDEN BEKLEYENLER"));
  assert.match(html, /Fiyat &lt;b&gt;alabilir&lt;\/b&gt; miyim\?/);
  assert.match(html, /https:\/\/business\.facebook\.com\/104484445978084\/inbox\/123\//);
  assert.match(html, /inbox\/instagram_direct/);
  assert.match(html, /Günaydın Talha/);
  assert.deepEqual(J(d.responderEmails()), ["talha@example.com"]);
  assert.deepEqual(J(d.digestRecipients(["T@example.com", "netice@example.com"])), ["info@dndcyprus.com", "talha@example.com", "t@example.com", "netice@example.com"]);
});

test("invite link: the person sets their own password once; expired, reused or wrong links fail", async () => {
  const db = fakeUsersPrisma();
  const u = loadTypeScript("lib/panel-users.ts", { globals: { Buffer }, mocks: { "@/lib/prisma": { prisma: db.prisma } } });
  const inv = u.newInvite(Date.now());
  assert.match(inv.token, /^[A-Za-z0-9_-]{32}$/);
  assert.doesNotMatch(JSON.stringify(inv.invite), new RegExp(inv.token)); // yalnız özet saklanır
  await u.savePanelUsers([{ user: "talha", name: "Talha", role: "satis", active: true, hash: "", invite: inv.invite, createdAt: "x" }]);
  // şifresi olmayan kişi giriş yapamaz
  assert.equal(await u.authenticatePanelUser("talha", ""), null);
  assert.equal(u.inviteValid({ invite: inv.invite }, inv.token), true);
  assert.equal(u.inviteValid({ invite: inv.invite }, inv.token.slice(0, -1) + (inv.token.endsWith("A") ? "B" : "A")), false);
  assert.equal(u.inviteValid({ invite: inv.invite }, inv.token, Date.now() + 73 * 3600_000), false); // 3 gün sonra
  assert.equal((await u.setPasswordByInvite("talha", inv.token, "kisa", "kisa")).ok, false);
  assert.equal((await u.setPasswordByInvite("talha", inv.token, "Deneme123", "Deneme124")).error, "Şifreler aynı değil.");
  assert.deepEqual(J(await u.setPasswordByInvite("Talha", inv.token, "Deneme123", "Deneme123")), { ok: true, user: "talha" });
  assert.equal(db.data.users[0].invite, undefined);
  assert.deepEqual(J(await u.authenticatePanelUser("talha", "Deneme123")), { user: "talha", name: "Talha", role: "satis" });
  // aynı bağlantı ikinci kez kullanılamaz
  assert.equal((await u.setPasswordByInvite("talha", inv.token, "Baska1234", "Baska1234")).ok, false);
});

test("the password link page opens without a session; other admin pages still require login", async () => {
  const { middleware } = loadTypeScript("middleware.ts", { env: ENV, globals });
  const open = await middleware(new NextRequest("https://local.test/admin/sifre?u=talha&t=x"));
  assert.equal(open.headers.get("x-middleware-next"), "1");
  const closed = await middleware(new NextRequest("https://local.test/admin/sifre/baska"));
  assert.equal(new URL(closed.headers.get("location")).pathname, "/admin/login");
});

test("invite e-mail carries the username and the one-time link, escaped", () => {
  const m = loadTypeScript("lib/invite-email.ts");
  const v = { name: "Talha <b>", user: "talha", email: "t@example.com", url: "https://www.dndcyprus.com/admin/sifre?u=talha&t=ABCDEFGHIJKLMNOPQRSTUVWX" };
  const html = m.inviteHtml(v);
  assert.match(html, /PANEL DAVETİ/);
  assert.match(html, /Merhaba Talha &lt;b&gt;,/);
  assert.match(html, /Kullanıcı adın: <b>talha<\/b>/);
  assert.match(html, /href="https:\/\/www\.dndcyprus\.com\/admin\/sifre\?u=talha&amp;t=ABCDEFGHIJKLMNOPQRSTUVWX"/);
  assert.equal(m.inviteSubject(v), "DND Cyprus yönetim paneline davetlisin");
  assert.equal(m.inviteSubject({ ...v, reset: true }), "DND Cyprus panel · şifre yenileme bağlantın");
  assert.match(m.inviteText(v), /talha&t=ABCDEFGHIJKLMNOPQRSTUVWX/);
});

test("responder split: marked conversations go to that person, unmarked (also unanswered) to the default responder", () => {
  const r = loadTypeScript("lib/responder-score.ts");
  const v = loadTypeScript("lib/meta-msg-view.ts", { env: { META_MSG_RESPONDER: "Talha" } });
  const J = (x) => JSON.parse(JSON.stringify(x));
  assert.deepEqual(J(v.MSG_TEAM), ["Talha", "Muhammed"]);
  const convs = { a: { l: 1, t: 1, f: 1, r: 60_000 }, b: { l: 2, t: 2, f: 2, r: 120_000 }, c: { l: 3, t: 3, f: 3 }, d: { t: 4, f: 4 } };
  const by = { 2: "Muhammed" };
  assert.deepEqual(Object.keys(r.convsOf(convs, by, "Muhammed", "Talha")), ["b"]);
  assert.deepEqual(Object.keys(r.convsOf(convs, by, "Talha", "Talha")), ["a", "c", "d"]);
  assert.equal(v.responderOf(2, by), "Muhammed");
  assert.equal(v.responderOf(1, by), "Talha");
  assert.equal(v.responderOf(undefined, by), "Talha");
});

test("deleted leads leave the statistics; conversations without a lead stay", () => {
  const v = loadTypeScript("lib/meta-msg-view.ts");
  const convs = { a: { l: 1, t: 1 }, b: { l: 2, t: 2 }, c: { t: 3 } };
  assert.deepEqual(Object.keys(v.withoutDeleted(convs, new Set([1]))), ["a", "c"]);
});
