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
    slug: "dnd-usa-quality-in-cyprus-interview-2025",
    title: "USA Quality in Cyprus: Ozan Dökmecioğlu ile Röportaj",
    excerpt: "PropertyNC ile yapılan söyleşide DND’nin vizyonu ve projeleri konuşuldu.",
    cover: "/ozanbeyrop.jpg",
    date: "2025-01-28",
    author: "Admin",
    content: `
      <p>PropertyNC’da yayımlanan röportajda, Ozan Dökmecioğlu DND Cyprus’un öne çıkan projelerini, şirketin kalitesini ve gelecek hedeflerini anlattı. :contentReference[oaicite:9]{index=9}</p>
      <p>Röportajda sürdürülebilirlik, kalite ve konfor temaları ön planda yer aldı. :contentReference[oaicite:10]{index=10}</p>
    `,
  },
  {
    slug: "dnd-cyprus-gold-award-propertync-2025",
    title: "DND Cyprus, 2025 PropertyNC Ödülleri’nde Altın Ödül Kazandı",
    excerpt: "Şirket ‘Best Newcomer’ kategorisinde ödüle layık görüldü.",
    cover: "/property_awards_2025-782.jpg",
    date: "2025-04-28",
    author: "Admin",
    content: `
      <p>DND Cyprus, 2025 PropertyNC Ödülleri’nde “Best Newcomer / En İyi Yeni Gelen” ödülünü kazandı. :contentReference[oaicite:11]{index=11}</p>
      <p>Bu başarı, şirketin Kıbrıs’taki hızlı yükselişinin bir göstergesi olarak yorumlanıyor. :contentReference[oaicite:12]{index=12}</p>
    `,
  },
  {
    slug: "dnd-cyprus-new-year-celebration-2023",
    title: "DND Cyprus, Yılbaşı Etkinliğiyle İş Ortaklarını Ağırladı",
    excerpt: "Şirket, iş ortaklarıyla birlikte yeni yılı kutladığı özel bir etkinlik düzenledi.",
    cover: "/dndwhoweare.jpg",
    date: "2023-12-11",
    author: "Admin",
    content: `
      <p>DND Cyprus, 11 Aralık 2023’te iş ortakları ile birlikte yeni yıl kutlaması gerçekleştirdi. :contentReference[oaicite:13]{index=13}</p>
      <p>Etkinlik, hem eğlence hem de network amaçlı bir buluşma olarak planlandı. :contentReference[oaicite:14]{index=14}</p>
    `,
  },

 
];
