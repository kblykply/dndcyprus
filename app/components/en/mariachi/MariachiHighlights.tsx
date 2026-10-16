// app/components/en/mariachi/MariachiHighlights.tsx
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
  { title: "Pool & Beach", desc: "Spacious sunbathing areas with shower and towel service.", image: "/azure/mb-4.jpg", icon: <Waves size={ICON} /> },
  { title: "Cabanas", desc: "Comfortable shaded spaces throughout the day; reservations recommended.", image: "/azure/mb-7.jpg", icon: <Umbrella size={ICON} /> },
  { title: "Restaurant & Pool Bar", desc: "Refreshing flavors by day, signature cocktails in the evening.", image: "/azure/mb-3.jpg", icon: <Martini size={ICON} /> },
  { title: "DJ Nights", desc: "Live performances from sunset into the late hours.", image: "/azure/mb-5.jpg", icon: <Music4 size={ICON} /> },
  { title: "Spa & Wellness", desc: "Massage and treatment services (depending on the project).", image: "/azure/mb-6.jpg", icon: <Sparkles size={ICON} /> },
  { title: "Coastal Experience", desc: "Mediterranean breeze and scenic seaside walks.", image: "/azure/mb-1.jpg", icon: <Sun size={ICON} /> },
];

export default function MariachiHighlights({
  title = <>Amenities & <b>Privileges</b></>,
  subtitle = "All-day beach enjoyment, cabana comfort, a restaurant & pool bar, and evening DJ performances.",
  items,
}: Props) {
  const data = items ?? DEFAULT_ITEMS;

  return (
    <section className="az-section" aria-label="Mariachi Beach Club — Highlights">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">Highlights</span>
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
                  {card.icon} Featured
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
