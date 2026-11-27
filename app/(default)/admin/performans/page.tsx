// app/(default)/admin/performans/page.tsx
// Performans (27.11.2026): Messenger / Instagram mesajlarına yanıt verenlerin 100 üzerinden puanı, dökümü ve haftalık eğilimi;
// ekip toplamı ve kişi başına (Talha, Muhammed). Meta cevabı yazan kişiyi bildirmez: sohbetler varsayılan olarak Talha'ya
// sayılır, başkasının cevapladıkları Satış Talepleri'nden işaretlenir. Yalnız yönetici. Hesap lib/responder-score.ts.
import Link from "next/link";
import { CircleSlash, Clock3, Gauge, Moon, Timer, TrendingUp } from "lucide-react";
import { requireRole } from "@/lib/admin-auth";
import { loadLiveMsgState } from "@/lib/meta-messages";
import { MSG_RESPONDER, MSG_TEAM } from "@/lib/meta-msg-view";
import { loadResponderMap } from "@/lib/msg-responder";
import { TARGET_MS, WEIGHTS, convsOf, durationText, responderScore, weeklyTrend, type WeekPoint } from "@/lib/responder-score";

export const dynamic = "force-dynamic";

const PERIODS = [
  { key: "7", label: "Son 7 gün" },
  { key: "30", label: "Son 30 gün" },
  { key: "90", label: "Son 90 gün" },
] as const;

const MIN = 60_000;
const dur = (ms: number | null) => (ms === null ? "—" : durationText(ms));
/** Bu kadar az sohbetli hafta grafikte "az veri" sayılır (çizgiye katılmaz) */
const MIN_WEEK = 10;

/** Haftalık grafik: çizgi gündüz medyan ilk yanıt süresi, kesik çizgi hedef; sohbet sayısı alt etikette (kütüphanesiz SVG) */
function WeeklyChart({ weeks }: { weeks: WeekPoint[] }) {
  const W = 900;
  const H = 320;
  const L = 58;
  const R = 24;
  const T = 28;
  const B = 76;
  const plotW = W - L - R;
  const plotH = H - T - B;
  const band = plotW / weeks.length;
  const cx = (i: number) => L + band * i + band / 2;
  const ok = (w: WeekPoint) => w.median !== null && w.count >= MIN_WEEK;
  const mMax = Math.max(TARGET_MS * 1.6, ...weeks.filter(ok).map((w) => w.median as number)) * 1.15;
  const yM = (m: number) => T + plotH - (m / mMax) * plotH;
  const pts = weeks.map((w, i) => (ok(w) ? { x: cx(i), y: yM(w.median as number), w } : null));
  // çizgi: az veri haftalarında kesilir
  const segs: string[] = [];
  let cur: string[] = [];
  for (const p of pts) {
    if (p) cur.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    else if (cur.length) {
      segs.push(cur.join(" "));
      cur = [];
    }
  }
  if (cur.length) segs.push(cur.join(" "));
  const ticks = [0, 0.5, 1].map((f) => f * mMax);
  const label = (d: number) => new Date(d).toLocaleDateString("tr-TR", { timeZone: "Asia/Famagusta", day: "numeric", month: "short" });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[640px]" role="img" aria-label="Haftalık medyan yanıt süresi">
      <defs>
        <linearGradient id="perf-alan" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0d6570" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0d6570" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* ızgara + sol eksen (dakika) */}
      {ticks.map((t) => (
        <g key={`m${t}`}>
          <line x1={L} x2={W - R} y1={yM(t)} y2={yM(t)} stroke="#eef2f6" strokeWidth="1" />
          <text x={L - 10} y={yM(t) + 4} textAnchor="end" fontSize="12" fill="#64748b">
            {Math.round(t / MIN)} dk
          </text>
        </g>
      ))}
      <text x={L - 10} y={T - 10} textAnchor="end" fontSize="11" fill="#64748b">
        süre
      </text>
      {/* hedef */}
      <line x1={L} x2={W - R} y1={yM(TARGET_MS)} y2={yM(TARGET_MS)} stroke="#f47a20" strokeWidth="1.6" strokeDasharray="6 6" />
      <text x={L + 6} y={yM(TARGET_MS) - 8} textAnchor="start" fontSize="12" fontWeight="600" fill="#c2410c">
        Hedef {Math.round(TARGET_MS / MIN)} dk
      </text>
      {/* medyan çizgisi + alan */}
      {segs.map((s) => {
        const first = s.split(" ")[0].split(",")[0];
        const last = s.split(" ").at(-1)!.split(",")[0];
        return (
          <g key={s}>
            {s.includes(" ") ? <polygon points={`${first},${T + plotH} ${s} ${last},${T + plotH}`} fill="url(#perf-alan)" /> : null}
            <polyline points={s} fill="none" stroke="#0d6570" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          </g>
        );
      })}
      {pts.map((p, i) => {
        if (!p) return null;
        // dip noktada (iki yanı daha yukarıda) etiket noktanın altına: çizgiye binmesin; alt sınıra yakınsa sağına
        const near = [pts[i - 1], pts[i + 1]].filter((q): q is NonNullable<typeof q> => !!q);
        const valley = near.length > 0 && near.every((q) => q.y < p.y);
        const below = valley && p.y + 24 <= T + plotH - 2;
        const side = valley && !below;
        return (
          <g key={`p${p.w.from}`}>
            <circle cx={p.x} cy={p.y} r="6" fill="#fff" stroke={(p.w.median as number) <= TARGET_MS ? "#0d6570" : "#c2410c"} strokeWidth="3" />
            <text
              x={side ? p.x + 12 : p.x}
              y={side ? p.y + 5 : below ? p.y + 26 : p.y - 14}
              textAnchor={side ? "start" : "middle"}
              fontSize="13"
              fontWeight="700"
              fill="#0f172a"
              paintOrder="stroke"
              stroke="#ffffff"
              strokeWidth="4"
            >
              {dur(p.w.median)}
            </text>
          </g>
        );
      })}
      {/* alt etiketler */}
      {weeks.map((w, i) => (
        <g key={`x${w.from}`}>
          <text x={cx(i)} y={H - B + 22} textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">
            {label(w.from)}
          </text>
          <text x={cx(i)} y={H - B + 40} textAnchor="middle" fontSize="12" fill="#64748b">
            {w.count} sohbet
          </text>
          <text x={cx(i)} y={H - B + 58} textAnchor="middle" fontSize="12" fontWeight="600" fill={w.count >= MIN_WEEK ? "#0d6570" : "#94a3b8"}>
            {w.count < MIN_WEEK ? "az veri" : w.withinHour === null ? "—" : `%${Math.round(w.withinHour * 100)} ≤ 1 sa`}
          </text>
        </g>
      ))}
    </svg>
  );
}

