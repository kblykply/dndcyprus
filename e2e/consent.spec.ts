import { expect, test, type Page } from "@playwright/test";
import { ANALYTICS, prepare } from "./helpers";

// Çerez izni. Not: yerel derlemede GA4 / Meta / Clarity kimlikleri (NEXT_PUBLIC_*) tanımlı değil;
// bu yüzden "izin verilince betik yüklenir" kısmı burada doğrulanamaz, yalnız izinsiz yüklenmediği doğrulanır.

const readConsentCookie = async (page: Page) => {
  const c = (await page.context().cookies()).find((x) => x.name === "dnd_consent");
  return c ? JSON.parse(decodeURIComponent(c.value)) : null;
};

test.beforeEach(async ({ page }) => {
  await prepare(page, { consent: false });
});

test("ilk ziyarette bant görünür, izin yokken analitik/reklam isteği yapılmaz", async ({ page }) => {
  const calls: string[] = [];
  page.on("request", (r) => { if (ANALYTICS.test(r.url())) calls.push(r.url()); });
  await page.goto("/tr/about");
  const banner = page.getByRole("dialog", { name: "Çerez tercihleri" });
  await expect(banner).toBeVisible();
  await page.waitForLoadState("load");
  expect(calls).toEqual([]);
});

test("Yalnızca zorunlu: tercih kaydedilir, yenilemede bant çıkmaz", async ({ page }) => {
  await page.goto("/tr/about");
  const banner = page.getByRole("dialog", { name: "Çerez tercihleri" });
  await banner.getByRole("button", { name: "Yalnızca zorunlu" }).click();
  await expect(banner).toBeHidden();
  expect(await readConsentCookie(page)).toMatchObject({ v: 1, analytics: false, ads: false });
  await page.reload();
  await page.waitForLoadState("load");
  await expect(page.getByRole("dialog", { name: "Çerez tercihleri" })).toHaveCount(0);
});

test("Tümünü kabul et: iki izin de kaydedilir", async ({ page }) => {
  await page.goto("/tr/about");
  await page.getByRole("dialog", { name: "Çerez tercihleri" }).getByRole("button", { name: "Tümünü kabul et" }).click();
  expect(await readConsentCookie(page)).toMatchObject({ analytics: true, ads: true });
});

test("Tercihler: yalnız analitik açılabilir", async ({ page }) => {
  await page.goto("/tr/about");
  const banner = page.getByRole("dialog", { name: "Çerez tercihleri" });
  await banner.getByRole("button", { name: "Tercihler" }).click();
  await banner.getByRole("switch", { name: "Analitik" }).click();
  await banner.getByRole("button", { name: "Tercihleri kaydet" }).click();
  expect(await readConsentCookie(page)).toMatchObject({ analytics: true, ads: false });
});
