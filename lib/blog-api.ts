import { absUrl } from "../lib/abs-url";

/** Minimal shape we rely on when locating a post by slug/id */
export type Post = {
  slug?: string;
  seoSlug?: string;
  id?: string | number;
  // Allow additional fields without losing type-safety on the keys we use:
  [key: string]: unknown;
};

/** Narrowing helpers */
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
function isPost(value: unknown): value is Post {
  if (!isObject(value)) return false;
  // We only need these keys to be string/number if they exist.
  const { slug, seoSlug, id } = value as Record<string, unknown>;
  const idOk =
    id === undefined ||
    typeof id === "string" ||
    typeof id === "number";
  const slugOk = slug === undefined || typeof slug === "string";
  const seoSlugOk = seoSlug === undefined || typeof seoSlug === "string";
  return idOk && slugOk && seoSlugOk;
}
function isPostArray(value: unknown): value is Post[] {
  return Array.isArray(value) && value.every(isPost);
}

/** Fetch JSON with no-store cache (server component safe) */
/** Fetch JSON with no-store cache (server component safe) */
async function fetchJson<T>(path: string): Promise<T> {
  // absUrl async olduğu için await gerekiyor
  const url = path.startsWith("http") ? path : await absUrl(path);

  const res = await fetch(url, { cache: "no-store", headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);

  return (await res.json()) as T;
}

/** Accepts: [ ... ], { data: [...] }, { posts: [...] } */
function normalizePosts(json: unknown): Post[] {
  if (isPostArray(json)) return json;

  if (isObject(json)) {
    const data = (json as Record<string, unknown>).data;
    if (isPostArray(data)) return data;

    const posts = (json as Record<string, unknown>).posts;
    if (isPostArray(posts)) return posts;
  }

  // Fallback: empty list if the shape isn't recognized
  return [];
}

/** GET /api/blog -> Post[] (normalized) */
export async function listPosts(): Promise<Post[]> {
  // Broadly typed here because the API may return one of several shapes.
  const json = await fetchJson<unknown>("/api/blog");
  return normalizePosts(json);
}

/** Try /api/blog/[slug]; else /api/blog then find by multiple keys */
export async function getPostBySlugServer(slug: string): Promise<Post | null> {
  // Try dedicated endpoint if you add it later
  try {
    const p = await fetchJson<unknown>(`/api/blog/${slug}`);
    if (isPost(p) && (p.slug || p.id !== undefined)) {
      return p;
    }
  } catch {
    // ignore; fall back to list
  }

  const all = await listPosts();

  const found =
    all.find((p) => typeof p.slug === "string" && p.slug === slug) ??
    all.find((p) => typeof p.seoSlug === "string" && p.seoSlug === slug) ??
    all.find((p) => (typeof p.id === "string" || typeof p.id === "number") && String(p.id) === slug) ??
    null;

  return found;
}
