# Wood's Plumbing Website - Setup & SEO Guide

This guide will help you complete the final setup steps for your plumbing website and maximize your visibility in search engines.

---

## ✅ Completed Features

Your website already has:
- ✅ **Google Analytics 4** - Tracking user behavior, conversions, and service popularity
- ✅ **80+ optimized pages** - Services, locations, blog posts with full SEO
- ✅ **Schema.org markup** - Rich results for Google search
- ✅ **Dynamic sitemap** - Auto-updates with all pages
- ✅ **AI search optimization** - Ready for ChatGPT, Claude, Perplexity
- ✅ **Mobile-responsive design** - Optimized for all devices
- ✅ **Contact form tracking** - Conversion tracking for form submissions and phone calls

---

## 🚀 Next Steps for You

### 1. Google Search Console Setup (15 minutes)

**Why?** Monitor how Google sees your site, fix indexing issues, track search performance.

**Steps:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add Property** → Enter your website URL
3. **Verify ownership** using one of these methods:
   - **DNS verification** (recommended for custom domains)
   - **HTML file upload** to your site
   - **HTML tag** in `<head>` section
4. **Submit your sitemap:**
   - In Search Console, go to **Sitemaps** (left sidebar)
   - Enter sitemap URL: `https://your-domain.com/sitemap.xml`
   - Click **Submit**

**What to monitor:**
- Coverage issues (pages not indexed)
- Mobile usability errors
- Search queries driving traffic
- Click-through rates by page

---

### 2. Schema.org Validation (10 minutes)

**Why?** Ensure rich results (star ratings, FAQs, breadcrumbs) appear in Google search.

**Test your pages:**
1. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Test these URLs:
   - Homepage: `https://your-domain.com/`
   - Service page: `https://your-domain.com/services/emergency-plumbing`
   - Location page: `https://your-domain.com/locations/tucson`
   - Blog post: `https://your-domain.com/blog/water-heater-maintenance-tips`

**What to look for:**
- ✅ **LocalBusiness** schema on homepage and location pages
- ✅ **Service** schema on service pages
- ✅ **FAQPage** schema on service pages
- ✅ **BreadcrumbList** schema on all pages
- ✅ **Review** schema on homepage

**Fix any errors** shown in the test results.

---

### 3. Google Business Profile Setup (30 minutes)

**Why?** Appear in Google Maps, Local Pack (top 3 local results), and Knowledge Panel.

**Steps:**
1. Go to [Google Business Profile](https://www.google.com/business/)
2. Click **Manage now** → Search for "Wood's Plumbing Enterprises LLC"
3. If found, **claim** the listing. If not, **create** a new listing
4. **Verify your business** (postcard, phone, or email verification)
5. **Complete your profile:**
   - Add business hours (match what's on your website)
   - Upload photos (plumbing work, vehicles, team)
   - Add service areas (all 8 cities you serve)
   - List services (copy from your website)
   - Respond to reviews

**Pro tips:**
- Post weekly updates (photos, offers, blog posts)
- Respond to ALL reviews within 24 hours
- Use "Google Posts" feature for announcements

---

### 4. Analytics Goals & Conversions (15 minutes)

**Why?** Track which services get the most leads and optimize marketing.

**Setup in Google Analytics 4:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to **Admin** → **Events**
3. Mark these as **conversions:**
   - `form_submission` - Contact form submissions
   - `phone_click` - Phone number clicks
4. Create **custom reports** to track:
   - Which services get the most views
   - Which locations drive the most traffic
   - Conversion rate by traffic source

**What to monitor weekly:**
- Top-performing services
- Conversion rate (visitors → leads)
- Traffic sources (Google, social media, direct)
- Mobile vs desktop usage

---

## 📊 Recommended Tools & Monitoring

### Free SEO Tools
- **Google Search Console** - Monitor Google indexing and search performance
- **Google Analytics** - Track user behavior and conversions
- **Google PageSpeed Insights** - Test site speed ([pagespeed.web.dev](https://pagespeed.web.dev/))
- **Bing Webmaster Tools** - Submit sitemap to Bing ([bing.com/webmasters](https://www.bing.com/webmasters))

### Schema Testing
- **Google Rich Results Test** - [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- **Schema Markup Validator** - [validator.schema.org](https://validator.schema.org/)

### Local SEO
- **Google Business Profile** - [google.com/business](https://www.google.com/business/)
- **Bing Places** - [bingplaces.com](https://www.bingplaces.com/)

---

## 🎯 SEO Checklist for Launch

Before going live, verify:

- [ ] Custom domain configured (not .replit.app)
- [ ] HTTPS enabled (SSL certificate)
- [ ] Google Analytics tracking code working
- [ ] Sitemap submitted to Google Search Console
- [ ] Google Business Profile claimed and verified
- [ ] Rich results validated (Schema.org markup)
- [ ] All images have alt text
- [ ] Mobile responsiveness tested
- [ ] Page load speed under 3 seconds
- [ ] Contact form tested and working
- [ ] Phone number clickable on mobile
- [ ] 404 page working correctly

---

## 📈 Ongoing SEO Maintenance

### Weekly Tasks (30 minutes)
- Check Google Search Console for errors
- Respond to Google Business Profile reviews
- Monitor analytics for unusual traffic changes
- Post to Google Business Profile

### Monthly Tasks (2 hours)
- Publish 1-2 new blog posts
- Update service pages with seasonal content
- Review and update Schema.org markup
- Check for broken links
- Monitor competitors' rankings

### Quarterly Tasks (4 hours)
- Comprehensive SEO audit
- Update location pages with new zip codes if expanding
- Refresh old blog content
- Review and optimize conversion funnel

---

## 🆘 Troubleshooting

### "My sitemap isn't showing all pages"
- Check `/sitemap.xml` directly in your browser
- Ensure all pages are listed in the XML output
- Resubmit sitemap in Google Search Console

### "Rich results aren't showing in Google"
- Schema markup takes 2-4 weeks to appear in search
- Test with Google Rich Results Test tool
- Ensure Schema.org markup is valid JSON-LD

### "Google Analytics isn't tracking"
- Check browser console for errors
- Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set in Secrets
- Use Google Analytics DebugView to test real-time

### "Pages aren't indexed in Google"
- Submit individual URLs via Search Console
- Check robots.txt allows crawling
- Ensure pages have unique titles and descriptions

---

## 📞 Support Resources

- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Google Search Central**: [developers.google.com/search](https://developers.google.com/search)
- **Schema.org Guide**: [schema.org/docs/gs.html](https://schema.org/docs/gs.html)
- **Google Analytics Help**: [support.google.com/analytics](https://support.google.com/analytics)

---

**Your website is production-ready!** Follow this guide to complete setup and start driving leads from Google search.
