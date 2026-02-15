import { fetchWP } from "./wp-client";
import { getGoogleReviews } from "./google-reviews";
import {
  FALLBACK_SERVICES,
  FALLBACK_TEAM_MEMBERS,
  MOCK_TESTIMONIALS,
  MOCK_HOMEPAGE,
} from "./mock-data";
import type {
  Page,
  Service,
  TeamMember,
  Testimonial,
  Post,
  SimpleProduct,
  ProductCategory,
  MenuItem,
  SiteSettings,
  SEO,
  WPImage,
  WPRawPost,
  WPRawPage,
  WPRawYoast,
  WPRawMenuItem,
  WCStoreProduct,
  WCStoreCategory,
} from "@/types/wordpress";

// ============================================
// Transformers — map REST API shapes to app types
// ============================================

/**
 * Rewrite absolute WordPress upload URLs to relative paths so images
 * are proxied through Next.js rewrites, avoiding Cloudflare hotlink 403s.
 */
function proxyWpImages(html: string): string {
  return html.replace(
    /https?:\/\/(?:www\.)?podiatrygroupofgeorgia\.com\/wp-content\/uploads\//g,
    "/wp-content/uploads/"
  );
}

function proxyImageUrl(url: string): string {
  return url.replace(
    /^https?:\/\/(?:www\.)?podiatrygroupofgeorgia\.com\/wp-content\/uploads\//,
    "/wp-content/uploads/"
  );
}

function transformSEO(yoast?: WPRawYoast): SEO {
  return {
    title: yoast?.title ?? "",
    metaDesc: yoast?.description ?? "",
    canonical: yoast?.canonical,
    opengraphTitle: yoast?.og_title,
    opengraphDescription: yoast?.og_description,
    opengraphImage: yoast?.og_image?.[0]
      ? { sourceUrl: yoast.og_image[0].url }
      : undefined,
  };
}

function transformFeaturedImage(
  embedded?: WPRawPage["_embedded"]
): { node: WPImage } | undefined {
  const media = embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return undefined;
  return {
    node: {
      sourceUrl: proxyImageUrl(media.source_url),
      altText: media.alt_text ?? "",
    },
  };
}

function transformACFImage(
  img: any
): WPImage {
  if (!img) return { sourceUrl: "", altText: "" };
  // ACF REST API returns image as an object with url/alt or as a URL string
  if (typeof img === "string") return { sourceUrl: proxyImageUrl(img), altText: "" };
  return {
    sourceUrl: proxyImageUrl(img.url ?? img.source_url ?? ""),
    altText: img.alt ?? img.alt_text ?? "",
  };
}

function transformPage(raw: WPRawPage): Page {
  const acf = raw.acf ? { ...raw.acf } : undefined;

  // Transform ACF image fields if they exist
  if (acf?.hero_image) {
    acf.heroImage = transformACFImage(acf.hero_image);
    delete acf.hero_image;
  }
  if (acf?.hero_headline) {
    acf.heroHeadline = acf.hero_headline;
    delete acf.hero_headline;
  }
  if (acf?.hero_subtext) {
    acf.heroSubtext = acf.hero_subtext;
    delete acf.hero_subtext;
  }
  if (acf?.hero_cta) {
    acf.heroCta = acf.hero_cta;
    delete acf.hero_cta;
  }

  return {
    title: raw.title.rendered,
    content: proxyWpImages(raw.content.rendered),
    slug: raw.slug,
    featuredImage: transformFeaturedImage(raw._embedded),
    acf,
    seo: transformSEO(raw.yoast_head_json),
  };
}

function transformPost(raw: WPRawPost): Post {
  const author = raw._embedded?.author?.[0];
  const categories = raw._embedded?.["wp:term"]?.[0] ?? [];

  return {
    title: raw.title.rendered,
    slug: raw.slug,
    content: proxyWpImages(raw.content.rendered),
    excerpt: raw.excerpt.rendered,
    date: raw.date,
    modified: raw.modified,
    featuredImage: transformFeaturedImage(raw._embedded),
    categories: {
      nodes: categories.map((c: any) => ({ name: c.name, slug: c.slug })),
    },
    author: {
      node: {
        name: author?.name ?? "",
        avatar: author?.avatar_urls
          ? { url: Object.values(author.avatar_urls).pop() as string }
          : undefined,
      },
    },
    seo: transformSEO(raw.yoast_head_json),
  };
}

/**
 * Convert WC Store API cents string to formatted price.
 * Store API returns prices in minor units (e.g. "1999" = $19.99).
 */
