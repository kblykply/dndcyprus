// app/components/pl/about/MissionVisionValues.tsx
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
  /** 28px framed image in the bottom row */
};

// Azure: three boxes (mission, vision, values) + framed image and CTA panel underneath.
export default function MissionVisionValues({
  kicker = "DND Cyprus",
  title = <>Misja, wizja <b>i wartości</b></>,
  missionTitle = "Nasza misja",
  missionText = "Tworzymy projekty, które podnoszą jakość życia na Cyprze Północnym, łącząc estetyczną architekturę, inżynierską dyscyplinę i zrównoważone rozwiązania. Wartość budujemy na przejrzystości, bezpieczeństwie i terminowym oddawaniu inwestycji.",
  visionTitle = "Nasza wizja",
  visionText = "Chcemy być marką, która wyznacza standardy innowacyjnej działalności deweloperskiej na Cyprze Północnym, i liderem branży pod względem jakości, satysfakcji klientów oraz odpowiedzialności za środowisko.",
  valuesTitle = "Nasze wartości",
  values = [
    "Uczciwość i przejrzystość",
    "Nacisk na jakość",
    "Kultura bezpieczeństwa (BHP)",
    "Zrównoważony rozwój",
    "Satysfakcja klientów",
    "Terminowa realizacja",
    "Współpraca i niezawodne dostawy",
  ],
}: MVVProps) {
  return (
    <section id="mission-vision" className="az-section" aria-label="Misja, wizja i wartości">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">
            Nasze podejście oparte na wartościach wspieramy przejrzystymi, mierzalnymi i trwałymi zasadami.
          </p>
        </div>

        {/* misyon, vizyon ve değerler + projelere soru/düğme (ortak bileşen, metinler bu dilin) */}
        <MvvMedals mission={{ title: missionTitle, text: missionText }} vision={{ title: visionTitle, text: visionText }} valuesTitle={valuesTitle} values={values}
          cta={{ text: "Chcą Państwo zobaczyć, jak nasze wartości przekładają się na konkretne projekty?", label: "Zobacz projekty", href: "/pl/projects" }} />
      </div>
    </section>
  );
}
