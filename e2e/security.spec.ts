import { expect, test } from "@playwright/test";

test.beforeEach(({}, info) => {
  test.skip(info.project.name !== "chromium-desktop", "başlık testleri tek projede çalışır");
});

for (const path of ["/tr", "/en/lagoon-verde", "/tours/360/index.html"]) {
  test(`${path}: güvenlik başlıkları`, async ({ request }) => {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    const h = res.headers();
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["x-frame-options"]).toBe("SAMEORIGIN");
    expect(h["content-security-policy"]).toContain("frame-ancestors 'self'");
    expect(h["permissions-policy"]).toContain("camera=()");
    expect(h["x-powered-by"]).toBeUndefined();
  });
}
