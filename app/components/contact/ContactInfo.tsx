// app/components/ContactInfo.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type Office = {
  id: string;
  label: string;                // Örn: "Merkez Ofis"
  addressLines: string[];       // ["Mahalle/Sokak", "No / Kat", "İlçe / Şehir"]
  city?: string;
  country?: string;
  phone?: string;               // tel:+90...
  phoneDisplay?: string;        // +90 555 555 55 55
  email?: string;               // info@...
  hours?: string[];             // ["Hafta içi 09:00–18:00", "Cumartesi 10:00–16:00"]
  mapUrl?: string;              // Google Maps link
  whatsapp?: string;            // https://wa.me/90...
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  offices?: Office[];
  socials?: { label: string; href: string }[];
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ContactInfo({
  kicker = "DND Cyprus",
  title = "İletişim Bilgileri",
  subtitle = "Tüm sorularınız için bize ulaşın. En kısa sürede dönüş yaparız.",
  offices = [
    {
      id: "hq",
      label: "Merkez Ofis",
      addressLines: ["Örnek Cad. No: 12", "Lefkoşa, Kuzey Kıbrıs"],
      city: "Lefkoşa",
      country: "Kuzey Kıbrıs",
      phone: "tel:+905555555555",
      phoneDisplay: "+90 555 555 55 55",
      email: "mailto:info@dndcyprus.com",
      hours: ["Hafta içi 09:00–18:00"],
      mapUrl: "https://maps.google.com",
      whatsapp: "https://wa.me/905555555555",
    },
    {
      id: "sales",
      label: "Satış Ofisi",
      addressLines: ["Sahil Yolu 45", "İskele, Kuzey Kıbrıs"],
      city: "İskele",
      country: "Kuzey Kıbrıs",
      phone: "tel:+905555555556",
      phoneDisplay: "+90 555 555 55 56",
      email: "mailto:sales@dndcyprus.com",
      hours: ["Hafta içi 10:00–19:00", "Cumartesi 10:00–16:00"],
      mapUrl: "https://maps.google.com",
    },
  ],
  socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/yourpage" },
    { label: "Instagram", href: "https://instagram.com/yourpage" },
    { label: "X", href: "https://x.com/yourpage" },
    { label: "YouTube", href: "https://youtube.com/@yourpage" },
  ],
}: Props) {
  // Build SEO JSON-LD for Organization + locations
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DND Cyprus",
    url: "https://dndcyprus.com",
    email: offices.find(o => o.email)?.email?.replace("mailto:", ""),
    telephone: offices.find(o => o.phone)?.phone?.replace("tel:", ""),
    sameAs: socials?.map(s => s.href),
    department: offices.map(o => ({
      "@type": "LocalBusiness",
      name: `DND Cyprus — ${o.label}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: o.addressLines?.join(", "),
        addressLocality: o.city,
        addressCountry: o.country,
      },
      telephone: o.phone?.replace("tel:", ""),
      email: o.email?.replace("mailto:", ""),
      openingHours: o.hours?.join(", "),
      url: o.mapUrl,
    })),
  };

  return (
    <section
      aria-label="İletişim Bilgileri"
      className="relative overflow-hidden"
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
                radial-gradient(28rem 20rem at 15% 100%, ${TEAL}12, transparent 70%),
                radial-gradient(26rem 16rem at 85% 0%, ${ORANGE}14, transparent 70%)
            `,
            }}
        />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="max-w-2xl"
        >
          <span
            className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
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
        </motion.div>

        {/* Offices grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {offices.map((o, idx) => {
            const accent = idx % 2 === 0 ? TEAL : ORANGE;
            return (
              <motion.article
                key={o.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                className="rounded-2xl p-6 sm:p-7"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))",
                  border: "1px solid var(--stroke)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.05), inset 0 1px rgba(255,255,255,0.6)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{o.label}</h3>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: `${accent}14`,
                      color: accent,
                      border: `1px solid ${accent}33`,
                    }}
                  >
                    Ofis
                  </span>
                </div>

                {/* Address */}
                <div className="mt-3 text-sm" style={{ color: "rgba(20,21,23,0.7)" }}>
                  {o.addressLines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>

                {/* Hours */}
                {o.hours?.length ? (
                  <div className="mt-3">
                    <div className="text-xs uppercase tracking-wide" style={{ color: "rgba(20,21,23,0.55)" }}>
                      Çalışma Saatleri
                    </div>
                    <div className="mt-1 space-y-0.5 text-sm" style={{ color: "rgba(20,21,23,0.7)" }}>
                      {o.hours.map((h) => (
                        <div key={h}>{h}</div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Contacts */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {o.phone && (
                    <a
                      href={o.phone}
                      className="text-sm px-3 py-1 rounded-full transition-colors"
                      style={{
                        background: `${accent}14`,
                        color: accent,
                        border: `1px solid ${accent}33`,
                      }}
                    >
                      {o.phoneDisplay || o.phone.replace("tel:", "")}
                    </a>
                  )}
                  {o.email && (
                    <a
                      href={o.email}
                      className="text-sm px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgba(20,21,23,0.85)",
                        border: "1px solid var(--stroke)",
                      }}
                    >
                      {o.email.replace("mailto:", "")}
                    </a>
                  )}
                  {o.whatsapp && (
                    <a
                      href={o.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        color: ORANGE,
                        border: `1px solid ${ORANGE}55`,
                      }}
                    >
                      WhatsApp
                    </a>
                  )}
                  {o.mapUrl && (
                    <a
                      href={o.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgba(20,21,23,0.85)",
                        border: "1px solid var(--stroke)",
                      }}
                    >
                      Haritada Gör
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Socials */}
        {socials?.length ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            className="mt-10"
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <h4 className="text-sm uppercase tracking-wider" style={{ color: "rgba(20,21,23,0.6)" }}>
                Sosyal Medya
              </h4>
              <div className="h-px flex-1" style={{ background: "var(--stroke)" }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "rgba(20,21,23,0.85)",
                    border: "1px solid var(--stroke)",
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
