import { defineConfig, devices } from "@playwright/test";

// Uçtan uca testler (Playwright). Yerelde: `npm run build` sonra `npm run test:e2e`
// (sunucuyu kendisi başlatır). Çalışan bir sunucuya karşı: E2E_BASE_URL=http://localhost:3113 npm run test:e2e
// WebKit projesi Safari motorudur ama gerçek iOS Safari'nin yerini tutmaz.
const PORT = Number(process.env.E2E_PORT || 3200);
const baseURL = process.env.E2E_BASE_URL || `http://localhost:${PORT}`;
// Yerelde kurulu Chromium sürümü farklıysa: PW_CHROMIUM_EXECUTABLE=/yol/chrome-headless-shell (CI'da gerekmez)
const chromiumLaunch = process.env.PW_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PW_CHROMIUM_EXECUTABLE } : {};

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Titrek test tekrar denemeyle gizlenmez: hata ilk denemede raporlanır.
  retries: 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    locale: "tr-TR",
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, launchOptions: chromiumLaunch } },
    { name: "chromium-mobile", use: { ...devices["Pixel 7"], launchOptions: chromiumLaunch } },
    { name: "webkit-mobile", use: { ...devices["iPhone 13"] } },
    { name: "firefox-desktop", use: { ...devices["Desktop Firefox"], viewport: { width: 1280, height: 800 } } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : { command: `npx next start -p ${PORT}`, url: `${baseURL}/tr`, reuseExistingServer: !process.env.CI, timeout: 120_000 },
});
