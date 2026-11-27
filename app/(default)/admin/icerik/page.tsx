// app/(default)/admin/icerik/page.tsx — İçerik yönetimi özeti: düzenlenebilir sayfalar, listeler, son değişiklikler
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  CalendarDays, ChevronRight, Crown, FileText, Gem, House, IdCard, Landmark, LayoutGrid, Megaphone, Newspaper, PenLine, Phone, Shell, Sparkles,
  TreePalm, Trees, Users, Wallet, Waves, type LucideIcon,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { SCOPES } from "@/lib/content/scopes";
import { COLLECTIONS, listItems } from "@/lib/content/admin";
import { cyprusDateTime } from "@/lib/lead-status";
import { translationConfigured } from "@/lib/content/translate";
import TranslateTester from "./TranslateTester";
import TranslateQueue from "./TranslateQueue";
import { translationQueueSummary } from "@/lib/content/translate-jobs";

export const dynamic = "force-dynamic";

/** Her sayfa ve proje kendi ikonuyla (aynı ikon iki kartta kullanılmaz) */
const SCOPE_ICONS: Record<string, LucideIcon> = {
  anasayfa: House,
  hakkimizda: Landmark,
  ayricalik: Crown,
  odeme: Wallet,
  haberler: Megaphone,
  projelerSayfasi: LayoutGrid,
  ekipSayfasi: IdCard,
  iletisim: Phone,
  mariachi: TreePalm,
  "proje-neocity": Trees,
  "proje-lagoon-verde": Waves,
  "proje-la-joya": Gem,
  "proje-perla": Shell,
  "proje-perla-ii": Sparkles,
};


export default async function ContentHome() {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/icerik");
  const queue = await translationQueueSummary();
  const queueDetail = [
    "Google'ın ücretsiz çeviri servisi yoğun olduğu için bekliyor; 10 dakikada bir kendiliğinden deneniyor.",
    queue.lastRunAt ? `Son deneme ${cyprusDateTime(new Date(queue.lastRunAt)).time}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
  const [overrides, press, team, events, posts, logs] = await Promise.all([
    prisma.contentOverride.groupBy({ by: ["scope"], _count: { _all: true }, _max: { updatedAt: true } }),
    listItems("basin"),
    listItems("ekip"),
    listItems("etkinlik"),
    listItems("haber"),
    prisma.contentLog.findMany({ orderBy: { createdAt: "desc" }, take: 12 }),
  ]);
  const ov = new Map(overrides.map((o) => [o.scope, o]));

  const card = "group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-teal-300";
  return (
    <div className="mx-auto max-w-[1200px]">
      <h1 className="text-[30px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[36px]">İçerik</h1>
      <p className="mt-1.5 text-sm text-slate-500">Sitedeki yazıları, görselleri ve listeleri 5 dilde buradan değiştirin. Kaydedince sayfa birkaç saniye içinde güncellenir.</p>
      <TranslateQueue count={queue.count} detail={queueDetail} />

      {(
        [
          ["sayfa", "Sayfa metinleri", "bg-[#eef5f6] text-[#0d6570]"],
          ["proje", "Proje sayfaları", "bg-[#fbefe9] text-[#cd4824]"],
        ] as const
      ).map(([group, title, tint]) => (
        <section key={group}>
          <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{title}</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(SCOPES)
              .filter(([, s]) => s.group === group)
              .map(([key, s]) => {
                const o = ov.get(key);
                const Icon = SCOPE_ICONS[key] ?? FileText;
                return (
                  <Link key={key} href={`/admin/icerik/sayfa/${key}`} className={card}>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tint}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-slate-900">{s.label}</span>
                      <span className="block text-xs text-slate-500">
                        {s.sections.length} bölüm · {o ? `${o._count._all} alan değiştirildi` : "henüz değişiklik yok"}
                      </span>
                    </span>
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-teal-600" aria-hidden />
                  </Link>
                );
              })}
          </div>
        </section>
      ))}

      <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Listeler</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {(
          [
            ["haber", PenLine, posts],
            ["etkinlik", CalendarDays, events],
            ["basin", Newspaper, press],
            ["ekip", Users, team],
          ] as const
        ).map(([key, Icon, l]) => (
          <Link key={key} href={`/admin/icerik/liste/${key}`} className={card}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eef5f6] text-[#0d6570]">
              <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-slate-900">{COLLECTIONS[key].label}</span>
              <span className="block text-xs text-slate-500">
                {l.items.length} {COLLECTIONS[key].singular} · ekle, düzenle, sil{key === "ekip" || key === "etkinlik" ? ", sırala" : ""}
              </span>
            </span>
            <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-teal-600" aria-hidden />
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <TranslateTester enabled={translationConfigured()} />
      </div>

      <div className="mt-5">
        <section className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg text-slate-900">Son değişiklikler</h2>
          {logs.length ? (
            <ul className="mt-3 divide-y divide-slate-100 text-[13px]">
              {logs.map((g) => (
                <li key={g.id} className="py-2.5">
                  <span className="font-medium text-slate-800">{g.area}</span> <span className="text-slate-500">· {g.action}</span>
                  <span className="block truncate text-slate-600" title={g.detail}>
                    {g.detail}
                  </span>
                  <span className="text-xs text-slate-400">
                    {g.author || "Yönetici"} · {cyprusDateTime(g.createdAt).date} {cyprusDateTime(g.createdAt).time}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">Henüz değişiklik yapılmadı.</p>
          )}
        </section>
      </div>
    </div>
  );
}
