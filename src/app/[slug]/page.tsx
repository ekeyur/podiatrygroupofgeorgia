import { getPage, getPageSlugs } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.metaDesc,
  };
}

export default async function WPPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-cream-50 py-14 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-950 max-w-3xl">
            {page.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {page.content ? (
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <p className="text-brand-700 font-body text-lg">
              This page has no content yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
