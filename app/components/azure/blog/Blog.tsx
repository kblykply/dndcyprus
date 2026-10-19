import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/app/components/azure/PageHero";
import JsonLd from "@/app/components/seo/JsonLd";
import { blogPosts, BLOG_POSTS, type BlogPost } from "@/lib/blog";
import { NAV_TEXT } from "@/lib/azure/nav";
import { href, type Locale } from "@/lib/azure/site";
import { pageMetadata } from "@/lib/seo";
import { blogPostingJsonLd } from "@/lib/structured-data";

// "DND'den Haberler" (blog): 5 dilde aynı yazılar (çeviriler lib/blog-i18n.ts). Liste ve yazı sayfası her dilin
// rotasında bu bileşenlerle kurulur.

const DATE_LOCALE: Record<Locale, string> = { tr: "tr-TR", en: "en-GB", de: "de-DE", ru: "ru-RU", pl: "pl-PL" };
const fmt = (iso: string, locale: Locale) => new Intl.DateTimeFormat(DATE_LOCALE[locale], { year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));
const isHttpUrl = (src?: string) => !!src && (src.startsWith("http://") || src.startsWith("https://"));

const UI: Record<Locale, { lead: string; empty: string; back: string; others: string; all: string; metaTitle: string; metaDesc: string }> = {
  tr: { lead: "Röportajlar, ödüller ve etkinliklerden notlar.", empty: "Şu an için yazı bulunamadı.", back: "DND’den Haberler", others: "Diğer yazılar", all: "Tümünü gör", metaTitle: "DND’den Haberler | Röportajlar, Ödüller ve Etkinlikler – DND Cyprus", metaDesc: "DND Cyprus’tan haberler: PropertyNC ödülleri, Ozan Dökmecioğlu röportajları, DND Homes büyüme planı ve Kuzey Kıbrıs gayrimenkul dünyasından güncel gelişmeler." },
  en: { lead: "Notes from interviews, awards and events.", empty: "No posts yet.", back: "News from DND", others: "More posts", all: "See all", metaTitle: "News from DND | Interviews, Awards and Events – DND Cyprus", metaDesc: "News from DND Cyprus: PropertyNC awards, interviews with Ozan Dökmecioğlu, the DND Homes growth plan and the latest from the North Cyprus property market." },
  de: { lead: "Notizen zu Interviews, Auszeichnungen und Veranstaltungen.", empty: "Noch keine Beiträge.", back: "Neues von DND", others: "Weitere Beiträge", all: "Alle ansehen", metaTitle: "Neues von DND | Interviews, Auszeichnungen und Events – DND Cyprus", metaDesc: "Neues von DND Cyprus: PropertyNC-Auszeichnungen, Interviews mit Ozan Dökmecioğlu, der Wachstumsplan von DND Homes und Aktuelles vom Immobilienmarkt Nordzyperns." },
  ru: { lead: "Интервью, награды и события.", empty: "Пока нет публикаций.", back: "Новости DND", others: "Другие публикации", all: "Смотреть все", metaTitle: "Новости DND | Интервью, награды и события – DND Cyprus", metaDesc: "Новости DND Cyprus: награды PropertyNC, интервью с Озаном Докмеджиоглу, план роста DND Homes и актуальное с рынка недвижимости Северного Кипра." },
  pl: { lead: "Wywiady, nagrody i wydarzenia.", empty: "Brak wpisów.", back: "Wiadomości od DND", others: "Inne wpisy", all: "Zobacz wszystkie", metaTitle: "Wiadomości od DND | Wywiady, nagrody i wydarzenia – DND Cyprus", metaDesc: "Wiadomości od DND Cyprus: nagrody PropertyNC, wywiady z Ozanem Dökmecioğlu, plan rozwoju DND Homes i nowości z rynku nieruchomości Cypru Północnego." },
};

const sorted = (posts: BlogPost[]) => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const metaLine = (p: BlogPost, locale: Locale) => [p.date ? fmt(p.date, locale) : "", p.author ?? ""].filter(Boolean).join(" • ");

export function blogIndexMetadata(locale: Locale): Metadata {
  const t = UI[locale];
  return pageMetadata({ locale, path: "/blog", title: t.metaTitle, description: t.metaDesc });
}

