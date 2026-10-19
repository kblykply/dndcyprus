import { BlogIndex, blogIndexMetadata } from "@/app/components/azure/blog/Blog";

// DND'den Haberler — liste (bileşen: app/components/azure/blog/Blog.tsx, çeviriler lib/blog-i18n.ts)
export const dynamic = "force-static";
export const metadata = blogIndexMetadata("tr");

export default function Page() {
  return <BlogIndex locale="tr" />;
}