function formatStorePrice(cents: string, minorUnit = 2): string {
  const amount = parseInt(cents, 10) / Math.pow(10, minorUnit);
  return `$${amount.toFixed(2)}`;
}

function transformStoreProduct(raw: WCStoreProduct): SimpleProduct {
  const minorUnit = raw.prices.currency_minor_unit;
  return {
    id: String(raw.id),
    databaseId: raw.id,
    name: raw.name,
    slug: raw.slug,
    type: raw.type,
    description: raw.description,
    shortDescription: raw.short_description,
    price: formatStorePrice(raw.prices.price, minorUnit),
    regularPrice: formatStorePrice(raw.prices.regular_price, minorUnit),
    salePrice: raw.prices.sale_price
      ? formatStorePrice(raw.prices.sale_price, minorUnit)
      : null,
    onSale: raw.on_sale,
    stockStatus: raw.is_in_stock ? "IN_STOCK" : "OUT_OF_STOCK",
    stockQuantity: raw.stock_quantity,
    image: raw.images[0]
      ? { sourceUrl: raw.images[0].src, altText: raw.images[0].alt }
      : { sourceUrl: "", altText: "" },
    galleryImages: raw.images.length > 1
      ? {
          nodes: raw.images.slice(1).map((img) => ({
            sourceUrl: img.src,
            altText: img.alt,
          })),
        }
      : undefined,
    productCategories: {
      nodes: raw.categories.map((c) => ({ name: c.name, slug: c.slug })),
    },
    reviews: {
      nodes: [],
      averageRating: parseFloat(raw.average_rating) || 0,
    },
    seo: { title: raw.name, metaDesc: "" },
  };
}

function transformStoreCategory(raw: WCStoreCategory): ProductCategory {
  return {
    name: raw.name,
    slug: raw.slug,
    count: raw.count,
    image: raw.image
      ? { sourceUrl: raw.image.src, altText: raw.image.alt ?? "" }
      : undefined,
  };
}

function transformMenuItem(
  raw: WPRawMenuItem,
  allItems: WPRawMenuItem[],
  siteUrl: string
): MenuItem {
  const children = allItems.filter((item) => item.parent === raw.id);
  const path = raw.url.replace(siteUrl, "") || "/";

  return {
    id: String(raw.id),
    label: raw.title.rendered,
    url: raw.url,
    path,
    parentId: raw.parent ? String(raw.parent) : null,
    childItems: {
      nodes: children.map((child) =>
        transformMenuItem(child, allItems, siteUrl)
      ),
    },
  };
}

// ============================================
// Service Page Mapping (frontend slug → WP page slug)
// ============================================

const SERVICE_PAGE_MAP: Record<
  string,
  { wpSlug: string; title: string; shortDescription: string }
> = {
  "laser-pain-relief": {
    wpSlug: "laser-therapy-for-pain-relief-and-healing",
    title: "Laser Pain Relief & Healing",
    shortDescription:
      "Class 4 laser therapy to reduce inflammation, accelerate tissue repair, and relieve chronic foot and ankle pain.",
  },
  "clearly-beautiful-nails": {
    wpSlug: "beautiful-nails",
    title: "Clearly Beautiful Nails",
    shortDescription:
      "Painless Q-Clear laser treatment to eliminate toenail fungus — results in as little as one session.",
  },
  "foot-surgery": {
    wpSlug: "surgery",
    title: "Foot Surgery",
    shortDescription:
      "Minimally invasive foot and ankle surgery for bunions, hammertoes, heel spurs, and more.",
  },
  "diabetic-foot-care": {
    wpSlug: "foot-pain",
    title: "Diabetic Foot Care",
    shortDescription:
      "Comprehensive diabetic foot care to prevent complications and protect your mobility.",
  },
  orthotics: {
    wpSlug: "treatment-diagnostics",
    title: "Custom Orthotics",
    shortDescription:
      "Precision-crafted custom orthotics to correct alignment and relieve foot pain.",
  },
};

function transformPageToService(
  raw: WPRawPage,
  frontendSlug: string,
  meta: (typeof SERVICE_PAGE_MAP)[string]
): Service {
  return {
    title: meta.title,
    slug: frontendSlug,
    content: proxyWpImages(raw.content.rendered),
    acf: {
      shortDescription: meta.shortDescription,
      icon: { sourceUrl: "", altText: "" },
      heroImage: { sourceUrl: "", altText: "" },
    },
    seo: transformSEO(raw.yoast_head_json),
  };
}

