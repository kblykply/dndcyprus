// lib/content/scopes.ts
// Panelden düzenlenen sayfa metinleri: her "kapsam" koddaki içerikten bir nesne kurar; bölüm adları panelde görünür.
// Yalnız sitede gerçekten kullanılan alanlar alınır (ana sayfada görünmeyen eski bölümler listelenmez).
import { HOME } from "@/lib/azure/home";
import { HOME_FLOW } from "@/lib/azure/home-flow";
import type { ContentLocale } from "./core";

export type ScopeDef = {
  label: string;
  /** Sitede bu içeriğin göründüğü adresler (kaydedince yenilenir) */
  routes: (l: ContentLocale) => string[];
  /** Bölüm anahtarı → panelde görünen ad (sıra sitedeki sırayla aynı) */
  sections: [key: string, label: string][];
  build: (l: ContentLocale) => Record<string, unknown>;
};

function buildHome(l: ContentLocale) {
  const f = HOME_FLOW[l];
  const h = HOME[l];
  return {
    vitrin: f.hero,
    projeler: h.projects,
    neden: f.why,
    odeme: f.offers,
    yasam: f.life,
    gun: h.story,
    rakamlar: f.numbers,
    oduller: { kicker: f.news.kicker, awardsProject: f.news.awardsProject, homesProject: f.news.homesProject, strip: h.awards, kartlar: h.bento.awards },
    basin: h.press,
    sss: h.faq,
    iletisim: { ...f.contact, highlights: h.contact.highlights },
  };
}

export type HomeScopeContent = ReturnType<typeof buildHome>;

export const SCOPES = {
  anasayfa: {
    label: "Ana sayfa",
    routes: (l) => [`/${l}`],
    sections: [
      ["vitrin", "Vitrin (kayan proje yazıları)"],
      ["projeler", "Projelerimiz başlığı"],
      ["neden", "Neden DND Cyprus"],
      ["odeme", "Ödeme ve yatırım fırsatları"],
      ["yasam", "Yaşam ve ayrıcalıklar"],
      ["gun", "Lagoon Verde'de bir gün"],
      ["rakamlar", "Rakamlarla DND"],
      ["oduller", "Haberler ve ödüller"],
      ["basin", "Basın başlığı"],
      ["sss", "Sıkça sorulan sorular"],
      ["iletisim", "İletişim bölümü"],
    ],
    build: buildHome,
  },
} satisfies Record<string, ScopeDef>;

export type ScopeKey = keyof typeof SCOPES;
export const isScopeKey = (v: string): v is ScopeKey => v in SCOPES;
