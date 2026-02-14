"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";

export default function CartPage() {
  const { cart, loading, updateQuantity, removeItem } = useCart();

  const items = cart?.contents?.nodes || [];

  return (
    <>
      <section className="bg-brand-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-4xl font-bold text-white">
            Your Cart
          </h1>
        </div>
      </section>

      <section className="py-12 bg-cream-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag
                size={48}
                className="mx-auto text-brand-200 mb-4"
              />
              <h2 className="font-display text-2xl font-bold text-brand-900">
                Your cart is empty
              </h2>
              <p className="mt-2 text-brand-700/50 font-body">
                Browse our products and add something you love.
              </p>
              <div className="mt-6">
                <Button href="/shop" variant="primary">
                  Browse Products
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-4 bg-white rounded-xl p-4 border border-brand-100/50"
                  >
                    {/* Image */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                      {item.product?.node?.image?.sourceUrl ? (
                        <Image
                          src={item.product.node.image.sourceUrl}
                          alt={item.product.node.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          🧴
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${item.product?.node?.slug}`}
                        className="font-body font-semibold text-brand-900 hover:text-brand-600 transition-colors line-clamp-1"
                      >
                        {item.product?.node?.name}
                      </Link>

                      <p className="mt-1 font-display text-lg font-bold text-brand-900">
                        {formatPrice(item.total)}
                      </p>

                      {/* Quantity controls */}
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center border border-brand-200 rounded-full">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.key,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            disabled={loading}
                            className="w-8 h-8 flex items-center justify-center text-brand-500 hover:bg-brand-50 rounded-l-full transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-brand-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.key, item.quantity + 1)
                            }
                            disabled={loading}
                            className="w-8 h-8 flex items-center justify-center text-brand-500 hover:bg-brand-50 rounded-r-full transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.key)}
                          disabled={loading}
                          className="p-2 text-brand-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border border-brand-100/50 sticky top-28">
                  <h2 className="font-display text-xl font-bold text-brand-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm font-body">
                    <div className="flex justify-between text-brand-700/70">
                      <span>Subtotal</span>
                      <span>{formatPrice(cart?.subtotal || "0")}</span>
                    </div>
                    {cart?.shippingTotal && cart.shippingTotal !== "$0.00" && (
                      <div className="flex justify-between text-brand-700/70">
                        <span>Shipping</span>
                        <span>{formatPrice(cart.shippingTotal)}</span>
                      </div>
                    )}
                    {cart?.totalTax && cart.totalTax !== "$0.00" && (
                      <div className="flex justify-between text-brand-700/70">
                        <span>Tax</span>
                        <span>{formatPrice(cart.totalTax)}</span>
                      </div>
                    )}
                    <div className="border-t border-brand-100 pt-3 flex justify-between font-display text-lg font-bold text-brand-900">
                      <span>Total</span>
                      <span>{formatPrice(cart?.total || "0")}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      href="/shop/checkout"
                      variant="primary"
                      className="w-full"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>

                  <Link
                    href="/shop"
                    className="block text-center mt-3 text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
