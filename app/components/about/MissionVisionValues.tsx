// app/components/about/MissionVisionValues.tsx
import type { ReactNode } from "react";
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

        {/* misyon, vizyon ve değerler + projelere soru/düğme (ortak bileşen, metinler bu dilin) */}
        <MvvMedals mission={{ title: missionTitle, text: missionText }} vision={{ title: visionTitle, text: visionText }} valuesTitle={valuesTitle} values={values}
          cta={{ text: "Değerlerimizi projelerinize nasıl taşıdığımızı görmek ister misiniz?", label: "Projeleri İncele", href: "/tr/projects" }} />
      </div>
    </section>
  );
}
