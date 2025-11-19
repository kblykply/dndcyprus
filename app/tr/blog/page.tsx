import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "../../../lib/blog";

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
    <main className="min-h-svh bg-white text-black">
      {/* hero */}
   

      {/* grid */}
      <section className="mx-auto max-w-[1450px] px-5 md:px-8 py-10 md:py-14">
        {posts.length === 0 ? (
          <div className="text-black/60">Şu an için blog yazısı bulunamadı.</div>
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
      href={`/blog/${post.slug}`}
      className="h-full flex flex-col overflow-hidden rounded-2xl border border-black/10
                 bg-white/70 backdrop-blur-xl shadow transition hover:shadow-lg"
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
      <div className="flex-1 p-4 flex flex-col">
        <div className="text-xs text-black/60">
          {date}
          {post.readTime ? ` • ${post.readTime} dk` : ""}
          {post.author ? ` • ${post.author}` : ""}
        </div>

        {/* Reserve space for 2 lines so rows align */}
        <h2 className="mt-2 text-lg font-semibold line-clamp-2 min-h-[3.2rem]">
          {post.title}
        </h2>

        {post.excerpt ? (
          <p className="mt-1 text-sm text-black/70 line-clamp-2">
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

