# CLAUDE.md — Podiatry Group of Georgia

## Project Overview
This is a **headless WordPress + Next.js 16** site for the Podiatry Group of Georgia (podiatrygroupofgeorgia.com). WordPress serves as the CMS via the REST API (`/wp-json/`), and this Next.js app is the frontend.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 3.4 with custom theme
- **CMS:** WordPress (headless) via REST API
- **E-Commerce:** WooCommerce via WC Store API
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

## Architecture

### Data Flow
```
WordPress (www.podiatrygroupofgeorgia.com)
  └─ REST API: /wp-json/wp/v2/* (posts, pages, CPTs)
  └─ WC Store API: /wp-json/wc/store/v1/* (products, cart)
      └─ Next.js fetches via src/lib/wp-client.ts
          └─ Typed API functions + transformers in src/lib/api.ts
              └─ Used in page components (server components)
```

### Key Directories
- `src/app/` — Next.js App Router pages
- `src/components/` — React components (ui, layout, home, shop, etc.)
- `src/lib/` — REST API client, API functions, utils
- `src/types/` — TypeScript type definitions (app-facing + raw REST types)
- `src/context/` — React context providers (CartContext)

### WordPress Custom Post Types
The WordPress backend has these CPTs registered (must have `show_in_rest => true`):
- `service` → REST base: `services`
- `team_member` → REST base: `team`
- `testimonial` → REST base: `testimonials`

Each has ACF fields exposed via "Show in REST API" on the field group. See `src/types/wordpress.ts` for the full field structure.

### E-Commerce
Products come from WooCommerce via the WC Store API (`/wc/store/v1/`). Cart state is managed client-side in `src/context/CartContext.tsx` using the `Cart-Token` header for cross-origin session persistence. Checkout page is a placeholder — needs Stripe integration.

## Important Files
| File | Purpose |
|------|---------|
| `src/lib/wp-client.ts` | REST API fetcher (server `fetchWP` + client `clientFetchWP`) |
| `src/lib/api.ts` | Typed data-fetching functions + REST→app type transformers |
| `src/context/CartContext.tsx` | Client-side cart state via WC Store API |
| `src/types/wordpress.ts` | App-facing types + raw REST/WC Store API response types |
| `src/app/layout.tsx` | Root layout with Navbar, Footer, CartProvider |
| `tailwind.config.js` | Custom theme: brand colors (teal), gold accent, fonts |

## Design System
- **Primary color:** Deep teal (`brand-500: #0D7377`)
- **Accent:** Warm gold (`gold-400: #D4A843`)
- **Background:** Cream (`cream-50: #FEFCF8`)
- **Display font:** Playfair Display (serif, for headings)
- **Body font:** DM Sans (sans-serif, for body text)
- **Corners:** `rounded-2xl` for cards, `rounded-full` for buttons
- **Shadows:** `shadow-brand-500/25` tinted shadows on CTAs

## Environment Variables
Copy `.env.local` and fill in:
```
WORDPRESS_API_URL=https://www.podiatrygroupofgeorgia.com/wp-json
NEXT_PUBLIC_WP_API_URL=https://www.podiatrygroupofgeorgia.com/wp-json
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_SITE_URL=https://www.podiatrygroupofgeorgia.com
REVALIDATION_SECRET=
```

## Development Commands
```bash
npm install        # Install dependencies
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm run lint       # Run ESLint
```

## Common Tasks

### Add a new page
1. Create `src/app/your-page/page.tsx`
2. Add a fetcher function in `src/lib/api.ts` using `fetchWP()`
3. Add raw response types + transformer in `src/lib/api.ts` if needed
4. Add/update types in `src/types/wordpress.ts` if needed

### Add a new component
1. Create in `src/components/{section}/ComponentName.tsx`
2. Mark `"use client"` at top if it needs interactivity or hooks
3. Server components are the default — prefer them when possible

### Modify the design
- Colors: `tailwind.config.js` → `theme.extend.colors`
- Fonts: `tailwind.config.js` → `theme.extend.fontFamily`
- Global styles: `src/app/globals.css`

### Add a new REST API endpoint
1. Add a typed fetcher in `src/lib/api.ts` using `fetchWP("/wp/v2/endpoint", params)`
2. Add raw response types (prefixed `WPRaw*`) and a transformer function
3. Keep app-facing types unchanged — transformers bridge the gap

## What's Not Yet Implemented
- [ ] Stripe checkout integration (`src/app/shop/checkout/page.tsx` is a placeholder)
- [ ] Category filtering on shop page (UI exists, needs client-side state)
- [ ] Blog pagination (pageInfo is returned, needs "Load More" button)
- [ ] Contact form submission (needs CF7 or Gravity Forms API integration)
- [ ] WordPress draft preview mode
- [ ] Sitemap generation (`next-sitemap`)
- [ ] Search functionality
- [ ] 404 page customization
- [ ] Loading/skeleton states for dynamic pages
- [ ] Image optimization (placeholder blur images)

## WordPress Plugins Required
- Advanced Custom Fields PRO (with "Show in REST API" enabled on field groups)
- Custom Post Type UI (with `show_in_rest => true` on all CPTs)
- WooCommerce
- Yoast SEO (exposes `yoast_head_json` in REST responses automatically)
