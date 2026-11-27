// app/(default)/admin/genel/page.tsx
// Genel Bakış (25.11.2026): talep akışı, kaynaklar, projeler, satış hunisi, son talepler ve veri kaynaklarının durumu.
// Sayılar yalnız panelin veritabanındaki taleplerden hesaplanır; GA4/Clarity/Meta bağlanınca kendi kartları eklenecek.
import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AlarmClock, ArrowDownRight, ArrowUpRight, BadgeCheck, CheckCircle2, Clock3, PhoneCall, UserCheck, Users } from "lucide-react";
import { durationLabel, noContact, replyStats, threadsByLead, waitingSince } from "@/lib/meta-msg-view";
import { prisma } from "@/lib/prisma";
import { ga4Configured } from "@/lib/ga4";
import { clarityConfigured } from "@/lib/clarity";
import { loadMetaSyncState, metaLeadsConfigured } from "@/lib/meta-leads";
import { loadLiveMsgState } from "@/lib/meta-messages";
import { dueFollowUps, followUpLabel, followUpState } from "@/lib/lead-followup";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { LEAD_STATUSES, cyprusDateTime, sourceGroup, statusInfo, isSalesLead } from "@/lib/lead-status";
import { bucketCounts, changePct, groupLeads, inRange, isQualified, overviewPeriod, periodBuckets, sourceColor } from "@/lib/lead-stats";
import { AreaChart, BarList, ChartCard, Donut, ProjectBreakdown } from "../charts";
import PeriodTabs from "../PeriodTabs";

export const dynamic = "force-dynamic";

const STATUS_HEX: Record<string, string> = { yeni: "#f59e0b", arandi: "#94a3b8", gorusuluyor: "#3b82f6", satis: "#14b8a6", olumsuz: "#fb7185" };

