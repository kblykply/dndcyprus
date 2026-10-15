import fs from "node:fs";

const read = (file) => JSON.parse(fs.readFileSync(`docs/${file}.json`, "utf8"));
const mobile = read("seo-lighthouse-baseline-mobile");
const desktop = read("seo-lighthouse-current-desktop");
const live = read("seo-lighthouse-live-mobile");
const content = read("seo-results-2026-10-15");
const trackingBlockVerified = [mobile, desktop, live].every((report) => report.networkIsolationVerified === true);
for (const report of [mobile, desktop, live]) if (report.status !== "completed") throw new Error("Lighthouse measurements are not complete");
if (mobile.buildId !== content.buildId || desktop.buildId !== content.buildId) throw new Error("Local evidence build mismatch");
const summary = {
  measuredAt: new Date().toISOString(), clientDate: "2026-10-15",
  tool: `Lighthouse ${mobile.samples[0].lighthouseVersion}, SEO category only`,
  status: "measurement completed; no application changes needed to raise the measured local scores",
  localBuildId: mobile.buildId,
  localMobile: mobile.samples.map(({ route, score, failed }) => ({ route, score, failed })),
  localDesktop: desktop.samples.map(({ route, score, failed }) => ({ route, score, failed })),
  liveMobile: live.samples.map(({ route, score, failed }) => ({ route, score, failed })),
  contentPreservation: content.contentComparison,
  interpretation: "Local scores were already 100 at the beginning of this turn, after the previous technical SEO changes. There is no higher Lighthouse SEO score. No before/after score gain is claimed. The live homepage checks are separate from the unpublished local changes.",
  limits: [
    "Only the listed pages/profiles received Lighthouse runs; all 36 public pages received the separate source/HTTP SEO checks.",
    trackingBlockVerified ? "Known third-party analytics and advertising endpoints were blocked during the runs." : "The initial Lighthouse tracking filter was ineffective; audit visits may have reached measurement platforms. The helper is corrected; SEO scores are unaffected.",
    "Lighthouse SEO checks cover basic technical requirements. They do not measure rankings, keyword coverage, organic traffic or domain authority.",
    "Structured data is a manual Lighthouse check and is not part of the numerical score; Google Rich Results Test was not run.",
    "The previous technical SEO changes remain local and unpublished. Live Search Console indexing and field performance have not been inspected."
  ]
};
fs.writeFileSync("docs/seo-score-results-2026-10-15.json", JSON.stringify(summary, null, 2) + "\n");
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const table = (samples) => `<div class="table"><table><thead><tr><th>Sayfa</th><th>SEO / 100</th><th>Puan düşüren denetim</th></tr></thead><tbody>${samples.map((sample) => `<tr><td>${escape(sample.route)}</td><td><strong>${sample.score}</strong></td><td>${sample.failed.length ? sample.failed.map((audit) => escape(audit.id)).join(", ") : "Yok"}</td></tr>`).join("")}</tbody></table></div>`;
const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>DND Cyprus SEO puanları — 15 Ekim 2026</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f7f9;color:#1a2532;font:16px/1.65 system-ui,sans-serif}main{max-width:1000px;margin:auto;padding:28px 20px}section{background:white;border:1px solid #dce3e9;border-radius:12px;padding:20px;margin:20px 0}h1{font-size:30px;line-height:1.2}h2{font-size:21px}.table{overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:14px}td,th{text-align:left;padding:10px;border-bottom:1px solid #e1e6eb}td:first-child{overflow-wrap:anywhere}strong{color:#176749}li{margin:9px 0}a{color:#155b9b;overflow-wrap:anywhere}.muted{color:#596776;font-size:14px}@media(max-width:500px){main{padding:18px 12px}section{padding:14px}h1{font-size:26px}}</style></head><body><main><p class="muted">15 Ekim 2026 · ${escape(summary.tool)}</p><h1>DND Cyprus SEO puanları</h1><p>Önceki teknik SEO düzenlemelerinin bulunduğu yerel sürümde ${mobile.samples.length} mobil ve ${desktop.samples.length} masaüstü ölçümü yapıldı. Bu turda puanlar başlangıçta zaten 100/100 olduğu için sayısal artış iddia edilmiyor. Uygulama kodunda veya yazılı içeriklerde ek değişiklik yapılmadı.</p><section><h2>Yerel sürüm · mobil</h2>${table(mobile.samples)}</section><section><h2>Yerel sürüm · masaüstü</h2>${table(desktop.samples)}</section><section><h2>Canlı site · mobil</h2><p>https://www.dndcyprus.com üzerinde ayrı ölçümler; canlı build kimliği bilinmiyor.</p>${table(live.samples)}</section><section><h2>İçerik koruması ve kapsam</h2><p>${content.contentComparison.comparedPages} sayfanın başlığı, açıklaması, H1 listesi ve normalize edilmiş sunucu metni önceki sürümle karşılaştırıldı; değişen alan sayısı: <strong>${content.contentComparison.changed.length}</strong>.</p><p>Lighthouse SEO puanı temel teknik kontrolleri kapsar. Arama sıralamasını, organik trafiği veya anahtar kelime kapsamını ölçmez. Yapılandırılmış veriler Lighthouse’ta manuel denetimdir ve sayısal puana dahil değildir.</p><p>${trackingBlockVerified ? "Bilinen reklam ve analiz servislerine giden istekler engellendi." : "Bu eski Lighthouse ölçümlerinde dış servis filtresi etkisiz kalmış; ölçüm servislerine test ziyaretleri ulaşmış olabilir. Araç düzeltildi; SEO puanları etkilenmiyor."} Önceki SEO düzenlemeleri henüz yayınlanmadı; canlı Search Console indeks kapsamı ve gerçek ziyaretçi performansı incelenmedi.</p></section><section><h2>Kanıtlar</h2><p><a href="seo-score-results-2026-10-15.json">Ölçüm özeti</a> · <a href="seo-lighthouse-baseline-mobile.json">Mobil Lighthouse sonuçları</a> · <a href="seo-lighthouse-current-desktop.json">Masaüstü Lighthouse sonuçları</a> · <a href="seo-lighthouse-live-mobile.json">Canlı site sonuçları</a> · <a href="seo-summary-2026-10-15.html">Teknik SEO düzenlemeleri</a></p></section></main></body></html>`;
fs.writeFileSync("docs/seo-score-results-2026-10-15.html", html);
console.log(JSON.stringify({ localMobile: mobile.samples.length, localDesktop: desktop.samples.length, liveMobile: live.samples.length, localScores: [...new Set([...mobile.samples, ...desktop.samples].map((sample) => sample.score))], liveScores: live.samples.map((sample) => ({ route: sample.route, score: sample.score })) }));
