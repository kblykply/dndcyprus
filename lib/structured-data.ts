import type { BlogPost } from "./blog";
import { SITE_NAME, SITE_URL } from "./seo";

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "CY-DND HOMES LTD.",
  url: SITE_URL,
  logo: `${SITE_URL}/DND.png`,
  email: "info@dndcyprus.com",
  telephone: "+90 392 444 03 63",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alasya Park Sitesi 2. Etap, Dükkan No: 2/3, Gazi Mustafa Kemal Bulvarı, Sakarya",
    addressLocality: "Gazimağusa",
    addressCountry: "CY",
  },
  sameAs: [
    "https://cy.linkedin.com/company/dndcyprus",
    "https://www.instagram.com/dndcyprus/",
    "https://www.facebook.com/dndcyprus/",
    "https://www.youtube.com/@dndcyprus",
  ],
};

export function blogPostingJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/tr/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.excerpt,
    inLanguage: "tr",
    ...(post.cover ? { image: [new URL(post.cover, SITE_URL).href] } : {}),
    datePublished: post.date,
    // Current bylines ("Admin", "Basın Bülteni") do not identify a person.
    // Omit optional author/dateModified instead of inventing an identity/date.
    publisher: { "@id": ORGANIZATION_JSON_LD["@id"] },
  };
}

// A title containing </script> must remain data when embedded in an HTML script.
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
