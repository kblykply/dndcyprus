import { expect, test } from "@playwright/test";
import { LOCALES, SITE } from "./helpers";

test.beforeEach(({}, info) => {
  test.skip(info.project.name !== "chromium-desktop", "SEO testleri tek projede çalışır");
});

const KEY_PAGES = ["", "/lagoon-verde", "/contact", "/press"];

for (const locale of LOCALES) {
  for (const p of KEY_PAGES) {
    const path = `/${locale}${p}`;
    test(`${path}: canonical, hreflang, başlık, paylaşım görseli`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      const html = await res.text();
      const head = html.slice(0, html.indexOf("</head>"));
      expect(head).toContain(`<link rel="canonical" href="${SITE}${path}"`);
      for (const l of [...LOCALES, "x-default"]) expect(head).toMatch(new RegExp(`hrefLang="${l}"`, "i"));
      expect(head).toMatch(/<title>[^<]{10,70}<\/title>/);
      expect(head).toMatch(/<meta name="description" content="[^"]{50,}"/);
      expect(head).toMatch(/<meta property="og:image" content="https:\/\//);
      expect(head).not.toMatch(/<meta name="robots" content="[^"]*noindex/);
    });
  }
}

test("robots.txt yönetim ve API yollarını kapatır, site haritasını gösterir", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  expect(txt).toContain("Disallow: /admin");
  expect(txt).toContain("Disallow: /api/");
  expect(txt).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});

test("site haritası 5 dilde bütün sayfaları listeler", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.length).toBeGreaterThanOrEqual(75);
  for (const l of LOCALES) expect(locs).toContain(`${SITE}/${l}/lagoon-verde`);
});

test("yönetim paneli girişsiz açılmaz, sahte çerez işe yaramaz", async ({ request }) => {
  for (const headers of [{} as Record<string, string>, { cookie: "admin_session=1" }, { cookie: `admin_session=${Date.now() + 9e6}.${"a".repeat(64)}` }]) {
    const res = await request.get("/admin/leads", { headers, maxRedirects: 0 });
    expect(res.status()).toBeGreaterThanOrEqual(300);
    expect(res.status()).toBeLessThan(400);
    expect(res.headers()["location"]).toContain("/admin/login");
  }
});

test("eski adresler kalıcı yönlendirilir", async ({ request }) => {
  const res = await request.get("/lagoon-verde", { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers()["location"]).toBe("/tr/lagoon-verde");
});
