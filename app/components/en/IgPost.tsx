// app/components/social/InstagramSpotlight.tsx
"use client";


import React, { useState } from "react";
import IgPhone, { type IgPost } from "@/app/components/social/IgPhone";
import { m as motion, type Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
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
  "https://www.instagram.com/reel/DNIOMH0MjBT/",
  "https://www.instagram.com/p/DQGqJSyDMM7/",
  "https://www.instagram.com/p/DPD0UpLjKdL/",
  "https://www.instagram.com/p/DOVeAdtDJDv/",
];

// Telefon mockup'ı için gönderilerin sitede barındırılan medyası (Instagram gömme kutusu yerine)
const IG_MEDIA: Record<string, Omit<IgPost, "url">> = {
  DQoFlJHjIa5: { kind: "image", media: "/instagram/DQoFlJHjIa5.webp", poster: "/instagram/DQoFlJHjIa5.webp", caption: "✨ Hayaller Gerçek Oldu: DND Cyprus, La Joya Rezidansları ve Tatil Köyü’nün Tamamlandığını Duyurdu" },
  DP0mSn8gK1h: { kind: "image", media: "/instagram/DP0mSn8gK1h.webp", poster: "/instagram/DP0mSn8gK1h.webp", caption: "✨ Inspired by Nature, Designed for You 🌿" },
  DNIOMH0MjBT: { kind: "reel", media: "/instagram/DNIOMH0MjBT.mp4", poster: "/instagram/DNIOMH0MjBT.webp", caption: "£900’DAN BAŞLAYAN TAKSİTLERLE!" },
  DQGqJSyDMM7: { kind: "reel", media: "/instagram/DQGqJSyDMM7.mp4", poster: "/instagram/DQGqJSyDMM7.webp", caption: "North Cyprus — The Rising Star of the Mediterranean" },
  DPD0UpLjKdL: { kind: "reel", media: "/instagram/DPD0UpLjKdL.mp4", poster: "/instagram/DPD0UpLjKdL.webp", caption: "La Joya: The First Project of the Collection, Trust in Investment, Prestige in Living" },
  DOVeAdtDJDv: { kind: "reel", media: "/instagram/DOVeAdtDJDv.mp4", poster: "/instagram/DOVeAdtDJDv.webp", caption: "The Real Campaign by DND Cyprus. The Real Opportunity. Your Place at Lagoon Verde is Ready" },
};
const IG_POSTS: IgPost[] = IG_URLS.map((url) => ({ url, ...IG_MEDIA[url.split("/").filter(Boolean).pop() as string] }));
const IG_LABELS = { follow: "Follow", viewOnInstagram: "View on Instagram", reels: "Reels", awards: "Awards" };

export default function InstagramSpotlight() {
  const [idx, setIdx] = useState(0);
  const n = IG_POSTS.length;
  const go = (d: number) => setIdx((i) => (i + d + n) % n);

  return (
    <>

      <section
        aria-label="Instagram — Spotlight"
        className="relative overflow-hidden bg-white"
        style={{
          color: "#141517",
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

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mt-0 grid gap-10 lg:grid-cols-2 items-stretch min-h-[64vh] lg:min-h-[72vh]">
        {/* LEFT */}
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: false, amount: 0.35 }}
  className="flex flex-col justify-center order-2 lg:order-1 pb-6 lg:pb-8"
>
  <span
    className="inline-flex items-center w-fit text-[11px] tracking-wider uppercase px-3 py-1 rounded-full mb-3"
    style={{
      border: "1px solid rgba(20,21,23,0.08)",
      color: TEAL,
      background: "#ffffff",
    }}
  >
    Instagram
  </span>

  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
    Check Out Our Instagram Page
  </h2>
  <p
    className="mt-3 text-base sm:text-lg"
    style={{ color: "rgba(20,21,23,0.72)" }}
  >
    Follow our latest projects, news, and updates through regular posts.
  </p>

  <div className="mt-7 flex flex-wrap gap-3">
    <a
      href="https://www.instagram.com/dndcyprus/"
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
      style={{ background: TEAL, color: "#fff", boxShadow: `0 10px 22px ${TEAL}33` }}
    >
      Follow on Instagram
    </a>
    <a
      href="/en/contact"
      className="px-6 py-2.5 rounded-full text-sm font-medium"
      style={{
        background: `${ORANGE}0`,
        color: ORANGE,
        border: `1px solid ${ORANGE}33`,
      }}
    >
      Contact Us
    </a>
  </div>
</motion.div>


            {/* RIGHT — vertically centered viewport; long captions clipped */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.35 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative flex h-full w-full flex-col items-center justify-center py-4">
                {/* Telefon sabit; oklar hemen yanında */}
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Previous post"
                    onClick={() => go(-1)}
                    className="absolute -left-[52px] sm:-left-16 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white transition hover:scale-105"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" stroke="#141517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <IgPhone post={IG_POSTS[idx]} labels={IG_LABELS} />
                  <button
                    type="button"
                    aria-label="Next post"
                    onClick={() => go(1)}
                    className="absolute -right-[52px] sm:-right-16 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white transition hover:scale-105"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" stroke="#141517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  {IG_POSTS.map((p, i) => (
                    <button
                      key={p.url}
                      type="button"
                      aria-label={`Post ${i + 1}`}
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
