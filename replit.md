# Wood's Plumbing Enterprises LLC - Complete SSR Website

### Overview
This Next.js SSR website for Wood's Plumbing Enterprises LLC, a licensed plumbing contractor in Southern Arizona, focuses on comprehensive SEO, dynamic content, and a modern, conversion-focused design. Its purpose is to provide a robust online presence, generate leads, and serve as a central hub for all business information, optimized for both human users and AI search agents.

### User Preferences
- Mobile-first responsive design
- Clean, professional UI with Tailwind CSS
- Comprehensive SEO optimization
- All content generated (no placeholders)
- Database-backed features for scalability

### System Architecture
The website is built using Next.js 15.2.3 with TypeScript, styled with Tailwind CSS, shadcn/ui components, and a custom navy/copper design system. Typography uses Playfair Display for headings and Inter for body text. Data is managed via PostgreSQL with Drizzle ORM.

**UI/UX Decisions:**
- Professional & Warm design theme using navy blue and copper accents.
- High-quality imagery, including AI-generated stock photos.
- Modern component designs (e.g., sticky EmergencyBanner, two-tier Header, full-width Hero, animated Service Cards, glassmorphism location cards).
- Dual CTA strategy (phone calls + online scheduling) with prominent placement.
- Conversion optimization through strategic placement of trust signals and social proof.
- Clean white space, modern spacing, and smooth transitions for an enhanced user experience.

**Technical Implementations:**
- **Dynamic Page Generation (SSG):** 66 service pages, 8 location pages, and blog posts are pre-rendered at build time from JSON data files (`services.json`, `locations.json`, `blog-posts.json`).
- **SEO & AISO Optimization:**
    - **Traditional SEO:** Canonical URLs, Open Graph, Twitter Card tags, dynamic XML sitemap, custom 404 page, Schema.org BreadcrumbList markup.
    - **AI Search Optimization:** `robots.txt` configured for GPTBot, ClaudeBot, PerplexityBot, Google-Extended; AI-optimized Knowledge Base page (`/knowledge-base`) with FAQs for AI parsing.
    - **Schema.org Structured Data:** Comprehensive markup for LocalBusiness, Service, FAQPage, BlogPosting, Organization, WebSite, and Reviews, handled by helper functions in `lib/seo/schemas.ts`.
- **Contact Form System:** Features PostgreSQL database storage, database-backed rate limiting (5 requests/hour per IP), Zod validation, and React Hook Form integration.
- **AI-Optimized Knowledge Base:** Consolidates all business information, services, locations, and FAQs for easy AI parsing.
- **Performance:** Next.js Image component with AVIF/WebP support, preconnect hints, gzip compression, and font optimization with `next/font`.

**Feature Specifications:**
- **Homepage:** Hero section, trust signals, SEO-optimized About section, Comprehensive Services grid, How We Work process, and value propositions.
- **Service Pages:** Dynamic content for 66 services, with related services components.
- **Location Pages:** Dynamic content for 8 locations with zip code targeting and Google Maps embeds.
- **Blog:** Category filtering and dynamic post pages.
- **FAQ Page:** SEO-optimized FAQ page (`/faq`) with 7 questions targeting emergency plumber/plumbing service keywords, FAQPage Schema.org markup for AI search visibility.
- **Contact Page:** Form submission to database.
- **About Page:** Business information.
- **Emergency Banner:** Sticky CTA for emergency services.
- **Popular Services Widget:** Featured services in the footer.
- **Category Pages:** 7 category overview pages (gas-services, sewer, leak, water-heater, repair, plumbing-services, additional-services) with filtered service listings, SEO meta tags, Schema.org markup, and FAQ sections.

**Homepage SEO Optimization (Dec 2025):**
- **Target Keywords:** Plumber in Marana, Plumbing service in Marana, Emergency plumber in Marana
- **SEO-Optimized Sections:**
  - About Wood's Plumbing: Keyword-rich intro paragraph with natural keyword placement
  - Our Comprehensive Services: 7 service cards (Repairs, Leak Detection, Water Heaters, Water Conditioning, Repiping, Sewer, Gas Services)
  - Gas Services: Extended description with emergency plumber keywords
  - How We Work: 3-step process (Appointment → Diagnosis → Completion)
- **Meta Tags:** Updated title and description with target location keywords

**Legacy URL Preservation (SEO Migration):**
- **17 Priority Legacy URLs** mapped and preserved for SEO value
- **URL Alias System:** Services and locations support multiple slugs via "aliases" array in JSON data
  - Service aliases: gas-pipe-leaks, gas-pipe-installation, repiping, clogged-drain-services, emergency-plumber-in-tucson
  - Location aliases: plumbers-tucson-az, marana-az
- **Hand-Crafted Content:** 8 priority services and 2 locations (Tucson, Marana) have unique longDescription, serviceSteps, neighborhoods, and serviceHighlights
- **Canonical URLs:** All alias pages point to canonical slugs for proper SEO

**SEO Content Expansion V2 (Nov 2025):**
- **All 66 Services** now have 1,630-1,887 words of unique, SEO-optimized content (average: 1,785 words)
- **Enhanced Content Sections:** Each service includes:
  - Extended longDescription (800+ words with Arizona-specific context)
  - 13 benefits per service (6 base + 7 category-specific)
  - 5-6 detailed process steps
  - 6 service-specific FAQs with comprehensive answers
  - 10 common issues/warning signs
  - Arizona-specific context paragraph
  - "Why Choose Us" section with 6 compelling reasons
  - Warranty & guarantee information
  - Pricing factors affecting service cost
- **Category-Specific Templates:** Content generated using templates tailored to 12 service categories (gas, water-heater, sewer, drain, leak, pipe, water-treatment, fixture, commercial, emergency, inspection, hydro-jetting)
- **Schema.org Enhancement:** Service pages include combined FAQPage markup from embedded and external FAQs
- **Content Generation Scripts:** 
  - `scripts/expand-service-content.ts` - Original expansion script
  - `scripts/expand-service-content-v2.ts` - Enhanced expansion with all new sections

**System Design Choices:**
- All business constants are centralized in `lib/constants.ts` and data in JSON files, ensuring zero hardcoded business data.
- The project structure is organized for scalability and maintainability, separating pages, components, data, and utilities.

### External Dependencies
- **Database:** PostgreSQL (with Drizzle ORM)
- **Styling Frameworks:** Tailwind CSS, shadcn/ui
- **Analytics:** Google Analytics 4
- **Form Management:** React Hook Form, Zod (for validation)
- **Deployment:** Replit's deployment tools