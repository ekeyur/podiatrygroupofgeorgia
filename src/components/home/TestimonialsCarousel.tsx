"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { stripHtml } from "@/lib/utils";
import type { Testimonial } from "@/types/wordpress";

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <section className="py-14 sm:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Patients Say"
          description="Real stories from real patients who trusted us with their foot and ankle care."
        />

        <div className="mt-10 sm:mt-16 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm border border-brand-100/50 text-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < (t.acf?.rating || 5)
                        ? "text-gold-400 fill-gold-400"
                        : "text-brand-200"
                    }
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-lg md:text-xl text-brand-800 leading-relaxed italic">
                &ldquo;{stripHtml(t.content)}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="mt-6">
                <p className="font-display text-base font-bold text-brand-900">
                  {t.acf?.patientName || "Patient"}
                </p>
                {t.acf?.source && (
                  <p className="text-sm text-brand-500 font-body mt-0.5">
                    via {t.acf.source}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          {testimonials.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-12 h-12 rounded-full border border-brand-200 flex items-center justify-center text-brand-500 hover:bg-brand-50 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-3 rounded-full transition-all ${
                      i === current
                        ? "bg-brand-500 w-6"
                        : "bg-brand-200 hover:bg-brand-300 w-3"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-12 h-12 rounded-full border border-brand-200 flex items-center justify-center text-brand-500 hover:bg-brand-50 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
