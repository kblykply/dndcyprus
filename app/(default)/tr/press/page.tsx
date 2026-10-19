import PageHero from "@/app/components/azure/PageHero";
import PressSection, { type PressItem } from "@/app/components/PressSection";
import { pageMetadata } from "@/lib/seo";
import { DndNewsSection, EventsSection, PressBlock } from "@/app/components/azure/pages/PageSections";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/press",
  title: "Basın Haberleri ve Duyurular | DND Cyprus",
  description:
    "Basında DND Cyprus: La Joya Rezidansları ve Tatil Köyü'nün tamamlanması başta olmak üzere Kıbrıs Postası, Yenidüzen ve Haber Kıbrıs'taki haberleri okuyun.",
});

const PRESS_ITEMS: PressItem[] = [
  {
    id: "bestlife-2026-10-14",
    outlet: "Bestlife Magazin",
    title: "Kuzey Kıbrıs’ta sterlinle borçlanmadan ev sahibi olma fırsatı!",
    url: "https://www.bestlifemagazin.com/kuzey-kibris-ta-sterlinle-borclanmadan-ev-sahibi-olma-firsati/6618/",
    excerpt: "DND Cyprus Kurucusu Ozan Dökmecioğlu, gelirini Türk lirasıyla kazananlar için yeni bir konut finansman modeli geliştirdi. Ödüllü Lagoon Verde projesindeki sınırlı sayıdaki rezidansta ödemeler Türk lirasıyla yapılıyor; 60 aya kadar faizsiz ve vade farksız taksitler, sterlin kuruna değil KKTC asgari ücretindeki artış oranına göre dönemsel olarak güncelleniyor. Model, Kuzey Kıbrıs’ta tatil, yaşam ya da yatırım amaçlı ev sahibi olmak isteyenlere döviz yükü olmadan alternatif bir yol sunuyor.",
    date: "2026-10-14",
    cover: "/news/bestlife-tl-konut-modeli-v3.webp",
    tags: ["Lagoon Verde", "TL Ödeme Modeli"],
  },
  {
    id: "cekicmagazin-2026-10-14",
    outlet: "Çekiç Magazin",
    title: "DND Cyprus’tan yerli halka Türk lirasıyla konut finansmanı",
    url: "https://cekicmagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani",
    excerpt: "DND Cyprus, Kuzey Kıbrıs’ta gelirini Türk lirası üzerinden elde edenlerin konut sahibi olmasını kolaylaştırmak için yeni bir finansman modeli geliştirdi. 60 aya kadar faizsiz ve vade farksız ödeme imkânı sunan sistemde taksitler, KKTC asgari ücretindeki artış oranına göre dönemsel olarak güncelleniyor.",
    date: "2026-10-14",
    cover: "/news/tl-konut-finansmani-v3.webp",
    tags: ["TL Ödeme Modeli", "DND Cyprus"],
  },
  {
    id: "50fifty-2026-10-14",
    outlet: "50fifty Magazin",
    title: "DND Cyprus’tan 60 aya kadar faizsiz, vade farksız TL konut modeli",
    url: "https://50fiftymagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani-h27457.html",
    excerpt: "Kurucu Ozan Dökmecioğlu’nun duyurduğu modelde ödemeler Türk lirasıyla yapılıyor; taksitler sterline değil KKTC asgari ücretindeki artışa bağlı olarak güncelleniyor. Lagoon Verde’deki sınırlı sayıda rezidans için geçerli plan, 60 aya kadar faizsiz ve vade farksız ödeme sunuyor.",
    date: "2026-10-14",
    cover: "/news/50fifty-haber-kapak-v2.webp",
    tags: ["TL Ödeme Modeli", "DND Cyprus"],
  },
  {
    id: "ekonomist-2026-09-30",
    outlet: "Ekonomist",
    title: "DND Cyprus’tan KKTC’de 50 milyon dolarlık yatırım",
    url: "https://www.ekonomist.com.tr/talip-yilmaz/dnd-cyprus-tan-kktc-de-50-milyon-dolarlik-yatirim--79348",
    excerpt: "Ekonomist yazarı Talip Yılmaz, DND Cyprus’un üç yılda Kuzey Kıbrıs’ta yaptığı gayrimenkul yatırımlarını kaleme aldı. Yazıda İskele’deki La Joya projelerinin başarısı, La Joya’nın tamamlanması ve şirketin bölgedeki yeni projeleri öne çıkıyor.",
    date: "2026-09-30",
    cover: "/news/ekonomist-dnd-50-milyon-yatirim.webp",
    tags: ["Yatırım", "La Joya"],
  },
  {
    id: "nethaber-2026-09-29",
    outlet: "Net Haber",
    title: "Orta Doğu'daki çatışmalar yatırım rotasını değiştirdi: KKTC cazibe merkezi oldu",
    url: "https://www.nethaber.com.tr/haber/orta-dogudaki-catismalar-yatirim-rotasini-degistirdi-kktc-cazibe-merkezi-oldu-1009797",
    excerpt: "İHA’ya konuşan DND Cyprus Yönetim Kurulu Başkanı Ozan Dökmecioğlu, bölgedeki gelişmelerin ardından yatırımcıların Kuzey Kıbrıs’a ilgisinin arttığını anlattı; döviz bazlı kira gelirinin ve kısa amortisman süresinin öne çıktığını vurguladı.",
    date: "2026-09-29",
    cover: "/news/nethaber-la-joya-havadan.webp",
    tags: ["Röportaj", "Yatırım"],
  },
  {
    id: "halkinsesi-2026-09-26",
    outlet: "Halkın Sesi",
    title: "Şampiyon Larnaka Gençler Birliği U17 takımı, sponsoruyla yemekte buluştu",
    url: "https://www.halkinsesikibris.com/sampiyon-larnaka-gencler-birligi-u17-takimi-sponsoruyla-yemekte-bulustu",
    excerpt: "Şampiyonluğa ulaşan Larnaka Gençler Birliği U17 takımı, sponsoru DND Cyprus’un ev sahipliğinde verilen yemekte bir araya geldi. Gecede başarı kutlanırken genç sporculara yapılan yatırımın önemi vurgulandı.",
    date: "2026-09-26",
    cover: "/news/halkinsesi-larnaka-u17.webp",
    tags: ["Spor", "Sponsorluk"],
  },
  {
    id: "yeniduzen-2026-09-16",
    outlet: "YENİDÜZEN",
    title: "Joy Cafe & Bar İskele’de hizmete açıldı",
    url: "https://www.yeniduzen.com/joy-cafe-bar-iskelede-hizmete-acildi-199408h.htm",
    excerpt: "DND Cyprus’un İskele’deki La Joya Rezidansları ve Tatil Köyü bünyesinde Joy Cafe & Bar kapılarını açtı. Havuz başındaki mekân rezidans sakinlerinin ve otel misafirlerinin yanı sıra İskele halkına ve bölge ziyaretçilerine de açık.",
    date: "2026-09-16",
    cover: "/news/yeniduzen-joy-cafe-bar.webp",
    tags: ["La Joya", "Açılış"],
  },
  {
    id: "yeniduzen-2026-08-17",
    outlet: "YENİDÜZEN",
    title: "DND Cyprus’tan sanata ve yaratıcı üretime destek: “tüş” Festival yolculuğuna başladı",
    url: "https://www.yeniduzen.com/dnd-cyprustan-sanata-ve-yaratici-uretime-destek-tus-festival-yolculuguna-basladi-198450h.htm",
    excerpt: "DND Cyprus, Cansu Ezgi Bozkurt’un yönettiği deneysel kısa film “tüş”ün destekçileri arasında yer aldı; film Türkiye ve Avrupa’daki festivallere katılıyor. Kurucu ortak Netice Dökmecioğlu, kadınların sanat ve yaratıcı sektörlerde desteklenmesinin önemine dikkat çekti.",
    date: "2026-08-17",
    cover: "/news/yeniduzen-tus-kisa-film.webp",
    tags: ["Sanat", "Sponsorluk"],
  },
  {
    id: "mha-2026-07-30",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DÖKMECİOĞLU: İSKELE'NİN POTANSİYELİNİ ERKEN GÖRDÜK",
    url: "https://www.mhahaber.com/dokmecioglu-iskelenin-potansiyelini-erken-gorduk",
    excerpt: "Ozan Dökmecioğlu, İskele’nin potansiyelini erken gördüklerini ve yalnızca konut değil yaşam destinasyonları inşa ettiklerini anlattı. La Joya, La Joya Perla, Perla II, Lagoon Verde ve beach club projelerini tek bir vizyonun parçaları olarak değerlendirdi.",
    date: "2026-07-30",
    cover: "/news/mha-iskele-potansiyel.webp",
    tags: ["Röportaj", "İskele"],
  },
  {
    id: "haberturk-2026-03-11",
    outlet: "Habertürk",
    title: "ABD'ye 400 milyon dolarlık portföy",
    url: "https://yerel-haberler.haberturk.com/kayseri-haberleri/abdye-400-milyon-dolarlik-portfoy-116967814",
    excerpt: "İHA kaynaklı haberde DND Cyprus’un kurucusu Ozan Dökmecioğlu’nun DND Homes ile ABD’de ve Kuzey Kıbrıs’ta oluşturduğu yatırım portföyü anlatılıyor; Boston ve Cambridge’deki konut projelerine yer veriliyor.",
    date: "2026-03-11",
    cover: "/news/haberturk-400-milyon-portfoy.webp",
    tags: ["DND Homes", "Boston"],
  },
  {
    id: "gundemkibris-2026-02-08",
    outlet: "Gündem Kıbrıs",
    title: "KKTC Turizm ve Başarı Ödül Töreni, Les Ambassadeurs Hotel’de gerçekleşti",
    url: "https://www.gundemkibris.com/kktc-turizm-ve-basari-odul-toreni-les-ambassadeurs-hotelde-gerceklesti",
    excerpt: "Başbakan Yardımcılığı ve Turizm Bakanlığı himayesinde Girne’de düzenlenen KKTC Turizm ve Başarı Ödül Töreni’nde Ozan Dökmecioğlu, “Yılın En İyi Proje Geliştirme Şirketi” ödülüne layık görüldü.",
    date: "2026-02-08",
    cover: "/news/gundemkibris-turizm-basari-odulu.webp",
    tags: ["Ödül"],
  },
  {
    id: "mha-2025-11-04",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND MÜJDEYİ VERDİ: LA JOYA TAMAMLANDI",
    url: "https://www.mhahaber.com/dnd-mujdeyi-verdi-la-joya-tamamlandi",
    excerpt: "DND Cyprus, İskele Long Beach’teki La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu. 74 özel rezidanstan oluşan proje artık sahiplerini ağırlamaya hazır.",
    date: "2025-11-04",
    cover: "/news/mhacover.webp",
    tags: ["La Joya", "DND Cyprus"],
  },
  {
    id: "haberkibris-2025-11-04",
    outlet: "Haber Kıbrıs",
    title:
      "DND Cyprus, La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu",
    url: "https://haberkibris.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-0957-2025-11-04.html",
    excerpt: "La Joya Rezidansları ve Tatil Köyü tamamlandı: DND Cyprus, İskele Long Beach’teki projenin sahiplerini ağırlamaya hazır olduğunu açıkladı.",
    date: "2025-11-04",
    cover: "/news/hkcover.jpg",
    tags: ["La Joya"],
  },
  {
    id: "mha-2025-04-28",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND KIBRIS, PROPERTY NC ÖDÜLLERİ'NE DAMGA VURDU",
    url: "https://www.mhahaber.com/dnd-kibris-property-nc-odullerine-damga-vurdu",
    excerpt: "DND Kıbrıs, 2025 Property NC Ödülleri’nden üç ödülle döndü: En İyi Yeni Girişim (Altın), Lagoon Verde ile En İyi Önerilen Sosyo-Kültürel Gelişim (Altın) ve Mariachi Beach Club ile En İyi Önerilen Yeni Ticari Proje (Platin).",
    date: "2025-04-28",
    cover: "/news/mha-propertync-2025-odulleri.webp",
    tags: ["Ödül", "Lagoon Verde", "Mariachi"],
  },
  {
    id: "kibrispostasi-2023-11-08",
    outlet: "Kıbrıs Postası",
    title: "DND Kuzey Kıbrıs, La Joya Perla Residences & Beach Resort’u satışa sundu",
    url: "https://www.kibrispostasi.com/c68-ISKELE/n494500-dnd-kuzey-kibris-la-joya-perla-residences-beach-resortu-satisa-sundu",
    excerpt: "DND Kuzey Kıbrıs, İskele Bahçeler’deki 384 konutluk La Joya Perla Residences & Beach Resort projesini satışa sundu. Haberde kurucu Ozan Dökmecioğlu ile direktör Aynur Zorba Güloğlu’nun açıklamalarına ve projenin olanaklarına yer veriliyor.",
    date: "2023-11-08",
    cover: "/news/kibrispostasi-la-joya-perla-lansman.webp",
    tags: ["La Joya Perla", "Lansman"],
  },
];





export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip">
      <PageHero size="short" kicker="Basında DND Cyprus" title={<>Haberler</>} lead="DND’den haberler, basında DND ve etkinlikler." image="/dndwhoweare.jpg" imagePosition="50% 42%" />
      {/* akış belgesi: Haberler = DND’den Haberler · Basında DND · Etkinlikler */}
      <DndNewsSection locale="tr" />
      <PressBlock locale="tr"><PressSection items={PRESS_ITEMS} bare description="" moreHref="" initialLimit={6} /></PressBlock>
      <EventsSection locale="tr" />


    </main>
  );
}
