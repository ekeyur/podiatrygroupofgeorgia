import { Button } from "@/components/ui/Button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { AppointmentForm } from "@/components/contact/AppointmentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Podiatry Group of Georgia in Marietta. Book your appointment online or call (404) 806-3731.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const appointmentType =
    type === "spa" ? "spa" : type === "medical" ? "medical" : "";

  return (
    <>
      <section className="bg-brand-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
            Contact
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-white/80 font-body max-w-xl">
            Ready to start your journey to pain-free feet? Book an appointment
            or reach out with any questions.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-900 mb-6">
                Visit Our Office
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-brand-100/50">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-900">Address</p>
                    <p className="text-sm text-brand-600 mt-0.5">
                      2864 Johnson Ferry Rd, Suite 100
                      <br />
                      Marietta, GA 30062
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-brand-100/50">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-900">Phone</p>
                    <a
                      href="tel:4048063731"
                      className="text-sm text-brand-500 hover:text-brand-600 mt-0.5 block"
                    >
                      (404) 806-3731
                    </a>
                    <p className="text-sm text-brand-600 mt-0.5">
                      Fax: (770) 321-0001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-brand-100/50">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-900">Email</p>
                    <a
                      href="mailto:info@podiatrygroupofgeorgia.com"
                      className="text-sm text-brand-500 hover:text-brand-600 mt-0.5 block"
                    >
                      info@podiatrygroupofgeorgia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-brand-100/50">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-brand-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-900">Office Hours</p>
                    <div className="text-sm text-brand-600 mt-0.5 space-y-0.5">
                      <p>Monday – Friday: 8:00 AM – 5:00 PM</p>
                      <p>Saturday – Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="mt-8 rounded-xl overflow-hidden h-64 bg-brand-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.3!2d-84.3488!3d33.9367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s2864+Johnson+Ferry+Rd+Suite+100+Marietta+GA+30062!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Podiatry Group of Georgia Office Location"
                />
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-900 mb-6">
                Book an Appointment
              </h2>

              <AppointmentForm defaultType={appointmentType} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
