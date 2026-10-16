import { DeferredInstagram, DeferredPayment } from "@/app/components/performance/DeferredMedia";
import { type PressItem } from "@/app/components/PressSection";
import { pageMetadata } from "@/lib/seo";
import { HOME } from "@/lib/azure/home";

// Azure tasarımı — ana sayfa bölümleri
import HomeHero from "@/app/components/azure/home/HomeHero";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
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
  locale: "ru",
  path: "",
  title: "Девелопер и квартиры на Северном Кипре | DND Cyprus",
  description:
    "Отмеченный наградами девелопер DND Cyprus строит дома у моря в Искеле: Lagoon Verde, La Joya Perla и Perla II с привилегиями Mariachi Beach Club. Смотрите проекты.",
});

const PRESS_ITEMS: PressItem[] = [
  {
    id: "bestlife-2026-10-14",
    outlet: "Bestlife Magazin",
    title: "Шанс стать владельцем дома на Северном Кипре без долгов в фунтах стерлингов",
    url: "https://www.bestlifemagazin.com/kuzey-kibris-ta-sterlinle-borclanmadan-ev-sahibi-olma-firsati/6618/",
    excerpt: "Основатель DND Cyprus Ozan Dökmecioğlu разработал новую модель финансирования жилья для покупателей с доходом в турецких лирах. Для ограниченного числа резиденций в отмеченном наградами проекте Lagoon Verde платежи вносятся в турецких лирах: рассрочка до 60 месяцев — без процентов и без наценки за срок, а взносы периодически пересматриваются вслед за ростом минимальной зарплаты в ТРСК, а не по курсу фунта стерлингов. Модель открывает альтернативный путь к собственному дому на Северном Кипре — для отдыха, жизни или инвестиций — без валютного риска.",
    date: "2026-10-14",
    cover: "/news/bestlife-tl-konut-modeli-v3.webp",
    tags: ["Lagoon Verde", "Оплата в лирах"],
  },
  {
    id: "cekicmagazin-2026-10-14",
    outlet: "Çekiç Magazin",
    title: "DND Cyprus предлагает местным жителям финансирование жилья в турецких лирах",
    url: "https://cekicmagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani",
    excerpt: "DND Cyprus разработала новую модель финансирования, чтобы жителям Северного Кипра с доходом в турецких лирах было проще стать владельцами жилья. Система предусматривает рассрочку до 60 месяцев без процентов и без наценки за срок; взносы периодически пересматриваются вслед за ростом минимальной зарплаты в ТРСК.",
    date: "2026-10-14",
    cover: "/news/tl-konut-finansmani-v3.webp",
    tags: ["Оплата в лирах", "DND Cyprus"],
  },
  {
    id: "50fifty-2026-10-14",
    outlet: "50fifty Magazin",
    title: "До 60 месяцев без процентов: финансирование жилья в турецких лирах от DND Cyprus",
    url: "https://50fiftymagazin.com/dnd-cyprustan-yerli-halka-turk-lirasiyla-konut-finansmani-h27457.html",
    excerpt: "Модель, представленная основателем компании Ozan Dökmecioğlu, позволяет платить в турецких лирах, а взносы привязаны к росту минимальной зарплаты в ТРСК, а не к курсу фунта стерлингов. Предложение действует для ограниченного числа резиденций в Lagoon Verde и включает рассрочку до 60 месяцев без процентов и без наценки за срок.",
    date: "2026-10-14",
    cover: "/news/50fifty-haber-kapak-v2.webp",
    tags: ["Оплата в лирах", "DND Cyprus"],
  },
  {
    id: "mha-2025-11-04",
    outlet: "Mağusa Haber Ajansı (MHA)",
    title: "DND сообщила радостную новость: La Joya завершён",
    url: "https://www.mhahaber.com/dnd-mujdeyi-verdi-la-joya-tamamlandi",
    excerpt: "DND Cyprus объявила о завершении резиденций и курортного комплекса La Joya в Long Beach (Искеле). Проект из 74 частных резиденций готов встречать своих владельцев.",
    date: "2025-11-04",
    cover: "/news/mhacover.webp",
    tags: ["La Joya", "DND Cyprus"],
  },
  {
    id: "kibrispostasi-2025-11-04",
    outlet: "Kıbrıs Postası",
    title:
      "Мечты сбылись: DND Cyprus объявила о завершении резиденций и курортного комплекса La Joya",
    url: "https://www.kibrispostasi.com/c35-KIBRIS_HABERLERI/n580748-hayaller-gercek-oldu-dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu",
    excerpt: "DND Cyprus сообщила, что резиденции и курортный комплекс La Joya в Long Beach (Искеле) завершены. Малоэтажный проект из 74 частных резиденций готов к передаче владельцам.",
    date: "2025-11-04",
    cover: "/news/kpcover.jpg",
    tags: ["La Joya", "Long Beach, Искеле"],
  },
  {
    id: "yeniduzen-2025-11-04",
    outlet: "YENİDÜZEN",
    title:
      "DND Cyprus объявила о завершении резиденций и курортного комплекса La Joya",
    url: "https://www.yeniduzen.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-188492h.htm",
    excerpt: "DND Cyprus сообщила, что долгожданные резиденции и курортный комплекс La Joya официально завершены и готовы встречать своих владельцев.",
    date: "2025-11-04",
    cover: "/news/ydcover.jpg",
    tags: ["La Joya"],
  },
  {
    id: "haberkibris-2025-11-04",
    outlet: "Haber Kıbrıs",
    title:
      "DND Cyprus объявила о завершении резиденций и курортного комплекса La Joya",
    url: "https://haberkibris.com/dnd-cyprus-la-joya-rezidanslari-ve-tatil-koyunun-tamamlandigini-duyurdu-0957-2025-11-04.html",
    excerpt: "Резиденции и курортный комплекс La Joya завершены: DND Cyprus сообщила, что проект в Long Beach (Искеле) готов встречать своих владельцев.",
    date: "2025-11-04",
    cover: "/news/hkcover.jpg",
    tags: ["La Joya"],
  },
];

export default function HomePage() {
  const t = HOME.ru;
  return (
    <>
      <HomeHero locale="ru" />
      <AwardsShowcase locale="ru" />
      <Bento locale="ru" />
      <SectionHead kicker={t.videos.kicker} title={t.videos.title}>
        <DeferredPayment locale="ru" />
      </SectionHead>
      <Story locale="ru" />
      <ProjectsCarousel locale="ru" />
      <LocationPanel locale="ru" />
      <Leadership locale="ru" />
      <Timeline locale="ru" />
      <PressFaq locale="ru" items={PRESS_ITEMS} />
      <div className="az-section tight flush rv"><DeferredInstagram locale="ru" /></div>
      <ContactCard locale="ru" mode="home" kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} highlights={t.contact.highlights} image="/azure/p2-9.jpg" id="iletisim" />
    </>
  );
}
