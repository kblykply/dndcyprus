"use client";

import { useEffect, useRef, useState } from "react";
import { HOME } from "@/lib/azure/home";
import type { Locale } from "@/lib/azure/site";

/**
 * Scrollytelling: sol sütunda adımlar kayar, sağda yapışkan görsel değişir.
 * Etkin adım, adımın üst kenarı görselin üst üçte birindeki çizgiyi geçince seçilir (telefonda görselin hemen altını).
 * İlk adım görselin üst kenarıyla, son adım görselin alt kenarıyla aynı çizgide başlar/biter (adımların altında
 * boşluk yok). Son adım, görsel yapışıklıktan çıkıp alt kenarı son adımla hizalandığında etkinleşir.
 */
export default function Story({ locale }: { locale: Locale }) {
  const t = HOME[locale].story;
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    const stick = stickRef.current;
    if (!box || !stick) return;
    const steps = Array.from(box.querySelectorAll<HTMLElement>(".az-step"));
    if (!steps.length) return;
    const mq = window.matchMedia("(max-width: 900px)");
    let raf = 0;

    // Etkinleşme çizgisi: görselin üstünden ~%35 aşağıda; ama ilk iki adımın arasından aşağı inmez ki
    // bölüm başında ilk adım atlanmasın. Telefonda görsel üstte olduğundan çizgi görselin hemen altında.
    const offset = () => {
      const h = stick.offsetHeight;
      const firstGap = steps.length > 1 ? steps[1].offsetTop - steps[0].offsetTop : h;
      return Math.max(24, Math.min(h * 0.35, firstGap - 24));
    };
    const pick = () => {
      raf = 0;
      const r = stick.getBoundingClientRect();
      let k = 0;
      if (mq.matches) {
        const line = r.bottom + 48;
        steps.forEach((s, j) => { if (s.getBoundingClientRect().top <= line) k = j; });
      } else {
        // Masaüstü: çizgi görselle birlikte iner; yapışkan kaydırma mesafesi kısa kalırsa (uzun görsel, kısa metin)
        // çizgi orantılı hızlanır, böylece her adım sırayla etkinleşir ve son adım tam bölüm sonunda etkin olur.
        const b = box.getBoundingClientRect();
        const off = offset();
        const tops = steps.map((s) => s.getBoundingClientRect().top - b.top);
        const travel = b.height - r.height;
        const t = Math.max(0, r.top - b.top);
        const f = travel > 1 ? Math.max(1, (tops[tops.length - 1] - off) / travel) : 1;
        const line = off + t * f;
        tops.forEach((y, j) => { if (y <= line + 0.5) k = j; });
        // bölüm sonu: görselin alt kenarı son adımın alt kenarına ulaştı → son adım etkin
        if (b.bottom <= r.bottom + 4) k = steps.length - 1;
      }
      setI(k);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick); };
    const onResize = () => onScroll();

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="az-section az-story" id="hikaye">
      <div className="az-wrap">
        <div className="az-head"><span className="az-kicker rv">{t.kicker}</span><h2 className="az-h2 rv d1">{t.title}</h2></div>
        <div className="g">
          <div className="steps" ref={ref}>
            {t.steps.map((s, k) => (
              <div key={s.h} className={`az-step${k === i ? " on" : ""}`} data-i={k}>
                <div className="t">{s.t}</div><h3>{s.h}</h3><p>{s.p}</p>
                <div className="az-tags">{s.tags.map((x) => <span key={x}>{x}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="stick" ref={stickRef}>
            {t.steps.map((s, k) => (
              // bölüm sayfanın aşağısında: ilk görsel de tembel yüklenir (eager iken ana sayfa açılışında LCP afişiyle
              // aynı anda 280 KB iniyordu); tarayıcı bölüme ~1250 px kala yükler
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.img} className={k === i ? "on" : undefined} src={s.img} alt={k === i ? s.h : ""} loading="lazy" decoding="async" />
            ))}
            <div className="cap"><b>{t.steps[i].h}</b><div className="az-dots">{t.steps.map((s, k) => <i key={s.h} className={k === i ? "on" : undefined} />)}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
