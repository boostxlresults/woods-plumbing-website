# Wood's Plumbing - React to Next.js Migration

## Migration Overview

This project is being migrated from **React + Vite (CSR only)** to **Next.js (with SSR)** to meet the original specification requiring server-side rendering for SEO optimization.

## Original Project Specifications

- **Goal**: World-class SSR website for Wood's Plumbing Enterprises (Tucson/Marana plumbing company)
- **SEO Requirements**: Optimized for both AI search engines (ChatGPT, Perplexity, Claude) and traditional SEO
- **Scale**: MVP with 20-30 representative pages, architecture for eventual 250-500 pages
- **Content**: 66 services with individual SEO-optimized pages, 22 blog posts, comprehensive knowledge base

## Why Migration Was Needed

The original implementation used React + Vite which only supports **client-side rendering (CSR)**. The project specification explicitly required **server-side rendering (SSR)** for:
1. Improved SEO performance
2. Better initial page load times
3. AI search engine optimization
4. Social media preview generation

Attempts to add SSR to the Vite setup were blocked by protected configuration files in the Replit environment.

## Legacy Assets Carried Forward from React/Vite CSR

The following data assets were exported from the original React/Vite application (src/data):

1. **lib/data/services.json** - All 66 plumbing services with descriptions
2. **lib/data/locations.json** - 8 service area locations with zip codes
3. **lib/data/faqs.json** - 38 frequently asked questions
4. **lib/data/reviews.json** - 10 customer reviews with ratings
5. **lib/data/blog-posts.json** - 22 blog posts with full content

**Note**: The original CSR app stored these as TypeScript modules (src/data/services.ts, etc.) which were converted to JSON format for easier consumption in Next.js.

## New Next.js Infrastructure Created During Migration

The following server-side infrastructure was built specifically for the Next.js SSR implementation:

### Database Layer
- **lib/db/schema.ts** - Drizzle ORM schema for PostgreSQL (contact form, rate limiting)
- **lib/db/index.ts** - Database connection with Neon serverless driver

### Configuration & Constants
- **lib/constants.ts** - Centralized BUSINESS constant (relocated from src/data/businessInfo.ts and restructured)

### SEO & Structured Data
- **lib/seo/schemas.ts** - Schema.org JSON-LD helper functions (Organization, LocalBusiness, Service, FAQ, Breadcrumb, WebSite)

### Pages & Routing
- **pages/** - Next.js Pages Router with SSG (getStaticProps/getStaticPaths)
- **pages/api/** - API routes for contact form with rate limiting

**Rationale**: These additions enable SSR, structured data for SEO, and server-side features not possible in the CSR application.

## Original CSR Application Architecture

### Frontend-Only Stack
The original React/Vite application was **purely client-side** with no backend infrastructure:
- Static data modules in TypeScript (src/data/*.ts)
- Client-side routing with Wouter
- No database, no API layer, no server-side rendering
- All content rendered in the browser

### SEO Strategy (CSR Limitations)
- Basic meta tags for titles and descriptions
- No Schema.org structured data (impossible in CSR)
- No SSR for search engines or social media previews
- `/knowledge-base` page planned but not AI-optimized

### Design System (Preserved in Migration)
- Material Design inspired with mobile-first approach
- Trust indicators prominently displayed (46+ years, 4.9 rating, 300+ reviews, BBB A+)
- Focus on conversion optimization with clear CTAs
- shadcn/ui components with Tailwind CSS

## Technology Stack

### Original CSR App (Client-Side Only)
- **Frontend**: React 18+ with TypeScript
- **Routing**: Wouter (client-side routing)
- **Data**: Static TypeScript modules (src/data/*.ts)
- **UI**: shadcn/ui components with Tailwind CSS
- **Build Tool**: Vite
- **No Backend**: No server, no database, no API layer, no form handling

### New Next.js App (SSR + Server Features)
- **Framework**: Next.js 15 with Pages Router
- **Rendering**: SSR/SSG (getStaticProps, getStaticPaths) *(NEW)*
- **Database**: PostgreSQL (Neon) with Drizzle ORM *(NEW)*
- **API Layer**: Next.js API Routes *(NEW)*
- **SEO**: Schema.org structured data helpers *(NEW)*
- **Forms**: React Hook Form + Zod validation *(NEW)*
- **UI**: Same shadcn/ui + Tailwind CSS

## Next.js Implementation Notes

The Next.js version maintains all original features while adding SSR capabilities and comprehensive SEO:

### SSR Enhancements
1. **Pages Router** used for getStaticProps/getStaticPaths (SSG for all pages)
2. **Server-Side Rendering** for optimal SEO and initial page load
3. **Next.js Head** for dynamic meta tags per page
4. **API Routes** for contact form and data fetching

### New SEO Features Added During Migration
1. **Schema.org Structured Data** (`lib/seo/schemas.ts`):
   - `generateOrganizationSchema()` - Organization markup
   - `generateLocalBusinessSchema()` - LocalBusiness with zip code DefinedRegions
   - `generateServiceSchema()` - Service-specific markup
   - `generateWebSiteSchema()` - WebSite schema
   - `generateFAQSchema()` - FAQ page markup
   - `generateBreadcrumbSchema()` - Breadcrumb navigation
2. **Dynamic Meta Tags** - Unique titles/descriptions for every page
3. **Canonical URLs** - Proper URL canonicalization
4. **Open Graph Tags** - Social media preview optimization

## Business Information

- **Name**: Wood's Plumbing Enterprises LLC
- **Since**: 1979 (46+ years in business)
- **Phone**: (520) 682-2233
- **Service Area**: Tucson, Marana, Oro Valley, Catalina Foothills, and surrounding Southern Arizona communities
- **License**: AZ ROC 296386
- **Rating**: 4.9/5 with 300+ reviews

## Important Implementation Details

1. **Water Heater Certifications**: American, AO Smith, and ACT certified
2. **Hard Water Focus**: Tucson has 200-350 PPM hard water - water softeners are essential
3. **24/7 Emergency Service**: Prominent feature throughout site
4. **Mobile Optimization**: Sticky floating action buttons on mobile
5. **Trust Indicators**: Display throughout site for conversion optimization

## Contact Information for Production

- **Business Email**: info@woodsplumbingaz.com
- **Website**: https://woodsplumbingaz.com
- **Social Media**: Facebook, Instagram, Yelp, Google Business Profile

## Next Steps

1. Set up Next.js project with TypeScript
2. Install dependencies (Drizzle, PostgreSQL, shadcn/ui, etc.)
3. Import all data files
4. Implement database connection and seeding
5. Create page structure with SSR
6. Implement SEO metadata and Schema.org markup
7. Build out 66 service pages
8. Create blog system with 22 posts
9. Implement contact form with rate limiting
10. Test SSR rendering and SEO optimization
