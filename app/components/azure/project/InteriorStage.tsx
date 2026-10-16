"use client";

import Arrow from "../Arrow";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { InteriorGroup } from "@/lib/azure/project-types";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";
import "./interiors.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * İç mekân — film şeridi: başlığın yanında daire tipi seçici (birden çok tip varsa), tam genişlikte büyük görsel
 * (oda adı sol altta), altında oda adlı küçük resim şeridi; sağda sayaç ve oklar. Kare / dikey kareler kırpılmaz,
 * yanları aynı görselin bulanık kopyasıyla dolar. Ok tuşları ve telefonda kaydırma ile gezilir.
 */
export default function InteriorStage({ groups, locale, head }: { groups: InteriorGroup[]; locale: Locale; head: ReactNode }) {
  const t = PROJECT_UI[locale].interiors;
  const [g, setG] = useState(0);
  const [i, setI] = useState(0);
  const [more, setMore] = useState(false);
  const strip = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const shots = groups[Math.min(g, groups.length - 1)].shots;
  const n = shots.length;
  const s = shots[Math.min(i, n - 1)];
  const go = (k: number) => setI(((k % n) + n) % n);
  const pickGroup = (k: number) => { setG(k); setI(0); };

  // etkin küçük resmi şeritte görünür tut (yalnız şerit kayar, sayfa kaymaz); sağda devamı varsa solma
  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const b = el.children[i] as HTMLElement | undefined;
    if (b) {
      if (b.offsetLeft < el.scrollLeft) el.scrollTo({ left: Math.max(0, b.offsetLeft - 8), behavior: "smooth" });
      else if (b.offsetLeft + b.offsetWidth > el.scrollLeft + el.clientWidth) el.scrollTo({ left: b.offsetLeft + b.offsetWidth - el.clientWidth + 8, behavior: "smooth" });
    }
  }, [i, g]);
  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const upd = () => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    upd();
    el.addEventListener("scroll", upd, { passive: true });
    const ro = new ResizeObserver(upd);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", upd); ro.disconnect(); };
  }, [g]);

  // sonraki ve önceki büyük kareyi önceden yükle
  useEffect(() => {
    for (const k of [i + 1, i - 1]) {
      const x = shots[((k % n) + n) % n];
      if (!x || x === s) continue;
      const im = new Image();
      if (x.srcSet) { im.sizes = "(max-width: 1600px) 92vw, 1460px"; im.srcset = x.srcSet; }
      im.src = x.image;
    }
  }, [i, shots, n, s]);

  return (
    <div
      className="az-int2 rv"
      role="region"
      aria-roledescription="carousel"
      aria-label={t.region}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
      }}
    >
      <div className="hd">
        {head}
        {groups.length > 1 ? (
          <div className="types" role="tablist" aria-label={t.types}>
            {groups.map((x, k) => (
              <button key={x.id} type="button" role="tab" aria-selected={k === g} className={k === g ? "on" : undefined} onClick={() => pickGroup(k)}>
                {x.name}<small>{x.shots.length}</small>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div
        className="stage"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const x0 = touchX.current; touchX.current = null;
          if (x0 === null) return;
          const dx = e.changedTouches[0].clientX - x0;
          if (Math.abs(dx) > 44) go(i + (dx < 0 ? 1 : -1));
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {s.vertical ? <img className="blur" src={s.thumb ?? s.image} alt="" aria-hidden /> : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={s.image} className={`main${s.vertical ? " fit" : ""}`} src={s.image} srcSet={s.srcSet} sizes="(max-width: 1600px) 92vw, 1460px" alt={s.alt} decoding="async" />
        <span className="tag" aria-hidden>{s.label}</span>
      </div>

      <div className="row">
        <div className={`strip${more ? " more" : ""}`} ref={strip} role="tablist" aria-label={t.tabs}>
          {shots.map((x, k) => (
            <button key={`${groups[g].id}-${x.image}`} type="button" role="tab" aria-selected={k === i} className={k === i ? "on" : undefined} onClick={() => go(k)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={x.thumb ?? x.image} alt="" loading="lazy" decoding="async" />
              <i aria-hidden />
              <span>{x.label}</span>
            </button>
          ))}
        </div>
        {n > 1 ? (
          <div className="nav">
            <button type="button" onClick={() => go(i - 1)} aria-label={t.prev}><Arrow dir={-1} size={18} /></button>
            <span aria-live="polite">{pad(i + 1)} / {pad(n)}</span>
            <button type="button" onClick={() => go(i + 1)} aria-label={t.next}><Arrow size={18} /></button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
