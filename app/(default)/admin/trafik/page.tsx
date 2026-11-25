// app/(default)/admin/trafik/page.tsx
// Site Trafiği (GA4) · 25.11.2026: ziyaretçi, oturum, kanal, kaynak, sayfa, ülke, cihaz, dönüşüm olayları ve anlık ziyaretçi;
// GA4 sayıları panelin talepleriyle yan yana (oturum → talep oranı). GA4 bağlı değilse kurulum adımları gösterilir, sıfır basılmaz.
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Activity, Clock3, Eye, MousePointerClick, Radio, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { CHANNEL_TR, DEVICE_TR, EVENT_TR, ga4Configured, ga4PropertyId, ga4Range, ga4Report, ga4ServiceEmail, ga4TimeKey, type Ga4Report, type Ga4Result } from "@/lib/ga4";
import { inRange, overviewPeriod, periodBuckets } from "@/lib/lead-stats";
import { AreaChart, BarList, ChartCard, Donut, Empty } from "../charts";
import PeriodTabs from "../PeriodTabs";

export const dynamic = "force-dynamic";

const fmt = (n: number) => Math.round(n).toLocaleString("tr-TR");
const duration = (s: number) => (s >= 60 ? `${Math.floor(s / 60)} dk ${Math.round(s % 60)} sn` : `${Math.round(s)} sn`);
const DEVICE_COLORS: Record<string, string> = { mobile: "#2aa9b3", desktop: "#0d6570", tablet: "#f4a100" };

function Kpi({ label, value, icon, sub }: { label: string; value: ReactNode; icon: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 font-display text-3xl leading-none">{value}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef5f6] text-[#0d6570]">{icon}</span>
      </div>
      {sub ? <p className="mt-3 text-xs text-slate-500">{sub}</p> : null}
    </div>
  );
}

function Problem({ r }: { r: Ga4Result<unknown> }) {
  if (r.ok) return null;
  return <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">GA4 verisi alınamadı: {r.error}</p>;
}

