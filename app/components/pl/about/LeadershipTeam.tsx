// app/components/LeadershipTeam.tsx
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";
import { m as motion, Variants, AnimatePresence } from "framer-motion";

const TEAL = "#0d6570";
const ORANGE = "#f15c34";

// Display labels for the category filter keys (the keys themselves stay in English).
const CATEGORY_LABELS: Record<string, string> = {
  All: "Wszyscy",
  Leadership: "Zarząd",
  Architecture: "Architektura",
  Engineering: "Inżynieria",
  Operations: "Obsługa",
  Finance: "Finanse",
  Sales: "Sprzedaż",
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
title = "Nasz zespół",
subtitle =
  "Za każdym projektem stoi profesjonalizm naszego zespołu – to nasz najmocniejszy fundament.",
  showHeader = true,
members = [
  {
    id: "ozan",
    name: "Ozan Dökmecioğlu",
    role: "Prezes zarządu",
    category: "Leadership",
    photo: "/teams/ozan.png",
    bio: "Założyciel firmy i jej wizjoner.",
    socials: {},
    accent: "teal",
    sortOrder: 1,
  },
  {
    id: "aynur",
    name: "Aynur Zorba Güloğlu",
    role: "Dyrektor",
    category: "Leadership",
    photo: "/teams/aynurzorbagulol.png",
    bio: "Odpowiada za zarządzanie i planowanie strategiczne.",
    socials: {},
    accent: "orange",
    sortOrder: 2,
  },


  {
    id: "burcin",
    name: "Burçin Gül",
    role: "Koordynator budowy",
    category: "Engineering",
    photo: "/teams/burcingul.png",
    bio: "Koordynuje projekty budowlane.",
    socials: {},
    accent: "teal",
    sortOrder: 3,
  },
  {
    id: "borhan",
    name: "Borhan Ghasemzadeh",
    role: "Dyrektor sprzedaży",
    category: "Sales",
    photo: "/teams/borhan.png",
    bio: "Odpowiada za ogólną strategię sprzedaży.",
    socials: {},
    accent: "orange",
    sortOrder: 4,
  },
  {
    id: "sabina",
    name: "Sabina Rahimova",
    role: "Kierownik sprzedaży",
    category: "Sales",
    photo: "/teams/sabina.png",
    bio: "Kieruje działaniami sprzedażowymi.",
    socials: {},
    accent: "teal",
    sortOrder: 6,
  },
  {
    id: "shadi",
    name: "Shadi Maghfoori",
    role: "Kierownik sprzedaży",
    category: "Sales",
    photo: "/teams/shadi.png",
    bio: "Kierownik w dziale sprzedaży.",
    socials: {},
    accent: "orange",
    sortOrder: 7,
  },
  {
    id: "bob",
    name: "Bob Porpiev",
    role: "Przedstawiciel handlowy",
    category: "Sales",
    photo: "/teams/bob.png",
    bio: "Odpowiada za relacje z klientami i obsługę sprzedaży.",
    socials: {},
    accent: "teal",
    sortOrder: 9,
  },
  {
    id: "onur_y",
    name: "Onur Yalçın",
    role: "Inżynier",
    category: "Engineering",
    photo: "/teams/onuryalcin.png",
    bio: "Odpowiada za część inżynierską projektów.",
    socials: {},
    accent: "teal",
    sortOrder: 26,
  },
  {
    id: "shayan",
    name: "Shayan Karimi",
    role: "Przedstawiciel handlowy",
    category: "Sales",
    photo: "/teams/shayan.png",
    bio: "Wspiera klientów na każdym etapie sprzedaży.",
    socials: {},
    accent: "orange",
    sortOrder: 10,
  },
  {
    id: "onur_p",
    name: "Onur Pekkaya",
    role: "Sprzedaż i marketing – Turcja",
    category: "Sales",
    photo: "/teams/onur.png",
    bio: "",
    socials: {},
    accent: "teal",
    sortOrder: 8,
  },
  {
    id: "okan",
    name: "Okan Afşar",
    role: "Kierownik sprzedaży",
    category: "Sales",
    photo: "/teams/okan.png",
    bio: "Odpowiada za działania sprzedażowe.",
    socials: {},
    accent: "orange",
    sortOrder: 13,
  },
  {
    id: "ava",
    name: "Ava Pasandideh",
    role: "Specjalista ds. obsługi posprzedażowej",
    category: "Sales",
    photo: "/teams/ava.png",
    bio: "Odpowiada za obsługę posprzedażową.",
    socials: {},
    accent: "teal",
    sortOrder: 11,
  },
  {
    id: "nevin",
    name: "Nevin Timoroğlu",
    role: "Architekt",
    category: "Architecture",
    photo: "/teams/nevin.png",
    bio: "Zajmuje się projektowaniem i realizacją projektów.",
    socials: {},
    accent: "orange",
    sortOrder: 16,
  },
  {
    id: "meryem",
    name: "Meryem Hürmek",
    role: "Architekt",
    category: "Architecture",
    photo: "/teams/meryem.png",
    bio: "Pracuje nad projektami architektonicznymi.",
    socials: {},
    accent: "teal",
    sortOrder: 17,
  },
  {
    id: "ebru",
    name: "Ebru Atçı",
    role: "Specjalista ds. reklamy",
    category: "Marketing",
    photo: "/teams/ebru.png",
    bio: "Odpowiada za reklamę i promocję.",
    socials: {},
    accent: "orange",
    sortOrder: 18,
  },
  {
    id: "parmida",
    name: "Parmida Mesgari",
    role: "Wideograf",
    category: "Marketing",
    photo: "/teams/placeholder.svg", // Portrait file is not available yet.
    bio: "Zajmuje się produkcją wideo i treściami wizualnymi.",
    socials: {},
    accent: "teal",
    sortOrder: 19,
  },
  {
    id: "mustafa",
    name: "Mustafa Muhtaroğlu",
    role: "Specjalista ds. sprzedaży gruntów",
    category: "Sales",
    photo: "/teams/mustafa.png",
    bio: "Odpowiada za proces sprzedaży gruntów.",
    socials: {},
    accent: "teal",
    sortOrder: 12,
  },
  {
    id: "tanya",
    name: "Tanya Yıldırım",
    role: "Personel obsługi",
    category: "Operations",
    photo: "/teams/tanya.png",
    bio: "Odpowiada za obsługę i wsparcie operacyjne.",
    socials: {},
    accent: "orange",
    sortOrder: 30,
  },

  {
    id: "emineg",
    name: "Emine Güngör",
    role: "Personel obsługi La Joya",
    category: "Operations",
    photo: "/teams/placeholder.svg", // Portrait file is not available yet.
    bio: "Odpowiada za obsługę i wsparcie operacyjne.",
    socials: {},
    accent: "orange",
    sortOrder: 30,
  },
  
  {
    id: "bulent",
    name: "Bülent Çınar",
    role: "Kierownik ds. finansowych",
    category: "Finance",
    photo: "/teams/bulent.png",
    bio: "Zarządza sprawami finansowymi firmy.",
    socials: {},
    accent: "orange",
    sortOrder: 5,
  },
  {
    id: "gozde",
    name: "Gözde Onar",
    role: "Specjalista ds. finansów",
    category: "Finance",
    photo: "/teams/gozde.png",
    bio: "Odpowiada za procesy zarządzania finansami.",
    socials: {},
    accent: "teal",
    sortOrder: 20,
  },
  {
    id: "emine",
    name: "Emine Akkuş",
    role: "Kierownik ds. księgowości",
    category: "Finance",
    photo: "/teams/emine.png",
    bio: "Odpowiada za księgowość i zarządzanie finansami.",
    socials: {},
    accent: "orange",
    sortOrder: 5.4,
  },
  {
    id: "muhammed",
    name: "Muhammed Dinç",
    role: "Specjalista ds. księgowości",
    category: "Finance",
    photo: "/teams/mami.png",
    bio: "Odpowiada za ewidencję i procesy księgowe.",
    socials: {},
    accent: "teal",
    sortOrder: 22,
  },
  {
    id: "omer",
    name: "Ömer Dursun",
    role: "Kierownik serwisu technicznego",
    category: "Engineering",
    photo: "/teams/omer.png",
    bio: "Odpowiada za serwis techniczny i konserwację.",
    socials: {},
    accent: "orange",
    sortOrder: 28,
  },
  {
    id: "yusuf",
    name: "Yusuf Yalçın",
    role: "Inżynier",
    category: "Engineering",
    photo: "/teams/yusuf.png",
    bio: "Pracuje przy projektach inżynieryjnych.",
    socials: {},
    accent: "teal",
    sortOrder: 24,
  },
  {
    id: "rojina",
    name: "Rojina",
    role: "Inżynier",
    category: "Engineering",
    photo: "/teams/rojina.png",
    bio: "Pracuje w dziale inżynierii.",
    socials: {},
    accent: "orange",
    sortOrder: 25,
  },
  {
    id: "hilal",
    name: "Syed Hilal Ahmed",
    role: "Inżynier",
    category: "Engineering",
    photo: "/teams/hilal.png",
    bio: "Odpowiada za część inżynierską projektów.",
    socials: {},
    accent: "teal",
    sortOrder: 27,
  },


],


}: Props) {
  const [activeCat, setActiveCat] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(members.map((m) => m.category)));
    return ["All", ...cats];
  }, [members]);

  const filtered = useMemo(() => {
    if (activeCat === "All") return members;
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
    aria-label="Zarząd i zespół"
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
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        <AnimatePresence initial={false} mode="popLayout">
          
          {sorted.map((m, index) => {
            const photoProps = {
              fill: true,
              src: m.photo || "/teams/okan.png",
              alt: m.name,
              quality: 75,
              sizes: "(min-width: 1280px) 224px, (min-width: 1024px) calc((100vw - 112px) / 3), (min-width: 640px) calc((100vw - 72px) / 2), calc(100vw - 32px)",
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
                    <Image {...photoProps} fetchPriority="high" preload={activeCat === "All"} loading={activeCat === "All" ? undefined : "eager"} />
                  ) : <DeferredFillImage {...photoProps} />}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-50 group-hover:opacity-55 transition-opacity" />

                  {/* Category pill */}
                  <span
                    className="az-st absolute left-3 top-3"
                  >
                    {CATEGORY_LABELS[m.category] ?? m.category}
                  </span>

                  {/* Info box on image */}
                  <div className="absolute inset-x-0 bottom-0 p-5 ">
                    <div className="rounded-[18px] bg-white/85 backdrop-blur-md p-4 ring-1 ring-white/70 shadow-[0_8px_24px_rgba(13,35,38,0.14)] group-hover:translate-y-0 translate-y-1 transition-transform h-[110px]">
                      <h2 className="text-[15px] leading-tight text-[var(--ink)]">{m.name}</h2>
                      <div className="text-[11px] mt-1 uppercase tracking-[0.08em] font-semibold text-[var(--sea)]">{m.role}</div>
                      {m.bio ? (
                        <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-60)] line-clamp-2">
                          {m.bio}
                        </p>
                      ) : null}

                      {/* socials */}
                      <div className="mt-3 flex items-center gap-3 flex-wrap">
                        <SocialLink href={m.socials?.linkedin} label="LinkedIn" />
                        <SocialLink href={m.socials?.instagram} label="Instagram" />
                        <SocialLink href={m.socials?.x} label="X" />
                        <SocialLink href={m.socials?.website} label="WWW" />
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
