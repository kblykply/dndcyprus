// app/components/pl/mariachi/MariachiPerksSection.tsx
import type { ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";
import Link from "next/link";
import { BadgePercent, ShieldCheck } from "lucide-react";

type LogoItem = { name: string; src: string; href?: string };

export default function MariachiUnifiedPerks({
  title = <>Członkostwo i <b>przywileje</b> mieszkańców</>,
  subtitle = "Wspólne korzyści w Mariachi Beach Club dla wszystkich mieszkańców projektów DND Cyprus.",
  note = "Dla wszystkich właścicieli nieruchomości DND: BEZPŁATNE WEJŚCIE do Mariachi Beach Club + 10% ZNIŻKI",
  logos = [
    { name: "La Joya", src: "/logos/lajoya.png", href: "/pl/la-joya" },
    { name: "La Joya Perla", src: "/logos/perla.png", href: "/pl/perla" },
    { name: "La Joya Perla II", src: "/logos/perlaii.png", href: "/pl/perla-ii" },
    { name: "Lagoon Verde", src: "/logos/lagoon.png", href: "/pl/lagoon-verde" },
  ],
  primaryCta = { label: "Zarezerwuj", href: "/pl/contact" },
  secondaryCta = { label: "Sprawdź przywileje", href: "/pl/contact" },

  /** Right-side image panel */
  sideImage = "/azure/mb-7.jpg",
  sideImageAlt = "Mariachi Beach Club",
  sideBadge = "Mariachi Beach Club",
  sideTitle = "Wyjątkowe dni nad morzem",
  sideSubtitle = "Wyłącznie dla właścicieli nieruchomości: bezpłatne wejście i 10% zniżki na jedzenie i napoje.",
  sideHref = "#gallery", // leave empty to remove CTA
}: {
  title?: ReactNode;
  subtitle?: string;
  note?: string;
  logos?: LogoItem[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };

  sideImage?: string;
  sideImageAlt?: string;
  sideBadge?: string;
  sideTitle?: string;
  sideSubtitle?: string;
  sideHref?: string;
}) {
  return (
    <section className="az-section" aria-label="Mariachi Beach Club — przywileje mieszkańców">
      <div className="az-wrap">
        <div className="az-card rv grid grid-cols-1 min-[900px]:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT: copy + logos + CTAs */}
          <div className="p-6 sm:p-8 min-[900px]:p-12">
            <span className="az-kicker">Przywileje mieszkańców</span>
            <h2 className="az-h2 sm">{title}</h2>
            <p className="az-lead">{subtitle}</p>

            <div
              className="mt-6 rounded-[22px] p-5 text-white"
              style={{ background: "linear-gradient(135deg, var(--sea), var(--sea-deep))" }}
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                  style={{ background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.3)" }}
                >
                  <BadgePercent size={18} />
                </span>
                <div>
                  <strong style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.4, display: "block" }}>{note}</strong>
                  <span style={{ display: "block", marginTop: 4, fontSize: 13, opacity: 0.8 }}>
                    (* Na miejscu może być wymagany dokument tożsamości lub potwierdzenie zamieszkania.)
                  </span>
                </div>
              </div>
            </div>

            {/* Logos */}
            <p className="mt-8 flex items-center gap-2 text-sm" style={{ color: "var(--ink-60)" }}>
              <ShieldCheck size={16} style={{ color: "var(--sea)" }} aria-hidden />
              Obowiązuje wszystkich mieszkańców poniższych projektów:
            </p>
            <ul role="list" className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {logos.map(({ name, src, href }, i) => {
                const inner = (
                  <div
                    className="group grid h-24 place-items-center rounded-[18px] px-4 transition-transform duration-300"
                    style={{ background: "var(--sky)", border: "1px solid rgba(255,255,255,.9)" }}
                  >
                    <div className="relative h-12 w-full">
                      <DeferredFillImage
                        fill
                        src={src}
                        alt={name}
                        sizes="(min-width: 1024px) 160px, 40vw"
                        quality={75}
                        className="pointer-events-none select-none object-contain opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                        draggable={false}
                      />
                    </div>
                    <span className="sr-only">{name}</span>
                  </div>
                );
                return (
                  <li key={name + i}>
                    {href ? (
                      <Link href={href} prefetch={false} aria-label={name} className="block transition-transform hover:-translate-y-0.5">
                        {inner}
                      </Link>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryCta.href} prefetch={false} className="az-btn sea">{primaryCta.label}</Link>
              <Link href={secondaryCta.href} prefetch={false} className="az-btn glass">{secondaryCta.label}</Link>
            </div>
          </div>

          {/* RIGHT: image panel */}
          <aside
            className="relative min-h-[360px] min-[900px]:min-h-[520px]"
            aria-label={sideImageAlt}
            style={{ background: "var(--sea-deep)" }}
          >
            <DeferredFillImage
              fill
              src={sideImage}
              alt=""
              quality={65}
              sizes="(min-width: 900px) 45vw, 100vw"
              className="object-cover"
              aria-hidden
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(6,58,66,0) 30%, rgba(6,58,66,.78) 100%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white min-[900px]:p-8">
              {sideBadge && <span className="az-st">{sideBadge}</span>}
              <h3 className="mt-3" style={{ fontSize: "clamp(24px, 2.4vw, 34px)", color: "#fff" }}>{sideTitle}</h3>
              {sideSubtitle && (
                <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,.85)", maxWidth: "40ch" }}>{sideSubtitle}</p>
              )}
              {sideHref && (
                <div className="mt-4">
                  <a href={sideHref} className="az-btn glass sm">Zobacz zdjęcia</a>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* footnote */}
        <p className="rv d1" style={{ marginTop: 14, fontSize: 12, color: "var(--ink-40)" }}>
          *Przywileje mogą się zmieniać w zależności od kampanii i sezonu. Na miejscu może być wymagany dokument tożsamości i potwierdzenie zamieszkania.
        </p>
      </div>
    </section>
  );
}
