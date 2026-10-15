// Requires optional lighthouse audit tools, separate from application dependencies.
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const phase = process.argv[2] || 'current';
const toolsDirectory = process.env.DND_PERF_TOOLS_DIR || '/private/tmp/dnd-performance-tools';
const origin = process.env.DND_PERF_ORIGIN || 'http://127.0.0.1:3100';
const routeArgument = process.argv.indexOf('--routes');
const desktop = process.argv.includes('--desktop');
const savedConsent = process.argv.includes('--saved-consent');
const blockTracking = process.argv.includes('--block-tracking');
const blockedPatterns = ['*googletagmanager.com/*', '*google-analytics.com/*', '*analytics.google.com/*', '*googleadservices.com/*', '*googlesyndication.com/*', '*doubleclick.net/*', '*google.com/pagead/*', '*connect.facebook.net/*', '*facebook.com/tr*', '*clarity.ms/*', '*bing.com/*'];
const routes = routeArgument >= 0 ? process.argv[routeArgument + 1].split(',') : process.argv.includes('--qr-only') ? ['/tr/qr'] : process.argv.includes('--media-only') ? ['/tr/mariachi', '/tr/gecitkale'] : ['/tr', '/tr', '/tr', '/en', '/tr/team', '/tr/about', '/tr/qr'];
if (routes.some(route => !/^\/(tr|en)(\/[-a-z0-9]+)*$/.test(route))) throw new Error('Only public TR/EN routes can be audited');
const output = 'docs/performance-' + phase + '-lighthouse.json';
const buildId = fs.readFileSync('.next/BUILD_ID', 'utf8').trim();
const visit = savedConsent ? 'saved preferences; cold cache' : 'first visit';
const report = process.argv.includes('--resume') ? JSON.parse(fs.readFileSync(output)) : { measuredAt: new Date().toISOString(), origin, phase, device: desktop ? 'desktop' : 'mobile', visit, method: 'Lighthouse 13.5 ' + (desktop ? 'desktop preset' : 'default simulated mobile throttling') + '; ' + visit + '; laboratory data. Sample counts recorded per route.', sampleCounts: routes.reduce((counts, route) => ({ ...counts, [route]: (counts[route] || 0) + 1 }), {}), buildId, samples: [] };
if (report.buildId !== buildId) throw new Error('Cannot combine samples from different builds');
if ((report.device || 'mobile') !== (desktop ? 'desktop' : 'mobile') || (report.visit || 'first visit') !== visit) throw new Error('Cannot combine different audit profiles');
if (process.argv.includes('--resume') && !!report.blockTracking !== blockTracking) throw new Error('Cannot combine different third-party network profiles');
report.blockTracking = blockTracking;
if (blockTracking) report.method += '; analytics/advertising endpoints blocked; application performance only';
report.status = 'running';
(async () => {
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index];
    if (report.samples.some(s => s.sample === index + 1)) continue;
    const rawPath = '/private/tmp/dnd-' + phase + '-' + index + '.json';
    let browser;
    const sessionFlags = [];
    if (savedConsent) {
      const puppeteer = require(path.join(toolsDirectory, 'node_modules/puppeteer-core'));
      browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.setCookie({ name: 'dnd_consent', value: encodeURIComponent(JSON.stringify({ v: 1, analytics: false, ads: false, ts: Date.now() })), url: origin });
      sessionFlags.push('--port=' + new URL(browser.wsEndpoint()).port, '--disable-storage-reset');
    }
    try {
    await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(toolsDirectory, 'node_modules/lighthouse/cli/index.js'), origin + route, '--chrome-flags=--headless --no-sandbox', '--only-categories=performance', '--output=json', '--output-path=' + rawPath, '--quiet', ...(blockTracking ? blockedPatterns.map(pattern => '--blocked-url-patterns=' + pattern) : []), ...(desktop ? ['--preset=desktop'] : []), ...sessionFlags], { stdio: 'inherit' });
      child.on('error', reject);
      child.on('exit', code => code === 0 ? resolve() : reject(new Error('Lighthouse exit ' + code)));
    });
    } finally { if (browser) await browser.close(); }
    const data = JSON.parse(fs.readFileSync(rawPath));
    const audits = data.audits;
    if (blockTracking) {
      const leaked = audits['network-requests'].details.items.filter(item => {
        if (!item.transferSize || !/^https?:/.test(item.url)) return false;
        return /(^|\.)(googletagmanager\.com|google-analytics\.com|analytics\.google\.com|googleadservices\.com|googlesyndication\.com|doubleclick\.net|connect\.facebook\.net|clarity\.ms|bing\.com)$/i.test(new URL(item.url).hostname);
      });
      if (data.configSettings.blockedUrlPatterns?.length !== blockedPatterns.length || leaked.length) throw new Error('Tracking isolation failed; comparison sample rejected');
      report.networkIsolationVerified = true;
    }
    const sample = { route, sample: index + 1, score: Math.round(data.categories.performance.score * 100), lcpMs: audits['largest-contentful-paint'].numericValue, fcpMs: audits['first-contentful-paint'].numericValue, tbtMs: audits['total-blocking-time'].numericValue, cls: audits['cumulative-layout-shift'].numericValue, transferBytes: audits['total-byte-weight'].numericValue, fontBytes: audits['network-requests'].details.items.filter(i => i.resourceType === 'Font').reduce((s, i) => s + i.transferSize, 0), lcpNode: audits['lcp-breakdown-insight']?.details?.items?.filter(i => i.type === 'node').map(i => ({ label: i.nodeLabel, selector: i.selector })), warnings: data.runWarnings };
    sample.findings = {
      lcpBreakdown: audits['lcp-breakdown-insight']?.details?.items?.find(i => i.type === 'table')?.items,
      renderBlocking: audits['render-blocking-insight']?.details?.items,
      unusedJavaScriptBytes: audits['unused-javascript']?.details?.overallSavingsBytes || 0,
      imageSavingsBytes: audits['image-delivery-insight']?.details?.debugData?.wastedBytes || 0,
      largestAssets: audits['network-requests'].details.items.filter(i => ['Font', 'Script', 'Image', 'Stylesheet'].includes(i.resourceType)).sort((a, b) => b.transferSize - a.transferSize).slice(0, 12).map(i => ({ url: i.url, type: i.resourceType, transferBytes: i.transferSize, priority: i.priority })),
    };
    sample.transferByType = audits['network-requests'].details.items.reduce((totals, item) => ({ ...totals, [item.resourceType || 'Unknown']: (totals[item.resourceType || 'Unknown'] || 0) + item.transferSize }), {});
    report.samples.push(sample);
    fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({ ...sample, findings: undefined }));
  }
  report.status = 'passed';
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
})().catch(e => { report.status = 'failed'; report.failure = String(e); fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n'); console.error(e); process.exitCode = 1; });
