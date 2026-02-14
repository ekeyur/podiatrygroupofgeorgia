"use client";

import { motion } from "framer-motion";
import { Award, Users, Heart, Building } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "Patients Treated",
  },
  {
    icon: Award,
    value: "20+",
    label: "Years Experience",
  },
  {
    icon: Building,
    value: "Wellstar",
    label: "Affiliated",
  },
  {
    icon: Heart,
    value: "4.9",
    label: "Patient Rating",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-brand-500 relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-14 h-14 mx-auto bg-white/15 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <stat.icon size={24} className="text-gold-400" />
              </div>
              <p className="font-display text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-brand-100/70 text-sm font-body">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
