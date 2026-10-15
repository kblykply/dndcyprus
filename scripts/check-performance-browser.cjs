// Optional audit tools: npm install --prefix /private/tmp/dnd-performance-tools puppeteer-core
// Run against a local production server. External requests are blocked; no forms are submitted.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require(path.join(process.env.DND_PERF_TOOLS_DIR || '/private/tmp/dnd-performance-tools', 'node_modules/puppeteer-core'));
const origin = process.env.DND_PERF_ORIGIN || 'http://127.0.0.1:3100';
const report = { measuredAt: new Date().toISOString(), status: 'running', checked: [], errors: [], missing: [] };
const save = () => fs.writeFileSync(process.env.DND_PERF_REPORT || 'docs/performance-round3-browser.json', JSON.stringify(report, null, 2) + '\n');
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    page.on('pageerror', e => report.errors.push(e.message));
    await page.setRequestInterception(true);
    page.on('request', r => r.url().startsWith(origin) || /^(data|blob):/.test(r.url()) ? r.continue() : r.abort());
    page.on('response', r => { if (r.url().startsWith(origin) && r.status() >= 400) report.missing.push(r.url()); });
    await page.setCookie({ name: 'dnd_consent', value: encodeURIComponent(JSON.stringify({ v: 1, analytics: false, ads: false, ts: Date.now() })), url: origin });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    const section = 'section[aria-label="Liderlik ve Ekip"]';
    for (const locale of ['tr', 'en']) for (const width of [390, 1440]) {
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.setViewport({ width, height: 844, deviceScaleFactor: 2 });
      await page.goto(origin + '/' + locale + '/team', { waitUntil: 'networkidle2' });
      await page.waitForFunction(s => { const i = document.querySelector(s + ' article img'); return i?.complete && i.naturalWidth > 0; }, {}, section);
      const photos = await page.$$eval(section + ' article img', items => items.map(i => ({ alt: i.alt, src: i.currentSrc, loading: i.loading, priority: i.fetchPriority })));
      assert.equal(photos[0].alt, 'Ozan Dökmecioğlu');
      assert.equal(photos[0].priority, 'high');
      assert.notEqual(photos[0].loading, 'lazy');
      // At 1440px the short first row brings row two within the 150px loading margin.
      assert.ok(photos.length <= (width === 390 ? 2 : 10));
      assert.equal(await page.evaluate(() => performance.getEntriesByType('resource').some(r => /^\/teams\/.*\.png$/i.test(new URL(r.name).pathname))), false);
      assert.ok(await page.$eval(section + ' h2', e => getComputedStyle(e).opacity === '1'));
      await page.screenshot({ path: '/private/tmp/dnd-team-' + locale + '-' + width + '.png' });
      for (const category of ['Sales', 'Finance', 'Leadership', 'All']) {
        const buttons = await page.$$(section + ' button');
        let clicked = false;
        for (const button of buttons) {
          if ((await button.evaluate(e => e.textContent.trim())) !== category) continue;
          await button.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
          const point = await button.evaluate(e => { const r = e.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { x: r.x, y: r.y, top: top?.outerHTML.slice(0, 250) }; });
          await button.click();
          console.log(locale, width, category, JSON.stringify(point));
          clicked = true;
          break;
        }
        assert.ok(clicked);
        try {
          await page.waitForFunction((s, cat) => { const cards = [...document.querySelectorAll(s + ' article')]; return cards.length > 0 && cards.every(a => cat === 'All' || a.textContent.includes(cat)); }, { timeout: 10000 }, section, category);
        } catch (e) {
          report.filterDiagnostic = await page.$eval(section, s => ({ buttons: [...s.querySelectorAll('button')].map(b => ({ text: b.textContent, style: b.getAttribute('style') })), cards: [...s.querySelectorAll('article')].map(a => a.textContent.slice(0, 130)) }));
          save(); throw e;
        }
      }
      const cards = await page.$$(section + ' article');
      for (const card of cards) {
        const name = await card.$eval('h3', e => e.textContent);
        await card.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
        await page.waitForFunction(name => { const a = [...document.querySelectorAll('article')].find(a => a.querySelector('h3')?.textContent === name); const i = a?.querySelector('img'); return i?.complete && i.naturalWidth > 0; }, {}, name);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      report.checked.push({ path: '/' + locale + '/team', width, initialPhotos: photos.length, allPhotos: cards.length, checks: 'priority, deferral, visible heading, category filters, all photos, no overflow' });
      save(); console.log(locale, width, 'team passed');
    }
    for (const locale of ['tr', 'en']) for (const route of ['about', 'mariachi', 'gecitkale']) {
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
      await page.goto(origin + '/' + locale + '/' + route, { waitUntil: 'networkidle2' });
      if (route === 'mariachi') {
        assert.equal(await page.$$eval('iframe[src*="youtube"]', e => e.length), 0);
        const label = locale === 'tr' ? 'Videoyu oynat' : 'Play video';
        const button = await page.$('button[aria-label="' + label + '"]'); assert.ok(button);
        await button.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
        await page.waitForFunction(label => { const i = document.querySelector('button[aria-label="' + label + '"]')?.parentElement.querySelector('img'); return i?.complete && i.naturalWidth > 0; }, {}, label);
        await button.click(); await page.waitForSelector('iframe[src*="youtube"]');
      }
      if (route === 'gecitkale') {
        assert.equal(await page.$$eval('iframe[src*="maps"]', e => e.length), 0);
        const button = await page.$('button[aria-label="' + (locale === 'tr' ? 'Haritayı göster' : 'Show map') + '"]'); assert.ok(button);
        await button.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
        await page.waitForSelector('iframe[src*="maps"]');
        const before = await page.$eval('iframe[src*="maps"]', e => e.src);
        for (const b of await page.$$('button')) if ((await b.evaluate(e => e.textContent.trim())) === (locale === 'tr' ? 'Uydu' : 'Satellite')) { await b.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' })); await b.click(); break; }
        await page.waitForFunction(before => document.querySelector('iframe[src*="maps"]')?.src !== before, {}, before);
      }
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 650) { await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await new Promise(r => setTimeout(r, 60)); }
      await page.waitForNetworkIdle({ idleTime: 200 });
      const broken = await page.$$eval('main#main img', images => images.filter(i => new URL(i.src).origin === location.origin && i.getBoundingClientRect().width > 0 && (!i.complete || !i.naturalWidth)).map(i => i.src));
      assert.deepEqual(broken, []);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      report.checked.push({ path: '/' + locale + '/' + route, checks: 'deferred images, media activation, map toggle, no overflow' }); save();
      console.log(locale, route, 'passed');
    }
    await page.goto(origin + '/tr/qr', { waitUntil: 'networkidle2' });
    await page.waitForFunction(() => document.querySelector('main img')?.naturalWidth === 1280);
    assert.equal(await page.$$eval('header,footer,[data-consent-initial],link[as="font"]', els => els.length), 0);
    assert.ok((await page.$eval('main img', i => i.src)).includes('/optimized/menu.'));
    assert.ok(await page.$('link[rel="preload"][as="image"][fetchpriority="high"]'));
    report.checked.push({ path: '/tr/qr', checks: '1280-pixel menu, image preload, no fonts, no shared navigation or consent' });
    assert.deepEqual(report.errors, []); assert.deepEqual(report.missing, []);
    report.status = 'passed'; save();
  } finally { await browser.close(); }
})().catch(e => { report.status = 'failed'; report.failure = String(e); save(); console.error(e); process.exitCode = 1; });
