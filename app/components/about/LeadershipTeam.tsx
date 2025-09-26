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
  title = "Ekibimiz",
  subtitle = "Her projemizin yükselişinde, ekibimizin profesyonelliği en sağlam yapı taşıdır.   ",
    members = [
  {
    id: "ozan",
    name: "Ozan Dökmecioğlu",
    role: "Yönetim Kurulu Başkanı",
    category: "Leadership",
    photo: "/teams/ozan.png",
    bio: "Şirketin kurucusu ve vizyoner lideri.",
    socials: {},
    accent: "teal",
  },
  {
    id: "aynur",
    name: "Aynur Zorba Güloğlu",
    role: "Direktör",
    category: "Leadership",
    photo: "/teams/aynurzorbagulol.png",
    bio: "Yönetim ve stratejik planlama süreçlerinde sorumlu.",
    socials: {},
    accent: "orange",
  },
  {
    id: "tugba",
    name: "Tuğba Aksun",
    role: "Site Yöneticisi",
    category: "Operations",
    photo: "/teams/tugba.png",
    bio: "Site operasyonlarının yönetimi.",
    socials: {},
    accent: "teal",
  },
  {
    id: "tugce",
    name: "Tuğçe Çinçar",
    role: "Yönetici Asistan",
    category: "Operations",
    photo: "/teams/tugce.png",
    bio: "Yönetim desteği ve organizasyonel koordinasyon.",
    socials: {},
    accent: "orange",
  },
  {
    id: "burcin",
    name: "Burçin Gül",
    role: "İnş. Koordinatör",
    category: "Engineering",
    photo: "/teams/burcingul.png",
    bio: "İnşaat projelerinin koordinasyonu.",
    socials: {},
    accent: "teal",
  },
  {
    id: "borhan",
    name: "Borhan Ghasemzadeh",
    role: "Genel Satış Müdürü",
    category: "Sales",
    photo: "/teams/borhan.png",
    bio: "Genel satış stratejilerinden sorumlu.",
    socials: {},
    accent: "orange",
  },
  {
    id: "sabina",
    name: "Sabina Rahimova",
    role: "Satış Müdürü",
    category: "Sales",
    photo: "/teams/sabina.png",
    bio: "Satış operasyonlarının lideri.",
    socials: {},
    accent: "teal",
  },
  {
    id: "shadi",
    name: "Shadi Maghfoori",
    role: "Satış Müdürü",
    category: "Sales",
    photo: "/teams/shadi.png",
    bio: "Satış departmanında yönetici.",
    socials: {},
    accent: "orange",
  },
  {
    id: "bob",
    name: "Bob Porpiev",
    role: "Satış Temsilcisi",
    category: "Sales",
    photo: "/teams/bob.png",
    bio: "Müşteri ilişkileri ve satış temsilcisi.",
    socials: {},
    accent: "teal",
  },
  {
    id: "shayan",
    name: "Shayan Karimi",
    role: "Satış Temsilcisi",
    category: "Sales",
    photo: "/teams/shayan.png",
    bio: "Satış sürecinde aktif temsilci.",
    socials: {},
    accent: "orange",
  },
  {
    id: "onur_p",
    name: "Onur Pekkaya",
    role: "Türkiye Satış Müdürü",
    category: "Sales",
    photo: "/teams/onurpekkaya.png",
    bio: "Satış sürecinde aktif temsilci.",
    socials: {},
    accent: "teal",
  },
  {
    id: "okan",
    name: "Okan Afşar",
    role: "Satış Temsilcisi",
    category: "Sales",
    photo: "/teams/okan.png",
    bio: "Satış faaliyetlerinde görevli.",
    socials: {},
    accent: "orange",
  },
  {
    id: "ava",
    name: "Ava Pasandideh",
    role: "Satış Sonrası Sorumlusu",
    category: "Sales",
    photo: "/teams/ava.png",
    bio: "Satış sonrası hizmetler sorumlusu.",
    socials: {},
    accent: "teal",
  },
  {
    id: "nevin",
    name: "Nevin Timoroğlu",
    role: "Mimar",
    category: "Architecture",
    photo: "/teams/nevin.png",
    bio: "Proje tasarımı ve uygulamasında görevli.",
    socials: {},
    accent: "orange",
  },
  {
    id: "meryem",
    name: "Meryem Hürmek",
    role: "Mimar",
    category: "Architecture",
    photo: "/teams/meryem.png",
    bio: "Mimari projelerde görevli.",
    socials: {},
    accent: "teal",
  },
  {
    id: "ebru",
    name: "Ebru Atçı",
    role: "Reklam Sorumlusu",
    category: "Marketing",
    photo: "/teams/ebru.png",
    bio: "Reklam ve tanıtım süreçlerinden sorumlu.",
    socials: {},
    accent: "orange",
  },
  {
    id: "berkay",
    name: "Berkay İncedal",
    role: "Videographer",
    category: "Marketing",
    photo: "/teams/berkay.png",
    bio: "Video prodüksiyon ve görsel içerik uzmanı.",
    socials: {},
    accent: "teal",
  },
 
  {
    id: "mustafa",
    name: "Mustafa Muhtaroğlu",
    role: "Arsa Satış Sorumlusu",
    category: "Sales",
    photo: "/teams/mustafa.png",
    bio: "Arsa satış sürecinden sorumlu.",
    socials: {},
    accent: "teal",
  },
  {
    id: "tanya",
    name: "Tanya Yıldırım",
    role: "Servis Personeli",
    category: "Operations",
    photo: "/teams/tanya.png",
    bio: "Servis ve destek hizmetleri sorumlusu.",
    socials: {},
    accent: "orange",
  },
  {
    id: "caglanur",
    name: "Çağlanur Evren",
    role: "Muhasebe Sorumlusu",
    category: "Finance",
    photo: "/teams/cagla.png",
    bio: "Muhasebe süreçlerinin yürütülmesi.",
    socials: {},
    accent: "teal",
  },
  {
    id: "bulent",
    name: "Bülent Çınar",
    role: "Mali İşler Müdürü",
    category: "Finance",
    photo: "/teams/bulent.png",
    bio: "Mali işler yönetiminden sorumlu.",
    socials: {},
    accent: "orange",
  },
  {
    id: "gozde",
    name: "Gözde Onar",
    role: "Finans Sorumlusu",
    category: "Finance",
    photo: "/teams/gozde.png",
    bio: "Finans yönetim süreçlerinden sorumlu.",
    socials: {},
    accent: "teal",
  },
  {
    id: "emine",
    name: "Emine Akkuş",
    role: "Muhasebe Finans Müdürü",
    category: "Finance",
    photo: "/teams/emine.png",
    bio: "Muhasebe ve finans yönetimi.",
    socials: {},
    accent: "orange",
  },
  {
    id: "muhammed",
    name: "Muhammed Dinç",
    role: "Muhasebe Sorumlusu",
    category: "Finance",
    photo: "/teams/mami.png",
    bio: "Muhasebe kayıt ve süreçleri.",
    socials: {},
    accent: "teal",
  },
  {
    id: "omer",
    name: "Ömer Dursun",
    role: "Teknik Servis Sorumlusu",
    category: "Engineering",
    photo: "/teams/placeholder.png",
    bio: "Teknik servis ve bakım sorumlusu.",
    socials: {},
    accent: "orange",
  },
  {
    id: "yusuf",
    name: "Yusuf Yalçın",
    role: "Mühendis",
    category: "Engineering",
    photo: "/teams/yusuf.png",
    bio: "Mühendislik projelerinde görevli.",
    socials: {},
    accent: "teal",
  },
  {
    id: "rojina",
    name: "Rojina",
    role: "Mühendis",
    category: "Engineering",
    photo: "/teams/rojina.png",
    bio: "Mühendislik alanında görevli.",
    socials: {},
    accent: "orange",
  },
  {
    id: "onur_y",
    name: "Onur Yalçın",
    role: "Mühendis",
    category: "Engineering",
    photo: "/teams/onuryalcin.png",
    bio: "Proje mühendisliği sorumlusu.",
    socials: {},
    accent: "teal",
  },
   {
    id: "hilal",
    name: "Syed Hilal Ahmed",
    role: "Mühendis",
    category: "Engineering",
    photo: "/teams/hilal.png",
    bio: "Proje mühendisliği sorumlusu.",
    socials: {},
    accent: "teal",
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
            background: "rgba(20,21,23,0.05)",
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
          {filtered.map((m) => {
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

      {/* CTA */}
      <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p style={{ color: "rgba(20,21,23,0.65)" }}>
          Ekibimize katılmak ister misiniz? Açık pozisyonları inceleyin.
        </p>
        <a
          href="/careers"
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
          Kariyer Fırsatları
        </a>
      </div>
    </div>
  </section>
);

}
