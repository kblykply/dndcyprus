// app/components/about/TimelineMilestones.tsx
import DeferredFillImage from "@/app/components/performance/DeferredFillImage";

type Milestone = {
  year: string;
  title: string;
  description: string;
  image?: string;
  color?: "teal" | "orange";
};

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  milestones?: Milestone[];
  bgSrc?: string; // (Azure'da kullanılmıyor; geriye dönük uyumluluk)
  bgAlt?: string;
  compact?: boolean;
};

// Azure: beyaz 22px kartlar; mobil/tablette yatay kaydırmalı şerit, 900px üstünde 3, çok geniş ekranda 6 sütun.
export default function TimelineMilestones({
  kicker = "DND Cyprus",
  title = "Yolculuğumuz",
  subtitle = "Önemli kilometre taşlarımızı gezinerek keşfedin.",
  milestones = DEFAULT_MILESTONES,
}: Props) {
  return (
    <section id="timeline" className="az-section" aria-label="DND Timeline">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">{subtitle}</p>
        </div>

        <ol
          className="-mx-4 -my-7 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden px-4 py-7 min-[900px]:mx-0 min-[900px]:my-0 min-[900px]:grid min-[900px]:grid-cols-3 min-[900px]:overflow-visible min-[900px]:p-0 2xl:grid-cols-6"
          style={{ scrollbarWidth: "none", scrollPaddingInline: 16 }}
        >
          {milestones.map((m, i) => {
            const accent = (m.color ?? (i % 2 ? "orange" : "teal")) === "orange" ? "var(--coral)" : "var(--sea)";
            return (
              <li
                key={`${m.year}-${i}`}
                className={`rv${i ? ` d${Math.min(i, 4)}` : ""} w-[min(78vw,300px)] flex-none snap-start min-[900px]:w-auto`}
              >
                <article
                  className="h-full overflow-hidden rounded-[22px] bg-white transition-transform duration-500 min-[900px]:hover:-translate-y-1"
                  style={{ border: "1px solid rgba(255,255,255,.9)", boxShadow: "0 10px 30px rgba(13,35,38,.05)" }}
                >
                  {m.image && (
                    <div className="relative h-40 w-full max-w-full overflow-hidden" style={{ background: "var(--sky-2)" }}>
                      <DeferredFillImage
                        fill
                        quality={65}
                        sizes="(min-width: 1536px) 260px, (min-width: 900px) 33vw, 300px"
                        src={m.image}
                        alt={m.title}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2.5">
                      <b
                        className="text-[30px] font-medium leading-none tracking-[-0.02em]"
                        style={{ fontFamily: "var(--font-display)", color: "var(--sea)" }}
                      >
                        {m.year}
                      </b>
                      <i aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: accent }} />
                    </div>
                    <h3 className="mt-3 text-[18px] leading-tight">{m.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--ink-60)" }}>{m.description}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export const DEFAULT_MILESTONES: Milestone[] = [
  {
    year: "2017",
    title: "DND Homes Kuruluşu",
    description: "Şirketin ilk merkezi Boston’da kuruldu.",
    image: "/dnd-boston-ofis.jpg",
    color: "teal",
  },
  {
    year: "2017",
    title: "Amerika’daki İlk Proje",
    description: "12 Longfellow Road, Lexington projesi hayata geçirildi.",
    image: "/12lex.jpg",
    color: "orange",
  },
  {
    year: "2018",
    title: "Ozan Dökmecioğlu Ödülü",
    description: "Boston Business Journal tarafından “Yılın CFO’su” seçildi.",
    image: "/ozan-dokmecioglu-cfo-of-the-year.jpg",
    color: "teal",
  },
  {
    year: "2023",
    title: "DND Kıbrıs Kuruluşu",
    description: "Kıbrıs’ta yeni operasyon merkezi açıldı.",
    image: "/kurulus.JPG",
    color: "orange",
  },
  {
    year: "2025",
    title: "Property NC Ödülleri",
    description: "“En İyi Çıkış Yapan Şirket” ödülüne layık görüldü.",
    image: "/property_awards_2025-747.jpg",
    color: "teal",
  },
  {
    year: "2025",
    title: "İlk Proje La Joya Teslimi",
    description: "La Joya projesi tamamlanarak teslim edildi.",
    image: "/la-joya/2.jpg",
    color: "orange",
  },
];
