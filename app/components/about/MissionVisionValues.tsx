// app/components/about/MissionVisionValues.tsx
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type MVVProps = {
  kicker?: string;
  title?: ReactNode;
  missionTitle?: string;
  missionText?: string;
  visionTitle?: string;
  visionText?: string;
  valuesTitle?: string;
  values?: string[];
  /** Alt sıradaki 28px çerçeveli görsel */
  bgSrc?: string;
};

// Azure: üç beyaz/deniz yeşili kutu (misyon, vizyon, değerler) + altta çerçeveli görsel ve CTA paneli.
export default function MissionVisionValues({
  kicker = "DND Cyprus",
  title = <>Misyon, Vizyon <b>&amp; Değerler</b></>,
  missionTitle = "Misyonumuz",
  missionText = "Estetik mimariyi, mühendislik disiplinini ve sürdürülebilir çözümleri birleştirerek Kuzey Kıbrıs’ta yaşam kalitesini yükselten projeler geliştirmek; şeffaflık, güvenlik ve zamanında teslim prensipleriyle değer üretmek.",
  visionTitle = "Vizyonumuz",
  visionText = "Kuzey Kıbrıs’ta yenilikçi gayrimenkul geliştirme alanında referans marka olmak; kalite, müşteri memnuniyeti ve çevresel duyarlılık konularında sektöre yön vermek.",
  valuesTitle = "Değerlerimiz",
  values = [
    "Dürüstlük & Şeffaflık",
    "Kalite Odaklılık",
    "Güvenlik Kültürü (HSE)",
    "Sürdürülebilirlik",
    "Müşteri Memnuniyeti",
    "Zamanında Teslim",
    "İşbirliği & Güvenilir Tedarik",
  ],
  bgSrc = "/perla-ii-in/2.jpg",
}: MVVProps) {
  return (
    <section id="misyon-vizyon" className="az-section" aria-label="Misyon, Vizyon ve Değerler">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">
            Değer odaklı yaklaşımımızı şeffaf, ölçülebilir ve sürdürülebilir ilkelerle destekliyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[900px]:grid-cols-3">
          <article className="az-panel rv">
            <CardHead n="01" title={missionTitle} accent="var(--sea)" />
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--ink-60)" }}>{missionText}</p>
          </article>

          <article className="az-panel rv d1">
            <CardHead n="02" title={visionTitle} accent="var(--coral)" />
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--ink-60)" }}>{visionText}</p>
          </article>

          <article className="az-tile sea rv d2" style={{ justifyContent: "flex-start" }}>
            <div className="k">03</div>
            <h3>{valuesTitle}</h3>
            <ul className="rules">
              {values.map((val) => (
                <li key={val}><i>✓</i>{val}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 min-[900px]:grid-cols-[1.15fr_0.85fr]">
          <figure
            className="rv d1 relative m-0 min-h-[260px] w-full max-w-full overflow-hidden rounded-[28px]"
            style={{ background: "var(--sky-2)" }}
          >
            <Image src={bgSrc} alt="" fill sizes="(min-width: 900px) 60vw, 100vw" className="object-cover" quality={65} loading="lazy" />
          </figure>
          <div className="az-panel rv d2 flex flex-col justify-center gap-5">
            <p className="m-0 text-[17px] leading-relaxed">Değerlerimizi projelerinize nasıl taşıdığımızı görmek ister misiniz?</p>
            <div>
              <Link className="az-btn sea sm" href="/tr/projects" prefetch={false}>
                Projeleri İncele
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardHead({ n, title, accent }: { n: string; title: string; accent: string }) {
  return (
    <div>
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: accent }}>{n}</span>
      <h3 className="mt-2 text-[clamp(22px,2.2vw,30px)] leading-tight">{title}</h3>
    </div>
  );
}
