/* La Joya Perla 360° — sahne meta verisi
 * Sahne id'leri js/data-perla.js ile birebir aynıdır.
 */
window.TOUR_META = {
  project: {
    name: 'La Joya Perla',
    location: { tr: 'Bahçeler, İskele — Kuzey Kıbrıs', en: 'Bahçeler, İskele — North Cyprus' },
    developer: 'DND Cyprus',
    site: '/tr/perla',
    whatsapp: 'https://wa.me/905488880363'
  },

  /* Balkon: projenin kendi panoraması + kapak görseli referans alınarak
     Kling ile üretildi. */
  flatScenes: [
    {
      id: 'unit-balcony', image: 'assets/wide/balcony-perla.jpg', w: 2200, h: 1227,
      hotspots: [
        { x: 0.075, y: 0.880, target: '17-21-kitchen--livingroom' }
      ]
    }
  ],

  extraHotspots: {
    '11-studio-flat-livingroom': [
      { yaw: -73.2, pitch: -2, target: 'unit-balcony' }
    ],
    '14-11-loft-livingroom': [
      { yaw: -133.6, pitch: -2, target: 'unit-balcony' }
    ],
    '17-21-kitchen--livingroom': [
      { yaw: -156.4, pitch: -2, target: 'unit-balcony' }
    ]
  },

  groups: [
    {
      id: 'residences',
      tr: 'Daireler', en: 'Residences',
      sub: [
        {
          id: 'r-studio', tr: 'Studio', en: 'Studio',
          scenes: ['11-studio-flat-livingroom', '10-studio-flat-kitchen', '12-studio-flat-wc']
        },
        {
          id: 'r-loft', tr: '1+1 Loft', en: '1+1 Loft',
          scenes: ['14-11-loft-livingroom', '13-11-loft-kitchen',
                   '15-11-loft-bedroom', '16-11-loft-wc']
        },
        {
          id: 'r-2p1', tr: '2+1 Daire', en: '2+1 Apartment',
          scenes: ['17-21-kitchen--livingroom', '20-21-bedroom-1',
                   '19-21-bedroom-2', '18-21-wc']
        },
        {
          id: 'r-balcony', tr: 'Balkon', en: 'Balcony',
          scenes: ['unit-balcony']
        }
      ]
    },
    {
      id: 'social',
      tr: 'Sosyal Yaşam', en: 'Social Life',
      sub: [
        {
          id: 's-pool', tr: 'Havuzlar', en: 'Pools',
          scenes: ['5-main-pool', '3-aqua-pool', '1-bloks-pool', '2-bloks-pool-2']
        },
        {
          id: 's-amen', tr: 'Olanaklar', en: 'Amenities',
          scenes: ['7-restaurant', '6-pool-bar', '9-amphi', '4-playground']
        }
      ]
    },
    {
      id: 'site',
      tr: 'Site & Mimari', en: 'Site & Architecture',
      sub: [
        {
          id: 'x-blocks', tr: 'Girişler', en: 'Entrances',
          scenes: ['8-entrance-1', '0-entrance-2']
        }
      ]
    }
  ],

  startScene: '5-main-pool',

  scenes: {
    'unit-balcony': {
      tr: 'Balkon', en: 'Balcony',
      desc: {
        tr: 'Daire balkonundan kum kıyılı ana havuz görünümü.',
        en: 'The sand-edged main pool seen from a unit balcony.'
      }
    },
    '0-entrance-2': {
      tr: 'Giriş 2', en: 'Entrance 2',
      desc: {
        tr: 'Projenin ikinci giriş aksı ve peyzaj düzenlemesi.',
        en: 'The project’s second entrance axis and its landscaping.'
      }
    },
    '8-entrance-1': {
      tr: 'Giriş 1', en: 'Entrance 1',
      desc: {
        tr: 'Ana giriş ve karşılama alanı.',
        en: 'The main entrance and arrival area.'
      }
    },
    '1-bloks-pool': {
      tr: 'Blok Havuzu', en: 'Block Pool',
      desc: {
        tr: 'Bloklar arasındaki havuz ve güneşlenme terasları.',
        en: 'The pool between the blocks with its sun terraces.'
      }
    },
    '2-bloks-pool-2': {
      tr: 'Blok Havuzu — 2', en: 'Block Pool — 2',
      desc: {
        tr: 'Blok havuzunun ikinci açısı; cephelere bakış.',
        en: 'A second view of the block pool, looking towards the facades.'
      }
    },
    '3-aqua-pool': {
      tr: 'Aqua Havuz', en: 'Aqua Pool',
      desc: {
        tr: 'Kaydırak ve su oyun alanlarının bulunduğu aqua bölümü.',
        en: 'The aqua section with slides and water-play areas.'
      }
    },
    '4-playground': {
      tr: 'Çocuk Oyun Alanı', en: 'Playground',
      desc: {
        tr: 'Güvenli zeminli açık hava oyun alanı.',
        en: 'Open-air playground with a safety surface.'
      }
    },
    '5-main-pool': {
      tr: 'Ana Havuz', en: 'Main Pool',
      desc: {
        tr: 'Projenin merkezindeki ana havuz; kum dokulu kıyı hattı ve şezlong terasları.',
        en: 'The main pool at the heart of the project, with its sand-textured edge and sun terraces.'
      }
    },
    '6-pool-bar': {
      tr: 'Havuz Bar', en: 'Pool Bar',
      desc: {
        tr: 'Havuz kenarındaki bar ve oturma düzeni.',
        en: 'The poolside bar and its seating arrangement.'
      }
    },
    '7-restaurant': {
      tr: 'Restoran', en: 'Restaurant',
      desc: {
        tr: 'Havuz aksına açılan restoran ve terası.',
        en: 'Restaurant and terrace opening onto the pool axis.'
      }
    },
    '9-amphi': {
      tr: 'Amfitiyatro', en: 'Amphitheatre',
      desc: {
        tr: 'Açık hava etkinlikleri ve film geceleri için amfi düzeni.',
        en: 'Amphitheatre seating for open-air events and film nights.'
      }
    },
    '10-studio-flat-kitchen': {
      tr: 'Studio Mutfak', en: 'Studio Kitchen',
      desc: {
        tr: 'Studio dairenin ankastre donanımlı mutfağı.',
        en: 'The studio unit’s kitchen with built-in appliances.'
      }
    },
    '11-studio-flat-livingroom': {
      tr: 'Studio Salon', en: 'Studio Living Room',
      desc: {
        tr: 'Oturma, yatma ve mutfağın tek hacimde çözüldüğü studio yaşam alanı.',
        en: 'Studio living space combining seating, sleeping and kitchen in one volume.'
      }
    },
    '12-studio-flat-wc': {
      tr: 'Studio Banyo', en: 'Studio Bathroom',
      desc: {
        tr: 'Duş nişli kompakt studio banyosu.',
        en: 'Compact studio bathroom with a walk-in shower.'
      }
    },
    '13-11-loft-kitchen': {
      tr: 'Loft Mutfak', en: 'Loft Kitchen',
      desc: {
        tr: 'Loft dairenin yaşam alanına açılan mutfağı.',
        en: 'The loft unit’s kitchen, open to the living space.'
      }
    },
    '14-11-loft-livingroom': {
      tr: 'Loft Salon', en: 'Loft Living Room',
      desc: {
        tr: 'Çift yükseklikte loft salonu ve galeri boşluğu.',
        en: 'Double-height loft living room with its gallery void.'
      }
    },
    '15-11-loft-bedroom': {
      tr: 'Loft Yatak Odası', en: 'Loft Bedroom',
      desc: {
        tr: 'Loft dairenin üst kotundaki yatak alanı.',
        en: 'The sleeping area on the loft’s upper level.'
      }
    },
    '16-11-loft-wc': {
      tr: 'Loft Banyo', en: 'Loft Bathroom',
      desc: {
        tr: '1+1 loft dairenin banyosu.',
        en: 'Bathroom of the 1+1 loft unit.'
      }
    },
    '17-21-kitchen--livingroom': {
      tr: '2+1 Salon & Mutfak', en: '2+1 Living & Kitchen',
      desc: {
        tr: 'Açık mutfakla bütünleşen 2+1 yaşam alanı.',
        en: 'The 2+1 living area integrated with its open kitchen.'
      }
    },
    '18-21-wc': {
      tr: '2+1 Banyo', en: '2+1 Bathroom',
      desc: {
        tr: 'Büyük format seramik ve duş nişi uygulamalı banyo.',
        en: 'Bathroom with large-format tiling and a walk-in shower.'
      }
    },
    '19-21-bedroom-2': {
      tr: '2+1 Yatak Odası 2', en: '2+1 Bedroom 2',
      desc: {
        tr: 'İkinci yatak odası; çocuk odası veya çalışma odası olarak kullanılabilir.',
        en: 'Second bedroom, suitable as a children’s room or study.'
      }
    },
    '20-21-bedroom-1': {
      tr: '2+1 Yatak Odası 1', en: '2+1 Bedroom 1',
      desc: {
        tr: 'Ebeveyn yatak odası; gömme dolap alanı ve geniş pencere.',
        en: 'Master bedroom with fitted wardrobe space and generous glazing.'
      }
    }
  }
};
