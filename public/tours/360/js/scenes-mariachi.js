/* Mariachi Beach Club 360° — sahne meta verisi.
 * Panorama çekimi yok: içine girilebilen 360° sahneler projenin kendi
 * render'larından üretildi (Kling → equi2cube → assets/tiles), galeri
 * render'ları düz sahne olarak eklendi.
 */
window.TOUR_META = {
  project: {
    name: 'Mariachi Beach Club',
    location: { tr: 'Bahçeler, İskele — Kuzey Kıbrıs', en: 'Bahçeler, İskele — North Cyprus' },
    developer: 'DND Cyprus',
    site: '/tr/mariachi',
    whatsapp: 'https://wa.me/905488880363'
  },

  tileOverrides: {
      "mc-deck360": "assets/tiles/mc-deck360",
      "mc-rest360": "assets/tiles/mc-rest360",
      "mc-lounge360": "assets/tiles/mc-lounge360",
      "mc-front": "assets/tiles/mc-front",
      "mc-aerial": "assets/tiles/mc-aerial",
      "mc-beach": "assets/tiles/mc-beach",
      "mc-cabanas": "assets/tiles/mc-cabanas",
      "mc-pool": "assets/tiles/mc-pool"
  },

  flatScenes: [],


  groups: [
    {
      id: 'club',
      tr: 'Beach Club', en: 'Beach Club',
      sub: [
        {
          id: 'c-360', tr: 'Gezinti', en: 'Walk Through',
          scenes: ['mc-deck360', 'mc-rest360', 'mc-lounge360']
        },
        {
          id: 'c-shore', tr: 'Sahil', en: 'Shore',
          scenes: ['mc-front', 'mc-aerial', 'mc-beach']
        },
        {
          id: 'c-water', tr: 'İskele & Havuz', en: 'Pier & Pool',
          scenes: ['mc-cabanas', 'mc-pool']
        },
        {
          id: 'c-inside', tr: 'Mekân', en: 'Venue',
          scenes: []
        }
      ]
    }
  ],

  startScene: 'mc-deck360',

  scenes: {
    'mc-lounge360': {
      tr: 'Lounge & Bar', en: 'Lounge & Bar',
      desc: {
        tr: 'Kulübün lounge ve bar bölümü: ahşap tavan, uzun bar ve çepeçevre deniz manzarası.',
        en: 'The club lounge and bar — timber ceiling, long bar and sea views all around.'
      }
    },
    'mc-deck360': {
      tr: 'İskele Güvertesi', en: 'Pier Deck',
      desc: {
        tr: 'Ahşap iskelenin ortası: iki yanda su üstü kabanalar, bir uçta kulüp, diğerinde açık deniz.',
        en: 'The timber pier — cabanas on both sides, the club at one end, open sea at the other.'
      }
    },
    'mc-rest360': {
      tr: 'Restoran', en: 'Restaurant',
      desc: {
        tr: 'Kulüp restoranının içi: ahşap tavan, cam cephe ve deniz manzarası.',
        en: 'Inside the club restaurant — timber ceiling, full-height glazing and the sea beyond.'
      }
    },
    'mc-front': {
      tr: 'Sahil & Kulüp', en: 'Shore & Club',
      desc: {
        tr: 'Denizden kulüp binası ve plaj düzeni; gün batımı ışığında.',
        en: 'The club building and beach seen from the water at sunset.'
      }
    },
    'mc-aerial': {
      tr: 'Kuşbakışı', en: 'Aerial View',
      desc: {
        tr: 'Kulübün, plajın ve iskelenin üstten görünümü.',
        en: 'The club, beach and pier seen from above.'
      }
    },
    'mc-beach': {
      tr: 'Plaj', en: 'Beach',
      desc: {
        tr: 'Şezlong ve şemsiye dizileriyle kum plaj.',
        en: 'The sandy beach with rows of loungers and umbrellas.'
      }
    },
    'mc-cabanas': {
      tr: 'İskele Kabanaları', en: 'Pier Cabanas',
      desc: {
        tr: 'Su üzerindeki beyaz gölgelikli kabanalar.',
        en: 'White-canopy cabanas over the water.'
      }
    },
    'mc-pool': {
      tr: 'Havuz Terası', en: 'Pool Terrace',
      desc: {
        tr: 'Kulüp binasının önündeki havuz ve şezlong terası.',
        en: 'The pool and lounger terrace in front of the club building.'
      }
    }
  }
};
