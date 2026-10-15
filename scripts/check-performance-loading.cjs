// Optional Puppeteer tools; run against a local production server.
// External services are blocked and no forms are submitted.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require(path.join(process.env.DND_PERF_TOOLS_DIR || '/private/tmp/dnd-performance-tools', 'node_modules/puppeteer-core'));
const origin = process.env.DND_PERF_ORIGIN || 'http://127.0.0.1:3100';
const output = process.env.DND_PERF_REPORT || 'docs/performance-oct14-loading-checks.json';
const report = { measuredAt: new Date().toISOString(), status: 'running', checked: [], errors: [], missing: [] };
const save = () => fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
  try {
    for (const locale of ['tr', 'en']) for (const width of [390, 1440]) {
      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      const requests = [];
      page.on('pageerror', e => report.errors.push(e.message));
      page.on('response', r => { if (r.url().startsWith(origin) && r.status() >= 400) report.missing.push(r.url()); });
      await page.setRequestInterception(true);
      page.on('request', r => {
        if (r.url().startsWith(origin) || /^(data|blob):/.test(r.url())) { requests.push(r.url()); r.continue(); }
        else r.abort();
      });
      await page.setViewport({ width, height: 844, deviceScaleFactor: 2 });
      await page.goto(origin + '/' + locale, { waitUntil: 'networkidle2' });
      const hero = '.hero-carousel [data-hero-slide="0"] img';
      await page.waitForFunction(s => { const i = document.querySelector(s); return i?.complete && i.naturalWidth > 0; }, {}, hero);
      assert.equal(await page.$eval(hero, i => i.fetchPriority), 'high');
      assert.equal(requests.some(url => decodeURIComponent(url).includes('/dnd-boston-ofis.jpg')), false, 'Timeline must wait for scrolling');
      assert.equal(requests.some(url => new URL(url).pathname.startsWith('/logos/')), false, 'Original PNG logos must not load');
      const consent = await page.$('[role="dialog"][aria-modal="false"]');
      assert.ok(consent, 'Fresh visitors must see consent');
      assert.ok(await consent.evaluate(e => getComputedStyle(e).display !== 'none'));
      await page.screenshot({ path: '/private/tmp/dnd-oct14-home-' + locale + '-' + width + '.png' });

      // Saved preferences hide the banner on the next document load.
      await page.setCookie({ name: 'dnd_consent', value: encodeURIComponent(JSON.stringify({ v: 1, analytics: false, ads: false, ts: Date.now() })), url: origin });
      await page.reload({ waitUntil: 'networkidle2' });
      assert.equal(await page.evaluate(() => document.documentElement.dataset.dndConsent), 'saved');
      assert.equal(await page.$('[role="dialog"][aria-modal="false"]'), null);
      await page.$eval('#story', e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
      const next = '#story button[aria-label="' + (locale === 'tr' ? 'Sonraki' : 'Next') + '"]';
      const milestoneImages = [];
      for (let index = 0; index < 6; index++) {
        await page.waitForFunction(() => { const i = [...document.querySelectorAll('#story img')].filter(i => i.alt).at(-1); return i?.complete && i.naturalWidth > 0; });
        milestoneImages.push(await page.$$eval('#story img', images => images.filter(i => i.alt).map(i => ({ alt: i.alt, src: i.currentSrc }))));
        if (index < 5) {
          const previous = await page.$$eval('#story img', images => images.filter(i => i.alt).map(i => i.alt).join('|'));
          await page.$eval(next, e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
          await page.click(next);
          await page.waitForFunction(previous => [...document.querySelectorAll('#story img')].filter(i => i.alt).map(i => i.alt).join('|') !== previous, {}, previous);
        }
      }
      const last = await page.$eval('#story', e => e.innerText);
      assert.ok(last.includes('2025') && last.includes('La Joya'));
      const brands = 'section[aria-label="Our Brands & Projects"]';
      const brandSection = await page.$(brands); assert.ok(brandSection);
      const logoCards = await page.$$(brands + ' li');
      assert.equal(logoCards.length, 7);
      for (const card of logoCards) {
        await card.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
        await page.waitForFunction(card => { const i = card.querySelector('img'); return i?.complete && i.naturalWidth > 0; }, {}, card);
      }
      const logos = await page.$$eval(brands + ' img', images => images.map(i => ({ alt: i.alt, src: i.currentSrc })));
      assert.equal(logos.length, 7);
      assert.ok(logos.every(i => i.src.includes('/_next/image?')));
      let optimizedBytes = 0, originalBytes = 0;
      for (const logo of logos) {
        const source = new URL(logo.src).searchParams.get('url');
        originalBytes += fs.statSync(path.join('public', source)).size;
        const response = await fetch(logo.src);
        assert.ok(response.ok);
        optimizedBytes += (await response.arrayBuffer()).byteLength;
      }
      await brandSection.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
      await page.screenshot({ path: '/private/tmp/dnd-oct14-brands-' + locale + '-' + width + '.png' });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      report.checked.push({ locale, width, deviceScaleFactor: 2, heroPriority: 'high', timelineDeferred: true, milestoneImages, logos, logoBytes: { original: originalBytes, optimized: optimizedBytes }, consent: 'fresh visible; saved hidden', overflow: false });
      save(); console.log(locale, width, 'loading checks passed', { originalBytes, optimizedBytes });
      await context.close();
    }
    assert.deepEqual(report.errors, []); assert.deepEqual(report.missing, []);
    report.status = 'passed'; save();
  } finally { await browser.close(); }
})().catch(e => { report.status = 'failed'; report.failure = String(e); save(); console.error(e); process.exitCode = 1; });
