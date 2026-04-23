"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants, type Easing } from "framer-motion";
import {
  FileText,
  Image as ImageIcon,
  PlayCircle,
  Globe,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE: Easing = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease: EASE },
  },
};

const modalWrap: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: EASE } },
};

const modalCard: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.97, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.34, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: "blur(6px)",
    transition: { duration: 0.2, ease: EASE },
  },
};

type MediaType = "pdf" | "image" | "youtube" | "instagram" | "link";

type MenuItem = {
  id: string;
  title: string;
  type: MediaType;
  thumb: string;
  src: string;
  description?: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  logoSrc?: string;
};

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function getIcon(type: MediaType) {
  switch (type) {
    case "pdf":
      return <FileText className="h-5 w-5" />;
    case "image":
      return <ImageIcon className="h-5 w-5" />;
    case "youtube":
    case "instagram":
      return <PlayCircle className="h-5 w-5" />;
    case "link":
      return <Globe className="h-5 w-5" />;
    default:
      return <Sparkles className="h-5 w-5" />;
  }
}

function getBadge(type: MediaType) {
  switch (type) {
    case "pdf":
      return "PDF";
    case "image":
      return "Image";
    case "youtube":
      return "YouTube";
    case "instagram":
      return "Instagram";
    case "link":
      return "Website";
    default:
      return "Media";
  }
}

function extractInstagramPermalink(url: string) {
  try {
    const u = new URL(url);
    return `${u.origin}${u.pathname}`;
  } catch {
    return url;
  }
}

function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    ) as HTMLScriptElement | null;

    if (existing) {
      const win = window as typeof window & {
        instgrm?: { Embeds?: { process?: () => void } };
      };
      win.instgrm?.Embeds?.process?.();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = () => {
      const win = window as typeof window & {
        instgrm?: { Embeds?: { process?: () => void } };
      };
      win.instgrm?.Embeds?.process?.();
    };
    document.body.appendChild(script);
  }, [url]);

  return (
    <div className="flex justify-center w-full overflow-auto">
      <blockquote
        className="instagram-media w-full"
        data-instgrm-permalink={extractInstagramPermalink(url)}
        data-instgrm-version="14"
        style={{
          width: "100%",
          maxWidth: 540,
          minWidth: 280,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 18,
        }}
      />
    </div>
  );
}

