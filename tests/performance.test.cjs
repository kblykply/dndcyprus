const test = require("node:test");
const assert = require("node:assert/strict");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

test("floating controls share one geometry pass and stop observing after unmount", () => {
  const effects = [];
  const updates = [];
  const frames = new Map();
  const listeners = new Map();
  let nextFrame = 0;
  let sectionReads = 0;
  let disconnects = 0;
  const rect = { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100 };
  const { useLightBackground } = loadTypeScript("app/components/performance/useLightBackground.ts", {
    mocks: { react: {
      useState: () => [false, value => updates.push(value)],
      useEffect: effect => effects.push(effect),
    } },
    globals: {
      requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame; },
      cancelAnimationFrame: id => frames.delete(id),
      window: {
        addEventListener: (event, callback) => listeners.set(event, callback),
        removeEventListener: event => listeners.delete(event),
      },
      document: {
        body: {},
        getElementById: () => ({ getBoundingClientRect: () => rect }),
        querySelectorAll: () => [{ getBoundingClientRect: () => { sectionReads++; return rect; } }],
        addEventListener: (event, callback) => listeners.set(event, callback),
        removeEventListener: event => listeners.delete(event),
      },
      MutationObserver: class { observe() {} disconnect() { disconnects++; } },
      ResizeObserver: class { observe() {} disconnect() { disconnects++; } },
    },
  });
  useLightBackground("social-icons");
  useLightBackground("whatsapp-fab");
  const cleanups = effects.map(effect => effect());
  // Repeated scroll events before a paint must not repeat DOM geometry reads.
  for (let i = 0; i < 20; i++) listeners.get("scroll")();
  assert.equal(frames.size, 1);
  const [id, measure] = [...frames][0];
  frames.delete(id);
  measure();
  assert.equal(sectionReads, 1);
  assert.deepEqual(updates, [true, true]);
  cleanups[0]();
  assert.ok(listeners.has("scroll"));
  listeners.get("scroll")();
  cleanups[1]();
  assert.equal(listeners.size, 0);
  assert.equal(frames.size, 0);
  assert.equal(disconnects, 2);
});

test("hidden floating controls do not scan page geometry", () => {
  let effect;
  let measure;
  const { useLightBackground } = loadTypeScript("app/components/performance/useLightBackground.ts", {
    mocks: { react: { useState: () => [false, () => {}], useEffect: callback => { effect = callback; } } },
    globals: {
      requestAnimationFrame: callback => { measure = callback; return 1; },
      cancelAnimationFrame: () => {},
      window: { addEventListener() {}, removeEventListener() {} },
      document: {
        body: {}, addEventListener() {}, removeEventListener() {},
        getElementById: () => ({ getBoundingClientRect: () => ({ width: 0, height: 0 }) }),
        querySelectorAll: () => { throw new Error("Hidden controls must not scan sections"); },
      },
      MutationObserver: class { observe() {} disconnect() {} },
    },
  });
  useLightBackground("social-icons");
  const cleanup = effect();
  measure();
  cleanup();
});

test("Web Vitals respect analytics consent and exclude query strings and private pages", () => {
  let report;
  let consent = false;
  const events = [];
  const location = { pathname: "/tr/perla-ii", search: "?email=private@example.invalid" };
  const { default: WebVitals } = loadTypeScript("app/components/analytics/WebVitals.tsx", {
    mocks: {
      react: { useCallback: callback => callback },
      "next/web-vitals": { useReportWebVitals: callback => { report = callback; } },
      "@/lib/analytics": {
        ANALYTICS_ENV: { ga4Id: "G-TEST" },
        hasConsent: () => consent,
        isAdminPath: path => path.startsWith("/admin"),
      },
    },
    globals: { location, window: { gtag: (...args) => events.push(args) } },
  });
  WebVitals();
  const metric = { name: "LCP", value: 1250, id: "test-metric", rating: "good" };
  report(metric);
  assert.equal(events.length, 0);
  consent = true;
  report(metric);
  assert.equal(events.length, 1);
  assert.equal(events[0][2].page_path, "/tr/perla-ii");
  assert.equal(events[0][2].metric_value, 1250);
  assert.ok(!JSON.stringify(events).includes("private@example"));
  location.pathname = "/admin/leads";
  report(metric);
  location.pathname = "/tr/qr";
  report(metric);
  consent = false;
  location.pathname = "/en";
  report(metric);
  assert.equal(events.length, 1);
});
