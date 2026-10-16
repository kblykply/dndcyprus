// app/components/about/MissionVisionValues.tsx
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import MvvMedals from "@/app/components/azure/about/MvvMedals";

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

        {/* misyon, vizyon ve değerler: madalya sistemi (ortak bileşen, metinler bu dilin) */}
        <MvvMedals mission={{ title: missionTitle, text: missionText }} vision={{ title: visionTitle, text: visionText }} valuesTitle={valuesTitle} values={values} />

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
