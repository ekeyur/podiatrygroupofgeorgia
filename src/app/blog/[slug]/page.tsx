import { getPost, getPostSlugs } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.metaDesc,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-950 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-brand-300 hover:text-gold-400 font-medium transition-colors mb-8"
          >
            <ChevronLeft size={16} />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 text-sm mb-4">
            {post.categories?.nodes[0] && (
              <span className="px-3 py-1 bg-gold-400/15 text-gold-400 rounded-full font-semibold text-xs uppercase tracking-wider">
                {post.categories.nodes[0].name}
              </span>
            )}
            <span className="text-white/40">{formatDate(post.date)}</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          {post.author?.node && (
            <div className="mt-6 flex items-center gap-3">
              {post.author.node.avatar?.url && (
                <Image
                  src={post.author.node.avatar.url}
                  alt={post.author.node.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <span className="text-white/60 text-sm font-body">
                By {post.author.node.name}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Featured image */}
      {post.featuredImage?.node?.sourceUrl && (
        <div className="max-w-4xl mx-auto px-6 -mt-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </>
  );
}
