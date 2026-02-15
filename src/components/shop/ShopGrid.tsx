"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { SimpleProduct, ProductCategory } from "@/types/wordpress";

interface ShopGridProps {
  products: SimpleProduct[];
  categories: ProductCategory[];
}

export function ShopGrid({ products, categories }: ShopGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const visibleCategories = categories.filter((c) => c.count > 0);

  const filtered = selectedCategory
    ? products.filter((p) =>
        p.productCategories?.nodes.some((c) => c.slug === selectedCategory)
      )
    : products;

  return (
    <>
      {/* Category filters */}
      {visibleCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 sm:px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
              selectedCategory === null
                ? "bg-brand-500 text-white"
                : "bg-white text-brand-700 border border-brand-100 hover:border-brand-300"
            }`}
          >
            All Products
          </button>
          {visibleCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === cat.slug ? null : cat.slug
                )
              }
              className={`px-4 sm:px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-brand-500 text-white"
                  : "bg-white text-brand-700 border border-brand-100 hover:border-brand-300"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      )}

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-brand-600 text-lg font-body">
            No products found in this category.
          </p>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-4 text-brand-500 hover:text-brand-600 font-semibold transition-colors"
          >
            View all products
          </button>
        </div>
      )}
    </>
  );
}
