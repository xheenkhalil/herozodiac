import { Hero } from '@/components/marketing/Hero';
import { HomeGrid } from '@/components/home/HomeGrid';
import { Footer } from '@/components/footer/Footer';
import { getLatestPosts } from '@/lib/quanta';

export const revalidate = 60; // Re-fetch content every 60 seconds

export default async function Home() {
  // Fetch posts from your Quanta Press API
  const articles = await getLatestPosts(3);

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-maroon-900 selection:text-white">
      <Hero />
      <HomeGrid articles={articles} />
      <Footer />
    </div>
  );
}