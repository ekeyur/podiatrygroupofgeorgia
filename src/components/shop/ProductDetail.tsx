"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, stripHtml } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  ShoppingBag,
  Minus,
  Plus,
  Star,
  ChevronLeft,
  Loader2,
} from "lucide-react";

// Note: This is a client component wrapper. In production you'd
// fetch the product server-side and pass it as props. For now this
// demonstrates the cart integration pattern.

interface ProductDetailProps {
  product: any; // Use the full SimpleProduct type in production
}

export default function ProductDetailClient({ product }: ProductDetailProps) {
  const { addToCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [adding, setAdding] = useState(false);

  const images = [
    product.image,
    ...(product.galleryImages?.nodes || []),
  ].filter(Boolean);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await addToCart(product.databaseId, quantity);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <section className="py-8 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Shop
          </Link>
        </div>
      </section>

      <section className="py-12 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-brand-100/50">
                {images[selectedImage]?.sourceUrl ? (
                  <Image
                    src={images[selectedImage].sourceUrl}
                    alt={images[selectedImage].altText || product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-200 text-6xl">
                    🧴
                  </div>
                )}
                {product.onSale && (
                  <span className="absolute top-4 left-4 px-4 py-1.5 bg-rose-500 text-white text-sm font-bold rounded-full">
                    Sale
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="mt-4 flex gap-3">
                  {images.map((img: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        i === selectedImage
                          ? "border-brand-500"
                          : "border-transparent hover:border-brand-200"
                      }`}
                    >
                      <Image
                        src={img.sourceUrl}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              {product.productCategories?.nodes[0] && (
                <p className="text-sm text-brand-500 font-semibold uppercase tracking-wider mb-2">
                  {product.productCategories.nodes[0].name}
                </p>
              )}

              <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-900">
                {product.name}
              </h1>

              {/* Reviews summary */}
              {product.reviews?.averageRating && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.round(product.reviews.averageRating)
                            ? "text-gold-400 fill-gold-400"
                            : "text-brand-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-brand-600">
                    ({product.reviews.nodes.length} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-brand-900">
                  {formatPrice(product.price)}
                </span>
                {product.onSale && product.regularPrice && (
                  <span className="text-lg text-brand-400 line-through">
                    {formatPrice(product.regularPrice)}
                  </span>
                )}
              </div>

              {/* Short description */}
              {product.shortDescription && (
                <p className="mt-4 text-brand-700 font-body leading-relaxed">
                  {stripHtml(product.shortDescription)}
                </p>
              )}

              {/* Quantity + Add to cart */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center border border-brand-200 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-12 h-12 flex items-center justify-center text-brand-500 hover:bg-brand-50 rounded-l-full transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold text-brand-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-12 h-12 flex items-center justify-center text-brand-500 hover:bg-brand-50 rounded-r-full transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={adding || product.stockStatus === "OUT_OF_STOCK"}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <ShoppingBag size={18} />
                  )}
                  {product.stockStatus === "OUT_OF_STOCK"
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>
              </div>

              {/* Stock status */}
              {product.stockStatus === "IN_STOCK" && (
                <p className="mt-3 text-sm text-emerald-600 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  In Stock
                  {product.stockQuantity &&
                    ` · ${product.stockQuantity} available`}
                </p>
              )}
            </div>
          </div>

          {/* Full description */}
          {product.description && (
            <div className="mt-16 max-w-3xl">
              <h2 className="font-display text-2xl font-bold text-brand-900 mb-4">
                Product Details
              </h2>
              <div
                className="wp-content"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
