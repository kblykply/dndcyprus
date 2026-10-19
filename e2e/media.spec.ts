import { expect, test } from "@playwright/test";
import { isMobile, prepare, settle } from "./helpers";

test.beforeEach(async ({ page }) => {
  await prepare(page);
});

// ana sayfa vitrini (Ekim 2026): video yerine projeler sırayla döner — NeoCity, Lagoon Verde, La Joya, Perla, Perla II
test("ana sayfa vitrini: tek H1, ilk slayt NeoCity ve öncelikli görsel, oklar sıradaki projeye geçer", async ({ page }) => {
  await page.goto("/tr");
  const hero = page.locator("section.az-hs");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText("DND Cyprus — Hayalinizdeki yaşam burada başlıyor");
  await expect(hero.locator(".sl")).toHaveCount(5);
  // ilk slayt öncelikli iner; dik telefon ekranında yalnız görünen orta bölge (hero-dik.jpg)
  const first = hero.locator(".sl").first().locator("img.bg");
  await expect(first).toHaveAttribute("fetchpriority", "high");
  await expect(first).toHaveAttribute("srcset", /_next\/image\?url=%2Fneocity%2Fhero\.jpg/);
  await expect(hero.locator(".sl").first().locator("source")).toHaveAttribute("srcset", /_next\/image\?url=%2Fneocity%2Fhero-dik\.jpg/);
  await expect(hero.locator(".nm")).toHaveText("NeoCity");
  // kendiliğinden geçiş durdurulur (telefonda düğme gizli, slayt 7 sn), oklarla sırayla gezilir
  const pause = hero.getByRole("button", { name: "Durdur" });
  if (await pause.isVisible()) await pause.click();
  await hero.getByRole("button", { name: "Sonraki proje" }).click();
  await expect(hero.locator(".nm")).toHaveText("Lagoon Verde Rezidansları ve Tatil Koyu");
  await expect(hero.getByRole("link", { name: /Projeyi keşfet/ })).toHaveAttribute("href", "/tr/lagoon-verde");
  await hero.getByRole("button", { name: "Önceki proje" }).click();
  await expect(hero.locator(".nm")).toHaveText("NeoCity");
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

// NeoCity (Ekim 2026): vaziyet planı gündüz / gece anahtarı, 5 Sıfır ödeme bölümü; Mariachi ve teknik donanım yok
test("NeoCity: vaziyet planı anahtarı çalışır, ödeme planı var, Mariachi bölümü yok", async ({ page }) => {
  await page.goto("/tr/neocity");
  const site = page.locator("#vaziyet-plani");
  await site.scrollIntoViewIfNeeded();
  const night = site.getByRole("button", { name: "Gece" });
  await settle(night);
  await night.click();
  await expect(night).toHaveAttribute("aria-pressed", "true");
  await expect(site.locator("img.on")).toHaveAttribute("src", "/neocity/vaziyet-gece.jpg");
  await expect(page.locator("#odeme-plani .zeros li")).toHaveCount(5);
  await expect(page.locator("#mariachi")).toHaveCount(0);
  await expect(page.locator("#teknik-donanim")).toHaveCount(0);
  // konum: sunumdaki arsanın koordinatı (canlı harita + yol tarifi); mesafeler dakika
  await expect(page.locator("#konum .map.live iframe")).toHaveAttribute("src", /35\.15406%2C33\.85201/);
  await expect(page.locator("#konum .btns a").first()).toHaveAttribute("href", /destination=35\.15406%2C33\.85201/);
  await expect(page.locator("#konum .az-dist li").first()).toContainText("dk");
});
