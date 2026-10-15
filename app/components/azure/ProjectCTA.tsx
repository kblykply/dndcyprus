import ContactCard from "./ContactCard";
import { PROJECT_PAGES, type ProjectPage } from "@/lib/azure/projects";
import type { Locale } from "@/lib/azure/site";

const T: Record<Locale, { kicker: string; title: React.ReactNode }> = {
  tr: { kicker: "Satış ofisi", title: <>Fiyat ve <b>kat planı alın.</b></> },
  en: { kicker: "Sales office", title: <>Prices and <b>floor plans.</b></> },
  de: { kicker: "Verkaufsbüro", title: <>Preise und <b>Grundrisse.</b></> },
  ru: { kicker: "Офис продаж", title: <>Цены и <b>планировки.</b></> },
  pl: { kicker: "Biuro sprzedaży", title: <>Ceny i <b>plany mieszkań.</b></> },
};

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
      kicker={`${T[locale].kicker} · ${p.name}`}
      title={T[locale].title}
      lead={p.ctaLead[locale]}
      highlights={p.highlights[locale]}
      showOffices={false}
      brochureHref={p.brochure?.[locale] && !p.brochure[locale]!.startsWith("#") ? p.brochure[locale] : undefined}
    />
  );
}
