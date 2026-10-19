// Proje logoları aynı görsel büyüklükte. Logo dosyalarının boyları eşit (240 px) ama içlerindeki boşluk ve oranlar çok
// farklı (NeoCity yatay yazı, kenarda 3 px boşluk; La Joya'nın iki yanında 56 px boş). Çarpan dosyanın kendisine değil
// mürekkebin kapladığı kutuya göre: her logonun mürekkep kutusu aynı alanı kaplar, k = √(ref / (en × boy)) × göz düzeltmesi.
// Kutular public/logos/web dosyalarından ölçüldü (alfa > 20), 240 px dosya yüksekliğinde. Lagoon Verde k = 1 (referans).
const INK: Record<string, [number, number]> = {
  "/logos/web/neocity-white.webp": [1523, 233],
  "/logos/web/neocity.webp": [1523, 233],
  "/logos/web/lagoon.webp": [425, 212],
  "/logos/web/lajoya.webp": [510, 184],
  "/logos/web/perla.webp": [482, 197],
  "/logos/web/perlaii.webp": [466, 191],
  "/logos/web/mariachi.webp": [326, 240],
  "/DND-LOGO-LIGHT.svg": [556, 240],
};
const REF = 425 * 212;

// göz düzeltmesi: NeoCity kalın blok harfli (aynı alanda iri görünür), La Joya ailesi ince yazılı (küçük görünür)
const OPTIC: Record<string, number> = {
  "/logos/web/neocity-white.webp": 0.9,
  "/logos/web/neocity.webp": 0.9,
  "/logos/web/lajoya.webp": 1.04,
  "/logos/web/perla.webp": 1.04,
  "/logos/web/perlaii.webp": 1.04,
};

/** CSS'te `height: calc(<temel yükseklik> * var(--k))` ile kullanılır (temel yükseklik = 240 px'lik dosyanın gösterilen boyu) */
export const logoScale = (src: string) => {
  const ink = INK[src];
  return ((ink ? Math.sqrt(REF / (ink[0] * ink[1])) : 1) * (OPTIC[src] ?? 1)).toFixed(3);
};