const TEAM_KEY = "ekip";

export default async function PerformancePage(props: { searchParams?: Promise<{ donem?: string; kisi?: string }> } = {}) {
  await requireRole("admin", "/admin/performans");
  const sp = (await props.searchParams) ?? {};
  const days = Number(PERIODS.find((p) => p.key === sp.donem)?.key ?? "30");
  const now = Date.now();
  const [state, by] = await Promise.all([loadLiveMsgState(), loadResponderMap()]);
  const all = state?.convs ?? {};
  // kişiler: ekip listesi + daha önce işaretlenmiş başka adlar
  const people = [...new Set([...MSG_TEAM, ...Object.values(by)])];
  const person = people.includes(sp.kisi ?? "") ? sp.kisi! : TEAM_KEY;
  const convsFor = (p: string) => (p === TEAM_KEY ? all : convsOf(all, by, p, MSG_RESPONDER));
  const chips = [TEAM_KEY, ...people].map((p) => ({ key: p, label: p === TEAM_KEY ? "Ekip" : p, res: responderScore(convsFor(p), now, days) }));
  const convs = convsFor(person);
  const res = chips.find((c) => c.key === person)!.res;
  const trend = weeklyTrend(convs, now, 8);
  const href = (q: { donem?: string; kisi?: string }) => {
    const u = new URLSearchParams();
    const d = q.donem ?? String(days);
    const k = q.kisi ?? person;
    if (d !== "30") u.set("donem", d);
    if (k !== TEAM_KEY) u.set("kisi", k);
    const t = u.toString();
    return t ? `/admin/performans?${t}` : "/admin/performans";
  };
  const ring = res.grade.tone === "teal" ? "#0d6570" : res.grade.tone === "amber" ? "#d97706" : "#e11d48";
  const C = 2 * Math.PI * 54;

  return (
    <div className="mx-auto max-w-[1300px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[36px]">Performans</h1>
          <p className="mt-1.5 text-sm text-slate-500">
            {person === TEAM_KEY ? "Ekip toplamı" : person} · Messenger ve Instagram mesajlarına yanıt performansı
          </p>
        </div>
        <div className="flex gap-1 text-sm" role="tablist" aria-label="Dönem">
          {PERIODS.map((p) => (
            <Link
              key={p.key}
              href={href({ donem: p.key })}
              role="tab"
              aria-selected={Number(p.key) === days}
              className={`shrink-0 rounded-full px-4 py-2 font-medium ${Number(p.key) === days ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Kişi">
        {chips.map((c) => {
          const on = c.key === person;
          const has = c.res.stats.conversations > 0;
          return (
            <Link
              key={c.key}
              href={href({ kisi: c.key })}
              aria-current={on ? "page" : undefined}
              className={`inline-flex h-11 items-center gap-2.5 rounded-full px-4 text-sm font-medium ${on ? "bg-[#0d6570] text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
            >
              {c.label}
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${on ? "bg-white/20 text-white" : "bg-slate-100 text-slate-800"}`}>{has ? c.res.score : "—"}</span>
              <span className={`text-xs ${on ? "text-white/80" : "text-slate-500"}`}>{c.res.stats.conversations} sohbet</span>
            </Link>
          );
        })}
      </nav>

      {!res.stats.conversations ? (
        <p className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
          {person === TEAM_KEY ? (
            "Bu dönemde mesaj sohbeti yok. Meta mesajları her 10 dakikada bir çekilir."
          ) : (
            <>
              Bu dönemde {person} adına işaretlenmiş sohbet yok. {person} bir mesaja cevap verdiyse{" "}
              <Link href="/admin/leads" className="font-semibold text-[#0d6570] underline underline-offset-2">
                Satış Talepleri
              </Link>
              &apos;nde o talebi açıp sohbet kutusunda <b>İlk cevabı veren: {person}</b> seçin; puanı buraya geçer.
            </>
          )}
        </p>
      ) : (
        <>
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
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
                {res.stats.conversations} sohbet · {res.stats.answered} yanıtlandı · {res.stats.night} mesai dışı
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
              { icon: Timer, label: "Gündüz medyan yanıt", value: dur(res.stats.dayMedian), sub: "08:00–23:00 · yanıtların yarısı bu sürenin altında" },
              { icon: Clock3, label: "1 saat içinde yanıt", value: res.stats.dayWithinHour === null ? "—" : `%${Math.round(res.stats.dayWithinHour * 100)}`, sub: "gündüz gelen sohbetler" },
              { icon: Moon, label: "Mesai dışı gelen", value: String(res.stats.night), sub: "23:00–08:00 arası ilk mesaj" },
              { icon: CircleSlash, label: "Yanıtsız sohbet", value: `${res.stats.neverAnswered} / ${res.stats.conversations}`, sub: "hiç yanıt verilmeyen" },
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
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 id="egilim" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <TrendingUp className="h-5 w-5 text-[#0d6570]" aria-hidden /> Haftalık yanıt performansı
                </h2>
                <p className="mt-1 text-xs text-slate-500">Son 8 hafta · çizginin aşağı inmesi yanıtın hızlandığını gösterir</p>
              </div>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <span className="h-[3px] w-5 rounded bg-[#0d6570]" /> Gündüz medyan yanıt süresi
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-5 border-t-2 border-dashed border-[#f47a20]" /> Hedef {Math.round(TARGET_MS / MIN)} dk
                </li>
              </ul>
            </div>
            <div className="-mx-1 mt-4 overflow-x-auto px-1">
              <WeeklyChart weeks={trend} />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Haftanın altında: gelen sohbet ve gündüz ilk 1 saat içinde yanıtlananların oranı. {MIN_WEEK} sohbetten az olan haftalar &quot;az veri&quot;
              sayılır, çizgiye katılmaz.
            </p>
          </section>
        </>
      )}

      <p className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-4 text-[13px] leading-relaxed text-slate-500">
        Hesaplama: gündüz yanıt hızı {WEIGHTS.hiz} + 1 saat içinde yanıt oranı {WEIGHTS.saat} + mesai dışı mesajlara sabah 10:00&apos;a kadar yanıt{" "}
        {WEIGHTS.gece} + yanıtsız bırakmama {WEIGHTS.cevapsiz} = 100. Medyan, yanıt sürelerinin tam ortasıdır: yanıtların yarısı bu süreden kısa, yarısı
        uzundur (tek tük çok geç yanıtlar ortalamayı bozmasın diye). Sayfanın 20 saniye içinde verdiği otomatik yanıtlar (anında yanıt, mesai dışı
        mesajı) yanıt sayılmaz; son 1 saatte gelen sohbetler henüz puana girmez. Instagram mesajları Meta tarafındaki sorun giderilince hesaba katılır.
        Meta, sayfa adına yazılan cevabın kimden geldiğini bildirmez: sohbetler (cevapsızlar dahil) varsayılan olarak {MSG_RESPONDER}&apos;a sayılır;
        başkası cevapladıysa Satış Talepleri&apos;nde sohbet kutusundaki &quot;İlk cevabı veren&quot; seçimiyle işaretlenir. Ekip, herkesin toplamıdır.
      </p>
    </div>
  );
}
