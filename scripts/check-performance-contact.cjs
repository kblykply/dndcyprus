// Optional Puppeteer tools. External maps are blocked; no forms are submitted.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require(path.join(process.env.DND_PERF_TOOLS_DIR || '/private/tmp/dnd-performance-tools', 'node_modules/puppeteer-core'));
const origin = process.env.DND_PERF_ORIGIN || 'http://127.0.0.1:3100';
const report = { measuredAt: new Date().toISOString(), checked: [], errors: [], missing: [] };
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
  try {
    for (const locale of ['tr', 'en']) for (const width of [390, 1440]) {
      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      page.on('pageerror', e => report.errors.push(e.message));
      page.on('response', r => { if (r.url().startsWith(origin) && r.status() >= 400) report.missing.push(r.url()); });
      await page.setRequestInterception(true);
      page.on('request', r => r.url().startsWith(origin) || /^(data|blob):/.test(r.url()) ? r.continue() : r.abort());
      await page.setViewport({ width, height: 844, deviceScaleFactor: 2 });
      await page.setCookie({ name: 'dnd_consent', value: encodeURIComponent(JSON.stringify({ v: 1, analytics: false, ads: false, ts: Date.now() })), url: origin });
      await page.goto(origin + '/' + locale + '/contact', { waitUntil: 'networkidle2' });
      const initialMaps = await page.$$eval('iframe[src*="google.com/maps"]', items => items.length);
      if (width === 390) assert.equal(initialMaps, 0, 'Mobile maps must wait for scrolling');
      const placeholders = await page.$$('button[aria-label="' + (locale === 'tr' ? 'Haritayı göster' : 'Show map') + '"]');
      // Both adjacent maps can activate on the same scroll; retain their stable
      // containers before the placeholder buttons are removed.
      const wrappers = await Promise.all(placeholders.map(button => button.evaluateHandle(e => e.parentElement.parentElement)));
      for (const wrapper of wrappers) {
        await wrapper.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
        await page.waitForFunction(e => !!e.querySelector('iframe'), {}, wrapper);
      }
      const maps = await page.$$eval('iframe[src*="google.com/maps"]', items => items.map(i => ({ src: i.src, title: i.title, height: i.getBoundingClientRect().height })));
      assert.equal(maps.length, 2);
      assert.ok(maps.every(i => i.title && Math.abs(i.height - 176) < 0.5));
      assert.ok(await page.evaluate(() => document.body.innerText.includes('Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya, Gazimağusa')));
      assert.equal(await page.$$eval('a[href^="https://maps.app.goo.gl/"]', items => items.length), 2);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      report.checked.push({ locale, width, initialMaps, maps, address: 'official unchanged', directMapLinks: 2, overflow: false });
      console.log(locale, width, 'contact maps passed');
      await context.close();
    }
    assert.deepEqual(report.errors, []); assert.deepEqual(report.missing, []);
    report.status = 'passed';
  } finally { await browser.close(); }
})().catch(e => { report.status = 'failed'; report.failure = String(e); console.error(e); process.exitCode = 1; }).finally(() => fs.writeFileSync(process.env.DND_PERF_REPORT || 'docs/performance-oct14-contact-checks.json', JSON.stringify(report, null, 2) + '\n'));
