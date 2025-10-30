// app/components/blog/ShareBar.tsx
"use client";

import { useEffect, useState, useCallback } from "react";

type Props = { title: string };

export default function ShareBar({ title }: Props) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const open = useCallback((shareUrl: string) => {
    if (!shareUrl) return;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }, []);

  const copy = useCallback(async (btn: HTMLButtonElement | null) => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      if (btn) {
        const prev = btn.textContent;
        btn.textContent = "✅ Kopyalandı";
        setTimeout(() => (btn.textContent = prev || "🔗 Kopyala"), 1200);
      }
    } catch {}
  }, [url]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl   = encodeURIComponent(url || "");

  const onWhatsApp = () =>
    open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`);
  const onX = () =>
    open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`);
  const onLinkedIn = () =>
    open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`);

  const item =
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 " +
    "ring-1 ring-white/30 bg-white/15 backdrop-blur " +
    "border border-white/10 shadow-[0_6px_20px_rgba(0,0,0,0.10)] " +
    "hover:bg-white/25 transition text-sm";

  return (
    <div className="sticky top-24 hidden lg:flex flex-col gap-3 pr-6">
      <button
        onClick={(e) => copy(e.currentTarget)}
        className={item}
        aria-label="Bağlantıyı kopyala"
        type="button"
      >
        <span>🔗</span> Kopyala
      </button>

      <button onClick={onWhatsApp} className={item} aria-label="WhatsApp ile paylaş" type="button">
        <span>🟢</span> WhatsApp
      </button>

      <button onClick={onX} className={item} aria-label="X (Twitter) ile paylaş" type="button">
        <span>✖️</span> X
      </button>

      <button onClick={onLinkedIn} className={item} aria-label="LinkedIn ile paylaş" type="button">
        <span>💼</span> LinkedIn
      </button>
    </div>
  );
}
