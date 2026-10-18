"use client";

import Arrow from "../Arrow";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { PageFlip } from "page-flip/dist/js/page-flip.module.js";
import { PROJECT_PAGES } from "@/lib/azure/projects";
import type { Locale } from "@/lib/azure/site";
import "./catalog.css";

// Sayfa çevirme motoru: page-flip, La Joya sitesindeki menü kitabıyla aynı kurulum (React sarmalayıcısı yok).
// Kitap bir kez kurulur; yalnız genişlik değişince (telefon döndürme, pencere boyutu) yeniden kurulur.

type Page = { src: string; half?: "l" | "r" };
// page-flip'in iç parçaları (telefonda geri çevirme için; paket derlemesinde adlar korunuyor, sürüm 2.0.7'ye sabit)
type Pt = { x: number; y: number };
type FlipCtl = {
  flip(p: Pt): void; start(p: Pt): boolean; setState(s: string): void;
  getCalculation(): { calc(p: Pt): boolean } | null;
  animateFlippingTo(from: Pt, to: Pt, isTurned: boolean): void;
};
type FlipRender = {
  getRect(): { left: number; top: number; width: number; height: number; pageWidth: number };
  getOrientation(): string; convertToBook(p: Pt): Pt; finishAnimation(): void;
};
type FlipInner = PageFlip & { getFlipController(): FlipCtl; getRender(): FlipRender; turnToPage(i: number): void };
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
 * Azure katalog: açık sahne üzerinde gerçek kitap (sayfa çevirme), başlıkta PDF, altta ilerleme çizgisi ve oklar.
 * Geniş ekranda iki sayfa (açılım), dar ekranda tek sayfa.
 *
 * La Joya'daki menü kitabının yöntemi:
 * - kitabın genişliği motor kurulmadan önce açıkça verilir (tek sayfa = sayfa genişliği, açılım = iki katı). Eskiden
 *   genişlik içerikten geliyordu; görseller önbellekten anında gelince iPhone'da kitap telefonda bile açılım kipine
 *   geçiyor, sağ sayfa kesiliyordu;
 * - kitap yalnız sahne genişliği değişince yeniden kurulur. iPhone'da kaydırırken adres çubuğu küçülüp ekran
 *   yüksekliği değişince React sarmalayıcısı kitabı baştan kuruyor, çevirme yarıda bozuluyordu;
 * - sayfa öğeleri React dışında kurulur (motor onları taşır ve biçimler); görseller açık sayfanın çevresinde önceden
 *   yüklenir ve çözülür ki çevirirken boş sayfa görünmesin.
 */
