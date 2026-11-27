// app/(default)/admin/bugun/page.tsx
// Bugün (27.11.2026): sabah açılan iş ekranı. Kullanıcının gösterdiği örnek düzen ("Seni bekleyenler" listesi, iki büyük sayı
// kartı, huni, haftalık takvim, ekip) panelin beyaz-teal diliyle. Sayılar yalnız panelin veritabanından ve mesaj senkronundan.
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, CalendarDays, MessageCircle, Phone, PhoneOff, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { cyprusMonthStart, isSalesLead, statusInfo, telHref, waNumber } from "@/lib/lead-status";
import { followUpLabel } from "@/lib/lead-followup";
import { loadMetaMsgState } from "@/lib/meta-messages";
import { durationLabel, inboxUrl, replyStats, threadsByLead } from "@/lib/meta-msg-view";
import { agenda, funnel, greeting, noNumberLeads, teamLoad, upcoming, weekStrip, type AgendaItem, type BoardLead } from "@/lib/today-board";

export const dynamic = "force-dynamic";

const DAY = 86_400_000;

const initials = (name: string) =>
  name
    .replace(/^@/, "")
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

const KIND_STYLE: Record<AgendaItem["kind"], { chip: string; tag: string; text: string }> = {
  cevap: { chip: "bg-rose-100 text-rose-700", tag: "Cevap bekliyor", text: "text-rose-700" },
  arama: { chip: "bg-amber-100 text-amber-800", tag: "Aranacak", text: "text-amber-800" },
  yeni: { chip: "bg-[#e3f1f2] text-[#0d6570]", tag: "Yeni talep", text: "text-[#0d6570]" },
};

const pill = "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold transition-colors";
const pillPrimary = `${pill} bg-[#0d6570] text-white hover:bg-[#0a5159]`;
const pillSoft = `${pill} bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50`;

