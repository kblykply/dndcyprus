import { expect, test } from "@playwright/test";
import { isMobile, prepare } from "./helpers";

test.describe("masaüstü menü", () => {
  test.beforeEach(async ({ page }, info) => {
    test.skip(isMobile(info), "masaüstü menüsü");
    await prepare(page);
  });

  test("Projelerimiz menüsünden seçim yapınca sayfa açılır ve menü kapanır", async ({ page }) => {
    await page.goto("/tr/about");
    const nav = page.locator("#az-nav");
    await nav.getByRole("button", { name: "Projelerimiz" }).hover();
    const drop = nav.locator(".drop.mega");
    await expect(drop).toBeVisible();
    await drop.getByRole("link", { name: /Lagoon Verde/ }).click();
    await expect(page).toHaveURL(/\/tr\/lagoon-verde$/);
    await expect(drop).toBeHidden();
  });

  // menü (müşterinin akış belgesi): yalnız Projelerimiz açılır; diğer başlıklar doğrudan sayfaya gider
  test("DND Ayrıcalığı ve İletişim doğrudan sayfaya gider (açılır liste yok)", async ({ page }) => {
    await page.goto("/tr");
    const nav = page.locator("#az-nav");
    await expect(nav.getByRole("button", { name: "DND Ayrıcalığı" })).toHaveCount(0);
    await nav.getByRole("link", { name: "DND Ayrıcalığı", exact: true }).click();
    await expect(page).toHaveURL(/\/tr\/advantage$/);
    await nav.getByRole("link", { name: "İletişim", exact: true }).click();
    await expect(page).toHaveURL(/\/tr\/contact$/);
  });

  test("ana sayfada logo sayfanın başına çıkarır", async ({ page }) => {
    await page.goto("/tr");
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForFunction(() => window.scrollY > 1000);
    await page.locator("#az-nav a.logo").click();
    await page.waitForFunction(() => window.scrollY === 0);
    await expect(page).toHaveURL(/\/tr$/);
  });

  test("dil değiştirince aynı sayfanın diğer dili açılır", async ({ page }) => {
    await page.goto("/tr/perla");
    await page.locator("#az-nav nav.lang > button").click();
    await page.locator("#az-nav nav.lang").getByRole("option", { name: /English/ }).click();
    await expect(page).toHaveURL(/\/en\/perla$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});

test.describe("mobil menü", () => {
  test.beforeEach(async ({ page }, info) => {
    test.skip(!isMobile(info), "mobil menü");
    await prepare(page);
  });

  test("hamburger paneli açılır, Projeler açılır bölümünden proje seçilir, panel kapanır", async ({ page }) => {
    await page.goto("/tr/about");
    const panel = page.locator(".az-mobile");
    await page.getByRole("button", { name: "Menü" }).click();
    await expect(panel).toHaveClass(/\bon\b/);
    // panel ekranı kaplamaz: en fazla 400 px genişlik
    const box = await panel.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(400);
    await panel.getByRole("button", { name: "Projelerimiz" }).click();
    const list = panel.locator("#az-mobile-projects");
    await expect(list).toBeVisible();
    await list.getByRole("link", { name: "La Joya Perla", exact: true }).click();
    await expect(page).toHaveURL(/\/tr\/perla$/);
    await expect(panel).not.toHaveClass(/\bon\b/);
  });

  test("panel dışına dokununca kapanır", async ({ page }) => {
    await page.goto("/tr/contact");
    const panel = page.locator(".az-mobile");
    await page.getByRole("button", { name: "Menü" }).click();
    await expect(panel).toHaveClass(/\bon\b/);
    const vp = page.viewportSize()!;
    await page.mouse.click(12, vp.height - 12);
    await expect(panel).not.toHaveClass(/\bon\b/);
  });
});

test.describe("altbilgi", () => {
  test.beforeEach(async ({ page }) => { await prepare(page); });

  // telefonda Projeler / Genel akordeon (kapalı başlar); geniş ekranda başlık düz metin, bağlantılar hep görünür
  test("telefonda bağlantı grupları kapalı başlar, dokununca açılır; geniş ekranda hep açık", async ({ page }, info) => {
    await page.goto("/tr");
    const foot = page.locator("footer.az-footer");
    const link = foot.getByRole("link", { name: "Lagoon Verde" });
    const btn = foot.getByRole("button", { name: "Projeler" });
    await foot.scrollIntoViewIfNeeded();
    if (!isMobile(info)) {
      await expect(btn).toHaveCount(0);
      await expect(link).toBeVisible();
      return;
    }
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await expect(link).toBeHidden();
    await btn.click();
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await expect(link).toBeVisible();
    await btn.click();
    await expect(link).toBeHidden();
  });
});
