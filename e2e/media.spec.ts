import { expect, test } from "@playwright/test";
import { isMobile, prepare, settle } from "./helpers";

test.beforeEach(async ({ page }) => {
  await prepare(page);
});

test("ana sayfa hero videosu: sessiz, satır içi, otomatik, altında duyarlı afiş, H.264 kaynak", async ({ page }) => {
  await page.goto("/tr");
  const v = page.locator("section.az-hero video.bg");
  await expect(v).toHaveJSProperty("muted", true);
  await expect(v).toHaveAttribute("playsinline", "");
  await expect(v).toHaveAttribute("autoplay", "");
  await expect(v.locator("source")).toHaveAttribute("type", "video/mp4");
  // afiş `poster` değil, videonun altındaki next/image <picture>: öncelikli iner; dik telefon ekranında yalnız
  // görünen orta bölge (lv-5-dik.jpg)
  const poster = page.locator("section.az-hero picture img.bg");
  await expect(poster).toHaveAttribute("fetchpriority", "high");
  await expect(poster).toHaveAttribute("srcset", /_next\/image\?url=%2Fazure%2Flv-5\.jpg/);
  await expect(page.locator("section.az-hero picture source")).toHaveAttribute("srcset", /_next\/image\?url=%2Fazure%2Flv-5-dik\.jpg/);
});

test("video dosyaları parça parça (Range) sunulur", async ({ request }, info) => {
  test.skip(info.project.name !== "chromium-desktop", "tek projede yeter");
  for (const src of ["/videos/hero-montaj.mp4", "/videos/tl-odeme-modeli.mp4"]) {
    const res = await request.get(src, { headers: { Range: "bytes=0-1023" } });
    expect(res.status(), src).toBe(206);
    expect(res.headers()["content-type"]).toContain("video/mp4");
  }
});

test("proje arka plan videosu sitede barındırılıyor: YouTube'a gitmeden sessiz oynar", async ({ page }) => {
  const youtube: string[] = [];
  page.on("request", (r) => { if (/youtube|ytimg|googlevideo/.test(r.url())) youtube.push(r.url()); });
  await page.goto("/tr/lagoon-verde");
  const box = page.locator("#genel-bakis .overflow-hidden.bg-black");
  await box.scrollIntoViewIfNeeded();
  const v = box.locator('video[src="/videos/lagoon-verde-tanitim.mp4"]');
  await expect(v).toHaveJSProperty("muted", true);
  await expect(v).toHaveJSProperty("loop", true);
  await expect(box.locator("iframe")).toHaveCount(0);
  // oynatma: H.264 çözebilen tarayıcıda (Playwright'ın Chromium'u çözemiyor; WebKit ve gerçek Chrome çözüyor)
  if (await v.evaluate((el: HTMLVideoElement) => el.canPlayType('video/mp4; codecs="avc1.64001F"') !== "")) {
    await expect.poll(() => v.evaluate((el: HTMLVideoElement) => el.currentTime), { timeout: 15_000 }).toBeGreaterThan(0.2);
  }
  expect(youtube, youtube.join("\n")).toEqual([]);
});

test("360° tur düğmeyle açılır, aynı kökenden yüklenir", async ({ page }) => {
  await page.goto("/tr/lagoon-verde");
  const start = page.getByRole("button", { name: "360 Turu Başlat" });
  await settle(start);
  const tourLoaded = page.waitForResponse((r) => r.url().includes("/tours/360/tour.html") && r.status() === 200);
  await start.click();
  await tourLoaded;
  const frame = page.frameLocator(".mr-tour iframe");
  await expect(frame.locator("body")).toBeVisible();
});

test("katalog oklarla çevrilir", async ({ page }, info) => {
  await page.goto("/tr/lagoon-verde");
  const cat = page.locator("section.az-cat");
  await cat.scrollIntoViewIfNeeded();
  // kitap yakınlaşınca kurulur; ilk sayfada geri oku kapalıdır
  await expect(cat.locator(".book img[src]").first()).toBeVisible();
  const prev = cat.getByRole("button", { name: "Önceki sayfa" });
  await expect(prev).toBeDisabled();
  await cat.getByRole("button", { name: "Sonraki sayfa" }).click();
  // çevrilince geri oku açılır (69 sayfalık katalogda ilerleme çizgisi ilk adımda %3 alt sınırında kalır)
  await expect(prev).toBeEnabled();
  await prev.click();
  await expect(prev).toBeDisabled();
  test.info().annotations.push({ type: "görünüm", description: isMobile(info) ? "tek sayfa" : "açılım" });
});

// telefonda tablo yalnız seçili tipin boyunda (kısa tabloyla not arasında boşluk kalmasın); geniş ekranda kart sabit
test("kat planında tip değiştirmek kartın yüksekliğini değiştirmez, telefonda tablonun altında boşluk kalmaz", async ({ page }, info) => {
  await page.goto("/tr/lagoon-verde");
  const units = page.locator(".mr-units").first();
  await units.scrollIntoViewIfNeeded();
  // yalnız daire tipi listesi (Plan / İç mekân anahtarı da "tab"; iç mekân fotoğrafları bilerek 4:3)
  const tabs = units.locator(".list").getByRole("tab");
  const n = await tabs.count();
  test.skip(n < 2, "tek tip var");
  const h0 = (await units.boundingBox())!.height;
  for (let i = 1; i < n; i++) {
    await settle(tabs.nth(i));
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute("aria-selected", "true");
    if (isMobile(info)) {
      const gap = await units.evaluate((el) => el.querySelector(".tbl .note")!.getBoundingClientRect().top - el.querySelector(".tbl .pane.on")!.getBoundingClientRect().bottom);
      expect(gap, `tip ${i}: tablo ile not arası`).toBeLessThan(40);
      continue;
    }
    const h = (await units.boundingBox())!.height;
    expect(Math.abs(h - h0), `tip ${i}`).toBeLessThanOrEqual(1);
  }
});
