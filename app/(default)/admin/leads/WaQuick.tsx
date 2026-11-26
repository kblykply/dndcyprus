// app/(default)/admin/leads/WaQuick.tsx — hazır WhatsApp mesajları: tıklayınca WhatsApp mesaj yazılmış açılır (gönderen kişi)
"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { waLink, waTemplates, type WaLang } from "@/lib/wa-templates";

export default function WaQuick({ number, name, project, lang: initial }: { number: string; name: string; project: string | null; lang: WaLang }) {
  const [lang, setLang] = useState<WaLang>(initial);
  const list = waTemplates({ name, project }, lang);
  return (
    <details className="mx-5 mb-4 rounded-lg border border-slate-200 text-[13px]">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2.5 font-medium text-slate-700 hover:bg-slate-50">
        <MessageCircle className="h-4 w-4 text-[#1f9d55]" strokeWidth={1.8} aria-hidden />
        Hazır WhatsApp mesajı
      </summary>
      <div className="border-t border-slate-100 px-3 pb-3 pt-2.5">
        <p className="mb-2 text-xs text-slate-500">Mesaja dokunun: WhatsApp yazılmış olarak açılır, kontrol edip siz gönderirsiniz.</p>
        <div className="mb-2 inline-flex rounded-md bg-slate-100 p-0.5 text-xs" role="group" aria-label="Mesaj dili">
          {(["tr", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`rounded px-2.5 py-1 font-medium ${lang === l ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              {l === "tr" ? "Türkçe" : "English"}
            </button>
          ))}
        </div>
        <ul className="space-y-1.5">
          {list.map((t) => (
            <li key={t.key}>
              <a
                href={waLink(number, t.text)}
                target="_blank"
                rel="noreferrer"
                title={t.text}
                className="block rounded-md border border-slate-100 px-2.5 py-2 hover:border-[#1f9d55]/40 hover:bg-[#1f9d55]/5"
              >
                <span className="block text-xs font-semibold text-slate-800">{t.label}</span>
                <span className="mt-0.5 line-clamp-2 block text-xs text-slate-500">{t.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
