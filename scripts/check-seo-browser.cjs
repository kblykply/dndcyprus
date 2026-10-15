const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const puppeteer = require(path.join(process.env.DND_PERF_TOOLS_DIR || "/private/tmp/dnd-performance-tools", "node_modules/puppeteer-core"));
const origin = process.env.DND_SEO_ORIGIN || "http://127.0.0.1:3100";
process.loadEnvFile(".env");

(async () => {
  const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--no-sandbox"] });
  const checked = [], errors = [];
  try {
    for (const route of ["/tr/blog/dnd-usa-quality-in-cyprus-interview-2025", "/en/dndcyprus"]) for (const width of [390, 1440]) {
      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push({ route, width, message: error.message }));
      await page.setRequestInterception(true);
      page.on("request", (request) => request.url().startsWith(origin) || /^(data|blob):/.test(request.url()) ? request.continue() : request.abort());
      await page.setCookie({ name: "dnd_consent", value: encodeURIComponent(JSON.stringify({ v: 1, analytics: false, ads: false, ts: Date.now() })), url: origin });
      await page.setViewport({ width, height: 844 });
      await page.goto(origin + route, { waitUntil: "networkidle2" });
      const state = await page.evaluate(() => {
        const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent));
        return { schemas, headings: [...document.querySelectorAll("h1")].map((node) => node.textContent), overflow: document.documentElement.scrollWidth > innerWidth + 1 };
      });
      assert.equal(state.overflow, false);
      assert.equal(state.headings.length, 1);
      assert.equal(state.schemas.filter((schema) => schema["@type"] === "Organization").length, 1);
      if (route.startsWith("/tr/blog/")) {
        assert.equal(state.schemas.filter((schema) => schema["@type"] === "BlogPosting").length, 1);
        assert.equal(state.schemas.find((schema) => schema["@type"] === "BlogPosting").headline, state.headings[0]);
        assert.ok(await page.$eval("article", (node) => node.textContent.includes("USA Quality in Cyprus")));
      }
      checked.push({ route, width, checks: "one legal Organization; source-backed article schema where applicable; visible content; no hydration errors or horizontal overflow" });
      await context.close();
    }
    assert.ok(process.env.NEXT_PUBLIC_GA4_ID, "GA4 configuration is required for the environment checks");
    for (const analytics of [false, true]) {
      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      const blockedHosts = new Set();
      page.on("pageerror", (error) => errors.push({ analytics, message: error.message }));
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        if (request.url().startsWith(origin) || /^(data|blob):/.test(request.url())) return request.continue();
        blockedHosts.add(new URL(request.url()).hostname);
        return request.abort();
      });
      await page.setCookie({ name: "dnd_consent", value: encodeURIComponent(JSON.stringify({ v: 1, analytics, ads: false, ts: Date.now() })), url: origin });
      await page.goto(origin + "/tr/blog/dnd-usa-quality-in-cyprus-interview-2025?utm_source=seo-local-test", { waitUntil: "networkidle2" });
      await page.waitForFunction((ga4Id) => (window.dataLayer || []).some((entry) => entry[0] === "config" && entry[1] === ga4Id), { timeout: 15000 }, process.env.NEXT_PUBLIC_GA4_ID);
      if (analytics) {
        await page.waitForFunction(() => typeof window.clarity === "function", { timeout: 10000 });
        await page.evaluate(() => {
          Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "hidden" });
          document.dispatchEvent(new Event("visibilitychange"));
        });
        await page.waitForFunction(() => (window.dataLayer || []).some((entry) => entry[0] === "event" && entry[1] === "web_vital"), { timeout: 10000 });
      }
      const state = await page.evaluate(() => ({
        vitals: (window.dataLayer || []).filter((entry) => entry[0] === "event" && entry[1] === "web_vital").map((entry) => entry[2]),
        metaLoaded: !!window.fbq, clarityLoaded: !!window.clarity,
      }));
      assert.equal(state.metaLoaded, false);
      assert.equal(state.clarityLoaded, analytics);
      if (!analytics) assert.equal(state.vitals.length, 0);
      for (const vital of state.vitals) {
        assert.equal(vital.send_to, process.env.NEXT_PUBLIC_GA4_ID);
        assert.equal(vital.page_path, "/tr/blog/dnd-usa-quality-in-cyprus-interview-2025");
        assert.ok(!vital.page_path.includes("?"));
      }
      checked.push({ analytics, ads: false, checks: "configured GA4 queue; consent-gated Web Vitals and Clarity; Meta remains disabled; metric paths exclude query strings", vitalEventsQueued: state.vitals.length, externalRequests: "all blocked before sending", blockedHosts: [...blockedHosts] });
      await context.close();
    }
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
  fs.writeFileSync(process.env.DND_SEO_BROWSER_REPORT || "docs/seo-browser-2026-10-15.json", JSON.stringify({ measuredAt: new Date().toISOString(), status: "passed", checked, errors }, null, 2) + "\n");
  console.log(JSON.stringify({ status: "passed", checked: checked.length, errors }, null, 2));
})().catch((error) => { console.error(error); process.exitCode = 1; });
