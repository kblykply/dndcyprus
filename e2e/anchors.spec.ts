import { expect, test, type Page } from "@playwright/test";
import { prepare } from "./helpers";

// #bölüm bağlantıları: sonradan yüklenen bölümler (katalog, sabitlenen proje şeridi, teknik kartlar)
// hedefi aşağı itmemeli. Hedefin üst kenarı ekranın üstünde (scroll-margin payıyla) ya da sayfa sonundaysa geçer.
const offset = (page: Page, id: string) =>
  page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return 9999;
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const d = Math.round(el.getBoundingClientRect().top - margin);
    return atBottom && d > 0 && d < window.innerHeight ? 0 : Math.abs(d);
  }, id);

test.describe("#bölüm", () => {
test.beforeEach(async ({ page }) => {
  await prepare(page);
});

for (const url of ["/tr/lagoon-verde#fiyat-al", "/tr/perla#konum", "/tr#iletisim", "/en/perla-ii#floor-plans"]) {
  test(`${url} doğrudan açılınca hedef görünür`, async ({ page }) => {
    await page.goto(url);
    await page.waitForLoadState("load");
    await expect.poll(() => offset(page, url.split("#")[1]), { timeout: 15_000 }).toBeLessThanOrEqual(4);
  });
}

test("proje sayfasında Fiyat Al bağlantısı forma götürür", async ({ page }) => {
  await page.goto("/tr/lagoon-verde");
  await page.waitForLoadState("load");
  await page.locator('a[href="#fiyat-al"]').first().click();
  await expect.poll(() => offset(page, "fiyat-al"), { timeout: 15_000 }).toBeLessThanOrEqual(4);
  await expect(page.locator("#fiyat-al form")).toBeInViewport();
});
});

test("hareketi azalt açıkken kampanya videosu kendiliğinden oynamaz", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await prepare(page, { popup: true });
  await page.goto("/tr");
  const dialog = page.getByRole("dialog").filter({ has: page.locator("video") });
  await expect(dialog).toBeVisible({ timeout: 15_000 });
  const v = dialog.locator("video");
  await expect(v).toHaveJSProperty("paused", true);
  await expect(v).toHaveAttribute("controls", "");
  await dialog.getByRole("button", { name: "Kapat" }).click();
  await expect(dialog).toBeHidden();
});