function Setup({ denied = false }: { denied?: boolean }) {
  const email = ga4ServiceEmail();
  const id = ga4PropertyId();
  return (
    <section className="mt-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl text-slate-900">{denied ? "Son adım: GA4'te okuma izni" : "GA4 verisini panele bağlama"}</h2>
      {denied ? (
        <p className="mt-1.5 max-w-3xl text-sm text-amber-700">
          Anahtar çalışıyor, ancak okuyucu hesabın DND Cyprus GA4 mülkünde izni yok. GA4&apos;te yönetici yetkisi olan biri aşağıdaki 1. adımı yapınca bu sayfa
          kendiliğinden dolar.
        </p>
      ) : null}
      <p className={`mt-1.5 max-w-3xl text-sm text-slate-500 ${denied ? "hidden" : ""}`}>
        Site ziyaret verisini GA4&apos;e gönderiyor. Panelin bu veriyi okuyabilmesi için Google&apos;ın bir okuma izni vermesi gerekiyor. Aşağıdaki iki adım
        tamamlanınca bu sayfa kendiliğinden dolar.
      </p>
      <ol className="mt-5 space-y-4 text-sm text-slate-700">
        <li className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">1</span>
          <span>
            <b className="font-medium text-slate-900">GA4&apos;te okuma izni:</b> Google Analytics → Yönetici → Mülk erişim yönetimi → “+” → Kullanıcı ekle.
            E-posta olarak panelin okuyucu hesabını yazın, rol <b className="font-medium">Görüntüleyici</b>.
            {email ? (
              <span className="mt-1 block break-all rounded-md bg-slate-50 px-2 py-1 font-mono text-xs text-slate-700">{email}</span>
            ) : (
              <span className="mt-1 block text-xs text-slate-500">Hesap e-postası anahtar eklenince burada görünür.</span>
            )}
          </span>
        </li>
        <li className="flex gap-3">
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${denied ? "bg-teal-600" : "bg-slate-900"}`}>{denied ? "✓" : "2"}</span>
          <span>
            <b className="font-medium text-slate-900">Vercel&apos;e anahtar{denied ? " (tamam, çalışıyor)" : ""}:</b> dndcyprus-azure → Settings → Environment Variables →{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">GA4_SERVICE_ACCOUNT_JSON</code> (okuyucu hesabın JSON anahtar dosyasının tamamı, Sensitive) ve{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">GA4_PROPERTY_ID</code> {id ? <>(şu an: {id})</> : "(DND Cyprus GA4 mülk numarası)"}.
          </span>
        </li>
      </ol>
    </section>
  );
}

export default async function TrafficPage(props: { searchParams?: Promise<{ donem?: string }> } = {}) {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/trafik");
  const sp = (await props.searchParams) ?? {};
  const period = overviewPeriod(sp.donem);
  const periodLabel = { "30g": "son 30 gün", "90g": "son 90 gün", "12a": "son 12 ay", tumu: "tüm zamanlar" }[period];

  const header = (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[28px] leading-tight text-black sm:text-[32px]">Site Trafiği</h1>
        <p className="mt-1.5 text-sm text-slate-500">Google Analytics 4: kim geliyor, nereden geliyor, hangi sayfaya bakıyor, kaçı talebe dönüyor.</p>
      </div>
      <PeriodTabs base="/admin/trafik" active={period} />
    </div>
  );

  if (!ga4Configured()) {
    return (
      <div className="mx-auto max-w-[1600px]">
        {header}
        <Setup />
      </div>
    );
  }

  const now = new Date();
  const { dateRanges, timeDim } = ga4Range(period);
  const [totals, series, channels, sources, pages, countries, devices, events, live] = await Promise.all([
    ga4Report({ dateRanges, metrics: ["activeUsers", "newUsers", "sessions", "screenPageViews", "engagementRate", "averageSessionDuration"].map((name) => ({ name })) }),
    ga4Report({ dateRanges, dimensions: [{ name: timeDim }], metrics: [{ name: "sessions" }], orderBys: [{ dimension: { dimensionName: timeDim } }], limit: 500 }),
    ga4Report({ dateRanges, dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: [{ name: "sessions" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }] }),
    ga4Report({ dateRanges, dimensions: [{ name: "sessionSourceMedium" }], metrics: [{ name: "sessions" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 10 }),
    ga4Report({ dateRanges, dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }], orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: 10 }),
    ga4Report({ dateRanges, dimensions: [{ name: "countryId" }], metrics: [{ name: "activeUsers" }], orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }], limit: 10 }),
    ga4Report({ dateRanges, dimensions: [{ name: "deviceCategory" }], metrics: [{ name: "sessions" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }] }),
    ga4Report({
      dateRanges,
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: Object.keys(EVENT_TR) } } },
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    }),
    ga4Report({ metrics: [{ name: "activeUsers" }] }, "runRealtimeReport"),
  ]);

  const all = await prisma.contactMessage.findMany({ select: { createdAt: true } });
  const b = periodBuckets(period, now, all);
  const leadsInPeriod = inRange(all, b.from).length;
  const t = totals.ok ? totals.data.totals : [];
  const sessions = t[2] ?? 0;
  const byKey = new Map((series.ok ? series.data.rows : []).map((r) => [ga4TimeKey(r.dims[0]), r.vals[0]]));
  const seriesData = b.keys.map((k) => ({ label: k.label, title: k.title, count: byKey.get(k.key) ?? 0 }));
  const regionTr = new Intl.DisplayNames(["tr"], { type: "region" });
  const rowsOf = (r: Ga4Result<Ga4Report>) => (r.ok ? r.data.rows : []);
  const deviceRows = rowsOf(devices);
  const deviceTotal = deviceRows.reduce((s, r) => s + r.vals[0], 0);
  const failed = [totals, series, channels, sources, pages, countries, devices, events].find((r) => !r.ok);
  // Okuma izni yoksa ya da ana rapor alınamadıysa sıfır basılmaz: kurulum/izin adımı ve hata gösterilir
  if (!totals.ok) {
    return (
      <div className="mx-auto max-w-[1600px]">
        {header}
        {/okuma izni yok/.test(totals.error) ? <Setup denied /> : <div className="mt-5"><Problem r={totals} /></div>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px]">
      {header}
      {failed ? <div className="mt-5"><Problem r={failed} /></div> : null}

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        <Kpi label="Ziyaretçi" value={fmt(t[0] ?? 0)} icon={<Users className="h-5 w-5" strokeWidth={1.8} aria-hidden />} sub={`${fmt(t[1] ?? 0)} yeni ziyaretçi · ${periodLabel}`} />
        <Kpi label="Oturum" value={fmt(sessions)} icon={<Activity className="h-5 w-5" strokeWidth={1.8} aria-hidden />} sub={`${fmt(t[3] ?? 0)} sayfa görüntüleme`} />
        <Kpi
          label="Talebe dönüşüm"
          value={sessions ? `%${((leadsInPeriod / sessions) * 100).toFixed(2).replace(".", ",")}` : "—"}
          icon={<MousePointerClick className="h-5 w-5" strokeWidth={1.8} aria-hidden />}
          sub={`${leadsInPeriod} talep / ${fmt(sessions)} oturum`}
        />
        <Kpi
          label="Şu an sitede"
          value={live.ok ? fmt(live.data.totals[0] ?? live.data.rows[0]?.vals[0] ?? 0) : "—"}
          icon={<Radio className="h-5 w-5" strokeWidth={1.8} aria-hidden />}
          sub={
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" aria-hidden /> Son 30 dk · ort. oturum {duration(t[5] ?? 0)} · etkileşim %{Math.round((t[4] ?? 0) * 100)}
            </span>
          }
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <ChartCard title="Oturumlar" sub={`${b.granularity === "day" ? "Günlük" : "Aylık"} · ${periodLabel}`} right={<span className="font-display text-2xl">{fmt(sessions)}</span>}>
          {series.ok ? <AreaChart data={seriesData} id="trafik" height={270} unit="oturum" color="#0d6570" /> : <Empty>Veri alınamadı.</Empty>}
        </ChartCard>
        <ChartCard title="Cihazlar" sub="Oturumların cihaz dağılımı">
          <Donut
            items={deviceRows.map((r, i) => ({ key: r.dims[0], label: DEVICE_TR[r.dims[0]] ?? r.dims[0], count: r.vals[0], color: DEVICE_COLORS[r.dims[0]] ?? ["#94a3b8", "#cd4824"][i % 2] }))}
            total={deviceTotal}
            centerLabel="oturum"
          />
        </ChartCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        <ChartCard title="Kanallar" sub="GA4 varsayılan kanal grubu">
          <BarList items={rowsOf(channels).map((r) => ({ key: r.dims[0], label: CHANNEL_TR[r.dims[0]] ?? r.dims[0], count: r.vals[0] }))} total={sessions || undefined} />
        </ChartCard>
        <ChartCard title="Kaynak / ortam" sub="En çok oturum getiren 10 kaynak">
          <BarList items={rowsOf(sources).map((r) => ({ key: r.dims[0], label: r.dims[0], count: r.vals[0] }))} total={sessions || undefined} color="#0d6570" />
        </ChartCard>
        <ChartCard title="Dönüşüm olayları" sub="Sitede ölçülen işlemler" className="lg:col-span-2 2xl:col-span-1">
          <BarList items={rowsOf(events).map((r) => ({ key: r.dims[0], label: EVENT_TR[r.dims[0]] ?? r.dims[0], count: r.vals[0] }))} color="#f4a100" />
        </ChartCard>
        <ChartCard title="En çok bakılan sayfalar" sub="Sayfa görüntüleme" className="lg:col-span-2 2xl:col-span-2">
          <BarList items={rowsOf(pages).map((r) => ({ key: r.dims[0], label: r.dims[0], count: r.vals[0] }))} />
        </ChartCard>
        <ChartCard title="Ülkeler" sub="Ziyaretçi">
          <BarList
            items={rowsOf(countries).map((r) => {
              let label = r.dims[0];
              try {
                label = (r.dims[0] && r.dims[0] !== "(not set)" ? regionTr.of(r.dims[0]) : null) ?? "Bilinmiyor";
              } catch {
                /* tanımsız bölge kodu */
              }
              return { key: r.dims[0] || "?", label, count: r.vals[0] };
            })}
            color="#7c3aed"
          />
        </ChartCard>
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-5 py-4 text-[13px] text-slate-500">
        <Eye className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        GA4 yalnız çerez iznini kabul eden ziyaretçileri sayar; gerçek ziyaretçi sayısı buradakinden yüksektir. Talep sayısı panelin kendi kaydından gelir.
      </p>
    </div>
  );
}
