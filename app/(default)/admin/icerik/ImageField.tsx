// app/(default)/admin/icerik/ImageField.tsx
"use client";

import { useRef, useState } from "react";
import { ImageUp, Loader2, Maximize2, X } from "lucide-react";
import { uploadImage } from "./actions";

/** Görsel alanı: önizleme + yol/bağlantı kutusu + (depo bağlıysa) bilgisayardan yükleme. Değer formdaki `name` ile gider. */
export default function ImageField({ name, defaultValue, uploadEnabled, id }: { name: string; defaultValue: string; uploadEnabled: boolean; id: string }) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [zoom, setZoom] = useState(false);
  const [broken, setBroken] = useState(false);
  // beyaz logolar beyaz zeminde görünmez: logo ve SVG koyu zeminde, sığdırılarak gösterilir
  const isLogo = /logo|\.svg(\?|$)/i.test(value);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const r = await uploadImage(fd);
      if (r.ok) {
        setValue(r.url);
        setBroken(false);
      }
      else setError(r.error);
    } catch {
      setError("Yükleme başarısız. Tekrar deneyin.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => value && !broken && setZoom(true)}
        className={`group relative flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 sm:w-56 ${isLogo ? "bg-slate-700" : "bg-slate-50"}`}
        aria-label="Görseli büyüt"
        title={value ? "Büyütmek için tıklayın" : undefined}
      >
        {value && !broken ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" onError={() => setBroken(true)} onLoad={() => setBroken(false)} className={`h-full w-full ${isLogo ? "object-contain p-3" : "object-cover"}`} />
            <span className="absolute right-1.5 top-1.5 rounded-md bg-black/50 p-1 text-white opacity-0 transition group-hover:opacity-100">
              <Maximize2 className="h-3.5 w-3.5" aria-hidden />
            </span>
          </>
        ) : (
          <span className="px-2 text-center text-[11px] text-slate-400">{value ? "Görsel açılamadı: yolu kontrol edin" : "Görsel yok"}</span>
        )}
      </button>
      {zoom ? (
        <div role="dialog" aria-modal="true" aria-label="Görsel önizleme" className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4" onClick={() => setZoom(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className={`max-h-[88vh] max-w-[92vw] rounded-lg shadow-2xl ${isLogo ? "bg-slate-700 p-6" : ""}`} />
          <button type="button" onClick={() => setZoom(false)} className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white hover:bg-white/25" aria-label="Kapat">
            <X className="h-5 w-5" aria-hidden />
          </button>
          <span className="absolute bottom-4 left-1/2 max-w-[90vw] -translate-x-1/2 truncate rounded bg-black/60 px-2 py-1 text-xs text-white/80">{value}</span>
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <input
          id={id}
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
            setBroken(false);
          }}
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
