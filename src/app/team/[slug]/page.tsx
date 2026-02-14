import { getTeamMember, getTeamSlugs } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getTeamSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMember(slug);
  if (!member) return {};
  return {
    title: `${member.title}${member.acf?.credentials ? `, ${member.acf.credentials}` : ""}`,
    description: member.seo?.metaDesc || `Meet ${member.title} at Podiatry Group of Georgia.`,
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = await getTeamMember(slug);
  if (!member) notFound();

  return (
    <>
      <section className="bg-brand-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Photo */}
            <div className="relative w-64 h-64 lg:w-full lg:h-80 rounded-2xl overflow-hidden bg-brand-900 mx-auto lg:mx-0">
              {member.acf?.headshot?.sourceUrl ? (
                <Image
                  src={member.acf.headshot.sourceUrl}
                  alt={member.acf.headshot.altText || member.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  👩‍⚕️
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                {member.title}
              </h1>
              {member.acf?.credentials && (
                <p className="mt-1 text-gold-400 text-lg font-semibold font-body">
                  {member.acf.credentials}
                </p>
              )}
              {member.acf?.specialty && (
                <p className="mt-2 text-white/80 text-lg font-body">
                  {member.acf.specialty}
                </p>
              )}

              {member.acf?.acceptingPatients && (
                <span className="inline-flex items-center gap-1.5 mt-4 px-4 py-1.5 bg-emerald-500/15 text-emerald-400 text-sm font-semibold rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Currently Accepting Patients
                </span>
              )}

              <div className="mt-6">
                <Button href="/contact" variant="secondary">
                  Book with {member.title.split(" ")[0]}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          {member.acf?.bio ? (
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: member.acf.bio }}
            />
          ) : member.content ? (
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: member.content }}
            />
          ) : null}

          {/* Education */}
          {member.acf?.education && member.acf.education.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-brand-900 mb-4">
                Education
              </h2>
              <div className="space-y-3">
                {member.acf.education.map((edu, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl"
                  >
                    <span className="text-gold-400 mt-0.5">🎓</span>
                    <div>
                      <p className="font-semibold text-brand-900">{edu.degree}</p>
                      <p className="text-sm text-brand-600">
                        {edu.school}
                        {edu.year && ` · ${edu.year}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {member.acf?.certifications && member.acf.certifications.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-brand-900 mb-4">
                Board Certifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {member.acf.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-sm font-medium"
                  >
                    {cert.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
