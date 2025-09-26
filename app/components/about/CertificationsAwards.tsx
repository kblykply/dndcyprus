// app/components/CertificationsAwards.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, FileDown } from "lucide-react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type ItemType = "Certification" | "Award";

export type CertAwardItem = {
  id: string;
  type: ItemType;             // "Certification" | "Award"
  title: string;              // e.g., "ISO 9001:2015 Quality Management"
  issuer: string;             // e.g., "TÜV Rheinland"
  year?: string;              // e.g., "2024"
  image?: string;             // IMAGE SLOT (badge/certificate)
  fileUrl?: string;           // optional downloadable PDF/image of certificate
  accent?: "teal" | "orange"; // card accent color
  note?: string;              // short description
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  items?: CertAwardItem[];
  showTabs?: boolean;
};

const head: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45 } },
};

const cardPresence: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
  exit:   { opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.2 } },
};

export default function CertificationsAwards({
  kicker = "DND Cyprus",
  title = "Ödüller",
  subtitle = "Kalite, güvenlik ve sürdürülebilirlik alanındaki standartlarımız ve başarılarımız.",
  showTabs = true,
  items = [
    {
      id: "iso9001",
      type: "Certification",
      title: "ISO 9001:2015 Kalite Yönetimi",
      issuer: "TÜV Rheinland",
      year: "2024",
      image: "/BEST-NEWCOMER.png",
      fileUrl: "/files/certificates/iso9001.pdf",
      accent: "teal",
      note: "Sistematik kalite güvencesi ve sürekli iyileştirme.",
    },
    {
      id: "iso14001",
      type: "Certification",
      title: "ISO 14001:2015 Çevre Yönetimi",
      issuer: "SGS",
      year: "2024",
      image: "/BEST-NEWCOMER.png",
      fileUrl: "/files/certificates/iso14001.pdf",
      accent: "teal",
      note: "Enerji verimliliği ve çevresel performans odağı.",
    },
    {
      id: "iso45001",
      type: "Certification",
      title: "ISO 45001:2018 İş Sağlığı ve Güvenliği",
      issuer: "Bureau Veritas",
      year: "2024",
      image: "/BEST-NEWCOMER.png",
      fileUrl: "/files/certificates/iso45001.pdf",
      accent: "teal",
      note: "HSE kültürü ve sahada güvenli operasyon.",
    },
    {
      id: "award1",
      type: "Award",
      title: "Yılın Projesi",
      issuer: "Construction Awards Cyprus",
      year: "2023",
      image: "/BEST-NEWCOMER.png",
      accent: "orange",
      note: "Mimari estetik ve teslim performansı.",
    },
    {
      id: "award2",
      type: "Award",
      title: "Sürdürülebilir Tasarım Ödülü",
      issuer: "Green Build Europe",
      year: "2022",
      image: "/BEST-NEWCOMER.png",
      accent: "orange",
      note: "Düşük karbon ayak izi ve verimli tasarım.",
    },
  ],
}: Props) {
  const [tab, setTab] = useState<ItemType | "All">("All");

  const tabs: Array<ItemType | "All"> = useMemo(
    () => ["All", "Certification", "Award"],
    []
  );

  const filtered = useMemo(() => {
    if (tab === "All") return items;
    return items.filter((i) => i.type === tab);
  }, [items, tab]);

  // quick counts for header badges
  const counts = useMemo(() => {
    return {
      certs: items.filter((i) => i.type === "Certification").length,
      awards: items.filter((i) => i.type === "Award").length,
    };
  }, [items]);

  return (
    <section
      aria-label="Sertifikalar ve Ödüller"
      className="relative overflow-hidden bg-white"
      style={{
  background: "#ffffff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}

    >


        <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(30rem 20rem at 12% 0%, ${TEAL}12, transparent 70%),
            radial-gradient(26rem 18rem at 88% 100%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />
    

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          variants={head}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="text-left max-w-2xl"
        >
          <span
            className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(20,21,23,0.05)",
              border: "1px solid var(--stroke)",
              color: TEAL,
              backdropFilter: "blur(8px)",
            }}
          >
            {kicker}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            {title}
          </h2>
          <p className="mt-2 text-base sm:text-lg" style={{ color: "rgba(20,21,23,0.65)" }}>
            {subtitle}
          </p>

          {/* quick counters */}
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
            >
              <ShieldCheck size={14} /> {counts.certs} Sertifika
            </span>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ background: `${ORANGE}14`, color: ORANGE, border: `1px solid ${ORANGE}33` }}
            >
              <Award size={14} /> {counts.awards} Ödül
            </span>
          </div>
        </motion.div>

        {/* Tabs / Filters */}
        {showTabs && (
          <div className="mt-8 flex flex-wrap gap-2">
            {tabs.map((t) => {
              const isActive = tab === t;
              const color = t === "Award" ? ORANGE : TEAL;
              return (
                <button
                  key={String(t)}
                  onClick={() => setTab(t)}
                  className="text-xs sm:text-sm px-3 py-1 rounded-full transition-colors"
                  style={{
                    background: isActive ? color : "rgba(20,21,23,0.05)",
                    color: isActive ? "#fff" : "rgba(20,21,23,0.75)",
                    border: isActive ? `1px solid ${color}AA` : "1px solid var(--stroke)",
                    boxShadow: isActive ? `0 6px 18px ${color}40` : "none",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {t === "All" ? "Tümü" : t === "Certification" ? "Sertifikalar" : "Ödüller"}
                </button>
              );
            })}
          </div>
        )}

        {/* Grid */}
        <motion.div layout className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((i) => {
              const color = i.accent === "orange" || i.type === "Award" ? ORANGE : TEAL;
              return (
                <motion.article
                  key={i.id}
                  layout
                  variants={cardPresence}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                    border: "1px solid var(--stroke)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* IMAGE SLOT */}
                  <div className="relative w-full h-48 bg-white">
                    <img
                      src={i.image || "/images/certificates/placeholder.png"}
                      alt={i.title}
                      className="w-full h-full object-contain p-4"
                      loading="lazy"
                    />
                    <span
                      className="absolute left-3 top-3 text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: `${color}14`, color, border: `1px solid ${color}33` }}
                    >
                      {i.type === "Certification" ? "Sertifika" : "Ödül"}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{i.title}</h3>
                    <div className="mt-1 text-sm" style={{ color: "rgba(20,21,23,0.7)" }}>
                      {i.issuer} {i.year ? `• ${i.year}` : ""}
                    </div>
                    {i.note ? (
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(20,21,23,0.65)" }}>
                        {i.note}
                      </p>
                    ) : null}

                    {/* download */}
                    <div className="mt-3">
                      {i.fileUrl ? (
                        <a
                          href={i.fileUrl}
                          className="inline-flex items-center gap-2 text-sm"
                          download
                          style={{ color }}
                        >
                          <FileDown size={16} />
                          Belgeyi İndir
                        </a>
                      ) : (
                        <span className="text-xs" style={{ color: "rgba(20,21,23,0.5)" }}>
                          *Belge bağlantısı mevcut değil
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <p style={{ color: "rgba(20,21,23,0.65)" }}>
            Sertifikalarımız ve ödüllerimiz hakkında detaylı bilgi almak için bize ulaşın.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3"
            style={{
              background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
              color: "#fff",
              boxShadow: `0 10px 28px ${TEAL}40`,
              border: `1px solid ${TEAL}55`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = `linear-gradient(180deg, ${ORANGE}, ${ORANGE})`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = `linear-gradient(180deg, ${TEAL}, ${TEAL})`)
            }
          >
            İletişime Geçin
          </a>
        </div>
      </div>
    </section>
  );
}
