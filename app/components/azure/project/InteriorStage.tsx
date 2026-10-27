"use client";

import Img from "../Img";
import Arrow from "../Arrow";
import { getImageProps } from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PiCornersOutBold } from "react-icons/pi";
import type { InteriorGroup } from "@/lib/azure/project-types";
import { PROJECT_UI } from "@/lib/azure/project-ui";
import type { Locale } from "@/lib/azure/site";
import Lightbox from "./Lightbox";
import "./interiors.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * İç mekân — film şeridi: başlığın yanında daire tipi seçici (birden çok tip varsa), tam genişlikte büyük görsel
 * (oda adı sol altta), altında oda adlı küçük resim şeridi; sağda sayaç ve oklar. Kare / dikey kareler kırpılmaz,
 * yanları aynı görselin bulanık kopyasıyla dolar. Ok tuşları ve telefonda kaydırma ile gezilir. "Tam ekran" düğmesi
 * (ya da büyük görsele tıklama) görseli kırpılmadan tam ekranda açar.
 */
export default function InteriorStage({ groups, locale, head }: { groups: InteriorGroup[]; locale: Locale; head: ReactNode }) {
  const t = PROJECT_UI[locale].interiors;
  const [g, setG] = useState(0);
  const [i, setI] = useState(0);
  const [more, setMore] = useState(false);
  const [full, setFull] = useState(false);
  const strip = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false); // sahne ekrana yaklaştı mı (önden yükleme ancak o zaman)
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

  useEffect(() => {
    const el = root.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // sonraki ve önceki büyük kareyi önceden yükle: sahne ekrana yaklaşınca, ekrandaki <Img> ile aynı (optimize) boyutta
  useEffect(() => {
    if (!near) return;
    const SIZES = "(max-width: 1600px) 92vw, 1460px";
    for (const k of [i + 1, i - 1]) {
      const x = shots[((k % n) + n) % n];
      if (!x || x === s) continue;
      const im = new Image();
      im.sizes = SIZES;
      if (x.srcSet) { im.srcset = x.srcSet; im.src = x.image; continue; }
      const p = getImageProps({ src: x.image, alt: "", fill: true, sizes: SIZES, quality: 75 }).props;
      if (p.srcSet) im.srcset = p.srcSet;
      im.src = p.src;
    }
  }, [near, i, shots, n, s]);

  return (
    <div
      ref={root}
      className="az-int2 rv"
      role="region"
      aria-roledescription="carousel"
      aria-label={t.region}
      onKeyDown={(e) => {
        // tam ekran penceresi portal olduğu için tuş olayı buraya da kabarır; o zaman pencere kendisi gezer
        if (!e.currentTarget.contains(e.target as Node)) return;
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
        {s.vertical ? <Img className="blur" src={s.thumb ?? s.image} sizes="320px" quality={65} alt="" aria-hidden /> : null}
        {s.srcSet
          // eslint-disable-next-line @next/next/no-img-element
          ? <img key={s.image} className={`main${s.vertical ? " fit" : ""}`} src={s.image} srcSet={s.srcSet} sizes="(max-width: 1600px) 92vw, 1460px" alt={s.alt} decoding="async" onClick={() => setFull(true)} />
          : <Img key={s.image} className={`main${s.vertical ? " fit" : ""}`} src={s.image} sizes="(max-width: 1600px) 92vw, 1460px" alt={s.alt} onClick={() => setFull(true)} />}
        <span className="tag" aria-hidden>{s.label}</span>
        <button type="button" className="az-fs-btn" onClick={() => setFull(true)} aria-label={t.full}><PiCornersOutBold size={14} aria-hidden /><span>{t.full}</span></button>
      </div>

      <div className="row">
        <div className={`strip${more ? " more" : ""}`} ref={strip} role="tablist" aria-label={t.tabs}>
          {shots.map((x, k) => (
            <button key={`${groups[g].id}-${x.image}`} type="button" role="tab" aria-selected={k === i} className={k === i ? "on" : undefined} onClick={() => go(k)}>
              <Img src={x.thumb ?? x.image} sizes="160px" alt="" />
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

      {full ? (
        <Lightbox
          images={shots.map((x) => ({ src: x.image, srcSet: x.srcSet, alt: x.alt, label: x.label }))}
          index={Math.min(i, n - 1)}
          onIndex={go}
          onClose={() => setFull(false)}
          ui={{ close: t.close, prev: t.prev, next: t.next, label: t.fullLabel }}
        />
      ) : null}
    </div>
  );
}
