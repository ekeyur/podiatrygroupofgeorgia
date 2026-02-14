import { getAllServices } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive foot and ankle services including laser therapy, diabetic foot care, foot surgery, custom orthotics, and medical spa treatments in Marietta, GA.",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
            Services
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            Foot & Ankle Services
          </h1>
          <p className="mt-4 text-lg text-white/80 font-body max-w-xl">
            From advanced treatments to preventive care, we offer comprehensive
            podiatric services under one roof.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-brand-100/50 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image */}
                {service.acf?.heroImage?.sourceUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.acf.heroImage.sourceUrl}
                      alt={service.acf.heroImage.altText || service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="font-display text-xl font-bold text-brand-900 group-hover:text-brand-600 transition-colors flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight
                      size={18}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-500"
                    />
                  </h2>
                  <p className="mt-2 text-brand-600 font-body text-sm leading-relaxed line-clamp-3">
                    {service.acf?.shortDescription || ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
