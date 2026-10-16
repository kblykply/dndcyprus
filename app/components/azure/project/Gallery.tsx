"use client";

import { useState } from "react";
import type { GalleryItem } from "@/lib/azure/project-types";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";

// Çerçeveli (az-wrap içinde, 28px köşe) genişleyen galeri: üzerine gelince / dokununca panel büyür.
export default function Gallery({ items, locale }: { items: GalleryItem[]; locale: Locale }) {
  const t = PROJECT_UI[locale].gallery;
  const [hover, setHover] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const on = active ?? hover;
  return (
    // Görünürlük (rv/in) sınıfı sabit dış kapta: React içteki sınıfı (has) değiştirdiğinde AzureFx'in eklediği "in" silinmesin
    <div className="rv">
    <div className={`az-pg${on !== null ? " has" : ""}`} role="group" aria-label={t.aria} onMouseLeave={() => setHover(null)}>
      {items.map((g, i) => (
        <button
          key={g.src + i}
          type="button"
          className={on === i ? "on" : undefined}
          aria-label={g.alt || t.item(i + 1)}
          aria-pressed={active === i}
          onMouseEnter={() => setHover(i)}
          onFocus={() => setHover(i)}
          onBlur={() => setHover(null)}
          onClick={() => setActive(active === i ? null : i)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={g.src} alt={g.alt} loading={i < 2 ? "eager" : "lazy"} decoding="async" draggable={false} />
          <span className="n" aria-hidden>{g.label ?? `${i + 1} / ${items.length}`}</span>
        </button>
      ))}
    </div>
    </div>
  );
}
