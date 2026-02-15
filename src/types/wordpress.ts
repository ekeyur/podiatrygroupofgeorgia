// ============================================
// WordPress Core Types
// ============================================

export interface WPImage {
  sourceUrl: string;
  altText: string;
}

export interface SEO {
  title: string;
  metaDesc: string;
  canonical?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: { sourceUrl: string };
}

// ============================================
// Pages
// ============================================

export interface Page {
  title: string;
  content: string;
  slug: string;
  featuredImage?: { node: WPImage };
  acf?: Record<string, any>;
  seo: SEO;
}

export interface HomepageACF {
  heroHeadline: string;
  heroSubtext: string;
  heroImage: WPImage;
  heroCta?: { url: string; title: string };
}

// ============================================
// Services
// ============================================

export interface Service {
  title: string;
  slug: string;
  content: string;
  acf: {
    shortDescription: string;
    icon: WPImage;
    heroImage: WPImage;
    relatedProducts?: SimpleProduct[];
    faq?: { question: string; answer: string }[];
    ctaText?: string;
  };
  seo: SEO;
}

// ============================================
// Team
// ============================================

export interface TeamMember {
  title: string;
  slug: string;
  content: string;
  acf: {
    credentials: string;
    specialty: string;
    bio: string;
    headshot: WPImage;
    education?: { school: string; degree: string; year: string }[];
    certifications?: { name: string }[];
    acceptingPatients: boolean;
  };
  seo: SEO;
}

// ============================================
// Testimonials
// ============================================

export interface Testimonial {
  content: string;
  acf: {
    patientName: string;
    rating: number;
    source: string;
    dateReceived?: string;
    relativeTime?: string;
    photoUrl?: string;
    googleMapsUri?: string;
  };
}

// ============================================
// Blog
// ============================================

export interface Post {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage?: { node: WPImage };
  categories: { nodes: { name: string; slug: string }[] };
  author: { node: { name: string; avatar?: { url: string } } };
  seo: SEO;
}

// ============================================
// WooCommerce Products
// ============================================

export interface SimpleProduct {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  type: string;
  description: string;
  shortDescription: string;
  price: string;
  regularPrice: string;
  salePrice: string | null;
  onSale: boolean;
  stockStatus: string;
  stockQuantity: number | null;
  image: WPImage;
  galleryImages?: { nodes: WPImage[] };
  productCategories: { nodes: { name: string; slug: string }[] };
  related?: { nodes: SimpleProduct[] };
  reviews?: {
    nodes: ProductReview[];
    averageRating: number;
  };
  seo: SEO;
}

export interface VariableProduct extends SimpleProduct {
  variations: {
    nodes: ProductVariation[];
  };
}

export interface ProductVariation {
  id: string;
  databaseId: number;
  name: string;
  price: string;
  regularPrice: string;
  salePrice: string | null;
  stockStatus: string;
  attributes: { nodes: { name: string; value: string }[] };
}

export interface ProductCategory {
  name: string;
  slug: string;
  count: number;
  image?: WPImage;
}

export interface ProductReview {
  content: string;
  date: string;
  author: { node: { name: string } };
  rating: number;
}

// ============================================
// Cart
// ============================================

export interface CartItem {
  key: string;
  product: {
    node: {
      name: string;
      slug: string;
      image: WPImage;
      databaseId: number;
    };
  };
  quantity: number;
  total: string;
  subtotal: string;
}

export interface Cart {
  contents: {
    itemCount: number;
    nodes: CartItem[];
  };
  subtotal: string;
  total: string;
  shippingTotal: string;
  totalTax: string;
  appliedCoupons: { code: string; discountAmount: string }[];
  availableShippingMethods: {
    rates: { id: string; label: string; cost: string }[];
  }[];
}

// ============================================
// Navigation
// ============================================

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
  childItems: { nodes: MenuItem[] };
}

// ============================================
// Site Settings
// ============================================

export interface SiteSettings {
  phoneNumber: string;
  faxNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  officeHours: { day: string; open: string; close: string }[];
  socialMedia: { facebook: string; instagram: string; twitter: string };
  acceptedInsurances: { name: string; logo: WPImage }[];
  announcementBar: { enabled: boolean; text: string; link: string };
}

// ============================================
// Raw REST API Response Types (internal)
// ============================================

export interface WPRawRendered {
  rendered: string;
}

export interface WPRawPost {
  id: number;
  slug: string;
  title: WPRawRendered;
  content: WPRawRendered;
  excerpt: WPRawRendered;
  date: string;
  modified: string;
  acf?: Record<string, any>;
  yoast_head_json?: WPRawYoast;
  _embedded?: {
    author?: { name: string; avatar_urls?: Record<string, string> }[];
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
    "wp:term"?: { name: string; slug: string }[][];
  };
}

export interface WPRawPage {
  id: number;
  slug: string;
  title: WPRawRendered;
  content: WPRawRendered;
  acf?: Record<string, any>;
  yoast_head_json?: WPRawYoast;
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
  };
}

export interface WPRawService {
  id: number;
  slug: string;
  title: WPRawRendered;
  content: WPRawRendered;
  acf?: Record<string, any>;
  yoast_head_json?: WPRawYoast;
}

export interface WPRawTeamMember {
  id: number;
  slug: string;
  title: WPRawRendered;
  content: WPRawRendered;
  acf?: Record<string, any>;
  yoast_head_json?: WPRawYoast;
}

export interface WPRawTestimonial {
  id: number;
  content: WPRawRendered;
  acf?: Record<string, any>;
}

export interface WPRawYoast {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_image?: { url: string }[];
}

export interface WCStoreProduct {
  id: number;
  name: string;
  slug: string;
  type: string;
  description: string;
  short_description: string;
  permalink: string;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_code: string;
    currency_minor_unit: number;
  };
  images: { id: number; src: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  on_sale: boolean;
  is_in_stock: boolean;
  stock_quantity: number | null;
  average_rating: string;
  review_count: number;
}

export interface WCStoreCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  image?: { src: string; alt: string };
}

export interface WCStoreCart {
  items: WCStoreCartItem[];
  items_count: number;
  totals: {
    total_items: string;
    total_price: string;
    total_shipping: string;
    total_tax: string;
    currency_code: string;
    currency_minor_unit: number;
  };
  coupons: { code: string; totals: { total_discount: string } }[];
  shipping_rates: {
    shipping_rates: { rate_id: string; name: string; price: string }[];
  }[];
}

export interface WCStoreCartItem {
  key: string;
  id: number;
  name: string;
  slug: string;
  quantity: number;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_minor_unit: number;
  };
  totals: {
    line_subtotal: string;
    line_total: string;
    currency_minor_unit: number;
  };
  images: { id: number; src: string; alt: string }[];
}

export interface WPRawMenuItem {
  id: number;
  title: WPRawRendered;
  url: string;
  menu_order: number;
  parent: number;
  menus: number[];
}
