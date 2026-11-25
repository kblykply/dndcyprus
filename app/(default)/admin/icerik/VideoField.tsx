// app/(default)/admin/icerik/VideoField.tsx
"use client";

import { useState } from "react";
import { ExternalLink, Play, X } from "lucide-react";
import { youtubeIdOf } from "@/lib/content/core";

/**
 * Video alanı: YouTube kimliği ya da bağlantısı (watch / embed / youtu.be yapıştırılabilir) veya site içi video dosyası (.mp4).
 * Yanında önizleme: YouTube küçük resmi (tıklayınca panelde oynar) ya da video oynatıcı. Değer formdaki `name` ile gider;
 * kayıtta alanın biçimine çevrilir (kimlik alanına kimlik, gömme bağlantısına gömme bağlantısı).
 */
export default function VideoField({ id, name, defaultValue }: { id: string; name: string; defaultValue: string }) {
  const [value, setValue] = useState(defaultValue);
  const [playing, setPlaying] = useState(false);
  const yt = youtubeIdOf(value);
  const file = !yt && /\.(mp4|webm|mov)(\?.*)?$/i.test(value.trim()) ? value.trim() : null;
  return (
    <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-900 sm:w-64">
        {yt ? (
          playing ? (
            <>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
                title="Video önizleme"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
              <button type="button" onClick={() => setPlaying(false)} className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white hover:bg-black/80" aria-label="Önizlemeyi kapat">
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label="Videoyu panelde oynat">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${yt}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition group-hover:scale-105">
                  <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden />
                </span>
              </span>
            </button>
          )
        ) : file ? (
          <video src={file} controls preload="metadata" muted playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-[11px] text-slate-400">
            {value.trim() ? "Video tanınmadı" : "Video yok"}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <input
          id={id}
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
            setPlaying(false);
          }}
          placeholder="YouTube bağlantısı ya da kimliği, veya /videos/…mp4"
          className="block h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
        />
        <p className="mt-1.5 text-[11px] text-slate-400">YouTube’daki videonun bağlantısını olduğu gibi yapıştırabilirsiniz; önizleme hemen değişir.</p>
        {yt ? (
          <a href={`https://www.youtube.com/watch?v=${yt}`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-teal-700 hover:underline">
            YouTube’da aç <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        ) : null}
      </div>
    </div>
  );
}
