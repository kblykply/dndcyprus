"use client";

import Arrow from "../Arrow";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";
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
 * 5 saniyede bir kendiliğinden döner, kurdeleye tıklanınca o ödül ortaya gelir; kurdelelerin altında ince
 * ilerleme çizgileri (etkin çizgi dolunca ilerler). Kurdelelerin üstüne gelmek dönüşü durdurmaz; yalnızca
 * fare yazı / bağlantı alanındayken (tıklanan ödül değişmesin), klavyeyle gezinirken ve ekran dışındayken durur.
 * Yanında başlık, açıklama ve bağlantı. PropertyNC dışındaki ödül (Yılın CFO'su) altta mono satır.
 */
// her ödül kendi projesiyle (müşteri isteği, Ekim 2026): küçük görsel, ad ve proje sayfası bağlantısı
const PROJECT: Record<string, { img: string; name?: string; path: string }> = {
  "/BEST-PROPOSED-NEW-COMMERCIAL-PROJECT.png": { img: "/azure/mb-1.jpg", name: "Mariachi Beach Club", path: "/mariachi" },
  "/BEST-NEWCOMER.png": { img: "/property_awards_2025-747.jpg", path: "/about" },
  "/BEST-SOCIOCULTURAL-GOLD.png": { img: "/azure/lv-7.jpg", name: "Lagoon Verde", path: "/lagoon-verde" },
};

/** kicker: bölüm üst etiketi (ana sayfada "Haberler ve ödüller"); project: ödülün projesi (adsızsa companyName) */
export default function AwardsShowcase({ locale, kicker, withProjects = false, projectLabel, companyName = "DND Cyprus" }: {
  locale: Locale; kicker?: string; withProjects?: boolean; projectLabel?: string; companyName?: string;
}) {
  const a = HOME[locale].bento.awards;
  const strip = HOME[locale].awards;
  const items = a.items;
  const n = items.length;
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false); // fare yazı / bağlantı alanında
  const [kbd, setKbd] = useState(false); // klavye odağı vitrinin içinde
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const auto = !reduce && n > 1;
  const paused = hold || kbd || !visible;
  // fareyle / dokunarak tıklanan düğme de odak alır; yalnızca klavye odağı (:focus-visible) dönüşü durdurur
  const onFocus = (e: FocusEvent<HTMLElement>) => {
    let k = false;
    try { k = e.target.matches(":focus-visible"); } catch { k = false; }
    setKbd(k);
  };

  const pos = (k: number) => {
    const d = (((k - i) % n) + n) % n;
    return d === 0 ? "c" : d === 1 ? "r" : d === n - 1 ? "l" : "h";
  };
  const cur = items[i];
  const proj = withProjects ? PROJECT[cur.ribbon] : undefined;
  const link = proj ? href(locale, proj.path) : cur.href;
  const external = /^https?:\/\//.test(link);
  // Yılın CFO'su (Boston) yalnız Hakkımızda'da: ana sayfada Amerika anılmaz
  const extra = withProjects ? undefined : strip.items.find((x) => !x.ribbon);
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <section className="az-section tight mr" id="oduller" aria-label={strip.label}>
      <div className="az-wrap">
        <div className="rv">
          <div ref={box} className="az-aw" onFocus={onFocus} onBlur={() => setKbd(false)}>
            <div className="side">
              <div className="stage" role="tablist" aria-label={strip.label}>
                {items.map((it, k) => (
                  <button key={it.title} type="button" role="tab" aria-selected={k === i} aria-label={it.title} className={`rb ${pos(k)}`} onClick={() => setI(k)}
                    style={{ "--m": `url(${WEBP[it.ribbon] ?? it.ribbon})` } as CSSProperties}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={WEBP[it.ribbon] ?? it.ribbon} alt="" loading="lazy" decoding="async" draggable={false} />
                  </button>
                ))}
              </div>
              {/* klavye kurdeleleri kullanır; çizgiler fareyle / dokunarak seçim ve ilerleme göstergesi */}
              <div className={`bars${paused ? " pause" : ""}`} aria-hidden>
                {items.map((it, k) => (
                  <button key={it.title} type="button" tabIndex={-1} className={k === i ? "on" : undefined} onClick={() => setI(k)}>
                    <i>{k === i ? <span key={`${i}-${auto}`} className={auto ? "p run" : "p"} onAnimationEnd={() => setI((i + 1) % n)} /> : null}</i>
                  </button>
                ))}
              </div>
            </div>
            <div className="txt" onPointerEnter={(e) => { if (e.pointerType === "mouse") setHold(true); }} onPointerLeave={() => setHold(false)}>
              <div className="hd">
                <span className="az-kicker">{kicker ?? strip.label}</span>
                <h2 className="az-h2 sm">{a.h}</h2>
              </div>
              <div className="cur" key={i} aria-live="polite">
                <span className="mr-mono">{a.k} · {pad(i + 1)} / {pad(n)}</span>
                <h3>{cur.title}</h3>
                <p>{cur.text}</p>
                {proj ? (
                  <Link className="proj" href={link} prefetch={false}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={proj.img} alt="" loading="lazy" decoding="async" />
                    <span><small>{projectLabel}</small><b>{proj.name ?? companyName}</b></span>
                    <Arrow />
                  </Link>
                ) : external
                  ? <a className="az-btn sea sm" href={link} target="_blank" rel="noopener noreferrer">{MORE[locale]} <Arrow /><span className="sr-only">: {cur.title}</span></a>
                  : <Link className="az-btn sea sm" href={link} prefetch={false}>{MORE[locale]} <Arrow /><span className="sr-only">: {cur.title}</span></Link>}
              </div>
              {extra ? <p className="mr-mono more">+ {extra.b}{extra.rest}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
