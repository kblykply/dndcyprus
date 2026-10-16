"use client";

import Arrow from "../Arrow";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { PROJECT_PAGES } from "@/lib/azure/projects";
import type { Locale } from "@/lib/azure/site";
import "./catalog.css";

// react-pageflip: sayfa çevirme motoru (eski katalogla aynı)
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });
type FlipApi = { flipNext: () => void; flipPrev: () => void };
type FlipHandle = { pageFlip: () => FlipApi | undefined };

type Page = { src: string; half?: "l" | "r" };
type Def = { pages: Page[]; aspect: number; cover: boolean; pdf?: Partial<Record<Locale, string>> };

const pad2 = (n: number) => String(n).padStart(2, "0");
// Perla ve Perla II: her görsel iki sayfalık yatay açılım (1684×596) → sol ve sağ sayfa
const spreads = (dir: string, n: number): Page[] =>
  Array.from({ length: n }).flatMap((_, i) => [{ src: `/${dir}/l-${pad2(i + 1)}.webp`, half: "l" as const }, { src: `/${dir}/l-${pad2(i + 1)}.webp`, half: "r" as const }]);

const CATALOGS: Record<"lagoon-verde" | "perla" | "perla-ii", Def> = {
  // Lagoon Verde: kesim payları kırpılmış A4 sayfalar (public/lagoonflip/pages); kapak tek başına açılır
  "lagoon-verde": { pages: Array.from({ length: 69 }).map((_, i) => ({ src: `/lagoonflip/pages/p-${pad2(i + 1)}.webp` })), aspect: 876 / 1239, cover: true, pdf: { tr: "/lagoonbrotr.pdf" } },
  perla: { pages: spreads("perlaflip", 14), aspect: 842 / 596, cover: false, pdf: { tr: "/brochure/perla.pdf", en: "/brochure/perla.pdf", de: "/brochure/perla.pdf", ru: "/brochure/perla.pdf", pl: "/brochure/perla.pdf" } },
  "perla-ii": { pages: spreads("perla2flip", 11), aspect: 842 / 596, cover: false, pdf: { tr: "/brochure/perla2.pdf", en: "/brochure/perla2.pdf", de: "/brochure/perla2.pdf", ru: "/brochure/perla2.pdf", pl: "/brochure/perla2.pdf" } },
};

const T: Record<Locale, { kicker: string; title: (n: string) => string; lead: string; pdf: string; prev: string; next: string; page: string }> = {
  tr: { kicker: "Katalog", title: (n) => `${n} Kataloğu`, lead: "Projeyi sayfa sayfa inceleyin; köşeden sürükleyerek ya da oklarla çevirin.", pdf: "PDF indir", prev: "Önceki sayfa", next: "Sonraki sayfa", page: "Sayfa" },
  en: { kicker: "Catalogue", title: (n) => `${n} Catalogue`, lead: "Browse the project page by page; drag a corner or use the arrows.", pdf: "Download PDF", prev: "Previous page", next: "Next page", page: "Page" },
  de: { kicker: "Katalog", title: (n) => `${n} Katalog`, lead: "Blättern Sie Seite für Seite durch das Projekt – an der Ecke ziehen oder die Pfeile nutzen.", pdf: "PDF herunterladen", prev: "Vorherige Seite", next: "Nächste Seite", page: "Seite" },
  ru: { kicker: "Каталог", title: (n) => `Каталог ${n}`, lead: "Листайте проект страница за страницей — потяните за угол или используйте стрелки.", pdf: "Скачать PDF", prev: "Предыдущая страница", next: "Следующая страница", page: "Страница" },
  pl: { kicker: "Katalog", title: (n) => `Katalog ${n}`, lead: "Przeglądaj projekt strona po stronie – przeciągnij róg lub użyj strzałek.", pdf: "Pobierz PDF", prev: "Poprzednia strona", next: "Następna strona", page: "Strona" },
};

/**
 * Azure katalog: açık sahne üzerinde gerçek kitap (sayfa çevirme), altta sayaç · ilerleme çizgisi · oklar,
 * başlıkta PDF. Geniş ekranda iki sayfa (açılım), dar ekranda tek sayfa. Yalnız açık sayfanın yakınları yüklenir.
 */
