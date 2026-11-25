// app/(default)/admin/icerik/ItemForm.tsx
"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CONTENT_LOCALES, LOCALE_LABELS, type ContentLocale } from "@/lib/content/core";
import type { ItemFieldDef } from "@/lib/content/admin";
import ImageField from "./ImageField";
import { saveItem, type ItemFormState } from "./actions";

const INPUT =
  "mt-1.5 block h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20";
const LABEL = "block text-[13px] font-medium text-slate-700";

function Input({ f, name, value, required }: { f: ItemFieldDef; name: string; value: string; required?: boolean }) {
  const id = `f-${name}`;
  if (f.kind === "html")
    return (
      <textarea id={id} name={name} defaultValue={value} rows={16} required={required} spellCheck className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-mono text-[13px] leading-relaxed text-slate-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20" />
    );
  if (f.kind === "long")
    return (
      <textarea id={id} name={name} defaultValue={value} rows={4} required={required} className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20" />
    );
  if (f.kind === "select")
    return (
      <span className="relative mt-1.5 block">
        <select id={id} name={name} defaultValue={value} className="block h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-600">
          <option value="">Seçilmedi</option>
          {f.options?.map((o) => (
            <option key={o} value={o}>
              {o === "teal" ? "Turkuaz" : o === "orange" ? "Turuncu" : o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
      </span>
    );
  return (
    <input
      id={id}
      name={name}
      defaultValue={value}
      required={required}
      type={f.kind === "url" ? "url" : f.kind === "date" ? "date" : "text"}
      inputMode={f.kind === "link" ? "url" : undefined}
      placeholder={f.hint && f.kind !== "tags" && f.kind !== "link" ? f.hint : undefined}
      className={INPUT}
    />
  );
}

export default function ItemForm({
  collection,
  itemKey,
  shared,
  perLocale,
  initial,
  published,
  uploadEnabled,
  cancelHref,
}: {
  collection: string;
  itemKey: string;
  shared: ItemFieldDef[];
  perLocale: ItemFieldDef[];
  initial: Record<string, string>;
  published: boolean;
  uploadEnabled: boolean;
  cancelHref: string;
}) {
  const [state, action, pending] = useActionState<ItemFormState, FormData>(saveItem, undefined);
  const [lang, setLang] = useState<ContentLocale>("tr");
  const v = { ...initial, ...(state?.values ?? {}) };
  return (
    <form key={state?.at ?? 0} action={action} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <input type="hidden" name="collection" value={collection} />
      <input type="hidden" name="key" value={itemKey} />
      {state?.error ? (
        <p role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {shared.map((f) => (
          <div key={f.key} className={f.kind === "image" || f.kind === "url" || f.kind === "link" ? "sm:col-span-2" : ""}>
            <label htmlFor={`f-${f.key}`} className={LABEL}>
              {f.label} {f.required ? <span className="text-red-500">*</span> : null}
            </label>
            {f.kind === "image" ? <ImageField id={`f-${f.key}`} name={f.key} defaultValue={v[f.key] ?? ""} uploadEnabled={uploadEnabled} /> : <Input f={f} name={f.key} value={v[f.key] ?? ""} required={f.required} />}
            {f.hint && (f.kind === "image" || f.kind === "link") ? <p className="mt-1 text-xs text-slate-500">{f.hint}</p> : null}
          </div>
        ))}
      </div>

      <div className="mt-7 border-t border-slate-100 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Dillere göre metinler</p>
        <div className="mt-3 flex flex-wrap gap-1 text-sm" role="tablist" aria-label="Dil">
          {CONTENT_LOCALES.map((l) => {
            const missing = perLocale.some((f) => f.required && !(v[`${l}.${f.key}`] ?? "").trim());
            return (
              <button
                key={l}
                type="button"
                role="tab"
                aria-selected={lang === l}
                onClick={() => setLang(l)}
                className={`rounded-lg px-3 py-1.5 font-medium ${lang === l ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                {LOCALE_LABELS[l]}
                {missing && l !== "tr" ? <span className="ml-1.5 text-amber-500" title="Çeviri boş: sitede İngilizce/Türkçe görünür">•</span> : null}
              </button>
            );
          })}
        </div>
        {CONTENT_LOCALES.map((l) => (
          <div key={l} className={`mt-4 grid gap-5 ${lang === l ? "" : "hidden"}`}>
            {perLocale.map((f) => (
              <div key={f.key}>
                <label htmlFor={`f-${l}.${f.key}`} className={LABEL}>
                  {f.label} {f.required && l === "tr" ? <span className="text-red-500">*</span> : null}
                </label>
                <Input f={f} name={`${l}.${f.key}`} value={v[`${l}.${f.key}`] ?? ""} />
                {f.hint && f.kind !== "image" ? <p className="mt-1 text-xs text-slate-500">{f.hint}</p> : null}
              </div>
            ))}
            {l !== "tr" ? <p className="text-xs text-slate-500">Boş bırakılan alan sitede İngilizce (o da yoksa Türkçe) metinle görünür.</p> : null}
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="published" defaultChecked={state?.values ? state.values.published === "on" : published} className="h-4 w-4 rounded border-slate-300 accent-[#0d6570]" />
          Sitede yayında
        </label>
        <span className="flex gap-2">
          <Link href={cancelHref} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
            Vazgeç
          </Link>
          <button type="submit" disabled={pending} className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60">
            {pending ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </span>
      </div>
    </form>
  );
}
