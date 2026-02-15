"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { BookingDropdown } from "@/components/ui/BookingDropdown";

interface HeroProps {
  headline?: string;
  subtext?: string;
  imageUrl?: string;
}

export function Hero({ headline, subtext, imageUrl }: HeroProps) {
  return (
    <section className="relative min-h-[52vh] sm:min-h-[57vh] flex items-center overflow-hidden bg-cream-50">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "url('/hero-placeholder.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-cream-50/85 to-cream-50/50" />
      </div>

      {/* Split background — teal on the right (desktop only) */}
      <motion.div
        className="hidden lg:block absolute inset-y-0 right-0 w-[35%] bg-brand-500"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-brand-500/10 rounded-full blur-3xl" />
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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-600 text-sm font-semibold tracking-wide mb-6">
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                Marietta, Georgia
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-950 leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              {headline || (
                <>
                  <span className="text-brand-500">Expert Foot &</span>
                  <br />
                  <span className="text-brand-500">Ankle Care</span>
                </>
              )}
            </motion.h1>

            <motion.p
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-brand-700 font-body leading-relaxed max-w-lg"
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
                  className="object-contain object-top"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            >
              <BookingDropdown variant="primary" size="lg" className="w-full sm:w-auto" />
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="mt-8 sm:mt-16 flex flex-wrap items-center gap-4 sm:gap-8 text-brand-600 text-xs sm:text-sm font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brand-500/10 rounded-full flex items-center justify-center">
                  <span className="text-brand-500 text-xs font-bold">✓</span>
                </div>
                Board Certified
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brand-500/10 rounded-full flex items-center justify-center">
                  <span className="text-brand-500 text-xs font-bold">✓</span>
                </div>
                Wellstar Affiliated
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brand-500/10 rounded-full flex items-center justify-center">
                  <span className="text-brand-500 text-xs font-bold">✓</span>
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
                  "radial-gradient(ellipse 90% 85% at 50% 40%, black 60%, transparent 85%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 90% 85% at 50% 40%, black 60%, transparent 85%)",
              }}
            >
              <Image
                src="/doctor-hero.png"
                alt="Dr. Neha Pathak — Board Certified Podiatrist"
                fill
                className="object-contain object-top"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
