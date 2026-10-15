import PageHero from "./PageHero";
import { PROJECT_PAGES, type ProjectPage } from "@/lib/azure/projects";
import type { Locale } from "@/lib/azure/site";

const CTA: Record<Locale, { price: string; brochure: string }> = {
  tr: { price: "Fiyat ve kat planı iste", brochure: "Broşür (PDF)" },
  en: { price: "Request prices & floor plans", brochure: "Brochure (PDF)" },
  de: { price: "Preise & Grundrisse anfordern", brochure: "Broschüre (PDF)" },
  ru: { price: "Запросить цены и планировки", brochure: "Брошюра (PDF)" },
  pl: { price: "Poproś o ceny i plany", brochure: "Broszura (PDF)" },
};

export default function ProjectHero({ slug, locale }: { slug: ProjectPage["slug"]; locale: Locale }) {
  const p = PROJECT_PAGES[slug];
  const brochure = p.brochure?.[locale];
  return (
    <PageHero
      size="full"
      kicker="DND Cyprus"
      title={p.name}
      lead={p.tagline[locale]}
      image={p.image}
      imageAlt={p.name}
      logo={p.logo}
      goldTag={p.award?.[locale]}
      tags={[p.status[locale], p.location[locale], p.delivery[locale]]}
      chips={p.chips[locale]}
      ctas={[
        { label: CTA[locale].price, href: "#fiyat-al", track: "price_request_click" },
        ...(brochure ? [{ label: CTA[locale].brochure, href: brochure, variant: "ghost" as const }] : []),
      ]}
    />
  );
}
