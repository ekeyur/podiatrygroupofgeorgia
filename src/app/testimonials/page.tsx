import { getAllTestimonials } from "@/lib/api";
import { stripHtml } from "@/lib/utils";
import { Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Testimonials",
  description:
    "Read what our patients say about their experience at the Podiatry Group of Georgia in Marietta.",
};

export default async function TestimonialsPage() {
  const { testimonials } = await getAllTestimonials();

  return (
    <>
      <section className="bg-brand-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
            Testimonials
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            Patient Stories
          </h1>
          <p className="mt-4 text-lg text-white/80 font-body max-w-xl">
            Hear from real patients about their experience at our practice.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-brand-100/50 shadow-sm"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        className={
                          j < (t.acf?.rating || 5)
                            ? "text-gold-400 fill-gold-400"
                            : "text-brand-200"
                        }
                      />
                    ))}
                  </div>

                  <blockquote className="text-brand-700 font-body text-sm leading-relaxed italic">
                    &ldquo;{stripHtml(t.content)}&rdquo;
                  </blockquote>

                  <div className="mt-4 pt-4 border-t border-brand-100/50">
                    <p className="font-semibold text-brand-900 text-sm">
                      {t.acf?.patientName || "Patient"}
                    </p>
                    {t.acf?.source && (
                      <p className="text-xs text-brand-500 mt-0.5">
                        via {t.acf.source}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-brand-600 text-lg font-body">
                Testimonials coming soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
