import PageHero from "./PageHero";
import { PROJECT_PAGES, type ProjectPage } from "@/lib/azure/projects";
import type { Locale } from "@/lib/azure/site";

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
        { label: locale === "tr" ? "Fiyat ve kat planı iste" : "Request prices & floor plans", href: "#fiyat-al", track: "price_request_click" },
        ...(brochure ? [{ label: locale === "tr" ? "Broşür (PDF)" : "Brochure (PDF)", href: brochure, variant: "ghost" as const }] : []),
      ]}
    />
  );
}
