import { getHomepageData } from "@/lib/api";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TeamPreview } from "@/components/home/TeamPreview";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default async function HomePage() {
  const { page, services, team, testimonials, products } =
    await getHomepageData();

  return (
    <>
      <Hero
        headline={page?.acf?.heroHeadline}
        subtext={page?.acf?.heroSubtext}
        imageUrl={page?.acf?.heroImage?.sourceUrl}
      />
      <ServicesGrid services={services} />
      <WhyChooseUs />
      <TeamPreview team={team} />
      <TestimonialsCarousel testimonials={testimonials} />
      <FeaturedProducts products={products} />
    </>
  );
}
