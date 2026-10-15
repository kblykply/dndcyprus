const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require(path.join(process.env.DND_PERF_TOOLS_DIR || '/private/tmp/dnd-performance-tools', 'node_modules/puppeteer-core'));
const origin = process.env.DND_PERF_ORIGIN || 'http://127.0.0.1:3100';
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
  const checked = [];
  try {
    for (const locale of ['tr', 'en']) {
      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      const fontRequests = [];
      await page.setRequestInterception(true);
      page.on('request', r => {
        if (/\.woff2(?:\?|$)/.test(r.url())) fontRequests.push(r.url());
        return r.url().startsWith(origin) || /^(data|blob):/.test(r.url()) ? r.continue() : r.abort();
      });
      await page.goto(origin + '/' + locale, { waitUntil: 'networkidle2' });
      const initialFontRequests = [...new Set(fontRequests)];
      const result = await page.evaluate(async () => {
        await document.fonts.ready;
        // Next route styles can register the same family twice; count distinct
        // faces and verify actual network requests separately below.
        const initialFonts = [...new Set([...document.fonts].filter(f => f.status === 'loaded' && !/Fallback/i.test(f.family)).map(f => f.family))];
        const sans = getComputedStyle(document.body).fontFamily;
        const heading = getComputedStyle(document.querySelector('h2')).fontFamily;
        const sample = 'ÇĞİÖŞÜçğıöşü©€₺–’ąęłńśźżБрошюра';
        await document.fonts.load('400 16px ' + sans, sample);
        await document.fonts.load('500 16px ' + heading, sample);
        await document.fonts.ready;
        return { locale: document.documentElement.lang, sans, heading, initialFonts, preloadedFonts: document.querySelectorAll('link[as="font"]').length, loadedFonts: [...new Map([...document.fonts].filter(f => f.status === 'loaded' && !/Fallback/i.test(f.family)).map(f => [f.family + '/' + f.weight, { family: f.family, weight: f.weight }])).values()], sansLoaded: document.fonts.check('400 16px ' + sans, sample), headingLoaded: document.fonts.check('500 16px ' + heading, sample) };
      });
      assert.equal(result.locale, locale);
      assert.equal(result.preloadedFonts, 2);
      assert.equal(initialFontRequests.length, 2, 'Only the two core files should be downloaded initially');
      assert.ok(result.sansLoaded && result.headingLoaded);
      assert.equal(result.initialFonts.length, 2, JSON.stringify({ locale, initialFonts: result.initialFonts }));
      assert.ok(result.initialFonts.every(f => !/Cyrillic/.test(f)));
      assert.equal(result.loadedFonts.length, 4);
      checked.push({ ...result, initialFontRequests });
      await context.close();
    }
  } finally { await browser.close(); }
  fs.writeFileSync(process.env.DND_PERF_REPORT || 'docs/performance-font-checks.json', JSON.stringify({ measuredAt: new Date().toISOString(), status: 'passed', checked }, null, 2) + '\n');
  console.log(JSON.stringify(checked));
})().catch(e => { console.error(e); process.exitCode = 1; });
