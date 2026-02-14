"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { clientFetchWP } from "@/lib/wp-client";
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [cartToken, setCartToken] = useState<string | null>(null);

  // Load cart token from storage
  useEffect(() => {
    const token = localStorage.getItem("wc_cart_token");
    if (token) setCartToken(token);
  }, []);

  // Save cart token
  const saveToken = useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem("wc_cart_token", token);
      setCartToken(token);
    }
  }, []);

  const refreshCart = useCallback(async () => {
    try {
      const { data, cartToken: newToken } = await clientFetchWP<WCStoreCart>(
        "/wc/store/v1/cart",
        { cartToken: cartToken ?? undefined }
      );
      setCart(transformStoreCart(data));
      saveToken(newToken);
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  }, [cartToken, saveToken]);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(
    async (productId: number, quantity = 1) => {
      setLoading(true);
      try {
        const { data, cartToken: newToken } = await clientFetchWP<WCStoreCart>(
          "/wc/store/v1/cart/add-item",
          {
            method: "POST",
            body: { id: productId, quantity },
            cartToken: cartToken ?? undefined,
          }
        );
        setCart(transformStoreCart(data));
        saveToken(newToken);
      } catch (error) {
        console.error("Failed to add to cart:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [cartToken, saveToken]
  );

  const updateQuantity = useCallback(
    async (key: string, quantity: number) => {
      setLoading(true);
      try {
        const { data, cartToken: newToken } = await clientFetchWP<WCStoreCart>(
          "/wc/store/v1/cart/update-item",
          {
            method: "POST",
            body: { key, quantity },
            cartToken: cartToken ?? undefined,
          }
        );
        setCart(transformStoreCart(data));
        saveToken(newToken);
      } catch (error) {
        console.error("Failed to update cart:", error);
      } finally {
        setLoading(false);
      }
    },
    [cartToken, saveToken]
  );

  const removeItem = useCallback(
    async (key: string) => {
      setLoading(true);
      try {
        const { data, cartToken: newToken } = await clientFetchWP<WCStoreCart>(
          "/wc/store/v1/cart/remove-item",
          {
            method: "POST",
            body: { key },
            cartToken: cartToken ?? undefined,
          }
        );
        setCart(transformStoreCart(data));
        saveToken(newToken);
      } catch (error) {
        console.error("Failed to remove from cart:", error);
      } finally {
        setLoading(false);
      }
    },
    [cartToken, saveToken]
  );

  const applyCoupon = useCallback(
    async (code: string) => {
      setLoading(true);
      try {
        const { data, cartToken: newToken } = await clientFetchWP<WCStoreCart>(
          "/wc/store/v1/cart/apply-coupon",
          {
            method: "POST",
            body: { code },
            cartToken: cartToken ?? undefined,
          }
        );
        setCart(transformStoreCart(data));
        saveToken(newToken);
      } catch (error) {
        console.error("Failed to apply coupon:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [cartToken, saveToken]
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
