import { getPage } from "@/lib/api";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("why");
  return {
    title: page?.seo?.title || "About Us",
    description: page?.seo?.metaDesc || "Learn about the Podiatry Group of Georgia.",
  };
}

export default async function AboutPage() {
  const page = await getPage("why");

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
            About Us
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            {page?.title || "Why Choose Us"}
          </h1>
          <p className="mt-4 text-lg text-white/50 font-body max-w-xl">
            The leading Georgia foot and ankle practice for a reason.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {page?.content ? (
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <p className="text-brand-700/70 font-body text-lg leading-relaxed">
              At the Podiatry Group of Georgia, we are dedicated to providing
              the highest quality foot and ankle care in a compassionate,
              patient-centered environment. Led by Dr. Tammy Gephart and Dr.
              Neha Delvadia, our clinic offers comprehensive podiatric services
              from advanced laser therapy to our one-of-a-kind medical spa.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
