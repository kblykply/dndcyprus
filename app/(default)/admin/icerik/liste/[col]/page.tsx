// app/(default)/admin/icerik/liste/[col]/page.tsx — liste düzenleyici: kayıtlar, ekle, düzenle, sil, yayına al/kaldır, sırala
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { COLLECTIONS, isCollectionKey, listItems } from "@/lib/content/admin";
import { ConfirmButton } from "../../../leads/LeadControls";
import { deleteItem, moveItemDown, moveItemUp, toggleItem } from "../../actions";

export const dynamic = "force-dynamic";

export default async function CollectionPage({ params, searchParams }: { params: Promise<{ col: string }>; searchParams: Promise<{ kaydedildi?: string; ceviri?: string; cevirihata?: string; cevirisira?: string }> }) {
  const { col } = await params;
  const sp = await searchParams;
  const store = await cookies();
  if (!(await verifyAdminSession(store.get(ADMIN_SESSION_COOKIE)?.value))) redirect(`/admin/login?next=/admin/icerik/liste/${col}`);
  if (!isCollectionKey(col)) notFound();
  const def = COLLECTIONS[col];
  const { seeded, items } = await listItems(col);
  const round = col === "ekip"; // kişi fotoğrafı yuvarlak, diğerleri yatay kapak
  const sortable = col === "ekip" || col === "etkinlik"; // haberler ve yazılar sitede tarihe göre dizilir
  const btn = "inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50";

  return (
    <div className="mx-auto max-w-[1200px]">
      <Link href="/admin/icerik" className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden /> İçerik
      </Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-bold leading-tight tracking-tight text-slate-950 sm:text-[36px]">{def.label}</h1>
          <p className="mt-1.5 text-sm text-slate-500">{def.desc}</p>
        </div>
        <Link href={`/admin/icerik/liste/${col}/yeni`} className="inline-flex items-center gap-2 rounded-full bg-[#0d6570] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[#0a5159]">
          <Plus className="h-4 w-4" aria-hidden /> Yeni {def.singular}
        </Link>
      </div>
      {sp.kaydedildi ? (
        <p className="mt-4 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-800">
          Kaydedildi; sitedeki sayfalar yenilendi.{sp.ceviri ? ` Türkçe ${sp.ceviri} alan İngilizce, Almanca, Rusça ve Lehçeye otomatik çevrildi.` : ""}
        </p>
      ) : null}
      {sp.cevirisira ? <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">Türkçe kaydedildi. Çeviri servisi şu an yoğun; İngilizce, Almanca, Rusça ve Lehçe birkaç dakika içinde kendiliğinden çevrilecek (yeniden kaydetmenize gerek yok).</p> : null}
      {sp.cevirihata ? <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">Kaydedildi ama çeviri yapılamadı: {sp.cevirihata}</p> : null}
      {!seeded ? (
        <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          Liste şu an sitenin kodundaki haliyle gösteriliyor. İlk değişiklikte bütün kayıtlar panele aktarılır, sonra liste buradan yönetilir.
        </p>
      ) : null}

      <ul className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        {items.map((it, i) => {
          const d = it.data as Record<string, unknown>;
          const img = String(d[def.imageKey] ?? "");
          const title = def.title(d);
          const sub = def.sub(d);
          const hidden = !it.published;
          return (
            <li key={it.key} id={`k-${it.key}`} className={`flex items-center gap-3 px-4 py-3 ${hidden ? "bg-slate-50 opacity-70" : ""} ${sp.kaydedildi === it.key ? "bg-teal-50/60" : ""}`}>
              <span className="w-6 shrink-0 text-right text-xs text-slate-400">{i + 1}</span>
              <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 ${round ? "h-12 w-12 rounded-full" : "h-12 w-20"}`}>
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
                ) : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-medium text-slate-900" title={title}>
                  {title}
                </span>
                <span className="block truncate text-xs text-slate-500">
                  {sub}
                  {hidden ? " · yayında değil" : ""}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1">
                {sortable ? (
                  <>
                    <form action={moveItemUp}>
                      <input type="hidden" name="collection" value={col} />
                      <input type="hidden" name="key" value={it.key} />
                      <button type="submit" className={btn} aria-label="Yukarı taşı" title="Yukarı" disabled={i === 0}>
                        <ArrowUp className="h-4 w-4" aria-hidden />
                      </button>
                    </form>
                    <form action={moveItemDown}>
                      <input type="hidden" name="collection" value={col} />
                      <input type="hidden" name="key" value={it.key} />
                      <button type="submit" className={btn} aria-label="Aşağı taşı" title="Aşağı" disabled={i === items.length - 1}>
                        <ArrowDown className="h-4 w-4" aria-hidden />
                      </button>
                    </form>
                  </>
                ) : null}
                <form action={toggleItem}>
                  <input type="hidden" name="collection" value={col} />
                  <input type="hidden" name="key" value={it.key} />
                  <button type="submit" className={btn} aria-label={it.published ? "Yayından kaldır" : "Yayına al"} title={it.published ? "Yayından kaldır" : "Yayına al"}>
                    {it.published ? <Eye className="h-4 w-4" aria-hidden /> : <EyeOff className="h-4 w-4" aria-hidden />}
                  </button>
                </form>
                <Link href={`/admin/icerik/liste/${col}/${encodeURIComponent(it.key)}`} className={btn} aria-label="Düzenle" title="Düzenle">
                  <Pencil className="h-4 w-4" aria-hidden />
                </Link>
                <form action={deleteItem}>
                  <input type="hidden" name="collection" value={col} />
                  <input type="hidden" name="key" value={it.key} />
                  <ConfirmButton message={`“${title}” kalıcı olarak silinsin mi?`} className={`${btn} hover:text-red-600`} aria-label="Sil" title="Sil">
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </ConfirmButton>
                </form>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
