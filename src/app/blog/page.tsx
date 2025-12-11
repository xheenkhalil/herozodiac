import Link from 'next/link';
import { Metadata } from 'next';
import { getLatestPosts } from '@/lib/quanta';
import { AdSpot } from '@/components/ads/AdSpot';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { FeaturedCarousel } from '@/components/blog/FeaturedCarousel';

export const metadata: Metadata = {
  title: 'Cosmic Wisdom | HeroZodiac Blog',
  description: 'Explore our latest articles on astrology, transits, compatibility, and palmistry.',
};

export const revalidate = 60; // Re-fetch new posts every minute

export default async function BlogIndex() {
  // Fetch ample posts (top 3 for slider + others for grid)
  const allPosts = await getLatestPosts(20);
  
  // Top 3 featured
  const featuredPosts = allPosts.slice(0, 3);
  // Grid shows ALL recent posts (or you could slice(0, 6) if you want a limit)
  const recentPosts = allPosts;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-maroon-900 selection:text-white">
      
      {/* 1. HEADER */}
      <header className="py-20 text-center px-6 border-b border-white/5 relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-maroon-900/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            Cosmic <span className="text-gold-500">Wisdom</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Deep dives into planetary transits, zodiac psychology, and the hidden mechanics of your destiny.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">

        {/* 2. FEATURED POSTS (Carousel) */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <FeaturedCarousel posts={featuredPosts} />
          </section>
        )}

        {/* 3. AD SPOT (Leaderboard) */}
        <AdSpot type="leaderboard" label="Sponsored" />

        {/* 4. RECENT POSTS GRID */}
        <section className="py-12">
          <h3 className="text-xl font-serif font-bold text-white mb-8 flex items-center gap-4">
            Recent Articles <div className="h-px bg-white/10 flex-1" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.id} className="group flex flex-col h-full bg-slate-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-gold-500/30 transition hover:bg-slate-900/50">
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-video relative">
                  {post.featured_image ? (
                    <img 
                      src={post.featured_image.file_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">
                      No Image
                    </div>
                  )}
                </Link>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.published_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <h4 className="text-xl font-serif font-bold text-slate-100 mb-3 leading-snug group-hover:text-gold-400 transition">
                      {post.title}
                    </h4>
                  </Link>
                  
                  <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <Link href={`/blog/${post.slug}`} className="text-maroon-400 text-sm font-bold flex items-center gap-1 hover:text-maroon-300">
                    Read More <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {allPosts.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <p>No articles found. Connect your CMS to see content here.</p>
            </div>
          )}
        </section>

        {/* 5. BOTTOM AD SPOT */}
        <AdSpot type="leaderboard" label="Advertisement" />

      </main>
    </div>
  );
}