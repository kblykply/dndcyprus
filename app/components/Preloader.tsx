// app/components/Preloader.tsx
"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Props = {
  logoSrc?: string;        // /images/logo.svg
  brand?: string;          // "DND Cyprus"
  minDurationMs?: number;  // 700ms default
  oncePerSession?: boolean;// true default
  // optional timing tweaks
  backdropMs?: number;     // 280ms default
  cardMs?: number;         // 360ms default
};

const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.28 } },
  exit:    { opacity: 0, transition: { duration: 0.28 } },
};

const cardVariants: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 10, filter: "blur(6px)" },
  animate: {
    opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, scale: 0.98, y: -8, filter: "blur(4px)",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Preloader({
  logoSrc = "/images/logo.svg",
  brand = "DND Cyprus",
  minDurationMs = 700,
  oncePerSession = true,
  backdropMs = 280,
  cardMs = 360,
}: Props) {
  const [show, setShow] = useState(true);

  // Lock scroll while visible
  useEffect(() => {
    if (show) {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => { document.documentElement.style.overflow = prev; };
    }
  }, [show]);

  useEffect(() => {
    if (oncePerSession && typeof window !== "undefined" && sessionStorage.getItem("preloader:done")) {
      setShow(false);
      return;
    }
    const start = performance.now();
    const onReady = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, minDurationMs - elapsed);
      window.setTimeout(() => {
        setShow(false);
        if (oncePerSession) sessionStorage.setItem("preloader:done", "1");
      }, remaining);
    };

    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });

    return () => window.removeEventListener("load", onReady);
  }, [minDurationMs, oncePerSession]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader-backdrop"
          className="fixed inset-0 z-[9999] grid place-items-center"
          aria-label="Sayfa Yükleniyor"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 1 },
            animate: { opacity: 1 },
            exit:    { opacity: 1 },
          }}
          style={{ background: "#ffffff", color: "#141517" }}
        >
          {/* gradient wash animates with backdrop */}
          <motion.div
            key="wash"
            className="absolute inset-0 pointer-events-none"
            variants={backdropVariants}
            transition={{ duration: backdropMs / 1000 }}
            style={{
              background: `
                radial-gradient(38rem 26rem at 12% 0%, ${TEAL}12, transparent 65%),
                radial-gradient(30rem 20rem at 88% 100%, ${ORANGE}14, transparent 70%)
              `,
            }}
          />

          {/* card */}
          <motion.div
            key="card"
            className="relative mx-auto w-[260px] max-w-[86vw] rounded-2xl p-8 text-center"
            variants={cardVariants}
            transition={{ duration: cardMs / 1000, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
              border: "1px solid rgba(20,21,23,0.08)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.08), inset 0 1px rgba(255,255,255,0.6)",
              backdropFilter: "blur(12px)",
            }}
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={brand}
                className="mx-auto h-10 w-auto animate-[float_2.2s_ease-in-out_infinite]"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }}
              />
            ) : (
              <div className="text-lg font-semibold">{brand}</div>
            )}

            <div className="mt-3 text-sm" style={{ color: "rgba(20,21,23,0.65)" }}>
              Yükleniyor…
            </div>

            <div className="mt-4 h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(20,21,23,0.08)" }}>
              <div
                className="h-full rounded-full animate-[bar_1.25s_ease-in-out_infinite]"
                style={{ background: `linear-gradient(90deg, ${TEAL}, ${ORANGE})`, width: "40%" }}
              />
            </div>
          </motion.div>

          {/* keyframes */}
          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
            @keyframes bar {
              0% { transform: translateX(-120%); }
              100% { transform: translateX(260%); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
