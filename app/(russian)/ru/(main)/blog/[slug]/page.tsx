import type { Metadata } from "next";
import { BlogPostPage, blogPostMetadata, blogStaticParams } from "@/app/components/azure/blog/Blog";

// DND'den Haberler — yazı. Yazılar lib/blog.ts'de sabit; bilinmeyen adres 404 döner.
export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = blogStaticParams;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return blogPostMetadata("ru", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <BlogPostPage locale="ru" slug={(await params).slug} />;
}
