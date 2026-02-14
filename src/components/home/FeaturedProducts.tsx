"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { SimpleProduct } from "@/types/wordpress";

export function FeaturedProducts({
  products,
}: {
  products: SimpleProduct[];
}) {
  if (!products.length) return null;

  return (
    <section className="py-14 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading
          eyebrow="Shop"
          title="Featured Products"
          description="Custom-formulated treatment products exclusive to our Marietta clinic, made with the finest quality ingredients."
        />

        <div className="mt-10 sm:mt-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/shop/${product.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-100 mb-4">
                  {product.image?.sourceUrl ? (
                    <Image
                      src={product.image.sourceUrl}
                      alt={product.image.altText || product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-300 text-4xl">
                      🧴
                    </div>
                  )}

                  {product.onSale && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-rose-500 text-white text-xs font-bold rounded-full">
                      Sale
                    </span>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-body text-sm font-semibold text-brand-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-display text-lg font-bold text-brand-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.onSale && product.regularPrice && (
                    <span className="text-sm text-brand-400 line-through">
                      {formatPrice(product.regularPrice)}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/shop" variant="outline">
            Browse All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
