import PageHero from "@/app/components/azure/PageHero";
import ContactCard from "@/app/components/azure/ContactCard";
import ContactInfo from "@/app/components/ru/contact/ContactInfo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "ru",
  path: "/contact",
  title: "Контакты – офисы в Фамагусте и Искеле | DND Cyprus",
  description:
    "Приходите в головной офис DND Cyprus в Фамагусте или офис продаж в Искеле. Звоните +90 392 444 03 63 или пишите на info@dndcyprus.com о проектах и инвестициях.",
});
export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">

<PageHero size="short" kicker="Контакты" title={<>Свяжитесь <b>с нами.</b></>} lead="Свяжитесь с нами, чтобы узнать больше о наших проектах и инвестиционных возможностях." image="/azure/lv-3.jpg" imageAlt="DND Cyprus" ctas={[{ label: "Написать нам", href: "#form" }, { label: "Наши проекты", href: "/ru/projects", variant: "ghost" }]} />
<ContactInfo />
<ContactCard locale="ru" mode="contact" id="form" title={<>Воплотим вашу мечту <b>вместе.</b></>} lead="Команда DND Cyprus готова поддержать ваши инвестиции. Оставьте сообщение — мы скоро с вами свяжемся." image="/azure/lvin-s1.jpg" showOffices={false} />
    
    </main>
  );
}
