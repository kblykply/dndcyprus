// app/components/LeadershipTeam.tsx
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";
import { m as motion, Variants, AnimatePresence } from "framer-motion";

const TEAL = "#0d6570";
const ORANGE = "#cd4824";

// Kategori adları veride İngilizce tutulur (filtre anahtarı); ekranda sayfanın dilinde gösterilir
const CATEGORY_LABELS: Record<string, string> = {
  All: "Alle",
  Leadership: "Leitung",
  Architecture: "Architektur",
  Engineering: "Ingenieurwesen",
  Operations: "Betrieb",
  Finance: "Finanzen",
  Sales: "Vertrieb",
  Marketing: "Marketing",
};

type Socials = {
  linkedin?: string;
  instagram?: string;
  x?: string;
  website?: string;
};

export type Member = {
  id: string; // ✅ stable key required for AnimatePresence
  name: string;
  role: string;
  category: "Leadership" | "Architecture" | "Engineering" | "Operations" | "Finance" | "Sales" | string;
  photo?: string;
  bio?: string;
  socials?: Socials;
  accent?: "teal" | "orange";
    sortOrder?: number; // 👈 add this
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  members?: Member[];
  showHeader?: boolean;
};

// ✅ Presence variants for filter add/remove
const cardPresence: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28 } },
  exit:   { opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.2 } },
};

function Badge({ label, active, color, onClick }: { label: string; active?: boolean; color?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-[13px] font-medium px-3.5 py-2 rounded-full transition-colors whitespace-nowrap"
      style={{
        background: active ? "var(--sea)" : "rgba(255,255,255,0.7)",
        color: active ? "#fff" : "var(--ink-60)",
        border: active ? "1px solid var(--sea)" : "1px solid rgba(255,255,255,0.9)",
        boxShadow: active ? "0 8px 24px rgba(13,101,112,0.28)" : "none",
      }}
    >
      {label}
    </button>
  );
}

function SocialLink({ href, label }: { href?: string; label: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-xs underline underline-offset-4 hover:opacity-80"
      style={{ color: "rgba(13,35,38,0.7)" }}
    >
      {label}
    </a>
  );
}

