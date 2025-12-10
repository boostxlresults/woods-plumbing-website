import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../src/components/ui/card';
import { Button } from '../../../src/components/ui/button';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { BUSINESS } from '../../../lib/constants';
import { formatDate } from '../../../lib/formatDate';
import blogPostsData from '../../../lib/data/blog-posts.json';

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

interface CategoryPageProps {
  posts: Array<BlogPost & { readTime: number }>;
  category: string;
  allCategories: string[];
}

function slugifyCategory(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

function getCategorySlugMap(): Record<string, string> {
  const categories = [...new Set((blogPostsData as BlogPost[]).map(post => post.category))];
  const map: Record<string, string> = {};
  for (const category of categories) {
    map[slugifyCategory(category)] = category;
  }
  return map;
}

function unslugifyCategory(slug: string): string {
  const categoryMap = getCategorySlugMap();
  return categoryMap[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const BlogCategoryPage: NextPage<CategoryPageProps> = ({ posts, category, allCategories }) => {
  return (
    <div>
      <Head>
        <title>{`${category} Articles | Wood's Plumbing`}</title>
        <meta name="description" content={`Expert ${category} tips and guides from Wood's Plumbing in Southern Arizona.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${BUSINESS.website}/blog/category/${slugifyCategory(category)}`} />
        
        <meta property="og:title" content={`${category} Articles | ${BUSINESS.name}`} />
        <meta property="og:description" content={`Expert ${category} tips and guides from Wood's Plumbing.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BUSINESS.website}/blog/category/${slugifyCategory(category)}`} />
      </Head>

      <main className="bg-white">
        <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/blog" className="text-copper hover:text-copper/80 flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                All Articles
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category} Articles</h1>
            <p className="text-xl opacity-90">Expert {category} tips and guides from our experienced plumbers.</p>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Link href="/blog">
                <Button variant="outline" className="bg-white hover:bg-gray-100">
                  All
                </Button>
              </Link>
              {allCategories.map((cat) => (
                <Link key={cat} href={`/blog/category/${slugifyCategory(cat)}`}>
                  <Button 
                    variant={cat === category ? "default" : "outline"}
                    className={cat === category ? "bg-copper hover:bg-copper/90" : "bg-white hover:bg-gray-100"}
                  >
                    {cat}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No articles found in this category.</p>
                <Link href="/blog">
                  <Button className="mt-4">View All Articles</Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                          <span className="bg-copper/10 text-copper px-2 py-1 rounded text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime} min read
                          </span>
                        </div>
                        <CardTitle className="text-xl hover:text-copper transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = blogPostsData as BlogPost[];
  const categories = [...new Set(posts.map(post => post.category))];
  
  const paths = categories.map(category => ({
    params: { slug: slugifyCategory(category) }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const category = unslugifyCategory(slug);
  
  const allPosts = blogPostsData as BlogPost[];
  const allCategories = [...new Set(allPosts.map(post => post.category))].sort();
  
  const categoryPosts = allPosts
    .filter(post => post.category === category)
    .map(post => ({
      ...post,
      readTime: Math.ceil(post.content.split(' ').length / 200)
    }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return {
    props: {
      posts: categoryPosts,
      category,
      allCategories
    }
  };
};

export default BlogCategoryPage;
