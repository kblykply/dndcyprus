// components/press/PressSection.tsx
'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ExternalLink, Calendar, Building2, ChevronRight } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
export type PressItem = {
  id: string;
  outlet: string;
  title: string;
  url: string;
  date: string; // ISO 8601 in Europe/Istanbul preferred
  excerpt?: string;
  cover?: string | StaticImageData; // local /public path, static import, or external url
  locale?: 'tr' | 'en';
  tags?: string[];
};

export type PressSectionProps = {
  items: PressItem[];
  title?: string; // default: 'Basında DND Cyprus'
  description?: string; // optional subtitle under the title
  pressKitHref?: string; // e.g. '/press-kit'
  showAsSeenIn?: boolean; // default true
  featuredFirst?: boolean; // default true (show latest as featured)
  fullBleed?: boolean; // full-width white band that breaks container (default true)
  className?: string;
  moreHref?: string; // link to "all news" page, e.g. '/press'
  initialLimit?: number; // default 4 (featured counts as 1)
};

// ------------------------------------------------------------
// Utils
// ------------------------------------------------------------
const fmtTR = (iso: string) =>
  new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(new Date(iso));

const byDateDesc = (a: PressItem, b: PressItem) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const TEAL = '#27959b';

// ------------------------------------------------------------
// In-view re-trigger wrapper (replays animation every time)
// ------------------------------------------------------------
function InViewReveal({
  children,
  delay = 0,
  y = 14,
  once = false,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, margin: '-10% 0px -10% 0px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
      });
    } else if (!once) {
      controls.set({ opacity: 0, y });
    }
  }, [controls, inView, delay, y, once]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={controls} className={className}>
      {children}
    </motion.div>
  );
}

// ------------------------------------------------------------
// Component (full-bleed white background, NO search or filters)
// ------------------------------------------------------------
export default function PressSection({
  items,
  title = 'Basında DND Cyprus',
  description = 'Markamızın yer aldığı haberler ve basın duyuruları.',
  pressKitHref,
  showAsSeenIn = true,
  featuredFirst = true,
  fullBleed = true,
  className,
  moreHref = '/press',
  initialLimit = 4,
}: PressSectionProps) {
  // Fallback expand state only used when moreHref is absent
  const [showAll, setShowAll] = useState(false);

  const sorted = useMemo(() => [...items].sort(byDateDesc), [items]);
  const list = featuredFirst ? sorted : items;

  const outlets = useMemo(
    () => Array.from(new Set(items.map((i) => i.outlet))).sort(),
    [items]
  );

  const featured = featuredFirst ? list[0] : undefined;
  const rest = featuredFirst ? list.slice(1) : list;

  const limitForRest = featured ? Math.max(0, initialLimit - 1) : initialLimit;
  const visibleRest = showAll ? rest : rest.slice(0, limitForRest);
  const totalCount = list.length;
  const hasMoreThanLimit = totalCount > initialLimit;

  // Build section class names
  const sectionBleed = fullBleed
    ? 'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-[100vw] bg-white'
    : 'bg-white';
  const sectionClass = `${sectionBleed} isolate ${className ?? ''}`.trim();

  return (
    <section className={sectionClass}>
      {/* Inner container keeps nice reading width but the white background spans full viewport */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <InViewReveal y={16}>
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
                {title}
              </h2>
              {description && (
                <p
                  className="mt-3 text-base sm:text-lg"
                  style={{ color: 'rgba(20,21,23,0.72)' }}
                >
                  {description}
                </p>
              )}
            </div>
            {pressKitHref && (
              <a
                href={pressKitHref}
                className="inline-flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
              >
                <Building2 className="mr-2 h-4 w-4" /> Basın Kiti
              </a>
            )}
          </div>
        </InViewReveal>

        {/* Featured */}
        {featured && (
          <InViewReveal y={18}>
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group relative mb-10 block overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 text-gray-900 shadow-sm transition hover:shadow-md"
            >
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
                <div className="order-2 md:order-1 md:col-span-2">
                  <span
                    className="inline-flex items-center w-fit text-[11px] tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                    style={{
                      border: '1px solid rgba(20,21,23,0.08)',
                      color: TEAL,
                      background: '#ffffff',
                    }}
                  >
                    Öne Çıkan Haber
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:underline underline-offset-2">
                    {featured.title}
                  </h3>
                  {featured.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{featured.excerpt}</p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" /> {featured.outlet}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {fmtTR(featured.date)}
                    </span>
                    {featured.tags?.map((t) => (
                      <span key={t} className="rounded-full bg-black/5 px-2 py-0.5 text-[11px]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual with smooth zoom */}
                <div className="order-1 md:order-2">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-black/5">
                    {featured.cover ? (
                      <Image
                        src={featured.cover}
                        alt={featured.title}
                        fill
                        sizes="(min-width:1024px) 380px, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.06]"
                        priority
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200" />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/0 via-black/0 to-black/0" />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute right-4 top-4 hidden rounded-full border border-gray-200 bg-white p-2 text-gray-800 shadow-sm group-hover:translate-x-0.5 md:inline-flex">
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>
          </InViewReveal>
        )}

        {/* Grid */}
        {visibleRest.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleRest.map((item, i) => (
              <InViewReveal key={item.id} delay={i * 0.06} y={14}>
                <PressCard item={item} />
              </InViewReveal>
            ))}
          </div>
        )}

        {/* Tüm Haberler (Link always visible if moreHref is provided) */}
        <div className="mt-8 flex justify-center">
          {moreHref ? (
            <Link
              href={moreHref}
              aria-label="Tüm haberleri gör"
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ color: TEAL }}
            >
              Tüm Haberler
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            hasMoreThanLimit && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                aria-expanded={showAll}
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ color: TEAL }}
              >
                Tüm Haberler
                <ChevronRight className="h-4 w-4" />
              </button>
            )
          )}
        </div>

     
      </div>
    </section>
  );
}

function PressCard({ item }: { item: PressItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm transition hover:shadow-md"
    >
      {/* Visual with hover zoom */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl ring-1 ring-black/5">
        {item.cover ? (
          <Image
            src={item.cover}
            alt={item.title}
            fill
            sizes="(min-width:1024px) 400px, 100vw"
            className="object-cover transition-transform duration-[1100ms] ease-out will-change-transform group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200" />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-medium text-gray-700">
            {item.outlet}
          </span>
          <span className="text-xs text-gray-500">{fmtTR(item.date)}</span>
        </div>
        <h4 className="mt-2 line-clamp-2 text-base font-semibold text-gray-900 group-hover:underline underline-offset-2">
          {item.title}
        </h4>
        {item.excerpt && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.excerpt}</p>
        )}
        <div
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium"
          style={{ color: TEAL }}
        >
          Habere git <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}
