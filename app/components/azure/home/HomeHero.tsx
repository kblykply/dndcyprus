import { getImageProps } from "next/image";
import Link from "next/link";
import { preload } from "react-dom";
import { HOME } from "@/lib/azure/home";
import { href, type Locale } from "@/lib/azure/site";

// Dik telefon ekranı: çerçeve fotoğrafın yalnız ortasını gösteriyor (cover, en fazla ~0,78 en/boy); oraya aynı
// bölgenin kesilmiş kopyası iner (lv-5-dik.jpg: lv-5.jpg'nin ortasından 840×1005, aynı ölçek, aynı pikseller)
const DIK = "(max-aspect-ratio: 2/3)";

export default function HomeHero({ locale }: { locale: Locale }) {
  const t = HOME[locale].hero;
  // Afiş videonun altında duran duyarlı görsel (LCP öğesi): `poster` özelliği her ekrana 1800 px JPEG indiriyordu.
  // Video ilk karesi gelene kadar saydam kalır, sonra görselin üstünü örter.
  const dik = getImageProps({ src: "/azure/lv-5-dik.jpg", alt: "", width: 840, height: 1005, quality: 75, sizes: "68vh" }).props;
  const { srcSet, sizes, ...img } = getImageProps({ src: "/azure/lv-5.jpg", alt: "", fill: true, quality: 75, sizes: "100vw", loading: "eager", fetchPriority: "high" }).props;
  preload(dik.src, { as: "image", imageSrcSet: dik.srcSet, imageSizes: dik.sizes, fetchPriority: "high", media: DIK });
  preload(img.src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high", media: `not all and ${DIK}` });
  return (
    <section className="az-hero full" id="top">
      <div className="frame">
        <picture>
          <source media={DIK} srcSet={dik.srcSet} sizes={dik.sizes} />
          <img {...img} alt="" srcSet={srcSet} sizes={sizes} className="bg" />
        </picture>
        <video className="bg" autoPlay muted loop playsInline preload="auto" aria-label="DND Cyprus">
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
