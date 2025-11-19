import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Clock, Calendar } from 'lucide-react';
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

interface BlogIndexProps {
  posts: Array<BlogPost & { readTime: number }>;
  categories: string[];
}

const BlogPage: NextPage<BlogIndexProps> = ({ posts, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div>
      <Head>
        <title>{`Plumbing Blog & Tips | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Expert plumbing tips, maintenance guides, and industry insights from Tucson's most trusted plumbing company. Learn from our ${BUSINESS.trust.yearsInBusiness}+ years of experience.`} />
      </Head>

      <Header />

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Plumbing Blog & Resources
            </h1>
            <p className="text-xl text-blue-100">
              {`Expert tips, maintenance guides, and plumbing insights from our ${BUSINESS.trust.yearsInBusiness}+ years of experience`}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('All')}
            >
              All Posts
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-100 text-blue-900 px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
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

  const categories = Array.from(new Set(blogPostsData.map(post => post.category)));

  return {
    props: {
      posts: postsWithReadTime,
      categories
    }
  };
};

export default BlogPage;
