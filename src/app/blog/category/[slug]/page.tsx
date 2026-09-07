import Link from 'next/link';
import { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/quanta';
import { FontAwesomeIcon, faCalendarDays, faArrowRight } from '@/components/ui/Icons';
import { AdSpot } from '@/components/ads/AdSpot';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  return {
    title: `${title} Articles | HeroZodiac`,
    description: `Read the latest articles about ${title} on HeroZodiac.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);
  const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 text-stone-900 pt-32 pb-20 text-center px-4">
         <h1 className="text-3xl font-serif text-stone-900 mb-4">{title}</h1>
         <p className="text-stone-500">No articles found in this category.</p>
         <Link href="/blog" className="text-[#7B1123] mt-4 inline-block hover:underline font-bold text-sm">
           ← Back to All Articles
         </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans selection:bg-[#7B1123] selection:text-white">
      
      {/* HEADER */}
      <header className="py-16 text-center px-6 border-b border-stone-200 relative overflow-hidden bg-white">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-[#7B1123] text-xs font-bold uppercase tracking-widest mb-4">Category</div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto">
            Curated articles and wisdom on {title.toLowerCase()}.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group flex flex-col h-full bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-[#7B1123]/50 transition shadow-sm hover:shadow-lg">
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-video relative bg-stone-100">
                  {post.featured_image ? (
                    <img 
                      src={post.featured_image.file_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400 text-xs">
                      HeroZodiac
                    </div>
                  )}
                </Link>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
                      <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3" />
                      <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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
                      <span>Read More</span>
                      <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
        </div>

        <div className="mt-16">
             <AdSpot type="leaderboard" label="Advertisement" />
        </div>

      </main>
    </div>
  );
}
