  // app/components/NewsBlogSection.tsx
  import NewsBlogListClient from "./NewsBlogListClient";
  import { BLOG_POSTS } from "../../lib/blog";

  export type BlogPost = {
    id?: string | number;
    slug?: string;
    title: string;
    excerpt?: string;
    cover?: string;
    date?: string;      // ISO string
    readTime?: number;
    tags?: string[];
    content?: string;   // if you store HTML




    category?: string;
    author?: string;
  };

  export const dynamic = "force-static";

  export default function NewsBlogSection() {
    // Guard & robust sort (handles missing/invalid dates)
    const posts = [...(BLOG_POSTS ?? [])].sort((a, b) => {
      const da = a?.date ? Date.parse(a.date) : 0;
      const db = b?.date ? Date.parse(b.date) : 0;
      return db - da;
    });

    return (
      <div className="relative"> 
        {/* no extra paddings: let the client component be full-bleed */}
        <NewsBlogListClient
          initialPosts={posts}
          pageSize={6}
          placeholderImage="/Perla II - 2.png"
          showLoadMore
          title="Haberler"
          subtitle="Projelerimiz, bölgeler ve dijital satış deneyimleri üzerine güncel haberler."
        />
      </div>
    );
  }
