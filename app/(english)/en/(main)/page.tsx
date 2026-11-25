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
  locale: "en",
  path: "",
  title: "DND Cyprus | Award-Winning Homes and Villas in North Cyprus",
  description:
    "NeoCity, Lagoon Verde, La Joya, La Joya Perla and Perla II: award-winning projects in North Cyprus, interest-free lira payment models up to 60 months and Mariachi Beach Club privileges.",
});
export default async function HomePage() {
  // Metinler ve basın listesi panelden düzenlenebilir (lib/content): veritabanındaki değişiklik koddakinin üstüne yazılır
  const c = await getScopeContent("anasayfa", "en");
  const press = await getPress("en");
  // Akış (müşteri belgesi, Ekim 2026): vitrin · projeler · neden DND · ödeme fırsatları · yaşam ve ayrıcalıklar ·
  // rakamlar · haberler ve ödüller (haberlerin yanında S.S.S., kullanıcı isteğiyle) · iletişim. Ana sayfada Amerika anılmaz (Hakkımızda'da).
  return (
    <>
      <HomeHero locale="en" content={c.vitrin} />
      <ProjectsCarousel locale="en" content={c.projeler} />
      <WhyDnd locale="en" content={c.neden} />
      <Offers locale="en" content={c.odeme} />
      <LifePerks locale="en" content={c.yasam} />
      <Story locale="en" content={c.gun} />
      <Numbers locale="en" content={c.rakamlar} />
      <AwardsShowcase locale="en" kicker={c.oduller.kicker} withProjects projectLabel={c.oduller.awardsProject} companyName={c.oduller.homesProject} awards={c.oduller.kartlar} strip={c.oduller.strip} />
      <PressFaq locale="en" items={press} content={{ press: c.basin, faq: c.sss }} />
      <ContactCard locale="en" mode="home" kicker={c.iletisim.kicker} title={c.iletisim.title} lead={c.iletisim.lead} highlights={c.iletisim.highlights} image="/azure/contact-sea.webp" id="iletisim" />
    </>
  );
}
