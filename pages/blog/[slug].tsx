import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '../../src/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../src/components/ui/card';
import { Clock, Calendar, User, ArrowLeft, Phone } from 'lucide-react';
import { Breadcrumb } from '../../src/components/layout/Breadcrumb';
import { BUSINESS } from '../../lib/constants';
import { trackBlogView } from '../../lib/analytics';
import { formatDate } from '../../lib/formatDate';
import { generateBreadcrumbSchema, generateFAQSchema } from '../../lib/seo/schemas';
import blogPostsData from '../../lib/data/blog-posts.json';

const categoryFAQs: Record<string, Array<{ question: string; answer: string }>> = {
  "Emergency Plumbing": [
    { question: "What should I do during a plumbing emergency?", answer: "First, locate and shut off your main water valve to stop water flow. Then call a licensed plumber immediately. While waiting, move valuables away from water and document damage with photos for insurance purposes." },
    { question: "How fast can an emergency plumber arrive?", answer: "Wood's Plumbing offers 24/7 emergency service with typical response times of 60-90 minutes in the Tucson and Marana areas. We dispatch fully-stocked trucks for immediate repairs." },
    { question: "What counts as a plumbing emergency?", answer: "Burst pipes, sewage backups, gas leaks, complete loss of water, overflowing toilets, and major water leaks are all plumbing emergencies requiring immediate professional attention." }
  ],
  "Drain Cleaning": [
    { question: "How often should drains be professionally cleaned?", answer: "Most homes benefit from professional drain cleaning every 1-2 years. Homes with frequent clogs, older pipes, or heavy usage may need annual cleaning to prevent backups and maintain optimal flow." },
    { question: "Is chemical drain cleaner safe to use?", answer: "Chemical drain cleaners can damage pipes and provide only temporary relief. Professional hydro jetting is safer and more effective, removing buildup completely without harming your plumbing system." },
    { question: "What causes recurring drain clogs?", answer: "Recurring clogs are often caused by partial blockages deep in your drain lines, tree root intrusion, pipe damage, or buildup that wasn't fully cleared. Professional camera inspection can identify the root cause." }
  ],
  "Plumbing Maintenance": [
    { question: "What does annual plumbing maintenance include?", answer: "Annual plumbing maintenance includes inspection of all fixtures, checking water pressure, examining pipe conditions, testing shut-off valves, inspecting water heater, and identifying potential issues before they become emergencies." },
    { question: "How can I prevent plumbing problems?", answer: "Prevent plumbing problems by scheduling annual inspections, avoiding pouring grease down drains, using drain screens, maintaining your water heater, and addressing minor issues promptly before they worsen." },
    { question: "When should I replace my plumbing?", answer: "Consider replacing plumbing if your home has galvanized pipes (prone to corrosion), you experience frequent leaks, have low water pressure throughout the house, or if pipes are over 50 years old." }
  ],
  "Plumbing Tips": [
    { question: "When should I call a professional plumber?", answer: "Call a professional for multiple slow drains, sewage odors, visible water damage, low water pressure, water discoloration, or any issue involving gas lines. DIY attempts on complex issues often cause more damage." },
    { question: "How can I find a reliable plumber?", answer: "Look for licensed, insured plumbers with positive reviews, transparent pricing, and warranties on their work. Check Arizona ROC licensing status and ask about their experience with your specific issue." },
    { question: "What questions should I ask a plumber?", answer: "Ask about licensing, insurance, experience, written estimates, warranties, and timeline. A reputable plumber like Wood's Plumbing provides upfront pricing and explains the work needed before starting." }
  ],
  "Leak Detection": [
    { question: "How do I know if I have a hidden water leak?", answer: "Signs of hidden leaks include unexplained high water bills, musty odors, mold growth, water stains on walls or ceilings, sounds of running water when fixtures are off, and warm spots on floors." },
    { question: "How do professionals detect hidden leaks?", answer: "Professional plumbers use acoustic sensors, thermal imaging cameras, video pipe inspection, and pressure testing to locate leaks behind walls, under slabs, and in underground lines without destructive digging." },
    { question: "How much water can a small leak waste?", answer: "A small leak dripping once per second wastes about 3,000 gallons per year. Larger hidden leaks can waste 10,000+ gallons annually, causing significant damage and inflating your water bills." }
  ],
  "Water Heaters": [
    { question: "How long do water heaters last?", answer: "Traditional tank water heaters last 8-12 years, while tankless water heaters can last 20+ years with proper maintenance. Regular maintenance extends lifespan significantly." },
    { question: "Should I repair or replace my water heater?", answer: "Consider replacement if your water heater is over 10 years old, needs frequent repairs, produces rusty water, makes unusual noises, or if repair costs exceed 50% of replacement cost." },
    { question: "What size water heater do I need?", answer: "Water heater size depends on household size and usage. A family of 4 typically needs a 50-gallon tank or a tankless unit rated for 8+ GPM. A professional can assess your specific needs." }
  ],
  "Repiping": [
    { question: "How do I know if my home needs repiping?", answer: "Signs you need repiping include frequent leaks, discolored water, low water pressure, visible pipe corrosion, galvanized steel pipes, and pipes over 50 years old." },
    { question: "How long does whole-house repiping take?", answer: "Most whole-house repiping projects take 2-5 days depending on home size, accessibility, and complexity. A professional assessment provides accurate timeline estimates for your specific situation." },
    { question: "What materials are best for repiping?", answer: "PEX and copper are the most popular repiping materials. PEX is flexible, resistant to corrosion, and more affordable. Copper is durable, proven, and adds home value. Both are excellent choices." }
  ],
  "Water Conditioning": [
    { question: "Do I need a water softener in Arizona?", answer: "Yes, Arizona has some of the hardest water in the country. Hard water causes scale buildup, damages appliances, and reduces fixture lifespan. A water softener protects your plumbing system and improves water quality." },
    { question: "What's the difference between water softeners and water filters?", answer: "Water softeners remove calcium and magnesium that cause hard water. Water filters remove contaminants like chlorine, sediment, and chemicals. Many homes benefit from both systems working together." },
    { question: "How often do water softeners need maintenance?", answer: "Water softeners need salt refilled every 1-2 months and professional servicing annually. This ensures optimal performance and extends the system's lifespan." }
  ]
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featured: boolean;
  metaTitle: string;
  metaDescription: string;
}

