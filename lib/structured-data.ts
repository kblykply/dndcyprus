import type { Locale } from "./azure/site";
import type { BlogPost } from "./blog";
import { SITE_NAME, SITE_URL } from "./seo";

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "CY-DND HOMES LTD.",
  description: "Property developer in North Cyprus (İskele and Famagusta); the North Cyprus company of DND Homes, founded in Boston in 2017.",
  // Yapay zekâ ve arama motorları şirketi ana şirketle ve ödülleriyle tek kayıt olarak eşleştirsin
  parentOrganization: { "@type": "Organization", name: "DND Homes", address: { "@type": "PostalAddress", addressLocality: "Boston", addressCountry: "US" } },
  areaServed: ["İskele", "Gazimağusa (Famagusta)", "North Cyprus"],
  award: [
    "PropertyNC Awards 2025 – Best Newcomer (Gold)",
    "PropertyNC Awards 2025 – Gold Award: Lagoon Verde",
    "PropertyNC Awards 2025 – Platinum Award: Mariachi Beach Club",
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/DND.png`,
  email: "info@dndcyprus.com",
  telephone: "+90 392 444 03 63",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya",
    addressLocality: "Gazimağusa",
    postalCode: "99450",
    addressCountry: "CY",
  },
  sameAs: [
    "https://cy.linkedin.com/company/dndcyprus",
    "https://www.instagram.com/dndcyprus/",
    "https://www.facebook.com/dndcyprus/",
    "https://www.youtube.com/@dndcyprus",
  ],
};

export function blogPostingJsonLd(post: BlogPost, locale: Locale = "tr") {
  const url = `${SITE_URL}/${locale}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.excerpt,
    inLanguage: locale,
    ...(post.cover ? { image: [new URL(post.cover, SITE_URL).href] } : {}),
    datePublished: post.date,
    // Current bylines ("Admin", "Basın Bülteni") do not identify a person.
    // Omit optional author/dateModified instead of inventing an identity/date.
    publisher: { "@id": ORGANIZATION_JSON_LD["@id"] },
  };
}

// Ana sayfadaki S.S.S. sayfada görünür olduğu için FAQPage olarak işaretlenir; yapay zekâ cevapları doğrudan buradan okuyabilsin
export function faqPageJsonLd(items: { q: string; a: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/${locale}#faq`,
    inLanguage: locale,
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

// A title containing </script> must remain data when embedded in an HTML script.
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
