/* Geçitkale 360° — sahne meta verisi.
 * Satılık arsa; tur, resmî drone çekimlerinden oluşan düz sahnelerdir.
 */
window.TOUR_META = {
  project: {
    name: 'Geçitkale',
    location: { tr: 'Geçitkale, İskele — Kuzey Kıbrıs', en: 'Geçitkale, İskele — North Cyprus' },
    developer: 'DND Cyprus',
    site: '/tr/gecitkale',
    whatsapp: 'https://wa.me/905488880363'
  },

  tileOverrides: {
      "gk-field360": "assets/tiles/gk-field360",
      "gk-land": "assets/tiles/gk-land",
      "gk-parcels": "assets/tiles/gk-parcels",
      "gk-horizon": "assets/tiles/gk-horizon"
  },

  flatScenes: [],


  groups: [
    {
      id: 'land',
      tr: 'Arazi', en: 'The Land',
      sub: [
        {
          id: 'l-360', tr: 'Gezinti', en: 'Walk Through',
          scenes: ['gk-field360']
        },
        {
          id: 'l-views', tr: 'Drone Görünümleri', en: 'Drone Views',
          scenes: ['gk-land', 'gk-parcels', 'gk-horizon']
        }
      ]
    }
  ],

  startScene: 'gk-field360',

  scenes: {
    'gk-field360': {
      tr: 'Arazi', en: 'The Land',
      desc: {
        tr: 'Arazinin ortası: her yöne uzanan tarlalar, yol bağlantısı ve dağ silüeti.',
        en: 'The middle of the land — fields in every direction, the road and the mountain skyline.'
      }
    },
    'gk-land': {
      tr: 'Arazi — Genel Bakış', en: 'Land Overview',
      desc: {
        tr: '9.840 m² satılık arsanın drone ile genel görünümü.',
        en: 'Drone overview of the 9,840 m² land for sale.'
      }
    },
    'gk-parcels': {
      tr: 'Parseller & Yol', en: 'Parcels & Road',
      desc: {
        tr: 'Parselasyon ve ana yol bağlantısının görünümü.',
        en: 'The parcelling and main road connection.'
      }
    },
    'gk-horizon': {
      tr: 'Çevre & Ufuk', en: 'Surroundings',
      desc: {
        tr: 'Arazinin çevresi; Beşparmak silüetine bakış.',
        en: 'The surroundings, looking towards the Kyrenia range.'
      }
    }
  }
};
