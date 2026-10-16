// app/components/de/about/MissionVisionValues.tsx
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
  title = <>Mission, Vision <b>&amp; Werte</b></>,
  missionTitle = "Unsere Mission",
  missionText = "Wir entwickeln Projekte, die die Lebensqualität in Nordzypern steigern – mit ästhetischer Architektur, ingenieurtechnischer Präzision und nachhaltigen Lösungen. Dabei schaffen wir Werte durch Transparenz, Sicherheit und termingerechte Übergabe.",
  visionTitle = "Unsere Vision",
  visionText = "Wir wollen zur Referenzmarke für innovative Immobilienentwicklung in Nordzypern werden und die Branche in Qualität, Kundenzufriedenheit und ökologischer Verantwortung anführen.",
  valuesTitle = "Unsere Werte",
  values = [
    "Integrität & Transparenz",
    "Qualitätsanspruch",
    "Sicherheitskultur (HSE)",
    "Nachhaltigkeit",
    "Kundenzufriedenheit",
    "Termingerechte Übergabe",
    "Partnerschaft & verlässliche Lieferketten",
  ],
}: MVVProps) {
  return (
    <section id="mission-vision" className="az-section" aria-label="Mission, Vision & Werte">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">
            Unseren wertorientierten Ansatz stützen wir auf transparente, messbare und nachhaltige Prinzipien.
          </p>
        </div>

        {/* misyon, vizyon ve değerler + projelere soru/düğme (ortak bileşen, metinler bu dilin) */}
        <MvvMedals mission={{ title: missionTitle, text: missionText }} vision={{ title: visionTitle, text: visionText }} valuesTitle={valuesTitle} values={values}
          cta={{ text: "Möchten Sie sehen, wie wir unsere Werte in Ihre Projekte einbringen?", label: "Projekte entdecken", href: "/de/projects" }} />
      </div>
    </section>
  );
}
