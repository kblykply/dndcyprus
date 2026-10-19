"use client";

import GlassArrow from "../GlassArrow";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";
import "../meridian.css";
import "./awards.css";

const MORE: Record<Locale, string> = { tr: "Detaylı bilgi", en: "Learn more", de: "Mehr erfahren", ru: "Подробнее", pl: "Dowiedz się więcej" };
const HEAD: Record<Locale, { h: string; p: string }> = {
  tr: { h: "PropertyNC 2025’te üç ödül", p: "Mariachi Beach Club’a platin, DND Homes ve Lagoon Verde’ye altın ödül." },
  en: { h: "Three awards at PropertyNC 2025", p: "Platinum for Mariachi Beach Club, gold for DND Homes and Lagoon Verde." },
  de: { h: "Drei Auszeichnungen bei den PropertyNC 2025", p: "Platin für den Mariachi Beach Club, Gold für DND Homes und Lagoon Verde." },
  ru: { h: "Три награды PropertyNC 2025", p: "Платина — Mariachi Beach Club, золото — DND Homes и Lagoon Verde." },
  pl: { h: "Trzy nagrody PropertyNC 2025", p: "Platyna dla Mariachi Beach Club, złoto dla DND Homes i Lagoon Verde." },
};
// her ödül kendi projesiyle: panel fotoğrafı, kısa ad, madalya (hafif WebP kurdele) ve proje sayfası
const PROJECT: Record<string, { img: string; name: string; medal: string; path: string }> = {
  "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png": { img: "/azure/mb-1.jpg", name: "Mariachi Beach Club", medal: "/azure/awards/platinum-mariachi.webp", path: "/mariachi" },
  // DND Homes: tören fotoğrafı sola ve yukarı genişletildi (tavan, duvar); kişiler özgün pikseller, kurdele yüzlerin üstünde kalır
  "/BEST-NEWCOMER.png": { img: "/azure/awards/dnd-homes-odul-genis.jpg", name: "DND Homes", medal: "/azure/awards/gold-newcomer.webp", path: "/about" },
  "/BEST-SOCIOCULTURAL-GOLD.png": { img: "/azure/lv-7.jpg", name: "Lagoon Verde", medal: "/azure/awards/gold-lagoon-verde.webp", path: "/lagoon-verde" },
};

/**
 * Ödüller: geniş akordiyon (müşteri isteği, Ekim 2026). Her panel ödülün projesinin fotoğrafı; üzerine gelince /
 * dokununca panel genişler, madalya (kurdele) yukarıdan iner, altta beyaz yazıyla ödül adı ve kategorisi, bağlantı ortak cam satırda.
 * Altın ödüllü Lagoon Verde ortada ve başta açık (kullanıcı isteği, 19 Ekim). Telefonda paneller alt alta.
 * withProjects: bağlantı proje sayfasına (ana sayfa); yoksa ödülün kendi bağlantısı ve altta Yılın CFO'su (Hakkımızda).
 */
export default function AwardsShowcase({ locale, kicker, withProjects = false }: {
  locale: Locale; kicker?: string; withProjects?: boolean; projectLabel?: string; companyName?: string;
}) {
  const a = HOME[locale].bento.awards;
  const strip = HOME[locale].awards;
  const order = [0, 2, 1].filter((k) => k < a.items.length); // Mariachi (platin) · Lagoon Verde (altın, ortada) · DND Homes
  const [on, setOn] = useState(2); // a.items içindeki sıra: 2 = Lagoon Verde
  // Yılın CFO'su (Boston) yalnız Hakkımızda'da: ana sayfada Amerika anılmaz
  const extra = withProjects ? undefined : strip.items.find((x) => !x.ribbon);
  const t = HEAD[locale];

  return (
    <section className="az-section tight" id="oduller" aria-label={strip.label}>
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker ?? strip.label}</span>
          <h2 className="az-h2 sm rv d1">{t.h}</h2>
          <p className="az-lead rv d2">{t.p}</p>
        </div>
        <div className="az-awacc rv d2">
          {order.map((k) => {
            const it = a.items[k];
            const p = PROJECT[it.ribbon];
            const link = withProjects && p ? href(locale, p.path) : it.href;
            const external = /^https?:\/\//.test(link);
            const isOn = k === on;
            return (
              <div key={it.title} className={`pn${isOn ? " on" : ""}`} onMouseEnter={() => setOn(k)}>
                <Image className="bg" src={p?.img ?? "/azure/lv-7.jpg"} alt="" fill quality={72} sizes="(min-width: 900px) 62vw, 100vw" />
                <button type="button" className="hit" aria-expanded={isOn} aria-controls={`odul-${k}`} onClick={() => setOn(k)} onFocus={() => setOn(k)}>
                  <span className="nm">{p?.name ?? it.title}</span>
                </button>
                <div className="body" id={`odul-${k}`} aria-hidden={!isOn}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="medal" src={p?.medal ?? it.ribbon} alt={it.title} loading="lazy" decoding="async" draggable={false} />
                  <div className="gl">
                    <small>{a.k}</small>
                    <h3>{it.title}</h3>
                    <p>{it.text.split(". ")[0].replace(/\.$/, "")}</p>
                    {external
                      ? <a className="az-glassrow" href={link} target="_blank" rel="noopener noreferrer" tabIndex={isOn ? undefined : -1}><span>{MORE[locale]}<span className="sr-only">: {it.title}</span></span> <GlassArrow /></a>
                      : <Link className="az-glassrow" href={link} prefetch={false} tabIndex={isOn ? undefined : -1}><span>{MORE[locale]}<span className="sr-only">: {it.title}</span></span> <GlassArrow /></Link>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {extra ? <p className="mr-mono az-aw-more">+ {extra.b}{extra.rest}</p> : null}
      </div>
    </section>
  );
}