// ============================================
// Team Page Mapping (frontend slug → WP page slug)
// ============================================

const TEAM_PAGE_MAP: Record<
  string,
  { wpSlug: string; name: string; credentials: string; specialty: string; headshotUrl: string }
> = {
  "dr-delvadia": {
    wpSlug: "dr-delvadia",
    name: "Dr. Neha Delvadia",
    credentials: "DPM",
    specialty: "Podiatric Medicine & Surgery",
    headshotUrl:
      "https://www.podiatrygroupofgeorgia.com/wp-content/uploads/2024/04/1.jpg",
  },
};

function transformPageToTeamMember(
  raw: WPRawPage,
  frontendSlug: string,
  meta: (typeof TEAM_PAGE_MAP)[string]
): TeamMember {
  return {
    title: meta.name,
    slug: frontendSlug,
    content: proxyWpImages(raw.content.rendered),
    acf: {
      credentials: meta.credentials,
      specialty: meta.specialty,
      bio: proxyWpImages(raw.content.rendered),
      headshot: {
        sourceUrl: meta.headshotUrl,
        altText: meta.name,
      },
      acceptingPatients: true,
    },
    seo: transformSEO(raw.yoast_head_json),
  };
}

// ============================================
// Homepage
// ============================================
export async function getHomepageData() {
  const safeFetch = async <T>(
    fn: () => Promise<T>
  ): Promise<{ data: T; ok: true } | { ok: false }> => {
    try {
      const result = await fn();
      return { data: result, ok: true };
    } catch {
      return { ok: false };
    }
  };

  const [pageResult, servicesResult, teamResult, testimonialsResult, productsResult] =
    await Promise.all([
      safeFetch(async () => {
        const { data } = await fetchWP<WPRawPage[]>("/wp/v2/pages", { slug: "home", _embed: "true" }, { tags: ["homepage"] });
        return data[0] ? transformPage(data[0]) : null;
      }),
      safeFetch(() => getAllServices()),
      safeFetch(() => getAllTeamMembers()),
      safeFetch(() => getGoogleReviews()),
      safeFetch(async () => {
        const { data } = await fetchWP<WCStoreProduct[]>("/wc/store/v1/products", { per_page: 4, featured: true }, { tags: ["homepage", "products"] });
        return data.map(transformStoreProduct);
      }),
    ]);

  return {
    page: (pageResult.ok && pageResult.data) ? pageResult.data : MOCK_HOMEPAGE,
    services: servicesResult.ok ? servicesResult.data : FALLBACK_SERVICES,
    team: teamResult.ok ? teamResult.data : FALLBACK_TEAM_MEMBERS,
    testimonials: testimonialsResult.ok
      ? testimonialsResult.data
      : MOCK_TESTIMONIALS,
    products: productsResult.ok ? productsResult.data : [],
  };
}

// ============================================
// Pages
// ============================================
export async function getPage(slug: string) {
  try {
    const { data } = await fetchWP<WPRawPage[]>(
      "/wp/v2/pages",
      { slug, _embed: "true" },
      { tags: ["pages"] }
    );
    return data[0] ? transformPage(data[0]) : null;
  } catch {
    return null;
  }
}

/**
 * Fetch all published page slugs from WordPress for generateStaticParams.
 * Excludes slugs that already have dedicated Next.js routes.
 */
export async function getPageSlugs(): Promise<string[]> {
  const RESERVED_ROUTES = new Set([
    "about",
    "blog",
    "contact",
    "services",
    "shop",
    "spa",
    "team",
    "testimonials",
  ]);

  const slugs: string[] = [];
  let page = 1;
  let totalPages = 1;

  try {
    while (page <= totalPages) {
      const result = await fetchWP<WPRawPage[]>(
        "/wp/v2/pages",
        { per_page: 100, page, _fields: "slug,status", status: "publish" },
        { tags: ["pages"] }
      );
      for (const p of result.data) {
        if (!RESERVED_ROUTES.has(p.slug)) {
          slugs.push(p.slug);
        }
      }
      totalPages = result.totalPages ?? 1;
      page++;
    }
  } catch {
    // Return whatever we've collected so far
  }

  return slugs;
}

