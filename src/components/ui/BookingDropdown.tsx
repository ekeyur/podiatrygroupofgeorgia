"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Stethoscope, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingDropdownProps {
  variant?: "primary" | "secondary" | "white";
  size?: "sm" | "md" | "lg";
  label?: string;
  align?: "left" | "right";
  className?: string;
}

const ZOCDOC_URL =
  "https://www.zocdoc.com/practice/podiatry-group-of-georgia-63623?lock=true&isNewPatient=false&referrerType=widget";
const SQUARE_URL =
  "https://book.squareup.com/appointments/tonko1xg4rnxyu/location/L0DYS13WGWESZ/services";

const variantStyles = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40",
  secondary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40",
  white:
    "bg-white text-brand-800 hover:bg-cream-50 shadow-lg",
};

const sizeStyles = {
  sm: "px-6 py-2.5 text-sm",
  md: "px-7 py-3 text-base",
  lg: "px-8 py-3.5 text-base sm:px-10 sm:py-4 sm:text-lg",
};

export function BookingDropdown({
  variant = "primary",
  size = "md",
  label = "Book Appointment",
  align = "left",
  className,
}: BookingDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 font-body font-semibold tracking-wide rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 hover:-translate-y-0.5",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
      >
        {label}
        <ChevronDown
          size={size === "lg" ? 18 : 14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          className={cn(
            "absolute top-full pt-2 z-50",
            size === "lg"
              ? "left-0 right-0 sm:right-auto sm:w-72"
              : align === "right"
                ? "right-0 w-64"
                : "left-0 w-64"
          )}
        >
          <div className="bg-white rounded-xl shadow-xl shadow-brand-900/10 border border-brand-100 p-2">
            <a
              href={ZOCDOC_URL}
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
              href={SQUARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm text-brand-700 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
            >
              <Sparkles size={18} className="text-brand-500 shrink-0" />
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
  );
}
