"use client";

import { useEffect, useState, useCallback } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const LIGHT_SELECTORS = '[data-bg="light"], .light-section, .bg-white';

export default function SocialIcons() {
  const [isOnLight, setIsOnLight] = useState(false);

  const recalc = useCallback(() => {
    const icon = document.getElementById("social-icons");
    if (!icon) return;

    const rect = icon.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;

    const candidates = Array.from(
      document.querySelectorAll(LIGHT_SELECTORS)
    ) as HTMLElement[];

    let onLight = false;
    for (const el of candidates) {
      const r = el.getBoundingClientRect();
      // If the icon’s vertical center sits inside a light section, treat as light
      if (centerY >= r.top && centerY <= r.bottom && r.height > 0 && r.width > 0) {
        onLight = true;
        break;
      }
    }

    setIsOnLight(onLight);
  }, []);

  useEffect(() => {
    // Recompute on mount, scroll, resize (and a short interval to cover route/layout shifts)
    recalc();
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    const guard = window.setInterval(recalc, 400);

    return () => {
      window.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
      clearInterval(guard);
    };
  }, [recalc]);

  return (
    <div
      id="social-icons"
      className="fixed left-3 top-1/2 -translate-y-1/2 z-[9999] pointer-events-none"
    >
      <div
        className={[
          "pointer-events-auto flex flex-col items-center gap-5 text-lg px-3 py-6 rounded-full shadow-lg border transition-colors duration-300",
          // Dark glass when on light background, white glass elsewhere
          isOnLight
            ? "text-white bg-black/55 border-black/30"
            : "text-white bg-white/15 border-white/25 backdrop-blur-md",
          // make it thin & elegant
          "w-12"
        ].join(" ")}
      >
        <a
          href="#"
          target="_blank"
          className="hover:opacity-70 transition-opacity"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>
        <a
          href="#"
          target="_blank"
          className="hover:opacity-70 transition-opacity"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          target="_blank"
          className="hover:opacity-70 transition-opacity"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
}
