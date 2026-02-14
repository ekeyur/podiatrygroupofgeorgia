"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import {
  Menu,
  X,
  Phone,
  ShoppingBag,
  ChevronDown,
  Stethoscope,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Laser Therapy", href: "/services/laser-therapy" },
      { label: "Diabetic Foot Care", href: "/services/diabetic-foot-care" },
      { label: "Foot Surgery", href: "/services/foot-surgery" },
      { label: "Orthotics", href: "/services/orthotics" },
      { label: "All Services", href: "/services" },
    ],
  },
  { label: "Medical Spa", href: "/spa" },
  { label: "Our Team", href: "/team" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(null);
    setBookingOpen(false);
  }, [pathname]);

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
    <>
      {/* Top bar */}
      <div className="bg-brand-950 text-white/80 text-sm font-body hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <p>2864 Johnson Ferry Rd, Suite 100, Marietta, GA 30062</p>
          <a
            href="tel:4048063731"
            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
          >
            <Phone size={14} />
            (404) 806-3731
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 font-body",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-brand-900/5"
            : "bg-white"
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center group-hover:bg-brand-600 transition-colors">
                <span className="text-white font-display font-bold text-lg">
                  P
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="font-display text-lg font-bold text-brand-900 leading-none">
                  Podiatry Group
                </p>
                <p className="text-xs text-brand-500 tracking-wide">
                  of Georgia
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && setDropdown(link.label)
                  }
                  onMouseLeave={() => setDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1",
                      pathname === link.href ||
                        pathname.startsWith(link.href + "/")
                        ? "text-brand-500 bg-brand-50"
                        : "text-brand-800 hover:text-brand-500 hover:bg-brand-50/50"
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform",
                          dropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && dropdown === link.label && (
                    <div className="absolute top-full left-0 pt-2 w-56">
                      <div className="bg-white rounded-xl shadow-xl shadow-brand-900/10 border border-brand-100 p-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-brand-700 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link
                href="/shop/cart"
                aria-label="Shopping cart"
                className="relative p-3 text-brand-700 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold-400 text-brand-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* CTA */}
              <div className="hidden md:block relative" ref={bookingRef}>
                <button
                  onClick={() => setBookingOpen(!bookingOpen)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-full hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5"
                >
                  Book Appointment
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform",
                      bookingOpen && "rotate-180"
                    )}
                  />
                </button>
                {bookingOpen && (
                  <div className="absolute top-full right-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-xl shadow-xl shadow-brand-900/10 border border-brand-100 p-2">
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

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="lg:hidden p-3 text-brand-700 hover:bg-brand-50 rounded-lg"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-brand-100">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      pathname === link.href
                        ? "text-brand-500 bg-brand-50"
                        : "text-brand-800 hover:bg-brand-50"
                    )}
                  >
                    {link.label}
                  </Link>
                  {link.children &&
                    link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block pl-10 pr-4 py-2 text-sm text-brand-600 hover:text-brand-500"
                      >
                        {child.label}
                      </Link>
                    ))}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <a
                  href="https://www.zocdoc.com/practice/podiatry-group-of-georgia-63623?lock=true&isNewPatient=false&referrerType=widget"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-500 text-white font-semibold rounded-full"
                >
                  <Stethoscope size={18} />
                  Medical Appointment
                </a>
                <a
                  href="https://book.squareup.com/appointments/tonko1xg4rnxyu/location/L0DYS13WGWESZ/services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gold-400 text-brand-950 font-semibold rounded-full"
                >
                  <Sparkles size={18} />
                  Medical Spa Appointment
                </a>
                <a
                  href="tel:4048063731"
                  className="block text-center mt-3 text-gold-500 font-semibold"
                >
                  Call (404) 806-3731
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
