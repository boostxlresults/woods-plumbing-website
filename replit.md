# Wood's Plumbing Enterprises LLC - Complete SSR Website

## Overview
This is a production-ready Next.js SSR website for Wood's Plumbing Enterprises LLC, a licensed plumbing contractor serving Southern Arizona since 1979. The website features comprehensive SEO optimization, dynamic content generation, and full database integration.

## Current State
- **Status**: Production-ready, fully tested and validated
- **Framework**: Next.js 15.2.3 with TypeScript
- **Styling**: Tailwind CSS 3.4.18 + shadcn/ui components
- **Database**: PostgreSQL with Drizzle ORM
- **Dev Server**: Running on port 5000
- **Total Pages**: 110+ (66 services + 22 locations + 22 blog posts + core pages)

## Project Structure
```
pages/
├── index.tsx                    # Homepage with hero, trust signals, services overview
├── services/
│   ├── index.tsx               # Services listing page
│   └── [slug].tsx              # Dynamic service pages (66 total)
├── locations/
│   ├── index.tsx               # Locations listing page
│   └── [slug].tsx              # Dynamic location pages (22 total)
├── blog/
│   ├── index.tsx               # Blog with category filtering
│   └── [slug].tsx              # Dynamic blog post pages (22 total)
├── contact.tsx                 # Contact form with database storage
├── knowledge-base.tsx          # AI-optimized knowledge base
├── about.tsx                   # About page
└── api/
    └── contact.ts              # Contact form API with rate limiting

src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Site header with navigation
│   │   └── Footer.tsx          # Site footer
│   └── ui/                     # shadcn/ui components (Button, Card, Input, etc.)
├── data/
│   ├── businessInfo.ts         # Business details and constants
│   ├── services.ts             # 66 services with SEO data
│   ├── locations.ts            # 22 locations with zip codes
│   └── blogPosts.ts            # 22 blog posts with content
└── lib/
    ├── db/
    │   ├── index.ts            # Database connection
    │   └── schema.ts           # Database schema (contacts, rate_limits)
    └── utils.ts                # Utility functions
```

## Key Features

### 1. Dynamic Page Generation (SSG)
- **66 Service Pages**: Generated via getStaticPaths/getStaticProps
- **22 Location Pages**: Zip code targeting with local SEO
- **22 Blog Posts**: Full content with category filtering
- All pages pre-rendered at build time for optimal performance

### 2. SEO Optimization
- Comprehensive Schema.org markup (LocalBusiness, Service, FAQPage, BlogPosting)
- Unique meta titles and descriptions for every page
- Structured data for rich search results
- Mobile-first responsive design

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
contacts:
- id, name, email, phone, service, location, message, createdAt, ipAddress

rate_limits:
- id, ipAddress, requestCount, resetTime

blogPosts:
- id, slug, title, excerpt, content, category, author, readTime, published, createdAt, updatedAt
```

## Business Information
- **Name**: Wood's Plumbing Enterprises LLC
- **Founded**: 1979 (46+ years)
- **Phone**: (520) 682-2233
- **License**: Arizona ROC 296386
- **Service Area**: Tucson & Southern Arizona (22 cities)
- **Rating**: BBB A+, 4.9 stars, 300+ reviews
- **Services**: 66 plumbing services across 6 categories
- **Hours**: 24/7 emergency service available

## Recent Changes
- **2025-11-19**: Complete website build
  - Generated all 66 service pages with SEO and Schema.org markup
  - Generated all 22 location pages with zip code targeting
  - Built blog system with 22 posts and category filtering
  - Implemented contact form with database storage and rate limiting
  - Created AI-optimized knowledge base page
  - Fixed React title tag warnings (using template strings)
  - Implemented production-ready database-backed rate limiting
  - Added comprehensive Schema.org markup across all pages
  - Configured Tailwind CSS and shadcn/ui components
  - Set up PostgreSQL database with Drizzle ORM
  - Validated all features with architect review

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
