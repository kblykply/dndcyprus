export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;
  date: string;
  author?: string;
  content: string; // HTML string
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "digital-twin-guide-2021",
    title: "DND Kıbrıs, PropertyNC 2025’te Üç Büyük Ödülün Sahibi Oldu",
    excerpt: "NATA Holding Türk futbolunun ana sponsoru oldu, işte detaylar...",
    cover: "/property_awards_2025-747.jpg",
    date: "2025-07-18",
    author: "Admin",
    content: `
      <p>NATA Holding, Türk futbolunun gelişimi için önemli bir adım attı.</p>
      <p>Bu sponsorluk ile birlikte birçok proje hayata geçecek.</p>
      <blockquote>“Futbola olan desteğimiz artarak sürecek.”</blockquote>
    `,
  },
  {
    slug: "digital-twin-guide-2025",
    title: "Digital Twins in Real Estate 2025",
    excerpt: "A practical guide to turning a marketing twin into a source of truth.",
    cover: "/Lagoon - 2.png",
    date: "2025-06-09",
    author: "Selin Kaya",
    content: `
      <p>Digital twins are no longer just showpieces. They are becoming...</p>
      <h2>What a working twin actually contains</h2>
      <ul>
        <li>Geometry & media</li>
        <li>Data contracts</li>
        <li>CRM integration</li>
      </ul>
    `,
  },
];
