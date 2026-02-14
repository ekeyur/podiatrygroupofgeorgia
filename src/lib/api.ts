import { fetchWP } from "./wp-client";
import {
  MOCK_SERVICES,
  MOCK_TEAM_MEMBERS,
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
  WPRawService,
  WPRawTeamMember,
  WPRawTestimonial,
  WPRawYoast,
  WPRawMenuItem,
  WCStoreProduct,
  WCStoreCategory,
} from "@/types/wordpress";

// ============================================
// Transformers — map REST API shapes to app types
// ============================================

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
      sourceUrl: media.source_url,
      altText: media.alt_text ?? "",
    },
  };
}

function transformACFImage(
  img: any
): WPImage {
  if (!img) return { sourceUrl: "", altText: "" };
  // ACF REST API returns image as an object with url/alt or as a URL string
  if (typeof img === "string") return { sourceUrl: img, altText: "" };
  return {
    sourceUrl: img.url ?? img.source_url ?? "",
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
    content: raw.content.rendered,
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
    content: raw.content.rendered,
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

function transformService(raw: WPRawService): Service {
  const acf = raw.acf ?? {};
  return {
    title: raw.title.rendered,
    slug: raw.slug,
    content: raw.content.rendered,
    acf: {
      shortDescription: acf.short_description ?? acf.shortDescription ?? "",
      icon: transformACFImage(acf.icon),
      heroImage: transformACFImage(acf.hero_image ?? acf.heroImage),
      relatedProducts: acf.related_products ?? acf.relatedProducts,
      faq: acf.faq,
      ctaText: acf.cta_text ?? acf.ctaText,
    },
    seo: transformSEO(raw.yoast_head_json),
  };
}

function transformTeamMember(raw: WPRawTeamMember): TeamMember {
  const acf = raw.acf ?? {};
  return {
    title: raw.title.rendered,
    slug: raw.slug,
    content: raw.content.rendered,
    acf: {
      credentials: acf.credentials ?? "",
      specialty: acf.specialty ?? "",
      bio: acf.bio ?? "",
      headshot: transformACFImage(acf.headshot),
      education: acf.education,
      certifications: acf.certifications,
      acceptingPatients: acf.accepting_patients ?? acf.acceptingPatients ?? false,
    },
    seo: transformSEO(raw.yoast_head_json),
  };
}

function transformTestimonial(raw: WPRawTestimonial): Testimonial {
  const acf = raw.acf ?? {};
  return {
    content: raw.content.rendered,
    acf: {
      patientName: acf.patient_name ?? acf.patientName ?? "",
      rating: Number(acf.rating) || 5,
      source: acf.source ?? "",
      dateReceived: acf.date_received ?? acf.dateReceived,
    },
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
// Homepage
// ============================================
export async function getHomepageData() {
  const safeFetch = async <T>(
    fn: () => Promise<{ data: T }>
  ): Promise<{ data: T; ok: true } | { ok: false }> => {
    try {
      const result = await fn();
      return { data: result.data, ok: true };
    } catch {
      return { ok: false };
    }
  };

  const [pageResult, servicesResult, teamResult, testimonialsResult, productsResult] =
    await Promise.all([
      safeFetch(() => fetchWP<WPRawPage[]>("/wp/v2/pages", { slug: "home", _embed: "true" }, { tags: ["homepage"] })),
      safeFetch(() => fetchWP<WPRawService[]>("/wp/v2/services", { per_page: 6, orderby: "menu_order", order: "asc" }, { tags: ["homepage", "services"] })),
      safeFetch(() => fetchWP<WPRawTeamMember[]>("/wp/v2/team", { per_page: 4 }, { tags: ["homepage", "team"] })),
      safeFetch(() => fetchWP<WPRawTestimonial[]>("/wp/v2/testimonials", { per_page: 5 }, { tags: ["homepage", "testimonials"] })),
      safeFetch(() => fetchWP<WCStoreProduct[]>("/wc/store/v1/products", { per_page: 4, featured: true }, { tags: ["homepage", "products"] })),
    ]);

  return {
    page: pageResult.ok && pageResult.data[0]
      ? transformPage(pageResult.data[0])
      : MOCK_HOMEPAGE,
    services: servicesResult.ok
      ? servicesResult.data.map(transformService)
      : MOCK_SERVICES,
    team: teamResult.ok
      ? teamResult.data.map(transformTeamMember)
      : MOCK_TEAM_MEMBERS,
    testimonials: testimonialsResult.ok
      ? testimonialsResult.data.map(transformTestimonial)
      : MOCK_TESTIMONIALS,
    products: productsResult.ok
      ? productsResult.data.map(transformStoreProduct)
      : [],
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

// ============================================
// Services
// ============================================
export async function getAllServices() {
  try {
    const { data } = await fetchWP<WPRawService[]>(
      "/wp/v2/services",
      { per_page: 50, orderby: "menu_order", order: "asc", _embed: "true" },
      { tags: ["services"] }
    );
    return data.map(transformService);
  } catch {
    return MOCK_SERVICES;
  }
}

export async function getService(slug: string) {
  try {
    const { data } = await fetchWP<WPRawService[]>(
      "/wp/v2/services",
      { slug, _embed: "true" },
      { tags: ["services"] }
    );
    return data[0] ? transformService(data[0]) : null;
  } catch {
    return MOCK_SERVICES.find((s) => s.slug === slug) ?? null;
  }
}

export async function getServiceSlugs() {
  try {
    const { data } = await fetchWP<{ slug: string }[]>(
      "/wp/v2/services",
      { per_page: 100, _fields: "slug" }
    );
    return data.map((n) => n.slug);
  } catch {
    return MOCK_SERVICES.map((s) => s.slug);
  }
}

// ============================================
// Team
// ============================================
export async function getAllTeamMembers() {
  try {
    const { data } = await fetchWP<WPRawTeamMember[]>(
      "/wp/v2/team",
      { per_page: 20, _embed: "true" },
      { tags: ["team"] }
    );
    return data.map(transformTeamMember);
  } catch {
    return MOCK_TEAM_MEMBERS;
  }
}

export async function getTeamMember(slug: string) {
  try {
    const { data } = await fetchWP<WPRawTeamMember[]>(
      "/wp/v2/team",
      { slug, _embed: "true" },
      { tags: ["team"] }
    );
    return data[0] ? transformTeamMember(data[0]) : null;
  } catch {
    return MOCK_TEAM_MEMBERS.find((m) => m.slug === slug) ?? null;
  }
}

export async function getTeamSlugs() {
  try {
    const { data } = await fetchWP<{ slug: string }[]>(
      "/wp/v2/team",
      { per_page: 100, _fields: "slug" }
    );
    return data.map((n) => n.slug);
  } catch {
    return MOCK_TEAM_MEMBERS.map((m) => m.slug);
  }
}

// ============================================
// Testimonials
// ============================================
export async function getAllTestimonials(perPage = 20, page = 1) {
  try {
    const result = await fetchWP<WPRawTestimonial[]>(
      "/wp/v2/testimonials",
      { per_page: perPage, page },
      { tags: ["testimonials"] }
    );
    return {
      testimonials: result.data.map(transformTestimonial),
      pageInfo: {
        hasNextPage: (result.totalPages ?? 1) > page,
        totalPages: result.totalPages ?? 1,
        currentPage: page,
      },
    };
  } catch {
    return {
      testimonials: MOCK_TESTIMONIALS,
      pageInfo: {
        hasNextPage: false,
        totalPages: 1,
        currentPage: 1,
      },
    };
  }
}

// ============================================
// Blog
// ============================================
export async function getBlogPosts(perPage = 10, page = 1) {
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
