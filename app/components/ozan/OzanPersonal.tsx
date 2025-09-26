// app/components/about/OzanPersonal.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const TEAL = "#27959b";
const ORANGE = "#f15c34";

type LinkItem = { label: string; href: string };
type GalleryItem = { src: string; alt?: string };

export default function OzanPersonal({
  title = "Kişisel Yön",
  intro = "İş dışında; öğrenmeye, topluma fayda sağlamaya ve doğayla bağ kurmaya önem verir. Ailesiyle kaliteli zaman, düzenli spor ve sürekli gelişim odaklıdır.",
  hobbies = [
    "Koşu & Fitness",
    "Yelken / Deniz",
    "Okuma — liderlik & ekonomi",
    "Seyahat — kültür keşfi",
  ],
  philanthropy = [
    "Eğitim odaklı bağış ve mentorluk",
    "Genç girişimcilere destek",
    "Toplumsal projelerde gönüllülük",
  ],
  community = [
    "Yerel etkinlik ve konferanslara konuşmacı/katılımcı",
    "Sektör paydaşlarıyla bilgi paylaşımı",
  ],
  quote = {
    text:
      "Uzun vadeli değer, yalnızca finansal tablolarda değil; insanlarda, şehirlerde ve gelecek nesillerde görünür.",
    author: "Ozan Dökmecioğlu",
  },
  links = [
    { label: "LinkedIn", href: "#" },
    { label: "Basın Kiti", href: "/files/press-kit.zip" },
  ],
  gallery = [
    { src: "/La Joya - 1.png", alt: "Etkinlikte konuşma" },
    { src: "/La Joya - 1.png", alt: "Saha ziyareti" },
    { src: "/La Joya - 1.png", alt: "Topluluk buluşması" },
  ],
}: {
  title?: string;
  intro?: string;
  hobbies?: string[];
  philanthropy?: string[];
  community?: string[];
  quote?: { text: string; author?: string };
  links?: LinkItem[];
  gallery?: GalleryItem[];
}) {
  return (
    <section
      aria-label="Ozan Dökmecioğlu — Kişisel Yön"
      className="relative overflow-hidden"
      style={{ background: "#ffffff", color: "#141517", ["--stroke" as any]: "rgba(20,21,23,0.08)" }}
    >
      {/* brand wash */}
    

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "rgba(20,21,23,0.72)" }}>
            {intro}
          </p>
        </motion.div>

        {/* content grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* left column: lists */}
          <div className="lg:col-span-7 space-y-6">
            <Card title="Hobiler & İlgi Alanları" accent="teal">
              <ChipList items={hobbies} />
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card title="Sosyal Sorumluluk" accent="orange">
                <BulletList items={philanthropy} />
              </Card>
              <Card title="Topluluk & Katkı" accent="teal">
                <BulletList items={community} />
              </Card>
            </div>

            {/* links */}
            {links?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl p-5 flex flex-wrap gap-2"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
                  border: "1px solid var(--stroke)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {links.map((l, i) => (
                  <a
                    key={l.label + i}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: i % 2 === 0 ? `${TEAL}14` : `${ORANGE}14`,
                      color: i % 2 === 0 ? TEAL : ORANGE,
                      border: `1px solid ${i % 2 === 0 ? TEAL : ORANGE}33`,
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </motion.div>
            ) : null}
          </div>

          {/* right column: quote + gallery */}
          <div className="lg:col-span-5 space-y-6">
            {/* quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.68))",
                border: `1px solid ${TEAL}33`,
                boxShadow: `0 12px 28px ${TEAL}1f`,
                backdropFilter: "blur(10px)",
              }}
            >
              <span className="text-3xl leading-none" style={{ color: ORANGE }}>“</span>
              <p className="mt-2 text-base sm:text-lg leading-relaxed" style={{ color: "rgba(20,21,23,0.85)" }}>
                {quote.text}
              </p>
              {quote.author ? (
                <footer className="mt-3 text-xs" style={{ color: "rgba(20,21,23,0.6)" }}>
                  — {quote.author}
                </footer>
              ) : null}
            </motion.blockquote>

            {/* mini gallery */}
            {gallery?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.06 }}
                className="grid grid-cols-3 gap-3"
              >
                {gallery.slice(0, 6).map((g, i) => (
                  <div
                    key={g.src + i}
                    className="rounded-xl overflow-hidden aspect-[4/3]"
                    style={{
                      border: "1px solid var(--stroke)",
                      boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <img
                      src={g.src}
                      alt={g.alt || "Kişisel fotoğraf"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- small helpers ---------- */
function Card({
  title,
  accent = "teal",
  children,
}: {
  title: string;
  accent?: "teal" | "orange";
  children: React.ReactNode;
}) {
  const color = accent === "orange" ? ORANGE : TEAL;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl p-5"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))",
        border: `1px solid ${color}33`,
        boxShadow: `0 12px 28px ${color}22`,
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="inline-flex text-[11px] px-2 py-0.5 rounded-full"
        style={{ background: `${color}14`, color, border: `1px solid ${color}33` }}
      >
        {title}
      </div>
      <div className="mt-3">{children}</div>
    </motion.div>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x, i) => (
        <span
          key={x + i}
          className="text-xs px-3 py-1 rounded-full"
          style={{
            background: i % 2 === 0 ? `${TEAL}14` : `${ORANGE}14`,
            color: i % 2 === 0 ? TEAL : ORANGE,
            border: `1px solid ${i % 2 === 0 ? TEAL : ORANGE}33`,
          }}
        >
          {x}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((x, i) => (
        <li key={x + i} className="flex items-start gap-2">
          <span
            aria-hidden
            className="mt-1 inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: i % 2 === 0 ? TEAL : ORANGE }}
          />
          <span className="text-sm" style={{ color: "rgba(20,21,23,0.8)" }}>
            {x}
          </span>
        </li>
      ))}
    </ul>
  );
}
