// app/(default)/admin/isi-haritasi/page.tsx
// Isı Haritası ve ziyaretçi davranışı (Microsoft Clarity) · 25.11.2026: sayfa sayfa oturum, kaydırma derinliği, öfkeli/boşa tıklama,
// hızlı geri dönüş; cihaz ve kanal kırılımı; her sayfanın ısı haritasını Clarity'de açan bağlantı. Harita görüntüsü Clarity
// API'sinde yok ve Clarity sayfası gömülemiyor (dürüstçe yazılı). Veri günlük birikimden (lib/clarity-sync.ts).
import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ExternalLink, Flame, MousePointerClick, MousePointer2, RefreshCw, ScrollText, Undo2, Users, Video } from "lucide-react";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { clarityAggregate, clarityConfigured, clarityLink, clarityTotals, cyprusDay, weighted, type ClarityResponse } from "@/lib/clarity";
import { loadClarity } from "@/lib/clarity-sync";
import { BarList, ChartCard, Donut, Empty } from "../charts";
import { refreshClarity } from "./actions";
import { pageLabel } from "@/lib/page-label";

export const dynamic = "force-dynamic";

const PERIODS = [
  { key: "anlik", label: "Son 24 saat", days: "anlik" as const },
  { key: "7g", label: "Son 7 gün", days: 7 },
  { key: "30g", label: "Son 30 gün", days: 30 },
  { key: "90g", label: "Son 90 gün", days: 90 },
];
const DEVICE_TR: Record<string, string> = { Mobile: "Telefon", PC: "Bilgisayar", Tablet: "Tablet", Other: "Diğer" };
const DEVICE_COLORS: Record<string, string> = { Mobile: "#2aa9b3", PC: "#0d6570", Tablet: "#f4a100", Other: "#94a3b8" };
const CHANNEL_TR: Record<string, string> = {
  PaidSearch: "Ücretli arama (Google Ads)",
  OrganicSearch: "Organik arama",
  Direct: "Doğrudan",
  PaidSocial: "Ücretli sosyal medya (Meta)",
  OrganicSocial: "Organik sosyal medya",
  Social: "Sosyal medya",
  Referral: "Başka siteler",
  Email: "E-posta",
  Display: "Görüntülü reklam",
  Video: "Video",
  AI: "Yapay zekâ araçları",
  Other: "Diğer",
};
const pct = (v: number | null) => (v === null ? "—" : `%${Math.round(v)}`);
const fmt = (n: number) => Math.round(n).toLocaleString("tr-TR");

function Kpi({ label, value, icon, sub }: { label: string; value: ReactNode; icon: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 font-display text-3xl leading-none">{value}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#eef5f6] text-[#0d6570]">{icon}</span>
      </div>
      {sub ? <p className="mt-3 text-xs text-slate-500">{sub}</p> : null}
    </div>
  );
}

function pathOf(url: string) {
  try {
    const u = new URL(url);
    return u.pathname + (u.search || "");
  } catch {
    return url;
  }
}

