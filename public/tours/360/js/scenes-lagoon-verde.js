/* Lagoon Verde 360° — sahne meta verisi
 * data.js'teki ham Marzipano sahnelerini gruplar, Türkçe/İngilizce adlandırır.
 * Sahne id'leri data.js ile birebir aynı olmalı.
 */
window.TOUR_META = {
  project: {
    name: 'Lagoon Verde',
    location: { tr: 'Bahçeler, İskele — Kuzey Kıbrıs', en: 'Bahçeler, İskele — North Cyprus' },
    developer: 'DND Cyprus',
    site: '/tr/lagoon-verde',
    whatsapp: 'https://wa.me/905488880363'
  },

  /* Düz (flat) sahneler: 360° panorama değil, kaydırılıp yakınlaştırılabilen
     yüksek çözünürlüklü görseller. Kuşbakışı ve sahil için proje panoraması
     bulunmadığından katalog render'ları bu biçimde sunulur. */
  tileOverrides: {
      "aerial-overview": "assets/tiles/aerial-overview",
      "sports-area": "assets/tiles/sports-area",
      "amphitheatre": "assets/tiles/amphitheatre",
      "balcony-view": "assets/tiles/balcony-view",
      "balcony-loft": "assets/tiles/balcony-loft",
      "garden-terrace": "assets/tiles/garden-terrace"
  },

  flatScenes: [],


  /* Menü grupları — sıra ekranda göründüğü sıradır. */
  groups: [
    {
      id: 'overview',
      tr: 'Genel Bakış', en: 'Overview',
      sub: [
        {
          id: 'o-aerial', tr: 'Kuşbakışı & Plan', en: 'Aerial & Plan',
          scenes: ['aerial-overview']
        }
      ]
    },
    {
      id: 'residences',
      tr: 'Daireler', en: 'Residences',
      sub: [
        {
          id: 'r-2p1', tr: '2+1 Daire', en: '2+1 Apartment',
          scenes: ['0-2--1-livingroom', '5-2--1-kitchen', '4-2--1-hallway',
                   '2-2--1-bedroom-01', '3-2--1-bedroom-02', '1-2--1-bathroom',
                   'balcony-view']
        },
        {
          id: 'r-studio', tr: 'Studio', en: 'Studio',
          scenes: ['6-studio-enterance', '7-studio-livingroom', '8-studio-bathroom',
                   'garden-terrace']
        },
        {
          id: 'r-loft', tr: 'Studio Loft', en: 'Studio Loft',
          scenes: ['9-studio-loft-enterance', '11-studio-loft-livingroom',
                   '12-studio-loft-mezzanine-floor', '10-studio-loft-bathroom',
                   'balcony-loft']
        },
        {
          id: 'r-terrace', tr: 'Çatı Terası', en: 'Roof Terrace',
          scenes: ['24-terrace-view']
        }
      ]
    },
    {
      id: 'social',
      tr: 'Sosyal Yaşam', en: 'Social Life',
      sub: [
        {
          id: 's-pool', tr: 'Lagün & Havuzlar', en: 'Lagoon & Pools',
          scenes: ['14-pool-view-1', '16-pool-view-2', '15-aqua',
                   '17-kids-pool', '19-pool-area-entrance']
        },
        {
          id: 's-amen', tr: 'Olanaklar', en: 'Amenities',
          scenes: ['26-pool-restaurant', '25-fitness',
                   '20-facilities', '21-local-market', 'sports-area', 'amphitheatre']
        }
      ]
    },
    {
      id: 'site',
      tr: 'Site & Mimari', en: 'Site & Architecture',
      sub: [
        {
          id: 'x-blocks', tr: 'Bloklar ve Çevre', en: 'Blocks & Grounds',
          scenes: ['13-blok-e4-view', '18-blok-c2-view', '22-blok-b2--f-view', '23-site-road']
        }
      ]
    }
  ],

  /* Açılışta gösterilecek sahne (intro arka planı ve tur başlangıcı). */
  startScene: '14-pool-view-1',

  /* Sahne açılırken bakılacak yön. Ham veride bazı sahneler konunun tersine
     bakıyor: Aqua Park sahnesi havuza dönük açılıyordu, kaydıraklar arkada
     kalıp hiç görünmüyordu. Derece cinsinden: yaw = sağa dönüş. */
  initialView: {
    '15-aqua': { yaw: 160, pitch: -3 },
    /* Salon hafif sola dönük açılır: cam cephe ve Balkon/Teras çıkışları
       daha ilk karede görünsün (kullanıcı bulamamıştı). */
    '0-2--1-livingroom': { yaw: -28 }
  },

  /* Ham veride olmayan ek geçişler (derece). Müşteri isteği: daireden çatı
     terasına çıkılabilsin, terastan resort manzarası izlensin ve içeri
     dönülebilsin. Salonlarda çıkış, cam cephe / teras kapısı yönüne kondu. */
  extraHotspots: {
    /* Salonlarda cam cephe yönüne elle yerleştirildi; diğer odalarda nokta,
       odanın çıkış kapısının ~22° üstündedir ("bu kapıdan yukarı" okunur).
       Açılar data-lagoon-verde.js'teki kapı açılarından türetildi. */
    '0-2--1-livingroom': [
      { yaw: -84, pitch: -4, target: '24-terrace-view' },
      { yaw: -62, pitch: -2, target: 'balcony-view' }
    ],
    '11-studio-loft-livingroom': [
      { yaw: -115, pitch: -6, target: '24-terrace-view' },
      { yaw: -135, pitch: -34, target: 'balcony-loft' }
    ],
    '5-2--1-kitchen': [
      { yaw: 17.9, pitch: -14, target: '24-terrace-view' }
    ],
    '4-2--1-hallway': [
      { yaw: -52.7, pitch: -16, target: '24-terrace-view' }
    ],
    '2-2--1-bedroom-01': [
      { yaw: 111.4, pitch: -16, target: '24-terrace-view' },
      { yaw: -68.6, pitch: -2, target: 'balcony-view' }
    ],
    '3-2--1-bedroom-02': [
      { yaw: 144.6, pitch: -15, target: '24-terrace-view' },
      { yaw: -35.4, pitch: -2, target: 'balcony-view' }
    ],
    '1-2--1-bathroom': [
      { yaw: 80.1, pitch: -18, target: '24-terrace-view' }
    ],
    '6-studio-enterance': [
      { yaw: -0.8, pitch: -14, target: '24-terrace-view' }
    ],
    '7-studio-livingroom': [
      { yaw: -57.7, pitch: -16, target: '24-terrace-view' },
      { yaw: -80, pitch: -4, target: 'garden-terrace' }
    ],
    '8-studio-bathroom': [
      { yaw: 144.1, pitch: -17, target: '24-terrace-view' }
    ],
    '9-studio-loft-enterance': [
      { yaw: -1.7, pitch: -16, target: '24-terrace-view' }
    ],
    '10-studio-loft-bathroom': [
      { yaw: 143.3, pitch: -17, target: '24-terrace-view' }
    ],
    '12-studio-loft-mezzanine-floor': [
      { yaw: 112.1, pitch: -2.2, target: '24-terrace-view' }
    ],
    '24-terrace-view': [
      { yaw: 172, pitch: 4, target: '0-2--1-livingroom' }
    ]
  },

  scenes: {
    'aerial-overview': {
      tr: 'Kuşbakışı Görünüm', en: 'Aerial View',
      desc: {
        tr: 'Tüm yerleşimin kuş bakışı görünümü: merkezdeki lagün havuzu, çevresini saran bloklar ve peyzaj.',
        en: 'The whole development from above — the central lagoon pool, the surrounding blocks and landscaping.'
      }
    },
    'balcony-view': {
      tr: '2+1 Balkon', en: '2+1 Balcony',
      desc: {
        tr: '2+1 dairenin balkonundan lagün havuzu ve resort görünümü.',
        en: 'The lagoon pool and resort seen from the 2+1 unit\'s balcony.'
      }
    },
    'garden-terrace': {
      tr: 'Studio Bahçe Terası', en: 'Studio Garden Terrace',
      desc: {
        tr: 'Zemin kat studio dairenin bahçe terası; lagün havuzuna doğrudan iniş.',
        en: 'The ground-floor studio\'s garden terrace with direct lagoon access.'
      }
    },
    'balcony-loft': {
      tr: 'Loft Balkon', en: 'Loft Balcony',
      desc: {
        tr: 'Loft dairenin ahşap zeminli balkonu; akşamüstü ışığında resort görünümü.',
        en: 'The loft\'s timber-deck balcony — the resort in late-afternoon light.'
      }
    },
    'sports-area': {
      tr: 'Spor ve Oyun Alanları', en: 'Sports & Play Areas',
      desc: {
        tr: 'Tenis ve basketbol kortları, çocuk oyun alanı ve köy pazarı kulübelerini kapsayan yeşil aks — planda 3, 5 ve 7 numaralı bölge.',
        en: 'The green spine with tennis and basketball courts, the playground and the village-market cabins — zones 3, 5 and 7 on the plan.'
      }
    },
    'amphitheatre': {
      tr: 'Amfitiyatro', en: 'Amphitheatre',
      desc: {
        tr: 'Açık hava gösterileri ve yıldız altında film geceleri için amfi düzeni — planda 6 numara.',
        en: 'Amphitheatre seating for open-air performances and film nights under the stars — zone 6 on the plan.'
      }
    },

    '0-2--1-livingroom': {
      tr: '2+1 Salon', en: '2+1 Living Room',
      desc: {
        tr: 'Geniş cam cepheden gün ışığı alan salon; açık mutfak ve terasla kesintisiz bağlantı kurar.',
        en: 'A daylight-filled living room with full-height glazing, opening onto the kitchen and terrace.'
      }
    },
    '5-2--1-kitchen': {
      tr: '2+1 Mutfak', en: '2+1 Kitchen',
      desc: {
        tr: 'Ankastre donanımlı açık mutfak; yaşam alanıyla bütünleşen ada tezgâh düzeni.',
        en: 'Open-plan kitchen with built-in appliances, integrated into the living space.'
      }
    },
    '4-2--1-hallway': {
      tr: '2+1 Koridor', en: '2+1 Hallway',
      desc: {
        tr: 'Yatak odaları, banyo ve yaşam alanını birbirine bağlayan dağıtım holü.',
        en: 'The circulation hall linking bedrooms, bathroom and the living area.'
      }
    },
    '2-2--1-bedroom-01': {
      tr: '2+1 Yatak Odası 1', en: '2+1 Bedroom 1',
      desc: {
        tr: 'Ebeveyn yatak odası; gömme dolap alanı ve geniş pencere düzeni.',
        en: 'Master bedroom with fitted wardrobe space and generous glazing.'
      }
    },
    '3-2--1-bedroom-02': {
      tr: '2+1 Yatak Odası 2', en: '2+1 Bedroom 2',
      desc: {
        tr: 'İkinci yatak odası; çocuk odası ya da çalışma odası olarak kullanılabilir.',
        en: 'Second bedroom, suitable as a children’s room or home office.'
      }
    },
    '1-2--1-bathroom': {
      tr: '2+1 Banyo', en: '2+1 Bathroom',
      desc: {
        tr: 'Yerden ısıtmalı banyo; büyük format seramik ve duş nişi uygulaması.',
        en: 'Underfloor-heated bathroom with large-format tiling and a walk-in shower.'
      }
    },

    '6-studio-enterance': {
      tr: 'Studio Giriş', en: 'Studio Entrance',
      desc: {
        tr: 'Studio dairenin giriş holü; kompakt ve fonksiyonel yerleşim.',
        en: 'Entrance hall of the studio unit — compact and functional.'
      }
    },
    '7-studio-livingroom': {
      tr: 'Studio Salon', en: 'Studio Living Room',
      desc: {
        tr: 'Studio yaşam alanı; mutfak, oturma ve teras çıkışı tek hacimde çözülür.',
        en: 'Studio living space combining kitchen, seating and terrace access in one volume.'
      }
    },
    '8-studio-bathroom': {
      tr: 'Studio Banyo', en: 'Studio Bathroom',
      desc: {
        tr: 'Studio banyosu; duş nişi ve asma tuvalet düzeni.',
        en: 'Studio bathroom with a walk-in shower and wall-hung sanitaryware.'
      }
    },

    '9-studio-loft-enterance': {
      tr: 'Loft Giriş', en: 'Loft Entrance',
      desc: {
        tr: 'Loft dairenin giriş kotu; asma kata çıkan merdivenle karşılanır.',
        en: 'Entry level of the loft unit, opening to the stair up to the mezzanine.'
      }
    },
    '11-studio-loft-livingroom': {
      tr: 'Loft Salon', en: 'Loft Living Room',
      desc: {
        tr: 'Çift yükseklikte loft salonu; asma kata açılan galeri boşluğu.',
        en: 'Double-height loft living room with a void opening to the mezzanine.'
      }
    },
    '12-studio-loft-mezzanine-floor': {
      tr: 'Loft Asma Kat', en: 'Loft Mezzanine',
      desc: {
        tr: 'Yatak alanı olarak kurgulanan asma kat; salona hâkim galeri manzarası.',
        en: 'Mezzanine level arranged as the sleeping area, overlooking the living room.'
      }
    },
    '10-studio-loft-bathroom': {
      tr: 'Loft Banyo', en: 'Loft Bathroom',
      desc: {
        tr: 'Loft dairenin banyosu; giriş kotunda konumlanır.',
        en: 'Loft unit bathroom, located on the entry level.'
      }
    },

    '14-pool-view-1': {
      tr: 'Lagün Havuz', en: 'Lagoon Pool',
      desc: {
        tr: 'Projenin merkezindeki lagün havuzu; adalı kurgusu ve kum dokulu kıyı hattı.',
        en: 'The lagoon pool at the heart of the project, with its island layout and beach-edge shoreline.'
      }
    },
    '16-pool-view-2': {
      tr: 'Lagün Havuz — 2', en: 'Lagoon Pool — 2',
      desc: {
        tr: 'Lagün havuzunun ikinci açısı; havuz barı ve şezlong terasları yönü.',
        en: 'A second view across the lagoon, towards the pool bar and sun terraces.'
      }
    },
    '15-aqua': {
      tr: 'Aqua Park', en: 'Aqua Park',
      desc: {
        tr: 'Kaydıraklar ve tematik su oyun alanlarından oluşan aquapark bölgesi.',
        en: 'The aquapark zone with slides and themed water-play areas.'
      }
    },
    '17-kids-pool': {
      tr: 'Çocuk Havuzu', en: 'Kids Pool',
      desc: {
        tr: 'Sığ çocuk havuzu; oyun alanlarına ve gölgelikli oturma bölgelerine komşu.',
        en: 'Shallow children’s pool, adjoining the play areas and shaded seating.'
      }
    },
    '19-pool-area-entrance': {
      tr: 'Havuz Alanı Girişi', en: 'Pool Area Entrance',
      desc: {
        tr: 'Sosyal tesis aksından havuz alanına geçiş noktası.',
        en: 'The transition point from the amenity spine into the pool area.'
      }
    },
    '26-pool-restaurant': {
      tr: 'Havuz Restoran', en: 'Pool Restaurant',
      desc: {
        tr: 'Havuz kenarı restoran ve bar; gün boyu servis veren açık teras düzeni.',
        en: 'Poolside restaurant and bar with an open terrace layout serving through the day.'
      }
    },
    '24-terrace-view': {
      tr: 'Daire Çatı Terası', en: 'Rooftop Terrace',
      desc: {
        tr: 'Daireye ait çatı terası: pergola, yemek alanı ve barbekü düzeni; lagün havuzuna ve tüm resort yerleşimine hâkim manzara.',
        en: 'The unit’s private roof terrace — pergola, dining and BBQ area, with a commanding view over the lagoon pool and the whole resort.'
      }
    },
    '25-fitness': {
      tr: 'Fitness Merkezi', en: 'Fitness Centre',
      desc: {
        tr: 'Doğal ışık alan fitness salonu; kardiyo ve ağırlık bölümleri.',
        en: 'Naturally lit fitness studio with cardio and weights zones.'
      }
    },
    '20-facilities': {
      tr: 'Sosyal Tesisler', en: 'Facilities',
      desc: {
        tr: 'Güzellik merkezi, market ve eczanenin yer aldığı sosyal tesis aksı.',
        en: 'The amenity spine housing the beauty centre, supermarket and pharmacy.'
      }
    },
    '21-local-market': {
      tr: 'Köy Pazarı', en: 'Local Market',
      desc: {
        tr: 'Taze yerel ürünlerin sunulduğu köy pazarı meydanı.',
        en: 'The village market square offering fresh local produce.'
      }
    },

    '13-blok-e4-view': {
      tr: 'E4 Blok', en: 'Block E4',
      desc: {
        tr: 'E4 bloğu ve çevresindeki peyzaj düzenlemesi.',
        en: 'Block E4 and the surrounding landscaping.'
      }
    },
    '18-blok-c2-view': {
      tr: 'C2 Blok', en: 'Block C2',
      desc: {
        tr: 'C2 bloğu cephesi; havuz aksına bakan teraslı kurgu.',
        en: 'The C2 block facade, terraced towards the pool axis.'
      }
    },
    '22-blok-b2--f-view': {
      tr: 'B2 & F Blok', en: 'Blocks B2 & F',
      desc: {
        tr: 'B2 ve F bloklarının oluşturduğu avlu ve yaya aksı.',
        en: 'The courtyard and pedestrian route formed by blocks B2 and F.'
      }
    },
    '23-site-road': {
      tr: 'Site İçi Yol', en: 'Site Road',
      desc: {
        tr: 'Site içi ulaşım aksı; bloklar arası yaya ve araç dolaşımı.',
        en: 'The internal circulation route linking the blocks.'
      }
    }
  }
};
