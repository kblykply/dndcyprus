// app/components/projects/Perla2Amenities.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

type FeatureGroup = {
  id: string;
  title: string;
  items: string[];
  accent?: "teal" | "orange";
};

type Props = {
  title?: string;
  subtitle?: string;
  groups?: FeatureGroup[];
  brochureHref?: string;
};

export default function Perla2Amenities({
  title = "Özellikler ve Donatılar",
  subtitle = "Sosyal alanlardan teknik altyapıya kadar günlük yaşamı kolaylaştıran, değer katan özellikler.",
  brochureHref = "/files/la-joya-perla-2-brosur.pdf",
  groups = DEFAULT_GROUPS,
}: Props) {
  return (
    <section
      aria-label="La Joya Perla II — Özellikler"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517", ["--stroke" as any]: "rgba(20,21,23,0.08)" }}
    >
      {/* subtle brand wash */}
 

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* groups grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {groups.map((g, i) => {
            const color = g.accent === "orange" ? ORANGE : TEAL;
            return (
              <motion.article
                key={g.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                custom={i + 1}
                className="rounded-2xl p-6"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))",
                  border: "1px solid var(--stroke)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full"
                  style={{ background: `${color}14`, color, border: `1px solid ${color}33` }}
                >
                  {g.title}
                </div>

                <ul className="mt-3 space-y-2">
                  {g.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-1 inline-block h-2.5 w-2.5 rounded-full"
                        style={{ background: idx % 2 === 0 ? color : "rgba(20,21,23,0.4)" }}
                      />
                      <span className="text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.78)" }}>
                        {it}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        {/* bottom note + brochure */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          custom={groups.length + 2}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <p className="text-xs" style={{ color: "rgba(20,21,23,0.55)" }}>
            * Özellikler tip ve bloklara göre farklılık gösterebilir. Güncel liste için satış ekibimizle iletişime geçiniz.
          </p>

          {brochureHref ? (
            <a
              href={brochureHref}
              className="rounded-xl px-5 py-2.5 text-sm font-medium"
              style={{
                background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
                color: "#fff",
                border: `1px solid ${TEAL}55`,
                boxShadow: `0 10px 28px ${TEAL}40`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`)
              }
            >
              Broşür İndir (PDF)
            </a>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

/* ================= Default feature content (edit freely) ================= */
const DEFAULT_GROUPS: FeatureGroup[] = [
  {
    id: "residence",
    title: "Konut & Yaşam",
    accent: "teal",
    items: [
      "Verimli daire planları, doğal ışık",
      "Geniş balkon/teras seçenekleri",
      "Kaliteli iç mekân malzemeleri",
      "Açık/kapalı otopark",
    ],
  },
  {
    id: "social",
    title: "Sosyal Alanlar",
    accent: "orange",
    items: [
      "Yüzme havuzu ve güneşlenme terası",
      "Fitness alanı",
      "Çocuk oyun alanı",
      "Peyzajlı yeşil alanlar",
    ],
  },
  {
    id: "security",
    title: "Güvenlik",
    accent: "teal",
    items: [
      "Site giriş kontrolü",
      "24/7 kamera altyapısı",
      "Yangın algılama ve alarm",
      "Acil çıkış planları",
    ],
  },
  {
    id: "technical",
    title: "Teknik Altyapı",
    accent: "orange",
    items: [
      "Merkezi uydu/internet altyapısı",
      "Asansörler ve engelli erişimi",
      "Isı/ses yalıtımı projeye uygun",
      "Kaliteli elektrik/sıhhi tesisat",
    ],
  },
  {
    id: "sustainability",
    title: "Sürdürülebilirlik",
    accent: "teal",
    items: [
      "Enerji verimli cephe ve doğrama",
      "Güneş ışığından maksimum fayda",
      "Su tasarruflu armatürler",
      "Atık ayrıştırmaya uygun alanlar",
    ],
  },
  {
    id: "location",
    title: "Konum & Erişim",
    accent: "orange",
    items: [
      "Long Beach’e kolay erişim",
      "Market, restoran ve günlük ihtiyaç noktaları",
      "Toplu taşıma/ana arterlere yakın",
      "Havalimanına erişim (planlanan rota üzerinden)",
    ],
  },
];
