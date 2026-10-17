import Link from "next/link";
import { preload } from "react-dom";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";

export default function HomeHero({ locale }: { locale: Locale }) {
  const t = HOME[locale].hero;
  // LCP öğesi video afişi: tarayıcı onu videodan (6 MB) önce ve yüksek öncelikle alsın
  preload("/azure/lv-5.jpg", { as: "image", fetchPriority: "high" });
  return (
    <section className="az-hero full" id="top">
      <div className="frame">
        <video className="bg" autoPlay muted loop playsInline preload="auto" poster="/azure/lv-5.jpg" aria-label="DND Cyprus">
          <source src="/videos/hero-montaj.mp4" type="video/mp4" />
        </video>
        <div className="top">
          <span className="az-tag">{t.tag}</span>
          <a className="play" href="https://www.youtube.com/@dndcyprus" target="_blank" rel="noopener noreferrer">
            <i><svg width="14" height="14" viewBox="0 0 12 12" aria-hidden><path d="M3 2l7 4-7 4z" fill="currentColor" /></svg></i><span>{t.play}</span>
          </a>
        </div>
        <div className="c">
          <div>
            <h1 className="rv">{t.title}</h1>
            <div className="cta rv d2">
              <Link className="az-btn" href={href(locale, "/projects")} prefetch={false}>{t.primary}</Link>
              <Link className="az-btn glass" href={href(locale, "/lagoon-verde")} prefetch={false}>{t.secondary}</Link>
            </div>
          </div>
          {/* proje sayfalarındaki gibi hafifçe süzülen cam kartlar (az-chip): şirket genelinde öne çıkan üç rakam */}
          <div className="chips rv d2">
            {t.chips.map((ch) => <div key={ch.label} className="az-chip"><b>{ch.big}</b><span>{ch.label}</span></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
