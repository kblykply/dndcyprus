/* La Joya Perla II 360° — sahne meta verisi
 * Sahne id'leri js/data-perla-ii.js ile birebir aynıdır.
 */
window.TOUR_META = {
  project: {
    name: 'La Joya Perla II',
    location: { tr: 'İskele — Kuzey Kıbrıs', en: 'İskele — North Cyprus' },
    developer: 'DND Cyprus',
    site: '/tr/perla-ii',
    whatsapp: 'https://wa.me/905488880363'
  },

  /* Balkon: projenin kendi panoraması + kapak görseli referans alınarak
     Kling ile üretildi. */
  flatScenes: [
    {
      id: 'unit-balcony', image: 'assets/wide/balcony-perla-ii.jpg', w: 2200, h: 1227,
      hotspots: [
        { x: 0.075, y: 0.880, target: '16-21-living-area' }
      ]
    }
  ],

  extraHotspots: {
    '10-studio-livingroom': [
      { yaw: -64.4, pitch: -2, target: 'unit-balcony' }
    ],
    '14-11-loft-livingroom': [
      { yaw: -133.8, pitch: -2, target: 'unit-balcony' }
    ],
    '16-21-living-area': [
      { yaw: 30.1, pitch: -2, target: 'unit-balcony' }
    ]
  },

  /* Karoları düzeltilip yerele alınan sahneler.
     22-sauna: orijinal render'da ahşap duvarın önünde bir dambıl duruyordu
     (fitness salonundan kalmış); arka yüz rötuşlanıp tüm seviyeler yeniden
     üretildi. Kaynak karolar sitede olduğu gibi duruyor. */
  tileOverrides: {
    '22-sauna': 'assets/tiles/22-sauna'
  },

  groups: [
    {
      id: 'residences',
      tr: 'Daireler', en: 'Residences',
      sub: [
        {
          id: 'r-studio', tr: 'Studio', en: 'Studio',
          scenes: ['10-studio-livingroom', '9-studio-kitchen', '11-studio-wc']
        },
        {
          id: 'r-loft', tr: '1+1 Loft', en: '1+1 Loft',
          scenes: ['14-11-loft-livingroom', '13-11-loft-kitchen',
                   '15-11-loft-bedroom', '12-11-loft-wc']
        },
        {
          id: 'r-2p1', tr: '2+1 Daire', en: '2+1 Apartment',
          scenes: ['16-21-living-area', '18-21-bedroom', '19-21-bedroom-2', '17-21-wc']
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
          scenes: ['4-main-pool', '7-main-pool-2', '20-pool', '6-aqua']
        },
        {
          id: 's-amen', tr: 'Olanaklar', en: 'Amenities',
          scenes: ['5-restaurant', '21-gym', '22-sauna', '23-massage-room',
                   '24-kids-club', '3-playground']
        }
      ]
    },
    {
      id: 'site',
      tr: 'Site & Mimari', en: 'Site & Architecture',
      sub: [
        {
          id: 'x-blocks', tr: 'Giriş ve Bloklar', en: 'Entrance & Blocks',
          scenes: ['0-entrance', '8-a-block', '2-b--c-block', '1-c--d-block']
        }
      ]
    }
  ],

  startScene: '4-main-pool',

  scenes: {
    'unit-balcony': {
      tr: 'Balkon', en: 'Balcony',
      desc: {
        tr: 'Daire balkonundan havuz avlusu ve blokların görünümü.',
        en: 'The pool courtyard and blocks seen from a unit balcony.'
      }
    },
    '0-entrance': {
      tr: 'Giriş', en: 'Entrance',
      desc: {
        tr: 'Projenin ana girişi ve karşılama aksı.',
        en: 'The main entrance and arrival axis of the development.'
      }
    },
    '1-c--d-block': {
      tr: 'C & D Blok', en: 'Blocks C & D',
      desc: {
        tr: 'C ve D bloklarının cepheleri ve aralarındaki peyzaj düzenlemesi.',
        en: 'The facades of blocks C and D with the landscaping between them.'
      }
    },
    '2-b--c-block': {
      tr: 'B & C Blok', en: 'Blocks B & C',
      desc: {
        tr: 'B ve C bloklarını birbirine bağlayan yaya aksı.',
        en: 'The pedestrian route linking blocks B and C.'
      }
    },
    '3-playground': {
      tr: 'Çocuk Oyun Alanı', en: 'Playground',
      desc: {
        tr: 'Güvenli zeminli açık hava oyun alanı; ailelerin görüş açısında konumlanır.',
        en: 'Open-air playground with a safety surface, kept within sight of the seating areas.'
      }
    },
    '4-main-pool': {
      tr: 'Ana Havuz', en: 'Main Pool',
      desc: {
        tr: 'Projenin merkezindeki ana havuz; şezlong terasları ve peyzajla çevrili.',
        en: 'The main pool at the centre of the project, ringed by sun terraces and planting.'
      }
    },
    '5-restaurant': {
      tr: 'Restoran', en: 'Restaurant',
      desc: {
        tr: 'Havuz aksına açılan restoran ve oturma terası.',
        en: 'Restaurant and terrace seating opening onto the pool axis.'
      }
    },
    '6-aqua': {
      tr: 'Aqua Park', en: 'Aqua Park',
      desc: {
        tr: 'Kaydırak ve su oyun alanlarından oluşan aquapark bölümü.',
        en: 'The aquapark section with slides and water-play areas.'
      }
    },
    '7-main-pool-2': {
      tr: 'Ana Havuz — 2', en: 'Main Pool — 2',
      desc: {
        tr: 'Ana havuzun ikinci açısı; bloklara ve teraslara bakış.',
        en: 'A second view of the main pool, looking towards the blocks and terraces.'
      }
    },
    '8-a-block': {
      tr: 'A Blok', en: 'Block A',
      desc: {
        tr: 'A bloğu cephesi ve giriş düzenlemesi.',
        en: 'The facade and entrance arrangement of block A.'
      }
    },
    '9-studio-kitchen': {
      tr: 'Studio Mutfak', en: 'Studio Kitchen',
      desc: {
        tr: 'Studio dairenin ankastre donanımlı açık mutfağı.',
        en: 'The studio unit’s open kitchen with built-in appliances.'
      }
    },
    '10-studio-livingroom': {
      tr: 'Studio Salon', en: 'Studio Living Room',
      desc: {
        tr: 'Oturma, yatma ve mutfağın tek hacimde çözüldüğü studio yaşam alanı.',
        en: 'Studio living space combining seating, sleeping and kitchen in one volume.'
      }
    },
    '11-studio-wc': {
      tr: 'Studio Banyo', en: 'Studio Bathroom',
      desc: {
        tr: 'Duş nişli kompakt studio banyosu.',
        en: 'Compact studio bathroom with a walk-in shower.'
      }
    },
    '12-11-loft-wc': {
      tr: 'Loft Banyo', en: 'Loft Bathroom',
      desc: {
        tr: '1+1 loft dairenin banyosu.',
        en: 'Bathroom of the 1+1 loft unit.'
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
        tr: 'Çift yükseklikte loft salonu; üst kata açılan galeri boşluğu.',
        en: 'Double-height loft living room with a void opening to the upper level.'
      }
    },
    '15-11-loft-bedroom': {
      tr: 'Loft Yatak Odası', en: 'Loft Bedroom',
      desc: {
        tr: 'Loft dairenin üst kotundaki yatak alanı.',
        en: 'The sleeping area on the loft’s upper level.'
      }
    },
    '16-21-living-area': {
      tr: '2+1 Salon', en: '2+1 Living Area',
      desc: {
        tr: 'Açık mutfakla bütünleşen 2+1 yaşam alanı ve teras çıkışı.',
        en: 'The 2+1 living area integrated with the open kitchen and terrace access.'
      }
    },
    '17-21-wc': {
      tr: '2+1 Banyo', en: '2+1 Bathroom',
      desc: {
        tr: 'Büyük format seramik ve duş nişi uygulamalı banyo.',
        en: 'Bathroom with large-format tiling and a walk-in shower.'
      }
    },
    '18-21-bedroom': {
      tr: '2+1 Yatak Odası', en: '2+1 Bedroom',
      desc: {
        tr: 'Ebeveyn yatak odası; gömme dolap alanı ve geniş pencere.',
        en: 'Master bedroom with fitted wardrobe space and generous glazing.'
      }
    },
    '19-21-bedroom-2': {
      tr: '2+1 Yatak Odası 2', en: '2+1 Bedroom 2',
      desc: {
        tr: 'İkinci yatak odası; çocuk odası veya çalışma odası olarak kullanılabilir.',
        en: 'Second bedroom, suitable as a children’s room or study.'
      }
    },
    '20-pool': {
      tr: 'Havuz', en: 'Pool',
      desc: {
        tr: 'Blok aralarındaki ikincil havuz ve dinlenme terasları.',
        en: 'The secondary pool between the blocks, with its lounging terraces.'
      }
    },
    '21-gym': {
      tr: 'Fitness Merkezi', en: 'Gym',
      desc: {
        tr: 'Kardiyo ve ağırlık bölümlerinden oluşan fitness salonu.',
        en: 'Fitness studio with cardio and weights zones.'
      }
    },
    '22-sauna': {
      tr: 'Sauna', en: 'Sauna',
      desc: {
        tr: 'Wellness bölümündeki ahşap kaplamalı sauna.',
        en: 'Timber-lined sauna in the wellness area.'
      }
    },
    '23-massage-room': {
      tr: 'Masaj Odası', en: 'Massage Room',
      desc: {
        tr: 'Wellness bölümünde bakım ve masaj uygulamaları için ayrılan oda.',
        en: 'Treatment and massage room within the wellness area.'
      }
    },
    '24-kids-club': {
      tr: 'Çocuk Kulübü', en: 'Kids Club',
      desc: {
        tr: 'Kapalı çocuk kulübü; oyun ve etkinlik alanı.',
        en: 'Indoor kids club for play and activities.'
      }
    }
  }
};
