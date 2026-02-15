"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { BookingDropdown } from "@/components/ui/BookingDropdown";

const footerLinks = {
  services: [
    { label: "Medical Spa", href: "/spa" },
    { label: "Laser Treatments", href: "/services/laser-pain-relief" },
    { label: "Clearly Beautiful Nails", href: "/services/clearly-beautiful-nails" },
    { label: "Diabetic Foot Care", href: "/services/diabetic-foot-care" },
    { label: "Foot Surgery", href: "/services/foot-surgery" },
    { label: "Orthotics & Diagnostics", href: "/services/orthotics" },
  ],
  about: [
    { label: "Why Us", href: "/about" },
    { label: "Our Mission", href: "/mission-statement" },
    { label: "Our Team", href: "/team" },
    { label: "Patient Info", href: "/patient-infomation" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Nail Products", href: "/shop?category=nail-products" },
    { label: "Spa Products", href: "/shop?category=spa-products" },
  ],
  policies: [
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Return Policy", href: "/return-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
  ],
};

const reviewLinks = [
  {
    label: "Google – Leave a Review",
    href: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x88f50d80a643527b:0x54f045be097f49f9!12e1?source=g.page.m.rc&laa=merchant-web-dashboard-card",
  },
  {
    label: "Yelp – Leave a Review",
    href: "https://www.yelp.com/biz/podiatry-group-of-georgia-marietta-4",
  },
  {
    label: "Zocdoc",
    href: "https://www.zocdoc.com/doctor/neha-delvadia-dpm-308598?isNewPatient=false",
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white/80 font-body">
      {/* CTA band */}
      <div className="bg-gradient-to-r from-brand-700 to-brand-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <p className="font-display text-base sm:text-lg md:text-xl font-semibold text-white text-center md:text-left">
            Schedule your appointment today and start your journey to
            pain-free feet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-center">
            <BookingDropdown variant="white" label="Book Online" />
            <a
              href="tel:4048063731"
              className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-center"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">
                  P
                </span>
              </div>
              <div>
                <p className="font-display text-lg font-bold text-white leading-none">
                  Podiatry Group
                </p>
                <p className="text-xs text-brand-400 tracking-wide">
                  of Georgia
                </p>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              The leading podiatry practice in Georgia, providing compassionate
              foot and ankle care, advanced treatments, and a one-of-a-kind
              medical spa experience.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="tel:4048063731"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
              >
                <Phone size={16} className="text-brand-400" />
                (404) 806-3731
              </a>
              <p className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-brand-400" />
                Fax: (770) 321-0001
              </p>
              <a
                href="mailto:info@podiatrygroupofgeorgia.com"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
              >
                <Mail size={16} className="text-brand-400" />
                info@podiatrygroupofgeorgia.com
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-brand-400 mt-0.5 shrink-0" />
                <span>
                  2864 Johnson Ferry Rd
                  <br />
                  Suite 100, Marietta, GA 30062
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock size={16} className="text-brand-400 mt-0.5 shrink-0" />
                <span>
                  Mon – Fri: 8:00 AM – 5:00 PM
                  <br />
                  Sat – Sun: Closed
                </span>
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              About Us
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Policies
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.policies.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-display text-base font-semibold text-white mt-8 mb-4">
              Follow Us
            </h4>
            <ul className="space-y-2.5">
              {reviewLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/70">
            &copy; {new Date().getFullYear()} Podiatry Group of Georgia. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
