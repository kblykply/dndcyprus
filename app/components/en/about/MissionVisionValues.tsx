// app/components/en/about/MissionVisionValues.tsx
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
  bgSrc = "/perla-ii-in/2.jpg",
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
            <p className="m-0 text-[17px] leading-relaxed">Would you like to see how we bring our values into your projects?</p>
            <div>
              <Link className="az-btn sea sm" href="/en/projects" prefetch={false}>
                Explore Projects
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
