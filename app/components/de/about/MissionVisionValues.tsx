// app/components/de/about/MissionVisionValues.tsx
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
  /** 28px framed image in the bottom row */
  bgSrc?: string;
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
  bgSrc = "/perla-ii-in/2.jpg",
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
            <p className="m-0 text-[17px] leading-relaxed">Möchten Sie sehen, wie wir unsere Werte in Ihre Projekte einbringen?</p>
            <div>
              <Link className="az-btn sea sm" href="/de/projects" prefetch={false}>
                Projekte entdecken
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
