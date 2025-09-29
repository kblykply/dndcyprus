// app/components/TimelineHorizontal.tsx
"use client";

import Image from "next/image";
import React, { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion, useInView, useReducedMotion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Milestone = {
  year: string;
  title: string;
  description: string;
  image?: string;
  color?: "teal" | "orange";
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  milestones?: Milestone[];
  bgSrc?: string;     // background image (like your example)
  bgAlt?: string;
};

export default function TimelineHorizontal({
  kicker = "DND Cyprus",
  title = "Yolculuğumuz",
  subtitle = "Önemli kilometre taşlarımızı gezinerek keşfedin.",
  milestones = DEFAULT_MILESTONES,
  bgSrc = "/lagoon-verde/8.jpg",
  bgAlt = "DND projeleri arka plan",
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px", amount: 0.3 });
  const reduced = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;
  const D = reduced ? 0.001 : 0.6;

  const rise = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduced ? 0 : 18, filter: "blur(6px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: D, ease },
      },
    }),
    [D, ease, reduced]
  );

  const fadeScale = useMemo(
    () => ({
      hidden: { opacity: 0, scale: reduced ? 1 : 0.985 },
      show: { opacity: 1, scale: 1, transition: { duration: D, ease, delay: 0.05 } },
    }),
    [D, ease, reduced]
  );

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative isolate min-h-[70vh] overflow-hidden text-white"
      aria-label="DND Timeline"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image src={bgSrc} alt={bgAlt} fill sizes="100vw" className="object-cover" />
        {/* Scrim for readability — same vibe as your example */}
        <div className="absolute inset-0 bg-black/35 md:bg-black/30" aria-hidden />
        {/* Brand glows */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background: `
              radial-gradient(34rem 22rem at 10% 0%, ${TEAL}18, transparent 70%),
              radial-gradient(28rem 18rem at 90% 100%, ${ORANGE}16, transparent 70%)
            `,
            mixBlendMode: "screen",
            opacity: 0.9,
          }}
        />
        {/* Subtle noise */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,\
              <svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22>\
              <filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%221%22 stitchTiles=%22stitch%22/></filter>\
              <rect width=%2240%22 height=%2240%22 filter=%22url(%23n)%22 opacity=%220.15%22/></svg>')",
          }}
          aria-hidden
        />
      </div>

      {/* Content container */}
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-12 lg:py-28">
        {/* Header (matches your example component style) */}
        <motion.div
          variants={rise}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span
              className="h-[2px] w-12 rounded-full flex-none"
              style={{ backgroundColor: TEAL }}
              aria-hidden
            />
            <span className="text-[11px] md:text-[12px] font-semibold tracking-[0.22em] uppercase text-white/80">
              {kicker}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">{title}</h2>
          <p className="mt-3 text-[15px] md:text-base text-white/90">{subtitle}</p>
        </motion.div>

        {/* Timeline rail */}
        <div className="relative mt-12 md:mt-16">
          <motion.div
            variants={fadeScale}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="absolute left-0 right-0 top-1/2 h-[3px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.28), rgba(255,255,255,0.14))",
            }}
          />

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 36 },
              1280: { slidesPerView: 3, spaceBetween: 40 },
            }}
          >
            {milestones.map((m, i) => {
              const keyColor = m.color ?? (i % 2 ? "orange" : "teal");
              const c = keyColor === "orange" ? ORANGE : TEAL;
              const above = i % 2 === 0;

              return (
                <SwiperSlide key={`${m.year}-${i}`} className="pt-20 pb-20">
                  <motion.div
                    variants={rise}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Connector dot with brand glow */}
                    <div
                      className="absolute top-1/2 z-10 h-5 w-5 rounded-full border-4"
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        borderColor: c,
                        boxShadow: `0 0 0 8px ${c}24, 0 6px 24px ${c}33`,
                      }}
                    />

                    {/* Glass card — same glass recipe as your example */}
                    <div
                      className={[
                        "w-full max-w-sm overflow-hidden rounded-2xl border ring-1 shadow-[0_8px_40px_rgba(0,0,0,0.25)]",
                        "bg-white/10 supports-[backdrop-filter]:backdrop-blur-xl",
                        "border-white/20 ring-white/10",
                        above ? "mb-auto -translate-y-10" : "mt-auto translate-y-10",
                      ].join(" ")}
                      style={{ WebkitBackdropFilter: "blur(18px)" }}
                    >
                      {m.image && (
                        <div className="h-44 w-full relative overflow-hidden">
                          <img
                            src={m.image}
                            alt={m.title}
                            className="h-full w-full object-cover"
                            style={{ filter: "saturate(1.02) contrast(1.02) brightness(0.95)" }}
                          />
                          {/* subtle gloss */}
                          <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0))",
                            }}
                          />
                        </div>
                      )}

                      <div className="p-5">
                        <span
                          className="inline-flex text-[11px] px-3 py-1 rounded-full border"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            color: "#ffff",
                            borderColor: `${c}44`,
                          }}
                        >
                          {m.year}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold text-white">{m.title}</h3>
                        <p className="mt-2 text-sm text-white/85 leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* Swiper nav color tweaks to fit dark glass theme */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.4);
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 18px;
          font-weight: 700;
        }
      `}</style>
    </section>
  );
}

export const DEFAULT_MILESTONES: Milestone[] = [
  {
    year: "2017",
    title: "DND Homes Kuruluşu",
    description: "Şirketin ilk merkezi Boston’da kuruldu.",
    image: "/dnd-boston-ofis.png",
    color: "teal",
  },
  {
    year: "2017",
    title: "Amerika’daki İlk Proje",
    description: "12 Longfellow Road, Lexington projesi hayata geçirildi.",
    image: "/12lex.jpg",
    color: "orange",
  },
  {
    year: "2018",
    title: "Ozan Dökmecioğlu Ödülü",
    description: "Boston Business Journal tarafından “Yılın CFO’su” seçildi.",
    image: "/ozan-dokmecioglu-cfo-of-the-year.jpg",
    color: "teal",
  },
  {
    year: "2023",
    title: "DND Kıbrıs Kuruluşu",
    description: "Kıbrıs’ta yeni operasyon merkezi açıldı.",
    image: "/kurulus.JPG",
    color: "orange",
  },
  {
    year: "2025",
    title: "Property NC Ödülleri",
    description: "“En İyi Çıkış Yapan Şirket” ödülüne layık görüldü.",
    image: "/property_awards_2025-747.jpg",
    color: "teal",
  },
  {
    year: "2025",
    title: "İlk Proje La Joya Teslimi",
    description: "La Joya projesi tamamlanarak teslim edildi.",
    image: "/la-joya/2.jpg",
    color: "orange",
  },
];
