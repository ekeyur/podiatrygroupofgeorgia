import { getShopData } from "@/lib/api";
import { ShopGrid } from "@/components/shop/ShopGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Custom-formulated treatment products for foot and hand care, exclusive to the Podiatry Group of Georgia.",
};

export default async function ShopPage() {
  const { products, categories } = await getShopData();

  return (
    <>
      {/* Hero */}
      <section className="bg-cream-50 py-14 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 mb-3">
            Shop
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-950 max-w-3xl">
            Our Products
          </h1>
          <p className="mt-4 text-lg text-brand-700 font-body max-w-xl">
            Custom-formulated treatment products exclusive to our Marietta
            clinic, made with the finest quality ingredients.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <ShopGrid products={products} categories={categories} />
        </div>
      </section>
    </>
  );
}
