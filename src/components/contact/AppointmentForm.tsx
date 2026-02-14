"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Stethoscope, Sparkles } from "lucide-react";

interface AppointmentFormProps {
  defaultType: string;
}

export function AppointmentForm({ defaultType }: AppointmentFormProps) {
  const [appointmentType, setAppointmentType] = useState(defaultType);

  return (
    <form className="space-y-5">
      {/* Appointment type selector */}
      <div>
        <label className="block text-sm font-semibold text-brand-900 mb-2">
          Appointment Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAppointmentType("medical")}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
              appointmentType === "medical"
                ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500/20"
                : "border-brand-100 bg-white hover:border-brand-200"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                appointmentType === "medical"
                  ? "bg-brand-500 text-white"
                  : "bg-brand-50 text-brand-500"
              )}
            >
              <Stethoscope size={20} />
            </div>
            <div>
              <p
                className={cn(
                  "text-sm font-semibold",
                  appointmentType === "medical"
                    ? "text-brand-900"
                    : "text-brand-700"
                )}
              >
                Medical
              </p>
              <p className="text-xs text-brand-600 mt-0.5">
                Podiatry care
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setAppointmentType("spa")}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
              appointmentType === "spa"
                ? "border-gold-400 bg-gold-50 ring-1 ring-gold-400/20"
                : "border-brand-100 bg-white hover:border-brand-200"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                appointmentType === "spa"
                  ? "bg-gold-400 text-brand-900"
                  : "bg-brand-50 text-gold-400"
              )}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <p
                className={cn(
                  "text-sm font-semibold",
                  appointmentType === "spa"
                    ? "text-brand-900"
                    : "text-brand-700"
                )}
              >
                Medical Spa
              </p>
              <p className="text-xs text-brand-600 mt-0.5">
                Foot & hand spa
              </p>
            </div>
          </button>
        </div>
        <input type="hidden" name="appointmentType" value={appointmentType} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brand-900 mb-1.5">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            required
            className="w-full px-4 py-3 bg-white border border-brand-200 rounded-xl text-brand-900 font-body focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow"
            placeholder="Jane"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-900 mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            required
            className="w-full px-4 py-3 bg-white border border-brand-200 rounded-xl text-brand-900 font-body focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-900 mb-1.5">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-white border border-brand-200 rounded-xl text-brand-900 font-body focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow"
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-900 mb-1.5">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          className="w-full px-4 py-3 bg-white border border-brand-200 rounded-xl text-brand-900 font-body focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow"
          placeholder="(404) 555-1234"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-900 mb-1.5">
          How can we help?
        </label>
        <textarea
          rows={5}
          name="message"
          required
          className="w-full px-4 py-3 bg-white border border-brand-200 rounded-xl text-brand-900 font-body focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow resize-none"
          placeholder={
            appointmentType === "spa"
              ? "Tell us about the spa treatment you're interested in..."
              : "Describe your foot or ankle concern..."
          }
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Submit Request
      </Button>

      <p className="text-xs text-brand-600 text-center font-body">
        We typically respond within 1 business day. For urgent
        concerns, please call us directly.
      </p>
    </form>
  );
}
