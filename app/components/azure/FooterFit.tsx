"use client";

import { useEffect } from "react";

/**
 * Altbilgi: logo + sosyal simge satırı, adres metninin gerçekte bittiği yerde biter.
 * Metin 48ch kutuda kelime sınırında kırıldığı için kutu kenarı ile son harf arasında boşluk kalıyordu;
 * paragraf satırlarının en sağ noktası ölçülür ve simge satırının genişliği ona eşitlenir.
 * Logo ile simgelerin alt alta durduğu düzende (1180px altı) ölçü uygulanmaz.
 */
export default function FooterFit() {
  useEffect(() => {
    const brand = document.querySelector<HTMLElement>(".az-footer .brand");
    const top = brand?.querySelector<HTMLElement>(".top");
    if (!brand || !top) return;
    const range = document.createRange();
    const fit = () => {
      top.style.maxWidth = "";
      if (getComputedStyle(top).flexDirection === "column") return;
      const left = top.getBoundingClientRect().left;
      let right = 0;
      brand.querySelectorAll<HTMLElement>(":scope > p").forEach((p) => {
        range.selectNodeContents(p);
        for (const r of range.getClientRects()) right = Math.max(right, r.right);
      });
      if (right > left) top.style.maxWidth = `${Math.ceil(right - left)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(brand);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => ro.disconnect();
  }, []);
  return null;
}
