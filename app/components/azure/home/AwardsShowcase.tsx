"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mono } from "@/app/fonts";
import { HOME } from "@/lib/azure/home";
import type { Locale } from "@/lib/azure/site";
import "../meridian.css";
import "./awards.css";

const MORE: Record<Locale, string> = { tr: "Detaylı bilgi", en: "Learn more", de: "Mehr erfahren", ru: "Подробнее", pl: "Dowiedz się więcej" };
// Hafif WebP kurdeleler (kaynak: public/BEST-*.png)
const WEBP: Record<string, string> = {
  "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png": "/azure/awards/platinum-mariachi.webp",
  "/BEST-NEWCOMER.png": "/azure/awards/gold-newcomer.webp",
  "/BEST-SOCIOCULTURAL-GOLD.png": "/azure/awards/gold-lagoon-verde.webp",
};

/**
 * Ödül vitrini (hero'nun hemen altı): canlı sitedeki gibi ortadaki kurdele büyük, yanlardakiler küçük;
 * kendiliğinden döner (üzerine gelince durur), kurdeleye tıklanınca o ödül ortaya gelir; yanında başlık,
 * açıklama ve bağlantı. PropertyNC dışındaki ödül (Yılın CFO'su) altta mono satır.
 */
export default function AwardsShowcase({ locale }: { locale: Locale }) {
  const a = HOME[locale].bento.awards;
  const strip = HOME[locale].awards;
  const items = a.items;
  const n = items.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % n), 5200);
    return () => window.clearInterval(id);
  }, [paused, n]);

  const pos = (k: number) => {
    const d = (((k - i) % n) + n) % n;
    return d === 0 ? "c" : d === 1 ? "r" : d === n - 1 ? "l" : "h";
  };
  const cur = items[i];
  const external = /^https?:\/\//.test(cur.href);
  const extra = strip.items.find((x) => !x.ribbon);
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <section className={`az-section tight mr ${mono.variable}`} id="oduller" aria-label={strip.label}>
      <div className="az-wrap">
        <div className="rv">
          <div className="az-aw" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
            <div className="stage" role="tablist" aria-label={strip.label}>
              {items.map((it, k) => (
                <button key={it.title} type="button" role="tab" aria-selected={k === i} aria-label={it.title} className={`rb ${pos(k)}`} onClick={() => setI(k)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={WEBP[it.ribbon] ?? it.ribbon} alt="" draggable={false} />
                </button>
              ))}
            </div>
            <div className="txt">
              <div className="hd">
                <span className="az-kicker">{strip.label}</span>
                <h2 className="az-h2 sm">{a.h}</h2>
              </div>
              <div className="cur" key={i} aria-live="polite">
                <span className="mr-mono">{a.k} · {pad(i + 1)} / {pad(n)}</span>
                <h3>{cur.title}</h3>
                <p>{cur.text}</p>
                {external
                  ? <a className="az-btn sea sm" href={cur.href} target="_blank" rel="noopener noreferrer">{MORE[locale]} →</a>
                  : <Link className="az-btn sea sm" href={cur.href} prefetch={false}>{MORE[locale]} →</Link>}
              </div>
              <div className="dots" role="tablist" aria-label={strip.label}>
                {items.map((it, k) => (
                  <button key={it.title} type="button" role="tab" aria-selected={k === i} aria-label={it.title} className={k === i ? "on" : undefined} onClick={() => setI(k)} />
                ))}
              </div>
              {extra ? <p className="mr-mono more">+ {extra.b}{extra.rest}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