function MediaRenderer({ item }: { item: MenuItem }) {
  if (item.type === "pdf") {
    return (
      <iframe
        src={item.src}
        title={item.title}
        className="h-[72vh] w-full rounded-[20px] bg-white"
      />
    );
  }

  if (item.type === "image") {
    return (
      <div className="overflow-hidden rounded-[20px] bg-[#f6f7f8]">
        <img
          src={item.src}
          alt={item.title}
          className="h-auto max-h-[72vh] w-full object-contain"
        />
      </div>
    );
  }

  if (item.type === "youtube") {
    return (
      <div className="overflow-hidden rounded-[20px] bg-black aspect-video">
        <iframe
          className="h-full w-full"
          src={item.src}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  if (item.type === "instagram") {
    return (
      <div className="rounded-[20px] bg-white p-3 sm:p-5">
        <InstagramEmbed url={item.src} />
      </div>
    );
  }

  if (item.type === "link") {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-[20px] border border-[#e8ecef] bg-[#f9fafb] p-8 text-center">
        <div className="max-w-xl">
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${TEAL}18, ${ORANGE}14)`,
              border: "1px solid rgba(39,149,155,0.12)",
            }}
          >
            <Globe className="h-8 w-8" style={{ color: TEAL }} />
          </div>

          <h3 className="text-2xl sm:text-3xl font-semibold text-[#141517]">
            {item.title}
          </h3>

          <p className="mt-3 text-sm sm:text-base text-[#141517B3]">
            {item.description || "Open this external website in a new tab."}
          </p>

          <a
            href={item.src}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${TEAL}, ${ORANGE})`,
              boxShadow: "0 14px 36px rgba(39,149,155,0.16)",
            }}
          >
            Visit Website <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  return null;
}

export default function LagoonVerdeMediaHubLight({
  title = "DND Media Hub",
  subtitle = "Explore catalogs, brochures, videos, campaigns and digital materials.",
  logoSrc = "/DND-LOGO-2.svg",
}: Props) {
  const [active, setActive] = useState<MenuItem | null>(null);

  const items = useMemo<MenuItem[]>(
    () => [
      
      {
        id: "lagoon-brochure",
        title: "Lagoon Verde Brochure",
        type: "pdf",
        thumb: "/lagoonflip/l-01.webp",
        src: "/bro.pdf",
        description: "Brochure version for quick presentation.",
      },
      {
        id: "lagoon-video",
        title: "Lagoon Verde Video",
        type: "youtube",
        thumb: "/lagoon-verde/2.jpg",
        src: "https://www.youtube.com/embed/bKNPhMFNzGY?si=bAsOzWd2Kr6O8Fy-",
        description: "Main project video.",
      },
      {
        id: "kktc-video",
        title: "KKTC Video",
        type: "youtube",
        thumb: "/lala.jpg",
        src: "https://www.youtube.com/embed/JNKcu1APZO0?si=qDPxGjdF1uxJakR0",
        description: "North Cyprus lifestyle video.",
      },
      {
        id: "kktc-catalog",
        title: "KKTC Catalog",
        type: "pdf",
        thumb: "/kktc.png",
        src: "/docs/kktc-catalog.pdf",
        description: "Destination catalog.",
      },
      {
        id: "la-joya-polish",
        title: "La Joya Polish Video",
        type: "instagram",
        thumb: "/lajoyaimage.jpg",
        src: "https://www.instagram.com/reel/DSKNkREjLbD",
        description: "Instagram Reel embed.",
      },
      {
        id: "dnd-website",
        title: "DND Cyprus Website",
        type: "link",
        thumb: "/dndweb.png",
        src: "https://dndcyprus.com",
        description: "Official website link.",
      },
      {
        id: "property-awards",
        title: "Property Awards Video",
        type: "instagram",
        thumb: "/property_awards_2025-747.jpg",
        src: "https://www.instagram.com/reel/DJLqfFSA4dP",
        description: "Awards-related Instagram video.",
      },
      {
        id: "payment-plan",
        title: "Lagoon Verde Payment Plan",
        type: "pdf",
        thumb: "/lagoon-verde/1.jpg",
        src: "/paymentt.pdf",
        description: "Payment plan PDF.",
      },
      {
        id: "campaign",
        title: "Campaign",
        type: "image",
        thumb: "/campain.png",
        src: "/campain.png",
        description: "Campaign visual.",
      },
    ],
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };

    if (active) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
      style={{ background: "#ffffff", color: "#141517" }}
      aria-label="Lagoon Verde media menu"
    >
      {/* soft background auras */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 28% at 50% 4%, rgba(39,149,155,0.08), transparent 70%), radial-gradient(22% 20% at 90% 18%, rgba(241,92,52,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="flex justify-center">
            <div
              className="relative overflow-hidden rounded-[30px] border bg-white px-6 py-5 sm:px-10 sm:py-7"
              style={{
                borderColor: "#e9eef0",
                boxShadow:
                  "0 18px 50px rgba(20,21,23,0.06), 0 2px 10px rgba(20,21,23,0.03)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(39,149,155,0.05), rgba(241,92,52,0.03), rgba(255,255,255,0.6))",
                }}
              />
              <img
                src={logoSrc}
                alt="Lagoon Verde"
                className="relative mx-auto h-16 w-auto sm:h-20 lg:h-24 object-contain"
              />
            </div>
          </div>

          <h2 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#141517]">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#141517B3] sm:text-base">
            {subtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.12 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => setActive(item)}
              className={cn(
                "group relative overflow-hidden rounded-[28px] text-left min-h-[280px] sm:min-h-[320px]",
                "border bg-white"
              )}
              style={{
                borderColor: "#e8ecef",
                boxShadow:
                  "0 20px 60px rgba(20,21,23,0.06), 0 4px 18px rgba(20,21,23,0.04)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ backgroundImage: `url(${item.thumb})` }}
              />

              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,21,23,0.78) 10%, rgba(20,21,23,0.22) 54%, rgba(20,21,23,0.04) 100%)",
                }}
              />

              <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em]"
                    style={{
                      background: "#ffffff",
                      color: TEAL,
                      border: "1px solid rgba(39,149,155,0.14)",
                      boxShadow: "0 6px 18px rgba(20,21,23,0.06)",
                    }}
                  >
                    {getIcon(item.type)}
                    {getBadge(item.type)}
                  </span>

                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
                    style={{
                      borderColor: "rgba(255,255,255,0.24)",
                      background: "rgba(255,255,255,0.16)",
                    }}
                    aria-hidden
                  >
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </div>

                <div>
                  <h3 className="text-[22px] sm:text-[24px] font-semibold leading-tight text-white">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-2 max-w-[32rem] text-sm leading-6 text-white/88">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="media-modal"
            variants={modalWrap}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[rgba(20,21,23,0.42)] p-3 sm:p-5"
            onClick={() => setActive(null)}
          >
            <motion.div
              variants={modalCard}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border bg-white"
              style={{
                borderColor: "#e8ecef",
                boxShadow:
                  "0 30px 120px rgba(20,21,23,0.16), 0 10px 32px rgba(20,21,23,0.08)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(40% 28% at 20% 0%, rgba(39,149,155,0.05), transparent 70%), radial-gradient(30% 24% at 80% 0%, rgba(241,92,52,0.04), transparent 70%)",
                }}
              />

              <div className="relative flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6" style={{ borderColor: "#edf1f3" }}>
                <div>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em]"
                    style={{
                      background: "#f6f8f9",
                      border: "1px solid #e6ecee",
                      color: "#141517CC",
                    }}
                  >
                    {getIcon(active.type)}
                    {getBadge(active.type)}
                  </div>

                  <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-[#141517]">
                    {active.title}
                  </h3>
                  {active.description ? (
                    <p className="mt-1 text-sm text-[#14151799]">{active.description}</p>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close popup"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition"
                  style={{
                    borderColor: "#e7ebee",
                    background: "#f8fafb",
                    color: "#141517",
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative p-3 sm:p-5">
                <MediaRenderer item={active} />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}