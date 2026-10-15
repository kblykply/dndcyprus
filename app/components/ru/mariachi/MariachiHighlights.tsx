// app/components/ru/mariachi/MariachiHighlights.tsx
import type { ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";
import { Waves, Umbrella, Martini, Music4, Sparkles, Sun } from "lucide-react";

type Highlight = {
  title: string;
  desc?: string;
  /** Card background image (public/ path) */
  image: string;
  icon?: ReactNode;
};

type Props = {
  title?: ReactNode;
  subtitle?: string;
  items?: Highlight[];
};

const ICON = 14;

const DEFAULT_ITEMS: Highlight[] = [
  { title: "Бассейн и пляж", desc: "Просторные зоны для загара, души и полотенца.", image: "/azure/mb-4.jpg", icon: <Waves size={ICON} /> },
  { title: "Кабаны", desc: "Уютная тень в течение всего дня; рекомендуем бронировать заранее.", image: "/azure/mb-7.jpg", icon: <Umbrella size={ICON} /> },
  { title: "Ресторан и бар у бассейна", desc: "Освежающие блюда днём, авторские коктейли вечером.", image: "/azure/mb-3.jpg", icon: <Martini size={ICON} /> },
  { title: "DJ-вечеринки", desc: "Живые сеты от заката до поздней ночи.", image: "/azure/dj.jpg", icon: <Music4 size={ICON} /> },
  { title: "Спа и велнес", desc: "Массаж и уходовые процедуры (в зависимости от проекта).", image: "/spa.jpg", icon: <Sparkles size={ICON} /> },
  { title: "Жизнь у моря", desc: "Средиземноморский бриз и живописные прогулки вдоль берега.", image: "/azure/sea.jpg", icon: <Sun size={ICON} /> },
];

export default function MariachiHighlights({
  title = <>Удобства <b>и привилегии</b></>,
  subtitle = "Пляжный отдых весь день, комфорт кабан, ресторан и бар у бассейна, а вечером — DJ-сеты.",
  items,
}: Props) {
  const data = items ?? DEFAULT_ITEMS;

  return (
    <section className="az-section" aria-label="Mariachi Beach Club — главное">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">Главное</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[1000px]:grid-cols-3">
          {data.map((card, i) => (
            <article key={card.title + i} className={`az-tile img rv d${i % 4}`} style={{ minHeight: 320 }}>
              <div className="absolute inset-0" style={{ zIndex: -2 }} aria-hidden>
                <DeferredFillImage
                  fill
                  src={card.image}
                  alt=""
                  quality={65}
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 999px) 50vw, 33vw"
                  className="bg object-cover"
                />
              </div>
              {card.icon ? (
                <span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  {card.icon} Особое
                </span>
              ) : null}
              <h3>{card.title}</h3>
              {card.desc ? <p>{card.desc}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
