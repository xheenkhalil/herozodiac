import Link from 'next/link';
import { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/quanta';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { AdSpot } from '@/components/ads/AdSpot';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  return {
    title: `${title} Articles | HeroZodiac`,
    description: `Read the latest articles about ${title} on HeroZodiac.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const posts = await getPostsByCategory(params.slug);
  const title = params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, ' ');

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 py-20 text-center">
         <h1 className="text-3xl font-serif text-white mb-4">{title}</h1>
         <p className="text-slate-500">No articles found in this category.</p>
         <Link href="/blog" className="text-gold-400 mt-4 inline-block hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-maroon-900 selection:text-white">
      
      {/* HEADER */}
      <header className="py-20 text-center px-6 border-b border-white/5 relative overflow-hidden bg-slate-900/50">
        <div className="relative z-10">
          <div className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-4">Category</div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Curated articles on {title.toLowerCase()}.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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

        <div className="mt-20">
             <AdSpot type="leaderboard" label="Advertisement" />
        </div>

      </main>
    </div>
  );
}
