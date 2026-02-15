import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const WP_API_URL = process.env.WORDPRESS_API_URL!;
const COOKIE_NAME = "wc_cart_token";

type CartAction =
  | "add-item"
  | "update-item"
  | "remove-item"
  | "apply-coupon"
  | "remove-coupon";

const VALID_ACTIONS: CartAction[] = [
  "add-item",
  "update-item",
  "remove-item",
  "apply-coupon",
  "remove-coupon",
];

async function wcFetch(endpoint: string, init: RequestInit) {
  const base = WP_API_URL.endsWith("/") ? WP_API_URL : WP_API_URL + "/";
  const url = `${base}wc/store/v1/cart${endpoint}`;

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { "Cart-Token": token } : {}),
  };

  const res = await fetch(url, {
    ...init,
    headers,
    cache: "no-store",
  });

  const data = await res.json();

  // Build the Next.js response
  const status = res.ok ? 200 : res.status;
  const response = NextResponse.json(data, { status });

  // Persist cart token from WC into an httpOnly cookie
  const newToken = res.headers.get("Cart-Token");
  if (newToken) {
    response.cookies.set(COOKIE_NAME, newToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return response;
}

/**
 * GET /api/cart — fetch current cart
 */
export async function GET() {
  return wcFetch("", { method: "GET" });
}

/**
 * POST /api/cart — perform a cart mutation
 * Body: { action: CartAction, ...payload }
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, ...payload } = body;

  if (!action || !VALID_ACTIONS.includes(action)) {
    return NextResponse.json(
      { message: `Invalid action. Must be one of: ${VALID_ACTIONS.join(", ")}` },
      { status: 400 }
    );
  }

  return wcFetch(`/${action}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