export default function LeadershipTeam({
 kicker = "DND Cyprus",
title = "Unser Team",
subtitle =
  "Hinter dem Erfolg jedes Projekts steht die Professionalität unseres Teams – unser stärkstes Fundament.",
  showHeader = true,
members = [
  {
    id: "ozan",
    name: "Ozan Dökmecioğlu",
    role: "Vorstandsvorsitzender",
    category: "Führung",
    photo: "/teams/ozan.png",
    bio: "Gründer des Unternehmens und dessen visionärer Kopf.",
    socials: {},
    accent: "teal",
    sortOrder: 1,
  },
  {
    id: "aynur",
    name: "Aynur Zorba Güloğlu",
    role: "Direktorin & Architektin",
    category: "Führung",
    photo: "/teams/aynurzorbagulol.png",
    bio: "Verantwortlich für Management und strategische Planung.",
    socials: {},
    accent: "orange",
    sortOrder: 2,
  },


  {
    id: "burcin",
    name: "Burçin Gül",
    role: "Baukoordination",
    category: "Technik",
    photo: "/teams/burcingul.png",
    bio: "Koordiniert die Bauprojekte.",
    socials: {},
    accent: "teal",
    sortOrder: 3,
  },
  {
    id: "borhan",
    name: "Borhan Ghasemzadeh",
    role: "Vertriebsleiter",
    category: "Vertrieb",
    photo: "/teams/borhan.png",
    bio: "Verantwortlich für die gesamte Vertriebsstrategie.",
    socials: {},
    accent: "orange",
    sortOrder: 4,
  },
  {
    id: "sabina",
    name: "Sabina Rahimova",
    role: "Sales Manager",
    category: "Vertrieb",
    photo: "/teams/sabina.png",
    bio: "Leitet die Vertriebsaktivitäten.",
    socials: {},
    accent: "teal",
    sortOrder: 6,
  },
  {
    id: "shadi",
    name: "Shadi Maghfoori",
    role: "Sales Manager",
    category: "Vertrieb",
    photo: "/teams/shadi.png",
    bio: "Führungskraft im Vertrieb.",
    socials: {},
    accent: "orange",
    sortOrder: 7,
  },
  {
    id: "bob",
    name: "Bob Porpiev",
    role: "Vertriebsmitarbeiter",
    category: "Vertrieb",
    photo: "/teams/bob.png",
    bio: "Verantwortlich für Kundenbeziehungen und Verkauf.",
    socials: {},
    accent: "teal",
    sortOrder: 9,
  },
  {
    id: "onur_y",
    name: "Onur Yalçın",
    role: "Ingenieur",
    category: "Technik",
    photo: "/teams/onuryalcin.png",
    bio: "Verantwortlich für die technische Projektplanung.",
    socials: {},
    accent: "teal",
    sortOrder: 26,
  },
  {
    id: "shayan",
    name: "Shayan Karimi",
    role: "Vertriebsmitarbeiter",
    category: "Vertrieb",
    photo: "/teams/shayan.png",
    bio: "Begleitet Kunden durch den gesamten Verkaufsprozess.",
    socials: {},
    accent: "orange",
    sortOrder: 10,
  },
  {
    id: "onur_p",
    name: "Onur Pekkaya",
    role: "Vertrieb & Marketing Türkei",
    category: "Vertrieb",
    photo: "/teams/onur.png",
    bio: "",
    socials: {},
    accent: "teal",
    sortOrder: 8,
  },
  {
    id: "okan",
    name: "Okan Afşar",
    role: "Sales Manager",
    category: "Vertrieb",
    photo: "/teams/okan.png",
    bio: "Verantwortlich für die Vertriebsaktivitäten.",
    socials: {},
    accent: "orange",
    sortOrder: 13,
  },
  {
    id: "ava",
    name: "Ava Pasandideh",
    role: "After-Sales-Spezialistin",
    category: "Vertrieb",
    photo: "/teams/ava.png",
    bio: "Verantwortlich für den After-Sales-Service.",
    socials: {},
    accent: "teal",
    sortOrder: 11,
  },
  {
    id: "nevin",
    name: "Nevin Timoroğlu",
    role: "Architektin",
    category: "Architektur",
    photo: "/teams/nevin.png",
    bio: "Arbeitet an Entwurf und Umsetzung der Projekte.",
    socials: {},
    accent: "orange",
    sortOrder: 16,
  },
  {
    id: "meryem",
    name: "Meryem Hürmek",
    role: "Architektin",
    category: "Architektur",
    photo: "/teams/meryem.png",
    bio: "Arbeitet an Architekturprojekten.",
    socials: {},
    accent: "teal",
    sortOrder: 17,
  },
  {
    id: "ebru",
    name: "Ebru Atçı",
    role: "Werbespezialistin",
    category: "Marketing",
    photo: "/teams/ebru.png",
    bio: "Verantwortlich für Werbung und Promotion.",
    socials: {},
    accent: "orange",
    sortOrder: 18,
  },
  {
    id: "parmida",
    name: "Parmida Mesgari",
    role: "Videografin",
    category: "Marketing",
    photo: "/teams/placeholder.svg", // Portrait file is not available yet.
    bio: "Spezialistin für Videoproduktion und visuelle Inhalte.",
    socials: {},
    accent: "teal",
    sortOrder: 19,
  },
  {
    id: "mustafa",
    name: "Mustafa Muhtaroğlu",
    role: "Spezialist für Grundstücksverkauf",
    category: "Vertrieb",
    photo: "/teams/mustafa.png",
    bio: "Verantwortlich für den Verkauf von Grundstücken.",
    socials: {},
    accent: "teal",
    sortOrder: 12,
  },
  {
    id: "tanya",
    name: "Tanya Yıldırım",
    role: "Servicemitarbeiterin",
    category: "Betrieb",
    photo: "/teams/tanya.png",
    bio: "Verantwortlich für Service und Betreuung.",
    socials: {},
    accent: "orange",
    sortOrder: 30,
  },

  {
    id: "emineg",
    name: "Emine Güngör",
    role: "Servicemitarbeiterin La Joya",
    category: "Betrieb",
    photo: "/teams/placeholder.svg", // Portrait file is not available yet.
    bio: "Verantwortlich für Service und Betreuung.",
    socials: {},
    accent: "orange",
    sortOrder: 30,
  },
  
  {
    id: "bulent",
    name: "Bülent Çınar",
    role: "Leiter Finanzen",
    category: "Finanzen",
    photo: "/teams/bulent.png",
    bio: "Verantwortlich für die Finanzverwaltung.",
    socials: {},
    accent: "orange",
    sortOrder: 5,
  },
  {
    id: "gozde",
    name: "Gözde Onar",
    role: "Finanzspezialistin",
    category: "Finanzen",
    photo: "/teams/gozde.png",
    bio: "Verantwortlich für die Prozesse im Finanzmanagement.",
    socials: {},
    accent: "teal",
    sortOrder: 20,
  },
  {
    id: "emine",
    name: "Emine Akkuş",
    role: "Leiterin Buchhaltung",
    category: "Finanzen",
    photo: "/teams/emine.png",
    bio: "Verantwortlich für Buchhaltung und Finanzmanagement.",
    socials: {},
    accent: "orange",
    sortOrder: 5.4,
  },
  {
    id: "muhammed",
    name: "Muhammed Dinç",
    role: "Buchhaltungsspezialist",
    category: "Finanzen",
    photo: "/teams/mami.png",
    bio: "Verantwortlich für Buchführung und Buchhaltungsprozesse.",
    socials: {},
    accent: "teal",
    sortOrder: 22,
  },
  {
    id: "omer",
    name: "Ömer Dursun",
    role: "Leiter Technischer Service",
    category: "Technik",
    photo: "/teams/omer.png",
    bio: "Verantwortlich für technischen Service und Wartung.",
    socials: {},
    accent: "orange",
    sortOrder: 28,
  },
  {
    id: "yusuf",
    name: "Yusuf Yalçın",
    role: "Ingenieur",
    category: "Technik",
    photo: "/teams/yusuf.png",
    bio: "Arbeitet an Ingenieurprojekten.",
    socials: {},
    accent: "teal",
    sortOrder: 24,
  },
  {
    id: "rojina",
    name: "Rojina",
    role: "Ingenieurin",
    category: "Technik",
    photo: "/teams/rojina.png",
    bio: "Arbeitet im Bereich Technik.",
    socials: {},
    accent: "orange",
    sortOrder: 25,
  },
  {
    id: "hilal",
    name: "Syed Hilal Ahmed",
    role: "Ingenieur",
    category: "Technik",
    photo: "/teams/hilal.png",
    bio: "Verantwortlich für die technische Projektplanung.",
    socials: {},
    accent: "teal",
    sortOrder: 27,
  },


],


}: Props) {
  const [activeCat, setActiveCat] = useState<string>("Alle");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(members.map((m) => m.category)));
    return ["Alle", ...cats];
  }, [members]);

  const filtered = useMemo(() => {
    if (activeCat === "Alle") return members;
    return members.filter((m) => m.category === activeCat);
  }, [members, activeCat]);



  const sorted = useMemo(() => {
  return [...filtered].sort((a, b) => {
    const ao = a.sortOrder ?? 9999;
    const bo = b.sortOrder ?? 9999;
    return ao - bo;
  });
}, [filtered]);

 return (
  <section
    aria-label="Führung und Team"
    className="relative overflow-hidden bg-white"
  style={{
  background: "transparent",
  color: "#0d2326",
  ["--stroke"]: "rgba(13,35,38,0.08)",
} as React.CSSProperties & Record<"--stroke", string>}

  >
    {/* subtle accents */}
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

    <div className="relative mx-auto max-w-[1560px] px-[var(--gutter)] py-10 lg:py-14">
      {/* Header */}
      {showHeader && (<div
        className="text-left"
      >
        <span
          className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--stroke)",
            backdropFilter: "blur(8px)",
            color: TEAL,
          }}
        >
          {kicker}
        </span>

        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
          {title}
        </h2>

        <p className="mt-2 text-base sm:text-lg" style={{ color: "rgba(13,35,38,0.65)" }}>
          {subtitle}
        </p>
      </div>)}

      {/* Filters (sticky on mobile for easy nav) */}
      <div className="mt-2 sticky top-20 z-10 rounded-full border border-white/90 bg-white/75 px-3 shadow-[0_10px_30px_rgba(13,35,38,0.06)] backdrop-blur supports-[backdrop-filter]:backdrop-blur">
        <div className="flex justify-between gap-2 overflow-x-auto py-2 no-scrollbar">
          {categories.map((cat) => (
            <Badge
              key={cat}
              label={CATEGORY_LABELS[cat] ?? cat}
              active={activeCat === cat}
              color={undefined}
              onClick={() => setActiveCat(cat)}
            />
          ))}
        </div>
      </div>

      {/* FULL-IMAGE GRID */}
      <motion.div
        layout
        className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4"
      >
        <AnimatePresence initial={false} mode="popLayout">
          
          {sorted.map((m, index) => {
            const photoProps = {
              fill: true,
              src: m.photo || "/teams/okan.png",
              alt: m.name,
              quality: 75,
              sizes: "(min-width: 1280px) 224px, (min-width: 1024px) calc((100vw - 112px) / 3), (min-width: 640px) calc((100vw - 72px) / 2), calc((100vw - 44px) / 2)",
              className: "object-cover transition-transform duration-700 group-hover:scale-[1.05]",
            };
            return (
              <motion.article
                key={m.id}
                layout
                variants={cardPresence}
                initial={index === 0 ? false : "hidden"}
                animate="show"
                exit="exit"
                className="group relative overflow-hidden rounded-[28px] border border-white/90 bg-white shadow-[0_10px_40px_rgba(13,35,38,0.06)] transition-shadow hover:shadow-[0_30px_70px_rgba(13,35,38,0.14)]"
              >
                {/* Image */}
                <div className="relative aspect-[3/5] w-full">
                  {index === 0 ? (
                    <Image {...photoProps} fetchPriority="high" preload={activeCat === "Alle"} loading={activeCat === "Alle" ? undefined : "eager"} />
                  ) : <DeferredFillImage {...photoProps} />}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-50 group-hover:opacity-55 transition-opacity" />

                  {/* Category pill */}
                  <span
                    className="az-st absolute left-3 top-3 max-sm:hidden"
                  >
                    {CATEGORY_LABELS[m.category] ?? m.category}
                  </span>

                  {/* Info box on image */}
                  <div className="absolute inset-x-0 bottom-0 p-2 sm:p-5">
                    <div className="rounded-[18px] bg-white/85 backdrop-blur-md ring-1 ring-white/70 shadow-[0_8px_24px_rgba(13,35,38,0.14)] group-hover:translate-y-0 translate-y-1 transition-transform p-2.5 sm:p-4 sm:h-[110px]">
                      <h2 className="text-[13px] sm:text-[15px] leading-tight text-[var(--ink)]">{m.name}</h2>
                      <div className="text-[9.5px] sm:text-[11px] mt-1 uppercase tracking-[0.06em] sm:tracking-[0.08em] font-semibold text-[var(--sea)]">{m.role}</div>
                      {m.bio ? (
                        <p className="mt-1.5 hidden sm:block text-xs leading-relaxed text-[var(--ink-60)] line-clamp-2">
                          {m.bio}
                        </p>
                      ) : null}

                      {/* socials */}
                      <div className="mt-3 hidden sm:flex items-center gap-3 flex-wrap">
                        <SocialLink href={m.socials?.linkedin} label="LinkedIn" />
                        <SocialLink href={m.socials?.instagram} label="Instagram" />
                        <SocialLink href={m.socials?.x} label="X" />
                        <SocialLink href={m.socials?.website} label="Web" />
                      </div>
                    </div>
                  </div>

                  {/* subtle ring on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl ring-1 opacity-0 group-hover:opacity-100 transition"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(13,101,112,0.35)" }}
                  />
                </div>
              </motion.article>
            );
          })}

          
        </AnimatePresence>
      </motion.div>

  
    </div>
  </section>
);

}
