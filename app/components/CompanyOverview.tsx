// app/components/CompanyOverview.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type StyleWithVars = React.CSSProperties & {
  ["--stroke"]?: string;
  ["--glass"]?: string;
  ["--ink"]?: string;
  ["--muted"]?: string;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CompanyOverview() {
  const sectionStyle: StyleWithVars = {
    background: "#ffffff",
    color: "#141517",
    "--stroke": "rgba(20,21,23,0.10)",
    "--glass": "rgba(255,255,255,0.66)",
    "--ink": "#141517",
    "--muted": "rgba(20,21,23,0.65)",
  };

  return (
    <section
      aria-label="Şirket Hakkında"
      className="relative overflow-hidden bg-white"
      style={sectionStyle}
    >
      {/* Background layers */}
          <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(30rem 20rem at 12% 100%, ${TEAL}12, transparent 70%),
            radial-gradient(26rem 18rem at 88% 0%, ${ORANGE}12, transparent 70%)
          `,
        }}
      />
      {/* Subtle noise */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* HEADER ROW */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          {/* TEXT */}
          <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full shadow-sm"
                style={{
                  background: "#fff",
                  border: "1px solid var(--stroke)",
                  backdropFilter: "blur(8px)",
                  color: TEAL,
                }}
              >
                DND Cyprus
              </span>

              <span
                className="inline-flex items-center text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-full"
                style={{
                  background: `${TEAL}12`,
                  border: `1px solid ${TEAL}33`,
                  color: TEAL,
                }}
              >
                Güven • Tasarım • Sürdürülebilirlik
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-[color:var(--ink)]">
              Şirket Hakkında
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-[color:var(--muted)]">
              Kuzey Kıbrıs’ta estetik mimariyi çağdaş yaşamla buluşturan, ölçekten bağımsız
              projeler geliştiriyoruz. Misyonumuz; güvenli, işlevsel ve çevreye duyarlı
              yaşam alanları üretmek ve süreci şeffaf şekilde yönetmek.
            </p>

            {/* Focus chips */}
            <div className="flex flex-wrap gap-2.5">
              {[
                "Tasarım odaklı yaklaşım",
                "Şeffaf süreç & iletişim",
                "Yerel, güvenilir iş ortaklıkları",
                "Sürdürülebilir malzeme tercihleri",
              ].map((b) => (
                <motion.span
                  key={b}
                  variants={scaleIn}
                  className="text-sm px-3.5 py-1.5 rounded-full"
                  style={{
                    background: "var(--glass)",
                    border: "1px solid var(--stroke)",
                    boxShadow:
                      "inset 0 1px rgba(255,255,255,0.6), 0 10px 28px rgba(0,0,0,0.06)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    color: "#141517",
                  }}
                >
                  {b}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* HERO IMAGE CARD */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <div
              className="rounded-2xl overflow-hidden group border"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.70))",
                border: "1px solid var(--stroke)",
                boxShadow:
                  "0 16px 40px rgba(0,0,0,0.06), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="relative w-full overflow-hidden">
                <div className="aspect-[16/10]">
                  <Image
                    src="/A7405743_.jpg"
                    alt="DND New Year Gala"
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                </div>

                {/* top subtle frame */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-[color:var(--stroke)] rounded-2xl" />
              </div>

              <div className="p-4 flex items-center justify-between">
                <span className="text-sm text-[color:var(--muted)]">DND New Year Gala</span>
                <span
                  className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full"
                  style={{ background: `${TEAL}14`, color: TEAL, border: `1px solid ${TEAL}33` }}
                >
                  • 2023
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* PILLAR CARDS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Şeffaf Planlama",
                desc: "Bütçe, zaman ve kapsam netliği; her aşamada görünür süreç.",
                c: TEAL,
              },
              {
                title: "Saha Disiplini",
                desc: "Güvenlik ve kalite kontrolleriyle tutarlı uygulama.",
                c: ORANGE,
              },
              {
                title: "Tedarik Güvencesi",
                desc: "Yerel ve güvenilir tedarikçilerle sürdürülebilir akış.",
                c: TEAL,
              },
              {
                title: "Tasarım Tutarlılığı",
                desc: "İşlevsel planlama ve estetik dengeyi koruyan üretim.",
                c: ORANGE,
              },
            ].map((m, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="rounded-2xl p-5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.62))",
                  border: "1px solid var(--stroke)",
                  boxShadow:
                    "0 12px 32px rgba(0,0,0,0.06), inset 0 1px rgba(255,255,255,0.6)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="text-base sm:text-lg font-semibold" style={{ color: m.c }}>
                  {m.title}
                </div>
                <div className="text-sm mt-1.5 text-[color:var(--muted)]">{m.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* STORY + WHAT WE DO */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* STORY / APPROACH */}
          <motion.div variants={fadeUp} className="lg:col-span-6">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.80), rgba(255,255,255,0.64))",
                border: "1px solid var(--stroke)",
                boxShadow:
                  "0 16px 40px rgba(0,0,0,0.06), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: TEAL }}>
                Yaklaşımımız
              </h3>
              <p className="leading-relaxed text-[color:var(--muted)]">
                Fikir aşamasından teslimata kadar süreci uçtan uca yönetiriz. Planlama,
                maliyet kontrolü, güvenlik standartları ve kalite yönetimi ile
                her adımı anlaşılır ve izlenebilir kılarız.
              </p>

              {/* IMAGE SLOT B */}
      

              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {[
                  "Değer mühendisliği & maliyet kontrolü",
                  "Güvenlik odaklı saha yönetimi",
                  "Yerel ve güvenilir tedarik zinciri",
                  "Şeffaf müşteri iletişimi",
                ].map((i, k) => (
                  <li key={k} className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: k % 2 === 0 ? TEAL : ORANGE }}
                    />
                    <span className="text-[color:var(--ink)]/80">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* WHAT WE DO */}
          <motion.div variants={fadeUp} className="lg:col-span-6">
            <div
              className="rounded-2xl p-6 sm:p-8 h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.80), rgba(255,255,255,0.64))",
                border: "1px solid var(--stroke)",
                boxShadow:
                  "0 16px 40px rgba(0,0,0,0.06), inset 0 1px rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: ORANGE }}>
                Neler Yapıyoruz
              </h3>
              <p className="leading-relaxed text-[color:var(--muted)]">
                Konut, ticari, turizm ve eğitim odaklı projeler geliştiriyoruz. Her projede
                kalite, estetik ve sürdürülebilirliği önceliklendiriyoruz.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { t: "Konut", s: "Apartman & villa projeleri", c: TEAL },
                  { t: "Ticari", s: "Ofis & perakende", c: ORANGE },
                  { t: "Turizm", s: "Otel & Beach Club", c: TEAL },
                  { t: "Eğitim", s: "Akademi projeleri", c: ORANGE },
                ].map((item) => (
                  <motion.div
                    key={item.t}
                    variants={scaleIn}
                    className="rounded-xl p-4 transition-transform will-change-transform"
                    style={{
                      background: "rgba(255,255,255,0.78)",
                      border: "1px solid var(--stroke)",
                      boxShadow:
                        "0 10px 24px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                    }}
                    whileHover={{ y: -3, scale: 1.01 }}
                  >
                    <div className="font-medium" style={{ color: item.c }}>
                      {item.t}
                    </div>
                    <div className="text-sm text-[color:var(--muted)]">{item.s}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* PARTNERS / LOGOS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-14"
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <h4 className="text-sm uppercase tracking-wider text-[color:var(--ink)]/60">
              Marka ve Projeler
            </h4>
            <div className="h-px flex-1 bg-[color:var(--stroke)]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {[
              "/DND-LOGO-2.svg",
              "/logos/dndhomes.png",
              "/logos/dndgroup.png",
              "/logos/lagoon.png",
              "/logos/lajoya.png",
              "/logos/mariachi.png",
              "/logos/perla.png",
              "/logos/perlaii.png",
            ].map((src, i) => (
              <div
                key={src + i}
                className="rounded-xl border bg-white/90 p-4 flex items-center justify-center"
                style={{ borderColor: "var(--stroke)" }}
                aria-label={`Logo ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`Logo ${i + 1}`}
                  width={140}
                  height={40}
                  className="h-8 sm:h-9 w-auto object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between"
        >
          <p className="text-[color:var(--muted)]">
            Daha detaylı bilgi almak için iletişime geçin.
          </p>

          <motion.a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 border text-white"
            style={{
              background: `linear-gradient(180deg, ${TEAL}, ${TEAL})`,
              borderColor: `${TEAL}55`,
              boxShadow: `0 10px 28px ${TEAL}40`,
            }}
            whileHover={{
              backgroundColor: ORANGE,
              boxShadow: `0 12px 30px ${ORANGE}40`,
              y: -1.5,
            }}
            whileTap={{ scale: 0.98 }}
          >
            Bize Ulaşın
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
