"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useState } from "react";
import type { SimpleProduct } from "@/types/wordpress";

export function ProductCard({ product }: { product: SimpleProduct }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    try {
      await addToCart(product.databaseId);
      addToast({ type: "success", message: `${product.name} added to cart` });
    } catch {
      addToast({ type: "error", message: "Failed to add item to cart" });
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-brand-100/50 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square bg-cream-50 overflow-hidden">
        {product.image?.sourceUrl ? (
          <Image
            src={product.image.sourceUrl}
            alt={product.image.altText || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-200 text-5xl">
            🧴
          </div>
        )}

        {product.onSale && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-rose-500 text-white text-xs font-bold rounded-full shadow-sm">
            Sale
          </span>
        )}

        {/* Quick add */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 w-12 h-12 bg-brand-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-600 shadow-lg disabled:opacity-50"
        >
          {adding ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ShoppingBag size={16} />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {product.productCategories?.nodes[0] && (
          <p className="text-xs text-brand-500 font-semibold uppercase tracking-wider mb-1">
            {product.productCategories.nodes[0].name}
          </p>
        )}
        <h3 className="font-body text-sm font-semibold text-brand-900 group-hover:text-brand-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-display text-lg font-bold text-brand-900">
            {formatPrice(product.price)}
          </span>
          {product.onSale && product.regularPrice && (
            <span className="text-sm text-brand-400 line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
