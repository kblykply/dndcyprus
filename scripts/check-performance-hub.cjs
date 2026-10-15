// Optional Puppeteer tools. External playback blocked; no forms submitted.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require(path.join(process.env.DND_PERF_TOOLS_DIR || '/private/tmp/dnd-performance-tools', 'node_modules/puppeteer-core'));
const origin = process.env.DND_PERF_ORIGIN || 'http://127.0.0.1:3100';
const output = process.env.DND_PERF_REPORT || 'docs/performance-final-hub-checks.json';
const report = { measuredAt: new Date().toISOString(), checked: [], errors: [], missing: [] };
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
  try {
    for (const locale of ['tr', 'en']) {
      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      await page.setViewport({ width: 390, height: 900, deviceScaleFactor: 2 });
      page.on('pageerror', e => report.errors.push(e.message));
      page.on('response', r => { if (r.url().startsWith(origin) && r.status() >= 400) report.missing.push(r.url()); });
      await page.setRequestInterception(true);
      page.on('request', r => r.url().startsWith(origin) || /^(data|blob):/.test(r.url()) ? r.continue() : r.abort());
      await page.setCookie({ name: 'dnd_consent', value: encodeURIComponent(JSON.stringify({ v: 1, analytics: false, ads: false, ts: Date.now() })), url: origin });
      await page.goto(origin + '/' + locale + '/dndcyprus', { waitUntil: 'networkidle2' });
      const cards = await page.$$('section[aria-label="Lagoon Verde media menu"] button');
      assert.ok(cards.length >= 9);
      assert.equal(await page.$$eval('iframe', items => items.length), 0);
      for (const title of [locale === 'tr' ? 'Kampanya' : 'Campaign', 'Lagoon Verde Video']) {
        let card;
        for (const button of cards) if ((await button.$eval('h3', h => h.textContent.trim())) === title) { card = button; break; }
        assert.ok(card);
        await card.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
        await page.waitForFunction(e => getComputedStyle(e).opacity === '1', {}, card);
        await card.click();
        const close = 'button[aria-label="Close popup"]';
        await page.waitForSelector(close, { visible: true });
        if (title === 'Lagoon Verde Video') await page.waitForSelector('iframe[src*="youtube"]');
        else await page.waitForFunction(() => [...document.querySelectorAll('img')].some(i => (i.alt === 'Kampanya' || i.alt === 'Campaign') && i.complete && i.naturalWidth > 0));
        await page.waitForFunction(s => { const r = document.querySelector(s)?.getBoundingClientRect(); return r && r.x >= 0 && r.right <= innerWidth && r.y >= 0 && r.bottom <= innerHeight; }, {}, close);
        // This catches the real regression where the floating menu intercepted
        // the click even though the popup close button was visible.
        assert.equal(await page.$eval(close, e => { const r = e.getBoundingClientRect(); return e.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); }), true);
        await page.click(close);
        await page.waitForSelector(close, { hidden: true });
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      report.checked.push({ locale, width: 390, cards: cards.length, checks: 'media cards, campaign popup, video iframe activates on click, close receives physical click above navigation, no overflow', thirdPartyPlayback: 'blocked; not validated' });
      console.log(locale, 'media hub passed', cards.length);
      await context.close();
    }
    assert.deepEqual(report.errors, []); assert.deepEqual(report.missing, []);
    report.status = 'passed';
  } finally { await browser.close(); }
})().catch(e => { report.status = 'failed'; report.failure = String(e); console.error(e); process.exitCode = 1; }).finally(() => fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n'));
