import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Laser Therapy", href: "/services/laser-therapy" },
    { label: "Diabetic Foot Care", href: "/services/diabetic-foot-care" },
    { label: "Foot Surgery", href: "/services/foot-surgery" },
    { label: "Medical Spa", href: "/spa" },
    { label: "Orthotics", href: "/services/orthotics" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Nail Products", href: "/shop?category=nail-products" },
    { label: "Spa Products", href: "/shop?category=spa-products" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white/70 font-body">
      {/* CTA band */}
      <div className="bg-gradient-to-r from-brand-700 to-brand-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
              Ready to Take the Next Step?
            </h3>
            <p className="text-brand-100/80 mt-1">
              Schedule your appointment today and start your journey to
              pain-free feet.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-brand-800 font-semibold rounded-full hover:bg-cream-50 transition-colors shadow-lg"
            >
              Book Online
            </Link>
            <a
              href="tel:4048063731"
              className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
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
                className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors"
              >
                <Phone size={16} className="text-gold-400" />
                (404) 806-3731
              </a>
              <a
                href="mailto:info@podiatrygroupofgeorgia.com"
                className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors"
              >
                <Mail size={16} className="text-gold-400" />
                info@podiatrygroupofgeorgia.com
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span>
                  2864 Johnson Ferry Rd
                  <br />
                  Suite 100, Marietta, GA 30062
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span>
                  Mon – Fri: 8:00 AM – 5:00 PM
                  <br />
                  Sat – Sun: Closed
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold-400 transition-colors"
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
                    className="text-sm hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Podiatry Group of Georgia. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-gold-400 transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-gold-400 transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
