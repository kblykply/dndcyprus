// app/components/pl/about/WhyChooseUs.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

type Strength = {
  title: string;
  description: string;
  icon?: ReactNode; // optional icon slot
  image?: string;   // optional image slot
  accent?: "teal" | "orange";
};

type Props = {
  kicker?: string;
  title?: ReactNode;
  subtitle?: string;
  strengths?: Strength[];
};

// Azure: heading block + four white panels (icon, title, description) + thin-ruled CTA row underneath.
export default function WhyChooseUs({
  kicker = "DND Cyprus",
  title = <>Dlaczego warto <b>nas wybrać?</b></>,
  subtitle = "Wyróżnia nas rzetelne, innowacyjne i zrównoważone podejście.",
  strengths = [
    {
      title: "Gwarancja jakości",
      description: "Dzięki procesom z certyfikatem ISO utrzymujemy wysokie standardy jakości w każdym projekcie.",
      accent: "teal",
    },
    {
      title: "Terminowa realizacja",
      description: "Kończymy projekty w zaplanowanych terminach – rzetelnie i przejrzyście.",
      accent: "orange",
    },
    {
      title: "Zrównoważony rozwój",
      description: "Priorytetem są dla nas energooszczędność, materiały przyjazne środowisku i ekologiczne rozwiązania.",
      accent: "teal",
    },
    {
      title: "Satysfakcja klientów",
      description: "Dzięki przejrzystej komunikacji i wsparciu posprzedażowemu budujemy długotrwałe relacje oparte na zaufaniu.",
      accent: "orange",
    },
  ],
}: Props) {
  return (
    <section id="why-us" className="az-section" aria-label="Dlaczego warto nas wybrać / Nasze atuty">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2 xl:grid-cols-4">
          {strengths.map((s, i) => {
            const orange = s.accent === "orange";
            return (
              <article key={s.title} className={`az-panel rv${i ? ` d${Math.min(i, 4)}` : ""}`}>
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl"
                  style={{ background: orange ? "rgba(241,92,52,.12)" : "rgba(13,101,112,.1)", color: orange ? "var(--coral)" : "var(--sea)" }}
                >
                  {s.icon ?? (s.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image} alt={s.title} className="h-7 w-7 object-contain" />
                  ) : (
                    <CheckCircle size={24} aria-hidden="true" />
                  ))}
                </div>
                <h3 className="mt-5 text-[22px] leading-tight">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--ink-60)" }}>{s.description}</p>
              </article>
            );
          })}
        </div>

        <div className="rv d2 mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--line)" }}>
          <p className="m-0 text-[15px]" style={{ color: "var(--ink-60)" }}>Aby dowiedzieć się więcej, prosimy o kontakt.</p>
          <Link className="az-btn sea sm" href="/pl/contact" prefetch={false}>Skontaktuj się z nami</Link>
        </div>
      </div>
    </section>
  );
}
