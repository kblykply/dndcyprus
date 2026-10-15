import { DeferredInstagram, DeferredPayment } from "@/app/components/performance/DeferredMedia";
import { type PressItem } from "@/app/components/PressSection";
import PaymentModelPopup from "@/app/components/PaymentModelPopup";
import { pageMetadata } from "@/lib/seo";
import { HOME } from "@/lib/azure/home";

// Azure tasarımı — ana sayfa bölümleri
import HomeHero from "@/app/components/azure/home/HomeHero";
import AwardsStrip from "@/app/components/azure/home/AwardsStrip";
import Bento from "@/app/components/azure/home/Bento";
import Story from "@/app/components/azure/home/Story";
import ProjectsCarousel from "@/app/components/azure/home/ProjectsCarousel";
import LocationPanel from "@/app/components/azure/home/LocationPanel";
import Leadership from "@/app/components/azure/home/Leadership";
import Timeline from "@/app/components/azure/home/Timeline";
import PressFaq from "@/app/components/azure/home/PressFaq";
import SectionHead from "@/app/components/azure/home/SectionHead";
import ContactCard from "@/app/components/azure/ContactCard";

export const metadata = pageMetadata({
  locale: "tr",
  path: "",
  title: "Kuzey Kıbrıs'ta Satılık Daireler ve Projeler | DND Cyprus",
  description:
    "Ödüllü geliştirici DND Cyprus; İskele'de Lagoon Verde, La Joya Perla ve Perla II gibi denize yakın projeler ve Mariachi Beach Club ayrıcalığı sunar. Keşfedin.",
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
    id: "kibrispostasi-2025-11-04",
    outlet: "Kıbrıs Postası",
    title:
      "Hayaller gerçek oldu: DND Cyprus, La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu",
    url: "https://www.kibrispostasi.com/c35-KIBRIS_HABERLERI/n580748-hayaller-gercek-oldu-dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu",
    excerpt: "DND Cyprus, İskele Long Beach bölgesindeki La Joya Rezidansları ve Tatil Köyü projesinin tamamlandığını duyurdu. Yatay mimariyle tasarlanan 74 özel rezidanslık proje, sahiplerine teslime hazır.",
    date: "2025-11-04",
    cover: "/news/kpcover.jpg",
    tags: ["La Joya", "İskele Long Beach"],
  },
  {
    id: "yeniduzen-2025-11-04",
    outlet: "YENİDÜZEN",
    title:
      "DND Cyprus, La Joya Rezidansları ve Tatil Köyü’nün tamamlandığını duyurdu",
    url: "https://www.yeniduzen.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-188492h.htm",
    excerpt: "DND Cyprus, büyük heyecanla beklenen La Joya Rezidansları ve Tatil Köyü projesinin resmi olarak tamamlandığını ve artık sahiplerini ağırlamaya hazır olduğunu duyurdu.",
    date: "2025-11-04",
    cover: "/news/ydcover.jpg",
    tags: ["La Joya"],
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
];

export default function HomePage() {
  const t = HOME.tr;
  return (
    <>
      <PaymentModelPopup />
      <HomeHero locale="tr" />
      <AwardsStrip locale="tr" />
      <Bento locale="tr" />
      <SectionHead kicker={t.videos.kicker} title={t.videos.title}>
        <DeferredPayment locale="tr" />
      </SectionHead>
      <Story locale="tr" />
      <ProjectsCarousel locale="tr" />
      <LocationPanel locale="tr" />
      <Leadership locale="tr" />
      <Timeline locale="tr" />
      <PressFaq locale="tr" items={PRESS_ITEMS} />
      <div className="az-section tight flush rv"><DeferredInstagram locale="tr" /></div>
      <ContactCard locale="tr" mode="home" kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} highlights={t.contact.highlights} image="/azure/p2-9.jpg" id="iletisim" />
    </>
  );
}
