// Optional audit dependencies live outside the application dependency tree.
const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const phase = process.argv[2] || "current";
if (!/^[a-z0-9-]+$/.test(phase)) throw new Error("Invalid phase");
const origin = process.env.DND_SEO_ORIGIN || "http://127.0.0.1:3100";
const toolsDirectory = process.env.DND_PERF_TOOLS_DIR || "/private/tmp/dnd-performance-tools";
const desktop = process.argv.includes("--desktop");
const routesIndex = process.argv.indexOf("--routes");
const output = `docs/seo-lighthouse-${phase}.json`;
const blocked = ["*googletagmanager.com/*", "*google-analytics.com/*", "*analytics.google.com/*", "*googleadservices.com/*", "*googlesyndication.com/*", "*doubleclick.net/*", "*google.com/pagead/*", "*connect.facebook.net/*", "*facebook.com/tr*", "*clarity.ms/*", "*bing.com/*"];

(async () => {
  const xml = await (await fetch(origin + "/sitemap.xml")).text();
  const routes = routesIndex >= 0 ? process.argv[routesIndex + 1].split(",") : [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname).concat("/tr/qr");
  if (routes.some((route) => !/^\/(tr|en)(\/[-a-z0-9]+)*$/.test(route))) throw new Error("Public TR/EN routes only");
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(new URL(origin).hostname);
  const buildId = local ? fs.readFileSync(".next/BUILD_ID", "utf8").trim() : null;
  const report = process.argv.includes("--resume") ? JSON.parse(fs.readFileSync(output)) : {
    measuredAt: new Date().toISOString(), origin, phase, buildId, device: desktop ? "desktop" : "mobile",
    environment: local ? "local production" : "live public site; deployed build ID unknown",
    method: "Lighthouse SEO category only; third-party measurement endpoints blocked to avoid recording audit traffic. This is not a performance score or ranking forecast.",
    blockedPatterns: blocked, routes, samples: [],
  };
  if (report.buildId !== buildId || report.device !== (desktop ? "desktop" : "mobile")) throw new Error("Resume profile/build mismatch");
  report.status = "running";
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
  for (const [index, route] of routes.entries()) {
    if (report.samples.some((sample) => sample.route === route)) continue;
    const raw = `/private/tmp/dnd-seo-${phase}-${index}.json`;
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [path.join(toolsDirectory, "node_modules/lighthouse/cli/index.js"), origin + route,
        "--chrome-flags=--headless --no-sandbox", "--only-categories=seo", "--output=json", "--output-path=" + raw,
        ...blocked.map(pattern => "--blocked-url-patterns=" + pattern), "--quiet", ...(desktop ? ["--preset=desktop"] : [])], { stdio: "inherit" });
      child.on("error", reject);
      child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`Lighthouse exited ${code}`)));
    });
    const data = JSON.parse(fs.readFileSync(raw));
    if (data.configSettings.blockedUrlPatterns?.length !== blocked.length) throw new Error("Tracking filter configuration was not applied");
    report.networkIsolationVerified = true;
    if (data.runtimeError || data.categories.seo.score === null) throw new Error(JSON.stringify(data.runtimeError || "SEO score unavailable"));
    const checks = data.categories.seo.auditRefs.map((ref) => {
      const audit = data.audits[ref.id];
      return { id: ref.id, weight: ref.weight, score: audit.score, mode: audit.scoreDisplayMode, title: audit.title, description: audit.description,
        ...(audit.score !== null && audit.score < 1 ? { details: audit.details, explanation: audit.explanation, warnings: audit.warnings } : {}) };
    });
    const sample = { route, score: Math.round(data.categories.seo.score * 100), lighthouseVersion: data.lighthouseVersion,
      failed: checks.filter((check) => check.weight > 0 && check.score !== null && check.score < 1),
      checks, runWarnings: data.runWarnings, finalUrl: data.finalDisplayedUrl };
    report.samples.push(sample);
    fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
    console.log(JSON.stringify({ route, score: sample.score, failed: sample.failed.map((check) => ({ id: check.id, details: check.details })) }));
  }
  report.status = "completed";
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
})().catch((error) => { console.error(error); process.exitCode = 1; });
