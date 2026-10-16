/* La Joya 360° — sahne meta verisi.
 * DND'nin bu proje için panorama çekimi yok. Tur iki katmandan oluşur:
 *  1) İçine girilebilen 360° sahneler — projenin kendi render'larından
 *     Kling ile küresel panorama üretilip küp karolarına çevrildi
 *     (assets/tiles/<id>, bkz. tileOverrides).
 *  2) Resmî galeri render'ları — düz sahne olarak.
 */
window.TOUR_META = {
  project: {
    name: 'La Joya',
    location: { tr: 'Long Beach, İskele — Kuzey Kıbrıs', en: 'Long Beach, İskele — North Cyprus' },
    developer: 'DND Cyprus',
    site: '/tr/la-joya',
    whatsapp: 'https://wa.me/905488880363'
  },

  /* 360° sahnelerin karoları yerelde duruyor (uzak sunucuda yok). */
  tileOverrides: {
      "lj-court": "assets/tiles/lj-court",
      "lj-roof360": "assets/tiles/lj-roof360",
      "lj-bed360": "assets/tiles/lj-bed360",
      "lj-aerial": "assets/tiles/lj-aerial",
      "lj-cabana": "assets/tiles/lj-cabana",
      "lj-facades": "assets/tiles/lj-facades",
      "lj-street": "assets/tiles/lj-street",
      "lj-balcony": "assets/tiles/lj-balcony"
  },

  flatScenes: [],


  groups: [
    {
      id: 'outdoor',
      tr: 'Proje', en: 'The Project',
      sub: [
        {
          id: 'o-360', tr: 'Gezinti', en: 'Walk Through',
          scenes: ['lj-court', 'lj-roof360', 'lj-bed360']
        },
        {
          id: 'o-pool', tr: 'Havuz & Avlu', en: 'Pool & Courtyard',
          scenes: ['lj-aerial', 'lj-cabana']
        },
        {
          id: 'o-arch', tr: 'Mimari', en: 'Architecture',
          scenes: ['lj-facades', 'lj-street' ]
        }
      ]
    },
    {
      id: 'living',
      tr: 'Yaşam', en: 'Living',
      sub: [
        { id: 'l-balcony', tr: 'Balkon', en: 'Balcony', scenes: ['lj-balcony'] }
      ]
    }
  ],

  startScene: 'lj-court',

  scenes: {
    'lj-bed360': {
      tr: 'Yatak Odası', en: 'Bedroom',
      desc: {
        tr: 'Dairenin yatak odası: gömme dolap duvarı, geniş pencere ve palmiyeli manzara.',
        en: 'The bedroom — fitted wardrobe wall, wide window and palm-tree view.'
      }
    },
    'lj-court': {
      tr: 'Havuz Avlusu', en: 'Pool Courtyard',
      desc: {
        tr: 'Havuz avlusunun ortasında durup çevrenize bakın; loft cepheleri ve akşam aydınlatması.',
        en: 'The pool courtyard from its centre — loft facades and evening lighting.'
      }
    },
    'lj-roof360': {
      tr: 'Çatı Terası', en: 'Roof Terrace',
      desc: {
        tr: 'Daireye ait çatı terası: bir yanda aydınlatılmış havuz avlusu, diğer yanda mimari.',
        en: 'The private roof terrace — the lit courtyard on one side, the architecture on the other.'
      }
    },
    'lj-aerial': {
      tr: 'Havuzlar — Üstten', en: 'Pools From Above',
      desc: {
        tr: 'Havuz aksının ve adalı oturma alanlarının üstten görünümü.',
        en: 'The pool axis and island seating areas seen from above.'
      }
    },
    'lj-cabana': {
      tr: 'Havuz Kabanaları', en: 'Pool Cabanas',
      desc: {
        tr: 'Havuz ortasındaki gölgelikli kabana ve güneşlenme adası.',
        en: 'The shaded cabana island at the centre of the pool.'
      }
    },
    'lj-facades': {
      tr: 'Loft Cepheler', en: 'Loft Facades',
      desc: {
        tr: 'Havuza bakan çift katlı loft cepheleri.',
        en: 'The double-height loft facades overlooking the pool.'
      }
    },
    'lj-street': {
      tr: 'Giriş Cephesi', en: 'Street Facade',
      desc: {
        tr: 'Projenin sokak cephesi ve giriş düzeni.',
        en: 'The street-facing facade and entrance arrangement.'
      }
    },
    'lj-balcony': {
      tr: 'Balkon', en: 'Balcony',
      desc: {
        tr: 'Loft balkonundan akşam ışığında havuz avlusu görünümü.',
        en: 'The lit pool courtyard seen from a loft balcony at dusk.'
      }
    }
  }
};
