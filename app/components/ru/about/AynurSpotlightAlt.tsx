// app/components/ru/about/AynurSpotlightAlt.tsx
import Link from "next/link";
import { portraitSource } from "@/lib/optimized-portraits";

type Props = {
  title?: string;
  role?: string;
  subtitle?: string;
  quote?: string;
  image?: string;
  highlights?: { k: string; v: string }[];
  profileHref?: string;
  contactHref?: string;
};

// Azure: kicker / name / role / quote / fact cards / pill buttons on the left, 3:4 framed portrait on the right.
export default function AynurSpotlightAlt({
  title = "Aynur Zorba Güloğlu",
  role = "Директор DND Cyprus",
  subtitle = "Обеспечивает стратегическое руководство: операционное совершенство, клиентский опыт и устойчивые проекты.",
  quote = "«Доверие, прозрачность и командный дух — в основе нашего успеха».",
  image = "/azure/aynur.jpg",
  highlights = [
    { k: "Фокус", v: "Операционное руководство" },
    { k: "Экспертиза", v: "Архитектура и управление" },
    { k: "Подход", v: "Устойчивое развитие" },
  ],
  profileHref = "/ru/projects",
  contactHref = "/ru/contact",
}: Props) {
  return (
    <section id="director" className="az-section" aria-label="Aynur Zorba Güloğlu — портрет">
      <div className="az-wrap">
        <div className="grid grid-cols-1 items-center gap-8 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-14">
          <div>
            <span className="az-kicker rv">Руководство компании</span>
            <h2 className="az-h2 sm rv d1">{title}</h2>
            <div className="rv d1 mt-2 text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--sea)" }}>
              {role}
            </div>
            <p className="az-lead rv d2">{subtitle}</p>

            {quote && (
              <blockquote
                className="rv d2 mt-6 border-l-2 pl-4 text-[17px] leading-relaxed"
                style={{ borderColor: "var(--coral)", color: "var(--ink)" }}
              >
                {quote}
              </blockquote>
            )}

            <dl className="rv d3 m-0 mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {highlights.map((f, i) => (
                <div
                  key={f.k + i}
                  className="rounded-[18px] bg-white px-4 py-3"
                  style={{ border: "1px solid rgba(255,255,255,.9)", boxShadow: "0 6px 18px rgba(13,35,38,.05)" }}
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--sea)" }}>{f.k}</dt>
                  <dd className="m-0 mt-1 text-[14px] font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>

            <div className="rv d3 mt-7 flex flex-wrap gap-3">
              <Link className="az-btn sea sm" href={profileHref} prefetch={false}>Проекты</Link>
              <Link className="az-btn glass sm" href={contactHref} prefetch={false}>Контакты</Link>
            </div>
          </div>

          <figure
            className="rv d1 relative order-first m-0 w-full max-w-full overflow-hidden rounded-[28px] min-[900px]:order-none"
            style={{ aspectRatio: "3 / 4", background: "var(--sky-2)", border: "1px solid rgba(255,255,255,.9)", boxShadow: "0 24px 60px rgba(13,35,38,.12)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portraitSource(image)}
              alt={title}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover object-top"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
