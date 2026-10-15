// Browser regression checks for optimized navigation, galleries and plans.
// Optional Puppeteer tools; third-party requests blocked; no forms submitted.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const puppeteer = require(path.join(process.env.DND_PERF_TOOLS_DIR || '/private/tmp/dnd-performance-tools', 'node_modules/puppeteer-core'));
const origin = process.env.DND_PERF_ORIGIN || 'http://127.0.0.1:3100';
const output = process.env.DND_PERF_REPORT || 'docs/performance-final-interactions.json';
const report = { measuredAt: new Date().toISOString(), buildId: fs.readFileSync('.next/BUILD_ID', 'utf8').trim(), checked: [], errors: [], missing: [] };
const save = () => fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
  const newPage = async (width) => {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 2 });
    page.on('pageerror', e => report.errors.push(e.message));
    page.on('response', r => { if (r.url().startsWith(origin) && r.status() >= 400) report.missing.push(r.url()); });
    await page.setRequestInterception(true);
    page.on('request', r => r.url().startsWith(origin) || /^(data|blob):/.test(r.url()) ? r.continue() : r.abort());
    await page.setCookie({ name: 'dnd_consent', value: encodeURIComponent(JSON.stringify({ v: 1, analytics: false, ads: false, ts: Date.now() })), url: origin });
    return { context, page };
  };
  try {
    for (const locale of ['tr', 'en']) for (const width of [390, 1440]) {
      const { context, page } = await newPage(width);
      await page.goto(origin + '/' + locale, { waitUntil: 'networkidle2' });
      await page.focus('.hero-carousel');
      await page.keyboard.press('ArrowRight');
      await page.waitForSelector('[data-hero-slide="1"][aria-hidden="false"]');
      await page.keyboard.press('ArrowLeft');
      await page.waitForSelector('[data-hero-slide="0"][aria-hidden="false"]');
      await page.click('.hero-carousel-dot:nth-child(4)');
      await page.waitForSelector('[data-hero-slide="3"][aria-hidden="false"]');
      assert.ok(await page.$eval('[data-hero-slide="3"]', e => e.innerText.includes('2025')));
      await page.mouse.move(300, 250); await page.mouse.down();
      await page.mouse.move(100, 250, { steps: 10 }); await page.mouse.up();
      await page.waitForSelector('[data-hero-slide="4"][aria-hidden="false"]');
      await page.click('.hero-carousel-next');
      await page.waitForSelector('[data-hero-slide="0"][aria-hidden="false"]');
      await page.evaluate(() => scrollTo({ top: 1000, behavior: 'instant' }));
      await page.waitForSelector('#floating-hamburger', { visible: true });
      await page.click('#floating-hamburger');
      await page.waitForSelector('[role="dialog"][aria-modal="true"]', { visible: true });
      await page.waitForFunction(() => { const b = document.querySelector('button[aria-label="Close menu"]'); if (!b) return false; const r = b.getBoundingClientRect(); return r.width > 0 && r.x >= 0 && r.right <= innerWidth && r.y >= 0 && r.bottom <= innerHeight; });
      assert.equal(await page.$$eval('[role="dialog"] a[href*="dndturkiye"]', a => a.length), 0);
      assert.ok(await page.$('[role="dialog"] a[href="/' + locale + '/contact"]'));
      await page.click('button[aria-label="Close menu"]');
      await page.waitForSelector('[role="dialog"][aria-modal="true"]', { hidden: true });
      await page.goto(origin + '/' + locale + '/projects', { waitUntil: 'networkidle2' });
      const filter = await page.$eval('#project-search', e => e.closest('section').getAttribute('aria-label'));
      const section = 'section[aria-label="' + filter + '"]';
      for (const button of await page.$$(section + ' button')) if ((await button.evaluate(e => e.textContent.trim())) === (locale === 'tr' ? 'Tamamlanan' : 'Completed')) {
        await button.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' })); await button.click(); break;
      }
      await page.waitForFunction(s => document.querySelectorAll(s + ' a').length === 1, {}, section);
      assert.equal(await page.$eval(section + ' a', e => e.getAttribute('href')), '/' + locale + '/la-joya');
      for (const button of await page.$$(section + ' button')) if ((await button.evaluate(e => e.textContent.trim())) === (locale === 'tr' ? 'Tümü' : 'All')) {
        await button.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' })); await button.click(); break;
      }
      await page.type('#project-search', 'perla');
      await page.waitForFunction(s => document.querySelectorAll(s + ' a').length === 2, {}, section);
      await page.goto(origin + '/' + locale + '/privacy', { waitUntil: 'networkidle2' });
      const buttonText = locale === 'tr' ? 'Çerez tercihlerini değiştir' : 'Change cookie preferences';
      let preferences;
      for (const button of await page.$$('button')) if ((await button.evaluate(e => e.textContent.trim())) === buttonText) preferences = button;
      assert.ok(preferences);
      await preferences.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' })); await preferences.click();
      await page.waitForSelector('[role="dialog"][aria-modal="false"] [role="switch"]');
      const switches = await page.$$eval('[role="switch"]', switches => switches.map(s => s.getAttribute('aria-checked')));
      assert.deepEqual(switches, ['false', 'false']);
      for (const button of await page.$$('[role="dialog"] button')) if ((await button.evaluate(e => e.textContent.trim())) === (locale === 'tr' ? 'Tercihleri kaydet' : 'Save preferences')) await button.click();
      await page.waitForSelector('[role="dialog"][aria-modal="false"]', { hidden: true });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      report.checked.push({ locale, width, checks: 'hero keyboard, dots, drag and wrap; drawer open/close; removed office absent; completed filter and search; consent preferences reopen/save' }); save();
      console.log(locale, width, 'navigation passed'); await context.close();
    }
    for (const locale of ['tr', 'en']) for (const project of ['lagoon-verde', 'la-joya', 'perla', 'perla-ii']) for (const width of project === 'perla-ii' ? [390, 1440] : [390]) {
      const { context, page } = await newPage(width);
      await page.goto(origin + '/' + locale + '/' + project, { waitUntil: 'networkidle2' });
      const gallery = 'section[aria-label$="— ' + (locale === 'tr' ? 'Galeri' : 'Gallery') + '"]';
      const panels = await page.$$(gallery + ' [role="button"]'); assert.ok(panels.length >= 2);
      await panels[1].evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' })); await panels[1].click();
      await page.waitForFunction(e => e.style.flexGrow === '3.2', {}, panels[1]);
      await page.waitForFunction(e => { const i = e.querySelector('img'); return i?.complete && i.naturalWidth > 0; }, {}, panels[1]);
      let enlarge;
      for (const button of await page.$$('button')) if ((await button.evaluate(e => e.textContent.trim())) === (locale === 'tr' ? 'Büyüt' : 'Enlarge')) { enlarge = button; break; }
      assert.ok(enlarge);
      const planSection = await enlarge.evaluateHandle(e => e.closest('section'));
      const tabList = await planSection.$('[role="tablist"]'); assert.ok(tabList);
      const tabs = await tabList.$$('[role="tab"]'); assert.ok(tabs.length > 0);
      for (const tab of tabs.slice(0, 2)) { await tab.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' })); await tab.click(); assert.equal(await tab.evaluate(e => e.getAttribute('aria-selected')), 'true'); }
      await enlarge.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'center' })); await enlarge.click();
      const dialog = '[role="dialog"][aria-modal="true"]';
      await page.waitForSelector(dialog, { visible: true });
      await page.waitForFunction(s => { const i = document.querySelector(s + ' img'); return i?.complete && i.naturalWidth > 0; }, {}, dialog);
      const planImage = await page.$eval(dialog + ' img', i => i.src);
      assert.equal(planImage.includes('/_next/image?'), false, 'Enlarged plan keeps original resolution');
      await page.keyboard.press('Escape'); await page.waitForSelector(dialog, { hidden: true });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
      report.checked.push({ locale, project, width, galleryPanels: panels.length, planImage, checks: 'gallery panel expands and loads; floor-plan tabs; original-resolution lightbox; Escape closes; no overflow' }); save();
      console.log(locale, project, width, 'gallery/plan passed'); await context.close();
    }
    assert.deepEqual(report.errors, []); assert.deepEqual(report.missing, []);
    report.status = 'passed'; save();
  } finally { await browser.close(); }
})().catch(e => { report.status = 'failed'; report.failure = String(e); save(); console.error(e); process.exitCode = 1; });
