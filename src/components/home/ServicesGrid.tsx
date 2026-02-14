"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/wordpress";

// Fallback icons for services when no image is set
const fallbackIcons: Record<string, string> = {
  "laser-therapy": "⚡",
  "diabetic-foot-care": "🩺",
  "foot-surgery": "🏥",
  orthotics: "🦶",
  "medical-spa": "✨",
  default: "🦶",
};

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="What We Treat"
          title="Comprehensive Foot & Ankle Care"
          description="From advanced laser therapy to compassionate diabetic care, we offer a full spectrum of podiatric services under one roof."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-500 hover:-translate-y-1 border border-brand-100/50"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-500 transition-colors duration-300">
                  {service.acf?.icon?.sourceUrl ? (
                    <Image
                      src={service.acf.icon.sourceUrl}
                      alt=""
                      width={28}
                      height={28}
                      className="group-hover:brightness-0 group-hover:invert transition-all"
                    />
                  ) : (
                    <span className="text-2xl">
                      {fallbackIcons[service.slug] || fallbackIcons.default}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-brand-900 group-hover:text-brand-600 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-brand-600 font-body text-sm leading-relaxed line-clamp-3">
                  {service.acf?.shortDescription || ""}
                </p>

                {/* Arrow */}
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
