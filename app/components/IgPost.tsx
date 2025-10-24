// app/components/social/InstagramSpotlight.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { motion, type Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
// Replace with your light/white texture image (kept subtle)
const BG_IMAGE = "/ins.jpg";

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

// === Your Instagram post/reel URLs ===
const IG_URLS = [
  "https://www.instagram.com/p/DQGqJSyDMM7/",
  "https://www.instagram.com/p/DPD0UpLjKdL/",
  "https://www.instagram.com/p/DOVeAdtDJDv/",
];

export default function InstagramSpotlight() {
  useEffect(() => {
    window?.instgrm?.Embeds?.process?.();
  }, []);

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window?.instgrm?.Embeds?.process?.()}
      />

      <section
        aria-label="Instagram — Spotlight"
        className="relative overflow-hidden bg-white"
        style={{
          color: "#141517",
          // light, non-intrusive section bg image
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#fff",
        }}
      >
        {/* optional subtle white overlay to keep it bright */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "rgba(255,255,255,0.75)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mt-0 grid gap-10 lg:grid-cols-2 items-stretch min-h-[64vh] lg:min-h-[72vh]">
            {/* LEFT: content (kicker sits OVER the header here) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              className="flex flex-col justify-center order-2 lg:order-1 pb-6 lg:pb-8"
            >
              {/* Kicker moved here, above the H2 */}
              <span
                className="inline-flex items-center w-fit text-[11px] tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                style={{ border: "1px solid rgba(20,21,23,0.08)", color: TEAL, background: "#ffffff" }}
              >
                Instagram
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                Instagram sayfamıza göz atın
              </h2>
              <p className="mt-3 text-base sm:text-lg" style={{ color: "rgba(20,21,23,0.72)" }}>
                Düzenli paylaşımlar ile en yeni projelerimizi, haberlerimizi ve güncellemelerimizi takip edin.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/dndcyprus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
                  style={{ background: TEAL, color: "#fff", boxShadow: `0 10px 22px ${TEAL}33` }}
                >
                  Instagram’da Takip Et
                </a>
                <a
                  href="/contact"
                  className="px-6 py-2.5 rounded-full text-sm font-medium"
                  style={{ background: `${ORANGE}0`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
                >
                  İletişime Geç
                </a>
              </div>
            </motion.div>

            {/* RIGHT: Single-post carousel (dragging disabled) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative h-full w-full">
                {/* Nav buttons BEFORE Swiper so they exist at init */}
                <button
                  aria-label="Previous post"
                  className="ig-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full grid place-items-center backdrop-blur-sm hover:scale-105 transition pointer-events-auto"
                  style={{ background: "#ffffff", boxShadow: "0 6px 16px rgba(0,0,0,0.08)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="#141517"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Next post"
                  className="ig-next absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full grid place-items-center backdrop-blur-sm hover:scale-105 transition pointer-events-auto"
                  style={{ background: "#ffffff", boxShadow: "0 6px 16px rgba(0,0,0,0.08)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="#141517"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <Swiper
                  modules={[Navigation, Pagination, Keyboard, A11y]}
                  slidesPerView={1}
                  centeredSlides
                  loop
                  // dragging disabled:
                  allowTouchMove={false}
                  simulateTouch={false}
                  grabCursor={false}
                  // keep keyboard + arrows
                  keyboard={{ enabled: true }}
                  pagination={{ clickable: true }}
                  navigation={{
                    prevEl: ".ig-prev",
                    nextEl: ".ig-next",
                    disabledClass: "opacity-40 pointer-events-none",
                  }}
                  onInit={(s) => {
                    try {
                      // @ts-ignore
                      s.navigation.init();
                      // @ts-ignore
                      s.navigation.update();
                    } catch {}
                    window?.instgrm?.Embeds?.process?.();
                  }}
                  onSlideChange={() => window?.instgrm?.Embeds?.process?.()}
                  className="rounded-none"
                >
                  {IG_URLS.map((url) => (
                    <SwiperSlide key={url} className="flex items-center justify-center">
                      <EmbedBox url={url} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- Cropped, rounded Instagram embed ---------------- */
function EmbedBox({ url }: { url: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(true);
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (inView && !processed) {
      window?.instgrm?.Embeds?.process?.();
      setProcessed(true);
    }
  }, [inView, processed]);

  return (
    <div className="mx-auto" style={{ maxWidth: 420, width: "100%" }}>
      {/* Rounded + overflow-hidden to make the post itself rounded */}
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl ring-1 ring-black/5">
        <div ref={ref} className="absolute inset-0 flex items-start justify-center">
          {inView ? (
            <blockquote
              key={`${url}-nocaption`}
              className="instagram-media"
              data-instgrm-permalink={url}
              data-instgrm-captioned="false"
              data-instgrm-version="14"
              style={{
                background: "#fff",
                border: 0,
                margin: 0,
                padding: 0,
                maxWidth: "100%",
                minWidth: 0,
              }}
            >
              <a href={url} aria-label="View on Instagram" />
            </blockquote>
          ) : (
            <div className="h-full w-full animate-pulse bg-black/5" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Tiny in-view hook ---------------- */
function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) obs.unobserve(el);
          }
        });
      },
      { rootMargin: "200px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return { ref, inView };
}
