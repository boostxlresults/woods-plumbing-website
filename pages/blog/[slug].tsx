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
import blogPostsData from '../../lib/data/blog-posts.json';

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

  return (
    <div>
      <Head>
        <title>{(post.metaTitle || post.title).slice(0, 55) + (post.metaTitle?.length > 55 || post.title.length > 55 ? '...' : '')}</title>
        <meta name="description" content={post.metaDescription || `${post.excerpt.slice(0, 140)}...`} />
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
      </Head>

      {/* Breadcrumb */}
      <Breadcrumb items={[
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
