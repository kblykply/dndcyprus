// app/components/en/about/MissionVisionValues.tsx
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
  title = <>Mission, Vision <b>&amp; Values</b></>,
  missionTitle = "Our Mission",
  missionText = "To develop projects that enhance the quality of life in North Cyprus by combining aesthetic architecture, engineering discipline, and sustainable solutions; and to create value through the principles of transparency, safety, and on-time delivery.",
  visionTitle = "Our Vision",
  visionText = "To become a reference brand in innovative real estate development in North Cyprus and to lead the sector in quality, customer satisfaction, and environmental responsibility.",
  valuesTitle = "Our Values",
  values = [
    "Integrity & Transparency",
    "Quality Focus",
    "Safety Culture (HSE)",
    "Sustainability",
    "Customer Satisfaction",
    "On-Time Delivery",
    "Collaboration & Reliable Supply",
  ],
}: MVVProps) {
  return (
    <section id="mission-vision" className="az-section" aria-label="Mission, Vision & Values">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">
            We support our value-focused approach with transparent, measurable, and sustainable principles.
          </p>
        </div>

        {/* misyon, vizyon ve değerler + projelere soru/düğme (ortak bileşen, metinler bu dilin) */}
        <MvvMedals mission={{ title: missionTitle, text: missionText }} vision={{ title: visionTitle, text: visionText }} valuesTitle={valuesTitle} values={values}
          cta={{ text: "Would you like to see how we bring our values into your projects?", label: "Explore Projects", href: "/en/projects" }} />
      </div>
    </section>
  );
}