export default async function HeatmapPage(props: { searchParams?: Promise<{ donem?: string; mesaj?: string }> } = {}) {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/isi-haritasi");
  const sp = (await props.searchParams) ?? {};
  const period = PERIODS.find((p) => p.key === sp.donem) ?? PERIODS[2];
  const daysNum = period.days === "anlik" ? 1 : period.days;
  const configured = clarityConfigured();

  const header = (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[30px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[36px]">Isı Haritası</h1>
        <p className="mt-1.5 text-sm text-slate-500">Microsoft Clarity: ziyaretçiler sayfalarda ne kadar ilerliyor, nereye tıklıyor, nerede takılıyor.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={clarityLink("heatmaps", { days: daysNum })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#0d6570] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[#0a5159]"
        >
          <Flame className="h-4 w-4" aria-hidden /> Isı haritalarını aç
        </a>
        <a
          href={clarityLink("recordings", { days: daysNum })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Video className="h-4 w-4" aria-hidden /> Oturum kayıtları
        </a>
      </div>
    </div>
  );

  if (!configured) {
    return (
      <div className="mx-auto max-w-[1600px]">
        {header}
        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl text-slate-900">Clarity verisini panele bağlama</h2>
          <p className="mt-1.5 max-w-3xl text-sm text-slate-500">
            Site ziyaret kayıtlarını ve ısı haritası verisini Clarity&apos;ye gönderiyor; yukarıdaki düğmelerle Clarity&apos;de şimdi de görebilirsiniz. Sayfa
            sayfa ölçülerin burada görünmesi için tek bir API belirteci gerekiyor.
          </p>
          <ol className="mt-5 space-y-4 text-sm text-slate-700">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">1</span>
              <span>
                <b className="font-medium text-slate-900">Clarity&apos;de belirteç:</b> clarity.microsoft.com → “DND Cyprus” projesi → Ayarlar (Settings) → Veri dışa
                aktarma (Data Export) → <b className="font-medium">Yeni API belirteci oluştur</b> → adını “panel” yazın → oluşan belirteci kopyalayın.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">2</span>
              <span>
                <b className="font-medium text-slate-900">Vercel&apos;e ekleyin:</b> dndcyprus-azure → Settings → Environment Variables →{" "}
                <code className="rounded bg-slate-100 px-1 text-xs">CLARITY_API_TOKEN</code> (Sensitive, Production) → kaydedip yeniden yayınlayın.
              </span>
            </li>
          </ol>
          <p className="mt-5 text-xs text-slate-500">
            Clarity günde 10 sorguya izin veriyor ve yalnız son 3 günü veriyor; panel her sabah bir kez çekip biriktirir, 7/30/90 günlük görünüm bu birikimden
            oluşur.
          </p>
        </section>
      </div>
    );
  }

  const { rows, dayCount } = await loadClarity(period.days, cyprusDay(new Date()));
  const byDim = (d: string) => rows.filter((r) => r.dimension === d).map((r) => r.data as ClarityResponse);
  const pages = clarityAggregate(byDim("URL"), "URL");
  const devices = clarityAggregate(byDim("Device"), "Device");
  const channels = clarityAggregate(byDim("Channel"), "Channel");
  const t = clarityTotals(devices.length ? devices : pages);
  const fetchedAt = rows.reduce<Date | null>((m, r) => (!m || r.fetchedAt > m ? r.fetchedAt : m), null);
  const message =
    sp.mesaj === "yakin"
      ? "Son 24 saat 2 saatten kısa süre önce güncellendi; Clarity'nin günlük sorgu sınırı için yeniden çekilmedi."
      : sp.mesaj === "hata"
        ? "Clarity'den veri alınamadı (günlük sınır dolmuş ya da belirteç geçersiz olabilir)."
        : null;

  return (
    <div className="mx-auto max-w-[1600px]">
      {header}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 text-sm" role="tablist" aria-label="Dönem">
          {PERIODS.map((p) => (
            <Link
              key={p.key}
              href={p.key === "30g" ? "/admin/isi-haritasi" : `/admin/isi-haritasi?donem=${p.key}`}
              role="tab"
              aria-selected={p.key === period.key}
              className={`shrink-0 rounded-full px-4 py-2 font-medium ${p.key === period.key ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              {p.label}
            </Link>
          ))}
        </div>
        <form action={refreshClarity} className="flex items-center gap-3 text-xs text-slate-500">
          <span>
            {fetchedAt
              ? `Son güncelleme ${fetchedAt.toLocaleString("tr-TR", { timeZone: "Asia/Famagusta", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}${period.days !== "anlik" ? ` · ${dayCount} günlük veri` : ""}`
              : "Henüz veri çekilmedi"}
          </span>
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden /> Şimdi güncelle
          </button>
        </form>
      </div>
      {message ? <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">{message}</p> : null}

      {!rows.length ? (
        <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <p className="font-display text-xl">Bu dönem için henüz veri yok</p>
          <p className="mt-1 text-sm text-slate-500">
            Panel Clarity verisini her sabah 06:00&apos;da çeker. Hemen görmek için “Şimdi güncelle” ile son 24 saati alabilirsiniz.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5 xl:gap-4">
            <Kpi label="Oturum" value={fmt(t.sessions)} icon={<Users className="h-5 w-5" strokeWidth={1.8} aria-hidden />} sub={t.bots ? `${fmt(t.bots)} bot oturumu ayrı` : "Clarity kaydı"} />
            <Kpi label="Kaydırma derinliği" value={pct(weighted(t.scrollW, t.sessions))} icon={<ScrollText className="h-5 w-5" strokeWidth={1.8} aria-hidden />} sub="Sayfanın ortalama görülen kısmı" />
            <Kpi label="Öfkeli tıklama" value={fmt(t.rage)} icon={<MousePointerClick className="h-5 w-5" strokeWidth={1.8} aria-hidden />} sub={`Etkilenen oturum: ${pct(weighted(t.rageW, t.sessions))}`} />
            <Kpi label="Boşa tıklama" value={fmt(t.dead)} icon={<MousePointer2 className="h-5 w-5" strokeWidth={1.8} aria-hidden />} sub={`Etkilenen oturum: ${pct(weighted(t.deadW, t.sessions))}`} />
            <Kpi label="Hızlı geri dönüş" value={fmt(t.quickback)} icon={<Undo2 className="h-5 w-5" strokeWidth={1.8} aria-hidden />} sub={`Etkilenen oturum: ${pct(weighted(t.quickbackW, t.sessions))}`} />
          </div>

          <ChartCard title="Sayfalar" sub="Her sayfanın ısı haritası Clarity'de açılır" className="mt-5">
            {pages.length ? (
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[760px] text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      {["Sayfa", "Oturum", "Kaydırma", "Öfkeli tıklama", "Boşa tıklama", "Hızlı geri", ""].map((h, i) => (
                        <th key={i} className={`px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500 ${i && i < 6 ? "text-right" : "text-left"}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pages.slice(0, 25).map((s) => {
                      const scroll = weighted(s.scrollW, s.sessions);
                      return (
                        <tr key={s.value} className="border-t border-slate-100">
                          <td className="max-w-[22rem] px-3 py-2.5">
                            {(() => {
                              const pl = pageLabel(s.value);
                              return (
                                <span className="flex min-w-0 items-center gap-2" title={pathOf(s.value)}>
                                  <span className="truncate font-medium text-slate-800">{pl.name}</span>
                                  {pl.lang ? <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{pl.lang}</span> : null}
                                </span>
                              );
                            })()}
                            <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-slate-100" title={`Kaydırma ${pct(scroll)}`}>
                              <span className="block h-full rounded-full bg-[#2aa9b3]" style={{ width: `${Math.min(100, scroll ?? 0)}%` }} />
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right font-medium">{fmt(s.sessions)}</td>
                          <td className="px-3 py-2.5 text-right">{pct(scroll)}</td>
                          <td className="px-3 py-2.5 text-right text-rose-600">{s.rage ? `${fmt(s.rage)} (${pct(weighted(s.rageW, s.sessions))})` : "0"}</td>
                          <td className="px-3 py-2.5 text-right text-amber-700">{s.dead ? `${fmt(s.dead)} (${pct(weighted(s.deadW, s.sessions))})` : "0"}</td>
                          <td className="px-3 py-2.5 text-right text-slate-600">{s.quickback ? `${fmt(s.quickback)} (${pct(weighted(s.quickbackW, s.sessions))})` : "0"}</td>
                          <td className="px-3 py-2.5 text-right">
                            <a
                              href={clarityLink("heatmaps", { url: s.value, days: daysNum })}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-medium text-teal-700 hover:underline"
                            >
                              Isı haritası <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <Empty />
            )}
          </ChartCard>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <ChartCard title="Cihazlar" sub="Oturum dağılımı">
              <Donut
                items={devices.map((d) => ({ key: d.value, label: DEVICE_TR[d.value] ?? d.value, count: d.sessions, color: DEVICE_COLORS[d.value] ?? "#94a3b8" }))}
                total={devices.reduce((s, d) => s + d.sessions, 0)}
                centerLabel="oturum"
              />
            </ChartCard>
            <ChartCard title="Kanallar" sub="Ziyaretin geldiği kanal (Clarity)">
              <BarList
                items={channels.map((c) => ({ key: c.value, label: CHANNEL_TR[c.value] ?? c.value, count: c.sessions, extra: `kaydırma ${pct(weighted(c.scrollW, c.sessions))} · hızlı geri ${pct(weighted(c.quickbackW, c.sessions))}` }))}
                total={channels.reduce((s, c) => s + c.sessions, 0) || undefined}
                color="#0d6570"
              />
            </ChartCard>
          </div>

          <p className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-4 text-[13px] text-slate-500">
            Isı haritasının görüntüsü Clarity&apos;nin kendi ekranında açılır (Clarity başka sitelere gömülmeye izin vermiyor). Öfkeli tıklama: aynı yere art arda
            tıklama; boşa tıklama: tıklanınca bir şey olmayan yer; hızlı geri dönüş: sayfaya gelip hemen geri dönme.
          </p>
        </>
      )}
    </div>
  );
}
