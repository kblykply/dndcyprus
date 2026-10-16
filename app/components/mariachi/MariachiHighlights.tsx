// app/components/mariachi/MariachiHighlights.tsx
import type { ReactNode } from "react";
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";
import { Waves, Umbrella, Martini, Music4, Sparkles, Sun } from "lucide-react";

type Highlight = {
  title: string;
  desc?: string;
  /** Kart arka plan görseli (public/ yolundan) */
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
  { title: "Havuz & Plaj", desc: "Geniş güneşlenme alanları, duş ve havlu servisi.", image: "/azure/mb-4.jpg", icon: <Waves size={ICON} /> },
  { title: "Cabanalar", desc: "Gün boyu gölgede konfor; rezervasyon önerilir.", image: "/azure/mb-7.jpg", icon: <Umbrella size={ICON} /> },
  { title: "Restoran & Havuz Barı", desc: "Gündüz ferah tatlar, akşam imza kokteyller.", image: "/azure/mb-3.jpg", icon: <Martini size={ICON} /> },
  { title: "DJ Geceleri", desc: "Sunset’ten geç saate uzanan canlı performanslar.", image: "/azure/mb-5.jpg", icon: <Music4 size={ICON} /> },
  { title: "Spa & Wellness", desc: "Masaj ve bakım hizmetleri (projeye göre).", image: "/azure/mb-6.jpg", icon: <Sparkles size={ICON} /> },
  { title: "Kıyı Deneyimi", desc: "Akdeniz esintisi ve sahil yürüyüşleri.", image: "/azure/mb-1.jpg", icon: <Sun size={ICON} /> },
];

export default function MariachiHighlights({
  title = <>Olanaklar & <b>Ayrıcalıklar</b></>,
  subtitle = "Gün boyu plaj keyfi, cabana konforu, restoran & havuz barı ve akşam DJ performansları.",
  items,
}: Props) {
  const data = items ?? DEFAULT_ITEMS;

  return (
    <section className="az-section" aria-label="Mariachi Beach Club — Öne Çıkanlar">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">Öne Çıkanlar</span>
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
                  {card.icon} Öne Çıkan
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
