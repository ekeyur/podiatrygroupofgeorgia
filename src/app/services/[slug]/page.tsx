import { getService, getServiceSlugs } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return {
    title: service.seo?.title || service.title,
    description: service.seo?.metaDesc || service.acf?.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <section
        className="relative bg-brand-950 py-24"
        style={{
          backgroundImage: service.acf?.heroImage?.sourceUrl
            ? `url(${service.acf.heroImage.sourceUrl})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-brand-950/85" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
            Our Services
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            {service.title}
          </h1>
          {service.acf?.shortDescription && (
            <p className="mt-4 text-lg text-white/60 font-body max-w-xl">
              {service.acf.shortDescription}
            </p>
          )}
          <div className="mt-8">
            <Button href="/contact" variant="secondary" size="lg">
              {service.acf?.ctaText || "Book Appointment"}
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        </div>
      </section>

      {/* FAQ */}
      {service.acf?.faq && service.acf.faq.length > 0 && (
        <section className="py-20 bg-cream-50">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-3xl font-bold text-brand-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {service.acf.faq.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-brand-100/50"
                >
                  <h3 className="font-display text-lg font-bold text-brand-900">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-brand-700/70 font-body leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
