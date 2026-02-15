"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { formatDate, stripHtml, truncate } from "@/lib/utils";
import type { Post } from "@/types/wordpress";
import type { WPRawPost } from "@/types/wordpress";

interface PageInfo {
  hasNextPage: boolean;
  totalPages: number;
  currentPage: number;
}

interface BlogPostsGridProps {
  initialPosts: Post[];
  pageInfo: PageInfo;
}

function transformRawPost(raw: WPRawPost): Post {
  const author = raw._embedded?.author?.[0];
  const categories = raw._embedded?.["wp:term"]?.[0] ?? [];
  const media = raw._embedded?.["wp:featuredmedia"]?.[0];

  return {
    title: raw.title.rendered,
    slug: raw.slug,
    content: raw.content.rendered,
    excerpt: raw.excerpt.rendered,
    date: raw.date,
    modified: raw.modified,
    featuredImage: media
      ? { node: { sourceUrl: media.source_url, altText: media.alt_text ?? "" } }
      : undefined,
    categories: {
      nodes: categories.map((c: any) => ({ name: c.name, slug: c.slug })),
    },
    author: {
      node: {
        name: author?.name ?? "",
        avatar: author?.avatar_urls
          ? { url: Object.values(author.avatar_urls).pop() as string }
          : undefined,
      },
    },
    seo: { title: "", metaDesc: "" },
  };
}

const PER_PAGE = 12;

export default function BlogPostsGrid({
  initialPosts,
  pageInfo,
}: BlogPostsGridProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(pageInfo.currentPage);
  const [hasMore, setHasMore] = useState(pageInfo.hasNextPage);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const nextPage = page + 1;
    const apiUrl = process.env.NEXT_PUBLIC_WP_API_URL;
    const url = `${apiUrl}/wp/v2/posts?per_page=${PER_PAGE}&page=${nextPage}&_embed=true`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const totalPages = parseInt(
        res.headers.get("X-WP-TotalPages") ?? "1",
        10
      );
      const raw: WPRawPost[] = await res.json();
      const newPosts = raw.map(transformRawPost);

      setPosts((prev) => [...prev, ...newPosts]);
      setPage(nextPage);
      setHasMore(totalPages > nextPage);
    } catch {
      // Stop trying on error
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-brand-600 text-lg font-body">
          No blog posts yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <>
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
              <p className="text-brand-400 text-xs font-medium mb-3">
                {formatDate(post.date)}
              </p>
              <h2 className="font-display text-lg font-bold text-brand-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="mt-2 text-brand-600 text-sm font-body line-clamp-3">
                {truncate(stripHtml(post.excerpt), 150)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-12">
          {loading && (
            <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
          )}
        </div>
      )}
    </>
  );
}
