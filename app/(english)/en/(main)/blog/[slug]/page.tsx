import type { Metadata } from "next";
import { BlogPostPage, blogPostMetadata, blogStaticParams } from "@/app/components/azure/blog/Blog";

// DND'den Haberler — yazı. Yazılar panelden (lib/content/store); bilinmeyen adres 404 döner.
export const dynamic = "force-static";
export const dynamicParams = true; // panelden eklenen yeni yazı ilk ziyarette üretilir
export const generateStaticParams = blogStaticParams;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return blogPostMetadata("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <BlogPostPage locale="en" slug={(await params).slug} />;
}