interface BlogPostPageProps {
  post: BlogPost & { readTime: number };
  relatedPosts: Array<BlogPost & { readTime: number }>;
}

function slugifyCategory(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, relatedPosts }) => {
  useEffect(() => {
    trackBlogView(post.title, post.category);
  }, [post.title, post.category]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `${BUSINESS.website}/og-image.jpg`,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": `${BUSINESS.website}/about`,
      "worksFor": {
        "@type": "Organization",
        "name": BUSINESS.name,
        "url": BUSINESS.website
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": BUSINESS.name,
      "url": BUSINESS.website,
      "logo": {
        "@type": "ImageObject",
        "url": `${BUSINESS.website}/images/woods-plumbing-logo.png`
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BUSINESS.website}/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", ")
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.category, href: `/blog/category/${slugifyCategory(post.category)}` },
    { name: post.title }
  ]);

  const faqs = categoryFAQs[post.category] || categoryFAQs["Plumbing Tips"];
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div>
      <Head>
        <title>{post.metaTitle && post.metaTitle.length >= 50 ? post.metaTitle : `${post.title} | Wood's Plumbing Blog`}</title>
        <meta name="description" content={post.metaDescription && post.metaDescription.length >= 120 ? post.metaDescription : `${post.excerpt.slice(0, 120)} Expert plumbing tips from Wood's Plumbing in Tucson, AZ.`} />
        <link rel="canonical" href={`${BUSINESS.website}/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`${BUSINESS.website}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.category, href: `/blog/category/${slugifyCategory(post.category)}` },
        { label: post.title }
      ]} />

      {/* Hero Section - Navy Banner */}
      <section className="bg-navy-700 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Meta */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm bg-red-600 text-white px-3 py-1 rounded uppercase font-bold">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />

            {/* FAQ Section for AI Search Optimization */}
            <section className="mb-12 bg-gray-50 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-navy-700 mb-6">
                Frequently Asked Questions About {post.category}
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <Card className="bg-navy-700 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Need Professional Plumbing Help?</h3>
                <p className="text-gray-200 mb-6">
                  Our expert plumbers are ready to help with all your plumbing needs. Call now for same-day service!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`tel:${BUSINESS.phone}`}>
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold">
                      <Phone className="mr-2" />
                      Call {BUSINESS.phone}
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" className="bg-white text-navy-700 hover:bg-gray-100 font-bold">
                      Get Free Estimate
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{relatedPost.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4" />
                      {relatedPost.readTime} min read
                    </div>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Button variant="outline" className="w-full">
                        Read Article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPostsData.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = blogPostsData.find((p) => p.slug === params?.slug);
  
  if (!post) {
    return { notFound: true };
  }

  const relatedPosts = blogPostsData
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)
    .map(p => ({
      ...p,
      readTime: calculateReadTime(p.content)
    }));

  return {
    props: {
      post: {
        ...post,
        readTime: calculateReadTime(post.content)
      },
      relatedPosts,
    },
  };
};

export default BlogPostPage;
