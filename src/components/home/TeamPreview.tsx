"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { TeamMember } from "@/types/wordpress";

export function TeamPreview({ team }: { team: TeamMember[] }) {
  return (
    <section className="py-14 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading
          eyebrow="Our Doctors"
          title="Meet Your Care Team"
          description="Our board-certified podiatrists bring decades of combined experience to every patient encounter."
        />

        <div className="mt-10 sm:mt-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/team/${member.slug}`}
                className="group block text-center"
              >
                {/* Photo */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-2xl overflow-hidden mb-5 bg-brand-100">
                  {member.acf?.headshot?.sourceUrl ? (
                    <Image
                      src={member.acf.headshot.sourceUrl}
                      alt={member.acf.headshot.altText || member.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-300">
                      <span className="text-5xl">👩‍⚕️</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/10 transition-colors duration-300 rounded-2xl" />
                </div>

                {/* Info */}
                <h3 className="font-display text-lg font-bold text-brand-900 group-hover:text-brand-600 transition-colors">
                  {member.title}
                </h3>
                {member.acf?.credentials && (
                  <p className="text-gold-500 text-sm font-semibold font-body">
                    {member.acf.credentials}
                  </p>
                )}
                {member.acf?.specialty && (
                  <p className="mt-1 text-brand-600 text-sm font-body">
                    {member.acf.specialty}
                  </p>
                )}

                {member.acf?.acceptingPatients && (
                  <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Accepting Patients
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/team" variant="outline">
            View All Team Members
          </Button>
        </div>
      </div>
    </section>
  );
}
