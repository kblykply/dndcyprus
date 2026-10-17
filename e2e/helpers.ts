import { expect, type Page, type TestInfo } from "@playwright/test";

export const LOCALES = ["tr", "en", "de", "ru", "pl"] as const;
export const PAGES = [
  "", "/about", "/projects", "/lagoon-verde", "/la-joya", "/perla", "/perla-ii", "/mariachi", "/gecitkale",
  "/team", "/press", "/contact", "/dndcyprus", "/privacy", "/terms",
] as const;
export const SITE = "https://www.dndcyprus.com";

// Testler üçüncü taraf servislere bağlı değildir: analitik, reklam, harita, YouTube ve Instagram istekleri kesilir.
export const THIRD_PARTY =
  /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net|googleadservices\.com|connect\.facebook\.net|facebook\.com\/tr|clarity\.ms|youtube(-nocookie)?\.com|ytimg\.com|instagram\.com|cdninstagram\.com|google\.com\/maps|maps\.google|maps\.googleapis\.com|wa\.me/i;
export const ANALYTICS = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net|googleadservices\.com|connect\.facebook\.net|facebook\.com\/tr|clarity\.ms/i;

type Prep = {
  /** çerez tercihi önceden kaydedilsin mi (bant kapalı açılır) */
  consent?: boolean;
  /** ana sayfadaki TL kampanya penceresi gösterilsin mi */
  popup?: boolean;
};

export async function prepare(page: Page, { consent = true, popup = false }: Prep = {}) {
  await page.addInitScript(({ consent, popup }) => {
    // betik iframe'lerde de çalışır; kesilen üçüncü taraf çerçevelerinde depolamaya erişim yasak
    if (window !== window.top) return;
    try {
      if (!popup) sessionStorage.setItem("dnd_tl_payment_popup_v1", "1");
      if (consent) {
        document.cookie = "dnd_consent=" + encodeURIComponent(JSON.stringify({ v: 1, analytics: false, ads: false, ts: Date.now() })) + "; path=/";
      }
    } catch {
      // depolama kapalı
    }
  }, { consent, popup });
  await page.route(THIRD_PARTY, (route) => route.abort());
}

/** Yakalanmamış JS hataları ve konsol hataları (kesilen üçüncü taraf istekleri hariç) */
export function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const t = m.text();
    if (/Failed to load resource|net::ERR_|ERR_FAILED|blocked by|Refused to frame/i.test(t)) return;
    errors.push(`console: ${t}`);
  });
  return errors;
}

export async function noHorizontalOverflow(page: Page) {
  const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(over, "sayfa yatayda taşmamalı").toBeLessThanOrEqual(1);
}

export const isMobile = (info: TestInfo) => /mobile/.test(info.project.name);
export const isLocalBase = (info: TestInfo) => /localhost|127\.0\.0\.1/.test(String(info.project.use.baseURL));