function AgendaRow({ it, pageId }: { it: AgendaItem; pageId: string | null }) {
  const l = it.lead;
  const st = KIND_STYLE[it.kind];
  const wa = waNumber(l.phone);
  return (
    <li className="rounded-2xl bg-[#f5f8f8] p-4 sm:p-5">
      <div className="flex items-start gap-3.5">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${st.chip}`}>{initials(l.name)}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold leading-snug text-slate-900">{l.name}</p>
          <p className={`mt-0.5 text-[13px] ${st.text}`}>{it.label}</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{[l.project, l.phone || l.email || (it.kind === "cevap" ? "numara vermedi" : "")].filter(Boolean).join(" · ") || "—"}</p>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2 sm:pl-[58px]">
        {it.kind === "cevap" ? (
          <a href={inboxUrl(pageId, it.thread)} target="_blank" rel="noreferrer" className={pillPrimary}>
            <MessageCircle className="h-4 w-4" aria-hidden /> Cevap yaz
          </a>
        ) : telHref(l.phone) ? (
          <a href={telHref(l.phone)} className={pillPrimary}>
            <Phone className="h-4 w-4" aria-hidden /> Ara
          </a>
        ) : null}
        {it.kind !== "cevap" && wa ? (
          <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className={pillSoft}>
            WhatsApp
          </a>
        ) : null}
        <Link href={`/admin/leads?id=${l.id}`} className={pillSoft}>
          Talebi aç
        </Link>
      </div>
    </li>
  );
}

export default async function TodayPage() {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/bugun");
  const now = new Date();

  const [rows, msgState] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: { id: true, createdAt: true, name: true, phone: true, email: true, project: true, source: true, form: true, status: true, statusAt: true, assignee: true, followUpAt: true },
    }),
    loadMetaMsgState(),
  ]);
  const leads = rows as BoardLead[];
  const threads = threadsByLead(msgState);
  const pageId = msgState?.pageId ?? null;

  const { items, counts } = agenda(leads, threads, now);
  const total = counts.cevap + counts.arama + counts.yeni;
  const sales = leads.filter(isSalesLead);
  const weekFrom = now.getTime() - 7 * DAY;
  const thisWeek = sales.filter((l) => l.createdAt.getTime() >= weekFrom).length;
  const lastWeek = sales.filter((l) => l.createdAt.getTime() >= weekFrom - 7 * DAY && l.createdAt.getTime() < weekFrom).length;
  const monthStart = cyprusMonthStart(now);
  const soldMonth = sales.filter((l) => statusInfo(l.status).key === "satis" && (l.statusAt ?? l.createdAt) >= monthStart).length;
  const talking = sales.filter((l) => statusInfo(l.status).key === "gorusuluyor").length;
  const fn = funnel(leads, new Date(now.getTime() - 30 * DAY));
  const week = weekStrip(leads, now);
  const next = upcoming(leads, now, 3);
  const team = teamLoad(leads, now).slice(0, 5);
  const noNumber = noNumberLeads(leads);
  const rs = replyStats(msgState, now.getTime() - 30 * DAY, now.getTime());
  const msgReady = !!msgState?.convs && Object.keys(msgState.convs).length > 0;

  const authorCookie = store.get("admin_author")?.value;
  let who = "";
  try {
    who = authorCookie ? decodeURIComponent(authorCookie).split(/\s+/)[0] : "";
  } catch {
    who = "";
  }
  const parts: string[] = [];
  if (counts.cevap) parts.push(`${counts.cevap} müşteri mesajına cevap bekliyor`);
  if (counts.arama) parts.push(`${counts.arama} kişi bugün aranacak`);
  if (counts.yeni) parts.push(`${counts.yeni} yeni talep henüz aranmadı`);
  const diff = thisWeek - lastWeek;

  return (
    <div className="mx-auto max-w-[1500px]">
      <h1 className="text-[34px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[42px]">
        {greeting(now)}
        {who ? `, ${who.charAt(0).toLocaleUpperCase("tr-TR")}${who.slice(1)}` : ""}
      </h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">
        {total ? `Bugün seni bekleyen ${total} iş var: ${parts.join(", ")}.` : "Bugün bekleyen iş yok: bütün mesajlar cevaplı, aramalar tamam."}
        {thisWeek ? ` Bu hafta ${thisWeek} talep geldi.` : ""}
      </p>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
        {/* Sol: seni bekleyenler */}
        <section aria-labelledby="bekleyen">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="bekleyen" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              Seni bekleyenler
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#2aa9b3] px-1.5 text-xs font-bold text-white">{total}</span>
            </h2>
            <span className="text-xs text-slate-500">En eski önce</span>
          </div>
          {items.length ? (
            <ul className="space-y-3">
              {items.slice(0, 6).map((it) => (
                <AgendaRow key={`${it.kind}-${it.lead.id}`} it={it} pageId={pageId} />
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl bg-[#f5f8f8] p-6 text-sm text-slate-600">Şu an bekleyen iş yok. Yeni mesaj ya da talep gelince burada görünür.</p>
          )}
          {items.length > 6 ? (
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {counts.cevap ? <Link href="/admin/leads?mesaj=cevap" className={pillSoft}>Cevap bekleyenler ({counts.cevap})</Link> : null}
              {counts.arama ? <Link href="/admin/leads?takip=1" className={pillSoft}>Bugün aranacaklar ({counts.arama})</Link> : null}
              {counts.yeni ? <Link href="/admin/leads?durum=yeni" className={pillSoft}>Yeni talepler</Link> : null}
            </div>
          ) : null}

          {noNumber.length ? (
            <Link href="/admin/leads?mesaj=numarasiz" className="mt-6 flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 hover:border-[#2aa9b3]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <PhoneOff className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-slate-900">{noNumber.length} kişi numara bırakmadı</span>
                <span className="block text-[13px] text-slate-500">Mesajla yazdılar ama telefon vermediler: sohbetten numara istenebilir.</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            </Link>
          ) : null}
        </section>

        {/* Orta: sayılar ve huni */}
        <section className="space-y-6" aria-label="Sayılar">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex min-h-[150px] flex-col justify-between rounded-3xl bg-[#0d6570] p-5 text-white">
              <p className="text-[13px] font-medium text-white/80">Bu hafta gelen talep</p>
              <div>
                <p className="font-display text-[44px] leading-none">{thisWeek}</p>
                <p className="mt-2 text-[13px] text-white/85">
                  {lastWeek || thisWeek ? (diff >= 0 ? `Geçen haftadan ${diff} fazla` : `Geçen haftadan ${-diff} az`) : "Son 7 gün"}
                </p>
              </div>
            </div>
            <div className="flex min-h-[150px] flex-col justify-between rounded-3xl bg-[#fdf1e7] p-5 text-slate-900">
              <p className="text-[13px] font-medium text-[#9a4a12]">Bu ay satış</p>
              <div>
                <p className="font-display text-[44px] leading-none text-[#c2410c]">{soldMonth}</p>
                <p className="mt-2 text-[13px] text-[#9a4a12]">{talking} kişiyle görüşülüyor</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Satış hunisi</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Son 30 gün</span>
            </div>
            <ul className="space-y-4">
              {fn.steps.map((s, i) => {
                const first = fn.steps[0].count || 1;
                const prev = i ? fn.steps[i - 1].count : 0;
                return (
                  <li key={s.key}>
                    <div className="flex items-baseline justify-between gap-3 text-[14px]">
                      <span className="text-slate-700">{s.label}</span>
                      <span className="whitespace-nowrap font-semibold text-slate-900">
                        {i && prev ? <span className="mr-1.5 text-xs font-normal text-slate-500">%{Math.round((s.count / prev) * 100)} ·</span> : null}
                        {s.count}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2.5 rounded-full bg-slate-100">
                      <div className="h-2.5 rounded-full" style={{ width: `${Math.max(s.count ? 3 : 0, (s.count / first) * 100)}%`, background: i === fn.steps.length - 1 ? "#f47a20" : "#2aa9b3" }} />
                    </div>
                  </li>
                );
              })}
            </ul>
            {fn.drop ? (
              <div className="mt-5 rounded-2xl bg-[#f5f8f8] p-4">
                <p className="text-[13px] font-semibold text-slate-900">
                  En büyük kayıp: {fn.drop.from.label.toLocaleLowerCase("tr-TR")} → {fn.drop.to.label.toLocaleLowerCase("tr-TR")}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                  Her 100 kişiden {fn.drop.lostPer100}&apos;i bu adımda kalıyor.
                  {fn.drop.to.key === "numara" ? " Mesajla yazanlardan numara istemek en hızlı kazanç." : fn.drop.to.key === "ulasildi" ? " Yeni talepleri aynı gün aramak bu oranı düşürür." : ""}
                </p>
              </div>
            ) : null}
          </div>
        </section>

        {/* Sağ: mesajlar, hafta, ekip */}
        <section className="space-y-6" aria-label="Takvim ve ekip">
          <div className="rounded-3xl bg-[#eef5f6] p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Sparkles className="h-4 w-4 text-[#0d6570]" aria-hidden /> Mesajlara cevap
            </h2>
            {msgReady ? (
              <dl className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-3.5">
                  <dt className="text-xs text-slate-500">İlk cevap (ortanca)</dt>
                  <dd className="mt-1 font-display text-2xl text-slate-900">{rs.median !== null ? durationLabel(rs.median) : "—"}</dd>
                </div>
                <div className="rounded-2xl bg-white p-3.5">
                  <dt className="text-xs text-slate-500">1 saat içinde</dt>
                  <dd className="mt-1 font-display text-2xl text-slate-900">{rs.withinHourPct !== null ? `%${rs.withinHourPct}` : "—"}</dd>
                </div>
                <p className="col-span-2 text-[13px] text-slate-600">
                  Son 30 günde {rs.conversations} sohbet
                  {rs.unanswered ? ` · ${rs.unanswered} sohbete hiç yazılı cevap verilmedi` : ""}.
                </p>
              </dl>
            ) : (
              <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                Messenger ve Instagram sohbetleri Meta izni onaylanınca buraya gelir: ilk cevap süresi ve cevap bekleyen müşteriler.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <CalendarDays className="h-4 w-4 text-[#0d6570]" aria-hidden /> Bu hafta
              </h2>
              <Link href="/admin/leads?takip=1" className="inline-flex items-center gap-1 text-[13px] font-medium text-slate-700 hover:text-[#0d6570]">
                Aramalar <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
            <ol className="mt-4 grid grid-cols-7 gap-1.5 text-center">
              {week.map((d) => (
                <li
                  key={d.key}
                  className={`rounded-xl py-2 ${d.today ? "bg-[#0d6570] text-white" : d.past ? "bg-slate-50 text-slate-400" : "bg-slate-50 text-slate-700"}`}
                  title={`${d.count} planlı arama`}
                >
                  <span className="block text-[10px] font-medium uppercase">{d.dow}</span>
                  <span className="block text-[15px] font-bold">{d.day}</span>
                  <span className={`mx-auto mt-1 block h-1.5 w-1.5 rounded-full ${d.count ? (d.today ? "bg-white" : "bg-[#f47a20]") : "bg-transparent"}`} />
                </li>
              ))}
            </ol>
            {next.length ? (
              <ul className="mt-4 divide-y divide-slate-100">
                {next.map((l) => (
                  <li key={l.id} className="py-2.5">
                    <Link href={`/admin/leads?id=${l.id}`} className="block hover:text-[#0d6570]">
                      <span className="block text-xs text-slate-500">{[followUpLabel(l.followUpAt, now), l.assignee].filter(Boolean).join(" · ")}</span>
                      <span className="block truncate text-[14px] font-semibold text-slate-900">{l.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[13px] text-slate-500">Planlı arama yok. Talep ayrıntısındaki Takip bölümünden eklenir.</p>
            )}
          </div>

          {team.length ? (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Ekip bugün</h2>
                <Link href="/admin/leads" className="inline-flex items-center gap-1 text-[13px] font-medium text-slate-700 hover:text-[#0d6570]">
                  Talepler <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
              <ul className="space-y-3">
                {team.map((m, i) => (
                  <li key={m.name}>
                    <Link href={`/admin/leads?sorumlu=${encodeURIComponent(m.name)}`} className="flex items-center gap-3 rounded-2xl p-1.5 hover:bg-slate-50">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${["bg-[#e3f1f2] text-[#0d6570]", "bg-amber-100 text-amber-800", "bg-rose-100 text-rose-700", "bg-slate-100 text-slate-700"][i % 4]}`}>
                        {initials(m.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] font-semibold text-slate-900">{m.name}</span>
                        <span className="block text-[13px] text-slate-500">
                          {m.open} açık talep{m.due ? ` · bugün ${m.due} arama` : ""}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </div>
      <p className="mt-10 text-xs text-slate-400">
        Mesaj bilgileri her 10 dakikada bir Meta&apos;dan güncellenir.
        {msgState?.lastRunAt ? ` Son kontrol ${new Date(msgState.lastRunAt).toLocaleTimeString("tr-TR", { timeZone: "Asia/Famagusta", hour: "2-digit", minute: "2-digit" })}.` : ""}
      </p>
    </div>
  );
}