export default function AzureCatalog({ locale, project }: { locale: Locale; project: keyof typeof CATALOGS }) {
  const def = CATALOGS[project];
  const t = T[locale];
  const n = def.pages.length;
  const stage = useRef<HTMLDivElement>(null);
  const book = useRef<FlipHandle | null>(null);
  const [size, setSize] = useState<{ w: number; h: number; two: boolean } | null>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const el = stage.current; if (!el) return;
    const fit = () => {
      const cs = getComputedStyle(el);
      const cw = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const two = cw >= 700;
      // kitap + alt şerit ekrana sığsın (üstte sabit menü ~80px, sahne payı ve şerit ~180px)
      const maxH = Math.max(300, Math.min(window.innerHeight * 0.7, window.innerHeight - 260, 860));
      let pw = two ? cw / 2 : cw, ph = pw / def.aspect;
      if (ph > maxH) { ph = maxH; pw = ph * def.aspect; }
      const next = { w: Math.floor(pw), h: Math.floor(ph), two };
      setSize((s) => (s && s.w === next.w && s.h === next.h && s.two === next.two ? s : next));
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(el);
    return () => ro.disconnect();
  }, [def.aspect]);

  // Görseller React dışında yüklenir: kitap (react-pageflip) yalnız bir kez kurulur (renderOnlyPageLengthChange),
  // çocuklar her çizimde değişseydi kütüphane her çevirmede kitabı HTML'den yeniden kuruyor, sayfalar boş geliyordu.
  // Açık sayfanın yakınındaki <img data-src> öğelerine src verilir; önceden çözülür ki çevirme sırasında boş kalmasın.
  useEffect(() => {
    const root = stage.current; if (!root) return;
    const lo = Math.max(0, idx - 4), hi = Math.min(n - 1, idx + 8);
    root.querySelectorAll<HTMLImageElement>("img[data-i]").forEach((im) => {
      const i = Number(im.dataset.i);
      if (i < lo || i > hi || im.dataset.ready) return;
      if (!im.getAttribute("src")) im.src = im.dataset.src!;
      // gizli sayfadaki görsel tarayıcıca çözülmez; çevirme anında beyaz kalmasın diye önceden çöz
      im.dataset.ready = "1";
      im.decode?.().catch(() => {});
    });
  }, [idx, n, size]);

  const name = PROJECT_PAGES[project].name;
  const onFlip = useCallback((e: { data: number }) => setIdx(e.data), []);
  // sayfa öğeleri yalnız kitap kurulurken üretilir (boyut değişince key ile yeniden kurulur); ilk yakın sayfalar src ile gelir
  const pagesEls = useMemo(() => {
    const at = idx; // kurulum anındaki sayfa (idx bilerek bağımlılık değil: çevirmede kitap yeniden kurulmasın)
    return def.pages.map((p, i) => {
      const left = def.cover ? i % 2 === 1 : i % 2 === 0;
      const near = i >= at - 4 && i <= at + 8;
      return (
        <div key={i} className={`pg${p.half ? ` half ${p.half}` : ""}${size?.two ? (left ? " lp" : " rp") : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-i={i} data-src={p.src} src={near ? p.src : undefined} alt={`${name} · ${t.page} ${i + 1}`} draggable={false} />
        </div>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size?.w, size?.h, size?.two, def.pages, def.cover, name, t.page]);
  const api = () => book.current?.pageFlip();
  const go = (d: number) => { const a = api(); if (!a) return; if (d > 0) a.flipNext(); else a.flipPrev(); };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => { if (e.key === "ArrowRight") { e.preventDefault(); go(1); } else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); } };

  // görünen sayfalar: açılımda sol + sağ (kapak tek başına)
  const two = !!size?.two;
  const first = idx + 1;
  const showsPair = two && !(def.cover && idx === 0) && idx + 1 < n;
  const label = showsPair ? `${pad2(first)}–${pad2(first + 1)}` : pad2(first);
  const lastStart = two ? (def.cover ? (n % 2 === 0 ? n - 1 : n - 2) : n - 2 + (n % 2)) : n - 1;
  const atStart = idx <= 0, atEnd = idx >= lastStart;
  const prog = Math.min(1, idx / Math.max(1, lastStart));
  const pdf = def.pdf?.[locale];

  return (
    <section className="az-section az-proj az-cat" aria-label={t.title(name)}>
      <div className="az-wrap">
        <div className="hd">
          <div>
            <span className="az-kicker rv">{t.kicker}</span>
            <h2 className="az-h2 rv d1">{t.title(name)}</h2>
            <p className="az-lead rv d2">{t.lead}</p>
          </div>
          {pdf ? <a className="az-btn glass rv d2" href={pdf} target="_blank" rel="noopener" data-track="brochure_download">{t.pdf} ↓</a> : null}
        </div>
        <div className="stage" ref={stage} tabIndex={0} onKeyDown={onKey} aria-label={t.title(name)}>
          {size ? (
            // @ts-expect-error: react-pageflip türleri eksik (eski katalogdaki gibi)
            <HTMLFlipBook
              key={`${size.w}x${size.h}x${size.two}`}
              ref={book}
              className="book"
              width={size.w}
              height={size.h}
              size="fixed"
              minWidth={200} maxWidth={2000} minHeight={200} maxHeight={2000}
              showCover={def.cover}
              usePortrait={!size.two}
              startPage={idx}
              drawShadow
              maxShadowOpacity={0.35}
              flippingTime={850}
              mobileScrollSupport
              renderOnlyPageLengthChange
              onFlip={onFlip}
            >
              {pagesEls}
            </HTMLFlipBook>
          ) : null}
        </div>
        <div className="nav">
          <span className="count" aria-live="polite">{label} <i>/</i> {pad2(n)}</span>
          <span className="bar" aria-hidden><i style={{ transform: `scaleX(${Math.max(0.03, prog)})` }} /></span>
          <span className="az-ctrl">
            <button type="button" aria-label={t.prev} onClick={() => go(-1)} disabled={atStart}><Arrow dir={-1} size={18} /></button>
            <button type="button" aria-label={t.next} onClick={() => go(1)} disabled={atEnd}><Arrow size={18} /></button>
          </span>
        </div>
      </div>
    </section>
  );
}
