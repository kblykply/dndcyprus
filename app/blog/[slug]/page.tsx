import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "../../../lib/blog";

export const dynamic = "force-static"; // can be static now

function isHttpUrl(src?: string) {
  return !!src && (src.startsWith("http://") || src.startsWith("https://"));
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
  const meta =
    [date ? new Date(date).toLocaleDateString() : "", author ? ` • ${author}` : ""]
      .join("");

  return (
    <main className="min-h-svh bg-white text-black">
      {/* Header */}
      <section className="border-b border-black/10 bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black">
            ← Blog
          </Link>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
          {meta ? <div className="mt-3 text-sm text-black/60">{meta}</div> : null}
        </div>
      </section>

      {/* Cover */}
      {cover ? (
        <section className="mx-auto max-w-[1200px] px-5 md:px-8 pt-10">
          <div className="relative aspect-[16/7] overflow-hidden rounded-3xl border border-black/10 shadow-2xl bg-white">
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover"
              unoptimized={isHttpUrl(cover)}
              priority
            />
          </div>
        </section>
      ) : null}

      {/* Content */}
      <section className="mx-auto max-w-[1200px] px-5 md:px-8 py-14">
        <article
          className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-black prose-p:text黑/80 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-strong:text-black prose-blockquote:border-l-blue-400 prose-blockquote:text-black/70 prose-li:marker:text-blue-500"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>
    </main>
  );
}
