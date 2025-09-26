import { NextResponse } from "next/server";

const BACKEND =
  process.env.BLOG_BACKEND ?? "https://www.salihkaankoc.net/nata-core";

// keep slugify in sync with [slug]/route.ts
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

// clean inline styles & span tags from CMS HTML (same helper you used)
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Fetch list from your backend
    const res = await fetch(`${BACKEND}/blog`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { message: `Upstream ${res.status}` },
        { status: res.status }
      );
    }

    const raw = await res.json();
    const list: any[] = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];

    // Normalize for frontend
    const posts = list.map((post) => {
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
        // Optional: include cleaned short content if backend sends content
        content:
          typeof post.content === "string" ? cleanHtml(post.content) : undefined,
      };
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