// ============================================
// Services (fetched from WP pages, not CPT)
// ============================================
export async function getAllServices(): Promise<Service[]> {
  const entries = Object.entries(SERVICE_PAGE_MAP);
  const wpSlugs = entries.map(([, meta]) => meta.wpSlug).join(",");

  try {
    const { data } = await fetchWP<WPRawPage[]>(
      "/wp/v2/pages",
      { slug: wpSlugs, per_page: entries.length, _embed: "true" },
      { tags: ["services"] }
    );

    // Build a lookup from WP slug to raw page
    const pageByWpSlug = new Map(data.map((p) => [p.slug, p]));

    return entries.map(([frontendSlug, meta]) => {
      const page = pageByWpSlug.get(meta.wpSlug);
      if (page) return transformPageToService(page, frontendSlug, meta);
      // Fallback for this specific service if page wasn't returned
      return FALLBACK_SERVICES.find((s) => s.slug === frontendSlug)!;
    });
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getService(slug: string): Promise<Service | null> {
  const meta = SERVICE_PAGE_MAP[slug];
  if (!meta) return FALLBACK_SERVICES.find((s) => s.slug === slug) ?? null;

  try {
    const { data } = await fetchWP<WPRawPage[]>(
      "/wp/v2/pages",
      { slug: meta.wpSlug, _embed: "true" },
      { tags: ["services"] }
    );
    if (data[0]) return transformPageToService(data[0], slug, meta);
    return FALLBACK_SERVICES.find((s) => s.slug === slug) ?? null;
  } catch {
    return FALLBACK_SERVICES.find((s) => s.slug === slug) ?? null;
  }
}

export async function getServiceSlugs(): Promise<string[]> {
  return Object.keys(SERVICE_PAGE_MAP);
}

// ============================================
// Team (fetched from WP pages, not CPT)
// ============================================
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const entries = Object.entries(TEAM_PAGE_MAP);
  const wpSlugs = entries.map(([, meta]) => meta.wpSlug).join(",");

  try {
    const { data } = await fetchWP<WPRawPage[]>(
      "/wp/v2/pages",
      { slug: wpSlugs, per_page: entries.length, _embed: "true" },
      { tags: ["team"] }
    );

    const pageByWpSlug = new Map(data.map((p) => [p.slug, p]));

    return entries.map(([frontendSlug, meta]) => {
      const page = pageByWpSlug.get(meta.wpSlug);
      if (page) return transformPageToTeamMember(page, frontendSlug, meta);
      return FALLBACK_TEAM_MEMBERS.find((m) => m.slug === frontendSlug)!;
    });
  } catch {
    return FALLBACK_TEAM_MEMBERS;
  }
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  const meta = TEAM_PAGE_MAP[slug];
  if (!meta) return FALLBACK_TEAM_MEMBERS.find((m) => m.slug === slug) ?? null;

  try {
    const { data } = await fetchWP<WPRawPage[]>(
      "/wp/v2/pages",
      { slug: meta.wpSlug, _embed: "true" },
      { tags: ["team"] }
    );
    if (data[0]) return transformPageToTeamMember(data[0], slug, meta);
    return FALLBACK_TEAM_MEMBERS.find((m) => m.slug === slug) ?? null;
  } catch {
    return FALLBACK_TEAM_MEMBERS.find((m) => m.slug === slug) ?? null;
  }
}

export async function getTeamSlugs(): Promise<string[]> {
  return Object.keys(TEAM_PAGE_MAP);
}

// ============================================
// Testimonials (Google Business Profile reviews)
// ============================================
export async function getAllTestimonials() {
  const reviews = await getGoogleReviews();
  return {
    testimonials: reviews.length > 0 ? reviews : MOCK_TESTIMONIALS,
    pageInfo: {
      hasNextPage: false,
      totalPages: 1,
      currentPage: 1,
    },
  };
}

// ============================================
// Blog
// ============================================
export async function getBlogPosts(perPage = 12, page = 1) {
  try {
    const result = await fetchWP<WPRawPost[]>(
      "/wp/v2/posts",
      { per_page: perPage, page, _embed: "true" },
      { tags: ["posts"] }
    );
    return {
      posts: result.data.map(transformPost),
      pageInfo: {
        hasNextPage: (result.totalPages ?? 1) > page,
        totalPages: result.totalPages ?? 1,
        currentPage: page,
      },
    };
  } catch {
    return {
      posts: [],
      pageInfo: { hasNextPage: false, totalPages: 1, currentPage: 1 },
    };
  }
}

export async function getPost(slug: string) {
  try {
    const { data } = await fetchWP<WPRawPost[]>(
      "/wp/v2/posts",
      { slug, _embed: "true" },
      { tags: ["posts"] }
    );
    return data[0] ? transformPost(data[0]) : null;
  } catch {
    return null;
  }
}

export async function getPostSlugs() {
  try {
    const { data } = await fetchWP<{ slug: string }[]>(
      "/wp/v2/posts",
      { per_page: 100, _fields: "slug" }
    );
    return data.map((n) => n.slug);
  } catch {
    return [];
  }
}

// ============================================
// Products
// ============================================
export async function getShopData(perPage = 20, page = 1) {
  try {
    const [productsResult, categoriesResult] = await Promise.all([
      fetchWP<WCStoreProduct[]>(
        "/wc/store/v1/products",
        { per_page: perPage, page },
        { tags: ["products"] }
      ),
      fetchWP<WCStoreCategory[]>(
        "/wc/store/v1/products/categories",
        { per_page: 50 },
        { tags: ["products"] }
      ),
    ]);

    return {
      products: productsResult.data.map(transformStoreProduct),
      categories: categoriesResult.data.map(transformStoreCategory),
      pageInfo: {
        hasNextPage: (productsResult.totalPages ?? 1) > page,
        totalPages: productsResult.totalPages ?? 1,
        currentPage: page,
      },
    };
  } catch {
    return {
      products: [],
      categories: [],
      pageInfo: { hasNextPage: false, totalPages: 1, currentPage: 1 },
    };
  }
}

export async function getProduct(slug: string) {
  try {
    const { data } = await fetchWP<WCStoreProduct[]>(
      "/wc/store/v1/products",
      { slug },
      { tags: ["products"] }
    );
    return data[0] ? transformStoreProduct(data[0]) : null;
  } catch {
    return null;
  }
}

export async function getProductSlugs() {
  try {
    const { data } = await fetchWP<WCStoreProduct[]>(
      "/wc/store/v1/products",
      { per_page: 100 }
    );
    return data.map((p) => p.slug);
  } catch {
    return [];
  }
}

// ============================================
// Navigation & Settings
// ============================================
export async function getMenu(location: string = "primary") {
  // WordPress REST API requires a menu ID or a registered location.
  // We'll try fetching from the menus endpoint by location.
  // If the WP REST Menus controller is registered (WP 5.9+), this works.
  // Fallback: fetch all menu-items and filter by menu slug.
  try {
    const { data: menus } = await fetchWP<{ id: number; slug: string }[]>(
      "/wp/v2/menus",
      {},
      { revalidate: 300 }
    );
    const menu = menus.find((m) => m.slug === location);
    if (!menu) return [];

    const { data: items } = await fetchWP<WPRawMenuItem[]>(
      "/wp/v2/menu-items",
      { menus: menu.id, per_page: 50 },
      { revalidate: 300 }
    );

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
    const topLevel = items.filter((item) => item.parent === 0);
    return topLevel.map((item) =>
      transformMenuItem(item, items, siteUrl)
    );
  } catch {
    return [];
  }
}

export async function getSiteSettings() {
  try {
    // ACF options pages expose their fields at /wp/v2/options (with ACF to REST API plugin)
    // or via a custom endpoint. We try the ACF options endpoint first.
    const { data } = await fetchWP<{ acf: SiteSettings }>(
      "/wp/v2/options",
      {},
      { revalidate: 300 }
    );
    return data.acf ?? null;
  } catch {
    // Fallback: try acf/v3/options endpoint
    try {
      const { data } = await fetchWP<Record<string, any>>(
        "/acf/v3/options/options",
        {},
        { revalidate: 300 }
      );
      if (!data.acf) return null;
      const acf = data.acf;
      return {
        phoneNumber: acf.phone_number ?? acf.phoneNumber ?? "",
        faxNumber: acf.fax_number ?? acf.faxNumber ?? "",
        address: acf.address ?? "",
        city: acf.city ?? "",
        state: acf.state ?? "",
        zipCode: acf.zip_code ?? acf.zipCode ?? "",
        officeHours: acf.office_hours ?? acf.officeHours ?? [],
        socialMedia: acf.social_media ?? acf.socialMedia ?? { facebook: "", instagram: "", twitter: "" },
        acceptedInsurances: (acf.accepted_insurances ?? acf.acceptedInsurances ?? []).map(
          (ins: any) => ({
            name: ins.name,
            logo: transformACFImage(ins.logo),
          })
        ),
        announcementBar: acf.announcement_bar ?? acf.announcementBar ?? { enabled: false, text: "", link: "" },
      } as SiteSettings;
    } catch {
      return null;
    }
  }
}
