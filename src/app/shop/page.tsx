import { getShopData } from "@/lib/api";
import { ProductCard } from "@/components/shop/ProductCard";
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
      <section className="bg-brand-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
            Shop
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            Our Products
          </h1>
          <p className="mt-4 text-lg text-white/80 font-body max-w-xl">
            Custom-formulated treatment products exclusive to our Marietta
            clinic, made with the finest quality ingredients.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              <span className="px-5 py-2 bg-brand-500 text-white text-sm font-semibold rounded-full">
                All Products
              </span>
              {categories
                .filter((c) => c.count > 0)
                .map((cat) => (
                  <span
                    key={cat.slug}
                    className="px-5 py-2 bg-white text-brand-700 text-sm font-medium rounded-full border border-brand-100 hover:border-brand-300 cursor-pointer transition-colors"
                  >
                    {cat.name} ({cat.count})
                  </span>
                ))}
            </div>
          )}

          {/* Product grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-brand-600 text-lg font-body">
                No products available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
