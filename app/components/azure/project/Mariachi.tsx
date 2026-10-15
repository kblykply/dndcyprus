import Link from "next/link";
import { BadgePercent, Info, Waves } from "lucide-react";
import LazyYouTube from "@/app/components/LazyYouTube";
import { MARIACHI_MEDIA, MARIACHI_PERKS } from "@/lib/azure/projects/mariachi";
import type { Locale } from "@/lib/azure/site";

// Mariachi Beach Club avantajları: koyu deniz kartı — logo, başlık, video + avantaj satırları.
export default function Mariachi({ locale, id }: { locale: Locale; id: string }) {
  const t = MARIACHI_PERKS[locale];
  return (
    <section className="az-section az-proj" id={id}>
      <div className="az-wrap">
        <div className="az-mp rv">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bg" src={MARIACHI_MEDIA.bg} alt="" loading="lazy" />
          <div className="hd">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MARIACHI_MEDIA.logo} alt="Mariachi Beach Club" loading="lazy" />
            <div>
              <span className="az-kicker light">{t.kicker}</span>
              <h2>{t.title}</h2>
              <p>{t.subtitle}</p>
            </div>
          </div>
          <div className="g">
            <div>
              <div className="v">
                <LazyYouTube videoId={MARIACHI_MEDIA.youtubeId} query={MARIACHI_MEDIA.embedQuery} zoom={MARIACHI_MEDIA.zoom} className="absolute inset-0" title={t.videoTitle} posterAlt={t.videoPosterAlt} playLabel={t.videoPlayLabel} />
              </div>
              <div className="cta"><Link className="az-btn glass sm" href={t.href} prefetch={false} aria-label={t.ctaAria}>{t.cta} →</Link></div>
            </div>
            <div>
              <div className="perks">
                {t.perks.map((p) => (
                  <div key={p.title} className="perk">
                    <i aria-hidden>{p.icon === "BadgePercent" ? <BadgePercent size={20} /> : <Waves size={20} />}</i>
                    <div><h3>{p.title}</h3><p>{p.desc}</p></div>
                  </div>
                ))}
              </div>
              <div className="note"><Info size={15} aria-hidden /><p>{t.note}</p></div>
              <div className="strip" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
