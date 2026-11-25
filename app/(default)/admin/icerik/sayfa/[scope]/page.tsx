// app/(default)/admin/icerik/sayfa/[scope]/page.tsx — sayfa metni düzenleyici: dil sekmeleri, bölümler, alanlar, orijinale dön
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ExternalLink, RotateCcw } from "lucide-react";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { CONTENT_LOCALES, LOCALE_LABELS, fieldLabel, type ContentLocale } from "@/lib/content/core";
import { SCOPES, isScopeKey } from "@/lib/content/scopes";
import { overrideCounts, sectionFields } from "@/lib/content/admin";
import ImageField from "../../ImageField";
import { resetField, saveSection } from "../../actions";

export const dynamic = "force-dynamic";

const INPUT =
  "mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20";

export default async function ScopeEditor({ params, searchParams }: { params: Promise<{ scope: string }>; searchParams: Promise<{ dil?: string; bolum?: string; kaydedildi?: string; geri?: string }> }) {
  const { scope } = await params;
  const sp = await searchParams;
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect(`/admin/login?next=/admin/icerik/sayfa/${scope}`);
  if (!isScopeKey(scope)) notFound();
  const def = SCOPES[scope];
  const locale: ContentLocale = (CONTENT_LOCALES as readonly string[]).includes(sp.dil ?? "") ? (sp.dil as ContentLocale) : "tr";
  const section = def.sections.some(([k]) => k === sp.bolum) ? (sp.bolum as string) : def.sections[0][0];
  const sectionLabel = def.sections.find(([k]) => k === section)![1];
  const [fields, counts] = await Promise.all([sectionFields(scope, locale, section), overrideCounts(scope, locale)]);
  const uploadEnabled = !!(process.env.BLOB_READ_WRITE_TOKEN || "").trim();
  const url = (patch: Record<string, string>) => {
    const q = new URLSearchParams({ dil: locale, bolum: section, ...patch });
    return `/admin/icerik/sayfa/${scope}?${q}`;
  };
  const saved = sp.kaydedildi !== undefined ? Number(sp.kaydedildi) : null;

  return (
    <div className="mx-auto max-w-[1400px]">
      <Link href="/admin/icerik" className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden /> İçerik
      </Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-tight text-black sm:text-[32px]">{def.label}</h1>
          <p className="mt-1.5 text-sm text-slate-500">Alanı değiştirip kaydedin; sitede yalnız seçili dil güncellenir. Kalın yazı için **iki yıldız** kullanın.</p>
        </div>
        <a href={def.routes(locale)[0]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
          Sitede gör <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>

      <div className="mt-6 -mx-1 flex gap-1 overflow-x-auto px-1 pb-1 text-sm" role="tablist" aria-label="Dil">
        {CONTENT_LOCALES.map((l) => (
          <Link
            key={l}
            href={`/admin/icerik/sayfa/${scope}?dil=${l}&bolum=${section}`}
            role="tab"
            aria-selected={l === locale}
            className={`shrink-0 rounded-lg px-3.5 py-2 font-medium ${l === locale ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
          >
            {LOCALE_LABELS[l]}
          </Link>
        ))}
      </div>

      {saved !== null ? (
        <p className="mt-4 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-800">
          {saved ? `${saved} alan kaydedildi; sitedeki sayfa yenilendi.` : "Değişiklik yoktu, bir şey kaydedilmedi."}
        </p>
      ) : sp.geri ? (
        <p className="mt-4 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-800">Alan orijinal metne döndü.</p>
      ) : null}

      <div className="mt-5 grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav aria-label="Bölümler" className="self-start rounded-xl border border-slate-200 bg-white p-2 shadow-sm lg:sticky lg:top-6">
          {def.sections.map(([k, label]) => (
            <Link
              key={k}
              href={`/admin/icerik/sayfa/${scope}?dil=${locale}&bolum=${k}`}
              aria-current={k === section ? "page" : undefined}
              className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[13px] ${k === section ? "bg-slate-900 font-medium text-white" : "text-slate-700 hover:bg-slate-100"}`}
            >
              <span className="truncate">{label}</span>
              {counts[k] ? <span className={`shrink-0 rounded-full px-1.5 text-[11px] ${k === section ? "bg-white/20" : "bg-amber-100 text-amber-800"}`}>{counts[k]}</span> : null}
            </Link>
          ))}
        </nav>

        <form action={saveSection} className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm">
          <input type="hidden" name="scope" value={scope} />
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="section" value={section} />
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-xl text-slate-900">{sectionLabel}</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {LOCALE_LABELS[locale]} · {fields.length} alan{counts[section] ? ` · ${counts[section]} alan değiştirilmiş` : ""}
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {fields.map((f) => {
              const id = `f-${f.path}`;
              const name = `f:${f.path}`;
              const rel = f.path.slice(section.length + 1);
              return (
                <div key={f.path} className={`px-5 py-4 ${f.overridden ? "bg-amber-50/40" : ""}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label htmlFor={id} className="text-[13px] font-medium text-slate-700">
                      {fieldLabel(rel)}
                    </label>
                    {f.overridden ? (
                      <span className="flex items-center gap-2">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">Değiştirildi</span>
                        <button
                          type="submit"
                          formAction={resetField.bind(null, f.path)}
                          formNoValidate
                          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
                        >
                          <RotateCcw className="h-3 w-3" aria-hidden /> Orijinale dön
                        </button>
                      </span>
                    ) : null}
                  </div>
                  {f.kind === "image" ? (
                    <ImageField id={id} name={name} defaultValue={f.value} uploadEnabled={uploadEnabled} />
                  ) : f.kind === "long" || f.kind === "rich" ? (
                    <textarea id={id} name={name} defaultValue={f.value} rows={f.kind === "rich" ? 2 : 4} className={`${INPUT} py-2.5`} />
                  ) : (
                    <input id={id} name={name} defaultValue={f.value} type={f.kind === "number" ? "number" : "text"} step={f.kind === "number" ? "any" : undefined} className={`${INPUT} h-10`} />
                  )}
                  {f.kind === "rich" ? <p className="mt-1 text-[11px] text-slate-400">**kalın** · yeni satır için Enter</p> : null}
                  {f.overridden ? (
                    <p className="mt-1.5 truncate text-[11px] text-slate-400" title={f.original}>
                      Orijinal: {f.original}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="sticky bottom-0 flex items-center justify-between gap-3 rounded-b-xl border-t border-slate-100 bg-white/95 px-5 py-3 backdrop-blur">
            <span className="text-xs text-slate-500">Kaydedince sitedeki {LOCALE_LABELS[locale]} sayfa yenilenir.</span>
            <button type="submit" className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800">
              Kaydet
            </button>
          </div>
        </form>
      </div>
      <p className="mt-4 text-xs text-slate-400">
        <Link href={url({})} className="hover:underline">
          Bu bölümü yenile
        </Link>
      </p>
    </div>
  );
}
