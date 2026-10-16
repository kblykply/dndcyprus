// app/components/ru/about/CallToAction.tsx
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  kicker?: string;
  title?: ReactNode;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
  /** Card background image */
  bgSrc?: string;
  bgAlt?: string;
};

// Azure: single deep-sea card with image background, like the contact card (.az-contact .card), plus a coral pill button.
export default function CallToAction({
  kicker = "DND Cyprus",
  title = <>Построим будущее <b>вместе</b></>,
  subtitle = "Если вы ищете надёжного и инновационного партнёра для своих проектов, свяжитесь с нами.",
  buttonLabel = "Связаться с нами",
  buttonHref = "/ru/contact",
  bgSrc = "/azure/contact-sea.webp", // sitedeki tüm iletişim kartlarıyla aynı deniz arka planı
  bgAlt = "",
}: Props) {
  return (
    <section id="contact" className="az-section az-contact" aria-label="Призыв к действию">
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
