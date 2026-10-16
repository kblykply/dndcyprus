"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Sayfa geneli Azure etkileşimleri: kaydırınca belirme (.rv), sayaçlar ([data-count]),
// mesafe çubukları (.az-dist) ve otomatik oynatma engellenen hero videosunu başlatma.
export default function AzureFx() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    // İlk karede görünür olanları hemen "in" yap, sonra sınıfı ekle (flaş olmasın)
    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>(".rv, .az-dist").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.94 && r.bottom > 0) el.classList.add("in");
    });
    root.classList.add("az-js");

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    const observeAll = () => document.querySelectorAll<HTMLElement>(".rv:not(.in), .az-dist:not(.in)").forEach((el) => io.observe(el));
    observeAll();

    const cio = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      const end = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      const loc = root.lang === "en" ? "en-GB" : "tr-TR";
      const t0 = performance.now();
      const d = reduce ? 1 : 1600;
      const f = (t: number) => {
        const p = Math.min(1, (t - t0) / d);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString(loc) + suffix;
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
      cio.unobserve(el);
    }), { threshold: 0.5 });
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => cio.observe(el));

    // Yeni içerik (dinamik bölümler) için gözlemi tazele; sayaç gibi her karede değişen içerik sayfayı
    // kare başına bir kereden fazla taramasın
    let moRaf = 0;
    const mo = new MutationObserver(() => { if (!moRaf) moRaf = requestAnimationFrame(() => { moRaf = 0; observeAll(); }); });
    mo.observe(document.body, { childList: true, subtree: true });

    // Kaydırırken titreme: fare yerinde dururken altından geçen kartlar hover'a girip kalkıyor, galeri
    // panelleri açılıp kapanıyordu. Fareli ekranlarda sayfa kayarken hover kapalı (html.is-scrolling,
    // app/azure.css); kaydırma bitince 160 ms sonra geri gelir. Dokunmatik ekranlarda hover yok, dokunulmaz.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let scrollT = 0;
    const onScroll = () => {
      if (!fine.matches) return;
      if (!scrollT) root.classList.add("is-scrolling");
      window.clearTimeout(scrollT);
      scrollT = window.setTimeout(() => { scrollT = 0; root.classList.remove("is-scrolling"); }, 160);
    };
    addEventListener("scroll", onScroll, { passive: true });

    // Hero video: düşük güç modu vb. durumlarda ilk etkileşimde oynat; "hareketi azalt" açıksa durur (afiş görünür)
    const v = document.querySelector<HTMLVideoElement>(".az-hero video");
    if (v && reduce) { v.removeAttribute("autoplay"); v.pause(); }
    const tryPlay = () => { try { const p = v?.play(); if (p && p.catch) p.catch(() => {}); } catch {} };
    const evs = ["touchstart", "pointerdown", "scroll", "keydown", "click"] as const;
    if (v && !reduce) { tryPlay(); evs.forEach((ev) => addEventListener(ev, tryPlay, { passive: true })); }
    // video oynamaya başlayınca her kaydırmada play() çağrılmasın
    const stopTry = () => evs.forEach((ev) => removeEventListener(ev, tryPlay));
    v?.addEventListener("playing", stopTry, { once: true });
    const onVis = () => { if (!document.hidden && !reduce) tryPlay(); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect(); cio.disconnect(); mo.disconnect(); cancelAnimationFrame(moRaf);
      removeEventListener("scroll", onScroll); window.clearTimeout(scrollT); root.classList.remove("is-scrolling");
      v?.removeEventListener("playing", stopTry); stopTry();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pathname]);

  return <div className="az-mesh" aria-hidden="true"><i /><i /><i /></div>;
}
