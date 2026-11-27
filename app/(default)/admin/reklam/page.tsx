// app/(default)/admin/reklam/page.tsx
// Reklam Raporu (25.11.2026): talepleri kanal, kampanya, reklam (utm_content), anahtar kelime, giriş sayfası ve projeye göre
// toplar; her satırda kaç talebin nitelikli/satış/olumsuz olduğu görünür. Reklam harcaması Meta/Google bağlanınca eklenecek.
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Megaphone, BadgeCheck, UserCheck, PieChart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { isSalesLead, originGroup, sourceGroup, statusInfo } from "@/lib/lead-status";
import { AD_DIMENSIONS, adKey, groupLeads, inRange, isQualified, overviewPeriod, periodBuckets, sourceColor, type AdDimension } from "@/lib/lead-stats";
import { BarList, ChartCard, Empty } from "../charts";
import PeriodTabs from "../PeriodTabs";

export const dynamic = "force-dynamic";

const PAID = new Set(["meta-reklam", "google-ads"]);
const pct = (a: number, b: number) => (b ? `%${((a / b) * 100).toFixed(1).replace(".", ",")}` : "—");

export default async function AdReportPage(props: { searchParams?: Promise<{ donem?: string; boyut?: string }> } = {}) {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/reklam");
  const sp = (await props.searchParams) ?? {};
  const period = overviewPeriod(sp.donem);
  const dim: AdDimension = (AD_DIMENSIONS.find((d) => d.key === sp.boyut)?.key ?? "kanal") as AdDimension;
  const now = new Date();

  const all = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, createdAt: true, name: true, phone: true, email: true, status: true, source: true, campaign: true, project: true, form: true, pageUrl: true, attribution: true },
  });
  const b = periodBuckets(period, now, all);
  const cur = inRange(all, b.from).filter(isSalesLead); // "Satış dışı" (tedarikçi, iş başvurusu…) reklam rakamlarına girmez
  const paid = cur.filter((l) => PAID.has(sourceGroup(l.source).key));
  const paidQualified = paid.filter((l) => isQualified(l.status)).length;
  const paidSold = paid.filter((l) => statusInfo(l.status).key === "satis").length;
  const channels = groupLeads(cur, (l) => sourceGroup(l.source));
  const rows = groupLeads(cur, (l) => adKey(dim, l));
  const covered = rows.reduce((s, r) => s + r.count, 0);
  const dimLabel = AD_DIMENSIONS.find((d) => d.key === dim)!.label;
  const periodLabel = { "30g": "son 30 gün", "90g": "son 90 gün", "12a": "son 12 ay", tumu: "tüm zamanlar" }[period];
  // geliş yolu: web formu / Messenger / Instagram / Meta formu / panel; numara bırakma oranıyla
  const origins = groupLeads(cur, (l) => originGroup(l.form, l.source)).map((g) => {
    const list = cur.filter((l) => originGroup(l.form, l.source).key === g.key);
    return { ...g, withContact: list.filter((l) => l.phone || l.email.trim()).length };
  });
  const originProjects = groupLeads(cur, (l) => (l.project ? { key: l.project, label: l.project } : null))
    .slice(0, 6)
    .map((p) => ({ ...p, parts: groupLeads(cur.filter((l) => l.project === p.key), (l) => originGroup(l.form, l.source)) }));

  const kpis = [
    { label: "Reklamdan gelen", value: paid.length, sub: "Meta reklam + Google Ads", icon: Megaphone, tint: "bg-[#eef5f6] text-[#0d6570]" },
    { label: "Reklam payı", value: pct(paid.length, cur.length), sub: `${cur.length} talebin içinde`, icon: PieChart, tint: "bg-violet-50 text-violet-600" },
    { label: "Reklamdan nitelikli", value: paidQualified, sub: `Nitelik oranı ${pct(paidQualified, paid.length)}`, icon: UserCheck, tint: "bg-blue-50 text-blue-600" },
    { label: "Reklamdan satış", value: paidSold, sub: `Dönüşüm ${pct(paidSold, paid.length)}`, icon: BadgeCheck, tint: "bg-teal-50 text-teal-700" },
  ];

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-tight text-black sm:text-[32px]">Reklam Raporu</h1>
          <p className="mt-1.5 text-sm text-slate-500">Hangi kanal ve kampanya talep getiriyor, hangisi satışa dönüyor.</p>
        </div>
        <PeriodTabs base="/admin/reklam" active={period} extra={{ boyut: dim === "kanal" ? undefined : dim }} />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{k.label}</p>
                <p className="mt-2 font-display text-3xl leading-none">{k.value}</p>
              </div>
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${k.tint}`}>
                <k.icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-500">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <ChartCard title="Kanallar" sub={`Talep sayısı · ${periodLabel}`}>
          <BarList
            items={channels.map((c) => ({ key: c.key, label: c.label, count: c.count, extra: `${c.qualified} nitelikli · ${c.sold} satış` }))}
            total={cur.length || undefined}
            colorOf={(k, i) => sourceColor(k, i)}
          />
        </ChartCard>

        <ChartCard title={`${dimLabel} kırılımı`} sub={covered < cur.length ? `${cur.length - covered} talepte bu bilgi yok (reklam bağlantısında UTM etiketi yoksa boş kalır)` : `${periodLabel}`}>
          <div className="-mx-1 mb-4 flex gap-1 overflow-x-auto px-1 pb-1 text-[13px]" role="tablist" aria-label="Kırılım">
            {AD_DIMENSIONS.map((d) => {
              const q = new URLSearchParams();
              if (period !== "12a") q.set("donem", period);
              if (d.key !== "kanal") q.set("boyut", d.key);
              const on = d.key === dim;
              return (
                <Link
                  key={d.key}
                  href={q.toString() ? `/admin/reklam?${q}` : "/admin/reklam"}
                  role="tab"
                  aria-selected={on}
                  className={`shrink-0 rounded-lg px-3 py-1.5 font-medium ${on ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  {d.label}
                </Link>
              );
            })}
          </div>
          {rows.length ? (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {[dimLabel, "Talep", "Nitelikli", "Satış", "Olumsuz", "Dönüşüm"].map((h, i) => (
                      <th key={h} className={`px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500 ${i ? "text-right" : "text-left"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.key} className="border-t border-slate-100">
                      <td className="max-w-[18rem] px-3 py-2.5">
                        <span className="block truncate font-medium text-slate-800" title={r.label}>
                          {r.label}
                        </span>
                        <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <span className="block h-full rounded-full bg-[#2aa9b3]" style={{ width: `${(r.count / rows[0].count) * 100}%` }} />
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right font-medium">{r.count}</td>
                      <td className="px-3 py-2.5 text-right text-blue-700">{r.qualified}</td>
                      <td className="px-3 py-2.5 text-right text-teal-700">{r.sold}</td>
                      <td className="px-3 py-2.5 text-right text-rose-600">{r.lost}</td>
                      <td className="px-3 py-2.5 text-right text-slate-600">{pct(r.sold, r.count)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty>Bu dönemde {dimLabel.toLocaleLowerCase("tr-TR")} bilgisi olan talep yok.</Empty>
          )}
        </ChartCard>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <ChartCard title="Geliş yolu" sub={`Talep nereden yazdı, kaçı numara bıraktı · ${periodLabel}`}>
          {origins.length ? (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {["Geliş yolu", "Talep", "Numara bıraktı", "Nitelikli", "Satış"].map((h, i) => (
                      <th key={h} className={`px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500 ${i ? "text-right" : "text-left"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {origins.map((o) => (
                    <tr key={o.key} className="border-t border-slate-100">
                      <td className="px-3 py-2.5 font-medium text-slate-800">{o.label}</td>
                      <td className="px-3 py-2.5 text-right font-medium">{o.count}</td>
                      <td className="px-3 py-2.5 text-right text-slate-700">
                        {o.withContact} <span className="text-xs text-slate-500">({pct(o.withContact, o.count)})</span>
                      </td>
                      <td className="px-3 py-2.5 text-right text-blue-700">{o.qualified}</td>
                      <td className="px-3 py-2.5 text-right text-teal-700">{o.sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty>Bu dönemde talep yok.</Empty>
          )}
        </ChartCard>
        <ChartCard title="Projeye göre geliş yolu" sub="En çok talep alan projeler">
          {originProjects.length ? (
            <ul className="space-y-3.5">
              {originProjects.map((p) => (
                <li key={p.key}>
                  <div className="flex items-baseline justify-between gap-3 text-[13px]">
                    <span className="truncate font-medium text-slate-800">{p.label}</span>
                    <span className="font-semibold">{p.count}</span>
                  </div>
                  <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-slate-100">
                    {p.parts.map((x, i) => (
                      <span key={x.key} style={{ width: `${(x.count / p.count) * 100}%`, background: ["#2aa9b3", "#0d6570", "#f47a20", "#94a3b8", "#c4b5fd"][i % 5] }} title={`${x.label}: ${x.count}`} />
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">{p.parts.map((x) => `${x.label} ${x.count}`).join(" · ")}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Proje bilgisi olan talep yok.</Empty>
          )}
        </ChartCard>
      </div>

      <p className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white px-5 py-4 text-[13px] text-slate-500">
        Reklam harcaması, gösterim ve tıklama sayıları Meta ve Google Ads hesapları panele bağlandığında bu sayfaya eklenecek. Şu an gösterilen her sayı
        panele düşen gerçek taleplerden hesaplanıyor.
      </p>
    </div>
  );
}
