import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { HERO_DIK } from "@/lib/azure/hero-dik";
import { HOME_FLOW } from "@/lib/azure/home-flow";
import { PROJECT_PAGES } from "@/lib/azure/projects";
import { href, PROJECTS, type Locale, type ProjectSlug } from "@/lib/azure/site";
import HeroSlider, { type Slide } from "./HeroSlider";

// Dik telefon ekranı: çerçeve fotoğrafın yalnız ortasını gösteriyor; oraya aynı bölgenin kesilmiş kopyası iner
const DIK = "(max-aspect-ratio: 2/3)";

// Vitrin görselleri (müşterinin istediği sıra: NeoCity → Lagoon Verde → La Joya → Perla → Perla II)
const IMG: Partial<Record<ProjectSlug, string>> = {
  neocity: "/neocity/hero.jpg",
  "lagoon-verde": "/azure/lv-5.jpg",
  "la-joya": "/azure/lj-joy-tabela.jpg", // Joy Cafe & Bar havuz pavyonu; ön saçakta gerçek tabelanın biçiminde (logo hattını izleyen kalın kontur kesim plaka) Joy tabelası
  perla: "/azure/p1-7.jpg",
  "perla-ii": "/perla-ii/3.jpg",
};

/**
 * Ana sayfa vitrini: "DND Cyprus — Hayalinizdeki yaşam burada başlıyor" sabit başlığı altında projeler sırayla döner
 * (oklar, proje adlı noktalar, kendiliğinden geçiş). Her slaytta proje logosu, adı, tek cümlelik başlık ve
 * "Projeyi keşfet"; ödüllü projede ödül etiketi. Sağdaki rakam kartları ve ikinci bağlantı yok (müşteri isteği,
 * Ekim 2026). Görseller burada hazırlanır (ekrana göre srcset; dik telefonda kesit), yalnız ilk slayt önceden yüklenir.
 */
export default function HomeHero({ locale }: { locale: Locale }) {
  const t = HOME_FLOW[locale].hero;
  const slides: Slide[] = t.slides.map((s, k) => {
    const src = IMG[s.slug]!;
    const p = PROJECTS.find((x) => x.slug === s.slug)!;
    const page = PROJECT_PAGES[s.slug as keyof typeof PROJECT_PAGES];
    const first = k === 0;
    const { srcSet, sizes, ...img } = getImageProps({ src, alt: "", fill: true, quality: 75, sizes: "100vw", ...(first ? { loading: "eager" as const, fetchPriority: "high" as const } : {}) }).props;
    const d = HERO_DIK[src];
    const dik = d ? getImageProps({ src: d.src, alt: "", width: d.w, height: d.h, quality: 75, sizes: "68vh" }).props : null;
    if (first) {
      if (dik) preload(dik.src, { as: "image", imageSrcSet: dik.srcSet, imageSizes: dik.sizes, fetchPriority: "high", media: DIK });
      preload(img.src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high", media: dik ? `not all and ${DIK}` : undefined });
    }
    return {
      key: s.slug,
      href: href(locale, `/${s.slug}`),
      logo: p.logo ?? "",
      name: s.name,
      short: p.name,
      title: s.title,
      sub: s.sub,
      award: page?.award?.[locale],
      img: { src: img.src, srcSet: srcSet ?? "", sizes: sizes ?? "100vw" },
      dik: dik ? { src: dik.src, srcSet: dik.srcSet ?? "", sizes: dik.sizes ?? "68vh" } : null,
    };
  });
  return <HeroSlider slides={slides} brand={t.brand} label={t.label} cta={t.cta} prev={t.prev} next={t.next} pause={t.pause} play={t.play} media={DIK} />;
}
