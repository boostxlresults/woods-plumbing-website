import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function slugifyCategory(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  
  if (pathname === '/blog' && searchParams.has('category')) {
    const category = searchParams.get('category');
    if (category) {
      const slug = slugifyCategory(category);
      const url = request.nextUrl.clone();
      url.pathname = `/blog/category/${slug}`;
      url.searchParams.delete('category');
      return NextResponse.redirect(url, 301);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/blog',
};
