// app/components/StoryTimeline.tsx
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "@/app/components/performance/DeferredFillImage";
import { m as motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Milestone = {
  year: string;
  title: string;
  summary: string;
  image: string;
  badge?: string;
};

const TEAL = "#27959b";
const ORANGE = "#f15c34";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GAP = 24; // kartlar arası boşluk (gap-6)
// şerit sayfa içeriğiyle aynı hizadan başlar, sağa doğru ekran kenarına kadar akar
const RAIL_PAD = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

const MILESTONES: Milestone[] = [
  { year: "2017", title: "DND Homes Kuruluşu", summary: "Şirketin ilk merkezi Boston’da kuruldu.", image: "/dnd-boston-ofis.jpg", badge: "Kuruluş" },
  { year: "2017", title: "Amerika’daki İlk Proje", summary: "12 Longfellow Road, Lexington projesi hayata geçirildi.", image: "/12lex.jpg", badge: "ABD" },
  { year: "2018", title: "Ozan Dökmecioğlu Ödülü", summary: "Boston Business Journal tarafından “Yılın CFO’su” seçildi.", image: "/ozan-dokmecioglu-cfo-of-the-year.jpg", badge: "Ödül" },
  { year: "2023", title: "DND Kıbrıs Kuruluşu", summary: "Kıbrıs’ta yeni operasyon merkezi açıldı.", image: "/kurulus.JPG", badge: "Kıbrıs" },
  { year: "2025", title: "Property NC Ödülleri", summary: "“En İyi Çıkış Yapan Şirket” ödülüne layık görüldü.", image: "/property_awards_2025-747.jpg", badge: "Property NC" },
  { year: "2025", title: "İlk Proje La Joya Teslimi", summary: "La Joya projesi tamamlanarak teslim edildi.", image: "/la-joya/2.jpg", badge: "Teslim" },
];

export default function StoryTimeline() {
  const railRef = useRef<HTMLOListElement>(null);
  const [thumb, setThumb] = useState({ size: 1, pos: 0 });
  const [edge, setEdge] = useState({ start: true, end: true });

  // kaydırma durumuna göre ilerleme çubuğu ve okların açık/kapalı hali
  const update = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const size = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1;
    const pos = max > 0 ? (el.scrollLeft / max) * (1 - size) : 0;
    setThumb({ size, pos });
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const w = card ? card.offsetWidth + GAP : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section
      id="story"
      data-bg="light"
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{ background: `linear-gradient(180deg, ${TEAL}0f 0%, #ffffff 85%)` }}
    >
      {/* yumuşak marka ışıkları */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full blur-3xl" style={{ background: `${TEAL}1f` }} />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full blur-3xl" style={{ background: `${ORANGE}14` }} />

      {/* Başlık + oklar */}
      <div className="relative mx-auto flex max-w-7xl items-end justify-between gap-6 px-6">
        <div className="max-w-2xl">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider"
            style={{ background: `${TEAL}14`, border: `1px solid ${TEAL}33`, color: TEAL }}
          >
            Şirket Hikayemiz
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">2017’den bugüne DND</h2>
          <p className="mt-2 text-base text-black/60 md:text-lg">Boston’dan Kuzey Kıbrıs’a uzanan yolculuğumuzun kilometre taşları.</p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <RoundButton onClick={() => step(-1)} disabled={edge.start} ariaLabel="Önceki">
            <FiChevronLeft className="h-5 w-5" />
          </RoundButton>
          <RoundButton onClick={() => step(1)} disabled={edge.end} ariaLabel="Sonraki">
            <FiChevronRight className="h-5 w-5" />
          </RoundButton>
        </div>
      </div>

      {/* Yolculuk şeridi: kilometre taşları yan yana, çizgiyle birbirine bağlı */}
      <ol
        ref={railRef}
        onScroll={update}
        tabIndex={0}
        aria-label="Kilometre taşları"
        className="relative mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-10 pt-2 outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: RAIL_PAD, scrollPaddingInline: RAIL_PAD }}
      >
        {MILESTONES.map((m, i) => (
          <motion.li
            key={`${m.year}-${i}`}
            className="group relative flex w-[78vw] max-w-[340px] shrink-0 snap-start flex-col sm:w-[340px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.08, ease: EASE }}
          >
            {/* nokta + bir sonraki karta uzanan çizgi */}
            <div className="relative flex h-6 items-center">
              {i < MILESTONES.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-3 top-1/2 h-[2px] -translate-y-1/2"
                  style={{ right: -(GAP + 12), background: `linear-gradient(90deg, ${TEAL}80, ${TEAL}33)` }}
                />
              )}
              <span className="relative grid h-6 w-6 place-items-center rounded-full bg-white" style={{ boxShadow: `0 0 0 2px ${TEAL}, 0 0 0 7px ${TEAL}1a` }}>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: TEAL }} />
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight md:text-4xl" style={{ color: TEAL }}>
              {m.year}
            </p>

            <article className="mt-4 flex flex-1 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                <Image
                  src={m.image}
                  alt={m.title}
                  fill
                  quality={70}
                  sizes="(min-width: 640px) 340px, 78vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {m.badge && (
                  <span
                    className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm"
                    style={{ background: ORANGE }}
                  >
                    {m.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-zinc-950">{m.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-black/60">{m.summary}</p>
              </div>
            </article>
          </motion.li>
        ))}
      </ol>

      {/* kaydırma ilerlemesi */}
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-black/10">
          <span
            className="absolute inset-y-0 rounded-full transition-[left,width] duration-150 ease-out"
            style={{ left: `${thumb.pos * 100}%`, width: `${thumb.size * 100}%`, background: TEAL }}
          />
        </div>
      </div>
    </section>
  );
}

function RoundButton({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-900 shadow-sm transition hover:border-[#27959b] hover:text-[#27959b] disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
