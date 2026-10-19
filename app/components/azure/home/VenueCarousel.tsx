"use client";

import Arrow from "../Arrow";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, type CSSProperties } from "react";
import { PiCheckBold, PiInstagramLogoDuotone, PiPhoneDuotone } from "react-icons/pi";
import { VENUES, VENUES_TEXT } from "@/lib/azure/venues";
import { href, type Locale } from "@/lib/azure/site";
import "./venues.css";

const pad = (n: number) => String(n).padStart(2, "0");
const Chevron = ({ dir }: { dir: 1 | -1 }) => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden style={dir < 0 ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * DND ile yaşam ve ayrıcalıklar: kaydırmalı üç büyük kart (Ülfet Shu → Ülfet Beach Club → Mariachi). Solda büyük
 * fotoğraf ve küçük resimler, fotoğrafın üst köşesinde mekânın logosu etiket olarak; sağda sıra (01 / 03), ad, kısa
 * açıklama, etiketler, ayrıcalıklar ve düğmeler (rezervasyon numarası, Instagram; Mariachi'de sayfası). Kartlar yana
 * kaydırılır (telefonda parmakla), oklar ve noktalar aynı kaydırmayı kullanır.
 */
export default function VenueCarousel({ locale }: { locale: Locale }) {
  const t = VENUES_TEXT[locale];
  const n = VENUES.length;
  const trk = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [pic, setPic] = useState<number[]>(() => VENUES.map(() => 0));

  const go = useCallback((k: number) => {
    const el = trk.current;
    if (!el) return;
    const i = Math.max(0, Math.min(n - 1, k));
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: i * el.clientWidth, behavior: smooth ? "smooth" : "auto" });
  }, [n]);
  const onScroll = () => {
    const el = trk.current;
    if (el) setCur(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
  };

  return (
    <div className="az-venues" role="region" aria-roledescription="carousel" aria-label={t.ui.region}>
      <div className="trk" ref={trk} onScroll={onScroll} tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); } }}>
        {VENUES.map((v, k) => {
          const tx = t.venues[v.key];
          const j = pic[k];
          const img = v.images[j];
          return (
            <article key={v.key} className="vc" aria-roledescription="slide" aria-label={`${pad(k + 1)} / ${pad(n)} · ${tx.name}`} aria-hidden={k !== cur}>
              <div className="media">
                <div className={`main${img ? "" : " noimg"}`}>
                  {img ? <Image key={img.src} src={img.src} alt={tx.name} fill quality={75} sizes="(min-width: 1000px) 56vw, 100vw" /> : null}
                  {/* mekânın logosu etiket olarak, fotoğrafta boş kalan üst köşede */}
                  {v.logo ? (
                    <span className={`ltag ${img?.logoAt ?? "tl"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.logo} alt="" style={{ ["--k" as string]: v.logoK ?? 1 } as CSSProperties} />
                    </span>
                  ) : null}
                </div>
                {v.images.length > 1 ? (
                  <div className="thumbs">
                    {v.images.map((m, q) => (
                      <button key={m.src} type="button" className={q === j ? "on" : undefined} aria-pressed={q === j} aria-label={t.ui.photo(q + 1)} tabIndex={k === cur ? 0 : -1}
                        onClick={() => setPic((p) => p.map((x, y) => (y === k ? q : x)))}>
                        <Image src={m.src} alt="" fill quality={60} sizes="104px" />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="tx">
                <span className="ct"><b>{pad(k + 1)}</b> / {pad(n)}</span>
                <h3>{tx.name}</h3>
                <p className="sub">{tx.sub}</p>
                <ul className="chips">{tx.chips.map((c) => <li key={c}>{c}</li>)}</ul>
                <ul className="bl">{tx.bullets.map((b) => <li key={b}><i><PiCheckBold size={12} aria-hidden /></i>{b}</li>)}</ul>
                <div className="cta">
                  {v.path ? <Link className="az-btn" href={href(locale, v.path)} prefetch={false} tabIndex={k === cur ? 0 : -1}>{t.ui.discover} <Arrow /></Link> : null}
                  {v.phone ? <a className="az-btn" href={`tel:${v.phone.tel}`} tabIndex={k === cur ? 0 : -1}><PiPhoneDuotone size={18} aria-hidden /> {t.ui.reserve}: {v.phone.display}</a> : null}
                  {v.instagram ? <a className="az-btn glass" href={v.instagram.href} target="_blank" rel="noopener noreferrer" tabIndex={k === cur ? 0 : -1}><PiInstagramLogoDuotone size={18} aria-hidden /> {v.instagram.handle}</a> : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="nav">
        <div className="dots" role="group" aria-label={t.ui.region}>
          {VENUES.map((v, k) => (
            <button key={v.key} type="button" className={k === cur ? "on" : undefined} aria-current={k === cur ? "true" : undefined} aria-label={t.venues[v.key].name} onClick={() => go(k)} />
          ))}
        </div>
        <div className="az-ctrl">
          <button type="button" aria-label={t.ui.prev} onClick={() => go(cur - 1)} disabled={cur === 0}><Chevron dir={-1} /></button>
          <button type="button" aria-label={t.ui.next} onClick={() => go(cur + 1)} disabled={cur === n - 1}><Chevron dir={1} /></button>
        </div>
      </div>
    </div>
  );
}
