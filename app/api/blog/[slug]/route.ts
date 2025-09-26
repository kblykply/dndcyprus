import { NextResponse } from "next/server";

const BACKEND =
  process.env.BLOG_BACKEND ?? "https://www.salihkaankoc.net/nata-core";

function slugify(input: string) {
  return (input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function cleanHtml(html: string) {
  let out = html || "";
  out = out.replace(/ style="[^"]*"/gi, "");
  out = out.replace(/<\/?span[^>]*>/gi, "");
  out = out.replace(/(<br\s*\/?>\s*){2,}/gi, "</p><p>");
  if (!/<(p|ul|ol|h\d|img|blockquote|pre|figure)/i.test(out)) {
    out = `<p>${out}</p>`;
  }
  return out;
}

/* ---------- Types ---------- */
type RawPost = {
  id?: string | number;
  title?: string;
  name?: string;
  slug?: string;
  seoSlug?: string;
  permalink?: string;
  excerpt?: string;
  summary?: string;
  cover?: string;
  image?: string;
  category?: string;
  tags?: string[];
  published_at?: string;
  created_at?: string;
  readTime?: string;
  author?: string;
  content?: string;
};

type NormalizedPost = {
  id?: string | number;
  title: string;
  slug: string;
  excerpt: string;
  cover: string | null;
  category: string | null;
  tags: string[];
  date: string | null;
  readTime: string | null;
  author: string | null;
  content?: string;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/blog`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { message: `Upstream ${res.status}` },
        { status: res.status }
      );
    }

    const raw: unknown = await res.json();
    const list: RawPost[] = Array.isArray(raw)
      ? raw
      : Array.isArray((raw as { data?: RawPost[] })?.data)
      ? (raw as { data: RawPost[] }).data
      : [];

    const posts: NormalizedPost[] = list.map((post) => {
      const title = post.title ?? post.name ?? "";
      const slug =
        post.slug ??
        post.seoSlug ??
        post.permalink ??
        (title ? slugify(title) : String(post.id ?? ""));

      return {
        id: post.id,
        title,
        slug,
        excerpt: post.excerpt ?? post.summary ?? "",
        cover: post.cover ?? post.image ?? null,
        category: post.category ?? null,
        tags: post.tags ?? [],
        date: post.published_at ?? post.created_at ?? null,
        readTime: post.readTime ?? null,
        author: post.author ?? null,
        content: typeof post.content === "string" ? cleanHtml(post.content) : undefined,
      };
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
