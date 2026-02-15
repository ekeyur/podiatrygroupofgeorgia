"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, ChevronDown, Stethoscope, Sparkles } from "lucide-react";

interface HeroProps {
  headline?: string;
  subtext?: string;
  imageUrl?: string;
}

export function Hero({ headline, subtext, imageUrl }: HeroProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (bookingRef.current && !bookingRef.current.contains(e.target as Node)) {
        setBookingOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative min-h-[52vh] sm:min-h-[57vh] flex items-center overflow-hidden bg-brand-950">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "url('/hero-placeholder.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/80 to-brand-950/40" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-brand-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-20 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — Text content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-400/15 border border-gold-400/30 rounded-full text-gold-400 text-sm font-semibold tracking-wide mb-6">
                <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                Marietta, Georgia
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              {headline || (
                <>
                  Expert Foot &<br />
                  <span className="text-gold-400">Ankle Care</span>
                </>
              )}
            </motion.h1>

            <motion.p
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/80 font-body leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              {subtext ||
                "Whether you need relief from pain, solutions to foot conditions, or a luxurious medical-grade pedicure — it's all here at the Podiatry Group of Georgia."}
            </motion.p>

            {/* Mobile doctor photo — shown below text on small screens */}
            <motion.div
              className="mt-6 flex justify-center lg:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            >
              <div
                className="relative w-48 h-48 sm:w-56 sm:h-56"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 90% 90% at 50% 40%, black 50%, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 90% 90% at 50% 40%, black 50%, transparent 75%)",
                }}
              >
                <Image
                  src="/doctor-hero.png"
                  alt="Dr. Neha Pathak — Board Certified Podiatrist"
                  fill
                  className="object-contain object-top mix-blend-luminosity"
                  priority
                />
                <div className="absolute inset-0 bg-brand-950/30 mix-blend-color" />
              </div>
            </motion.div>

            <motion.div
              className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            >
              <div className="relative" ref={bookingRef}>
                <button
                  onClick={() => setBookingOpen(!bookingOpen)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-body font-semibold tracking-wide rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 bg-gold-400 text-brand-950 hover:bg-gold-300 shadow-lg shadow-gold-400/25 hover:shadow-gold-400/40 hover:-translate-y-0.5 px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg"
                >
                  Book Appointment
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${bookingOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {bookingOpen && (
                  <div className="absolute top-full left-0 right-0 sm:right-auto pt-2 sm:w-72 z-50">
                    <div className="bg-white rounded-xl shadow-xl shadow-brand-900/20 border border-brand-100 p-2">
                      <a
                        href="https://www.zocdoc.com/practice/podiatry-group-of-georgia-63623?lock=true&isNewPatient=false&referrerType=widget"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-brand-700 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
                      >
                        <Stethoscope size={18} className="text-brand-500 shrink-0" />
                        <div>
                          <p className="font-semibold">Medical Appointment</p>
                          <p className="text-xs text-brand-600 mt-0.5">
                            Podiatry consultation & treatment
                          </p>
                        </div>
                      </a>
                      <a
                        href="https://book.squareup.com/appointments/tonko1xg4rnxyu/location/L0DYS13WGWESZ/services"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-brand-700 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
                      >
                        <Sparkles size={18} className="text-gold-400 shrink-0" />
                        <div>
                          <p className="font-semibold">Medical Spa Appointment</p>
                          <p className="text-xs text-brand-600 mt-0.5">
                            Foot & hand spa treatments
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <a
                href="tel:4048063731"
                className="inline-flex items-center justify-center sm:justify-start gap-3 px-7 py-3.5 sm:py-4 text-white hover:text-gold-300 font-semibold text-base sm:text-lg transition-colors"
              >
                <span className="w-10 h-10 sm:w-12 sm:h-12 bg-white/15 rounded-full flex items-center justify-center border border-white/25">
                  <Phone size={18} />
                </span>
                (404) 806-3731
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="mt-8 sm:mt-16 flex flex-wrap items-center gap-4 sm:gap-8 text-white/70 text-xs sm:text-sm font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-gold-400 text-xs font-bold">✓</span>
                </div>
                Board Certified
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-gold-400 text-xs font-bold">✓</span>
                </div>
                Wellstar Affiliated
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-gold-400 text-xs font-bold">✓</span>
                </div>
                Insurance Accepted
              </div>
            </motion.div>
          </div>

          {/* Right — Doctor photo (desktop) */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div
              className="relative h-[650px] w-full"
              style={{
                maskImage:
                  "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 72%)",
              }}
            >
              <Image
                src="/doctor-hero.png"
                alt="Dr. Neha Pathak — Board Certified Podiatrist"
                fill
                className="object-contain object-top mix-blend-luminosity"
                priority
              />
              <div className="absolute inset-0 bg-brand-950/30 mix-blend-color" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
