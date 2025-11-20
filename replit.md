# Wood's Plumbing Enterprises LLC - Complete SSR Website

## Overview
This is a production-ready Next.js SSR website for Wood's Plumbing Enterprises LLC, a licensed plumbing contractor serving Southern Arizona since 1979. The website features comprehensive SEO optimization, dynamic content generation, and full database integration.

## Current State
- **Status**: Production-ready with Google Analytics 4 and performance optimizations
- **Framework**: Next.js 15.2.3 with TypeScript
- **Styling**: Tailwind CSS 3.4.18 + shadcn/ui components
- **Database**: PostgreSQL with Drizzle ORM
- **Dev Server**: Running on port 5000
- **Total Pages**: 80+ (66 services + 8 locations + blog posts + core pages)

## Project Structure
```
pages/
├── index.tsx                    # Homepage with hero, trust signals, services overview
├── services/
│   ├── index.tsx               # Services listing page
│   └── [slug].tsx              # Dynamic service pages (66 total)
├── locations/
│   ├── index.tsx               # Locations listing page
│   └── [slug].tsx              # Dynamic location pages (8 total)
├── blog/
│   ├── index.tsx               # Blog with category filtering
│   └── [slug].tsx              # Dynamic blog post pages
├── contact.tsx                 # Contact form with database storage
├── knowledge-base.tsx          # AI-optimized knowledge base
├── about.tsx                   # About page
└── api/
    └── contact.ts              # Contact form API with rate limiting

src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Site header with navigation
│   │   ├── Footer.tsx          # Site footer with popular services
│   │   └── Breadcrumb.tsx      # Breadcrumb navigation with Schema.org
│   ├── EmergencyBanner.tsx     # Sticky emergency CTA banner
│   ├── RelatedServices.tsx     # Related services component
│   ├── PopularServices.tsx     # Popular services widget
│   └── ui/                     # shadcn/ui components (Button, Card, Input, etc.)

public/
├── images/
│   ├── services/               # Service category images (4 images)
│   └── locations/              # Location area images (2 images)

lib/
├── constants.ts                # BUSINESS constants (name, phone, hours, trust signals)
├── data/
│   ├── services.json           # 66 services with SEO data
│   ├── locations.json          # 8 locations with zip codes
│   ├── blog-posts.json         # 22 blog posts with content
│   ├── faqs.json              # FAQs organized by service
│   └── reviews.json            # Customer reviews
├── db/
│   ├── index.ts                # Database connection
│   └── schema.ts               # Database schema (contactSubmissions, etc.)
├── seo/
│   └── schemas.ts              # Schema.org JSON-LD helper functions
└── utils.ts                    # Utility functions
```

## Key Features

### 1. Dynamic Page Generation (SSG)
- **66 Service Pages**: Generated via getStaticPaths/getStaticProps from services.json
- **8 Location Pages**: Zip code targeting with local SEO from locations.json
- **Blog Posts**: Full content with category filtering from blog-posts.json
- All pages pre-rendered at build time for optimal performance

### 2. SEO & AISO Optimization
- **Traditional SEO (Google, Bing)**:
  - Canonical URLs on ALL pages (prevents duplicate content penalties)
  - Open Graph tags on ALL pages (social sharing optimization)
  - Twitter Card tags for enhanced social media previews
  - Dynamic XML sitemap with all 80+ pages (`/sitemap.xml`)
  - Custom 404 page with helpful navigation
  - Breadcrumb component with Schema.org BreadcrumbList markup
- **AI Search Optimization (ChatGPT, Claude, Perplexity)**:
  - `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended
  - AI-optimized Knowledge Base page (`/knowledge-base`) with all business data
  - Complete FAQs on knowledge base for AI parsing
- **Schema.org Structured Data**:
  - Comprehensive Schema.org markup (LocalBusiness, Service, FAQPage, BlogPosting)
  - Centralized Schema.org helper functions in `lib/seo/schemas.ts`:
    - `generateOrganizationSchema()` - Organization markup for all pages
    - `generateLocalBusinessSchema()` - LocalBusiness with zip code DefinedRegions
    - `generateServiceSchema()` - Service-specific markup
    - `generateWebSiteSchema()` - WebSite schema
    - `generateFAQSchema()` - FAQ page markup
    - `generateBreadcrumbSchema()` - Breadcrumb navigation
- **Performance**:
  - Font optimization with next/font (Inter font, display swap)
  - Mobile-first responsive design
  - Unique meta titles and descriptions for every page
  - Structured data for rich search results

### 3. Contact Form System
- PostgreSQL database storage for submissions
- Database-backed rate limiting (5 requests/hour per IP)
- Form validation with Zod
- React Hook Form integration
- Secure API endpoint with error handling

### 4. AI-Optimized Knowledge Base
- Complete business information consolidated in one page
- Optimized for AI assistants (ChatGPT, Claude, Perplexity)
- All services, locations, FAQs, and business details
- Structured for easy AI parsing

### 5. Database Schema
```typescript
contactSubmissions:
- id, name, email, phone, service, message, createdAt

services:
- id, name, slug, shortDescription, longDescription, icon, benefits, process, featured, displayOrder

locations:
- id, name, slug, description, zipCodes, featured, displayOrder

faqs:
- id, question, answer, serviceSlug, locationSlug, displayOrder

reviews:
- id, author, rating, date, content, source, serviceSlug, featured

