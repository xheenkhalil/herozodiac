import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/quanta';
import { getEditorialArticleBySlug, convertEditorialToQuantaArticle } from '@/data/fallback-articles';
import { ContentRenderer } from '@/components/blog/ContentRenderer';
import { AdSpot } from '@/components/ads/AdSpot';
import {
  FontAwesomeIcon,
  faArrowLeft,
  faCalendarDays,
  faUser,
  faClock,
  faShareNodes
} from '@/components/ui/Icons';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  let post = null;
  try {
    post = await getPostBySlug(decodedSlug);
  } catch (e) {}

  if (!post) {
    const fallback = getEditorialArticleBySlug(decodedSlug);
    if (fallback) post = convertEditorialToQuantaArticle(fallback);
  }

  if (!post) return { title: 'Article Not Found | HeroZodiac' };

  return {
    title: `${post.title} | HeroZodiac Editorial`,
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
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  let post = null;
  try {
    post = await getPostBySlug(decodedSlug);
  } catch (e) {}

  // Fallback to editorial articles if CMS returns null
  if (!post) {
    const fallback = getEditorialArticleBySlug(decodedSlug);
    if (fallback) {
      post = convertEditorialToQuantaArticle(fallback);
    }
  }

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

  const categoryName = post.categories?.[0]?.name || 'Editorial';

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans selection:bg-[#7B1123] selection:text-white">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 transition">
          <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
          <span>Back to Cosmic Wisdom Blog</span>
        </Link>
      </div>

      <header className="relative py-12 border-b border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold uppercase tracking-wider mb-6 border border-[#7B1123]/20">
            {categoryName}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-stone-500 font-medium">
             <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-[#7B1123]" />
                <span>HeroZodiac Editorial</span>
             </div>
             <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarDays} className="w-3.5 h-3.5" /> 
                <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
             </div>
             <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" />
                <span>6 min read</span>
             </div>
          </div>
        </div>
      </header>

      {post.featured_image?.file_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 my-10">
           <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-stone-200 shadow-lg bg-stone-100">
              <img 
                src={post.featured_image.file_url} 
                alt={post.title} 
                className="object-cover w-full h-full"
              />
           </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <article className="bg-white border border-stone-200 p-8 sm:p-12 rounded-2xl shadow-sm">
           <ContentRenderer content={post.content} />
        </article>

        <div className="mt-12">
          <AdSpot type="leaderboard" label="Sponsored Wisdom" />
        </div>
      </main>
    </div>
  );
}
