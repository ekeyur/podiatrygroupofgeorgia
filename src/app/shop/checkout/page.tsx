"use client";

import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
  // In production, integrate Stripe Elements here or redirect to WP checkout.
  // This is a placeholder to show the page structure.

  return (
    <>
      <section className="bg-brand-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-4xl font-bold text-white">
            Checkout
          </h1>
        </div>
      </section>

      <section className="py-12 bg-cream-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 border border-brand-100/50 text-center">
            <h2 className="font-display text-2xl font-bold text-brand-900 mb-2">
              Checkout Coming Soon
            </h2>
            <p className="text-brand-600 font-body mb-6">
              This checkout page will be integrated with Stripe for secure
              payment processing. For now, please call our office to place an
              order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="tel:4048063731" variant="primary">
                Call (404) 806-3731
              </Button>
              <Button href="/shop/cart" variant="outline">
                Back to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
