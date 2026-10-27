"use client";

import Img from "../Img";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import "./projects-carousel.css";
import { HOME } from "@/lib/azure/home";
import { PROJECTS, href, type Locale } from "@/lib/azure/site";
import GlassArrow from "../GlassArrow";
import LogoTag from "../LogoTag";

const Chevron = ({ dir }: { dir: 1 | -1 }) => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden style={dir < 0 ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Proje kartları şeridi: içerik genişliğinde tam 3 kart (tablette 2, telefonda 1 + sonrakinin ucu), görsellerin
 * sağında ve solunda oklar (uçta gizlenir). Tarayıcının yatay kaydırması + mıknatıslı kartlar (parmak ve trackpad),
 * fareyle sürükleme (bırakınca hıza göre en fazla bir kart ileri, karta oturur; sürüklenince tıklama iptal),
 * altta görünen kartları gösteren sayaç (01–03 / 06) ve ilerleme çizgisi, klavye okları.
 * Fareli ekranlarda (≥700px) şerit sabitlenir: bölüm kayma mesafesi kadar uzar, içerik ekranda sabit kalır ve
 * sayfayı aşağı kaydırmak kartları yana kaydırır (1px aşağı = 1px yana); son karttan sonra sayfa normal devam eder.
 * Dokunmatik ekranlarda parmakla yana kaydırma (mıknatıslı) olduğu gibi kalır.
 */
export default function ProjectsCarousel({ locale }: { locale: Locale }) {
  const t = HOME[locale].projects;
  const car = useRef<HTMLDivElement>(null);
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState(false); // fareli ekran: aşağı kaydırma kartları yana kaydırır
  const pinRef = useRef(false);
  const [prog, setProg] = useState(0); // 0–1 gerçek kaydırma konumu
  const step = () => (car.current?.querySelector<HTMLElement>(".az-pc")?.getBoundingClientRect().width ?? 300) + 16;

  useEffect(() => {
    const el = car.current; if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      // son kart mıknatısa oturduğunda kenar payı kadar (Safari'de ~34px) geride kalabilir: o da "sonda" sayılır
      const end = max <= 0 || max - el.scrollLeft <= 40;
      setProg(max > 0 ? (end ? 1 : el.scrollLeft / max) : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  // fareli ekran mı (dokunmatikte sabitleme yok)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 700px)");
    const apply = () => { pinRef.current = mq.matches; setPin(mq.matches); };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // sabitleme: bölüm yüksekliği = üst pay + sahne + yatay kayma mesafesi; sayfa kaydırması şeridin konumunu belirler
  useEffect(() => {
    const s = sec.current, st = stage.current, el = car.current;
    if (!pin || !s || !st || !el) return;
    let raf = 0;
    const layout = () => {
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      const padTop = parseFloat(getComputedStyle(s).paddingTop) || 0;
      const top = Math.max(88, (window.innerHeight - st.offsetHeight) / 2); // sahne ekranın ortasında (menünün altında)
      st.style.top = `${top}px`;
      s.style.height = `${padTop + st.offsetHeight + max}px`;
      return { max, padTop, top };
    };
    let geo = layout();
    const sync = () => {
      raf = 0;
      const d = geo.top - (s.getBoundingClientRect().top + geo.padTop); // sahne yapıştığından beri aşağı kaydırılan
      el.scrollLeft = Math.min(geo.max, Math.max(0, d));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(sync); };
    const onResize = () => { geo = layout(); sync(); };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      s.style.height = ""; st.style.top = "";
    };
  }, [pin]);

  useEffect(() => {
    const el = car.current; if (!el) return;
    let drag: { x: number; sl: number; moved: number; t: number; lx: number; v: number } | null = null;
    let suppress = false;
    const down = (e: PointerEvent) => {
      suppress = false;
      if (pinRef.current || e.pointerType !== "mouse" || e.button !== 0) return; // sabitlemede şerit sayfa kaydırmasıyla gider
      drag = { x: e.clientX, sl: el.scrollLeft, moved: 0, t: performance.now(), lx: e.clientX, v: 0 };
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      if (drag.moved <= 6) return; // basıp bırakmak normal tıklama: sürükleme modu yalnız gerçek harekette açılır
      el.classList.add("is-drag");
      el.scrollLeft = drag.sl - dx;
      const now = performance.now(), dt = now - drag.t;
      if (dt > 4) drag.v = drag.v * 0.6 + ((e.clientX - drag.lx) / dt) * 0.4;
      drag.t = now; drag.lx = e.clientX;
    };
    const up = () => {
      if (!drag) return;
      const d = drag; drag = null;
      if (d.moved <= 6) return;
      // sürüklemenin hemen ardından gelen tıklama iptal; tıklama hiç gelmezse işaret takılı kalmasın
      suppress = true; window.setTimeout(() => { suppress = false; }, 120);
      const w = step(), max = el.scrollWidth - el.clientWidth;
      const fling = performance.now() - d.t < 80 ? Math.max(-w, Math.min(w, -d.v * 220)) : 0;
      const target = Math.min(max, Math.max(0, Math.round((el.scrollLeft + fling) / w) * w));
      el.scrollTo({ left: target, behavior: "smooth" });
      window.setTimeout(() => el.classList.remove("is-drag"), 450);
    };
    const click = (e: MouseEvent) => { if (suppress) { e.preventDefault(); e.stopPropagation(); suppress = false; } };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    return () => { el.removeEventListener("pointerdown", down); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); el.removeEventListener("click", click, true); };
  }, []);

  const go = (d: number) => {
    const el = car.current, s = sec.current, st = stage.current; if (!el) return;
    const w = step();
    if (pinRef.current && s && st) {
      // sabitlemede oklar sayfayı, hedef kart hizalanacak konuma kaydırır (şerit konumu sayfa kaydırmasından gelir)
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      const target = Math.min(max, Math.max(0, (Math.round(el.scrollLeft / w) + d) * w));
      const padTop = parseFloat(getComputedStyle(s).paddingTop) || 0;
      const top = parseFloat(st.style.top) || 0;
      window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY + padTop - top + target, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: d * w, behavior: "smooth" });
  };
  const atStart = prog <= 0.01, atEnd = prog >= 0.99;
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); } else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  return (
    <section ref={sec} className={`az-section flush az-pcar${pin ? " pin" : ""}`} id="projeler">
      <div ref={stage} className="stage">
      <div className="az-head" style={{ padding: "0 var(--edge)", marginBottom: 30 }}>
        <span className="az-kicker rv">{t.kicker}</span><h2 className="az-h2 rv d1">{t.title}</h2>
      </div>
      <div className="rail">
      <button type="button" className="arw prev" aria-label={t.prev} onClick={() => go(-1)} disabled={atStart}><Chevron dir={-1} /></button>
      <div className="az-car" ref={car} tabIndex={0} role="region" aria-label={t.kicker} onKeyDown={onKey}>
        {PROJECTS.map((p) => (
          <Link key={p.slug} className="az-pc" href={href(locale, `/${p.slug}`)} prefetch={false} draggable={false}>
            <Img src={p.cover} sizes="(min-width: 1000px) 460px, 86vw" alt="" draggable={false} />
            <div className="top"><span className="tags">{p.award && <span className="az-st gold">{p.award[locale]}</span>}<span className="az-st">{p.status[locale]}</span></span>{p.logo ? <LogoTag src={p.logo} inline /> : null}</div>
            <div className="in"><small>{p.location[locale]}</small><h3>{p.name}</h3><p>{p.blurb[locale]}</p><div className="az-glassrow">{p.cta[locale]} <GlassArrow /></div></div>
          </Link>
        ))}
      </div>
      <button type="button" className="arw next" aria-label={t.next} onClick={() => go(1)} disabled={atEnd}><Chevron dir={1} /></button>
      </div>
      <div className="nav">
        {/* yalnız ilerleme çizgisi (sayaç kaldırıldı) */}
        <span className="bar" aria-hidden><i style={{ transform: `scaleX(${Math.max(0.04, prog)})` }} /></span>
      </div>
      </div>
    </section>
  );
}