export default function AzureCatalog({ locale, project, near = true }: { locale: Locale; project: keyof typeof CATALOGS; near?: boolean }) {
  const def = CATALOGS[project];
  const t = T[locale];
  const n = def.pages.length;
  const name = PROJECT_PAGES[project].name;
  const stage = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  const idxRef = useRef(0);
  const [size, setSize] = useState<{ w: number; h: number; two: boolean } | null>(null);
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);

  // ölçü: yalnız sahne genişliği değişince yeniden hesaplanır (yükseklik değişimi, ör. adres çubuğu, kitabı bozmasın)
  useEffect(() => {
    const el = stage.current; if (!el) return;
    let lastW = -1, timer = 0;
    const fit = () => {
      const cw = el.clientWidth;
      if (Math.abs(cw - lastW) < 2) return;
      lastW = cw;
      const two = cw >= 700;
      const maxH = Math.max(300, Math.min(window.innerHeight * 0.74, window.innerHeight - 140, 900));
      let pw = two ? cw / 2 : cw, ph = pw / def.aspect;
      if (ph > maxH) { ph = maxH; pw = ph * def.aspect; }
      const next = { w: Math.floor(pw), h: Math.floor(ph), two };
      setSize((s) => (s && s.w === next.w && s.h === next.h && s.two === next.two ? s : next));
    };
    fit();
    const ro = new ResizeObserver(() => { window.clearTimeout(timer); timer = window.setTimeout(fit, 200); });
    ro.observe(el);
    return () => { ro.disconnect(); window.clearTimeout(timer); };
  }, [def.aspect]);

  // kitap: bölüm yaklaşınca ve ölçü belliyken kurulur
  useEffect(() => {
    const root = host.current;
    if (!near || !size || !root) return;
    let cancelled = false;
    let flip: PageFlip | null = null;
    const imgs: HTMLImageElement[] = [];
    // açık sayfanın çevresi önceden yüklenir ve çözülür (gizli sayfadaki görseli tarayıcı kendiliğinden çözmez)
    const load = (at: number) => {
      for (let i = Math.max(0, at - 4); i <= Math.min(n - 1, at + 10); i++) {
        const im = imgs[i];
        if (im && !im.getAttribute("src")) { im.src = im.dataset.src!; im.decode?.().catch(() => {}); }
      }
    };
    (async () => {
      const { PageFlip: PF } = await import("page-flip/dist/js/page-flip.module.js");
      if (cancelled) return;
      root.innerHTML = "";
      const book = document.createElement("div");
      book.className = "book";
      book.style.width = `${size.two ? size.w * 2 : size.w}px`;
      book.style.height = `${size.h}px`;
      root.appendChild(book);
      const pages = def.pages.map((p, i) => {
        const pg = document.createElement("div");
        pg.className = `pg${p.half ? ` half ${p.half}` : ""}`;
        const im = document.createElement("img");
        im.dataset.src = p.src;
        im.alt = `${name} · ${t.page} ${i + 1}`;
        im.draggable = false;
        im.decoding = "async";
        pg.appendChild(im);
        book.appendChild(pg);
        imgs.push(im);
        return pg;
      });
      load(idxRef.current);
      flip = new PF(book, {
        width: size.w, height: size.h, size: "fixed", showCover: def.cover, usePortrait: !size.two,
        mobileScrollSupport: !size.two, drawShadow: true, maxShadowOpacity: 0.5, flippingTime: 900,
        showPageCorners: true, startZIndex: 0, startPage: Math.min(idxRef.current, n - 1),
      });
      flip.loadFromHTML(pages);
      flip.on("flip", (e) => { const i = Number(e.data) || 0; idxRef.current = i; setIdx(i); load(i); });
      // Telefonda (tek sayfa) geri çevirme: kütüphane önceki sayfayı kitabın solundan getiriyor; kıvrılan kısım ekran
      // dışında kaldığı için sayfa düz kayıyormuş gibi görünüyordu, çevirme efekti yoktu (18 Ekim, iPhone). Ok, tuş,
      // kaydırma ve sol yarıya dokunuşla geri gidişte ileri çevirme tersinden oynatılır: önceki sayfaya geçilir ve sayfa,
      // tamamen çevrilmiş konumdan sol kenardan kıvrılarak geri gelip kapanır. Elle sürükleme kütüphanede kalır.
      const inner = flip as FlipInner, fc = inner.getFlipController(), render = inner.getRender(), own = fc.flip.bind(fc);
      fc.flip = (pos) => {
        const r = render.getRect(), b = render.convertToBook(pos);
        if (render.getOrientation() !== "portrait" || b.x - r.pageWidth > r.width / 5) return own(pos); // ileri ya da açılım
        if (fc.getCalculation() !== null) render.finishAnimation(); // süren çevirmeyi bitir (kütüphane de böyle yapar)
        const cur = inner.getCurrentPageIndex();
        if (cur <= 0) return;
        const bottom = b.y >= r.height / 2;
        inner.turnToPage(cur - 1);
        // ileri çevirmeyle aynı köşe → çevrilen sayfa önceki sayfa, altta kalan şimdiki sayfa
        if (!fc.start({ x: r.left + r.pageWidth * 2 - 10, y: r.top + (bottom ? r.height - 2 : 1) })) return;
        fc.setState("flipping");
        const m = r.height / 10; // kütüphanenin ileri çevirmede köşeyi kaldırdığı pay
        const from = { x: -r.pageWidth, y: bottom ? r.height : 0 }, to = { x: r.pageWidth - m, y: bottom ? r.height - m : m };
        fc.getCalculation()?.calc(from);
        fc.animateFlippingTo(from, to, false);
      };
      flipRef.current = flip;
      setReady(true);
    })();
    return () => {
      cancelled = true;
      flipRef.current = null;
      setReady(false);
      try { flip?.destroy(); } catch { /* zaten kaldırıldı */ }
      root.innerHTML = "";
    };
  }, [near, size, def, n, name, t.page]);

  const go = (d: number) => { const f = flipRef.current; if (!f) return; if (d > 0) f.flipNext(); else f.flipPrev(); };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => { if (e.key === "ArrowRight") { e.preventDefault(); go(1); } else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); } };

  // açılımda sol + sağ sayfa (kapak tek başına); yalnız ilerleme çizgisi ve oklar
  const two = !!size?.two;
  const lastStart = two ? (def.cover ? (n % 2 === 0 ? n - 1 : n - 2) : n - 2 + (n % 2)) : n - 1;
  const atStart = idx <= 0, atEnd = idx >= lastStart;
  const prog = Math.min(1, idx / Math.max(1, lastStart));
  const pdf = def.pdf?.[locale];
  // kapaklı katalogda (Lagoon Verde) kapak ve arka kapak açılımda tek sayfa: kitap yarım sayfa kayar, sayfa ortada durur
  const shift = two && def.cover ? (idx === 0 ? "translateX(-25%)" : idx >= n - 1 ? "translateX(25%)" : "none") : "none";

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
        <div className="row">
          <button type="button" className="side prev" aria-label={t.prev} onClick={() => go(-1)} disabled={!ready || atStart}><Arrow dir={-1} size={20} /></button>
          <div className="stage" ref={stage} tabIndex={0} onKeyDown={onKey} role="group" aria-label={t.title(name)}>
            {/* kitap bu kutunun içinde kurulur; kurulana kadar kutu kitabın boyunda yer tutucudur (bölüm son boyunda,
                yüklenince sayfa kaymaz). Kutu gizlenmez: motor kurulurken genişliğini ölçüp tek / çift sayfaya karar verir */}
            <div className={`shift${ready ? "" : " empty"}`} ref={host}
              style={{ transform: shift, ...(size ? { width: size.two ? size.w * 2 : size.w, height: size.h } : null) }} />
          </div>
          <button type="button" className="side next" aria-label={t.next} onClick={() => go(1)} disabled={!ready || atEnd}><Arrow size={20} /></button>
        </div>
        <span className="bar" aria-hidden><i style={{ transform: `scaleX(${Math.max(0.03, prog)})` }} /></span>
      </div>
    </section>
  );
}