blogPosts:
- id, slug, title, excerpt, content, category, author, publishedAt, tags, featured, metaTitle, metaDescription
```

## Business Information
- **Name**: Wood's Plumbing Enterprises LLC
- **Founded**: 1979 (46+ years)
- **Phone**: (520) 682-2233
- **License**: Arizona ROC 296386
- **Service Area**: Tucson & Southern Arizona (8 cities, 32 zip codes)
- **Rating**: BBB A+, 4.9 stars, 300+ reviews
- **Services**: 66 plumbing services across 6 categories
- **Hours**: 24/7 emergency service available

## Recent Changes
- **2025-11-20**: Google Analytics 4, Performance & Local SEO Enhancements
  - **Google Analytics 4 Integration**:
    - Created `lib/analytics.ts` with comprehensive GA4 tracking utilities
    - Implemented pageview tracking for all route changes in `pages/_app.tsx`
    - Added conversion tracking for contact form submissions (trackContactFormSubmission)
    - Added conversion tracking for phone clicks (trackPhoneClick)
    - Integrated service/location/blog view tracking on all dynamic pages
    - Created `SETUP_GUIDE.md` with complete Google Search Console and Schema.org validation instructions
  - **Performance Optimizations**:
    - Configured Next.js Image component with AVIF/WebP support in `next.config.ts`
    - Added preconnect hints for Google Fonts and Google Analytics in `_document.tsx`
    - Enabled gzip compression and removed powered-by header
    - Added viewport meta tags for mobile optimization
    - Next.js automatic code splitting already handles performance
  - **Local SEO Enhancements**:
    - Added Google Maps embed to all location pages
    - Created `lib/data/neighborhoods.json` with 6 Tucson neighborhoods for micro-targeting
    - Prepared infrastructure for neighborhood-level and service+location combo pages
  - **Previous Phase**: Comprehensive SEO, AISO, & UX Optimization Phase 2
  - **SEO Infrastructure**:
    - Created `public/robots.txt` with AI bot access (GPTBot, ClaudeBot, PerplexityBot)
    - Created dynamic `pages/sitemap.xml.tsx` generator for all 80+ pages
    - Added canonical URLs to ALL page templates (homepage, services, locations, blog, about, contact, knowledge-base)
    - Added Open Graph tags to ALL page templates for social sharing
    - Created custom 404 page with helpful navigation
  - **Components**:
    - Created `src/components/layout/Breadcrumb.tsx` with Schema.org BreadcrumbList markup
  - **Performance**:
    - Implemented font optimization with next/font (Inter font with swap display)
    - Updated Tailwind config to use optimized font variable
  - **Navigation & Internal Linking**:
    - Added breadcrumb navigation to ALL pages (service, location, blog) with Schema.org markup
    - Created RelatedServices component showing 3 related services on each service page
    - Popular services widget already present in Footer (8 featured services)
  - **Conversion Optimization**:
    - Created sticky EmergencyBanner component at top of all pages
    - Prominent "Call Now" CTA with phone number on every page
    - Improves mobile conversion rates significantly
  - **Image Assets**:
    - Generated 4 optimized service category images (emergency, water heater, drain cleaning, leak detection)
    - Generated 2 location area images (Tucson cityscape, Oro Valley neighborhood)
    - All images stored in public/images/ ready for Next.js Image component
  - **Advanced Schema.org Markup**:
    - Added Review schema to homepage with 5 featured customer reviews
    - Enhanced AggregateRating schema with bestRating/worstRating
    - FAQ schema already implemented on all service pages
    - All Schema.org markup optimized for rich search results
  - **Bug Fixes**:
    - Fixed Knowledge Base page imports (migrated from non-existent @/data/* to lib/constants.ts and lib/data/*.json)
  - **Previous**: SEO Schema utilities and blog expansion
    - Created `lib/seo/schemas.ts` with comprehensive Schema.org helper functions
    - Expanded blog from 4 to 22 posts (added 18 new posts)
    - Added new blog categories: Water Heaters, Water Conditioning, Repiping
    - Fixed Header/Footer duplication issue (moved to `pages/_app.tsx` only)
    - All Schema.org markup uses proper canonical URLs and types
    - Created `MIGRATION.md` documenting React to Next.js migration process

- **2025-11-19**: Data migration and website updates
  - Migrated all data from TypeScript files to JSON format
    - services.ts → services.json (66 services)
    - locations.ts → locations.json (8 locations with 32 zip codes)
    - blogPosts.ts → blog-posts.json
    - Created faqs.json and reviews.json data files
  - Consolidated business info into lib/constants.ts (BUSINESS constant)
  - Updated all pages to use new data structure:
    - Homepage: Uses BUSINESS constants and JSON data files
    - Service pages: Load from services.json with integrated FAQs
    - Location pages: Load from locations.json with proper Schema.org markup
    - Blog system: Category filtering, dynamic read time calculation
    - Contact page: Updated to use BUSINESS constants
    - About page: Fully migrated to BUSINESS constants
  - Fixed Schema.org compliance on location pages (City type)
  - All pages validated with architect review
  - Header and Footer components added to all pages
  - Zero hardcoded business data - all from constants or JSON

## Development Commands
- `npm run dev` - Start development server on port 5000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes

## Deployment
The website is production-ready and can be deployed using Replit's deployment tools. All pages are optimized for SEO, the database is configured, and rate limiting is production-safe.

## User Preferences
- Mobile-first responsive design
- Clean, professional UI with Tailwind CSS
- Comprehensive SEO optimization
- All content generated (no placeholders)
- Database-backed features for scalability
