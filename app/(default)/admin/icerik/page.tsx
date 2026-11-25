// app/(default)/admin/icerik/page.tsx — İçerik yönetimi özeti: düzenlenebilir sayfalar, listeler, son değişiklikler
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ChevronRight, FileText, Newspaper, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { SCOPES } from "@/lib/content/scopes";
import { COLLECTIONS, listItems } from "@/lib/content/admin";
import { cyprusDateTime } from "@/lib/lead-status";

export const dynamic = "force-dynamic";

const SOON = ["Proje sayfaları (Lagoon Verde, NeoCity, La Joya, Perla, Perla II)", "Hakkımızda", "Ödeme planları", "DND'den haberler ve etkinlikler", "İletişim ve alt bilgi"];

export default async function ContentHome() {
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect("/admin/login?next=/admin/icerik");
  const [overrides, press, team, logs] = await Promise.all([
    prisma.contentOverride.groupBy({ by: ["scope"], _count: { _all: true }, _max: { updatedAt: true } }),
    listItems("basin"),
    listItems("ekip"),
    prisma.contentLog.findMany({ orderBy: { createdAt: "desc" }, take: 12 }),
  ]);
  const ov = new Map(overrides.map((o) => [o.scope, o]));

  const card = "group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow";
  return (
    <div className="mx-auto max-w-[1200px]">
      <h1 className="text-[28px] leading-tight text-black sm:text-[32px]">İçerik</h1>
      <p className="mt-1.5 text-sm text-slate-500">Sitedeki yazıları, görselleri ve listeleri 5 dilde buradan değiştirin. Kaydedince sayfa birkaç saniye içinde güncellenir.</p>

      <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Sayfa metinleri</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {Object.entries(SCOPES).map(([key, s]) => {
          const o = ov.get(key);
          return (
            <Link key={key} href={`/admin/icerik/sayfa/${key}`} className={card}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eef5f6] text-[#0d6570]">
                <FileText className="h-5 w-5" strokeWidth={1.8} aria-hidden />
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

      <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Listeler</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {(
          [
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
                {l.items.length} {COLLECTIONS[key].singular} · ekle, düzenle, sil, sırala
              </span>
            </span>
            <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-teal-600" aria-hidden />
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
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
        <section className="rounded-xl border border-dashed border-slate-300 bg-white p-5">
          <h2 className="text-lg text-slate-900">Sırada</h2>
          <p className="mt-1 text-xs text-slate-500">Bu bölümler de aynı yöntemle panele eklenecek.</p>
          <ul className="mt-3 space-y-2 text-[13px] text-slate-600">
            {SOON.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                {s}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
