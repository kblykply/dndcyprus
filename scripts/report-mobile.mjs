import fs from "node:fs";

const read = (name) => JSON.parse(fs.readFileSync(`docs/${name}.json`, "utf8"));
const before = read("performance-mobile-oct15-isolated-before-lighthouse");
const after = read("performance-mobile-oct15-complete-lighthouse");
const desktop = read("performance-mobile-oct15-desktop-lighthouse");
const content = read("mobile-content-seo-final-2026-10-15");
const lint = read("mobile-eslint-2026-10-15");
const checks = Object.fromEntries([
  ["responsive", "mobile-responsive-final-2026-10-15"], ["landscape", "mobile-landscape-final-2026-10-15"],
  ["touch", "mobile-interactions-final-2026-10-15"], ["media", "mobile-media-final-2026-10-15"],
  ["tabletMedia", "mobile-media-tablet-landscape-2026-10-15"], ["fonts", "mobile-fonts-final-2026-10-15"],
  ["homeRecheck", "mobile-home-recheck-2026-10-15"], ["regression", "mobile-regression-interactions-2026-10-15"],
].map(([key, name]) => [key, { file: `${name}.json`, ...read(name) }]));
for (const report of [before, after, desktop, content, ...Object.values(checks)]) if (report.status !== "passed") throw new Error("Required validation incomplete");
if (!before.networkIsolationVerified || !after.networkIsolationVerified || !desktop.networkIsolationVerified) throw new Error("Network isolation must be verified");
if (after.buildId !== desktop.buildId || content.buildId !== after.buildId) throw new Error("Final build evidence mismatch");
for (const key of ["touch", "media", "homeRecheck"]) if (checks[key].buildId !== after.buildId) throw new Error(`Final ${key} report uses another build`);
const median = (values) => { const sorted = [...values].sort((a, b) => a - b); return sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2; };
const summarize = (report) => [...new Set(report.samples.map((sample) => sample.route))].map((route) => {
  const samples = report.samples.filter((sample) => sample.route === route), row = { route, sampleCount: samples.length };
  for (const key of ["score", "lcpMs", "fcpMs", "tbtMs", "cls", "transferBytes", "fontBytes"]) row[key] = median(samples.map((sample) => sample[key]));
  row.transferByType = Object.fromEntries(Object.keys(samples[0].transferByType).map((type) => [type, median(samples.map((sample) => sample.transferByType[type] || 0))]));
  return row;
});
const old = summarize(before), current = summarize(after);
const comparisons = old.map((previous) => {
  const next = current.find((row) => row.route === previous.route);
  return { route: previous.route, before: previous, after: next, transferReductionPercent: 100 * (1 - next.transferBytes / previous.transferBytes), fcpReductionPercent: 100 * (1 - next.fcpMs / previous.fcpMs), lcpReductionPercent: 100 * (1 - next.lcpMs / previous.lcpMs) };
});
const summary = {
  measuredAt: new Date().toISOString(), clientDate: "2026-10-15", timezone: "Europe/Istanbul", origin: "http://localhost:3100",
  status: "mobile improvements implemented and validated locally; not committed, pushed or deployed", buildId: after.buildId,
  method: "Lighthouse 13.5 local production, simulated mobile; three cold-cache samples per home page, metric medians. Other page and desktop results are single samples. Analytics/advertising endpoints are blocked and verified. These are application-only lab metrics, not real-user field performance or live Google rankings.",
  comparisons, otherMobilePages: current.filter((row) => !old.some((previous) => previous.route === row.route)), desktop: summarize(desktop),
  changes: [
    "TR/EN mobile navigation is available at the top of the page. Tablet navigation uses the drawer until 1024px; narrow headers fit without overlap.",
    "Drawer dimensions, contrast, safe-area spacing, focus trapping, Escape, focus restoration and document scroll locking were corrected. Header/drawer language controls use separate refs.",
    "The home/project-list hero retains a minimum height on short landscape screens. Its internal wrappers fill the available height.",
    "Hero pagination has 44px targets and reserves the WhatsApp corner on narrow phones. Touch swipes, vertical scrolling and pinch-zoom are supported. Mobile consent controls have larger targets; form fonts remain 16px through tablet widths.",
    "Video-carousel arrows were moved away from WhatsApp on mobile and have at least 44px targets.",
    "The original hero photograph now has seven pre-generated responsive AVIF sizes with the existing Next image/WebP fallback. Original source photos remain unchanged.",
    "Award ribbons wait until visible. Swiper styles are imported by the components that use them; unused global coverflow styles were removed.",
    "Both language roots share one font definition/stylesheet. Optional font display avoids late font replacement on slow first visits; original font versions, glyphs, weights and licenses are retained."
  ],
  validation: {
    productionBuild: "passed; TypeScript passed; 47 generated routes", unitTests: { passed: 78, failed: 0, mode: "Mocked integrations; no real leads submitted" },
    lint: { errors: lint.reduce((n, row) => n + row.errorCount, 0), warnings: lint.reduce((n, row) => n + row.warningCount, 0) },
    contentComparison: content.contentComparison,
    browserChecks: Object.fromEntries(Object.entries(checks).map(([key, report]) => [key, { file: report.file, status: report.status, cases: report.checked.length, buildId: report.buildId || null }])),
    buildCoverage: "The 108-page/viewport matrix, eight landscape layouts, 14 gallery/navigation regressions and four tablet-media checks passed before final follow-up changes. After the last font/pagination changes, the final build rechecked 18 touch/consent scenarios, six media cases, six home layouts and both font character sets. HTTP/content comparisons cover all 36 pages on the final build.",
    lighthouseComparisonRuns: before.samples.length + after.samples.length + desktop.samples.length,
  },
  limits: [
    "Mobile LCP still exceeds the 2.5s good threshold on the measured ordinary pages; media-hub image loading remains a larger opportunity.",
    "Tests use Chrome mobile/tablet emulation and native touch events. Physical iOS Safari/Android devices and real-user p75/INP have not been measured.",
    "On a slow first visit, optional font display may retain the metric-adjusted system fallback for that page view. Font files are still preloaded and available for subsequent views.",
    "The first attempted tracking filter was ineffective. That initial report includes third-party scripts and is excluded from this before/after comparison; the isolated baseline and final measurements verify blocking.",
    "Existing lint warnings and the middleware convention deprecation remain."
  ],
};
fs.writeFileSync("docs/mobile-results-2026-10-15.json", JSON.stringify(summary, null, 2) + "\n");
const format = (number, digits = 2) => new Intl.NumberFormat("tr-TR", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(number);
const seconds = (ms) => `${format(ms / 1000)} sn`;
const kb = (bytes) => `${format(bytes / 1000, 1)} KB`;
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const rows = comparisons.map((row) => `<tr><th>${row.route}</th><td>${row.before.score} → <strong>${row.after.score}</strong></td><td>${seconds(row.before.fcpMs)} → <strong>${seconds(row.after.fcpMs)}</strong></td><td>${seconds(row.before.lcpMs)} → <strong>${seconds(row.after.lcpMs)}</strong></td><td>${kb(row.before.transferBytes)} → <strong>${kb(row.after.transferBytes)}</strong></td></tr>`).join("");
const pageRows = summary.otherMobilePages.map((row) => `<tr><td>${escape(row.route)}</td><td>${row.score}</td><td>${seconds(row.lcpMs)}</td><td>${kb(row.transferBytes)}</td></tr>`).join("");
for (const [source, target] of [["/private/tmp/dnd-mobile-before-tr-320.png", "mobile-before-320-2026-10-15.png"], ["/private/tmp/dnd-mobile-after-tr-320.png", "mobile-after-320-2026-10-15.png"]]) if (fs.existsSync(source)) fs.copyFileSync(source, `docs/${target}`);
const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>DND Cyprus — Mobil sonuçları, 15 Ekim 2026</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f7f9;color:#1a2532;font:16px/1.65 system-ui,sans-serif}main{max-width:1100px;margin:auto;padding:30px 22px}h1{font-size:30px;line-height:1.2}h2{font-size:22px}section{background:white;border:1px solid #dde4ea;border-radius:12px;padding:22px;margin:20px 0}.table{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:14px}th,td{text-align:left;padding:11px;border-bottom:1px solid #dfe5ea;white-space:nowrap}strong{color:#17674c}li{margin:10px 0}a{color:#155b9b;overflow-wrap:anywhere}.muted{color:#596776;font-size:13px}.shots{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;max-width:680px;margin:auto}.shots img{width:100%;height:auto;display:block;border-radius:12px}.note{border-left:4px solid #d59b2f;padding-left:16px}@media(max-width:600px){main{padding:20px 12px}section{padding:16px}h1{font-size:26px}.shots{gap:10px}}</style></head><body><main><p class="muted">15 Ekim 2026 · Yerel production · ${escape(summary.buildId)}</p><h1>Mobil responsive ve performans sonuçları</h1><p>Mobil menü erişimi, kısa yatay ekran yerleşimi ve kayan WhatsApp düğmesiyle çakışan slayt kontrolleri düzeltildi. Görsel, font ve CSS yükleme davranışları iyileştirildi. ${content.contentComparison.comparedPages} sayfanın yazıları, başlıkları ve açıklamaları korundu. Değişiklikler henüz push edilmedi veya yayınlanmadı.</p>
<section><h2>Ana sayfalar · mobil önce / sonra</h2><div class="table"><table><thead><tr><th>Sayfa</th><th>Performans / 100</th><th>İlk içerik çizimi (FCP)</th><th>LCP</th><th>İlk yükleme verisi</th></tr></thead><tbody>${rows}</tbody></table></div><p class="muted">Üçer ölçümün metrik medyanları. Lighthouse 13.5 mobil simülasyon, boş önbellek, aynı ağ profili. Analiz/reklam servisleri ölçümlerde engellendi ve ağ kayıtlarıyla doğrulandı. Bu değerler uygulama performansını gösterir; canlı ziyaretçi verisi değildir.</p></section>
<section><h2>Giderilen mobil sorunlar</h2><ul><li>Menü, sayfa açılır açılmaz erişilebilir. 1024px altındaki tablet/telefon ekranları menü çekmecesini kullanıyor.</li><li>Dar ekranda logo, dil, arama ve menü kontrolleri sığıyor. Çekmece okunaklı arka plan, güvenli ekran boşlukları, odak yönetimi ve kaydırma kilidiyle çalışıyor.</li><li>Yatay telefonda ana görsel başlıklarının üst menüyle çakışması giderildi.</li><li>Slayt noktaları 44px dokunma alanına sahip. En dar telefonlarda WhatsApp için boşluk ayrıldı; video slayt okları da bu düğmeden uzaklaştırıldı.</li><li>Parmakla yatay slayt geçişi ve dikey sayfa kaydırması doğrulandı. Hero alanında pinch-zoom açık. Çerez düğmeleri büyütüldü; mobil/tablet form yazıları 16px tutuldu.</li></ul></section>
<section><h2>Yükleme iyileştirmeleri</h2><ul><li>Ana fotoğraf için 480–1536px aralığında yedi AVIF sürümü üretildi; tarayıcı uygun boyutu seçiyor. WebP yedeği çalışıyor; AVIF destekleyen tarayıcıda iki görsel birden indirilmiyor.</li><li>Ödül görselleri görünür olmadan indirilmiyor. Swiper stilleri ihtiyaç duyan bileşenlere taşındı; kullanılmayan coverflow stilleri kaldırıldı.</li><li>TR / EN font tanımı ortaklaştırıldı. Font sürümleri ve karakter desteği korundu. Yavaş ilk ziyaretlerde metnin geç font değişimiyle yeniden çizilmesi önleniyor.</li></ul><p class="muted">Yavaş bağlantıda, optional font davranışı o sayfa görüntülemesinde sistem yedeğini koruyabilir. Orijinal görseller ve font dosyalarının karakter kapsamı değiştirilmedi.</p></section>
<section><h2>320px ekran · önce / sonra</h2><div class="shots"><div><p>Önce</p><a href="mobile-before-320-2026-10-15.png"><img src="mobile-before-320-2026-10-15.png" alt="Optimizasyon öncesi 320 piksel görünüm" loading="lazy"></a></div><div><p>Sonra</p><a href="mobile-after-320-2026-10-15.png"><img src="mobile-after-320-2026-10-15.png" alt="Optimizasyon sonrası 320 piksel görünüm" loading="lazy"></a></div></div></section>
<section><h2>Ek mobil ölçümler</h2><div class="table"><table><thead><tr><th>Sayfa</th><th>Performans / 100</th><th>LCP</th><th>Veri</th></tr></thead><tbody>${pageRows}</tbody></table></div><p>Masaüstü ana sayfalar: ${summary.desktop.map((row) => `${row.route}: ${row.score}/100, LCP ${seconds(row.lcpMs)}`).join(" · ")}</p></section>
<section><h2>Doğrulama kapsamı</h2><ul><li>36 sayfa × 320 / 390 / 768px: <strong>${checks.responsive.checked.length} ekran kontrolü</strong>. Ek yatay ekran: ${checks.landscape.checked.length} kontrol.</li><li>Son build: ${checks.touch.checked.length} dokunma/menü/çerez senaryosu, ${checks.media.checked.length} görsel ve slayt senaryosu, ${checks.fonts.checked.length} font testi ve ${checks.homeRecheck.checked.length} ana sayfa yerleşim kontrolü geçti.</li><li>Önceki optimizasyon build’lerinde ${checks.regression.checked.length} galeri/kat planı/menü regresyonu ve ${checks.tabletMedia.checked.length} tablet/yatay medya kontrolü de geçti.</li><li>Production build ve TypeScript başarılı; 47 route üretildi. 78 test geçti. Lint: ${summary.validation.lint.errors} hata, ${summary.validation.lint.warnings} mevcut uyarı.</li><li>36 sayfanın metin ve metadata karşılaştırmasında değişen alan: <strong>${content.contentComparison.changed.length}</strong>.</li></ul><p class="muted">Geniş ekran matrisi son font tanımı, slayt noktası boşluğu ve video oku konum değişikliklerinden önce tamamlandı. Bu değişikliklerden etkilenen ana sayfalar son build’de yeniden test edildi. Tam build kimlikleri JSON kanıtlarında bulunuyor.</p></section>
<section><h2>Kalan sınırlar</h2><p class="note">Mobil LCP, ölçülen normal sayfalarda hâlâ 2,5 sn iyi eşiğinin üzerinde. Medya merkezindeki kapak yükü daha fazla iyileştirme alanı bırakıyor. Sonuçlar fiziksel iOS Safari/Android cihaz testi veya gerçek ziyaretçi p75 / INP ölçümü değildir.</p><p class="muted">İlk filtre denemesi dış servisleri engellemediği için o veri önce/sonra karşılaştırmasına dahil edilmedi. Buradaki başlangıç ve sonuç ölçümlerinin ağ izolasyonu doğrulandı. Mevcut lint uyarıları ve middleware bildirimi korunuyor.</p></section>
<section><h2>Kanıtlar</h2><p><a href="mobile-results-2026-10-15.json">Sonuç verileri</a> · <a href="performance-mobile-oct15-isolated-before-lighthouse.json">Başlangıç ölçümleri</a> · <a href="performance-mobile-oct15-complete-lighthouse.json">Son mobil ölçümler</a> · <a href="mobile-responsive-final-2026-10-15.json">Ekran matrisi</a> · <a href="mobile-interactions-final-2026-10-15.json">Dokunma testleri</a> · <a href="mobile-content-seo-final-2026-10-15.json">İçerik karşılaştırması</a></p><p class="muted"><a href="https://developers.google.com/search/docs/appearance/core-web-vitals">Google Core Web Vitals eşikleri</a> · <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action">Dokunma hareketleri</a></p></section></main></body></html>`;
fs.writeFileSync("docs/mobile-results-2026-10-15.html", html);
console.log(JSON.stringify({ status: "written", comparisons: comparisons.map((row) => ({ route: row.route, before: row.before.score, after: row.after.score, fcpMs: row.after.fcpMs, lcpMs: row.after.lcpMs, transferReductionPercent: row.transferReductionPercent })) }));
