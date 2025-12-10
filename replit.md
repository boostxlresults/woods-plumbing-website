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
- **llms.txt File:** `/llms.txt` markdown file following the proposed standard for LLM crawlers, providing structured site overview with services, locations, and credentials.
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

**GDPR/CCPA Compliance & Legal Pages (Dec 2025):**
- **Privacy Policy Page** (`/privacy-policy`): Comprehensive GDPR/CCPA compliant privacy policy with Arizona-specific legal terms
- **Terms of Use Page** (`/terms`): Full terms of service with liability disclaimers, IP protection, dispute resolution
- **Cookie Consent Banner** (`src/components/CookieConsent.tsx`):
  - GDPR-compliant: Analytics blocked by default using gtag consent mode
  - Dual options: "Accept All" (enables analytics) vs "Essential Only" (blocks analytics)
  - Persists preference via localStorage (only after acceptance)
  - Uses sessionStorage to prevent re-prompting during session
  - Properly clears consent on decline
- **Google Analytics Integration**: gtag consent mode with `analytics_storage: 'denied'` default in `_document.tsx`
- **Sitemap**: Legal pages added to XML sitemap with noindex robots tags

**AI Search Optimization Enhancements (Dec 2025):**
- **Meta Robots Tag**: Global meta robots tag in `_document.tsx` with "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
- **Blog Post Schema**: Enhanced BlogPosting with detailed author (Person type), worksFor (Organization), publisher logo (ImageObject), dateModified, mainEntityOfPage
- **Blog Post BreadcrumbList JSON-LD**: 4-level hierarchy (Home > Blog > Category > Post Title) with matching visual breadcrumb
- **Blog Post FAQ Schema + Answer-Style Content**: 
  - 8 category-specific FAQ sets (Emergency Plumbing, Drain Cleaning, Plumbing Maintenance, Plumbing Tips, Leak Detection, Water Heaters, Repiping, Water Conditioning)
  - 24 total Q&A pairs for AI extraction
  - Visual FAQ section with semantic H2/H3 markup
  - FAQPage JSON-LD schema on all 22 blog posts
