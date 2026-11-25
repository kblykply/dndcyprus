// lib/content/store.ts
// Sitenin içerik okuma katmanı (yalnız sunucu): veritabanındaki değişiklikleri koddaki varsayılanla birleştirir.
// Veritabanı yoksa ya da hata verirse site koddaki içerikle aynen çalışır (derleme ortamı, yerel geliştirme, kesinti).
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { PAGES, type PagesCopy } from "@/lib/azure/pages";
import { PROJECT_PAGES, type ProjectPage } from "@/lib/azure/projects";
import type { ProjectContent } from "@/lib/azure/project-types";
import { CONTACT, FOOTER_COPY } from "@/lib/azure/site";
import type { BlogPost } from "@/lib/blog";
import { applyOverrides, type ContentLocale } from "./core";
import { SCOPES, projectScopeKey, type ProjectScopeContent, type ScopeKey } from "./scopes";
import { PRESS_DEFAULTS, pressItemFor, type PressRecord } from "./defaults/press";
import { TEAM_DEFAULTS, memberFor, type TeamRecord } from "./defaults/team";
import { EVENT_DEFAULTS, eventFor, type EventRecord } from "./defaults/events";
import { BLOG_DEFAULTS, postFor, type BlogRecord } from "./defaults/blog";

const hasDb = () => !!(process.env.DATABASE_URL || "").trim();

export const getOverrides = cache(async (scope: string, locale: string): Promise<Record<string, string>> => {
  if (!hasDb()) return {};
  try {
    const rows = await prisma.contentOverride.findMany({ where: { scope, locale }, select: { path: true, value: true } });
    return Object.fromEntries(rows.map((r) => [r.path, r.value]));
  } catch {
    return {};
  }
});

type ScopeContent<K extends ScopeKey> = ReturnType<(typeof SCOPES)[K]["build"]>;

export async function getScopeContent<K extends ScopeKey>(scope: K, locale: ContentLocale): Promise<ScopeContent<K>> {
  const base = SCOPES[scope].build(locale) as ScopeContent<K>;
  return applyOverrides(base, await getOverrides(scope, locale));
}

/* ---------------- Sayfa metinleri (lib/azure/pages.tsx biçiminde) ---------------- */

/** DND Ayrıcalığı, Ödeme, Haberler ve Hakkımızda bölümlerinin panel değişiklikleriyle birleşmiş metinleri */
export const getPages = cache(async (locale: ContentLocale): Promise<PagesCopy> => {
  const [av, pay, news, about, events] = await Promise.all([
    getScopeContent("ayricalik", locale),
    getScopeContent("odeme", locale),
    getScopeContent("haberler", locale),
    getScopeContent("hakkimizda", locale),
    getEvents(locale),
  ]);
  const b = PAGES[locale];
  return {
    ...b,
    advantage: { ...b.advantage, hero: av.hero, quality: av.quality, social: av.social, after: av.after, extra: av.extra },
    payment: { ...b.payment, hero: pay.hero, campaigns: pay.campaigns, rental: pay.rental, faqTitle: pay.sss.faqTitle, faqLead: pay.sss.faqLead },
    news: { ...b.news, blog: news.blog, press: news.basin },
    events: { ...b.events, ...news.etkinlik, items: events },
    about: { ...b.about, usa: about.usa, partner: about.partner, numbersTitle: about.rakamlar.title, numbersUsa: about.rakamlar.usa },
  };
});

/** Alt bilgi: kısa slogan, merkez ofis adresi ve çalışma saatleri */
export async function getFooter(locale: ContentLocale) {
  const c = await getScopeContent("iletisim", locale);
  return { copy: { ...FOOTER_COPY[locale], tagline: c.altbilgi.tagline }, address: c.altbilgi.address, hours: c.altbilgi.hours, contact: CONTACT };
}

/* ---------------- Proje sayfaları ---------------- */

/** Proje sayfası: sayfa başı/teklif formu (ProjectPage biçiminde, yalnız bu dil değişir) + bölüm verileri */
export const getProject = cache(async (slug: ProjectPage["slug"], locale: ContentLocale): Promise<{ page: ProjectPage; data: ProjectContent }> => {
  const c = (await getScopeContent(projectScopeKey(slug), locale)) as ProjectScopeContent;
  const p = PROJECT_PAGES[slug];
  const u = c.ust;
  const at = <T,>(rec: Record<string, T>, v: T) => ({ ...rec, [locale]: v }) as typeof rec;
  const page: ProjectPage = {
    ...p,
    image: u.image,
    ctaImage: u.ctaImage,
    tagline: at(p.tagline, u.tagline),
    status: at(p.status, u.status),
    location: at(p.location, u.location),
    delivery: at(p.delivery, u.delivery),
    award: p.award && u.award ? at(p.award, u.award) : p.award,
    chips: at(p.chips, u.chips),
    ctaLead: at(p.ctaLead, u.ctaLead),
    highlights: at(p.highlights, u.highlights),
    unitTypes: at(p.unitTypes, u.unitTypes),
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ust, ...data } = c;
  return { page, data: data as ProjectContent };
});

/* ---------------- Listeler ---------------- */

export type CollectionKey = "basin" | "ekip" | "etkinlik" | "haber";

/** Liste veritabanına hiç aktarılmadıysa null (site koddaki listeyi kullanır) */
export const getCollectionRows = cache(async (collection: CollectionKey) => {
  if (!hasDb()) return null;
  try {
    const rows = await prisma.contentItem.findMany({ where: { collection }, orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
    return rows.length ? rows : null;
  } catch {
    return null;
  }
});

export async function getPress(locale: ContentLocale) {
  const rows = await getCollectionRows("basin");
  const records = rows ? rows.filter((r) => r.published).map((r) => r.data as unknown as PressRecord) : PRESS_DEFAULTS;
  return records.map((r) => pressItemFor(r, locale));
}

export async function getTeam(locale: ContentLocale) {
  const rows = await getCollectionRows("ekip");
  const records = rows ? rows.filter((r) => r.published).map((r, i) => ({ ...(r.data as unknown as TeamRecord), sortOrder: i + 1 })) : TEAM_DEFAULTS;
  return records.map((r) => memberFor(r, locale));
}

export async function getEvents(locale: ContentLocale) {
  const rows = await getCollectionRows("etkinlik");
  const records = rows ? rows.filter((r) => r.published).map((r) => r.data as unknown as EventRecord) : EVENT_DEFAULTS;
  return records.map((r) => eventFor(r, locale));
}

/** DND'den Haberler: yayındaki yazılar (sıralama sayfada tarihe göre yapılır) */
export async function getBlogPosts(locale: ContentLocale): Promise<BlogPost[]> {
  const rows = await getCollectionRows("haber");
  const records = rows ? rows.filter((r) => r.published).map((r) => r.data as unknown as BlogRecord) : BLOG_DEFAULTS;
  return records.map((r) => postFor(r, locale));
}
