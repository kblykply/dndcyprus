// app/(default)/admin/icerik/sayfa/[scope]/page.tsx — sayfa metni düzenleyici: dil sekmeleri, bölümler, alanlar, orijinale dön
import { blobUploadConfigured } from "@/lib/content/blob";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, Copy, ExternalLink, Languages, Plus, RotateCcw, Trash2 } from "lucide-react";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { CONTENT_LOCALES, LOCALE_LABELS, editorPlan, fieldLabel, type ContentLocale } from "@/lib/content/core";
import { SCOPES, isScopeKey } from "@/lib/content/scopes";
import { overrideCounts, sectionState } from "@/lib/content/admin";
import { translationConfigured } from "@/lib/content/translate";
import { ConfirmButton } from "../../../leads/LeadControls";
import ImageField from "../../ImageField";
import VideoField from "../../VideoField";
import { listAction, resetField, resetList, saveSection } from "../../actions";

export const dynamic = "force-dynamic";

const INPUT =
  "mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20";

export default async function ScopeEditor({ params, searchParams }: { params: Promise<{ scope: string }>; searchParams: Promise<{ dil?: string; bolum?: string; kaydedildi?: string; geri?: string; ceviri?: string; cevirihata?: string; cevirisira?: string; liste?: string; listehata?: string; atlanan?: string }> }) {
  const { scope } = await params;
  const sp = await searchParams;
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect(`/admin/login?next=/admin/icerik/sayfa/${scope}`);
  if (!isScopeKey(scope)) notFound();
  const def = SCOPES[scope];
  const locale: ContentLocale = (CONTENT_LOCALES as readonly string[]).includes(sp.dil ?? "") ? (sp.dil as ContentLocale) : "tr";
  const section = def.sections.some(([k]) => k === sp.bolum) ? (sp.bolum as string) : def.sections[0][0];
  const sectionLabel = def.sections.find(([k]) => k === section)![1];
  const [state, counts] = await Promise.all([sectionState(scope, locale, section), overrideCounts(scope, locale)]);
  const { fields, lists } = state;
  const byPath = new Map(fields.map((f) => [f.path, f]));
  const listInfo = new Map(lists.map((l) => [l.path, l]));
  const plan = editorPlan(fields.map((f) => f.path), lists);
  const autoOn = translationConfigured();
  const isShared = "shared" in def && !!(def.shared as string[] | undefined)?.includes(section);
  const uploadEnabled = blobUploadConfigured();
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
          <h1 className="text-[30px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[36px]">{def.label}</h1>
          <p className="mt-1.5 text-sm text-slate-500">Alanı değiştirip kaydedin; yazılar yalnız seçili dilde, görseller tüm dillerde güncellenir. Kalın yazı için **iki yıldız** kullanın.</p>
        </div>
        <a href={def.routes(locale)[0]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
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
            className={`shrink-0 rounded-full px-4 py-2 font-medium ${l === locale ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
          >
            {LOCALE_LABELS[l]}
          </Link>
        ))}
      </div>

      {sp.liste ? (
        <p className={`mt-4 rounded-lg border px-3 py-2 text-sm ${sp.listehata ? "border-amber-200 bg-amber-50 text-amber-800" : "border-teal-200 bg-teal-50 text-teal-800"}`}>
          {sp.listehata
            ? "Liste değiştirilemedi (son madde silinemez ya da sıra sınırda)."
            : `${{ add: "Madde eklendi (bir öncekinin kopyası; metnini değiştirip kaydedin)", delete: "Madde silindi", up: "Madde yukarı taşındı", down: "Madde aşağı taşındı" }[sp.liste] ?? "Liste güncellendi"}; tüm dillerde aynı yerde uygulandı.`}
          {sp.atlanan ? ` ${sp.atlanan} dilinde liste farklı olduğu için uygulanmadı.` : ""}
        </p>
      ) : saved !== null ? (
        <p className="mt-4 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-800">
          {saved ? `${saved} alan kaydedildi; sitedeki sayfa yenilendi.` : "Değişiklik yoktu, bir şey kaydedilmedi."}
          {sp.ceviri ? ` ${sp.ceviri} alan İngilizce, Almanca, Rusça ve Lehçeye otomatik çevrildi.` : ""}
        </p>
      ) : sp.geri ? (
        <p className="mt-4 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-800">Orijinale döndü.</p>
      ) : null}
      {sp.cevirisira ? <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">Türkçe kaydedildi. Çeviri servisi şu an yoğun; İngilizce, Almanca, Rusça ve Lehçe birkaç dakika içinde kendiliğinden çevrilecek (yeniden kaydetmenize gerek yok).</p> : null}
      {sp.cevirihata ? <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">Türkçe kaydedildi ama çeviri yapılamadı: {sp.cevirihata}</p> : null}

      <div className="mt-5 grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav aria-label="Bölümler" className="self-start rounded-2xl border border-slate-200 bg-white p-2 lg:sticky lg:top-6">
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

        <form action={saveSection} className="min-w-0 rounded-3xl border border-slate-200 bg-white">
          <input type="hidden" name="scope" value={scope} />
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="section" value={section} />
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-xl text-slate-900">{sectionLabel}</h2>
            {isShared ? (
              <p className="mt-1 rounded-md bg-teal-50 px-2 py-1 text-xs text-teal-800">Bu bölüm tüm dillerde ortaktır: kaydedince 5 dilde birden değişir.</p>
            ) : null}
            <p className="mt-0.5 text-xs text-slate-500">
              {LOCALE_LABELS[locale]} · {fields.length} alan{counts[section] ? ` · ${counts[section]} kayıt değiştirilmiş` : ""}
            </p>
            {!isShared && locale === "tr" ? (
              <p className="mt-2 flex items-start gap-1.5 rounded-md bg-slate-50 px-2 py-1.5 text-xs text-slate-600">
                <Languages className="mt-px h-3.5 w-3.5 shrink-0 text-teal-700" aria-hidden />
                {autoOn
                  ? "Türkçe yazmanız yeterli: kaydedince değişen yazılar İngilizce, Almanca, Rusça ve Lehçeye otomatik çevrilir. Çeviriyi o dilin sekmesinde düzeltebilirsiniz."
                  : "Otomatik çeviri kapalı (çeviri anahtarı tanımlı değil): diğer dilleri kendi sekmelerinden girin."}
              </p>
            ) : null}
          </div>
          <div className="divide-y divide-slate-100">
            {plan.map((e) => {
              if (e.t === "item") {
                const rel = `${e.list}.${e.index}`.slice(section.length + 1);
                const btn = "inline-flex h-7 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40";
                return (
                  <div key={`i-${e.list}.${e.index}`} id={`m-${e.list}.${e.index}`} className="flex flex-wrap items-center justify-between gap-2 bg-slate-50/80 px-5 py-2" style={{ paddingLeft: 20 + e.depth * 18 }}>
                    <span className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">{fieldLabel(rel, section)}</span>
                    <span className="flex flex-wrap items-center gap-1">
                      <button type="submit" formAction={listAction.bind(null, "up", e.list, e.index)} formNoValidate disabled={e.index === 0} className={btn} title="Yukarı taşı" aria-label="Yukarı taşı">
                        <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                      </button>
                      <button type="submit" formAction={listAction.bind(null, "down", e.list, e.index)} formNoValidate disabled={e.index === e.count - 1} className={btn} title="Aşağı taşı" aria-label="Aşağı taşı">
                        <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                      </button>
                      <button type="submit" formAction={listAction.bind(null, "add", e.list, e.index)} formNoValidate className={btn} title="Bu maddenin kopyasını hemen altına ekle">
                        <Copy className="h-3.5 w-3.5" aria-hidden /> Kopyala
                      </button>
                      {e.count <= 1 ? (
                        // listenin son maddesi silinmez (eylemsiz düğme: devre dışı istemci düğmesine eylem bağlanmaz)
                        <button type="button" disabled className={btn} title="Listenin son maddesi silinemez" aria-label="Maddeyi sil">
                          <Trash2 className="h-3.5 w-3.5" aria-hidden /> Sil
                        </button>
                      ) : (
                        <ConfirmButton
                          message={`${fieldLabel(rel, section)} tüm dillerden silinsin mi?`}
                          formAction={listAction.bind(null, "delete", e.list, e.index)}
                          formNoValidate
                          className={`${btn} hover:text-red-600`}
                          title="Maddeyi sil (tüm dillerde)"
                          aria-label="Maddeyi sil"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden /> Sil
                        </ConfirmButton>
                      )}
                    </span>
                  </div>
                );
              }
              if (e.t === "end") {
                const info = listInfo.get(e.list);
                const name = fieldLabel(`${e.list}.0`.slice(section.length + 1), section).replace(/ 1$/, "");
                return (
                  <div key={`e-${e.list}`} className="flex flex-wrap items-center gap-2 px-5 py-2.5" style={{ paddingLeft: 20 + e.depth * 18 }}>
                    <button
                      type="submit"
                      formAction={listAction.bind(null, "add", e.list, e.count - 1)}
                      formNoValidate
                      className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-teal-300 bg-white px-2.5 py-1.5 text-xs font-medium text-teal-700 hover:bg-teal-50"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden /> {name} ekle
                    </button>
                    {info?.overridden ? (
                      <ConfirmButton
                        message="Bu listenin maddeleri koddaki haline dönsün mü? (Tüm dillerde; listedeki yazı değişiklikleri de kalkar.)"
                        formAction={resetList.bind(null, e.list)}
                        formNoValidate
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <RotateCcw className="h-3 w-3" aria-hidden /> Listeyi orijinaline döndür
                      </ConfirmButton>
                    ) : null}
                  </div>
                );
              }
              const f = byPath.get(e.path)!;
              const id = `f-${f.path}`;
              const name = `f:${f.path}`;
              const rel = f.path.slice(section.length + 1);
              const depth = (e.path.match(/\.\d+(\.|$)/g) || []).length;
              return (
                <div key={f.path} className={`px-5 py-4 ${f.overridden ? (f.auto && locale !== "tr" ? "bg-teal-50/40" : "bg-amber-50/40") : ""}`} style={depth ? { paddingLeft: 20 + Math.min(depth, 3) * 18 } : undefined}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label htmlFor={id} className="text-[13px] font-medium text-slate-700">
                      {fieldLabel(rel, section)}
                    </label>
                    {f.overridden ? (
                      <span className="flex items-center gap-2">
                        {f.auto && locale !== "tr" ? (
                          <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-medium text-teal-800">Otomatik çeviri</span>
                        ) : (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">Değiştirildi</span>
                        )}
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
                  ) : f.kind === "video" ? (
                    <VideoField id={id} name={name} defaultValue={f.value} />
                  ) : f.kind === "long" || f.kind === "rich" ? (
                    <textarea id={id} name={name} defaultValue={f.value} rows={f.kind === "rich" ? 2 : 4} className={`${INPUT} py-2.5`} />
                  ) : (
                    <input id={id} name={name} defaultValue={f.value} type={f.kind === "number" ? "number" : "text"} step={f.kind === "number" ? "any" : undefined} className={`${INPUT} h-10`} />
                  )}
                  {f.kind === "rich" ? <p className="mt-1 text-[11px] text-slate-400">**kalın** · yeni satır için Enter</p> : null}
                  {f.kind === "image" ? <p className="mt-1 text-[11px] text-slate-400">Görsel tüm dillerde ortak: aynı görseli gösteren diğer dillerde de değişir.</p> : null}
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
            <button type="submit" className="rounded-full bg-[#0d6570] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0a5159]">
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
