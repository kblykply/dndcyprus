import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, "docs", `${name}.json`), "utf8"));
const baseline = read("performance-final-audit-2026-10-14");
const mobile = read("performance-round5-mobile-lighthouse");
const desktop = read("performance-round5-desktop-lighthouse");
const saved = read("performance-round5-saved-lighthouse");
const inventory = read("performance-round5-inventory");
const suite = read("performance-round5-browser-suite");
const fonts = read("performance-round5-fonts");
const special = read("performance-round5-special");
const lint = read("performance-round5-eslint");
const median = (numbers) => {
  const sorted = [...numbers].sort((a, b) => a - b);
  return sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
};
const summarize = (report) => [...new Set(report.samples.map((sample) => sample.route))].map((route) => {
  const samples = report.samples.filter((sample) => sample.route === route);
  const result = { route, sampleCount: samples.length };
  for (const key of ["score", "lcpMs", "fcpMs", "tbtMs", "cls", "transferBytes", "fontBytes"]) result[key] = median(samples.map((sample) => sample[key]));
  result.transferByType = Object.fromEntries(Object.keys(samples[0].transferByType).map((type) => [type, median(samples.map((sample) => sample.transferByType[type] || 0))]));
  return result;
});
const current = summarize(mobile);
const comparisons = current.map((after) => {
  const before = baseline.mobile.find((row) => row.route === after.route);
  if (!before) throw new Error(`Missing baseline for ${after.route}`);
  return { route: after.route, before, after, transferReductionPercent: 100 * (1 - after.transferBytes / before.transferBytes), lcpReductionPercent: 100 * (1 - after.lcpMs / before.lcpMs) };
});
const checks = suite.jobs.map((job) => ({ name: job.name, report: job.output, ...JSON.parse(fs.readFileSync(path.join(root, job.output), "utf8")) }));
for (const report of [mobile, desktop, saved, inventory, suite, fonts, special, ...checks]) {
  if (report.status !== "passed") throw new Error("A required report has not passed");
}
const lintErrors = lint.reduce((n, file) => n + file.errorCount, 0);
if (lintErrors) throw new Error("Lint errors remain");
const browserCases = checks.reduce((n, report) => n + report.checked.length, 0) + fonts.checked.length + special.checked.length;
const report = {
  generatedAt: new Date().toISOString(), clientDate: "2026-10-14", timezone: "Europe/Istanbul",
  status: "Implemented and validated locally; not committed, pushed or deployed",
  origin: "http://localhost:3100", buildId: mobile.buildId,
  method: "Lighthouse 13.5 local production, simulated mobile and desktop presets, cold cache. Three samples per mobile home page, medians per metric; other routes/profiles single samples. Before and after use the same tool/profile but different builds. Network figures include response headers; decimal KB/MB. Laboratory results, not field Core Web Vitals.",
  baseline: "performance-final-audit-2026-10-14.json",
  changes: [
    "TR/EN media hub covers use responsive, quality-65 optimized images and load near the viewport. Original popup media and PDFs remain available on interaction.",
    "Inter and Montserrat retain their original versions, variable weights and licenses. Latin/Turkish core subsets preload; Cyrillic subsets download only when their characters are rendered.",
    "QR menu uses a 1280px AVIF with WebP fallback. Its static native HTML route preserves metadata and menu details, with no application JavaScript or fonts.",
    "TR/EN brand and beach sections render static content on the server with client animation wrappers. Privacy links stop speculative prefetching. Existing animation features and team filters are retained; reduced-motion beach content remains visible."
  ],
  mobile: comparisons, desktop: summarize(desktop), savedPreferences: summarize(saved),
  payload: {
    coreFonts: { beforeNetworkBytes: 164373, afterNetworkBytes: 117725, reductionPercent: 100 * (1 - 117725 / 164373), note: "EN media hub also needs Cyrillic and transfers 158505 font bytes." },
    qrImage: { beforeFileBytes: 411608, avifFileBytes: 223529, webpFileBytes: 259354, width: 1280, height: 1280 },
    homeScript: { beforeNetworkBytes: 243811, afterNetworkBytes: 241330, reductionPercent: 100 * (1 - 241330 / 243811), note: "Modest reduction; server-rendered content increases home HTML. Largest JS improvement is QR: 131417 network bytes to zero." },
    homeDocument: { beforeRawBytes: 141026, afterRawBytes: 155414, beforeNetworkBytes: 24158, afterNetworkBytes: 25717 }
  },
  validation: {
    productionBuild: "passed; TypeScript passed; 43 generated routes", unitTests: { passed: 76, failed: 0, mode: "Mocked API/database integrations; no real leads submitted" },
    browserCases, publicRoutes: inventory.routes.length, localImageReferences: inventory.assets.length, internalLinks: inventory.links.length,
    lighthouseRuns: mobile.samples.length + desktop.samples.length + saved.samples.length,
    lint: { errors: lintErrors, warnings: lint.reduce((n, file) => n + file.warningCount, 0) },
    buildCoverage: "Lighthouse, public inventory and the optimized-media/QR checks use the final build. General UI and font suites ran before the QR-only route replacement; the affected QR route was verified again on the final build.",
    evidence: [...suite.jobs.map((job) => job.output), "docs/performance-round5-fonts.json", "docs/performance-round5-special.json", "docs/performance-round5-inventory.json", "docs/performance-round5-lighthouse-suite.json"]
  },
  limits: [
    "Home mobile LCP is still 3.61s TR / 3.69s EN, above the 2.5s good threshold. Most measured regular pages remain above 2.5s; QR is 1.95s. Further font/render-path and shared JavaScript work requires separate changes and measurements.",
    "Core font traffic remains 117.7KB and home JavaScript 241.3KB; the proposed sub-100KB font and sub-200KB JavaScript targets were not reached.",
    "No live field p75, real-user INP or post-deployment measurements. Local GA4 configuration is absent; production performance must be checked after deployment.",
    "QR desktop supplementary LCP trace insight reported NO_LCP; numeric LCP, performance score and browser image checks succeeded.",
    "Existing 221 lint warnings and the middleware-to-proxy convention warning remain."
  ],
  sources: ["https://web.dev/articles/vitals", "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/unicode-range", "https://nextjs.org/docs/app/api-reference/components/image"]
};
const number = (value, digits = 1) => new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
const kb = (bytes) => `${number(bytes / 1000)} KB`;
const seconds = (ms) => `${number(ms / 1000, 2)} sn`;
const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const rows = comparisons.map(({ route, before, after, transferReductionPercent }) => `<tr><th scope="row">${escape(route)}</th><td>${before.score} → <strong>${after.score}</strong></td><td>${seconds(before.lcpMs)} → <strong>${seconds(after.lcpMs)}</strong></td><td>${kb(before.transferBytes)} → <strong>${kb(after.transferBytes)}</strong></td><td>%${number(transferReductionPercent)} daha az</td><td>${after.sampleCount}</td></tr>`).join("");
const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>DND Cyprus — Optimizasyon sonuçları, 14 Ekim 2026</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5f7fa;color:#18212d;font:16px/1.6 system-ui,sans-serif}main{max-width:1100px;margin:auto;padding:40px 24px}h1{font-size:32px;line-height:1.2}h2{font-size:22px;margin-top:32px}p{max-width:90ch}.muted{color:#536171}.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.card,section{background:white;border:1px solid #dde3e9;border-radius:12px;padding:22px;margin-top:18px}.card strong{display:block;font-size:28px;color:#146953}.card p{margin:6px 0}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:14px}th,td{padding:12px 10px;text-align:left;border-bottom:1px solid #dde3e9;white-space:nowrap}thead{background:#edf3f6}li{margin:8px 0}a{color:#155b9b;overflow-wrap:anywhere}.notice{border-left:4px solid #d89927;padding-left:16px}.small{font-size:13px}@media(max-width:650px){main{padding:22px 14px}.cards{grid-template-columns:1fr}h1{font-size:26px}section{padding:16px}}@media print{body{background:white;font-size:11px}main{padding:0}h1{font-size:24px}h2{font-size:17px}.card,section{break-inside:avoid;padding:12px}.card strong{font-size:22px}th,td{padding:7px 5px;font-size:10px}.cards{gap:8px}.table-wrap{overflow:visible}a{color:inherit}}
</style></head><body><main>
<p class="muted">14 Ekim 2026 · Yerel production build · ${escape(report.buildId)}</p>
<h1>DND Cyprus performans iyileştirmeleri</h1>
<p>Medya merkezi kapakları, yazı tipi dosyaları, QR menüsü ve ortak JavaScript için dört iyileştirme uygulandı. Aşağıdaki değerler önceki kapsamlı denetim ile yeni build’in karşılaştırmasıdır. Değişiklikler henüz push edilmedi ve canlıya alınmadı.</p>
<div class="cards"><div class="card"><strong>%88,7 / %85,5</strong><p>TR / EN medya merkezinde ilk yükleme verisi azaldı.</p></div><div class="card"><strong>99 · 1,95 sn</strong><p>QR menüsünün mobil puanı ve LCP’si. Uygulama JavaScript’i: 0 bayt.</p></div><div class="card"><strong>%28,4</strong><p>Normal TR / EN sayfalarda çekirdek font trafiği azaldı.</p></div></div>
<section><h2>Mobil önce / sonra</h2><div class="table-wrap"><table><thead><tr><th>Sayfa</th><th>Puan / 100</th><th>LCP</th><th>İlk yükleme verisi</th><th>Veri kazancı</th><th>Yeni örnek</th></tr></thead><tbody>${rows}</tbody></table></div><p class="small muted">Lighthouse 13.5, mobil simülasyon, boş önbellek. Ana sayfalar üçer ölçümün metrik bazında medyanı; diğer sayfalar tek ölçüm. KB = 1.000 bayt; toplamlar yanıt başlıklarını içerir. Ölçülen mobil sayfalarda TBT 0 ms ve CLS ≤ 0,00015.</p></section>
<section><h2>Uygulanan değişiklikler</h2><ol>
<li><strong>Medya merkezi:</strong> Kapaklar ekran genişliğine uygun optimize görsellerle yükleniyor. Mobilde başlangıçta 3, masaüstünde 6 kapak geliyor; kalanlar kaydırma sırasında yükleniyor. Tam görseller, PDF’ler ve videolar açıldığında erişilebilir.</li>
<li><strong>Fontlar:</strong> Inter ve Montserrat Latin/Türkçe ile Kiril alt kümelerine ayrıldı. Görünüm, ağırlıklar ve lisanslar korundu. Standart ilk yükleme 164,4 KB → 117,7 KB; Rusça açıklamalar içeren İngilizce medya merkezinde toplam 158,5 KB.</li>
<li><strong>QR menüsü:</strong> 1280 × 1280 çözünürlük korundu. Menü dosyası 411,6 KB WebP’den 223,5 KB AVIF’e indi; desteklemeyen tarayıcılara 259,4 KB WebP sunuluyor. Sayfa statik HTML ile çalışıyor, JavaScript ve font indirmiyor. Menü metni, fiyatlar, telefon, canonical ve sosyal paylaşım bilgileri korundu.</li>
<li><strong>Ortak JavaScript:</strong> Marka ve beach club bölümlerinin sabit içerikleri sunucuda render ediliyor; animasyonlar korundu. Gizlilik bağlantısının gereksiz ön indirmesi kaldırıldı. Ana sayfa JavaScript kazanımı sınırlı: 243,8 KB → 241,3 KB. HTML aktarımı 24,2 KB → 25,7 KB arttı; toplam sayfa aktarımı yine azaldı.</li>
</ol></section>
<section><h2>Masaüstü ve kayıtlı tercihler</h2><p>Masaüstünde TR / EN ana sayfalar <strong>99 / 99</strong>, LCP yaklaşık <strong>0,87 sn</strong>. QR <strong>100</strong>, LCP <strong>0,44 sn</strong>. Önceden kaydedilmiş gerekli çerez tercihleriyle, boş önbellekte mobil ana sayfalar <strong>90 / 90</strong>, LCP yaklaşık <strong>3,61 sn</strong>.</p></section>
<section><h2>Doğrulama</h2><ul><li>Production build ve TypeScript geçti; 43 route üretildi.</li><li>${report.validation.unitTests.passed} test geçti, başarısız test yok. API ve veritabanı testleri mock kullanıyor; gerçek lead gönderilmedi.</li><li>${browserCases} tarayıcı senaryosu geçti: TR / EN mobil ve masaüstü, menüler, filtreler, galeri, kat planları, medya popup’ları, haritalar, fontlar, az hareket tercihi ve QR fallback’i.</li><li>${inventory.routes.length} sayfa, ${inventory.assets.length} yerel HTML görsel referansı ve ${inventory.links.length} iç bağlantı denetlendi; metadata ve resmi adres kontrolleri geçti.</li><li>${report.validation.lighthouseRuns} yeni Lighthouse ölçümü tamamlandı.</li><li>Lint: 0 hata, ${report.validation.lint.warnings} mevcut uyarı.</li></ul><p class="small muted">Genel UI ve font senaryolarından sonra yalnızca QR route’u değiştirildi. Son build üzerinde QR / optimize medya kontrolleri, HTTP envanteri ve Lighthouse tekrar çalıştırıldı.</p></section>
<section><h2>Kalan sınırlar ve sonraki hedef</h2><p class="notice">Mobil ana sayfa LCP’si TR <strong>3,61 sn</strong>, EN <strong>3,69 sn</strong>; 2,5 sn iyi eşiğinin üzerinde. QR menüsü bu eşiğin altında. Sonraki çalışmada ana sayfanın font ve render yoluna, ortak JavaScript yüküne odaklanılmalı; 100 KB altı font ve 200 KB altı JavaScript hedefleri henüz karşılanmadı.</p><p>Bunlar laboratuvar ölçümleri. Canlı ziyaretçi p75 ve INP ölçülmedi; yerel GA4 kimliği yapılandırılmamış. Yayından sonra canlı sunucu ve gerçek ziyaretçi sonuçları ayrıca doğrulanmalı.</p><p class="small muted">QR masaüstü ölçümünde ek LCP trace insight NO_LCP uyarısı verdi; sayısal LCP, puan ve görsel yükleme kontrolleri başarılı. Mevcut 221 lint uyarısı ve middleware → proxy bildirimini bu turda değiştirmedik.</p></section>
<section><h2>Veriler ve kaynaklar</h2><p><a href="performance-round5-results.json">Bu raporun JSON verisi</a> · <a href="performance-final-audit-2026-10-14.html">Önceki kapsamlı rapor</a> · <a href="performance-round5-mobile-lighthouse.json">Mobil ölçümler</a> · <a href="performance-round5-desktop-lighthouse.json">Masaüstü ölçümler</a> · <a href="performance-round5-inventory.json">Sayfa / bağlantı envanteri</a></p><p class="small"><a href="https://web.dev/articles/vitals">Core Web Vitals eşikleri</a> · <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/unicode-range">Font unicode-range</a> · <a href="https://nextjs.org/docs/app/api-reference/components/image">Next.js Image</a></p></section>
</main></body></html>`;
fs.writeFileSync(path.join(root, "docs/performance-round5-results.json"), `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(path.join(root, "docs/performance-round5-results.html"), html);
console.log(JSON.stringify({ status: "written", browserCases, lighthouseRuns: report.validation.lighthouseRuns, routes: inventory.routes.length }));
