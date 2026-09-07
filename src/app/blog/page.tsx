import Link from 'next/link';
import { Metadata } from 'next';
import { getLatestPosts, Article } from '@/lib/quanta';
import { EDITORIAL_ARTICLES, convertEditorialToQuantaArticle } from '@/data/fallback-articles';
import { AdSpot } from '@/components/ads/AdSpot';
import {
  FontAwesomeIcon,
  faCalendarDays,
  faClock,
  faArrowRight,
  faStar
} from '@/components/ui/Icons';
import { FeaturedCarousel } from '@/components/blog/FeaturedCarousel';

export const metadata: Metadata = {
  title: 'Cosmic Wisdom & Astrological Editorial | HeroZodiac Blog',
  description: 'Explore in-depth articles on natal charts, planetary transits, zodiac psychology, numerology, archetypes, and Tarot.',
};

export const revalidate = 60;

export default async function BlogIndex() {
  let allPosts: Article[] = [];
  try {
    allPosts = await getLatestPosts(20);
  } catch (e) {
    console.warn("Quanta CMS fetch failed, using fallback.", e);
  }

  // If CMS returned no posts, populate with verified editorial articles
  if (!allPosts || allPosts.length === 0) {
    allPosts = EDITORIAL_ARTICLES.map(convertEditorialToQuantaArticle);
  }
  
  const featuredPosts = allPosts.slice(0, 3);
  const recentPosts = allPosts;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans">
      
      {/* HEADER */}
      <header className="py-16 text-center px-6 border-b border-stone-200 relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold mb-4 border border-[#7B1123]/20">
            <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
            <span>HeroZodiac Editorial</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-stone-900 mb-4">
            Cosmic <span className="text-[#7B1123]">Wisdom</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            Deep dives into planetary transits, psychological archetypes, karmic numerology, and the hidden mechanics of destiny.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* 2. FEATURED POSTS (Carousel) */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <FeaturedCarousel posts={featuredPosts} />
          </section>
        )}

        {/* 3. AD SPOT */}
        <AdSpot type="leaderboard" label="Sponsored Guidance" />

        {/* 4. RECENT POSTS GRID */}
        <section className="py-12">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Recent Articles
            </h2>
            <div className="h-px bg-stone-200 flex-1 max-w-xs" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.id} className="group flex flex-col h-full bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-[#7B1123]/50 transition shadow-sm hover:shadow-lg">
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-video relative bg-stone-100">
                  {post.featured_image ? (
                    <img 
                      src={post.featured_image.file_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                      HeroZodiac Editorial
                    </div>
                  )}
                  {post.categories?.[0] && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-sm">
                        {post.categories[0].name}
                      </span>
                    </div>
                  )}
                </Link>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3" />
                        <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                        <span>6 min read</span>
                      </span>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-serif font-bold text-stone-900 mb-3 leading-snug group-hover:text-[#7B1123] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 mb-6 leading-relaxed font-sans">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-stone-100">
                    <Link href={`/blog/${post.slug}`} className="text-[#7B1123] text-xs font-bold flex items-center gap-1.5 hover:underline">
                      <span>Read Article</span>
                      <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. BOTTOM AD SPOT */}
        <AdSpot type="leaderboard" label="Advertisement" />

      </main>
    </div>
  );
}