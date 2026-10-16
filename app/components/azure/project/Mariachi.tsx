import Link from "next/link";
import { PiInfoDuotone, PiSealPercentDuotone, PiTicketDuotone } from "react-icons/pi";
import LazyYouTube from "@/app/components/LazyYouTube";
import { mono } from "@/app/fonts";
import { MARIACHI_MEDIA, MARIACHI_PERKS } from "@/lib/azure/projects/mariachi";
import type { Locale } from "@/lib/azure/site";
import "../meridian.css";

// Mariachi Beach Club avantajları — Meridian dili: üstte temiz video bandı (renk katmanı yok),
// altta iki sütun: logo + başlık + düğme | ince çizgili avantaj satırları ve not.
export default function Mariachi({ locale, id }: { locale: Locale; id: string }) {
  const t = MARIACHI_PERKS[locale];
  return (
    <section className={`az-section az-proj mr ${mono.variable}`} id={id}>
      <div className="az-wrap">
        <div className="mr-band rv">
          <LazyYouTube videoId={MARIACHI_MEDIA.youtubeId} query={MARIACHI_MEDIA.embedQuery} zoom={1.38} cover className="absolute inset-0" title={t.videoTitle} posterAlt={t.videoPosterAlt} playLabel={t.videoPlayLabel} />
          <span className="tag">{t.kicker} · İskele</span>
        </div>
        <div className="mr-under rv d1">
          <div>
            <div className="hd">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/azure/brands/mariachi.webp" alt="Mariachi Beach Club" loading="lazy" />
              <div>
                <span className="az-kicker">{t.kicker}</span>
                <h2>{t.title}</h2>
                <p className="sub">{t.subtitle}</p>
              </div>
            </div>
            <div className="cta"><Link className="az-btn sea sm" href={t.href} prefetch={false} aria-label={t.ctaAria}>{t.cta} →</Link></div>
          </div>
          <div>
            <div className="mr-rows">
              {t.perks.map((p) => (
                <div key={p.title}>
                  <i aria-hidden>{p.icon === "BadgePercent" ? <PiSealPercentDuotone size={22} /> : <PiTicketDuotone size={22} />}</i>
                  <div><b>{p.title}</b><small>{p.desc}</small></div>
                </div>
              ))}
            </div>
            <p className="mr-note mr-mono"><PiInfoDuotone size={15} aria-hidden /> {t.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
