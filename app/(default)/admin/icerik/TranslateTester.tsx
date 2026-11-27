// app/(default)/admin/icerik/TranslateTester.tsx — otomatik çeviriyi kaydetmeden denemek için kutu
"use client";

import { useActionState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { tryTranslation, type TryState } from "./actions";

const NAMES: Record<string, string> = { en: "İngilizce", de: "Almanca", ru: "Rusça", pl: "Lehçe" };

export default function TranslateTester({ enabled }: { enabled: boolean }) {
  const [state, action, pending] = useActionState<TryState, FormData>(tryTranslation, undefined);
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg text-slate-900">
          <Languages className="h-5 w-5 text-teal-700" aria-hidden /> Otomatik çeviri
        </h2>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${enabled ? "bg-teal-100 text-teal-800" : "bg-amber-100 text-amber-800"}`}>
          {enabled ? "Açık · Gemini" : "Kapalı · anahtar gerekli"}
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Türkçe kaydettiğiniz yazılar İngilizce, Almanca, Rusça ve Lehçeye sitenin çeviri kılavuzuyla (doğal reklam dili, proje adları ve terimler sabit) çevrilir. Buradan bir cümle deneyebilirsiniz; hiçbir şey kaydedilmez.
      </p>
      <form action={action} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <textarea
          name="tr"
          rows={2}
          defaultValue={state?.tr ?? ""}
          placeholder="Örnek: Lagoon Verde'de **60 aya kadar** TL taksit, faizsiz ve bankasız."
          className="min-h-[44px] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
        />
        <button type="submit" disabled={pending || !enabled} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0d6570] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a5159] disabled:opacity-50">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {pending ? "Çevriliyor…" : "Çeviriyi dene"}
        </button>
      </form>
      {state?.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      {state?.out ? (
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          {Object.entries(state.out).map(([l, v]) => (
            <div key={l} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{NAMES[l] ?? l}</dt>
              <dd className="mt-0.5 whitespace-pre-line text-sm text-slate-800">{v}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
