// app/(default)/admin/icerik/ImageField.tsx
"use client";

import { useRef, useState } from "react";
import { ImageUp, Loader2 } from "lucide-react";
import { uploadImage } from "./actions";

/** Görsel alanı: önizleme + yol/bağlantı kutusu + (depo bağlıysa) bilgisayardan yükleme. Değer formdaki `name` ile gider. */
export default function ImageField({ name, defaultValue, uploadEnabled, id }: { name: string; defaultValue: string; uploadEnabled: boolean; id: string }) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const r = await uploadImage(fd);
      if (r.ok) setValue(r.url);
      else setError(r.error);
    } catch {
      setError("Yükleme başarısız. Tekrar deneyin.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="mt-1.5 flex gap-3">
      <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-[11px] text-slate-400">Görsel yok</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <input
          id={id}
          name={name}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="/azure/gorsel.jpg ya da https://…"
          className="block h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {uploadEnabled ? (
            <>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={busy}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <ImageUp className="h-3.5 w-3.5" aria-hidden />}
                {busy ? "Yükleniyor…" : "Bilgisayardan yükle"}
              </button>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="hidden" onChange={(e) => onFile(e.currentTarget.files?.[0])} />
            </>
          ) : (
            <span className="text-[11px] text-slate-400">Yükleme için görsel deposu bağlanmalı; şimdilik sitedeki bir görselin yolunu yazabilirsiniz.</span>
          )}
          {error ? <span className="text-xs text-red-600">{error}</span> : null}
        </div>
      </div>
    </div>
  );
}
