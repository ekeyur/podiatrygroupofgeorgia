# Podiatry Group of Georgia — Next.js Frontend

A modern, headless WordPress + Next.js 14 site for [podiatrygroupofgeorgia.com](https://www.podiatrygroupofgeorgia.com).

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in environment variables
cp .env.local .env.local
# Edit .env.local with your WordPress GraphQL URL

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 14** (App Router, Server Components, ISR)
- **Tailwind CSS** (custom design system)
- **WPGraphQL** (headless WordPress CMS)
- **WooGraphQL** (headless WooCommerce)
- **Framer Motion** (animations)
- **TypeScript** (strict mode)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, services, team, testimonials, products |
| `/about` | About / Why Choose Us |
| `/services` | All services listing |
| `/services/[slug]` | Individual service detail |
| `/team` | All doctors |
| `/team/[slug]` | Doctor profile |
| `/shop` | Product listing |
| `/shop/[slug]` | Product detail |
| `/shop/cart` | Shopping cart |
| `/shop/checkout` | Checkout (placeholder) |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/spa` | Medical spa page |
| `/contact` | Contact form + office info |
| `/testimonials` | All patient testimonials |

## Deployment

Recommended: **Vercel**

```bash
npm run build
# Deploy via Vercel CLI or GitHub integration
```

WordPress stays on separate hosting at `cms.podiatrygroupofgeorgia.com`.

## License

Private — Podiatry Group of Georgia
