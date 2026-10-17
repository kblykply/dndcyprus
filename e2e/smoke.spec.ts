import { expect, test } from "@playwright/test";
import { LOCALES, PAGES, collectErrors, noHorizontalOverflow, prepare } from "./helpers";

// Her sayfa açılır: 200, tek h1, doğru dil, JS hatası yok, yatay taşma yok.
// Masaüstü Chromium 5 dilin hepsini, diğer tarayıcılar Türkçe sayfaları dolaşır.
for (const locale of LOCALES) {
  test.describe(`sayfalar /${locale}`, () => {
    for (const p of PAGES) {
      const path = `/${locale}${p}`;
      test(`${path} açılıyor`, async ({ page }, info) => {
        test.skip(locale !== "tr" && info.project.name !== "chromium-desktop", "diğer diller yalnız masaüstü Chromium'da");
        await prepare(page);
        const errors = collectErrors(page);
        const res = await page.goto(path, { waitUntil: "domcontentloaded" });
        expect(res?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("h1")).toHaveCount(1);
        await page.waitForLoadState("load");
        await noHorizontalOverflow(page);
        expect(errors, errors.join("\n")).toEqual([]);
      });
    }
  });
}

test("bilinmeyen adres 404 döner", async ({ page }) => {
  await prepare(page);
  const res = await page.goto("/tr/olmayan-bir-sayfa");
  expect(res?.status()).toBe(404);
});
