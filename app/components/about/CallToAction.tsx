// app/components/about/CallToAction.tsx
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  kicker?: string;
  title?: ReactNode;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
  /** Kart arka plan görseli */
  bgSrc?: string;
  bgAlt?: string;
};

// Azure: iletişim kartı gibi görsel arka planlı, koyu deniz yeşili tek kart + mercan pill buton (.az-contact .card).
export default function CallToAction({
  kicker = "DND Cyprus",
  title = <>Birlikte Geleceği <b>İnşa Edelim</b></>,
  subtitle = "Projeleriniz için güvenilir ve yenilikçi bir çözüm ortağı arıyorsanız, bizimle iletişime geçin.",
  buttonLabel = "İletişime Geçin",
  buttonHref = "/tr/contact",
  bgSrc = "/azure/contact-sea.webp", // sitedeki tüm iletişim kartlarıyla aynı deniz arka planı
  bgAlt = "",
}: Props) {
  return (
    <section id="iletisim" className="az-section az-contact" aria-label="Call to Action">
      <div className="az-wrap">
        <div className="card single rv" style={{ minHeight: 400, alignContent: "center" }}>
          <Image className="bg" src={bgSrc} alt={bgAlt} fill sizes="100vw" quality={70} loading="lazy" />
          <div style={{ maxWidth: 640 }}>
            <span className="az-kicker light">{kicker}</span>
            <h2>{title}</h2>
            <p className="lead">{subtitle}</p>
            <div className="cta">
              <Link className="az-btn" href={buttonHref} prefetch={false}>{buttonLabel}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
