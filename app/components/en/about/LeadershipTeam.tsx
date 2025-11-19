// app/components/LeadershipTeam.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

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
};

const containerHead: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
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
      className="text-xs sm:text-sm px-3 py-1 rounded-full transition-colors"
      style={{
        background: active ? `${color ?? TEAL}` : "rgba(20,21,23,0.05)",
        color: active ? "#fff" : "rgba(20,21,23,0.75)",
        border: active ? `1px solid ${(color ?? TEAL)}AA` : "1px solid rgba(20,21,23,0.08)",
        boxShadow: active ? `0 6px 18px ${(color ?? TEAL)}40` : "none",
        backdropFilter: "blur(8px)",
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
      style={{ color: "rgba(20,21,23,0.7)" }}
    >
      {label}
    </a>
  );
}

export default function LeadershipTeam({
 kicker = "DND Cyprus",
title = "Our Team",
subtitle =
  "Behind the rise of every project, our team’s professionalism is our strongest foundation.",
members = [
  {
    id: "ozan",
    name: "Ozan Dökmecioğlu",
    role: "Chairman of the Board",
    category: "Leadership",
    photo: "/teams/ozan.png",
    bio: "Founder of the company and its visionary leader.",
    socials: {},
    accent: "teal",
    sortOrder: 1,
  },
  {
    id: "aynur",
    name: "Aynur Zorba Güloğlu",
    role: "Director",
    category: "Leadership",
    photo: "/teams/aynurzorbagulol.png",
    bio: "Responsible for management and strategic planning processes.",
    socials: {},
    accent: "orange",
    sortOrder: 2,
  },
  {
    id: "tugba",
    name: "Tuğba Aksun",
    role: "Site Manager",
    category: "Operations",
    photo: "/teams/tugba.png",
    bio: "Responsible for managing site operations.",
    socials: {},
    accent: "teal",
    sortOrder: 14,
  },
  {
    id: "tugce",
    name: "Tuğçe Çinçar",
    role: "Executive Assistant",
    category: "Operations",
    photo: "/teams/tugce.png",
    bio: "Provides management support and organizational coordination.",
    socials: {},
    accent: "orange",
    sortOrder: 15,
  },
  {
    id: "burcin",
    name: "Burçin Gül",
    role: "Construction Coordinator",
    category: "Engineering",
    photo: "/teams/burcingul.png",
    bio: "Coordinates construction projects.",
    socials: {},
    accent: "teal",
    sortOrder: 3,
  },
  {
    id: "borhan",
    name: "Borhan Ghasemzadeh",
    role: "General Sales Manager",
    category: "Sales",
    photo: "/teams/borhan.png",
    bio: "Responsible for overall sales strategies.",
    socials: {},
    accent: "orange",
    sortOrder: 4,
  },
  {
    id: "sabina",
    name: "Sabina Rahimova",
    role: "Sales Manager",
    category: "Sales",
    photo: "/teams/sabina.png",
    bio: "Leads sales operations.",
    socials: {},
    accent: "teal",
    sortOrder: 6,
  },
  {
    id: "shadi",
    name: "Shadi Maghfoori",
    role: "Sales Manager",
    category: "Sales",
    photo: "/teams/shadi.png",
    bio: "Manager within the sales department.",
    socials: {},
    accent: "orange",
    sortOrder: 7,
  },
  {
    id: "bob",
    name: "Bob Porpiev",
    role: "Sales Representative",
    category: "Sales",
    photo: "/teams/bob.png",
    bio: "Responsible for customer relations and sales representation.",
    socials: {},
    accent: "teal",
    sortOrder: 9,
  },
  {
    id: "onur_y",
    name: "Onur Yalçın",
    role: "Engineer",
    category: "Engineering",
    photo: "/teams/onuryalcin.png",
    bio: "Responsible for project engineering.",
    socials: {},
    accent: "teal",
    sortOrder: 26,
  },
  {
    id: "shayan",
    name: "Shayan Karimi",
    role: "Sales Representative",
    category: "Sales",
    photo: "/teams/shayan.png",
    bio: "Active representative throughout the sales process.",
    socials: {},
    accent: "orange",
    sortOrder: 10,
  },
  {
    id: "onur_p",
    name: "Onur Pekkaya",
    role: "Turkey Sales & Marketing",
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
    role: "Sales Manager",
    category: "Sales",
    photo: "/teams/okan.png",
    bio: "Responsible for sales activities.",
    socials: {},
    accent: "orange",
    sortOrder: 13,
  },
  {
    id: "ava",
    name: "Ava Pasandideh",
    role: "After-Sales Specialist",
    category: "Sales",
    photo: "/teams/ava.png",
    bio: "Responsible for after-sales services.",
    socials: {},
    accent: "teal",
    sortOrder: 11,
  },
  {
    id: "nevin",
    name: "Nevin Timoroğlu",
    role: "Architect",
    category: "Architecture",
    photo: "/teams/nevin.png",
    bio: "Works on project design and implementation.",
    socials: {},
    accent: "orange",
    sortOrder: 16,
  },
  {
    id: "meryem",
    name: "Meryem Hürmek",
    role: "Architect",
    category: "Architecture",
    photo: "/teams/meryem.png",
    bio: "Works on architectural projects.",
    socials: {},
    accent: "teal",
    sortOrder: 17,
  },
  {
    id: "ebru",
    name: "Ebru Atçı",
    role: "Advertising Specialist",
    category: "Marketing",
    photo: "/teams/ebru.png",
    bio: "Responsible for advertising and promotional processes.",
    socials: {},
    accent: "orange",
    sortOrder: 18,
  },
  {
    id: "berkay",
    name: "Berkay İncedal",
    role: "Videographer",
    category: "Marketing",
    photo: "/teams/berkay.png",
    bio: "Video production and visual content specialist.",
    socials: {},
    accent: "teal",
    sortOrder: 19,
  },
  {
    id: "mustafa",
    name: "Mustafa Muhtaroğlu",
    role: "Land Sales Specialist",
    category: "Sales",
    photo: "/teams/mustafa.png",
    bio: "Responsible for the land sales process.",
    socials: {},
    accent: "teal",
    sortOrder: 12,
  },
  {
    id: "tanya",
    name: "Tanya Yıldırım",
    role: "Service Staff",
    category: "Operations",
    photo: "/teams/tanya.png",
    bio: "Responsible for service and support operations.",
    socials: {},
    accent: "orange",
    sortOrder: 30,
  },
  {
    id: "caglanur",
    name: "Çağlanur Evren",
    role: "Accounting Specialist",
    category: "Finance",
    photo: "/teams/cagla.png",
    bio: "Responsible for running accounting processes.",
    socials: {},
    accent: "teal",
    sortOrder: 23,
  },
  {
    id: "bulent",
    name: "Bülent Çınar",
    role: "Financial Affairs Manager",
    category: "Finance",
    photo: "/teams/bulent.png",
    bio: "Responsible for managing financial affairs.",
    socials: {},
    accent: "orange",
    sortOrder: 5,
  },
  {
    id: "gozde",
    name: "Gözde Onar",
    role: "Finance Specialist",
    category: "Finance",
    photo: "/teams/gozde.png",
    bio: "Responsible for finance management processes.",
    socials: {},
    accent: "teal",
    sortOrder: 20,
  },
  {
    id: "emine",
    name: "Emine Akkuş",
    role: "Accounting Manager",
    category: "Finance",
    photo: "/teams/emine.png",
    bio: "Responsible for accounting and finance management.",
    socials: {},
    accent: "orange",
    sortOrder: 21,
  },
  {
    id: "muhammed",
    name: "Muhammed Dinç",
    role: "Accounting Specialist",
    category: "Finance",
    photo: "/teams/mami.png",
    bio: "Responsible for accounting records and processes.",
    socials: {},
    accent: "teal",
    sortOrder: 22,
  },
  {
    id: "omer",
    name: "Ömer Dursun",
    role: "Technical Service Supervisor",
    category: "Engineering",
    photo: "/teams/omer.png",
    bio: "Responsible for technical service and maintenance.",
    socials: {},
    accent: "orange",
    sortOrder: 28,
  },
  {
    id: "yusuf",
    name: "Yusuf Yalçın",
    role: "Engineer",
    category: "Engineering",
    photo: "/teams/yusuf.png",
    bio: "Works on engineering projects.",
    socials: {},
    accent: "teal",
    sortOrder: 24,
  },
  {
    id: "rojina",
    name: "Rojina",
    role: "Engineer",
    category: "Engineering",
    photo: "/teams/rojina.png",
    bio: "Works in engineering.",
    socials: {},
    accent: "orange",
    sortOrder: 25,
  },
  {
    id: "hilal",
    name: "Syed Hilal Ahmed",
    role: "Engineer",
    category: "Engineering",
    photo: "/teams/hilal.png",
    bio: "Responsible for project engineering.",
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
    aria-label="Liderlik ve Ekip"
    className="relative overflow-hidden bg-white"
  style={{
  background: "#ffffff",
  color: "#141517",
  ["--stroke"]: "rgba(20,21,23,0.08)",
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

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Header */}
      <motion.div
        variants={containerHead}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.35 }}
        className="text-left"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center text-xs tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--stroke)",
            backdropFilter: "blur(8px)",
            color: TEAL,
          }}
        >
          {kicker}
        </motion.span>

        <motion.h2 variants={fadeUp} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
          {title}
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-2 text-base sm:text-lg" style={{ color: "rgba(20,21,23,0.65)" }}>
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Filters (sticky on mobile for easy nav) */}
      <div className="mt-8 sticky top-2 z-10 -mx-4 px-4 bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur rounded-2xl border border-[var(--stroke)]">
        <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
          {categories.map((cat) => (
            <Badge
              key={cat}
              label={cat}
              active={activeCat === cat}
              color={cat === "Leadership" ? TEAL : cat === "Architecture" ? ORANGE : undefined}
              onClick={() => setActiveCat(cat)}
            />
          ))}
        </div>
      </div>

      {/* FULL-IMAGE GRID */}
      <motion.div
        layout
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
      >
        <AnimatePresence initial={false} mode="popLayout">
          
          {sorted.map((m) => {
            const color = m.accent === "orange" ? ORANGE : TEAL;
            return (
              <motion.article
                key={m.id}
                layout
                variants={cardPresence}
                initial="hidden"
                animate="show"
                exit="exit"
                className="group relative overflow-hidden rounded-3xl ring-1 ring-[var(--stroke)] shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              >
                {/* Image */}
                <div className="relative aspect-[3/5] w-full">
                  <img
                    src={m.photo || "/teams/okan.png"}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-50 group-hover:opacity-55 transition-opacity" />

                  {/* Category pill */}
                  <span
                    className="absolute left-3 top-3 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm"
                    style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
                  >
                    {m.category}
                  </span>

                  {/* Info box on image */}
                  <div className="absolute inset-x-0 bottom-0 p-5 ">
                    <div className="rounded-2xl bg-white/65 dark:bg-white/90 backdrop-blur-md p-4 ring-1 ring-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.18)] group-hover:translate-y-0 translate-y-1 transition-transform h-[110px]">
                      <h3 className="text-sm font-semibold text-gray-900">{m.name}</h3>
                      <div className="text-xs mt-0.5 text-gray-700">{m.role}</div>
                      {m.bio ? (
                        <p className="mt-1.5 text-xs leading-relaxed text-gray-600 line-clamp-2">
                          {m.bio}
                        </p>
                      ) : null}

                      {/* socials */}
                      <div className="mt-3 flex items-center gap-3 flex-wrap">
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
                    style={{ ringColor: `${color}55` } as React.CSSProperties}
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
