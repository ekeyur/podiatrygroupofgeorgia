import { getBlogPosts } from "@/lib/api";
import BlogPostsGrid from "@/components/blog/BlogPostsGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Foot health tips, treatment insights, and news from the Podiatry Group of Georgia.",
};

export default async function BlogPage() {
  const { posts, pageInfo } = await getBlogPosts();

  return (
    <>
      <section className="bg-cream-50 py-14 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 mb-3">
            Blog
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-950 max-w-3xl">
            Health Tips & Insights
          </h1>
          <p className="mt-4 text-lg text-brand-700 font-body max-w-xl">
            Stay informed about foot and ankle health with articles from our
            expert podiatrists.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <BlogPostsGrid initialPosts={posts} pageInfo={pageInfo} />
        </div>
      </section>
    </>
  );
}
