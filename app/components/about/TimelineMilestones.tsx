// app/components/TimelineHorizontal.tsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

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
};

export default function TimelineHorizontal({
  kicker = "DND Cyprus",
  title = "Yolculuğumuz",
  subtitle = "Önemli kilometre taşlarımızı gezinerek keşfedin.",
  milestones = DEFAULT_MILESTONES,
}: Props) {
  return (
    <section className="relative bg-white text-[#141517]">
      {/* Subtle background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(32rem 20rem at 12% 0%, ${TEAL}10, transparent 70%),
            radial-gradient(26rem 18rem at 88% 100%, ${ORANGE}10, transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span
            className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(20,21,23,0.05)",
              border: "1px solid rgba(20,21,23,0.08)",
              color: TEAL,
            }}
          >
            {kicker}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            {title}
          </h2>
          <p className="mt-2 text-base sm:text-lg text-black/60">{subtitle}</p>
        </div>

        {/* Horizontal line */}
        <div className="relative mt-16">
          <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--teal,#27959b)] to-[var(--orange,#f15c34)] opacity-40" />

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
          >
            {milestones.map((m, i) => {
              const keyColor = m.color ?? (i % 2 ? "orange" : "teal");
              const c = keyColor === "orange" ? ORANGE : TEAL;
              const above = i % 2 === 0; // alternate placement

              return (
                <SwiperSlide key={m.year + i} className="pt-20 pb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Connector dot */}
                    <div
                      className="absolute top-1/2 z-10 h-5 w-5 rounded-full border-4"
                      style={{
                        background: "#fff",
                        borderColor: c,
                        boxShadow: `0 0 0 6px ${c}33`,
                      }}
                    />

                    {/* Card */}
                    <div
                      className={`w-full max-w-sm rounded-2xl overflow-hidden shadow-md border ${
                        above ? "mb-auto -translate-y-10" : "mt-auto translate-y-10"
                      }`}
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.90))",
                        borderColor: `${c}33`,
                      }}
                    >
                      {m.image && (
                        <div className="h-40 w-full overflow-hidden">
                          <img
                            src={m.image}
                            alt={m.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: `${c}14`,
                            color: c,
                            border: `1px solid ${c}33`,
                          }}
                        >
                          {m.year}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold">{m.title}</h3>
                        <p className="mt-2 text-sm text-black/70 leading-relaxed">
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
    </section>
  );
}

const DEFAULT_MILESTONES: Milestone[] = [
  {
    year: "2005",
    title: "Kuruluş",
    description: "Kalite ve güveni merkeze alan bir yapıyla yola çıktık.",
    image: "/La Joya - 1.png",
    color: "teal",
  },
  {
    year: "2010",
    title: "İlk Kamu Projesi",
    description: "Altyapı ve kamusal alan projeleriyle ölçeğimizi büyüttük.",
    image: "/La Joya - 1.png",
    color: "orange",
  },
  {
    year: "2016",
    title: "Konut Portföyü",
    description: "Kuzey Kıbrıs genelinde modern konut projeleri geliştirdik.",
    image: "/La Joya - 1.png",
    color: "teal",
  },
  {
    year: "2020",
    title: "Sürdürülebilirlik",
    description: "Enerji verimliliği ve yeşil malzeme odağını artırdık.",
    image: "/La Joya - 1.png",
    color: "orange",
  },
  {
    year: "2024",
    title: "Yeni Dikeyler",
    description: "Turizm ve eğitim yatırımlarıyla çeşitlendirdik.",
    image: "/La Joya - 1.png",
    color: "teal",
  },
];
