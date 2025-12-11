import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/quanta';
import { ContentRenderer } from '@/components/blog/ContentRenderer';
import { AdSpot } from '@/components/ads/AdSpot';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';

// 1. UPDATE: Params type must be a Promise in newer Next.js
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await params first
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug); // Decode URL to string
  
  const post = await getPostBySlug(decodedSlug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | HeroZodiac`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured_image ? [post.featured_image.file_url] : [],
      type: 'article',
      publishedTime: post.published_at,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  // 2. UPDATE: Await params here too
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug); // Handle "21-secrets%20of..." -> "21-secrets of..."

  const post = await getPostBySlug(decodedSlug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.featured_image?.file_url,
    datePublished: post.published_at,
    author: {
      '@type': 'Organization',
      name: 'HeroZodiac',
    },
    description: post.excerpt,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-maroon-900 selection:text-white">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="font-serif font-bold text-lg">Hero<span className="text-maroon-500">Zodiac</span></div>
          <button className="text-slate-400 hover:text-gold-400"><Share2 className="w-5 h-5" /></button>
        </div>
      </nav>

      {/* REST OF YOUR JSX IS FINE (Copy from previous response) */}
      <header className="relative py-20 border-b border-white/5">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900/30 border border-maroon-500/30 text-maroon-300 text-xs font-bold uppercase tracking-wider mb-6">
            Astrology
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 font-medium">
             <div className="flex items-center gap-2">
                <User className="w-4 h-4" /> <span>HeroZodiac Team</span>
             </div>
             <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> 
                <span>{new Date(post.published_at).toLocaleDateString()}</span>
             </div>
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> <span>5 min read</span>
             </div>
          </div>
        </div>
      </header>

      {post.featured_image && (
        <div className="container mx-auto px-6 max-w-5xl -mt-10 mb-12">
           <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img 
                src={post.featured_image.file_url} 
                alt={post.title} 
                className="object-cover w-full h-full"
              />
           </div>
        </div>
      )}

      <main className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <article className="lg:col-span-8">
             <div className="bg-slate-900/30 border border-white/5 p-8 md:p-12 rounded-2xl">
                <ContentRenderer content={post.content} />
             </div>
             <AdSpot type="leaderboard" label="Sponsored Content" />
          </article>

          <aside className="lg:col-span-4 space-y-8">
             <div className="sticky top-24">
                <AdSpot type="rectangle" label="Partner Ad" />
                
                <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                   <h3 className="font-serif font-bold text-xl text-white mb-4">Trending Now</h3>
                   <ul className="space-y-4">
                      <li className="group cursor-pointer">
                         <div className="text-xs text-maroon-400 font-bold mb-1">COMPATIBILITY</div>
                         <div className="text-slate-300 group-hover:text-gold-400 transition text-sm font-medium">
                            Why Scorpio and Leo are a dangerous match.
                         </div>
                      </li>
                   </ul>
                </div>

                <div className="mt-8">
                   <AdSpot type="sidebar" label="Featured Partner" />
                </div>
             </div>
          </aside>

        </div>
      </main>
    </div>
  );
}