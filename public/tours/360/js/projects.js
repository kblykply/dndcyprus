/* DND Cyprus — 360° tur projeleri
 *
 * Veriler dndcyprus.com proje sayfalarından alındı (2026-08-11) ve tek tek
 * doğrulandı. Bir projenin turu yoksa `tour: false` bırakılır; seçim ekranında
 * "Tur yakında" olarak görünür ve tıklanınca proje sayfasına gider.
 *
 * `tileBase` yerel geliştirmede canlı siteyi gösterir. Tur dndcyprus.com'a
 * kurulduğunda bunu göreli yola çevirin, örn: 'app-files/tiles'
 * (bkz. README.md → Siteye kurulum).
 */
window.TOUR_PROJECTS = [
  {
    id: 'lagoon-verde',
    name: 'Lagoon Verde',
    location: { tr: 'Bahçeler, İskele (Ötüken) — Kuzey Kıbrıs', en: 'Bahçeler, İskele (Ötüken) — North Cyprus' },
    status: { tr: 'Devam Eden', en: 'Ongoing' },
    delivery: '2028',
    units: '354',
    landArea: '43.179',
    tour: true,
    sceneCount: 33,           /* 33 sahnenin tamamı gerçek 360° */
    logo: 'assets/lagoon-logo.png',
    cover: 'assets/covers/lagoon-verde.jpg',
    page: '/tr/lagoon-verde',
    whatsapp: 'https://wa.me/905488880363',
    tileBase: '/tours/lagoon-verde/app-files/tiles'
  },
  {
    id: 'perla-ii',
    name: 'La Joya Perla II',
    location: { tr: 'Bahçeler, İskele — Kuzey Kıbrıs', en: 'Bahçeler, İskele — North Cyprus' },
    status: { tr: 'Devam Eden', en: 'Ongoing' },
    delivery: '2027',
    units: '128',
    landArea: '8.800',
    tour: true,
    sceneCount: 26,
    logo: null,
    cover: 'assets/covers/perla-ii.jpg',
    page: '/tr/perla-ii',
    whatsapp: 'https://wa.me/905488880363',
    tileBase: '/tours/perla-ii/app-files/tiles'
  },
  {
    id: 'perla',
    name: 'La Joya Perla',
    location: { tr: 'Bahçeler, İskele — Kuzey Kıbrıs', en: 'Bahçeler, İskele — North Cyprus' },
    status: { tr: 'Devam Eden', en: 'Ongoing' },
    delivery: '2026',
    units: '384',
    landArea: '25.053',
    tour: true,
    sceneCount: 22,
    logo: null,
    cover: 'assets/covers/perla.jpg',
    page: '/tr/perla',
    whatsapp: 'https://wa.me/905488880363',
    tileBase: '/tours/perla/app-files/tiles'
  },
  {
    id: 'la-joya',
    name: 'La Joya',
    location: { tr: 'Long Beach, İskele — Kuzey Kıbrıs', en: 'Long Beach, İskele — North Cyprus' },
    status: { tr: 'Devam Eden', en: 'Ongoing' },
    delivery: '2025',
    units: '74',
    landArea: '6.360',
    tour: true,
    sceneCount: 8,           /* 8 gerçek 360° panorama */
    logo: null,
    cover: 'assets/covers/la-joya.jpg',
    page: '/tr/la-joya',
    whatsapp: 'https://wa.me/905488880363',
    tileBase: ''
  },
  {
    id: 'mariachi',
    name: 'Mariachi Beach Club',
    location: { tr: 'Bahçeler, İskele — Kuzey Kıbrıs', en: 'Bahçeler, İskele — North Cyprus' },
    status: { tr: 'Yakında', en: 'Coming Soon' },
    tour: true,
    sceneCount: 8,           /* 8 gerçek 360° panorama */
    logo: null,
    cover: 'assets/covers/mariachi.jpg',
    page: '/tr/mariachi',
    whatsapp: 'https://wa.me/905488880363',
    tileBase: ''
  },
  {
    id: 'gecitkale',
    name: 'Geçitkale',
    location: { tr: 'Geçitkale, İskele — Kuzey Kıbrıs', en: 'Geçitkale, İskele — North Cyprus' },
    status: { tr: 'Satılık Arsa', en: 'Land for Sale' },
    landArea: '9.840',
    tour: true,
    sceneCount: 4,           /* 4 gerçek 360° panorama */
    logo: null,
    cover: 'assets/covers/gecitkale.jpg',
    page: '/tr/gecitkale',
    whatsapp: 'https://wa.me/905488880363',
    tileBase: ''
  }
];
