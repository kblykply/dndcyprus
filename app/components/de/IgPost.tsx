// app/components/de/IgPost.tsx (InstagramSpotlight, DE)
"use client";


import React, { useState } from "react";
import IgPhone, { type IgPost } from "@/app/components/social/IgPhone";
import { m as motion, type Variants } from "framer-motion";

const TEAL = "#0d6570";
const ORANGE = "#cd4824";
const BG_IMAGE = "/ins.jpg";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};


const IG_URLS = [
  "https://www.instagram.com/p/DP0mSn8gK1h/",
  "https://www.instagram.com/p/DQGqJSyDMM7/",
  "https://www.instagram.com/p/DPD0UpLjKdL/",
  "https://www.instagram.com/p/DOVeAdtDJDv/",
];

// Telefon mockup'ı için gönderilerin sitede barındırılan medyası (Instagram gömme kutusu yerine)
const IG_MEDIA: Record<string, Omit<IgPost, "url">> = {
  DQoFlJHjIa5: { kind: "image", media: "/instagram/DQoFlJHjIa5.webp", poster: "/instagram/DQoFlJHjIa5.webp", caption: "✨ Träume werden wahr: DND Cyprus meldet die Fertigstellung der La Joya Residenzen und des Feriendorfs" },
  DP0mSn8gK1h: { kind: "image", media: "/instagram/DP0mSn8gK1h.webp", poster: "/instagram/DP0mSn8gK1h.webp", caption: "✨ Von der Natur inspiriert, für Sie gestaltet 🌿" },
  DQGqJSyDMM7: { kind: "reel", media: "/instagram/DQGqJSyDMM7.mp4", poster: "/instagram/DQGqJSyDMM7.webp", caption: "Nordzypern – der aufsteigende Stern des Mittelmeers" },
  DPD0UpLjKdL: { kind: "reel", media: "/instagram/DPD0UpLjKdL.mp4", poster: "/instagram/DPD0UpLjKdL.webp", caption: "La Joya: das erste Projekt der Kollektion. Sichere Investition, prestigeträchtiges Wohnen" },
  DOVeAdtDJDv: { kind: "reel", media: "/instagram/DOVeAdtDJDv.mp4", poster: "/instagram/DOVeAdtDJDv.webp", caption: "Die echte Kampagne von DND Cyprus. Die echte Chance. Ihr Platz in Lagoon Verde wartet" },
};
const IG_POSTS: IgPost[] = IG_URLS.map((url) => ({ url, ...IG_MEDIA[url.split("/").filter(Boolean).pop() as string] }));
const IG_LABELS = { follow: "Folgen", viewOnInstagram: "Auf Instagram ansehen", reels: "Reels", awards: "Auszeichnungen" };

export default function InstagramSpotlight() {
  const [idx, setIdx] = useState(0);
  const n = IG_POSTS.length;
  const go = (d: number) => setIdx((i) => (i + d + n) % n);

  return (
    <>

      <section
        aria-label="Instagram – Highlights"
        className="relative overflow-hidden bg-white"
        style={{
          color: "#0d2326",
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "rgba(255,255,255,0.75)" }}
        />

        <div className="relative py-12 lg:py-16 px-3 min-[361px]:px-[clamp(24px,5vw,64px)]">
          <div className="mt-0 grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* LEFT */}
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.35 }}
  className="flex flex-col justify-center order-2 lg:order-1 lg:h-[533px] lg:justify-between"
>
  <span
    className="inline-flex items-center w-fit text-[11px] tracking-wider uppercase px-3 py-1 rounded-full mb-3"
    style={{
      border: "1px solid rgba(13,35,38,0.08)",
      color: TEAL,
      background: "#ffffff",
    }}
  >
    Instagram
  </span>

  <h2 className="text-3xl sm:text-4xl lg:text-[3.4rem] font-semibold leading-[1.08] tracking-tight">
    Besuchen Sie unser Instagram
  </h2>
  <p
    className="mt-4 text-base sm:text-lg lg:text-xl lg:leading-relaxed"
    style={{ color: "rgba(13,35,38,0.72)" }}
  >
    Verfolgen Sie unsere neuesten Projekte, Neuigkeiten und Updates in regelmäßigen Beiträgen.
  </p>

  <ul className="mt-6 space-y-3">
    <li className="flex items-center gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: `${TEAL}1a`, color: TEAL }} aria-hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </span>
      <span className="text-[15px] sm:text-base" style={{ color: "rgba(13,35,38,0.78)" }}>Neue Projekte, Kampagnen und Zahlungsangebote</span>
    </li>
    <li className="flex items-center gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: `${TEAL}1a`, color: TEAL }} aria-hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </span>
      <span className="text-[15px] sm:text-base" style={{ color: "rgba(13,35,38,0.78)" }}>Aktuelles von unseren Baustellen und Übergaben</span>
    </li>
    <li className="flex items-center gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: `${TEAL}1a`, color: TEAL }} aria-hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </span>
      <span className="text-[15px] sm:text-base" style={{ color: "rgba(13,35,38,0.78)" }}>Reels aus La Joya, Lagoon Verde und Mariachi</span>
    </li>
  </ul>

  {/* telefonda da iki düğme yan yana, eşit genişlikte (alt alta düşüyordu) */}
              <div className="mt-8 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3 lg:mt-0">
    <a
      href="https://www.instagram.com/dndcyprus/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center text-center px-3 py-2.5 rounded-full text-[13px] leading-tight font-medium transition-transform hover:-translate-y-0.5 sm:px-6 sm:text-sm"
      style={{ background: TEAL, color: "#fff", boxShadow: `0 10px 22px ${TEAL}33` }}
    >
      Auf Instagram folgen
    </a>
    <a
      href="/de/contact"
      className="flex items-center justify-center text-center px-3 py-2.5 rounded-full text-[13px] leading-tight font-medium sm:px-6 sm:text-sm"
      style={{
        background: `${ORANGE}0`,
        color: ORANGE,
        border: `1px solid ${ORANGE}33`,
      }}
    >
      Kontakt aufnehmen
    </a>
  </div>
</motion.div>


            {/* RIGHT — vertically centered viewport; long captions clipped */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative flex w-full flex-col items-center">
                {/* Telefon sabit; oklar hemen yanında */}
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Vorheriger Beitrag"
                    onClick={() => go(-1)}
                    className="absolute -left-3 min-[361px]:-left-5 sm:-left-16 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white transition hover:scale-105"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" stroke="#0d2326" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <IgPhone post={IG_POSTS[idx]} labels={IG_LABELS} />
                  <button
                    type="button"
                    aria-label="Nächster Beitrag"
                    onClick={() => go(1)}
                    className="absolute -right-3 min-[361px]:-right-5 sm:-right-16 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white transition hover:scale-105"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" stroke="#0d2326" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  {IG_POSTS.map((p, i) => (
                    <button
                      key={p.url}
                      type="button"
                      aria-label={`Beitrag ${i + 1}`}
                      aria-current={i === idx}
                      onClick={() => setIdx(i)}
                      className={`h-2 rounded-full transition-all ${i === idx ? "w-6" : "w-2 bg-black/20 hover:bg-black/35"}`}
                      style={i === idx ? { background: TEAL } : undefined}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
