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
  locale: "de",
  path: "",
  title: "DND Cyprus | Preisgekrönte Wohnungen und Villen in Nordzypern",
  description:
    "NeoCity, Lagoon Verde, La Joya, La Joya Perla und Perla II: preisgekrönte Projekte in Nordzypern, zinsfreie Lira-Zahlungsmodelle bis 60 Monate und Vorteile im Mariachi Beach Club.",
});

export default async function HomePage() {
  // Metinler ve basın listesi panelden düzenlenebilir (lib/content): veritabanındaki değişiklik koddakinin üstüne yazılır
  const c = await getScopeContent("anasayfa", "de");
  const press = await getPress("de");
  // Akış (müşteri belgesi, Ekim 2026): vitrin · projeler · neden DND · ödeme fırsatları · yaşam ve ayrıcalıklar ·
  // rakamlar · haberler ve ödüller (haberlerin yanında S.S.S., kullanıcı isteğiyle) · iletişim. Ana sayfada Amerika anılmaz (Hakkımızda'da).
  return (
    <>
      <HomeHero locale="de" content={c.vitrin} />
      <ProjectsCarousel locale="de" content={c.projeler} />
      <WhyDnd locale="de" content={c.neden} />
      <Offers locale="de" content={c.odeme} />
      <LifePerks locale="de" content={c.yasam} />
      <Story locale="de" content={c.gun} />
      <Numbers locale="de" content={c.rakamlar} />
      <AwardsShowcase locale="de" kicker={c.oduller.kicker} withProjects projectLabel={c.oduller.awardsProject} companyName={c.oduller.homesProject} awards={c.oduller.kartlar} strip={c.oduller.strip} />
      <PressFaq locale="de" items={press} content={{ press: c.basin, faq: c.sss }} />
      <ContactCard locale="de" mode="home" kicker={c.iletisim.kicker} title={c.iletisim.title} lead={c.iletisim.lead} highlights={c.iletisim.highlights} image="/azure/contact-sea.webp" id="iletisim" />
    </>
  );
}
