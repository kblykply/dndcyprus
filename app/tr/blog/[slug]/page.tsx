import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "../../../../lib/blog";

export const dynamic = "force-static";

function isHttpUrl(src?: string) {
  return !!src && (src.startsWith("http://") || src.startsWith("https://"));
}

type BlogPageProps = { params: Promise<{ slug: string }> };

export default async function BlogDetail({ params }: BlogPageProps) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-svh flex items-center justify-center bg-white text-black">
        <p>Post not found</p>
      </main>
    );
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
    <main className="min-h-svh bg-white text-black">
      {/* Header */}
      <section className="border-b border-black/10 bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black"
          >
            ← Blog
          </Link>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          {meta ? <div className="mt-3 text-sm text-black/60">{meta}</div> : null}
        </div>
      </section>

      {/* Content (magazine layout) */}
      <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-14">
        {/* Mobile cover (normal block) */}
        {cover ? (
          <div className="md:hidden mb-8 rounded-3xl overflow-hidden border border-black/10 shadow-2xl bg-white">
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
                "rounded-3xl overflow-hidden border border-black/10 shadow-2xl bg-white",
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
              "prose-headings:font-semibold prose-headings:text-black",
              "prose-p:text-black/80 prose-strong:text-black",
              "prose-a:underline hover:prose-a:opacity-80 prose-a:decoration-1",
              "prose-blockquote:border-l-blue-400 prose-blockquote:text-black/70",
              "prose-li:marker:text-blue-500",
              "prose-img:rounded-2xl",
              // Subtle drop cap for the first paragraph
              "first:[&>p]:first-letter:text-6xl first:[&>p]:first-letter:font-bold",
              "first:[&>p]:first-letter:float-left first:[&>p]:first-letter:leading-[0.8]",
              "first:[&>p]:first-letter:mr-2 first:[&>p]:first-letter:mt-1",
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      {/* Other posts */}
      {others.length > 0 && (
        <section className="border-t border-black/10 bg-white">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold">Other posts</h2>
              <Link
                href="/blog"
                className="text-sm text-black/60 hover:text-black underline decoration-1"
              >
                View all
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
                    href={`/blog/${p.slug}`}
                    className="group block rounded-2xl overflow-hidden border border-black/10 bg-white hover:shadow-xl transition-shadow"
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
                      <h3 className="text-base md:text-lg font-semibold leading-snug group-hover:underline decoration-1">
                        {p.title}
                      </h3>
                      {info ? (
                        <p className="mt-2 text-xs md:text-sm text-black/60">
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
