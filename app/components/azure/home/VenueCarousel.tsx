"use client";

import Arrow from "../Arrow";
import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { PiCheckBold, PiInstagramLogoDuotone, PiPhoneDuotone } from "react-icons/pi";
import { VENUES, VENUES_TEXT } from "@/lib/azure/venues";
import { href, type Locale } from "@/lib/azure/site";
import LogoTag from "../LogoTag";
import "./venues.css";

const pad = (n: number) => String(n).padStart(2, "0");
const Chevron = ({ dir }: { dir: 1 | -1 }) => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden style={dir < 0 ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * DND ile yaşam ve ayrıcalıklar: üç büyük mekân kartı (Ülfet Shu → Ülfet Beach Club → Mariachi). La Joya sitesindeki
 * rezidans kartları gibi sayfa kaydırıldıkça kartlar üst üste biner (masaüstünde yapışkan yığın; telefonda alt alta).
 * Solda büyük fotoğraf (sağında ve solunda oklar, altında küçük resimler, üst köşede mekân logosu), sağda sıra (01 / 03),
 * açılış etiketi, ad, kısa açıklama, etiketler, ayrıcalıklar ve düğmeler (rezervasyon, Instagram; Mariachi'de sayfası).
 */
export default function VenueCarousel({ locale }: { locale: Locale }) {
  const t = VENUES_TEXT[locale];
  const n = VENUES.length;
  const [pic, setPic] = useState<number[]>(() => VENUES.map(() => 0));
  const show = (k: number, q: number) => setPic((p) => p.map((x, y) => (y === k ? (q + VENUES[k].images.length) % VENUES[k].images.length : x)));

  return (
    <div className="az-venues" aria-label={t.ui.region}>
      {VENUES.map((v, k) => {
        const tx = t.venues[v.key];
        const j = pic[k];
        const img = v.images[j];
        const many = v.images.length > 1;
        return (
          <article key={v.key} className="vc" aria-label={`${pad(k + 1)} / ${pad(n)} · ${tx.name}`} style={{ ["--i" as string]: k } as CSSProperties}>
            <div className="media">
              <div className="main">
                {img ? <Image key={img.src} src={img.src} alt={tx.name} fill quality={75} sizes="(min-width: 1000px) 56vw, 100vw" /> : null}
                {/* mekânın logosu etiket olarak sağ üst köşede (bütün kartlarda aynı yer) */}
                {v.logo ? <LogoTag src={v.logo} /> : null}
                {many ? (
                  <>
                    <button type="button" className="arw prev" aria-label={t.ui.prev} onClick={() => show(k, j - 1)}><Chevron dir={-1} /></button>
                    <button type="button" className="arw next" aria-label={t.ui.next} onClick={() => show(k, j + 1)}><Chevron dir={1} /></button>
                  </>
                ) : null}
              </div>
              {many ? (
                <div className="thumbs">
                  {v.images.map((m, q) => (
                    <button key={m.src} type="button" className={q === j ? "on" : undefined} aria-pressed={q === j} aria-label={t.ui.photo(q + 1)} onClick={() => show(k, q)}>
                      <Image src={m.src} alt="" fill quality={60} sizes="104px" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="tx">
              <p className="ct"><span><b>{pad(k + 1)}</b> / {pad(n)}</span>{tx.badge ? <span className="badge">{tx.badge}</span> : null}</p>
              <h3>{tx.name}</h3>
              <p className="sub">{tx.sub}</p>
              <ul className="chips">{tx.chips.map((c) => <li key={c}>{c}</li>)}</ul>
              <ul className="bl">{tx.bullets.map((b) => <li key={b}><i><PiCheckBold size={12} aria-hidden /></i>{b}</li>)}</ul>
              <div className="cta">
                {v.path ? <Link className="az-btn" href={href(locale, v.path)} prefetch={false}>{t.ui.discover} <Arrow /></Link> : null}
                {v.phone ? <a className="az-btn" href={`tel:${v.phone.tel}`}><PiPhoneDuotone size={18} aria-hidden /> {t.ui.reserve}: {v.phone.display}</a> : null}
                {v.instagram ? <a className="az-btn glass" href={v.instagram.href} target="_blank" rel="noopener noreferrer"><PiInstagramLogoDuotone size={18} aria-hidden /> {v.instagram.handle}</a> : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
