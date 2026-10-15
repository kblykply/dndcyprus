import PageHero from "@/app/components/azure/PageHero";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/blog",
  title: "Blog | Haberler, Ödüller ve Röportajlar – DND Cyprus",
  description:
    "DND Cyprus blogu: PropertyNC ödülleri, Ozan Dökmecioğlu röportajları, DND Homes büyüme planı ve Kuzey Kıbrıs gayrimenkul dünyasından güncel haberler.",
  singleLanguage: true,
});

export const dynamic = "force-static"; // no runtime fetch needed

function isHttpUrl(src?: string) {
  return !!src && (src.startsWith("http://") || src.startsWith("https://"));
}

type BlogPost = {
  slug: string;
  title: string;
  date?: string;
  cover?: string;
  readTime?: number;
  author?: string;
  excerpt?: string;
};

export default function BlogIndex() {
  // sort newest first
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-svh">
      <PageHero size="short" kicker="DND Cyprus" title={<>Yazılar</>} lead="Röportajlar, ödüller ve etkinliklerden notlar." image="/azure/p1-3.jpg" />
      {/* hero */}
   

      {/* grid */}
      <section className="mx-auto max-w-[1450px] px-5 md:px-8 py-10 md:py-14">
        {posts.length === 0 ? (
          <div className="text-[var(--ink-60)]">Şu an için blog yazısı bulunamadı.</div>
        ) : (
         // ...inside your list:
<ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {posts.map((p) => (
    <li key={p.slug} className="h-full">
      <Card post={p} />
    </li>
  ))}
</ul>

        )}
      </section>
    </main>
  );
}

/* --- components --- */
function Card({ post }: { post: BlogPost }) {
  const date = post.date ? new Date(post.date).toLocaleDateString() : "";

  return (
    <Link
      href={`/tr/blog/${post.slug}`}
      className="group h-full flex flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white shadow-[0_10px_40px_rgba(13,35,38,0.06)] transition hover:shadow-[0_30px_70px_rgba(13,35,38,0.14)]"
    >
      {/* Thumb keeps ratio but doesn't affect height growth */}
      <div className="relative aspect-[16/10] shrink-0">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized={isHttpUrl(post.cover)}
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-xs text-black/40">
            No cover
          </div>
        )}
      </div>

      {/* Content grows to fill remaining height */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--sea)]">
          {date}
          {post.readTime ? ` • ${post.readTime} dk` : ""}
          {post.author ? ` • ${post.author}` : ""}
        </div>

        {/* Reserve space for 2 lines so rows align */}
        <h2 className="mt-2 text-[20px] leading-snug line-clamp-2 min-h-[2.6rem]">
          {post.title}
        </h2>

        {post.excerpt ? (
          <p className="mt-1 text-sm text-[var(--ink-60)] line-clamp-2">
            {post.excerpt}
          </p>
        ) : null}

        {/* If you later add a footer (tags/CTA), push it down:
        <div className="mt-auto pt-3">...</div>
        */}
      </div>
    </Link>
  );
}

