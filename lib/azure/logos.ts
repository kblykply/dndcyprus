// Proje logoları aynı görsel büyüklükte: logolar çok farklı oranlarda (NeoCity yatay yazı 6,4 : 1, Lagoon 2 : 1),
// aynı yükseklikte NeoCity üç kat geniş görünüyordu. Her logo aynı alanı kaplasın diye yükseklik çarpanı
// k = √(2,5 / en-boy oranı); 2,5 : 1 oranlı logo (La Joya, Perla) temel yükseklikte kalır. Oranlar public/logos/web dosyalarından.
const RATIO: Record<string, number> = {
  "/logos/web/neocity-white.webp": 1530 / 240,
  "/logos/web/neocity.webp": 1530 / 240,
  "/logos/web/lagoon.webp": 470 / 240,
  "/logos/web/lajoya.webp": 622 / 240,
  "/logos/web/perla.webp": 611 / 240,
  "/logos/web/perlaii.webp": 491 / 240,
  "/logos/web/mariachi.webp": 326 / 240,
};

// göz düzeltmesi: NeoCity kalın blok harfli (aynı alanda iri görünür), La Joya ailesi ince yazılı (küçük görünür)
const OPTIC: Record<string, number> = {
  "/logos/web/neocity-white.webp": 0.85,
  "/logos/web/neocity.webp": 0.85,
  "/logos/web/lajoya.webp": 1.12,
  "/logos/web/perla.webp": 1.12,
  "/logos/web/perlaii.webp": 1.08,
};

/** CSS'te `height: calc(<temel yükseklik> * var(--k))` ile kullanılır */
export const logoScale = (src: string) => (Math.sqrt(2.5 / (RATIO[src] ?? 2.5)) * (OPTIC[src] ?? 1)).toFixed(3);