function Kpi({ label, value, icon, tint, children }: { label: string; value: ReactNode; icon: ReactNode; tint: string; children?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 font-display text-3xl leading-none">{value}</p>
        </div>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${tint}`}>{icon}</span>
      </div>
      {children ? <div className="mt-3 text-xs text-slate-500">{children}</div> : null}
    </div>
  );
}

function Change({ pct }: { pct: number | null }) {
  if (pct === null) return <span>Önceki dönemde talep yok</span>;
  const up = pct >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`inline-flex items-center font-semibold ${up ? "text-teal-700" : "text-rose-600"}`}>
        <Icon className="h-3.5 w-3.5" aria-hidden />%{Math.abs(Math.round(pct))}
      </span>
      önceki döneme göre
    </span>
  );
}

export default async function OverviewPage(props: { searchParams?: Promise<{ donem?: string }> } = {}) {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/genel");
  const sp = (await props.searchParams) ?? {};
  const period = overviewPeriod(sp.donem);
  const now = new Date();

  const all = await prisma.contactMessage.findMany({
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: { id: true, createdAt: true, name: true, phone: true, email: true, status: true, statusAt: true, source: true, campaign: true, project: true, unitType: true, form: true, assignee: true, followUpAt: true },
  });
  const b = periodBuckets(period, now, all);
  const curAll = inRange(all, b.from);
  // satış rakamları yalnız alıcı talepleri: "Satış dışı" (tedarikçi, iş başvurusu…) sayılmaz
  const cur = curAll.filter(isSalesLead);
  const prev = b.prevFrom ? inRange(all.filter(isSalesLead), b.prevFrom, b.prevTo) : [];
  const series = bucketCounts(cur, b);
  const qualified = cur.filter((l) => isQualified(l.status)).length;
  const sold = cur.filter((l) => statusInfo(l.status).key === "satis").length;
  const waitingAll = all.filter((l) => statusInfo(l.status).key === "yeni").length;
  const sources = groupLeads(cur, (l) => sourceGroup(l.source)).map((g, i) => ({ ...g, color: sourceColor(g.key, i) }));
  const projects = groupLeads(cur, (l) => (l.project ? { key: l.project, label: l.project } : null))
    .slice(0, 6)
    .map((g) => ({
      ...g,
      byStatus: Object.fromEntries(LEAD_STATUSES.map((st) => [st.key, cur.filter((l) => l.project === g.key && statusInfo(l.status).key === st.key).length])),
    }));
  const noProject = cur.filter((l) => !l.project).length;
  const statusCounts = LEAD_STATUSES.map((s) => ({ key: s.key, label: s.label, count: curAll.filter((l) => statusInfo(l.status).key === s.key).length }));
  const lastWeb = all.find((l) => l.form && l.form !== "panel" && l.form !== "meta-lead" && l.form !== "meta-mesaj");
  const metaOn = metaLeadsConfigured();
  const [metaState, msgState] = metaOn ? await Promise.all([loadMetaSyncState(), loadLiveMsgState()]) : [null, null];
  const metaTotal = all.filter((l) => l.form === "meta-lead").length;
  const msgTotal = all.filter((l) => l.form === "meta-mesaj").length;
  const msgNote = !msgState?.lastRunAt ? "" : msgState.error ? ` · Mesajlar: ${msgState.error}` : ` · ${msgTotal} mesaj talebi (Messenger / Instagram)`;
  const metaNote = !metaOn
    ? "Reklam formu talepleri için Meta onayı bekleniyor"
    : !metaState?.lastRunAt
      ? "Bağlandı, ilk çekim birkaç dakika içinde"
      : metaState.error
        ? `Son denemede hata: ${metaState.error}`
        : `${metaTotal} reklam formu talebi${msgNote} · son kontrol ${cyprusDateTime(new Date(metaState.lastRunAt)).time}`;
  const due = dueFollowUps(all, now);
  const threads = threadsByLead(msgState);
  const msgWaiting = all.filter((l) => waitingSince(threads.get(l.id), l, now.getTime()) !== null).length;
  const msgNoNumber = all.filter((l) => noContact(l) && isSalesLead(l) && statusInfo(l.status).key !== "olumsuz").length;
  const rs = replyStats(msgState, b.from ? b.from.getTime() : null, now.getTime());
  const msgReady = !!msgState?.convs && Object.keys(msgState.convs).length > 0;
  const periodLabel = { "30g": "son 30 gün", "90g": "son 90 gün", "12a": "son 12 ay", tumu: "tüm zamanlar" }[period];

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[36px]">Genel Bakış</h1>
          <p className="mt-1.5 text-sm text-slate-500">Satış taleplerinin özeti: nereden geliyor, hangi projeye, ne kadarı satışa dönüyor.</p>
        </div>
        <PeriodTabs base="/admin/genel" active={period} />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        <Kpi label="Talepler" value={cur.length} tint="bg-[#eef5f6] text-[#0d6570]" icon={<Users className="h-5 w-5" strokeWidth={1.8} aria-hidden />}>
          {period === "tumu" ? <span>{all.length ? `${cyprusDateTime(all[all.length - 1].createdAt).date} tarihinden beri` : "Henüz talep yok"}</span> : <Change pct={changePct(cur.length, prev.length)} />}
        </Kpi>
        <Kpi label="Aranmayı bekleyen" value={<span className="text-amber-600">{waitingAll}</span>} tint="bg-amber-50 text-amber-600" icon={<PhoneCall className="h-5 w-5" strokeWidth={1.8} aria-hidden />}>
          <Link href="/admin/leads?durum=yeni" className="font-medium text-teal-700 hover:underline">
            Listeyi aç
          </Link>{" "}
          · bütün zamanlar
        </Kpi>
        <Kpi label="Nitelikli" value={qualified} tint="bg-blue-50 text-blue-600" icon={<UserCheck className="h-5 w-5" strokeWidth={1.8} aria-hidden />}>
          Görüşülüyor + satış · {periodLabel}
        </Kpi>
        <Kpi label="Satış" value={<span className="text-[#0d6570]">{sold}</span>} tint="bg-teal-50 text-teal-700" icon={<BadgeCheck className="h-5 w-5" strokeWidth={1.8} aria-hidden />}>
          Dönüşüm %{cur.length ? ((sold / cur.length) * 100).toFixed(1).replace(".", ",") : "0"} · {periodLabel}
        </Kpi>
      </div>

      {due.length ? (
        <ChartCard
          title="Bugün aranacaklar"
          sub="Takip tarihi bugün olan ya da geciken talepler (satış ve olumsuz hariç)"
          className="mt-5"
          right={
            <Link href="/admin/leads?takip=1" className="text-sm font-medium text-teal-700 hover:underline">
              Hepsini aç ({due.length})
            </Link>
          }
        >
          <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {due.slice(0, 6).map((l) => {
              const late = followUpState(l.followUpAt, now) === "gecikti";
              return (
                <li key={l.id}>
                  <Link href={`/admin/leads?id=${l.id}`} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-3 hover:border-teal-300 hover:bg-teal-50/40">
                    <AlarmClock className={`mt-0.5 h-4 w-4 shrink-0 ${late ? "text-red-500" : "text-amber-500"}`} aria-hidden />
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium text-slate-900">{l.name}</span>
                      <span className={`block text-xs ${late ? "text-red-600" : "text-amber-700"}`}>
                        {followUpLabel(l.followUpAt, now)}
                        {l.assignee ? <span className="text-slate-500"> · {l.assignee}</span> : null}
                      </span>
                      {l.project ? <span className="block truncate text-xs text-slate-500">{l.project}</span> : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </ChartCard>
      ) : null}

      {metaOn ? (
        <ChartCard
          title="Mesajlar (Messenger / Instagram)"
          sub={msgReady ? `Ekibin ilk cevap süresi, dönemde ilk kez yazan sohbetler · ${periodLabel}` : "Meta mesaj izni onaylanınca sohbetler buraya gelir"}
          className="mt-5"
          right={
            <Link href="/admin/bugun" className="text-sm font-medium text-teal-700 hover:underline">
              Bugün ekranı
            </Link>
          }
        >
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Medyan ilk yanıt", value: rs.median !== null ? durationLabel(rs.median) : "—", note: `${rs.answered} yanıtlanan sohbet`, href: null },
              { label: "1 saat içinde cevap", value: rs.withinHourPct !== null ? `%${rs.withinHourPct}` : "—", note: rs.unanswered ? `${rs.unanswered} sohbete yazılı cevap yok` : "Cevapsız sohbet yok", href: null },
              { label: "Şu an cevap bekleyen", value: String(msgWaiting), note: "Listeyi aç", href: "/admin/leads?mesaj=cevap", alert: msgWaiting > 0 },
              { label: "Numara vermedi", value: String(msgNoNumber), note: "Listeyi aç", href: "/admin/leads?mesaj=numarasiz" },
            ].map((k) => (
              <li key={k.label} className="rounded-2xl border border-slate-200 p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{k.label}</p>
                <p className={`mt-1.5 font-display text-2xl leading-none ${"alert" in k && k.alert ? "text-red-600" : "text-slate-900"}`}>{k.value}</p>
                {k.href ? (
                  <Link href={k.href} className="mt-2 inline-block text-xs font-medium text-teal-700 hover:underline">
                    {k.note}
                  </Link>
                ) : (
                  <p className="mt-2 text-xs text-slate-500">{k.note}</p>
                )}
              </li>
            ))}
          </ul>
        </ChartCard>
      ) : null}

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <ChartCard title="Talep akışı" sub={`${b.granularity === "day" ? "Günlük" : "Aylık"} gelen talep · ${periodLabel}`} right={<span className="font-display text-2xl">{cur.length}</span>}>
          <AreaChart data={series} id="genel-akis" height={270} />
        </ChartCard>
        <ChartCard title="Kaynaklar" sub="Talebin geldiği kanal">
          <Donut items={sources.map((s) => ({ key: s.key, label: s.label, count: s.count, color: s.color }))} total={cur.length} centerLabel="talep" />
        </ChartCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        <ChartCard title="Projeler" sub={noProject ? `${noProject} talepte proje seçilmemiş` : "Talep edilen proje"}>
          <ProjectBreakdown
            items={projects}
            total={cur.length}
            hrefOf={(k) => `/admin/leads?proje=${encodeURIComponent(k)}`}
          />
        </ChartCard>
        <ChartCard title="Satış hunisi" sub="Dönemde gelen taleplerin şu anki durumu">
          <BarList items={statusCounts} total={cur.length || undefined} colorOf={(k) => STATUS_HEX[k]} />
        </ChartCard>
        <ChartCard
          title="Son talepler"
          right={
            <Link href="/admin/leads" className="text-sm font-medium text-teal-700 hover:underline">
              Tümü
            </Link>
          }
          className="lg:col-span-2 2xl:col-span-1"
        >
          {all.length ? (
            <ul className="divide-y divide-slate-100">
              {all.slice(0, 6).map((l) => {
                const s = statusInfo(l.status);
                const { date, time } = cyprusDateTime(l.createdAt);
                return (
                  <li key={l.id}>
                    <Link href={`/admin/leads?id=${l.id}`} className="flex items-center gap-3 py-2.5 hover:bg-slate-50/60">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef5f6] text-xs font-semibold uppercase text-[#0d6570]">
                        {l.name
                          .split(/\s+/)
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium">{l.name}</span>
                        <span className="block truncate text-xs text-slate-500">
                          {[l.project, l.source ? sourceGroup(l.source).label : null].filter(Boolean).join(" · ") || "—"}
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.pill}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-slate-400">
                          {date} {time}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">Henüz talep yok.</p>
          )}
        </ChartCard>
      </div>

      <ChartCard title="Veri kaynakları" sub="Panele bağlı ve kurulum bekleyen sistemler" className="mt-5">
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { name: "Web sitesi formları", ok: true, note: lastWeb ? `Son talep ${cyprusDateTime(lastWeb.createdAt).date}` : "Bağlı, henüz talep yok" },
            { name: "Google Analytics 4", ok: ga4Configured(), note: ga4Configured() ? "Site Trafiği sayfasında" : "Site trafiği için okuma izni bekleniyor" },
            { name: "Microsoft Clarity", ok: clarityConfigured(), note: clarityConfigured() ? "Isı Haritası sayfasında" : "Isı haritası için API anahtarı bekleniyor" },
            { name: "Meta (Instagram / Facebook)", ok: metaOn && !metaState?.error, connected: metaOn, note: metaNote },
          ].map((d) => (
            <li key={d.name} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-3.5">
              {d.ok ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden />
              ) : (
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden />
              )}
              <span>
                <span className="block text-[13px] font-medium text-slate-900">{d.name}</span>
                <span className="block text-xs text-slate-500">{d.ok || ("connected" in d && d.connected) ? d.note : `Kurulum bekliyor · ${d.note}`}</span>
              </span>
            </li>
          ))}
        </ul>
      </ChartCard>
    </div>
  );
}
