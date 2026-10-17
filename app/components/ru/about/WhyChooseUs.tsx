// app/components/ru/about/WhyChooseUs.tsx
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
  title = <>Почему <b>выбирают нас?</b></>,
  subtitle = "Нас отличает надёжный, инновационный и устойчивый подход.",
  strengths = [
    {
      title: "Гарантия качества",
      description: "Благодаря процессам, сертифицированным по ISO, мы выдерживаем высокие стандарты в каждом проекте.",
      accent: "teal",
    },
    {
      title: "Сдача в срок",
      description: "Мы завершаем проекты точно в запланированные сроки — надёжно и прозрачно.",
      accent: "orange",
    },
    {
      title: "Устойчивое развитие",
      description: "Энергоэффективность, экологичные материалы и «зелёные» решения — наш приоритет.",
      accent: "teal",
    },
    {
      title: "Удовлетворённость клиентов",
      description: "Открытое общение и послепродажная поддержка помогают нам строить долгие отношения, основанные на доверии.",
      accent: "orange",
    },
  ],
}: Props) {
  return (
    <section id="why-us" className="az-section" aria-label="Почему выбирают нас / наши сильные стороны">
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
                  style={{ background: orange ? "rgba(205,72,36,.12)" : "rgba(13,101,112,.1)", color: orange ? "var(--coral)" : "var(--sea)" }}
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
          <p className="m-0 text-[15px]" style={{ color: "var(--ink-60)" }}>Свяжитесь с нами, чтобы узнать больше.</p>
          <Link className="az-btn sea sm" href="/ru/contact" prefetch={false}>Связаться с нами</Link>
        </div>
      </div>
    </section>
  );
}
