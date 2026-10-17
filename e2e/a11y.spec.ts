import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { prepare } from "./helpers";

// axe-core ile otomatik erişilebilirlik taraması (WCAG 2.1 A/AA kuralları).
// Otomatik tarama sorunların bir kısmını yakalar; klavye ve ekran okuyucu ile elle kontrolün yerini tutmaz.
// Bilinen ve karar bekleyen tek istisna: marka mercan rengi (#f15c34) üzerinde beyaz 13 px düğme metni 3.32:1
// (AA 4.5:1 ister). Rengi değiştirmek tasarım kararı olduğu için raporda öneri olarak duruyor; test bunu not düşer.
const BRAND_CORAL = "#f15c34";
test.beforeEach(({}, info) => {
  test.skip(!["chromium-desktop", "chromium-mobile"].includes(info.project.name), "axe Chromium'da");
});

for (const path of ["/tr", "/tr/lagoon-verde", "/tr/contact", "/tr/press", "/tr/about", "/en/projects"]) {
  test(`${path}: ciddi ve kritik erişilebilirlik ihlali yok`, async ({ page }) => {
    await prepare(page);
    // görünme animasyonları yarıda ölçülmesin (yarı saydam metin yanlış kontrast hatası verir)
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForLoadState("load");
    // görünür olunca beliren bölümler taramaya girsin
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, 0);
      document.querySelectorAll(".rv").forEach((e) => e.classList.add("in"));
    });
    // sonsuz döngülü animasyonlar (kayan şerit vb.) hariç hepsi bitmiş olmalı
    await page.waitForFunction(() =>
      document.getAnimations().filter((a) => a.effect?.getTiming().iterations !== Infinity).every((a) => a.playState !== "running"));
    // @axe-core/playwright kendi playwright-core türlerini kullanıyor; çalışma anında aynı sayfa nesnesi
    const res = await new AxeBuilder({ page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]["page"] })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .exclude("iframe")
      .analyze();
    let coral = 0;
    const bad = res.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => {
        if (v.id !== "color-contrast") return v;
        const nodes = v.nodes.filter((n) => {
          const d = (n.any[0]?.data || {}) as { fgColor?: string; bgColor?: string };
          const isCoral = d.fgColor === BRAND_CORAL || d.bgColor === BRAND_CORAL;
          if (isCoral) coral++;
          return !isCoral;
        });
        return { ...v, nodes };
      })
      .filter((v) => v.nodes.length > 0);
    if (coral) test.info().annotations.push({ type: "bilinen", description: `mercan düğme kontrastı (${coral} öğe) — karar bekliyor` });
    const summary = bad.map((v) => `${v.impact} ${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
    expect(summary, summary.join("\n")).toEqual([]);
  });
}

test("klavye: Tab ile ilk odak atlama bağlantısı ya da menüdedir ve odak görünür", async ({ page }, info) => {
  test.skip(info.project.name !== "chromium-desktop", "masaüstü klavye");
  await prepare(page);
  await page.goto("/tr/about");
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { tag: el.tagName, inNav: !!el.closest("#az-nav, .skip, [href='#main']"), outline: cs.outlineStyle !== "none" || cs.boxShadow !== "none" };
  });
  expect(focused?.inNav).toBe(true);
  expect(focused?.outline, "odak halkası görünmeli").toBe(true);
});