export function BlogIndex({ locale }: { locale: Locale }) {
  const t = UI[locale];
  const posts = sorted(blogPosts(locale));
  return (
    <main className="min-h-svh">
      <PageHero size="short" kicker={NAV_TEXT[locale].news} title={<>{NAV_TEXT[locale].dndNews}</>} lead={t.lead} image="/azure/p1-3.jpg" />
      <section className="mx-auto max-w-[1450px] px-5 md:px-8 py-10 md:py-14">
        {posts.length === 0 ? (
          <div className="text-[var(--ink-60)]">{t.empty}</div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug} className="h-full">
                <Link href={href(locale, `/blog/${p.slug}`)} prefetch={false}
                  className="group h-full flex flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white shadow-[0_10px_40px_rgba(13,35,38,0.06)] transition hover:shadow-[0_30px_70px_rgba(13,35,38,0.14)]">
                  <div className="relative aspect-[16/10] shrink-0">
                    {p.cover ? <Image src={p.cover} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" unoptimized={isHttpUrl(p.cover)} sizes="(min-width:1024px) 460px, (min-width:640px) 50vw, 100vw" /> : null}
                  </div>
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--sea)]">{metaLine(p, locale)}</div>
                    <h2 className="mt-2 text-[20px] leading-snug line-clamp-2 min-h-[2.6rem]">{p.title}</h2>
                    {p.excerpt ? <p className="mt-1 text-sm text-[var(--ink-60)] line-clamp-2">{p.excerpt}</p> : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export const blogStaticParams = () => BLOG_POSTS.map((p) => ({ slug: p.slug }));

/** Özet 120 karakterden kısaysa yazının ilk cümleleriyle ~155 karaktere tamamlanır */
function blogDescription(excerpt: string, html: string) {
  const base = (excerpt || "").trim();
  if (base.length >= 120) return base;
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const combined = base && !text.startsWith(base) ? `${base} ${text}` : text || base;
  if (combined.length <= 158) return combined;
  const cut = combined.slice(0, 155);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function blogPostMetadata(locale: Locale, slug: string): Metadata {
  const post = blogPosts(locale).find((p) => p.slug === slug);
  if (!post) notFound();
  const title = post.title.includes("DND") ? post.title : `${post.title} | DND Cyprus`;
  const meta = pageMetadata({ locale, path: `/blog/${post.slug}`, title, description: blogDescription(post.excerpt, post.content) });
  // kapak 1200×630 olmadığından boyut verilmez; yazı "article" olarak işaretlenir
  const cover = post.cover && !isHttpUrl(post.cover) ? post.cover : undefined;
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date, ...(cover ? { images: [{ url: cover, alt: post.title }] } : {}) },
    twitter: { ...meta.twitter, ...(cover ? { images: [cover] } : {}) },
  };
}

export function BlogPostPage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = UI[locale];
  const posts = blogPosts(locale);
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const { title, cover, content } = post;
  const meta = metaLine(post, locale);
  const others = sorted(posts.filter((p) => p.slug !== slug)).slice(0, 3);
  return (
    <main className="min-h-svh pt-24 md:pt-28" lang={locale}>
      <JsonLd data={blogPostingJsonLd(post, locale)} />
      <section>
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-10">
          <Link href={href(locale, "/blog")} className="az-btn glass sm" prefetch={false}>← {t.back}</Link>
          <h1 className="mt-6 text-4xl md:text-[44px] md:leading-[1.1] max-w-[34ch] [text-wrap:balance]">{title}</h1>
          {meta ? <div className="mt-3 text-sm text-[var(--ink-60)]">{meta}</div> : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-14">
        {cover ? (
          <div className="md:hidden mb-8 rounded-[28px] overflow-hidden border border-white/90 shadow-[0_20px_60px_rgba(13,35,38,0.14)] bg-white">
            <div className="relative aspect-[16/9]">
              <Image src={cover} alt={title} fill className="object-cover" priority unoptimized={isHttpUrl(cover)} sizes="100vw" />
            </div>
          </div>
        ) : null}
        <div className='relative after:content-[""] after:block after:clear-both'>
          {cover ? (
            <figure className={[
              "hidden md:block float-right relative",
              "w-[min(42%,460px)] h-[520px] ml-8 mb-6",
              "rounded-[28px] overflow-hidden border border-white/90 shadow-[0_20px_60px_rgba(13,35,38,0.14)] bg-white",
              "[shape-outside:polygon(0_0,100%_0,85%_100%,0_100%)]",
              "[clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]",
              "[shape-margin:16px]",
            ].join(" ")}>
              <Image src={cover} alt={title} fill className="object-cover" priority unoptimized={isHttpUrl(cover)} sizes="(min-width: 768px) 460px, 100vw" />
            </figure>
          ) : null}
          <article
            className={[
              "prose prose-lg md:prose-xl max-w-none",
              "[text-align:justify] hyphens-auto antialiased leading-relaxed",
              "prose-headings:text-[var(--ink)]",
              "prose-p:text-[var(--ink)]/80 prose-strong:text-[var(--ink)]",
              "prose-a:underline hover:prose-a:opacity-80 prose-a:decoration-1",
              "prose-blockquote:border-l-[var(--aqua)] prose-blockquote:text-[var(--ink-60)]",
              "prose-li:marker:text-[var(--sea)]",
              "prose-img:rounded-2xl",
              "first:[&>p]:first-letter:text-6xl first:[&>p]:first-letter:font-medium first:[&>p]:first-letter:text-[var(--sea)]",
              "first:[&>p]:first-letter:float-left first:[&>p]:first-letter:leading-[0.8]",
              "first:[&>p]:first-letter:mr-2 first:[&>p]:first-letter:mt-1",
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-[var(--line)]">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl">{t.others}</h2>
              <Link href={href(locale, "/blog")} className="az-btn glass sm" prefetch={false}>{t.all}</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((p) => (
                <Link key={p.slug} href={href(locale, `/blog/${p.slug}`)} prefetch={false}
                  className="group block rounded-[22px] overflow-hidden border border-white/90 bg-white shadow-[0_10px_30px_rgba(13,35,38,0.05)] hover:shadow-[0_16px_40px_rgba(13,35,38,0.1)] transition-shadow">
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-black/[0.04] to-black/[0.08]">
                    {p.cover ? <Image src={p.cover} alt={p.title} fill className="object-cover" unoptimized={isHttpUrl(p.cover)} sizes="(min-width:1024px) 360px, (min-width:640px) 50vw, 100vw" /> : null}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base md:text-lg leading-snug group-hover:underline decoration-1">{p.title}</h3>
                    <p className="mt-2 text-xs md:text-sm text-[var(--ink-60)]">{metaLine(p, locale)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
