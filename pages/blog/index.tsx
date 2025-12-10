import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Clock, Calendar } from 'lucide-react';
import { BUSINESS } from '../../lib/constants';
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

interface BlogIndexProps {
  posts: Array<BlogPost & { readTime: number }>;
  categories: string[];
}

function slugifyCategory(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

const BlogPage: NextPage<BlogIndexProps> = ({ posts, categories }) => {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `${BUSINESS.name} Plumbing Blog`,
    "description": "Expert plumbing tips, maintenance guides, and industry insights from Tucson's most trusted plumbing company",
    "url": `${BUSINESS.website}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": BUSINESS.name,
      "url": BUSINESS.website
    },
    "blogPost": posts.slice(0, 5).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `${BUSINESS.website}/blog/${post.slug}`,
      "datePublished": post.publishedAt,
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }))
  };

  return (
    <div>
      <Head>
        <title>Plumbing Blog & Tips | Wood&apos;s Plumbing</title>
        <meta name="description" content="Expert plumbing tips and maintenance guides. Learn from 46+ years of experience in Tucson." />
        <meta name="keywords" content="plumbing blog, plumbing tips, plumbing maintenance, Arizona plumbing, water heater guide, drain cleaning tips" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`${BUSINESS.website}/blog`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Plumbing Blog & Tips | ${BUSINESS.name}`} />
        <meta property="og:description" content={`Expert tips from ${BUSINESS.trust.yearsInBusiness}+ years of plumbing experience in Southern Arizona.`} />
        <meta property="og:url" content={`${BUSINESS.website}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={BUSINESS.name} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Plumbing Blog & Tips" />

        {/* AI Search Optimization */}
        <meta name="author" content={BUSINESS.name} />

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      </Head>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Plumbing Blog & Resources
            </h1>
            <p className="text-xl text-blue-100">
              Expert tips, maintenance guides, and plumbing insights from our {BUSINESS.trust.yearsInBusiness}+ years of experience
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="default">
              All Posts
            </Button>
            {categories.map((category) => (
              <Link key={category} href={`/blog/category/${slugifyCategory(category)}`}>
                <Button variant="outline">
                  {category}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Link href={`/blog/category/${slugifyCategory(post.category)}`}>
                      <span className="text-xs bg-blue-100 text-blue-900 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                        {post.category}
                      </span>
                    </Link>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime} min read
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const postsWithReadTime = blogPostsData
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(post => ({
      ...post,
      readTime: calculateReadTime(post.content)
    }));

  const categories = Array.from(new Set(blogPostsData.map(post => post.category))).sort();

  return {
    props: {
      posts: postsWithReadTime,
      categories
    }
  };
};

export default BlogPage;
