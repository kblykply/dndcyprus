"use client";

import Link from "next/link";
import { useState } from "react";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";
import { Icon } from "../project/icons";

// teknik donanım kartı: metindeki sırayla simgeler (merkezi ısıtma-soğutma · jeneratör · akıllı ev · yerden ısıtma)
const GEAR = ["climate", "generator", "smart-home", "floor-heating"];

const Arrow = () => (
  <span className="arrow" aria-hidden>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" /></svg>
  </span>
);

export default function Bento({ locale }: { locale: Locale }) {
  const t = HOME[locale].bento;
  const [months, setMonths] = useState(60);
  return (
    <section className="az-section" id="bir-bakista">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{t.kicker}</span>
          <h2 className="az-h2 statement rv d1">{t.title}</h2>
          <p className="az-lead rv d2">{t.lead}</p>
        </div>
        {/* "Bir bakışta DND Cyprus": şirketi anlatan kartlar; proje ayrıntıları proje sayfalarında.
            TL modeli kampanya olarak burada, Lagoon Verde sayfasına bağlanır. */}
        <div className="az-grid">
          <Link className="az-tile img t-mariachi rv" href={href(locale, "/mariachi")} prefetch={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bg" src="/azure/mb-6.jpg" alt="Mariachi Beach Club" loading="lazy" />
            <span className="pill gold">{t.mariachi.pill}</span><Arrow />
            <div className="k">{t.mariachi.k}</div><h3>{t.mariachi.h}</h3><p>{t.mariachi.p}</p>
          </Link>

          <div className="az-tile sea t-tl rv d1">
            <div className="k">{t.tl.k}</div>
            <h3>{t.tl.h}</h3>
            <div className="big" style={{ marginTop: 10 }}>{months} <span style={{ fontSize: ".32em", letterSpacing: 0, color: "rgba(255,255,255,.8)" }}>{t.tl.upto}</span></div>
            <ul className="rules">{t.tl.rules.map((r) => <li key={r}><i>✓</i>{r}</li>)}</ul>
            <div className="seg" role="group" aria-label={t.tl.k}>
              {[12, 24, 36, 48, 60].map((m) => (
                <button key={m} type="button" className={months === m ? "on" : undefined} onClick={() => setMonths(m)} aria-pressed={months === m}>{m}{m === 60 ? ` ${t.tl.months}` : ""}</button>
              ))}
            </div>
            <Link className="tl-cta" href={href(locale, "/lagoon-verde")} prefetch={false}>{t.tl.cta} →</Link>
          </div>

          <div className="az-tile t-award rv d1">
            <div className="k">{t.usa.k}</div>
            {/* etiket ile rakam arasındaki alanı DND Homes'un Massachusetts'te teslim ettiği (satılmış) iki projesi doldurur */}
            <div className="ph">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <span><img src="/azure/usa/15-tyler-road.webp" alt="15 Tyler Road, Lexington, MA · DND Homes" loading="lazy" decoding="async" /></span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <span><img src="/azure/usa/131-dane-hill-road.webp" alt="131 Dane Hill Road, Newton, MA · DND Homes" loading="lazy" decoding="async" /></span>
            </div>
            <div className="big" data-count={t.usa.count}>0</div>
            <p>{t.usa.p}</p>
          </div>

          <div className="az-tile t-homes rv d2">
            <div className="k">{t.tech.k}</div>
            {/* donanım listesi simgeli 2×2 kutular (metin aynı, " · " ile ayrılmış dört öğe) */}
            <ul className="gear">
              {t.tech.p.split(" · ").map((g, k) => <li key={g}><i><Icon name={GEAR[k] ?? ""} size={20} /></i><span>{g}</span></li>)}
            </ul>
            <h3 style={{ fontSize: 22 }}>{t.tech.h}</h3>
          </div>

          <Link className="az-tile img t-lajoya rv d3" href={href(locale, "/la-joya")} prefetch={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bg" src="/azure/lj-2.jpg" alt="La Joya" loading="lazy" />
            <span className="pill">{t.lajoya.pill}</span>
            <div className="k">{t.lajoya.k}</div><h3>{t.lajoya.h}</h3><p>{t.lajoya.p}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
