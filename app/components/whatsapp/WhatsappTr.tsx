// app/components/WhatsAppFab.tsx
"use client";

import { useMemo, useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  phone: string;
  defaultMessage?: string;
  label?: string;
};

const LIGHT_SELECTORS = '[data-bg="light"], .light-section, .bg-white';

export default function WhatsAppFab({
  phone,
  defaultMessage = "Merhaba! Bilgi almak istiyorum.",
  label = "WhatsApp ile sohbet et",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const raf = useRef<number | null>(null);

  const href = useMemo(() => {
    const msg = encodeURIComponent(defaultMessage);
    const clean = phone.replace(/[^\d+]/g, "");
    return `https://wa.me/${clean.replace(/^\+/, "")}?text=${msg}`;
  }, [phone, defaultMessage]);

  useEffect(() => setMounted(true), []);

  // Same detection model as SocialIcons: check if the FAB center is inside a "light" section
  const recalc = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const host = document.getElementById("whatsapp-fab");
      if (!host) return;

      const r = host.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const candidates = Array.from(
        document.querySelectorAll(LIGHT_SELECTORS)
      ) as HTMLElement[];

      let onLight = false;
      for (const el of candidates) {
        const er = el.getBoundingClientRect();
        if (
          er.width > 0 &&
          er.height > 0 &&
          cx >= er.left &&
          cx <= er.right &&
          cy >= er.top &&
          cy <= er.bottom
        ) {
          onLight = true;
          break;
        }
      }

      setIsLightBg(onLight);
    });
  }, []);

  useEffect(() => {
    recalc();
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    const guard = window.setInterval(recalc, 500); // cover layout shifts
    return () => {
      window.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
      clearInterval(guard);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [recalc]);

  if (!mounted) return null;

  return (
    <div
      id="whatsapp-fab"
      className="fixed right-5 bottom-5 z-[1000] sm:right-6 sm:bottom-6"
      aria-label="WhatsApp quick chat"
    >
      <motion.div
        className="absolute inset-0 -z-10 blur-xl rounded-full motion-reduce:opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        style={{
          background:
            "radial-gradient(50px 50px at 50% 50%, rgba(37,211,102,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "group relative flex items-center rounded-full p-2",
          "border border-white/20 shadow-lg transition-all duration-300",
          "backdrop-blur-lg overflow-hidden",
          // mirror SocialIcons behavior: only tint changes, not content
          isLightBg ? "bg-black/55 hover:bg-black/55" : "bg-white/10 hover:bg-white/15",
        ].join(" ")}
        style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}
      >
        <span className="relative grid place-items-center w-11 h-11 rounded-full bg-emerald-500/80 border border-white/20 flex-shrink-0">
          <span className="absolute h-full w-full rounded-full bg-white/20 motion-reduce:hidden animate-ping" />
          <FaWhatsapp className="relative z-10 text-white text-2xl" aria-hidden />
        </span>

        <span
          className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap
                     group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-1 group-hover:pr-2
                     transition-all duration-300 text-[13px] font-medium tracking-wide text-white"
        >
          {label}
        </span>
      </a>
    </div>
  );
}
