// app/(default)/admin/performans/page.tsx
// Performans (27.11.2026): Messenger / Instagram mesajlarına cevap veren kişinin (Talha) 100 üzerinden puanı ve dökümü.
// Yalnız yönetici. Hesap lib/responder-score.ts; veri mesaj senkronunun sohbet hafızası + talepler.
import Link from "next/link";
import { Gauge, Moon, Phone, Timer, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/admin-auth";
import { loadMetaMsgState } from "@/lib/meta-messages";
import { MSG_RESPONDER } from "@/lib/meta-msg-view";
import { responderScore, weeklyTrend, type ScoreLead } from "@/lib/responder-score";

export const dynamic = "force-dynamic";

const PERIODS = [
  { key: "7", label: "Son 7 gün" },
  { key: "30", label: "Son 30 gün" },
  { key: "90", label: "Son 90 gün" },
] as const;

const MIN = 60_000;
const dur = (ms: number | null) => (ms === null ? "—" : ms < 3_600_000 ? `${Math.max(1, Math.round(ms / MIN))} dk` : `${(ms / 3_600_000).toFixed(1).replace(".", ",")} sa`);

export default async function PerformancePage(props: { searchParams?: Promise<{ donem?: string }> } = {}) {
  await requireRole("admin", "/admin/performans");
  const sp = (await props.searchParams) ?? {};
  const days = Number(PERIODS.find((p) => p.key === sp.donem)?.key ?? "30");
  const now = Date.now();
  const [state, rows] = await Promise.all([
    loadMetaMsgState(),
    prisma.contactMessage.findMany({ where: { form: "meta-mesaj" }, select: { id: true, phone: true, email: true, status: true } }),
  ]);
  // birleştirilen sohbetler eski (web formu) taleplere de bağlı olabilir: onları da ekle
  const convs = state?.convs ?? {};
  const linkedIds = [...new Set(Object.values(convs).map((c) => c.l).filter((x): x is number => !!x))].filter((id) => !rows.some((r) => r.id === id));
  const extra = linkedIds.length ? await prisma.contactMessage.findMany({ where: { id: { in: linkedIds } }, select: { id: true, phone: true, email: true, status: true } }) : [];
  const leads = new Map<number, ScoreLead>([...rows, ...extra].map((r) => [r.id, r]));
  const res = responderScore(convs, leads, now, days);
  const trend = weeklyTrend(convs, now, 8);
  const maxTrend = Math.max(1, ...trend.map((t) => t.median ?? 0));
  const ring = res.grade.tone === "teal" ? "#0d6570" : res.grade.tone === "amber" ? "#d97706" : "#e11d48";
  const C = 2 * Math.PI * 54;

  return (
    <div className="mx-auto max-w-[1300px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[36px]">Performans</h1>
          <p className="mt-1.5 text-sm text-slate-500">{MSG_RESPONDER} · Messenger ve Instagram mesajlarına cevap</p>
        </div>
        <div className="flex gap-1 text-sm" role="tablist" aria-label="Dönem">
          {PERIODS.map((p) => (
            <Link
              key={p.key}
              href={p.key === "30" ? "/admin/performans" : `/admin/performans?donem=${p.key}`}
              role="tab"
              aria-selected={Number(p.key) === days}
              className={`shrink-0 rounded-full px-4 py-2 font-medium ${Number(p.key) === days ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      {!res.stats.conversations ? (
        <p className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
          Bu dönemde mesaj sohbeti yok. Meta mesajları her 10 dakikada bir çekilir.
        </p>
      ) : (
        <>
          <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
            <section className="flex flex-col items-center justify-center rounded-3xl bg-[#eef5f6] p-6 text-center" aria-label="Toplam puan">
              <svg viewBox="0 0 120 120" className="h-44 w-44" role="img" aria-label={`${res.score} puan`}>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#d6e6e8" strokeWidth="10" />
                <circle cx="60" cy="60" r="54" fill="none" stroke={ring} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(res.score / 100) * C} ${C}`} transform="rotate(-90 60 60)" />
                <text x="60" y="66" textAnchor="middle" fontSize="34" fontWeight="700" fill="#0f172a">
                  {res.score}
                </text>
                <text x="60" y="84" textAnchor="middle" fontSize="10" fill="#64748b">
                  / 100
                </text>
              </svg>
              <p className="mt-2 text-xl font-bold" style={{ color: ring }}>
                {res.grade.label}
              </p>
              <p className="mt-1 text-[13px] text-slate-600">
                {res.stats.conversations} sohbet · {res.stats.answered} cevaplı · {res.stats.night} gece
              </p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="dokum">
              <h2 id="dokum" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Gauge className="h-5 w-5 text-[#0d6570]" aria-hidden /> Puan dökümü
              </h2>
              <ul className="mt-4 space-y-4">
                {res.parts.map((p) => (
                  <li key={p.key}>
                    <div className="flex items-baseline justify-between gap-3 text-[14px]">
                      <span className="font-medium text-slate-800">{p.label}</span>
                      <span className="whitespace-nowrap">
                        <span className="mr-2 text-xs text-slate-500">{p.value}</span>
                        <span className="font-semibold text-slate-900">
                          {String(p.points).replace(".", ",")} / {p.max}
                        </span>
                      </span>
                    </div>
                    <div className="mt-1.5 h-2.5 rounded-full bg-slate-100">
                      <div className="h-2.5 rounded-full bg-[#2aa9b3]" style={{ width: `${(p.points / p.max) * 100}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {p.hint}
                      {p.noData ? " Bu dönemde veri yok: tam puan sayıldı." : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Timer, label: "Gündüz ilk cevap", value: dur(res.stats.dayMedian), sub: "ortanca, 08:00–23:00" },
              { icon: Timer, label: "Tüm ilk cevaplar", value: dur(res.stats.allMedian), sub: "gece dahil ortanca" },
              { icon: Moon, label: "Gece gelen", value: String(res.stats.night), sub: "23:00–08:00 arası ilk mesaj" },
              { icon: Phone, label: "Numara alınan", value: `${res.stats.withContact} / ${res.stats.linked}`, sub: "telefon ya da e-posta bırakan" },
            ].map((k) => (
              <div key={k.label} className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <k.icon className="h-4 w-4 text-[#0d6570]" aria-hidden /> {k.label}
                </p>
                <p className="mt-2 font-display text-3xl leading-none text-slate-900">{k.value}</p>
                <p className="mt-2 text-xs text-slate-500">{k.sub}</p>
              </div>
            ))}
          </div>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="egilim">
            <h2 id="egilim" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <TrendingUp className="h-5 w-5 text-[#0d6570]" aria-hidden /> Haftalık gündüz cevap süresi
            </h2>
            <p className="mt-1 text-xs text-slate-500">Çubuk kısaldıkça cevap hızlanıyor · altında haftanın sohbet sayısı</p>
            <ol className="mt-5 grid h-48 grid-cols-8 items-end gap-2 sm:gap-4">
              {trend.map((t) => (
                <li key={t.from} className="flex h-full flex-col items-center justify-end gap-1.5 text-center">
                  <span className="text-[11px] font-semibold text-slate-700">{dur(t.median)}</span>
                  <span className="w-full rounded-t-xl bg-[#2aa9b3]" style={{ height: `${t.median ? Math.max(6, (t.median / maxTrend) * 100) : 0}%` }} />
                  <span className="text-[10px] text-slate-500">
                    {new Date(t.from).toLocaleDateString("tr-TR", { timeZone: "Asia/Famagusta", day: "2-digit", month: "2-digit" })}
                    <br />
                    {t.count} sohbet
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}

      <p className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-4 text-[13px] leading-relaxed text-slate-500">
        Nasıl hesaplanır: gündüz cevap hızı 35 + 1 saat içinde cevap 20 + gece mesajlarının sabah 10:00&apos;a kadar cevaplanması 15 + cevapsız
        bırakmama 10 + numara alma 20 = 100. Sayfanın 20 saniye içinde verdiği otomatik cevaplar (anında yanıt, mesai dışı mesajı) cevap sayılmaz. Son
        1 saatte gelen sohbetler henüz puana girmez. Instagram mesajları Meta tarafındaki sorun çözülünce hesaba katılır.
      </p>
    </div>
  );
}
