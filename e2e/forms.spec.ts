import { expect, test, type Page, type Request } from "@playwright/test";
import { prepare, settle } from "./helpers";

// SAHTE API: /api/contact isteği tarayıcıda yakalanır, sunucuya ve CRM'e hiçbir şey gitmez.
// Bu testler formun istemci davranışını doğrular; gerçek kayıt entegrasyonunu doğrulamaz.

async function fillContact(page: Page, { consent = true } = {}) {
  const form = page.locator("form.az-f").first();
  await form.getByLabel("Ad Soyad *").fill("Test Kullanıcı");
  await form.getByLabel("Telefon *").fill("5331234567");
  await form.getByLabel("E-posta *").fill("test@example.com");
  await form.getByLabel("Konu *").fill("E2E test");
  await form.getByLabel(/Mesaj/).fill("Otomatik test mesajı, işlem yapmayın.");
  if (consent) {
    const box = form.locator('input[name="consent"]');
    await settle(box);
    await box.check();
  }
  return form;
}

function trackContact(page: Page) {
  const sent: Request[] = [];
  page.on("request", (r) => { if (r.url().includes("/api/contact")) sent.push(r); });
  return sent;
}

test.describe("iletişim formu (sahte API)", () => {
  test.beforeEach(async ({ page }) => {
    await prepare(page);
    await page.goto("/tr/contact");
  });

  test("boş gönderim engellenir, istek gitmez", async ({ page }) => {
    const sent = trackContact(page);
    const form = page.locator("form.az-f").first();
    await form.getByRole("button", { name: "Mesaj gönder" }).click();
    await expect(form.getByRole("alert")).toContainText("Lütfen işaretli alanları kontrol edin");
    await expect(form.getByLabel("Ad Soyad *")).toHaveAttribute("aria-invalid", "true");
    expect(sent).toHaveLength(0);
  });

  test("KVKK onayı olmadan gönderilmez", async ({ page }) => {
    const sent = trackContact(page);
    const form = await fillContact(page, { consent: false });
    await form.getByRole("button", { name: "Mesaj gönder" }).click();
    await expect(form.getByRole("alert")).toBeVisible();
    await expect(form.locator('input[name="consent"]')).toHaveAttribute("aria-invalid", "true");
    expect(sent).toHaveLength(0);
  });

  test("onay kutusu tıklanabilir", async ({ page }) => {
    const box = page.locator('form.az-f input[name="consent"]').first();
    await settle(box);
    await box.check();
    await expect(box).toBeChecked();
    await box.uncheck();
    await expect(box).not.toBeChecked();
  });

  test("geçerli gönderim: tek istek, doğru alanlar, teşekkür mesajı", async ({ page }) => {
    const sent = trackContact(page);
    await page.route("**/api/contact", async (route) => {
      await new Promise((r) => setTimeout(r, 400)); // gecikme: çift tıklama penceresi
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    });
    const form = await fillContact(page);
    const btn = form.getByRole("button", { name: "Mesaj gönder" });
    await btn.dblclick();
    await expect(page.getByRole("status").filter({ hasText: "Teşekkürler!" })).toBeVisible();
    expect(sent, "çift tıklama tek istek göndermeli").toHaveLength(1);
    const body = sent[0].postDataJSON();
    expect(body).toMatchObject({ name: "Test Kullanıcı", email: "test@example.com", form: "contact", subject: "E2E test" });
    expect(body.phone).toMatch(/^\+90/);
    expect(body.eventId).toMatch(/^[A-Za-z0-9-]{8,64}$/);
    // izin yokken reklam/analitik bayrakları kapalı gider
    expect(body.consent).toEqual({ analytics: false, ads: false });
  });

  test("sunucu hatasında kullanıcıya hata ve WhatsApp yolu gösterilir", async ({ page }) => {
    await page.route("**/api/contact", (route) => route.fulfill({ status: 500, contentType: "application/json", body: '{"error":"Server error"}' }));
    const form = await fillContact(page);
    await form.getByRole("button", { name: "Mesaj gönder" }).click();
    const alert = form.getByRole("alert");
    await expect(alert).toContainText("Gönderim sırasında bir sorun oluştu");
    await expect(alert.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", /^https:\/\/wa\.me\//);
  });
});

test("proje fiyat formu (sahte API) proje bilgisini gönderir", async ({ page }) => {
  await prepare(page);
  const sent = trackContact(page);
  await page.route("**/api/contact", (route) => route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
  // #adres olmadan açılır: çapa hizalaması ayrıca e2e/anchors.spec.ts içinde test ediliyor
  await page.goto("/tr/lagoon-verde");
  const form = page.locator("#fiyat-al form.az-f");
  await form.getByLabel("Ad Soyad *").fill("Test Kullanıcı");
  await form.getByLabel("Telefon *").fill("5331234567");
  await form.getByLabel("E-posta *").fill("test@example.com");
  const consent = form.locator('input[name="consent"]');
  await settle(consent);
  await consent.check();
  await form.getByRole("button", { name: "Fiyat ve kat planı iste" }).click();
  await expect(page.locator("#fiyat-al").getByRole("status")).toContainText("Teşekkürler!");
  expect(sent).toHaveLength(1);
  expect(sent[0].postDataJSON()).toMatchObject({ form: "lead" });
});
