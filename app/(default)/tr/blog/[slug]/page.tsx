import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { blogPostingJsonLd } from "@/lib/structured-data";
import JsonLd from "@/app/components/seo/JsonLd";

export const dynamic = "force-static";
// Posts are local source data; unknown slugs must return 404 before streaming.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

function isHttpUrl(src?: string) {
  return !!src && (src.startsWith("http://") || src.startsWith("https://"));
}

type BlogPageProps = { params: Promise<{ slug: string }> };

// Yazı verisi lib/blog.ts içinde sabit; ağ çağrısı yok
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const title = post.title.includes("DND") ? post.title : `${post.title} | DND Cyprus`;
  const meta = pageMetadata({
    locale: "tr",
    path: `/blog/${post.slug}`,
    title,
    description: blogDescription(post.excerpt, post.content),
    singleLanguage: true,
  });

  // Kapak 1200×630 olmadığından boyut verilmez; yazı "article" olarak işaretlenir
  const cover = post.cover && !isHttpUrl(post.cover) ? post.cover : undefined;
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.date,
      ...(cover ? { images: [{ url: cover, alt: post.title }] } : {}),
    },
    twitter: {
      ...meta.twitter,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

export default async function BlogDetail({ params }: BlogPageProps) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const { title, cover, date, author, content } = post;
  const meta = [
    date ? new Date(date).toLocaleDateString() : "",
    author ? ` • ${author}` : "",
  ].join("");

  // --- Other posts (exclude current, sort by date desc, take 3)
  const others = BLOG_POSTS
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const ad = a?.date ? new Date(a.date).getTime() : 0;
      const bd = b?.date ? new Date(b.date).getTime() : 0;
      return bd - ad;
    })
    .slice(0, 3);

  return (
    <main className="min-h-svh pt-24 md:pt-28">
      <JsonLd data={blogPostingJsonLd(post)} />
      {/* Header */}
      <section className="">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-10">
          <Link
            href="/tr/blog"
            className="az-btn glass sm"
          >
            ← Blog
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl max-w-[22ch]">
            {title}
          </h1>
          {meta ? <div className="mt-3 text-sm text-[var(--ink-60)]">{meta}</div> : null}
        </div>
      </section>

      {/* Content (magazine layout) */}
      <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-14">
        {/* Mobile cover (normal block) */}
        {cover ? (
          <div className="md:hidden mb-8 rounded-[28px] overflow-hidden border border-white/90 shadow-[0_20px_60px_rgba(13,35,38,0.14)] bg-white">
            <div className="relative aspect-[16/9]">
              <Image
                src={cover}
                alt={title}
                fill
                className="object-cover"
                priority
                unoptimized={isHttpUrl(cover)}
                sizes="100vw"
              />
            </div>
          </div>
        ) : null}

        <div className='relative after:content-[""] after:block after:clear-both'>
          {/* Desktop cover (irregular wrap) */}
          {cover ? (
            <figure
              className={[
                "hidden md:block float-right relative",
                "w-[min(42%,460px)] h-[520px] ml-8 mb-6",
                "rounded-[28px] overflow-hidden border border-white/90 shadow-[0_20px_60px_rgba(13,35,38,0.14)] bg-white",
                // Irregular wrap (Chromium/Safari; Firefox falls back)
                "[shape-outside:polygon(0_0,100%_0,85%_100%,0_100%)]",
                "[clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]",
                "[shape-margin:16px]",
              ].join(" ")}
            >
              <Image
                src={cover}
                alt={title}
                fill
                className="object-cover"
                priority
                unoptimized={isHttpUrl(cover)}
                sizes="(min-width: 768px) 460px, 100vw"
              />
            </figure>
          ) : null}

          <article
            className={[
              "prose prose-lg md:prose-xl max-w-none",
              // Readability
              "[text-align:justify] hyphens-auto antialiased leading-relaxed",
              "prose-headings:text-[var(--ink)]",
              "prose-p:text-[var(--ink)]/80 prose-strong:text-[var(--ink)]",
              "prose-a:underline hover:prose-a:opacity-80 prose-a:decoration-1",
              "prose-blockquote:border-l-[var(--aqua)] prose-blockquote:text-[var(--ink-60)]",
              "prose-li:marker:text-[var(--sea)]",
              "prose-img:rounded-2xl",
              // Subtle drop cap for the first paragraph
              "first:[&>p]:first-letter:text-6xl first:[&>p]:first-letter:font-medium first:[&>p]:first-letter:text-[var(--sea)]",
              "first:[&>p]:first-letter:float-left first:[&>p]:first-letter:leading-[0.8]",
              "first:[&>p]:first-letter:mr-2 first:[&>p]:first-letter:mt-1",
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      {/* Other posts */}
      {others.length > 0 && (
        <section className="border-t border-[var(--line)]">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl">Diğer yazılar</h2>
              <Link
                href="/tr/blog"
                className="az-btn glass sm"
              >
                Tümünü gör
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((p) => {
                const info = [
                  p.date ? new Date(p.date).toLocaleDateString() : "",
                  p.author ? ` • ${p.author}` : "",
                ].join("");

                return (
                  <Link
                    key={p.slug}
                    href={`/tr/blog/${p.slug}`}
                    className="group block rounded-[22px] overflow-hidden border border-white/90 bg-white shadow-[0_10px_30px_rgba(13,35,38,0.05)] hover:shadow-[0_16px_40px_rgba(13,35,38,0.1)] transition-shadow"
                  >
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-black/[0.04] to-black/[0.08]">
                      {p.cover ? (
                        <Image
                          src={p.cover}
                          alt={p.title}
                          fill
                          className="object-cover"
                          unoptimized={isHttpUrl(p.cover)}
                          sizes="(min-width:1024px) 360px, (min-width:640px) 50vw, 100vw"
                        />
                      ) : null}
                    </div>
                    <div className="p-5">
                      <h3 className="text-base md:text-lg leading-snug group-hover:underline decoration-1">
                        {p.title}
                      </h3>
                      {info ? (
                        <p className="mt-2 text-xs md:text-sm text-[var(--ink-60)]">
                          {info}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

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
