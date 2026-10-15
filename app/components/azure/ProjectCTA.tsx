import ContactCard from "./ContactCard";
import { PROJECT_PAGES, type ProjectPage } from "@/lib/azure/projects";
import type { Locale } from "@/lib/azure/site";

// Proje sayfası sonu: fiyat / kat planı talep formu (reklam kampanyalarının ana dönüşümü, form="lead")
export default function ProjectCTA({ slug, locale }: { slug: ProjectPage["slug"]; locale: Locale }) {
  const p = PROJECT_PAGES[slug];
  return (
    <ContactCard
      locale={locale}
      mode="lead"
      id="fiyat-al"
      project={slug}
      projectName={p.name}
      unitTypes={p.unitTypes[locale]}
      image={p.ctaImage}
      kicker={`${locale === "tr" ? "Satış ofisi" : "Sales office"} · ${p.name}`}
      title={locale === "tr" ? <>Fiyat ve <b>kat planı alın.</b></> : <>Prices and <b>floor plans.</b></>}
      lead={p.ctaLead[locale]}
      highlights={p.highlights[locale]}
      showOffices={false}
      brochureHref={p.brochure?.[locale] && !p.brochure[locale]!.startsWith("#") ? p.brochure[locale] : undefined}
    />
  );
}
