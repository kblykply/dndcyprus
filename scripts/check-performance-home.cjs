const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require(path.join(process.env.DND_PERF_TOOLS_DIR || '/private/tmp/dnd-performance-tools', 'node_modules/puppeteer-core'));
const origin = process.env.DND_PERF_ORIGIN || 'http://127.0.0.1:3100';
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
  const checked = [], errors = [], missing = [];
  try {
    const page = await browser.newPage();
    page.on('pageerror', e => errors.push(e.message));
    await page.setRequestInterception(true);
    page.on('request', r => r.url().startsWith(origin) || /^(data|blob):/.test(r.url()) ? r.continue() : r.abort());
    page.on('response', r => { if (r.url().startsWith(origin) && r.status() >= 400) missing.push(r.url()); });
    await page.setCookie({ name: 'dnd_consent', value: encodeURIComponent(JSON.stringify({ v: 1, analytics: false, ads: false, ts: Date.now() })), url: origin });
    for (const locale of ['tr', 'en']) for (const width of [390, 1440]) {
      await page.setViewport({ width, height: 844, deviceScaleFactor: 2 });
      await page.goto(origin + '/' + locale + '#la-joya', { waitUntil: 'networkidle2' });
      await page.waitForFunction(locale => document.querySelector('.hero-carousel [aria-hidden="false"]')?.innerText.includes(locale === 'tr' ? 'Tamamlanan Proje · 2025' : 'Completed Project · 2025'), {}, locale);
      const spotlight = 'section[aria-label="Ozan Dökmecioğlu — Spotlight"]';
      await page.$eval(spotlight, e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
      await page.waitForFunction(s => [...document.querySelectorAll(s + ' img')].length >= 5 && [...document.querySelectorAll(s + ' img')].every(i => i.complete && i.naturalWidth > 0), {}, spotlight);
      assert.ok(await page.$eval(spotlight + ' h2', e => e.textContent.includes('Ozan')));
      assert.ok(await page.$$eval(spotlight + ' ul img', images => images.every(i => i.currentSrc.includes('/_next/image?'))));
      const stats = 'section[aria-label="' + (locale === 'tr' ? 'Rakamlarla DND' : 'DND in Numbers') + '"]';
      await page.$eval(stats, e => e.scrollIntoView({ behavior: 'instant', block: 'start' }));
      await page.waitForFunction(s => { const i = document.querySelector(s + ' img'); return i?.complete && i.naturalWidth > 0; }, {}, stats);
      await page.waitForFunction(s => [...document.querySelectorAll(s + ' .tabular-nums')].map(e => e.textContent.replace(/\D/g, '')).join(',') === '30000,8,4', {}, stats);
      assert.equal(await page.$eval(stats, e => getComputedStyle(e).backgroundColor), 'rgb(11, 11, 12)');
      assert.equal(await page.$eval(stats + ' h2', e => getComputedStyle(e).color), 'rgb(255, 255, 255)');
      assert.ok(await page.$eval(stats + ' img', i => i.currentSrc.includes('url=%2Fperla%2F9.jpg') && i.currentSrc.includes('q=65')));
      await page.$eval(stats + ' div[class*="min-h-[460px]"]', e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
      await page.waitForFunction(s => { const images = [...document.querySelectorAll(s + ' img')]; return images.length === 2 && images.every(i => i.complete && i.naturalWidth > 0); }, {}, stats);
      await page.$eval(stats, e => e.scrollIntoView({ behavior: 'instant', block: 'start' }));
      await page.screenshot({ path: '/private/tmp/dnd-final-stats-' + locale + '-' + width + '.png' });
      const cta = 'section[aria-label="' + (locale === 'tr' ? 'Ana Sayfa — İletişim & Broşür' : 'Home Page — Contact & Brochure') + '"]';
      let handle = await page.$(cta);
      if (!handle) handle = await page.$('section:has(a[data-cta-hover])');
      assert.ok(handle);
      await handle.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
      const primary = await handle.$('a[data-cta-hover]'); assert.ok(primary);
      await page.waitForFunction(href => { const a = document.querySelector('a[data-cta-hover][href="' + href + '"]'); return a && getComputedStyle(a).opacity !== '0' && getComputedStyle(a.parentElement.parentElement).opacity === '1'; }, {}, '/' + locale + '/contact');
      await page.waitForFunction(href => { const section = document.querySelector('a[data-cta-hover][href="' + href + '"]')?.closest('section'); return section && [...section.querySelectorAll('img')].every(i => i.complete && i.naturalWidth > 0); }, {}, '/' + locale + '/contact');
      assert.equal(await primary.evaluate(e => e.getAttribute('href')), '/' + locale + '/contact');
      if (width === 1440) {
        await primary.hover();
        assert.equal(await primary.evaluate(e => getComputedStyle(e).backgroundColor), 'rgb(241, 92, 52)');
      }
      await page.screenshot({ path: '/private/tmp/dnd-home-cta-' + locale + '-' + width + '.png' });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      checked.push({ locale, width, checks: 'completed La Joya slide, animated server content, optimized logos, visible stats/counters and deferred Perla background, contact CTA, hover, no overflow' });
      console.log(locale, width, 'home passed');
    }
    assert.deepEqual(errors, []); assert.deepEqual(missing, []);
  } finally { await browser.close(); }
  fs.writeFileSync(process.env.DND_PERF_REPORT || 'docs/performance-home-checks.json', JSON.stringify({ measuredAt: new Date().toISOString(), status: 'passed', checked, errors, missing }, null, 2) + '\n');
})().catch(e => { console.error(e); process.exitCode = 1; });
