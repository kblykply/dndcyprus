export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;
  date: string;
  author?: string;
  content: string; // HTML string
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "dnd-usa-quality-in-cyprus-interview-2025",
    title: "USA Quality in Cyprus: Ozan Dökmecioğlu ile Röportaj",
    excerpt:
      "PropertyNC ile yapılan söyleşide DND’nin vizyonu ve projeleri konuşuldu.",
    cover: "/ozanbeyrop.jpg",
    date: "2025-01-28",
    author: "Admin",
    content: `
      <p><strong>28 Ocak 2025</strong>’te yayımlanan söyleşide DND Cyprus, İskele’nin yükselen profilinde “USA Quality in Cyprus” yaklaşımıyla öne çıkan projelerini ve gelecek hedeflerini anlattı. Röportajda; tasarım, fonksiyonellik ve çevresel uyumun DND’nin her projesinde birlikte ele alındığı vurgulandı. Ayrıntılar için <a href="https://propertync.com/blog-detail/dnd-usa-quality-in-cyprus-standout-projects-and-future-goals" target="_blank" rel="noopener">PropertyNC</a> sayfasına bakabilirsiniz.</p>

      <p>Şirket, <em>La Joya</em>, <em>La Joya Perla</em> ve <em>La Joya Perla II</em> gibi projelerde yatay mimari, doğal peyzaj, plaj/club konseptleri ve “her gün tatil hissi” sunan sosyal donatıları standartlaştırıyor. Ayrıca akıllı ev altyapısı, ısıtma/soğutma çözümleri ve yüksek yalıtım gibi kalite unsurları projelerin temel bileşenleri arasında yer alıyor.</p>

      <ul>
        <li><strong>Vizyon:</strong> Yalnızca konut üretmek değil; sağlıklı yaşam, turizm ve eğitim odaklı karma yatırımlarla bölgenin yaşam biçimini geliştirmek.</li>
        <li><strong>Sürdürülebilirlik:</strong> Yerel bitki örtüsüne uygun peyzaj, su ve atık yönetimi gibi başlıklarda çevresel duyarlılık.</li>
        <li><strong>Topluluk:</strong> Plaj kulübü ve sosyal tesislerle “yerel–küresel” yaşamı harmanlayan topluluk hissi.</li>
      </ul>

      <p>DND ekibi, Kuzey Kıbrıs’ta artan yatırımcı ilgisinin yanı sıra altyapı konularının da sektör için kritik olduğunu belirtiyor; yerel otoritelerle koordinasyonun kalıcı çözümleri hızlandıracağı görüşünde. DND’nin Kuzey Kıbrıs’a uzanan yolculuğu ve kurucusu Ozan Dökmecioğlu’nun arka planı için <a href="https://propertync.com/blog-detail/from-global-career-to-real-estate-investments-in-north-cyprus" target="_blank" rel="noopener">bu önceki PropertyNC röportajına</a> da göz atabilirsiniz.</p>
    `,
  },
  {
    slug: "dnd-cyprus-gold-award-propertync-2025",
    title:
      "DND Cyprus, 2025 PropertyNC Ödülleri’nde Altın Ödül Kazandı",
    excerpt:
      "Şirket ‘Best Newcomer’ kategorisinde ödüle layık görüldü.",
    cover: "/property_awards_2025-782.jpg",
    date: "2025-04-28",
    author: "Admin",
    content: `
      <p><strong>Nisan 2025</strong>’te düzenlenen <em>PropertyNC Awards</em>’da DND Cyprus, <strong>Best Newcomer (Gold)</strong> ödülünün sahibi oldu. Bu ödül, şirketin kısa sürede sergilediği vizyoner yaklaşım, hızlı ölçeklenme ve Kuzey Kıbrıs gayrimenkul ekosistemine etkisini tescilledi. Resmî kazanan sayfası için <a href="https://awards.propertync.com/winner-detail/dnd-homes" target="_blank" rel="noopener">buraya</a> göz atabilirsiniz.</p>

      <p>Aynı törende DND’nin cesur konsepti <strong>Mariachi Beach Club</strong>, <em>Best Proposed New Commercial Project (Platinum)</em> ödülünü aldı. Detay sayfası: <a href="https://awards.propertync.com/winner-detail/mariachi-beach-club" target="_blank" rel="noopener">Mariachi Beach Club</a>. Bu başarı, DND’nin yalnızca konut değil; turizm ve yaşam tarzı odaklı projelerde de iddialı olduğunu gösteriyor. DND’nin duyurusu şirket sitesinde de yer aldı: <a href="https://dndcyprus.com/en/" target="_blank" rel="noopener">dndcyprus.com</a>.</p>

      <ul>
        <li><strong>Öne çıkan kriterler:</strong> Vizyoner liderlik, marka konumlandırması, kısa sürede yüksek adetli lansmanlar ve sosyal/ekonomik katkı.</li>
        <li><strong>Etki:</strong> Yatırımcı güveninde artış, İskele ve çevresinde satış hızının yükselmesi, yeni iş birliklerine zemin.</li>
        <li><strong>Gelecek:</strong> Sürdürülebilir, yatay mimarili ve sağlıklı yaşam temalı proje hattını büyütme planı.</li>
      </ul>

      <p>Ödül gecesine ilişkin sosyal paylaşımlar için <a href="https://www.instagram.com/p/DI-4WRSCJaR/" target="_blank" rel="noopener">DND Cyprus Instagram</a> ve <a href="https://m.facebook.com/PropertyncAwards/photos/2025-award-winnerbest-newcomer-goldcompany-dnd-homesdndcyprus-propertyncawards-p/1289118946555955/" target="_blank" rel="noopener">PropertyNC Awards yayını</a>na bakabilirsiniz.</p>
    `,
  },
  {
    slug: "dnd-cyprus-new-year-celebration-2023",
    title:
      "DND Cyprus, Yılbaşı Etkinliğiyle İş Ortaklarını Ağırladı",
    excerpt:
      "Şirket, iş ortaklarıyla birlikte yeni yılı kutladığı özel bir etkinlik düzenledi.",
    cover: "/dndwhoweare.jpg",
    date: "2023-12-11",
    author: "Admin",
    content: `
      <p><strong>11 Aralık 2023</strong>’te DND Cyprus; iş ortakları, acenteler ve sektör paydaşlarını bir araya getiren kapsamlı bir <em>Yeni Yıl Gala</em> etkinliği düzenledi. Etkinlik; markanın Kuzey Kıbrıs’taki büyümesini kutlamak, 2024 stratejilerini paylaşmak ve iş birliklerini güçlendirmek amacıyla planlandı. Şirketin resmî duyurusu: <a href="https://dndcyprus.com/en/2023/" target="_blank" rel="noopener">DND Cyprus – 2023 Arşivi</a>.</p>

      <p>Program, açılış konuşmaları ve müzik performanslarıyla ilerledi; davetliler arasında kamu ve iş dünyasından çok sayıda isim yer aldı. DND, bu tür buluşmaları yalnızca bir kutlama değil; aynı zamanda <em>yatırımcı güveni</em> ve <em>topluluk bağı</em> açısından stratejik bir platform olarak görüyor.</p>

      <ul>
        <li><strong>Hedef:</strong> 2024 ve sonrasında turizm, sağlıklı yaşam ve eğitim odağındaki projelerle “yerel–küresel” faydayı artırmak.</li>
        <li><strong>Mesaj:</strong> “Memlekete değer katan, standartları yükselten, sürdürülebilir yaşam biçimleri geliştiren projeler.”</li>
        <li><strong>Sonuç:</strong> İş ortaklıklarında güçlenme, marka bilinirliğinde artış ve satış süreçlerine pozitif yansıma.</li>
      </ul>
    `,
  },

  {
  slug: "dnd-homes-30000-konut-buyume-plani-2024",
  title: "DND Homes, Kuzey Kıbrıs’ta 30.000+ Konutluk Büyüme Planını Açıkladı",
      cover: "/yaho.jpg",

  excerpt:
    "DND Homes; İskele, Girne, Esentepe, Geçitkale ve Yedikonuk’ta 30.000’i aşkın konut hedefiyle Kuzey Kıbrıs’ta genişleme planlarını duyurdu.",
  // İsterseniz yerel bir kapak görseli ekleyin (örn. /dnd-expansion.jpg)
  // Basın görselini uzaktan kullanmak isterseniz şunu deneyebilirsiniz:
  // cover: "https://app.accessnewswire.com/img.ashx?id=862906",
  date: "2024-05-14",
  author: "Basın Bülteni",
  content: `
    <p><strong>14 Mayıs 2024</strong>’te yayımlanan basın duyurusunda DND Homes, Kuzey Kıbrıs’ta <strong>30.000+ konut</strong> hedefiyle kapsamlı bir büyüme planı açıkladı. Şirket; <em>İskele, Girne, Esentepe, Geçitkale</em> ve <em>Yedikonuk</em> bölgelerinde lüks yaşam standartlarını ve sürdürülebilir tasarım ilkelerini ölçeklendirmeyi hedefliyor.</p>

    <ul>
      <li><strong>Vizyon:</strong> “Eşsiz kalite ve konfor sunan yaşam alanları” anlayışını adaya taşımak.</li>
      <li><strong>Yatırım Kapsamı:</strong> Konut projelerine ek olarak <em>Bafra</em> ve <em>Yedikonuk</em>’ta 5 yıldızlı otel yatırımları ve İskele bölgesinde bir <em>beach club</em>.</li>
      <li><strong>Takvim (seçili projeler):</strong> La Joya (74 ünite) <em>2025 sonu</em>, La Joya Perla (384 ünite) <em>2026 sonu</em>, La Joya Perla II (128 ünite) <em>2027 sonu</em>.</li>
    </ul>

    <blockquote>
      “Amacımız yenilikçi konut geliştirmede liderlik ederek <em>eşsiz kalite ve konfor</em> sağlayan evler üretmek.” — Ozan Dökmecioğlu
    </blockquote>

    <p>Ayrıntılar için: 
      <a href="https://finance.yahoo.com/news/dnd-homes-unveils-expansion-plans-092000611.html" target="_blank" rel="noopener">Yahoo Finance haberi</a> ve 
      <a href="https://www.accessnewswire.com/newsroom/en/business-and-professional-services/dnd-homes-unveils-expansion-plans-in-northern-cyprus-with-over-30-862906" target="_blank" rel="noopener">ACCESSWIRE basın bülteni</a>.
    </p>
  `,
},

];
