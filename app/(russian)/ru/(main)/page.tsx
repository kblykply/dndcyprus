import { getPress, getScopeContent } from "@/lib/content/store";
import { pageMetadata } from "@/lib/seo";

// Azure tasarımı — ana sayfa bölümleri
import HomeHero from "@/app/components/azure/home/HomeHero";
import AwardsShowcase from "@/app/components/azure/home/AwardsShowcase";
import Story from "@/app/components/azure/home/Story";
import ProjectsCarousel from "@/app/components/azure/home/ProjectsCarousel";
import PressFaq from "@/app/components/azure/home/PressFaq";
import ContactCard from "@/app/components/azure/ContactCard";
import { WhyDnd, Offers, LifePerks, Numbers } from "@/app/components/azure/home/FlowSections";

export const metadata = pageMetadata({
  locale: "ru",
  path: "",
  title: "DND Cyprus | Жильё и виллы-лауреаты на Северном Кипре",
  description:
    "NeoCity, Lagoon Verde, La Joya, La Joya Perla и Perla II: проекты-лауреаты на Северном Кипре, беспроцентная оплата в лирах до 60 месяцев и привилегии Mariachi Beach Club.",
});

export default async function HomePage() {
  // Metinler ve basın listesi panelden düzenlenebilir (lib/content): veritabanındaki değişiklik koddakinin üstüne yazılır
  const c = await getScopeContent("anasayfa", "ru");
  const press = await getPress("ru");
  // Akış (müşteri belgesi, Ekim 2026): vitrin · projeler · neden DND · ödeme fırsatları · yaşam ve ayrıcalıklar ·
  // rakamlar · haberler ve ödüller (haberlerin yanında S.S.S., kullanıcı isteğiyle) · iletişim. Ana sayfada Amerika anılmaz (Hakkımızda'da).
  return (
    <>
      <HomeHero locale="ru" content={c.vitrin} />
      <ProjectsCarousel locale="ru" content={c.projeler} />
      <WhyDnd locale="ru" content={c.neden} />
      <Offers locale="ru" content={c.odeme} />
      <LifePerks locale="ru" content={c.yasam} />
      <Story locale="ru" content={c.gun} />
      <Numbers locale="ru" content={c.rakamlar} />
      <AwardsShowcase locale="ru" kicker={c.oduller.kicker} withProjects projectLabel={c.oduller.awardsProject} companyName={c.oduller.homesProject} awards={c.oduller.kartlar} strip={c.oduller.strip} />
      <PressFaq locale="ru" items={press} content={{ press: c.basin, faq: c.sss }} />
      <ContactCard locale="ru" mode="home" kicker={c.iletisim.kicker} title={c.iletisim.title} lead={c.iletisim.lead} highlights={c.iletisim.highlights} image="/azure/contact-sea.webp" id="iletisim" />
    </>
  );
}
