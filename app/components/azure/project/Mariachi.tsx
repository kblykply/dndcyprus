import Arrow from "../Arrow";
import Link from "next/link";
import { PiSealPercentDuotone, PiTicketDuotone } from "react-icons/pi";
import LazyYouTube from "@/app/components/LazyYouTube";
import { MARIACHI_MEDIA, MARIACHI_PERKS } from "@/lib/azure/projects/mariachi";
import type { Locale } from "@/lib/azure/site";
import "../meridian.css";

// Mariachi Beach Club avantajları — Meridian dili: üstte temiz video bandı (renk katmanı yok),
// altta iki sütun ortak çizgilerde: solda logo, başlık, alt başlık ve düğme tek kenarda; sağda ince çizgili avantaj
// satırları ve not. Logonun üstü satırların üst çizgisinde, düğmenin altı notun altında.
export default function Mariachi({ locale, id }: { locale: Locale; id: string }) {
  const t = MARIACHI_PERKS[locale];
  return (
    <section className="az-section az-proj mr" id={id}>
      <div className="az-wrap">
        <div className="mr-band rv">
          <LazyYouTube videoId={MARIACHI_MEDIA.youtubeId} query={MARIACHI_MEDIA.embedQuery} ratio={MARIACHI_MEDIA.ratio} poster={MARIACHI_MEDIA.poster} cover className="absolute inset-0" title={t.videoTitle} posterAlt={t.videoPosterAlt} playLabel={t.videoPlayLabel} />
          <span className="tag">{t.kicker} · İskele</span>
        </div>
        <div className="mr-under rv d1">
          <div className="intro">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo" src="/azure/brands/mariachi.webp" alt="Mariachi Beach Club" loading="lazy" />
            <h2>{t.title}</h2>
            <p className="sub">{t.subtitle}</p>
            <div className="cta"><Link className="az-btn sea sm" href={t.href} prefetch={false}>{t.cta} <Arrow /></Link></div>
          </div>
          <div className="perks">
            <div className="mr-rows">
              {t.perks.map((p) => (
                <div key={p.title}>
                  <i aria-hidden>{p.icon === "BadgePercent" ? <PiSealPercentDuotone size={22} /> : <PiTicketDuotone size={22} />}</i>
                  <div><b>{p.title}</b><small>{p.desc}</small></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
