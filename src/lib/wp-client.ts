const WP_API_URL = process.env.WORDPRESS_API_URL!;
const PUBLIC_WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL!;

interface FetchWPOptions {
  revalidate?: number | false;
  tags?: string[];
}

interface FetchWPResult<T> {
  data: T;
  totalItems?: number;
  totalPages?: number;
}

/**
 * Server-side REST API fetcher with ISR support.
 * Builds a URL from the endpoint + query params and returns typed JSON.
 */
export async function fetchWP<T = any>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
  options?: FetchWPOptions
): Promise<FetchWPResult<T>> {
  // Ensure base URL ends with / so relative endpoints resolve correctly
  const base = WP_API_URL.endsWith("/") ? WP_API_URL : WP_API_URL + "/";
  const url = new URL(endpoint.replace(/^\//, ""), base);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }
  }

  const fetchOptions: RequestInit & { next?: any } = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  if (options?.revalidate !== undefined) {
    fetchOptions.next = { revalidate: options.revalidate };
  } else {
    fetchOptions.next = { revalidate: 60 };
  }

  if (options?.tags) {
    fetchOptions.next.tags = options.tags;
  }

  const res = await fetch(url.toString(), fetchOptions);

  if (!res.ok) {
    throw new Error(`WP REST API error: ${res.status} ${res.statusText} — ${url.pathname}`);
  }

  const data = await res.json();

  const totalItems = res.headers.get("X-WP-Total");
  const totalPages = res.headers.get("X-WP-TotalPages");

  return {
    data: data as T,
    totalItems: totalItems ? parseInt(totalItems, 10) : undefined,
    totalPages: totalPages ? parseInt(totalPages, 10) : undefined,
  };
}

/**
 * Client-side fetcher for WC Store API cart operations.
 * Uses Cart-Token header for cross-origin session persistence.
 */
export async function clientFetchWP<T = any>(
  endpoint: string,
  options?: {
    method?: string;
    body?: any;
    cartToken?: string;
  }
): Promise<{ data: T; cartToken: string | null }> {
  const url = `${PUBLIC_WP_API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options?.body) {
    headers["Content-Type"] = "application/json";
  }

  if (options?.cartToken) {
    headers["Cart-Token"] = options.cartToken;
  }

  const res = await fetch(url, {
    method: options?.method ?? "GET",
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`WC Store API error: ${res.status} — ${errorBody}`);
  }

  const data = await res.json();
  const cartToken = res.headers.get("Cart-Token");

  return { data: data as T, cartToken };
}
