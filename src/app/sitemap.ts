import { MetadataRoute } from 'next';
import { getLatestPosts } from '@/lib/quanta';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://herozodiac.vercel.app';

  // 1. Static Routes
  const routes = [
    '',
    '/calculator',
    '/compatibility',
    '/transits',
    '/blog',
    '/about',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic Blog Posts
  // Fetch up to 1000 posts for the sitemap
  const posts = await getLatestPosts(1000);
  
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 3. Dynamic Categories (Extracted from posts)
  // Since we don't have a "getCategories" endpoint, we derive them from posts.
  const categories = new Set<string>();
  posts.forEach(post => {
    if (post.categories) {
      post.categories.forEach(cat => categories.add(cat.slug));
    }
  });

  const categoryRoutes = Array.from(categories).map(slug => ({
    url: `${baseUrl}/blog/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes, ...categoryRoutes];
}
