import { expect, test } from "@playwright/test";
import { isLocalBase } from "./helpers";

// Gerçek /api/contact uç noktası; yalnız veritabanına ulaşmayan istekler gönderilir
// (doğrulama hataları ve honeypot). Geçerli bir kayıt denemesi yapılmaz: gerçek talep oluşmaz.

test.beforeEach(({}, info) => {
  test.skip(info.project.name !== "chromium-desktop", "API testleri tek projede çalışır");
});

const post = (request: import("@playwright/test").APIRequestContext, data: unknown, ip: string) =>
  request.post("/api/contact", { data, headers: { "x-real-ip": ip } });

test("bozuk ve eksik istekler 400 döner", async ({ request }) => {
  const ip = `e2e-${Date.now()}-${Math.random()}`;
  const bad = await request.post("/api/contact", { data: "{bozuk", headers: { "content-type": "application/json", "x-real-ip": ip } });
  expect(bad.status()).toBe(400);
  expect((await post(request, [], ip)).status()).toBe(400);
  expect((await post(request, { name: "A" }, ip)).status()).toBe(400);
  expect((await post(request, { name: "Test", email: "gecersiz", phone: "+905331234567" }, ip)).status()).toBe(400);
  expect((await post(request, { name: "Test", email: "a@b.co", phone: "12" }, ip)).status()).toBe(400);
});

test("honeypot dolu ise kayıt açmadan başarılı döner", async ({ request }) => {
  const res = await post(request, { company: "bot ltd", name: "Bot", email: "bot@example.com", phone: "+905331234567" }, `e2e-hp-${Date.now()}`);
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ ok: true });
});

test("aynı adresten çok sayıda istek 429 ile sınırlanır", async ({ request }, info) => {
  test.skip(!isLocalBase(info), "yalnız yerel sunucuda (canlıda kendi IP'mizi kilitlemesin)");
  const ip = `e2e-rl-${Date.now()}-${Math.random()}`;
  const codes: number[] = [];
  for (let i = 0; i < 11; i++) codes.push((await post(request, { name: "x" }, ip)).status());
  expect(codes.slice(0, 10).every((c) => c === 400)).toBe(true);
  expect(codes[10]).toBe(429);
});
