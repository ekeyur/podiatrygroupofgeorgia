"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Cart, WCStoreCart, WCStoreCartItem } from "@/types/wordpress";

interface CartContextType {
  cart: Cart | null;
  itemCount: number;
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (key: string, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Convert WC Store API cart response into the app-facing Cart shape.
 */
function transformStoreCart(raw: WCStoreCart): Cart {
  const minorUnit = raw.totals.currency_minor_unit;
  const formatPrice = (cents: string) => {
    const amount = parseInt(cents, 10) / Math.pow(10, minorUnit);
    return `$${amount.toFixed(2)}`;
  };

  return {
    contents: {
      itemCount: raw.items_count,
      nodes: raw.items.map((item: WCStoreCartItem) => {
        const itemMinor = item.totals.currency_minor_unit;
        const formatItemPrice = (cents: string) => {
          const amount = parseInt(cents, 10) / Math.pow(10, itemMinor);
          return `$${amount.toFixed(2)}`;
        };

        return {
          key: item.key,
          product: {
            node: {
              name: item.name,
              slug: item.slug,
              databaseId: item.id,
              image: item.images[0]
                ? { sourceUrl: item.images[0].src, altText: item.images[0].alt }
                : { sourceUrl: "", altText: "" },
            },
          },
          quantity: item.quantity,
          total: formatItemPrice(item.totals.line_total),
          subtotal: formatItemPrice(item.totals.line_subtotal),
        };
      }),
    },
    subtotal: formatPrice(raw.totals.total_items),
    total: formatPrice(raw.totals.total_price),
    shippingTotal: formatPrice(raw.totals.total_shipping),
    totalTax: formatPrice(raw.totals.total_tax),
    appliedCoupons: raw.coupons.map((c) => ({
      code: c.code,
      discountAmount: formatPrice(c.totals.total_discount),
    })),
    availableShippingMethods: raw.shipping_rates.map((group) => ({
      rates: group.shipping_rates.map((rate) => ({
        id: rate.rate_id,
        label: rate.name,
        cost: formatPrice(rate.price),
      })),
    })),
  };
}

/**
 * Helper to call the cart proxy API route.
 */
async function cartFetch<T = WCStoreCart>(
  method: "GET" | "POST",
  body?: Record<string, unknown>
): Promise<T> {
  const res = await fetch("/api/cart", {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Cart operation failed");
  }

  return data as T;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    try {
      const data = await cartFetch("GET");
      setCart(transformStoreCart(data));
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  }, []);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(
    async (productId: number, quantity = 1) => {
      setLoading(true);
      try {
        const data = await cartFetch("POST", {
          action: "add-item",
          id: productId,
          quantity,
        });
        setCart(transformStoreCart(data));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateQuantity = useCallback(
    async (key: string, quantity: number) => {
      setLoading(true);
      try {
        const data = await cartFetch("POST", {
          action: "update-item",
          key,
          quantity,
        });
        setCart(transformStoreCart(data));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const removeItem = useCallback(
    async (key: string) => {
      setLoading(true);
      try {
        const data = await cartFetch("POST", {
          action: "remove-item",
          key,
        });
        setCart(transformStoreCart(data));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const applyCoupon = useCallback(
    async (code: string) => {
      setLoading(true);
      try {
        const data = await cartFetch("POST", {
          action: "apply-coupon",
          code,
        });
        setCart(transformStoreCart(data));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const itemCount = cart?.contents?.itemCount ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        applyCoupon,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
