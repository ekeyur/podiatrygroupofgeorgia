import { getPage } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Foot & Hand Spa",
  description:
    "The only medical spa in North Georgia solely dedicated to hands and feet. Custom-formulated products, hospital-grade sanitation, medical-grade pedicures.",
};

export default async function SpaPage() {
  const page = await getPage("medical-foot-and-hand-spa-treatments");

  return (
    <>
      <section className="bg-brand-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
            Medical Spa
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            Foot & Hand Spa
          </h1>
          <p className="mt-4 text-lg text-white/80 font-body max-w-xl">
            The only medical spa in North Georgia solely dedicated to the
            treatment of hands and feet. Relax in a medically supervised,
            hospital-grade clean environment.
          </p>
          <div className="mt-8">
            <a
              href="https://book.squareup.com/appointments/tonko1xg4rnxyu/location/L0DYS13WGWESZ/services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-body font-semibold tracking-wide rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 bg-gold-400 text-brand-900 hover:bg-gold-300 shadow-lg shadow-gold-400/25 hover:shadow-gold-400/40 hover:-translate-y-0.5 px-10 py-4 text-lg"
            >
              Book a Spa Treatment
            </a>
          </div>
        </div>
      </section>

      {/* Content from WP */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {page?.content ? (
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <div className="space-y-6 text-brand-700 font-body text-lg leading-relaxed">
              <p>
                Our custom-formulated treatment products are exclusive to the
                Foot and Hand Spa at Podiatry Group of Georgia. We use the
                finest quality ingredients in professional strength formulas.
              </p>
              <p>
                Our licensed and specially trained staff will give your feet a
                facial to make your face jealous. You can relax and rest easy at
                our Foot and Hand Spa — we use EPA-registered hospital
                disinfectants, and our sanitation procedures meet or exceed OSHA
                standards.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-brand-900">
            Treat Your Feet Today
          </h2>
          <p className="mt-3 text-brand-600 font-body">
            Combine our spa services with personalized medical care for the best
            results.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://book.squareup.com/appointments/tonko1xg4rnxyu/location/L0DYS13WGWESZ/services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-body font-semibold tracking-wide rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 px-7 py-3 text-base"
            >
              Book Appointment
            </a>
            <Button href="/shop" variant="outline">
              Browse Spa Products
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