- **Service Page AI Formatting**:
  - `<blockquote>` elements for Arizona-specific context with `<figcaption>` attribution
  - Comparison tables (Wood's Plumbing vs. Other Plumbers) for AI parsing
  - Semantic HTML5 elements (`<figure>`, `<table>`) for structured data extraction
- **Google Business Profile**: Embedded iframe on contact page, footer link for local SEO signals
- **Review Schema**: Individual Review schema with 8 customer testimonials (`lib/data/testimonials.json`)
- **E-E-A-T Schema**: Experience, Expertise, Authoritativeness, Trustworthiness signals with credentials, awards, and knowledge areas

**Conversion Optimization (Dec 2025):**
- **Google Reviews Widget** (`src/components/GoogleReviewsWidget.tsx`): Displays customer testimonials with star ratings and links to Google
- **Floating Lead Form** (`src/components/FloatingLeadForm.tsx`): Appears on every page after 3 seconds, with QuickLeadForm popup
- **Quick Lead Form** (`src/components/QuickLeadForm.tsx`): Short 3-field form (name, phone, service) for fast conversions
- **Honeypot Anti-Spam**: Hidden field protection on all forms to block bots without CAPTCHA friction
- **ServiceTitan DNI**: Dynamic Number Insertion script for call tracking (ID: 227669022) loaded in `_document.tsx`
- **ServiceTitan Scheduling Pro Integration**:
  - Script: `https://embed.scheduler.servicetitan.com/scheduler-v1.js`
  - Configured via environment variables: `NEXT_PUBLIC_SERVICETITAN_API_KEY`, `NEXT_PUBLIC_SERVICETITAN_SCHEDULER_ID`
  - Method: `_scheduler.show({ schedulerId })` triggers popup
  - Whitelisted domains: woodsplumbing.com, www.woodsplumbing.com
  - Fallback: Redirects to /contact page if scheduler unavailable
- **Schedule Button Placement (3+ per page)**:
  - Emergency Banner (`src/components/EmergencyBanner.tsx`): "Schedule" button in top bar
  - Header (`src/components/layout/Header.tsx`): "SCHEDULE" button in navigation
  - Hero Section (`pages/index.tsx`, `pages/services/[slug].tsx`): "SCHEDULE ONLINE" button
  - Sticky CTA Bar (`src/components/StickyCTA.tsx`): Appears after 30% scroll with Call + Schedule buttons
  - Footer (`src/components/layout/Footer.tsx`): Schedule button in company info section
  - Floating Lead Form (`src/components/FloatingLeadForm.tsx`): Appears after 3 seconds
- **ScheduleButton Component** (`src/components/ScheduleButton.tsx`): Reusable button that triggers ServiceTitan Scheduling Pro popup

**Service Page Category Images (Dec 2025):**
- **10 Unique Branded Images** generated with "WOOD'S PLUMBING" uniforms for service categories:
  - Emergency services (burst pipes, water spraying action)
  - Water heater installation/repair
  - Drain cleaning and sewer services
  - Leak detection with diagnostic equipment
  - Toilet installation/repair
  - Fixture repair (faucets, sinks, showers)
  - Pipe repair and repiping
  - Water treatment/softener installation
  - Gas line services (yellow pipes, safety equipment)
  - Commercial plumbing
- **Dynamic Image Selection**: `getServiceImage()` helper function maps 66 service slugs to category-appropriate images
- **Images Location**: `/public/images/services/` directory

**SEO: Unique Service Intros (Dec 2025):**
- **66 Unique First Paragraphs**: Each service page now has a completely unique opening paragraph to eliminate duplicate content concerns
- **Topical Alignment**: Each intro is specifically written for that service's context, pain points, and value proposition
- **Duplicate Content Mitigation**: Replaced templated "[Service] is one of the most important..." pattern with individually crafted intros

**SEO Audit Fixes (Dec 2025):**
- **Title Tag Optimization**: All page titles optimized to 50-75 characters across 43+ pages
  - Static pages have explicit longer titles with branding (e.g., "Plumber in Marana & Tucson AZ - 24/7 Emergency | Wood's Plumbing")
  - Dynamic templates (blog posts, services, locations) use intelligent fallbacks to ensure minimum 50-character titles
- **Meta Description Optimization**: All meta descriptions optimized to 140-190 characters across 24+ pages
  - Templates only use stored metaDescription if >= 120 characters, otherwise use excerpt with branding suffix
- **Homepage H1 Fix**: Fixed duplicate H1 issue (desktop version uses visually hidden paragraph)
- **Blog Post Template Improvements**:
  - Removed 55-character title truncation
  - Added length validation: only uses metaTitle if >= 50 chars, otherwise "{title} | Wood's Plumbing Blog"
  - Added length validation: only uses metaDescription if >= 120 chars, otherwise expands excerpt with branding
- **Static Blog Category Pages**: Created `/blog/category/[slug]` routes with proper SSR
  - Dynamic slug-to-category mapping from blog post data
  - Correct title, H1, and meta description for each category
  - 8 category pages: Drain Cleaning, Emergency Plumbing, Leak Detection, Plumbing Maintenance, Plumbing Tips, Repiping, Water Conditioning, Water Heaters
  - Added H2 "Browse By Category" section for proper header hierarchy
- **Legacy URL Redirect**: Middleware (`middleware.ts`) 301 redirects `/blog?category=...` to static routes
- **Breadcrumb Updates**: Blog post breadcrumbs link to static category pages

**System Design Choices:**
- All business constants are centralized in `lib/constants.ts` and data in JSON files, ensuring zero hardcoded business data.
- The project structure is organized for scalability and maintainability, separating pages, components, data, and utilities.

### External Dependencies
- **Database:** PostgreSQL (with Drizzle ORM)
- **Styling Frameworks:** Tailwind CSS, shadcn/ui
- **Analytics:** Google Analytics 4
- **Form Management:** React Hook Form, Zod (for validation)
- **Deployment:** Replit's deployment tools