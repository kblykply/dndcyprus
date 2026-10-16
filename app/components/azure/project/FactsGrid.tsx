"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { PiBuildingsDuotone, PiCalendarCheckDuotone, PiDoorOpenDuotone, PiFrameCornersDuotone, PiHardHatDuotone, PiMapPinDuotone, PiSealCheckDuotone } from "react-icons/pi";
import type { ProjectFact } from "@/lib/azure/project-types";
import "./cards.css";

// Bilgiler her projede aynı sırada: konum · teslim · tip · birim sayısı · arsa alanı · durum
const ICONS: IconType[] = [PiMapPinDuotone, PiCalendarCheckDuotone, PiBuildingsDuotone, PiDoorOpenDuotone, PiFrameCornersDuotone];

// "354", "43.179 m²", "43,179 m²", "43 179 m²", "8.800m²" → sayı kısmı sayarak yükselir (yıl ve ay-yıl değerleri olduğu gibi kalır)
const NUM = /^(\d{1,3}(?:([.,   ])\d{3})+|\d+)(\s?\D*)$/;
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const m = value.match(NUM);
  const sep = m?.[2] ?? "";
  const target = m ? Number(m[1].replace(/\D/g, "")) : NaN;
  const isYear = !!m && !sep && target >= 1900 && target <= 2100 && !m[3].trim();
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || !m || isYear || !Number.isFinite(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // zaten ekrandaysa sayma (titreme olmasın)
    const fmt = (n: number) => (sep ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep) : String(n)) + m[3];
    setShown(fmt(0));
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur), k = 1 - Math.pow(1 - p, 3);
        setShown(fmt(Math.round(target * k)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <b ref={ref}>{shown}</b>;
}

/**
 * Öne çıkan bilgiler: Azure kartları — simge, sırayla belirme, sayarak yükselen rakamlar, durum noktası
 * (devam ediyorsa nabız), üzerine gelince yükselme ve renkli alt çizgi. Olanaklar aynı kart dilini kullanır (cards.css).
 */
export default function FactsGrid({ items, done }: { items: ProjectFact[]; done: boolean }) {
  return (
    <div className="az-facts">
      {items.map((f, i) => {
        const last = i === items.length - 1;
        const Ic = last ? (done ? PiSealCheckDuotone : PiHardHatDuotone) : ICONS[i] ?? PiMapPinDuotone;
        return (
          <div key={f.label + i} className={`az-fact rv d${i % 3} ${f.accent === "coral" ? "coral" : "sea"}`}>
            <div className="hd"><span className="ic"><Ic size={22} aria-hidden /></span><span className="no">{String(i + 1).padStart(2, "0")}</span></div>
            <small>{f.label}</small>
            {last
              ? <b><i className={`live${done ? " done" : ""}`} aria-hidden />{f.value}</b>
              : <CountUp value={f.value} />}
          </div>
        );
      })}
    </div>
  );
}
