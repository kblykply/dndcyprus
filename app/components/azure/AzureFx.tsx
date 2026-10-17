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
    // Fare gerçekten hareket edince kilit hemen kalkar: kilit açıkken body tıklama almadığı için kaydırmanın
    // hemen ardından (trackpad ataleti sürerken) yapılan tıklama yutuluyordu (17 Ekim, Firefox testinde görüldü).
    const onMove = (e: PointerEvent) => {
      if (!scrollT || e.pointerType !== "mouse" || (!e.movementX && !e.movementY)) return;
      window.clearTimeout(scrollT); scrollT = 0; root.classList.remove("is-scrolling");
    };
    addEventListener("pointermove", onMove, { passive: true });

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
      removeEventListener("scroll", onScroll); removeEventListener("pointermove", onMove); window.clearTimeout(scrollT); root.classList.remove("is-scrolling");
      v?.removeEventListener("playing", stopTry); stopTry();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pathname]);

  // #bölüm bağlantıları: sayfa "#fiyat-al" gibi bir adresle açılınca ya da sayfa içi bağlantıya tıklanınca, sonradan
  // yüklenen bölümler (katalog, fareli ekranda sabitlenen proje şeridi, teknik kartlar) hedefi 400–1400 px aşağı
  // itiyordu; form ekranın altında kalıyordu (17 Ekim QA). Düzen oturana kadar hedef yeniden hizalanır;
  // kullanıcı kendisi kaydırır ya da dokunursa bırakılır.
  useEffect(() => {
    let cleanup = () => {};
    const follow = (hash: string, instant: boolean) => {
      cleanup();
      let id = "";
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      if (!id || !document.getElementById(id)) return;
      let done = false, raf = 0, idle = 0, lastY = -1;
      const pos = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY; // belgedeki mutlak konum
      const align = (smooth: boolean) => {
        const el = document.getElementById(id);
        if (done || !el) return;
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        if (Math.abs(el.getBoundingClientRect().top - margin) > 2) el.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "instant" });
      };
      // body kutusu büyümeyebiliyor (ResizeObserver tetiklenmiyordu): hedefin mutlak konumu her karede izlenir,
      // yukarıdaki bir bölüm uzayıp hedef yer değiştirince yeniden hizalanır; kaydırma durunca son düzeltme yapılır
      let last = pos(document.getElementById(id)!);
      const loop = () => {
        raf = 0;
        const el = document.getElementById(id);
        if (done || !el) return;
        const p = pos(el);
        if (Math.abs(p - last) > 1) { last = p; align(!instant); }
        if (window.scrollY === lastY) { if (++idle === 8) align(false); } else { idle = 0; lastY = window.scrollY; }
        raf = requestAnimationFrame(loop);
      };
      const stop = () => cleanup();
      const user = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
      const timer = window.setTimeout(stop, 8000);
      cleanup = () => {
        if (done) return;
        done = true; cancelAnimationFrame(raf); window.clearTimeout(timer);
        user.forEach((ev) => removeEventListener(ev, stop));
      };
      user.forEach((ev) => addEventListener(ev, stop, { passive: true }));
      if (instant) align(false);
      raf = requestAnimationFrame(loop);
    };
    if (location.hash) follow(location.hash, true);
    // sayfa içi #bağlantı (aynı adrese tekrar tıklanınca hashchange gelmediği için tıklamadan)
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.pathname !== location.pathname || !a.hash) return;
      const hash = a.hash;
      // tıklamanın kendi pointerdown'ı bitti; tarayıcı kaydırmayı başlattıktan sonra izlemeye başla
      window.setTimeout(() => follow(hash, false), 0);
    };
    document.addEventListener("click", onClick);
    // tıklama dışı adres değişimi (ör. 360° tur içinden "Fiyat Al")
    const onHash = () => follow(location.hash, false);
    addEventListener("hashchange", onHash);
    return () => { cleanup(); document.removeEventListener("click", onClick); removeEventListener("hashchange", onHash); };
  }, [pathname]);

  return <div className="az-mesh" aria-hidden="true"><i /><i /><i /></div>;
}
