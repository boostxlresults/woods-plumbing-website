import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import { Button } from '../../src/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../src/components/ui/card';
import { Clock, Calendar, User, ArrowLeft, Phone } from 'lucide-react';
import { BUSINESS } from '../../lib/constants';
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

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, relatedPosts }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": BUSINESS.name
    },
    "datePublished": post.publishedAt,
    "articleSection": post.category
  };

  return (
    <div>
      <Head>
        <title>{`${post.title} | ${BUSINESS.name} Blog`}</title>
        <meta name="description" content={post.excerpt} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header />

      {/* Breadcrumb */}
      <section className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Meta */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm bg-blue-100 text-blue-900 px-3 py-1 rounded">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />

            {/* CTA */}
            <Card className="bg-blue-900 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Need Professional Plumbing Help?</h3>
                <p className="text-blue-100 mb-6">
                  Our expert plumbers are ready to help with all your plumbing needs. Call now for same-day service!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`tel:${BUSINESS.phone}`}>
                    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
                      <Phone className="mr-2" />
                      Call {BUSINESS.phone}
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-gray-100">
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

      <Footer />
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
