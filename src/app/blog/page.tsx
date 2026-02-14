import { getBlogPosts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { formatDate, stripHtml, truncate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Foot health tips, treatment insights, and news from the Podiatry Group of Georgia.",
};

export default async function BlogPage() {
  const { posts } = await getBlogPosts();

  return (
    <>
      <section className="bg-brand-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
            Blog
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            Health Tips & Insights
          </h1>
          <p className="mt-4 text-lg text-white/50 font-body max-w-xl">
            Stay informed about foot and ankle health with articles from our
            expert podiatrists.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-brand-100/50 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-500 hover:-translate-y-1"
                >
                  {post.featuredImage?.node?.sourceUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-brand-500 font-semibold mb-3">
                      {post.categories?.nodes[0] && (
                        <span className="uppercase tracking-wider">
                          {post.categories.nodes[0].name}
                        </span>
                      )}
                      <span className="text-brand-300">·</span>
                      <span className="text-brand-400">
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <h2 className="font-display text-lg font-bold text-brand-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-brand-700/50 text-sm font-body line-clamp-3">
                      {truncate(stripHtml(post.excerpt), 150)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-brand-700/50 text-lg font-body">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
