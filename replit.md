# Wood's Plumbing Enterprises LLC - Complete SSR Website

### Overview
This Next.js Server-Side Rendered (SSR) website for Wood's Plumbing Enterprises LLC aims to establish a robust online presence for a licensed plumbing contractor in Southern Arizona. The project focuses on comprehensive SEO, dynamic content delivery, and a modern, conversion-optimized design to generate leads and serve as a central information hub for both human users and AI search agents. Its core purpose is to drive business growth through an enhanced digital footprint.

### User Preferences
- Mobile-first responsive design
- Clean, professional UI with Tailwind CSS
- Comprehensive SEO optimization
- All content generated (no placeholders)
- Database-backed features for scalability

### System Architecture
The website is built with Next.js 15.2.3, TypeScript, Tailwind CSS, shadcn/ui components, and a custom navy/copper design system. Data persistence is managed using PostgreSQL with Drizzle ORM.

**UI/UX Decisions:**
- Professional and warm design with navy blue and copper accents.
- Integration of high-quality, including AI-generated, imagery.
- Modern UI components like a sticky EmergencyBanner, two-tier Header, full-width Hero, animated Service Cards, and glassmorphism location cards.
- Dual Call-to-Action (CTA) strategy (phone calls + online scheduling) for high conversion.
- Strategic placement of trust signals and social proof.
- Emphasis on clean aesthetics, modern spacing, and smooth transitions.

**Technical Implementations:**
- **Dynamic Page Generation (SSG):** Service pages, location pages, and blog posts are pre-rendered at build time from JSON data.
- **SEO & AISO Optimization:**
    - Traditional SEO: Canonical URLs, Open Graph, Twitter Cards, dynamic XML sitemap, custom 404, and Schema.org BreadcrumbList.
    - AI Search Optimization: `robots.txt` configured for major AI bots, AI-optimized Knowledge Base, and an `llms.txt` file for structured site overview.
    - Extensive Schema.org markup (LocalBusiness, Service, FAQPage, BlogPosting, Organization, WebSite, Reviews) using helper functions.
- **Contact Form System:** PostgreSQL database storage, database-backed rate limiting, Zod validation, and React Hook Form integration.
- **Performance:** Next.js Image component (AVIF/WebP), preconnect hints, gzip compression, and `next/font` optimization.
- **Legacy URL Preservation:** An alias system for services and locations, with canonical URLs, to maintain SEO value during migration.
- **SEO Content Expansion:** All 66 service pages feature unique, SEO-optimized content (1,600+ words each) with detailed descriptions, benefits, process steps, FAQs, and Arizona-specific context.
- **GDPR/CCPA Compliance:** Comprehensive Privacy Policy and Terms of Use pages, and a GDPR-compliant Cookie Consent Banner with `gtag` consent mode for Google Analytics.
- **AI Search Optimization Enhancements:** Global meta robots tag, enhanced BlogPosting schema with author and publisher details, Blog Post BreadcrumbList JSON-LD, Blog Post FAQ Schema with answer-style content, and semantic HTML5 for structured data extraction on service pages.
- **Conversion Optimization:** Google Reviews Widget, Floating Lead Form, Quick Lead Form, honeypot anti-spam, ServiceTitan DNI for call tracking, and ServiceTitan Scheduling Pro integration with multiple "Schedule" button placements across the site.
- **Local SEO Expansion:** 5 priority location pages targeting 54 service keywords each, with custom meta tags, Markdown content rendering, and inclusion of local neighborhoods and service highlights.
- **Email Notification System:** SMTP email via Google Workspace for form submissions with professional HTML templates, ensuring non-blocking asynchronous delivery.
- **Centralized Data Management:** All business constants and dynamic data are stored in `lib/constants.ts` and JSON files to prevent hardcoding.

### External Dependencies
- **Database:** PostgreSQL (with Drizzle ORM)
- **Styling Frameworks:** Tailwind CSS, shadcn/ui
- **Analytics:** Google Analytics 4
- **Form Management:** React Hook Form, Zod
- **Scheduling/CRM:** ServiceTitan (for DNI and Scheduling Pro)
- **Deployment:** Replit's deployment tools