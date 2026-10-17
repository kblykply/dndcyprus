import { expect, test } from "@playwright/test";
import { isMobile, prepare, settle } from "./helpers";

// Fareli ekranlarda kaydırma sırasında hover kilitlenir (html.is-scrolling: titreme önlemi).
// Kilit açıkken fare hiç kıpırdamadan yapılan tıklama kaybolmamalı (trackpad ataletini parmakla durdurup tıklamak gibi).
test("kaydırmanın hemen ardından fare kıpırdamadan yapılan tıklama kaybolmaz", async ({ page }, info) => {
  test.skip(isMobile(info), "kilit yalnız fareli ekranda");
  await prepare(page);
  await page.goto("/tr/contact");
  const box = page.locator('form.az-f input[name="consent"]').first();
  await settle(box);
  // görünme animasyonu bitmeden ölçülen konum kayar
  await page.waitForFunction(() =>
    document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity).every((a) => a.playState !== "running"));
  const b = (await box.boundingBox())!;
  const x = b.x + b.width / 2, y = b.y + b.height / 2;
  // imleç kutunun 250 px altında beklesin; sayfa 250 px yukarı kayınca kutu imlecin altına gelir
  await page.mouse.move(x, y + 250);
  await page.waitForFunction(() => !document.documentElement.classList.contains("is-scrolling"));
  const locked = await page.evaluate(() => {
    window.scrollBy({ top: -250, behavior: "instant" });
    return new Promise<boolean>((r) => requestAnimationFrame(() => r(document.documentElement.classList.contains("is-scrolling"))));
  });
  // kutu artık imlecin altında
  const after = (await box.boundingBox())!;
  expect(Math.abs(after.y + after.height / 2 - (y + 250))).toBeLessThanOrEqual(2);
  await page.mouse.down();
  await page.mouse.up();
  await expect(box).toBeChecked();
  test.info().annotations.push({ type: "kilit", description: locked ? "tıklama kilit açıkken yapıldı" : "kilit zamanlamada kapanmıştı" });
});
