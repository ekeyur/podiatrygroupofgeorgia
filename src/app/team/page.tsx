import { getAllTeamMembers } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the board-certified podiatrists at Podiatry Group of Georgia, led by Dr. Tammy Gephart and Dr. Neha Delvadia.",
};

export default async function TeamPage() {
  const team = await getAllTeamMembers();

  return (
    <>
      <section className="bg-brand-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
            Our Team
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            Meet Your Doctors
          </h1>
          <p className="mt-4 text-lg text-white/80 font-body max-w-xl">
            Board-certified podiatrists committed to your foot and ankle health.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member) => (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-brand-100/50 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-72 overflow-hidden bg-brand-100">
                  {member.acf?.headshot?.sourceUrl ? (
                    <Image
                      src={member.acf.headshot.sourceUrl}
                      alt={member.acf.headshot.altText || member.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl text-brand-300">
                      👩‍⚕️
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-bold text-brand-900 group-hover:text-brand-600 transition-colors">
                    {member.title}
                  </h2>
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
